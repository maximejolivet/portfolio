# Security Policy

**Found a vulnerability? Email maximejolivet.pro@gmail.com** — or use [GitHub private vulnerability reporting](https://github.com/maximejolivet/portfolio/security/advisories/new). Never a public issue.

## How to report

1. Write what you found.
2. Add steps to reproduce.
3. Add the potential impact, if known.
4. Send it privately (email or GitHub link above).

Expect an acknowledgment within **3 to 5 days**. Single maintainer, no bug bounty — but genuine reports are taken seriously.

## Don't

- Access, modify, or exfiltrate data beyond what proves the issue
- Run automated scanners that put significant load on the live site
- Disclose publicly before a fix ships

## Supported versions

Only the latest commit on `master`. No versioned releases: every push to `master` auto-deploys to Vercel, so there is no older version to patch.

## Already in place

**App**

- Strict CSP with per-request nonces + CSRF protection (`nuxt-security`, see `nuxt.config.ts`)
- Supabase HTML (blog articles, case studies) sanitized before render (`isomorphic-dompurify` via `utils/sanitizeHtml.ts`, fixed tag/attribute allowlist)
- No secrets in the repo; Vercel/GitHub auth uses platform-managed tokens

**Supply chain**

- Dependencies locked in `package-lock.json`; update with `npm audit` / `ncu` (see `README.md`, "Update Dependencies")
- CI (`.github/workflows/ci.yml`) gates every `master` push/PR:
  - SonarQube Cloud scan, blocking quality gate
  - `sfw npm ci` (Socket Firewall) blocks malicious/typosquatted packages at install
- [Socket Security GitHub App](https://github.com/marketplace/socket-security) reviews dependency changes on every PR (installed via Marketplace, not repo config)
