/* Qurbani Share BD - pure logic (no DOM). Works in browser and Node.
   All money is integer taka. No floating point in money math. */
(function (root) {
  var APP_ID = "qurbani-share-bd";
  var VERSION = 1;
  var ANIMALS = {
    cow:     { maxShares: 7, fixedOne: false },
    buffalo: { maxShares: 7, fixedOne: false },
    camel:   { maxShares: 7, fixedOne: false },
    goat:    { maxShares: 1, fixedOne: true },
    sheep:   { maxShares: 1, fixedOne: true }
  };

  function isInt(n) { return typeof n === "number" && isFinite(n) && Math.floor(n) === n; }

  // Split integer total into `shares` integer parts. Base = floor(total/shares),
  // first `remainder` shares get +1, so parts always sum exactly to total.
  function splitShares(total, shares) {
    if (!isInt(total) || total < 0) throw new Error("total must be a non-negative integer");
    if (!isInt(shares) || shares < 1) throw new Error("shares must be a positive integer");
    var base = Math.floor(total / shares);
    var rem = total % shares;
    var out = [];
    for (var i = 0; i < shares; i++) out.push(base + (i < rem ? 1 : 0));
    return out;
  }

  function totalCost(g) {
    return g.animalCost + g.butcher + g.transport + g.other;
  }

  function participantStatus(paid, shareCost) {
    if (paid <= 0) return "unpaid";
    if (paid >= shareCost) return "paid";
    return "partial";
  }

  function balanceDue(paid, shareCost) { return shareCost - paid; }

  function groupSummary(g) {
    var total = totalCost(g);
    var costs = splitShares(total, g.shares);
    var collected = 0, fullyPaid = 0;
    for (var i = 0; i < g.participants.length; i++) {
      collected += g.participants[i].paid;
      if (g.participants[i].paid >= costs[i]) fullyPaid++;
    }
    return {
      total: total, costs: costs, collected: collected,
      outstanding: total - collected, fullyPaid: fullyPaid,
      fullyPaidGroup: fullyPaid === g.shares && g.shares > 0
    };
  }

  function dashboard(groups) {
    var d = { groups: groups.length, totalCost: 0, collected: 0, outstanding: 0, fullyPaidGroups: 0 };
    groups.forEach(function (g) {
      var s = groupSummary(g);
      d.totalCost += s.total; d.collected += s.collected;
      d.outstanding += s.outstanding;
      if (s.fullyPaidGroup) d.fullyPaidGroups++;
    });
    return d;
  }

  // Meat: total kg (number >= 0, up to 2 decimals) split evenly; display 2 decimals.
  function meatPerShare(totalKg, shares) {
    if (typeof totalKg !== "number" || !isFinite(totalKg) || totalKg < 0) return null;
    if (!isInt(shares) || shares < 1) return null;
    return Math.round((totalKg / shares) * 100) / 100;
  }

  function isValidDateStr(s) {
    if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    var d = new Date(s + "T00:00:00Z");
    return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
  }

  // Strict import validation. Returns { ok: true, data } or { ok: false, error }.
  // Any single invalid group/participant rejects the WHOLE file.
  function validateImport(obj, todayStr) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return { ok: false, error: "not an object" };
    if (obj.app !== APP_ID) return { ok: false, error: "wrong app id" };
    if (obj.version !== VERSION) return { ok: false, error: "wrong version" };
    if (!Array.isArray(obj.groups)) return { ok: false, error: "groups must be an array" };
    var seen = {};
    for (var gi = 0; gi < obj.groups.length; gi++) {
      var g = obj.groups[gi];
      if (!g || typeof g !== "object" || Array.isArray(g)) return { ok: false, error: "group " + gi + " invalid" };
      if (typeof g.id !== "string" || !g.id) return { ok: false, error: "group " + gi + " bad id" };
      if (seen[g.id]) return { ok: false, error: "duplicate group id" };
      seen[g.id] = true;
      if (typeof g.name !== "string" || !g.name.trim() || g.name.length > 80) return { ok: false, error: "group " + gi + " bad name" };
      if (!ANIMALS[g.animal]) return { ok: false, error: "group " + gi + " bad animal" };
      var rule = ANIMALS[g.animal];
      if (!isInt(g.shares) || g.shares < 1 || g.shares > rule.maxShares) return { ok: false, error: "group " + gi + " bad shares" };
      if (rule.fixedOne && g.shares !== 1) return { ok: false, error: "group " + gi + " goat/sheep must be 1 share" };
      var money = ["animalCost", "butcher", "transport", "other"];
      for (var m = 0; m < money.length; m++) {
        if (!isInt(g[money[m]]) || g[money[m]] < 0) return { ok: false, error: "group " + gi + " bad " + money[m] };
      }
      if (!isValidDateStr(g.date)) return { ok: false, error: "group " + gi + " bad date" };
      if (todayStr && g.date > todayStr) return { ok: false, error: "group " + gi + " future date" };
      if (g.meatKg !== null && g.meatKg !== undefined) {
        if (typeof g.meatKg !== "number" || !isFinite(g.meatKg) || g.meatKg < 0) return { ok: false, error: "group " + gi + " bad meatKg" };
      }
      if (!Array.isArray(g.participants) || g.participants.length !== g.shares) return { ok: false, error: "group " + gi + " participants must equal shares" };
      var costs = splitShares(totalCost(g), g.shares);
      for (var pi = 0; pi < g.participants.length; pi++) {
        var p = g.participants[pi];
        if (!p || typeof p !== "object") return { ok: false, error: "group " + gi + " participant " + pi + " invalid" };
        if (typeof p.name !== "string" || p.name.length > 80) return { ok: false, error: "group " + gi + " participant " + pi + " bad name" };
        if (!isInt(p.paid) || p.paid < 0 || p.paid > costs[pi]) return { ok: false, error: "group " + gi + " participant " + pi + " bad paid" };
      }
    }
    return { ok: true, data: obj };
  }

  var api = {
    APP_ID: APP_ID, VERSION: VERSION, ANIMALS: ANIMALS,
    splitShares: splitShares, totalCost: totalCost,
    participantStatus: participantStatus, balanceDue: balanceDue,
    groupSummary: groupSummary, dashboard: dashboard,
    meatPerShare: meatPerShare, isValidDateStr: isValidDateStr,
    validateImport: validateImport, isInt: isInt
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.QurbaniLogic = api;
})(typeof window !== "undefined" ? window : globalThis);
