/* Qurbani Share BD - UI. All Bengali strings live in I18N below.
   After authoring, non-ASCII chars are converted to \uXXXX escapes so
   this file stays pure ASCII (GitHub push argv safety). */
(function () {
  var L = window.QurbaniLogic;
  var STORE_KEY = "qurbani-share-bd-v1";

  var BN_DIGITS = ["\u09e6", "\u09e7", "\u09e8", "\u09e9", "\u09ea", "\u09eb", "\u09ec", "\u09ed", "\u09ee", "\u09ef"];

  var I18N = {
    en: {
      langBtn: "\u09ac\u09be\u0982\u09b2\u09be",
      appTitle: "Qurbani Share BD",
      tagline: "Offline Qurbani share cost calculator and participant tracker for Bangladesh.",
      tabGroups: "Groups", tabDashboard: "Dashboard", tabData: "Data",
      newGroup: "New group", editGroup: "Edit group",
      groupName: "Group name", animalType: "Animal type", shares: "Number of shares",
      cow: "Cow", buffalo: "Buffalo", goat: "Goat", sheep: "Sheep", camel: "Camel",
      goatNote: "Goat and sheep always have exactly 1 share.",
      animalCost: "Animal cost (BDT)", butcher: "Butcher fee (BDT)",
      transport: "Transport cost (BDT)", other: "Other costs (BDT)", date: "Date",
      saveGroup: "Save group", cancel: "Cancel",
      emptyText: "No groups yet. Create your first Qurbani group above.",
      total: "Total cost", perShare: "Per share", participants: "Participants",
      name: "Name", shareCost: "Share cost", paid: "Paid", balance: "Balance due", status: "Status",
      stPaid: "Paid", stPartial: "Partial", stUnpaid: "Unpaid",
      collected: "Collected", outstanding: "Outstanding", fullyPaid: "Fully paid",
      edit: "Edit", delete: "Delete", confirmDelete: "Click again to confirm delete",
      meatLabel: "Total meat (kg, optional)", meatPerShare: "Meat per share",
      meatNote: "Leave 0 or empty to skip meat distribution.",
      dashHeading: "All groups",
      statGroups: "Groups", statTotal: "Total cost", statCollected: "Collected",
      statOutstanding: "Outstanding", statFullyPaid: "Fully-paid groups",
      dataHeading: "Export, import and erase",
      exportText: "Download all your groups as a JSON file.",
      exportBtn: "Export JSON",
      importText: "Import a file exported from this app. A file with the wrong app, wrong version, or any invalid group or participant is rejected completely, and your current data stays untouched.",
      eraseText: "Erase everything: type DELETE in the box and press the button. This cannot be undone.",
      eraseBtn: "Erase all data",
      errName: "Please enter a group name.",
      errMoney: "Please enter whole, non-negative amounts.",
      errFuture: "Date cannot be in the future.",
      errDate: "Please enter a valid date.",
      errPaid: "Payment must be between 0 and the share cost.",
      importOk: "Import successful.",
      importBad: "Import rejected: ",
      eraseBad: "Type DELETE exactly to erase all data.",
      disclaimer: "Personal organizer and educational tool only \u2014 not a religious ruling. Please confirm Qurbani share rules with a local scholar.",
      footerNote: "Works fully offline. Your data stays in this browser (localStorage). No prices are pre-filled; the app ships empty.",
      metaAnimal: "Animal", metaDate: "Date", metaShares: "Shares"
    },
    bn: {
      langBtn: "English",
      appTitle: "\u0995\u09c1\u09b0\u09ac\u09be\u09a8\u09bf \u09ad\u09be\u0997 \u09ac\u09bf\u09a1\u09bf",
      tagline: "\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u099c\u09a8\u09cd\u09af \u0985\u09ab\u09b2\u09be\u0987\u09a8 \u0995\u09c1\u09b0\u09ac\u09be\u09a8\u09bf \u09ad\u09be\u0997\u09c7\u09b0 \u0996\u09b0\u099a \u09b9\u09bf\u09b8\u09be\u09ac \u0993 \u0985\u0982\u09b6\u0997\u09cd\u09b0\u09b9\u09a3\u0995\u09be\u09b0\u09c0 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995\u09be\u09b0\u0964",
      tabGroups: "\u0997\u09cd\u09b0\u09c1\u09aa\u09b8\u09ae\u09c2\u09b9", tabDashboard: "\u09a1\u09cd\u09af\u09be\u09b6\u09ac\u09cb\u09b0\u09cd\u09a1", tabData: "\u09a1\u09c7\u099f\u09be",
      newGroup: "\u09a8\u09a4\u09c1\u09a8 \u0997\u09cd\u09b0\u09c1\u09aa", editGroup: "\u0997\u09cd\u09b0\u09c1\u09aa \u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be",
      groupName: "\u0997\u09cd\u09b0\u09c1\u09aa\u09c7\u09b0 \u09a8\u09be\u09ae", animalType: "\u09aa\u09b6\u09c1\u09b0 \u09a7\u09b0\u09a8", shares: "\u09ad\u09be\u0997\u09c7\u09b0 \u09b8\u0982\u0996\u09cd\u09af\u09be",
      cow: "\u0997\u09b0\u09c1", buffalo: "\u09ae\u09b9\u09bf\u09b7", goat: "\u099b\u09be\u0997\u09b2", sheep: "\u09ad\u09c7\u09a1\u09bc\u09be", camel: "\u0989\u099f",
      goatNote: "\u099b\u09be\u0997\u09b2 \u0993 \u09ad\u09c7\u09a1\u09bc\u09be\u09b0 \u0995\u09cd\u09b7\u09c7\u09a4\u09cd\u09b0\u09c7 \u09ad\u09be\u0997 \u09b8\u09ac\u09b8\u09ae\u09af\u09bc \u09e7\u099f\u09bf \u09b9\u09af\u09bc\u0964",
      animalCost: "\u09aa\u09b6\u09c1\u09b0 \u09a6\u09be\u09ae (\u099f\u09be\u0995\u09be)", butcher: "\u0995\u09b8\u09be\u0987\u09af\u09bc\u09c7\u09b0 \u09ae\u099c\u09c1\u09b0\u09bf (\u099f\u09be\u0995\u09be)",
      transport: "\u09aa\u09b0\u09bf\u09ac\u09b9\u09a8 \u0996\u09b0\u099a (\u099f\u09be\u0995\u09be)", other: "\u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af \u0996\u09b0\u099a (\u099f\u09be\u0995\u09be)", date: "\u09a4\u09be\u09b0\u09bf\u0996",
      saveGroup: "\u0997\u09cd\u09b0\u09c1\u09aa \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0995\u09b0\u09c1\u09a8", cancel: "\u09ac\u09be\u09a4\u09bf\u09b2",
      emptyText: "\u098f\u0996\u09a8\u09cb \u0995\u09cb\u09a8\u09cb \u0997\u09cd\u09b0\u09c1\u09aa \u09a8\u09c7\u0987\u0964 \u0989\u09aa\u09b0\u09c7 \u0986\u09aa\u09a8\u09be\u09b0 \u09aa\u09cd\u09b0\u09a5\u09ae \u0995\u09c1\u09b0\u09ac\u09be\u09a8\u09bf \u0997\u09cd\u09b0\u09c1\u09aa \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c1\u09a8\u0964",
      total: "\u09ae\u09cb\u099f \u0996\u09b0\u099a", perShare: "\u09aa\u09cd\u09b0\u09a4\u09bf \u09ad\u09be\u0997", participants: "\u0985\u0982\u09b6\u0997\u09cd\u09b0\u09b9\u09a3\u0995\u09be\u09b0\u09c0",
      name: "\u09a8\u09be\u09ae", shareCost: "\u09ad\u09be\u0997\u09c7\u09b0 \u09ae\u09c2\u09b2\u09cd\u09af", paid: "\u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4", balance: "\u09ac\u09be\u0995\u09bf", status: "\u0985\u09ac\u09b8\u09cd\u09a5\u09be",
      stPaid: "\u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4", stPartial: "\u0986\u0982\u09b6\u09bf\u0995", stUnpaid: "\u0985\u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4",
      collected: "\u0986\u09a6\u09be\u09af\u09bc\u0995\u09c3\u09a4", outstanding: "\u09ac\u0995\u09c7\u09af\u09bc\u09be", fullyPaid: "\u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4",
      edit: "\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be", delete: "\u09ae\u09c1\u099b\u09c1\u09a8", confirmDelete: "\u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09a4\u09c7 \u0986\u09ac\u09be\u09b0 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c1\u09a8",
      meatLabel: "\u09ae\u09cb\u099f \u09ae\u09be\u0982\u09b8 (\u0995\u09c7\u099c\u09bf, \u0990\u099a\u09cd\u099b\u09bf\u0995)", meatPerShare: "\u09aa\u09cd\u09b0\u09a4\u09bf \u09ad\u09be\u0997\u09c7 \u09ae\u09be\u0982\u09b8",
      meatNote: "\u09ae\u09be\u0982\u09b8 \u09ac\u09a3\u09cd\u099f\u09a8 \u09ac\u09be\u09a6 \u09a6\u09bf\u09a4\u09c7 \u09e6 \u09ac\u09be \u0996\u09be\u09b2\u09bf \u09b0\u09be\u0996\u09c1\u09a8\u0964",
      dashHeading: "\u09b8\u09ac \u0997\u09cd\u09b0\u09c1\u09aa",
      statGroups: "\u0997\u09cd\u09b0\u09c1\u09aa", statTotal: "\u09ae\u09cb\u099f \u0996\u09b0\u099a", statCollected: "\u0986\u09a6\u09be\u09af\u09bc\u0995\u09c3\u09a4",
      statOutstanding: "\u09ac\u0995\u09c7\u09af\u09bc\u09be", statFullyPaid: "\u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4 \u0997\u09cd\u09b0\u09c1\u09aa",
      dataHeading: "\u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f, \u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u0993 \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be",
      exportText: "\u0986\u09aa\u09a8\u09be\u09b0 \u09b8\u09ac \u0997\u09cd\u09b0\u09c1\u09aa JSON \u09ab\u09be\u0987\u09b2 \u09b9\u09bf\u09b8\u09c7\u09ac\u09c7 \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 \u0995\u09b0\u09c1\u09a8\u0964",
      exportBtn: "JSON \u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f",
      importText: "\u098f\u0987 \u0985\u09cd\u09af\u09be\u09aa \u09a5\u09c7\u0995\u09c7 \u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f \u0995\u09b0\u09be \u09ab\u09be\u0987\u09b2 \u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u0995\u09b0\u09c1\u09a8\u0964 \u09ad\u09c1\u09b2 \u0985\u09cd\u09af\u09be\u09aa, \u09ad\u09c1\u09b2 \u09ad\u09be\u09b0\u09cd\u09b8\u09a8, \u09ac\u09be \u0995\u09cb\u09a8\u09cb \u0985\u09ac\u09c8\u09a7 \u0997\u09cd\u09b0\u09c1\u09aa \u09ac\u09be \u0985\u0982\u09b6\u0997\u09cd\u09b0\u09b9\u09a3\u0995\u09be\u09b0\u09c0 \u09a5\u09be\u0995\u09b2\u09c7 \u09aa\u09c1\u09b0\u09cb \u09ab\u09be\u0987\u09b2 \u09ac\u09be\u09a4\u09bf\u09b2 \u09b9\u09ac\u09c7 \u098f\u09ac\u0982 \u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09a1\u09c7\u099f\u09be \u0985\u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09bf\u09a4 \u09a5\u09be\u0995\u09ac\u09c7\u0964",
      eraseText: "\u09b8\u09ac\u0995\u09bf\u099b\u09c1 \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09c1\u09a8: \u09ac\u0995\u09cd\u09b8\u09c7 DELETE \u09b2\u09bf\u0996\u09c7 \u09ac\u09cb\u09a4\u09be\u09ae \u099a\u09be\u09aa\u09c1\u09a8\u0964 \u098f\u099f\u09bf \u09ab\u09c7\u09b0\u09be\u09a8\u09cb \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964",
      eraseBtn: "\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09c1\u09a8",
      errName: "\u09a6\u09af\u09bc\u09be \u0995\u09b0\u09c7 \u0997\u09cd\u09b0\u09c1\u09aa\u09c7\u09b0 \u09a8\u09be\u09ae \u09a6\u09bf\u09a8\u0964",
      errMoney: "\u09a6\u09af\u09bc\u09be \u0995\u09b0\u09c7 \u09aa\u09c2\u09b0\u09cd\u09a3\u09b8\u0982\u0996\u09cd\u09af\u0995, \u098b\u09a3\u09be\u09a4\u09cd\u09ae\u0995 \u09a8\u09af\u09bc \u098f\u09ae\u09a8 \u0985\u0999\u09cd\u0995 \u09a6\u09bf\u09a8\u0964",
      errFuture: "\u09a4\u09be\u09b0\u09bf\u0996 \u09ad\u09ac\u09bf\u09b7\u09cd\u09af\u09a4\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964",
      errDate: "\u09a6\u09af\u09bc\u09be \u0995\u09b0\u09c7 \u09b8\u09a0\u09bf\u0995 \u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8\u0964",
      errPaid: "\u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09c7\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09e6 \u09a5\u09c7\u0995\u09c7 \u09ad\u09be\u0997\u09c7\u09b0 \u09ae\u09c2\u09b2\u09cd\u09af\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964",
      importOk: "\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09b8\u09ab\u09b2 \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
      importBad: "\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09ac\u09be\u09a4\u09bf\u09b2: ",
      eraseBad: "\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09a4\u09c7 \u09a0\u09bf\u0995 DELETE \u09b2\u09bf\u0996\u09c1\u09a8\u0964",
      disclaimer: "\u098f\u099f\u09bf \u09b6\u09c1\u09a7\u09c1 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0997\u09a4 \u09b9\u09bf\u09b8\u09be\u09ac \u09b0\u09be\u0996\u09be\u09b0 \u0993 \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09ae\u09c2\u09b2\u0995 \u099f\u09c1\u09b2 \u2014 \u0995\u09cb\u09a8\u09cb \u09a7\u09b0\u09cd\u09ae\u09c0\u09af\u09bc \u09ab\u09a4\u09cb\u09af\u09bc\u09be \u09a8\u09af\u09bc\u0964 \u0995\u09c1\u09b0\u09ac\u09be\u09a8\u09bf\u09b0 \u09ad\u09be\u0997 \u09b8\u0982\u0995\u09cd\u09b0\u09be\u09a8\u09cd\u09a4 \u09a8\u09bf\u09af\u09bc\u09ae \u09b8\u09cd\u09a5\u09be\u09a8\u09c0\u09af\u09bc \u0986\u09b2\u09c7\u09ae\u09c7\u09b0 \u0995\u09be\u099b \u09a5\u09c7\u0995\u09c7 \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8\u0964",
      footerNote: "\u098f\u099f\u09bf \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u0985\u09ab\u09b2\u09be\u0987\u09a8\u09c7 \u099a\u09b2\u09c7\u0964 \u0986\u09aa\u09a8\u09be\u09b0 \u09a1\u09c7\u099f\u09be \u098f\u0987 \u09ac\u09cd\u09b0\u09be\u0989\u099c\u09be\u09b0\u09c7\u0987 (localStorage) \u09a5\u09be\u0995\u09c7\u0964 \u0995\u09cb\u09a8\u09cb \u09a6\u09be\u09ae \u0986\u0997\u09c7 \u09a5\u09c7\u0995\u09c7 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09a8\u09c7\u0987; \u0985\u09cd\u09af\u09be\u09aa\u099f\u09bf \u0996\u09be\u09b2\u09bf \u0985\u09ac\u09b8\u09cd\u09a5\u09be\u09af\u09bc \u0986\u09b8\u09c7\u0964",
      metaAnimal: "\u09aa\u09b6\u09c1", metaDate: "\u09a4\u09be\u09b0\u09bf\u0996", metaShares: "\u09ad\u09be\u0997"
    }
  };

  function $(id) { return document.getElementById(id); }

  function todayStr() {
    var m = /[?&]asof=(\d{4}-\d{2}-\d{2})/.exec(location.search);
    if (m && L.isValidDateStr(m[1])) return m[1];
    var d = new Date();
    var mo = ("0" + (d.getMonth() + 1)).slice(-2);
    var da = ("0" + d.getDate()).slice(-2);
    return d.getFullYear() + "-" + mo + "-" + da;
  }
  var TODAY = todayStr();

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return { lang: "en", groups: [] };
      var parsed = JSON.parse(raw);
      var v = L.validateImport({ app: L.APP_ID, version: L.VERSION, groups: parsed.groups || [] }, null);
      if (!v.ok) return { lang: "en", groups: [] };
      return { lang: parsed.lang === "bn" ? "bn" : "en", groups: parsed.groups };
    } catch (e) { return { lang: "en", groups: [] }; }
  }

  var state = loadState();
  var tab = "groups";
  var editingId = null;

  function save() {
    localStorage.setItem(STORE_KEY, JSON.stringify({ lang: state.lang, groups: state.groups }));
  }
  function t(key) { return I18N[state.lang][key]; }
  function digits(s) {
    if (state.lang !== "bn") return s;
    return String(s).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }
  function groupSep(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function fmt(n) { return digits(groupSep(n)); }
  function fmtMoney(n) { return state.lang === "bn" ? fmt(n) + " \u099f\u09be\u0995\u09be" : fmt(n) + " BDT"; }
  function fmtKg(n) { return digits(n.toFixed(2)); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function newId() { return "g" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36); }
  function emptyParticipants(n) {
    var arr = [];
    for (var i = 0; i < n; i++) arr.push({ name: "", paid: 0 });
    return arr;
  }
  function resizeParticipants(g) {
    while (g.participants.length > g.shares) g.participants.pop();
    while (g.participants.length < g.shares) g.participants.push({ name: "", paid: 0 });
  }
  function parseMoneyInput(el) {
    var v = (el.value || "").trim();
    if (v === "") return 0;
    if (!/^\d+$/.test(v)) return null;
    return parseInt(v, 10);
  }

  /* ---------- rendering ---------- */
  function renderStatic() {
    $("appTitle").textContent = t("appTitle");
    $("appTagline").textContent = t("tagline");
    $("langToggle").textContent = t("langBtn");
    document.querySelectorAll(".tab").forEach(function (b) {
      b.textContent = t("tab" + b.dataset.tab[0].toUpperCase() + b.dataset.tab.slice(1));
      b.classList.toggle("active", b.dataset.tab === tab);
    });
    $("newGroupHeading").textContent = editingId ? t("editGroup") : t("newGroup");
    $("lblGroupName").textContent = t("groupName");
    $("lblAnimal").textContent = t("animalType");
    $("lblShares").textContent = t("shares");
    $("lblAnimalCost").textContent = t("animalCost");
    $("lblButcher").textContent = t("butcher");
    $("lblTransport").textContent = t("transport");
    $("lblOther").textContent = t("other");
    $("lblDate").textContent = t("date");
    $("btnSaveGroup").textContent = t("saveGroup");
    $("btnCancelEdit").textContent = t("cancel");
    $("emptyText").textContent = t("emptyText");
    $("dashTableHeading").textContent = t("dashHeading");
    $("dataHeading").textContent = t("dataHeading");
    $("exportText").textContent = t("exportText");
    $("btnExport").textContent = t("exportBtn");
    $("importText").textContent = t("importText");
    $("eraseText").textContent = t("eraseText");
    $("btnErase").textContent = t("eraseBtn");
    $("disclaimer").textContent = t("disclaimer");
    $("footerNote").textContent = t("footerNote");
    var animalSel = $("fAnimal");
    ["cow", "buffalo", "goat", "sheep", "camel"].forEach(function (a) {
      animalSel.querySelector('option[value="' + a + '"]').textContent = t(a);
    });
    syncSharesSelect();
  }

  function syncSharesSelect() {
    var animal = $("fAnimal").value;
    var rule = L.ANIMALS[animal];
    var sel = $("fShares");
    var prev = parseInt(sel.value, 10) || 1;
    sel.innerHTML = "";
    for (var i = 1; i <= rule.maxShares; i++) {
      var o = document.createElement("option");
      o.value = i; o.textContent = digits(String(i));
      sel.appendChild(o);
    }
    if (rule.fixedOne) {
      sel.value = "1"; sel.disabled = true;
      $("sharesNote").textContent = t("goatNote");
    } else {
      sel.disabled = false;
      sel.value = String(Math.min(Math.max(prev, 1), 7));
      $("sharesNote").textContent = "";
    }
  }

  function renderGroupCard(g) {
    var s = L.groupSummary(g);
    var animal = t(g.animal);
    var perShare = L.meatPerShare(g.meatKg, g.shares);
    var rows = "";
    for (var i = 0; i < g.shares; i++) {
      var p = g.participants[i];
      var st = L.participantStatus(p.paid, s.costs[i]);
      var stKey = st === "paid" ? "stPaid" : st === "partial" ? "stPartial" : "stUnpaid";
      rows += "<tr>" +
        '<td><input class="p-name" type="text" maxlength="80" data-gid="' + g.id + '" data-idx="' + i + '" value="' + esc(p.name) + '"></td>' +
        "<td>" + fmtMoney(s.costs[i]) + "</td>" +
        '<td><input class="p-paid" type="number" min="0" step="1" inputmode="numeric" data-gid="' + g.id + '" data-idx="' + i + '" value="' + p.paid + '"></td>' +
        "<td>" + fmtMoney(L.balanceDue(p.paid, s.costs[i])) + "</td>" +
        '<td class="status-' + st + '">' + t(stKey) + "</td></tr>";
    }
    var meatRow = "";
    if (perShare !== null && g.meatKg > 0) {
      meatRow = "<p class=\"meta\">" + t("meatPerShare") + ": " + fmtKg(perShare) + " kg</p>";
    }
    var breakdown = fmtMoney(g.animalCost) + " + " + fmtMoney(g.butcher) + " + " +
      fmtMoney(g.transport) + " + " + fmtMoney(g.other) + " = " + fmtMoney(s.total);
    return '<div class="card group-card" data-gid="' + g.id + '">' +
      '<div class="group-head"><h3>' + esc(g.name) + "</h3>" +
      '<span><button type="button" class="btn small btn-edit" data-gid="' + g.id + '">' + t("edit") + "</button> " +
      '<button type="button" class="btn small danger btn-del" data-gid="' + g.id + '">' + t("delete") + "</button></span></div>" +
      "<p class=\"meta\">" + t("metaAnimal") + ": " + animal + " \u00b7 " + t("metaDate") + ": " + digits(g.date) +
      " \u00b7 " + t("metaShares") + ": " + digits(String(g.shares)) + "</p>" +
      '<div class="breakdown">' + t("total") + ": <b>" + fmtMoney(s.total) + "</b><br>" + breakdown +
      "<br>" + t("perShare") + ": " + s.costs.map(function (c) { return fmtMoney(c); }).join(", ") +
      "<br>" + t("collected") + ": " + fmtMoney(s.collected) + " \u00b7 " + t("outstanding") + ": " + fmtMoney(s.outstanding) +
      " \u00b7 " + t("fullyPaid") + ": " + digits(String(s.fullyPaid)) + "/" + digits(String(g.shares)) + "</div>" +
      "<h3>" + t("participants") + "</h3>" +
      '<div class="table-wrap"><table><thead><tr><th>' + t("name") + "</th><th>" + t("shareCost") + "</th><th>" +
      t("paid") + "</th><th>" + t("balance") + "</th><th>" + t("status") + "</th></tr></thead><tbody>" +
      rows + "</tbody></table></div>" +
      '<p class="err row-err" data-gid="' + g.id + '"></p>' +
      '<div class="field" style="margin-top:12px"><label>' + t("meatLabel") + "</label>" +
      '<input class="meat-input" type="number" min="0" step="0.01" inputmode="decimal" data-gid="' + g.id + '" value="' + (g.meatKg === null || g.meatKg === undefined ? "" : g.meatKg) + '">' +
      '<p class="note">' + t("meatNote") + "</p></div>" + meatRow + "</div>";
  }

  function renderGroups() {
    $("emptyState").hidden = state.groups.length !== 0;
    $("groupList").innerHTML = state.groups.map(renderGroupCard).join("");
  }

  function renderDashboard() {
    var d = L.dashboard(state.groups);
    var stats = [
      ["statGroups", fmt(d.groups)], ["statTotal", fmtMoney(d.totalCost)],
      ["statCollected", fmtMoney(d.collected)], ["statOutstanding", fmtMoney(d.outstanding)],
      ["statFullyPaid", fmt(d.fullyPaidGroups)]
    ];
    $("dashStats").innerHTML = stats.map(function (kv) {
      return '<div class="stat" data-stat="' + kv[0] + '"><span class="num">' + kv[1] + '</span><span class="lbl">' + t(kv[0]) + "</span></div>";
    }).join("");
    if (!state.groups.length) { $("dashTable").innerHTML = "<p>" + t("emptyText") + "</p>"; return; }
    var rows = state.groups.map(function (g) {
      var s = L.groupSummary(g);
      return "<tr><td>" + esc(g.name) + "</td><td>" + fmtMoney(s.total) + "</td><td>" + fmtMoney(s.collected) +
        "</td><td>" + fmtMoney(s.outstanding) + "</td><td>" + digits(String(s.fullyPaid)) + "/" + digits(String(g.shares)) + "</td></tr>";
    }).join("");
    $("dashTable").innerHTML = '<div class="table-wrap"><table><thead><tr><th>' + t("groupName") + "</th><th>" + t("total") +
      "</th><th>" + t("collected") + "</th><th>" + t("outstanding") + "</th><th>" + t("fullyPaid") +
      "</th></tr></thead><tbody>" + rows + "</tbody></table></div>";
  }

  function renderAll() {
    renderStatic();
    ["groups", "dashboard", "data"].forEach(function (v) { $("view-" + v).hidden = (v !== tab); });
    if (tab === "groups") renderGroups();
    if (tab === "dashboard") renderDashboard();
  }

  function resetForm() {
    editingId = null;
    $("groupForm").reset();
    $("fAnimal").value = "cow";
    $("fDate").value = TODAY;
    $("eName").textContent = ""; $("eForm").textContent = "";
    $("btnCancelEdit").hidden = true;
    renderStatic();
  }

  /* ---------- events ---------- */
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () { tab = b.dataset.tab; renderAll(); });
  });
  $("langToggle").addEventListener("click", function () {
    state.lang = state.lang === "en" ? "bn" : "en";
    save(); renderAll();
  });
  $("fAnimal").addEventListener("change", syncSharesSelect);

  $("btnCancelEdit").addEventListener("click", resetForm);

  $("groupForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    $("eName").textContent = ""; $("eForm").textContent = "";
    var name = $("fName").value.trim();
    if (!name) { $("eName").textContent = t("errName"); return; }
    var animalCost = parseMoneyInput($("fAnimalCost"));
    var butcher = parseMoneyInput($("fButcher"));
    var transport = parseMoneyInput($("fTransport"));
    var other = parseMoneyInput($("fOther"));
    if (animalCost === null || butcher === null || transport === null || other === null) {
      $("eForm").textContent = t("errMoney"); return;
    }
    var date = $("fDate").value;
    if (!L.isValidDateStr(date)) { $("eForm").textContent = t("errDate"); return; }
    if (date > TODAY) { $("eForm").textContent = t("errFuture"); return; }
    var animal = $("fAnimal").value;
    var rule = L.ANIMALS[animal];
    var shares = rule.fixedOne ? 1 : parseInt($("fShares").value, 10);
    if (editingId) {
      var g = state.groups.find(function (x) { return x.id === editingId; });
      if (!g) { resetForm(); return; }
      g.name = name; g.animal = animal; g.shares = shares;
      g.animalCost = animalCost; g.butcher = butcher; g.transport = transport; g.other = other;
      g.date = date; resizeParticipants(g);
    } else {
      state.groups.push({
        id: newId(), name: name, animal: animal, shares: shares,
        animalCost: animalCost, butcher: butcher, transport: transport, other: other,
        date: date, meatKg: null, participants: emptyParticipants(shares)
      });
    }
    save(); resetForm(); renderGroups();
  });

  $("groupList").addEventListener("change", function (ev) {
    var el = ev.target;
    var gid = el.dataset.gid;
    if (!gid) return;
    var g = state.groups.find(function (x) { return x.id === gid; });
    if (!g) return;
    if (el.classList.contains("p-name")) {
      g.participants[+el.dataset.idx].name = el.value.slice(0, 80);
      save(); return;
    }
    if (el.classList.contains("p-paid")) {
      var errEl = document.querySelector('.row-err[data-gid="' + gid + '"]');
      var s = L.groupSummary(g);
      var idx = +el.dataset.idx;
      var v = (el.value || "").trim();
      if (!/^\d+$/.test(v)) { errEl.textContent = t("errPaid"); el.value = g.participants[idx].paid; return; }
      var paid = parseInt(v, 10);
      if (paid < 0 || paid > s.costs[idx]) {
        errEl.textContent = t("errPaid"); el.value = g.participants[idx].paid; return;
      }
      errEl.textContent = "";
      g.participants[idx].paid = paid;
      save(); renderGroups(); return;
    }
    if (el.classList.contains("meat-input")) {
      var mv = (el.value || "").trim();
      if (mv === "") { g.meatKg = null; save(); renderGroups(); return; }
      var num = parseFloat(mv);
      if (isNaN(num) || num < 0) { el.value = g.meatKg === null || g.meatKg === undefined ? "" : g.meatKg; return; }
      g.meatKg = Math.round(num * 100) / 100;
      save(); renderGroups(); return;
    }
  });

  $("groupList").addEventListener("click", function (ev) {
    var btn = ev.target.closest("button");
    if (!btn) return;
    var gid = btn.dataset.gid;
    var g = state.groups.find(function (x) { return x.id === gid; });
    if (!g) return;
    if (btn.classList.contains("btn-edit")) {
      editingId = gid;
      $("fName").value = g.name;
      $("fAnimal").value = g.animal;
      syncSharesSelect();
      if (!L.ANIMALS[g.animal].fixedOne) $("fShares").value = String(g.shares);
      $("fAnimalCost").value = g.animalCost;
      $("fButcher").value = g.butcher;
      $("fTransport").value = g.transport;
      $("fOther").value = g.other;
      $("fDate").value = g.date;
      $("btnCancelEdit").hidden = false;
      renderStatic();
      $("groupForm").scrollIntoView();
      return;
    }
    if (btn.classList.contains("btn-del")) {
      if (btn.dataset.armed) {
        state.groups = state.groups.filter(function (x) { return x.id !== gid; });
        if (editingId === gid) resetForm();
        save(); renderGroups();
      } else {
        btn.dataset.armed = "1";
        btn.textContent = t("confirmDelete");
        setTimeout(function () { delete btn.dataset.armed; btn.textContent = t("delete"); }, 4000);
      }
    }
  });

  $("btnExport").addEventListener("click", function () {
    var payload = { app: L.APP_ID, version: L.VERSION, groups: state.groups };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qurbani-share-bd-export.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  $("importFile").addEventListener("change", function () {
    $("eImport").textContent = ""; $("okImport").textContent = "";
    var file = $("importFile").files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var parsed;
      try { parsed = JSON.parse(reader.result); }
      catch (e) { $("eImport").textContent = t("importBad") + "invalid JSON"; $("importFile").value = ""; return; }
      var v = L.validateImport(parsed, TODAY);
      if (!v.ok) { $("eImport").textContent = t("importBad") + v.error; $("importFile").value = ""; return; }
      state.groups = v.data.groups;
      save(); renderAll();
      $("okImport").textContent = t("importOk");
      $("importFile").value = "";
    };
    reader.readAsText(file);
  });

  $("btnErase").addEventListener("click", function () {
    $("eErase").textContent = "";
    if ($("eraseInput").value !== "DELETE") { $("eErase").textContent = t("eraseBad"); return; }
    state.groups = [];
    $("eraseInput").value = "";
    save(); renderAll();
  });

  resetForm();
  renderAll();
})();
