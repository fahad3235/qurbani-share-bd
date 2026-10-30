# Qurbani Share BD — Test Results

Run date: 2026-10-30 (Asia/Dhaka). All results below are real outputs from
the commands listed; nothing here is invented.

## Unit tests — `node tests/logic.test.js`

**21 passed, 0 failed.** Coverage: pure math in `js/logic.js`.

- Remainder rule: 100,003 over 7 shares = `[14287, 14286, 14286, 14286, 14286,
  14286, 14286]`, sum verified = 100,003 (one share 14,287, six shares 14,286).
- Smoke case: 107,000 over 7 shares = `[15286 x5, 15285 x2]`, sum verified =
  107,000.
- Exact division (70,000 / 7 = 10,000 each), single share, zero total, and
  rejection of negative / fractional / zero-share inputs.
- Balance/status: 0 -> Unpaid, 5,000 of 15,286 -> Partial (balance 10,286),
  15,286 of 15,286 -> Paid (balance 0).
- Group summary: total 107,000, collected 35,572, outstanding 71,428,
  fully-paid 2 of 7, not fully-paid group.
- Dashboard: 2 groups, total cost 177,000, collected 70,000, outstanding
  107,000, fully-paid groups 1.
- Meat: 70 kg / 7 = 10; 100 kg / 7 = 14.29; 0 kg = 0; negative / zero-share
  return null.
- Import validation (10 checks): valid file accepted; wrong app id, wrong
  version, goat with 7 shares, participant count != shares, overpayment,
  future date, negative cost, duplicate group id, and non-object input all
  rejected.
- Date validation: `2026-10-30` valid, `2026-02-30` and `30-10-2026` invalid.

## Browser smoke test — `node tests/smoke.cdp.js`

**21 checks passed, 0 failed.** Headless shell 140.0.7339.16
(Playwright cache) over `file://.../index.html?asof=2026-10-30`, driven via
raw CDP. Verified in the real UI:

1. Empty state visible on first load; title "Qurbani Share BD" rendered.
2. Cow group created (100,000 + 5,000 + 2,000 + 0): breakdown total 107,000
   shown; per-share list contains five 15,286 and two 15,285 entries.
3. Stored group has exactly 7 participants; per-share costs sum to exactly
   107,000.
4. Meat 70 kg over 7 shares shows 10.00 kg per share.
5. First participant paid 15,286 -> status Paid, balance 0 BDT.
6. Overpayment 99,999 rejected inline: input reverted to 15,286 and an inline
   error message appeared (no alert).
7. Bangla toggle: Bengali digits present in page text; title renders as the
   Bangla title.
8. After page reload: language persists (toggle shows "English") and the
   "Family Cow" group persists.
9. Malformed import (wrong app id) shows a rejection error and the group
   remains intact.
10. 390 px viewport: scrollWidth <= 390 (no horizontal overflow).
11. Zero http(s) network requests during the whole session.
12. Zero console errors and zero page exceptions during the whole session.

## Repairs made during testing

1. **Smoke harness, browser binary (1st fix):** the Hatch-patched Chrome at
   `/opt/meta-chromium/chrome` refuses to start ("Hatch WebGL domain policy is
   required for browser startup"). Switched the smoke script to the cached
   Playwright headless shell
   (`~/.cache/ms-playwright/chromium_headless_shell-1187/chrome-linux/headless_shell`),
   which starts and serves CDP normally.
2. **Smoke harness, file import (2nd fix):** `DOM.setFileInputFiles` returned
   success but left `files.length` at 0 in this headless shell, so the import
   check failed while the app itself was fine. Changed the harness to assign
   the file via `DataTransfer` (as a picker drop would) and dispatch the real
   `change` event; the app's FileReader + validator path then ran and
   rejected the file as expected. No app code was changed for either fix.

## Static checks

- `grep -rP '[^\x00-\x7F]' index.html js/` -> zero matches (pure ASCII;
  1,310 Bangla characters in `js/app.js` converted to `\uXXXX` escapes).
- `node --check` passes on `js/logic.js` and `js/app.js`.
- No `fetch(`, `XMLHttpRequest`, or `http://`/`https://` references in app
  source (export uses a local blob URL only).

## Unresolved

None for the build + local test scope. Publication (repo creation, push,
Pages) was explicitly out of scope for this task and was not attempted.
