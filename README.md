# Qurbani Share BD

Offline, bilingual (English / Bangla) Qurbani share (bhag) cost calculator and
participant tracker for Bangladesh. A single static web app: open `index.html`
in any modern browser. No build step, no server, no network requests, no
account. All data stays in the browser's `localStorage`.

## Problem

Qurbani groups in Bangladesh typically split one animal's cost across up to
seven shares, track who paid what, and divide the meat. Spreadsheets and chat
messages make this error-prone: totals drift by a taka here and there, partial
payments get lost, and nobody can see at a glance who still owes what. This app
keeps the whole group ledger in one place, with exact integer math.

## Features

1. **Qurbani group CRUD** — group name, animal type (Cow / Buffalo / Goat /
   Sheep / Camel), animal cost, and extra costs (butcher fee, transport,
   other). Every amount is a non-negative whole BDT value. Date defaults to
   today; future dates are rejected.
2. **Share math with exact remainder distribution** — total = animal + extras.
   Per-share cost = total / shares, rounded to whole taka, with the remainder
   distributed so shares always sum exactly to the total: the first
   `remainder` shares pay 1 taka extra. The full breakdown (animal + extras =
   total, shares, per-share amounts) is shown on every group card.
3. **Participants** — one slot per share, auto-created when the share count
   changes; names are editable, and participants can never exceed the share
   count. Per participant: amount paid (0 to that share's cost; overpayment is
   rejected inline), balance due, and auto-derived status Paid / Partial /
   Unpaid. Each group card shows collected, outstanding, and fully-paid count.
4. **Meat distribution (optional)** — enter total meat in kg (0 or empty
   skips it); per-share kg is shown to 2 decimals plus a per-participant
   allocation table.
5. **Dashboard** — across all groups: total groups, total cost, total
   collected, total outstanding, and fully-paid groups count.
6. **Data tab** — JSON export (download), strict import validation (wrong app
   id, wrong version, or any invalid group or participant rejects the WHOLE
   file and leaves current data untouched), and typed-`DELETE` erase-all.
7. **Bilingual UI** — English / Bangla toggle persisted in `localStorage`,
   with Bangla digits rendered in Bangla mode. The toggle re-renders everything,
   including dynamically created rows.
8. **Offline-first quality** — `localStorage` persistence (survives reload),
   an empty state when no groups exist, inline validation errors (no alerts),
   a 390 px mobile layout with no horizontal overflow, and zero network
   requests.

## Islamic share rule (as implemented)

- Cow, buffalo, and camel allow **1–7 shares**.
- Goat and sheep allow **exactly 1 share**. Picking goat or sheep locks the
  share selector at 1 and shows an inline note explaining this.
- This app is a personal organizer and educational tool, **not a religious
  ruling**. Users should confirm share rules with a local scholar; the footer
  disclaimer says so on every screen.

## Rounding rule

All money is integer taka — no floating point anywhere in money math. For a
total `T` over `S` shares: base = floor(T / S), remainder = T mod S, and the
first `remainder` shares cost base + 1 taka each. Example: 100,003 BDT over 7
shares = one share of 14,287 and six shares of 14,286, summing to exactly
100,003.

## Stack

- Plain HTML + CSS + JavaScript. No framework, no bundler, no CDN.
- `js/logic.js` — pure, DOM-free logic (share split, balances, dashboard,
  meat split, import validation). Runs unchanged in Node for tests.
- `js/app.js` — UI, rendering, `localStorage`, import/export, i18n.
- All Bangla text in `.js` files is stored as ASCII `\uXXXX` escapes so the
  source files are pure ASCII (verified with
  `grep -P '[^\x00-\x7F]'` returning zero matches on `.html` / `.js`).

## Install / run

No installation. Open `index.html` in a browser, or serve the folder with any
static server, e.g.:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Optional query parameter `?asof=YYYY-MM-DD` pins "today" (used by the smoke
test for deterministic date validation); without it, today is the real date.

## Testing

```sh
node tests/logic.test.js   # pure-math unit tests (Node, no deps)
node tests/smoke.cdp.js    # headless-Chrome smoke test via raw CDP (no deps)
```

The smoke test drives the real UI over `file://`: creates a cow group
(100,000 + 5,000 + 2,000 = 107,000 over 7 shares), verifies the remainder
rule, edits a payment and checks balance/status, rejects an overpayment,
checks the Bangla toggle + Bangla digits + reload persistence, rejects a
malformed import with data intact, checks 390 px no-overflow, and asserts
zero console/page errors and zero http(s) requests. See `TEST_RESULTS.md`
for the recorded numbers.

## Deployment

Copy the folder to any static host (GitHub Pages, Netlify, or a plain web
server). There is nothing to build and no environment variable to set.

## Limitations

- Data lives only in the browser's `localStorage` — clearing site data erases
  it. Use Export for backups.
- Single-device, single-browser: no sync, no accounts, no multi-user editing.
- Meat kg is entered by the user; the app does not weigh or verify anything.
- No prices are pre-filled; the app ships empty. Any cost figures are the
  user's own entries.
- The 7-share rule above is the standard Hanafi position commonly followed in
  Bangladesh; it is not presented as a ruling — see the in-app disclaimer.

## Status

Complete and tested locally (unit + browser smoke). Not published.
