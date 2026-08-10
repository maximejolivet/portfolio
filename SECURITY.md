# Security Policy

This is a personal portfolio site (single maintainer, no bug bounty program), but reports of genuine security issues are welcome and taken seriously.

## Supported Versions

This repo doesn't cut versioned releases — `master` is the only branch deployed to production (auto-deployed to Vercel on every push). Only the latest commit on `master` is supported; there is no older version to patch.

## Reporting a Vulnerability

Please report security issues privately, not via a public GitHub issue.

- Email: **maximejolivet.pro@gmail.com**
- Or use [GitHub's private vulnerability reporting](https://github.com/maximejolivet/portfolio/security/advisories/new) for this repository.

Include what you found, steps to reproduce, and potential impact if known. As a solo-maintained project, response times are best-effort — expect an acknowledgment within a few days.

Please don't:

- Access, modify, or exfiltrate data beyond what's needed to demonstrate the issue
- Run automated scanners that generate significant load against the live site
- Publicly disclose the issue before it's been addressed

## What's already in place

- Strict Content Security Policy with per-request nonces, and CSRF protection (`nuxt-security`, see `nuxt.config.ts`)
- No secrets committed to the repository; deployment auth to Vercel/GitHub uses platform-managed tokens, not hardcoded credentials
- Dependencies tracked via `package-lock.json`; update with `npm audit` / `ncu` (see `README.md`, "Update Dependencies")
