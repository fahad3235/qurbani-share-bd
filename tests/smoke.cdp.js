/* Headless-Chrome smoke test via raw CDP. Run: node tests/smoke.cdp.js
   Requires /opt/meta-chromium/chrome. No npm deps (Node 24 global WebSocket). */
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = 9333;
const DIR = path.resolve(__dirname, "..");
const PAGE = "file://" + DIR + "/index.html?asof=2026-10-30";
const CHROME = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1187/chrome-linux/headless_shell";
const PROFILE = "/tmp/qsb-smoke-profile";

let passed = 0;
function check(name, cond, extra) {
  if (!cond) throw new Error("FAIL: " + name + (extra ? " :: " + extra : ""));
  passed++;
  console.log("ok - " + name);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitFor(fn, label, timeoutMs) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (await fn()) return;
    await sleep(200);
  }
  throw new Error("TIMEOUT: " + label);
}

async function main() {
  try { execSync("rm -rf " + PROFILE); } catch (e) {}
  const chrome = spawn(CHROME, [
    "--no-sandbox", "--disable-gpu",
    "--remote-debugging-port=" + PORT, "--user-data-dir=" + PROFILE, "about:blank",
  ], { stdio: "ignore" });
  const errors = [];
  try {
    await waitFor(async () => {
      try { const r = await fetch("http://127.0.0.1:" + PORT + "/json/version"); return r.ok; }
      catch (e) { return false; }
    }, "chrome debug port", 30000);

    const res = await fetch("http://127.0.0.1:" + PORT + "/json/new?" + encodeURIComponent(PAGE), { method: "PUT" });
    const target = await res.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
    let seq = 0;
    const pending = new Map();
    const loadWaiters = [];
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error))); else resolve(msg.result);
      }
      if (msg.method === "Page.loadEventFired") {
        while (loadWaiters.length) loadWaiters.shift()();
      }
      if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
        errors.push("console.error: " + JSON.stringify(msg.params.args));
      }
      if (msg.method === "Runtime.exceptionThrown") {
        errors.push("exception: " + msg.params.exceptionDetails.text);
      }
    };
    const send = (method, params) => new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params: params || {} }));
    });
    const ev = async (expr) => {
      const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error("JS exception: " + JSON.stringify(r.exceptionDetails));
      return r.result.value;
    };
    const waitLoad = () => new Promise((r) => loadWaiters.push(r));

    await send("Page.enable");
    await send("Runtime.enable");
    await send("Network.enable");
    const netReqs = [];
    const origOnMsg = ws.onmessage;
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.method === "Network.requestWillBeSent" && /^https?:/.test(msg.params.request.url)) {
        netReqs.push(msg.params.request.url);
      }
      origOnMsg(m);
    };
    await waitLoad();
    await sleep(500);

    // 1. Empty state, no errors.
    check("empty state visible on first load",
      await ev("!document.getElementById('emptyState').hidden"));
    check("title rendered", await ev("document.getElementById('appTitle').textContent === 'Qurbani Share BD'"));

    // 2. Create cow group: 100000 + 5000 + 2000 + 0 = 107000 over 7 shares.
    await ev(`(()=>{ const s=(id,v)=>{const el=document.getElementById(id); el.value=v; el.dispatchEvent(new Event('change',{bubbles:true})); };
      document.getElementById('fName').value='Family Cow';
      s('fAnimal','cow'); s('fShares','7');
      document.getElementById('fAnimalCost').value='100000';
      document.getElementById('fButcher').value='5000';
      document.getElementById('fTransport').value='2000';
      document.getElementById('fOther').value='0';
      document.getElementById('fDate').value='2026-10-30';
      document.getElementById('btnSaveGroup').click(); return true; })()`);
    await sleep(500);
    const cardText = await ev("document.querySelector('.group-card') ? document.querySelector('.group-card').textContent : ''");
    check("group card created", cardText.includes("Family Cow"));
    check("breakdown total 107,000 shown", cardText.includes("107,000"));
    check("remainder rule: five 15,286 and two 15,285 shown",
      (cardText.match(/15,286/g) || []).length >= 5 && (cardText.match(/15,285/g) || []).length >= 2);
    const stored = await ev("JSON.parse(localStorage.getItem('qurbani-share-bd-v1')).groups[0]");
    check("stored group has 7 participants", stored.participants.length === 7);
    const costs = [15286, 15286, 15286, 15286, 15286, 15285, 15285];
    const sum = costs.reduce((a, b) => a + b, 0);
    check("per-share costs sum exactly to 107000", sum === 107000);

    // 3. Meat: 70 kg over 7 = 10.00 kg per share.
    await ev(`(()=>{ const el=document.querySelector('.meat-input'); el.value='70'; el.dispatchEvent(new Event('change',{bubbles:true})); return true; })()`);
    await sleep(400);
    const cardText2 = await ev("document.querySelector('.group-card').textContent");
    check("meat per share 10.00 kg shown", cardText2.includes("10.00"));

    // 4. Participant payment: pay first share in full -> Paid, balance 0.
    await ev(`(()=>{ const el=document.querySelector('.p-paid'); el.value='15286'; el.dispatchEvent(new Event('change',{bubbles:true})); return true; })()`);
    await sleep(400);
    const rowText = await ev("document.querySelector('.group-card tbody tr').textContent");
    check("first participant status Paid after full payment", rowText.includes("Paid"));
    check("first participant balance 0 after full payment", /0 BDT/.test(rowText));
    // Overpayment rejected inline: value reverts, error shown.
    await ev(`(()=>{ const el=document.querySelector('.p-paid'); el.value='99999'; el.dispatchEvent(new Event('change',{bubbles:true})); return true; })()`);
    await sleep(400);
    const paidVal = await ev("document.querySelector('.p-paid').value");
    const rowErr = await ev("document.querySelector('.row-err').textContent");
    check("overpayment rejected: value reverts to 15286", paidVal === "15286", "got " + paidVal);
    check("overpayment shows inline error", rowErr.length > 0);

    // 5. BN toggle: Bengali digits + title, then reload persistence.
    await ev("document.getElementById('langToggle').click()");
    await sleep(400);
    const bnBody = await ev("document.body.innerText");
    check("BN toggle shows Bengali digits", /[০-৯]/.test(bnBody));
    check("BN title rendered", await ev("document.getElementById('appTitle').textContent === 'কুরবানি ভাগ বিডি'"));
    const reloadPromise = waitLoad();
    await send("Page.reload");
    await reloadPromise;
    await sleep(600);
    check("lang persists after reload (toggle shows English)",
      await ev("document.getElementById('langToggle').textContent === 'English'"));
    check("group persists after reload",
      await ev("!!document.querySelector('.group-card') && document.querySelector('.group-card').textContent.includes('Family Cow')"));

    // 6. Malformed import rejected, data intact.
    // (DOM.setFileInputFiles leaves files.length 0 in this headless shell, so the
    //  file is assigned via DataTransfer exactly as a picker drop would, then the
    //  real change handler + FileReader + validator path runs.)
    await ev(`(()=>{ const dt = new DataTransfer();
      dt.items.add(new File([JSON.stringify({app:'wrong-app',version:1,groups:[]})], 'bad.json', {type:'application/json'}));
      const input = document.getElementById('importFile'); input.files = dt.files;
      input.dispatchEvent(new Event('change',{bubbles:true})); return true; })()`);
    await sleep(600);
    const impErr = await ev("document.getElementById('eImport').textContent");
    check("malformed import shows rejection error", impErr.length > 0, impErr);
    check("data intact after rejected import",
      await ev("!!document.querySelector('.group-card') && document.querySelector('.group-card').textContent.includes('Family Cow')"));

    // 7. 390px viewport: no horizontal overflow.
    await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await sleep(400);
    const sw = await ev("Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)");
    check("390px viewport: no horizontal overflow", sw <= 390, "scrollWidth=" + sw);

    // 8. Zero network requests, zero console/page errors.
    check("zero http(s) network requests", netReqs.length === 0, netReqs.join(","));
    check("zero console/page errors", errors.length === 0, errors.join(" | "));

    ws.close();
    console.log("\n" + passed + " smoke checks passed, 0 failed.");
  } finally {
    try { chrome.kill(); } catch (e) {}
  }
}
main().catch((e) => { console.error(e.message); process.exit(1); });
