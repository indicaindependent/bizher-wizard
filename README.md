# NY BizHer — Free LLC Wizard for Women Entrepreneurs

[![Live App](https://img.shields.io/badge/Live%20App-bizher.osintnet.uk-gold?style=for-the-badge)](https://bizher.osintnet.uk)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange?style=for-the-badge)](https://workers.cloudflare.com)
[![Legal](https://img.shields.io/badge/Legal-NY%20LLC%20Law%202026-navy?style=for-the-badge)](https://dos.ny.gov/forming-limited-liability-company-new-york)
[![Language](https://img.shields.io/badge/Language-EN%20%7C%20ES-blue?style=for-the-badge)](#)

> A free, legally-accurate, step-by-step web app for women entrepreneurs forming a New York LLC and getting WBE/MWBE certified.

**Live:** [bizher.osintnet.uk](https://bizher.osintnet.uk)

Built by [Indica Independent Media](https://osintnet.uk) | Deployed May 2026

---

## What It Does

Takes a first-time woman entrepreneur through every step of NY LLC formation and WBE/MWBE certification — for free.

| Step | What You Get |
|------|-------------|
| 1. Foundation | Business info collection, name availability guidance, county selection |
| 2. Articles of Organization | Pre-filled DOS-1336-f template, filing instructions, real cost breakdown |
| 3. Publication Requirement | County-specific cost estimates, step-by-step guide, 120-day deadline tracker |
| 4. EIN & Operating Agreement | Free IRS EIN guide + complete Operating Agreement generator (single or multi-member) |
| 5. WBE/MWBE Certification | Full 22-item document checklist, eligibility guide, direct ESD portal link |

## Legal Sources

- [NY DOS — Forming an LLC in New York](https://dos.ny.gov/forming-limited-liability-company-new-york)
- [NYS ESD — MWBE Certification Requirements (LLC)](https://esd.ny.gov/nys-mwbe-certification-documentation-requirements-llc)
- [IRS — EIN Application](https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number)

## Features

- ✅ 5-step guided wizard
- ✅ Bilingual (English / Spanish)
- ✅ Articles of Organization generator (DOS-1336-f format)
- ✅ Single-member and multi-member Operating Agreement templates
- ✅ Interactive WBE/MWBE 22-item checklist with localStorage persistence
- ✅ County-specific publication cost estimates (all 62 NY counties)
- ✅ 120-day publication deadline calculator
- ✅ Full real cost breakdown (no hidden surprises)
- ✅ Zero dependencies — pure Cloudflare Worker, no external CDN
- ✅ Mobile-first, print-optimized
- ✅ Legal disclaimers on every screen

## Architecture

Single Cloudflare Worker — no database, no dependencies, zero cost to run.

```
GET /*  →  bizher-wizard (Cloudflare Worker)
           └─ Serves full SPA HTML inline
           └─ All logic in vanilla JS
           └─ localStorage for draft + checklist state
```

## Disclaimer

This tool provides general legal information only — not legal advice. No attorney-client relationship is formed. Always verify with the NY Department of State and a licensed NY attorney before filing.

---

*Part of the [Indica Independent Media](https://osintnet.uk) free tools ecosystem.*


---

## ⚡ Support the Mission

This is free, ad-free, independent infrastructure — no VC, no gov funding, no strings. If it served you, a tip keeps it alive and funds the next tool.

[![Donate via SkyGive](https://img.shields.io/badge/💜_Donate_via_SkyGive-8A5CF6?style=for-the-badge&logoColor=white)](https://donate.skygive.app/)
[![Lightning](https://img.shields.io/badge/⚡_tips@skygive.app-F7931A?style=for-the-badge&logo=lightning&logoColor=white)](https://donate.skygive.app/)

<sub>🧡 Sovereign Lightning + on-chain via SkyGive. Your sats fund uptime, not ads.</sub>
