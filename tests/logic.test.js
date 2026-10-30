/* Node unit tests for js/logic.js - run: node tests/logic.test.js */
var assert = require("assert");
var L = require("../js/logic.js");
var passed = 0;
function check(name, fn) { fn(); passed++; console.log("ok - " + name); }

// 1. Remainder rule: 100003 over 7 = 7*14286 + 1 -> one 14287, six 14286, sum exact.
check("split 100003 over 7", function () {
  var parts = L.splitShares(100003, 7);
  assert.deepStrictEqual(parts, [14287, 14286, 14286, 14286, 14286, 14286, 14286]);
  assert.strictEqual(parts.reduce(function (a, b) { return a + b; }, 0), 100003);
});

// 2. Smoke case: 107000 over 7 = 7*15285 + 5 -> five 15286, two 15285, sum exact.
check("split 107000 over 7", function () {
  var parts = L.splitShares(107000, 7);
  assert.deepStrictEqual(parts, [15286, 15286, 15286, 15286, 15286, 15285, 15285]);
  assert.strictEqual(parts.reduce(function (a, b) { return a + b; }, 0), 107000);
});

check("split exact division has no remainder", function () {
  assert.deepStrictEqual(L.splitShares(70000, 7), [10000, 10000, 10000, 10000, 10000, 10000, 10000]);
});
check("split single share returns total", function () {
  assert.deepStrictEqual(L.splitShares(55000, 1), [55000]);
});
check("split zero total", function () {
  assert.deepStrictEqual(L.splitShares(0, 7), [0, 0, 0, 0, 0, 0, 0]);
});
check("split rejects bad inputs", function () {
  assert.throws(function () { L.splitShares(-1, 7); });
  assert.throws(function () { L.splitShares(100.5, 7); });
  assert.throws(function () { L.splitShares(100, 0); });
});

// 3. Balance + status derivation.
check("status and balance", function () {
  assert.strictEqual(L.participantStatus(0, 15286), "unpaid");
  assert.strictEqual(L.participantStatus(5000, 15286), "partial");
  assert.strictEqual(L.participantStatus(15286, 15286), "paid");
  assert.strictEqual(L.balanceDue(5000, 15286), 10286);
  assert.strictEqual(L.balanceDue(15286, 15286), 0);
});

// 4. Group summary: collected / outstanding / fully-paid count.
check("group summary", function () {
  var g = { animalCost: 100000, butcher: 5000, transport: 2000, other: 0, shares: 7,
    participants: [{ paid: 15286 }, { paid: 5000 }, { paid: 0 }, { paid: 15286 }, { paid: 0 }, { paid: 0 }, { paid: 0 }] };
  var s = L.groupSummary(g);
  assert.strictEqual(s.total, 107000);
  assert.strictEqual(s.collected, 35572);
  assert.strictEqual(s.outstanding, 71428);
  assert.strictEqual(s.fullyPaid, 2);
  assert.strictEqual(s.fullyPaidGroup, false);
});

// 5. Dashboard aggregation.
check("dashboard aggregation", function () {
  var g1 = { animalCost: 70000, butcher: 0, transport: 0, other: 0, shares: 1,
    participants: [{ paid: 70000 }] };
  var g2 = { animalCost: 100000, butcher: 5000, transport: 2000, other: 0, shares: 7,
    participants: [{ paid: 0 }, { paid: 0 }, { paid: 0 }, { paid: 0 }, { paid: 0 }, { paid: 0 }, { paid: 0 }] };
  var d = L.dashboard([g1, g2]);
  assert.strictEqual(d.groups, 2);
  assert.strictEqual(d.totalCost, 177000);
  assert.strictEqual(d.collected, 70000);
  assert.strictEqual(d.outstanding, 107000);
  assert.strictEqual(d.fullyPaidGroups, 1);
});

// 6. Meat split.
check("meat per share", function () {
  assert.strictEqual(L.meatPerShare(70, 7), 10);
  assert.strictEqual(L.meatPerShare(100, 7), 14.29);
  assert.strictEqual(L.meatPerShare(0, 7), 0);
  assert.strictEqual(L.meatPerShare(-1, 7), null);
  assert.strictEqual(L.meatPerShare(70, 0), null);
});

// 7. Import validation.
function validFile() {
  return { app: "qurbani-share-bd", version: 1, groups: [
    { id: "g1", name: "Family Cow", animal: "cow", shares: 7,
      animalCost: 100000, butcher: 5000, transport: 2000, other: 0,
      date: "2026-10-30", meatKg: 70,
      participants: [{ name: "A", paid: 15286 }, { name: "", paid: 0 }, { name: "", paid: 0 },
        { name: "", paid: 0 }, { name: "", paid: 0 }, { name: "", paid: 0 }, { name: "", paid: 0 }] }
  ] };
}
check("import accepts valid file", function () {
  assert.strictEqual(L.validateImport(validFile(), "2026-10-30").ok, true);
});
check("import rejects wrong app id", function () {
  var f = validFile(); f.app = "other-app";
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects wrong version", function () {
  var f = validFile(); f.version = 2;
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects goat with 7 shares", function () {
  var f = validFile(); f.groups[0].animal = "goat"; f.groups[0].shares = 7;
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects participant count != shares", function () {
  var f = validFile(); f.groups[0].participants.pop();
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects overpayment", function () {
  var f = validFile(); f.groups[0].participants[0].paid = 99999;
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects future date", function () {
  var f = validFile(); f.groups[0].date = "2026-10-31";
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects negative cost", function () {
  var f = validFile(); f.groups[0].butcher = -5;
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects duplicate group id", function () {
  var f = validFile(); f.groups.push(JSON.parse(JSON.stringify(f.groups[0])));
  assert.strictEqual(L.validateImport(f, "2026-10-30").ok, false);
});
check("import rejects non-object", function () {
  assert.strictEqual(L.validateImport(null, "2026-10-30").ok, false);
  assert.strictEqual(L.validateImport([], "2026-10-30").ok, false);
});
check("date validation", function () {
  assert.strictEqual(L.isValidDateStr("2026-10-30"), true);
  assert.strictEqual(L.isValidDateStr("2026-02-30"), false);
  assert.strictEqual(L.isValidDateStr("30-10-2026"), false);
});

console.log("\n" + passed + " unit tests passed, 0 failed.");
