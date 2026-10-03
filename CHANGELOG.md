# Changelog

## 1.0.1 — 2026-10-03

- Verify compatibility with Pi 1.0.0 and pin development dependencies.
- Add regression coverage for hook-bypass blocking and Git editor setup, including codemode-nested Bash event inputs.
- Keep Git-enabled profile behavior; JJ-only profiles should use no-git-use-jj instead.

Verification: `npm run check`, `npm test`; real Pi 1.0 extension-loader smoke check. This policy hook is not a shell sandbox.
