# pi-git-interceptor

Safety guardrails for git commands in [pi](https://pi.dev). Prevents the agent from hanging on interactive editors or bypassing git hooks.

Inspired by the git guardrails in [dmmulroy/.dotfiles](https://github.com/dmmulroy/.dotfiles/).

## What it does

1. **Prevents editor hangs** — Injects `GIT_EDITOR=true`, `GIT_SEQUENCE_EDITOR=true`, and `GIT_MERGE_AUTOEDIT=no` before every git command so git never spawns an interactive editor (nvim, vim, etc.) that would hang the bash process.
2. **Blocks hook bypasses** — Rejects any git command containing `--no-verify`. The agent must fix the underlying issue causing the hook to fail, or ask the human for help.

## Install

### Via npm

```bash
pi install npm:pi-git-interceptor
```

Or try it without installing:

```bash
pi -e npm:pi-git-interceptor
```

### Via git

```bash
pi install git:https://github.com/SamuelLHuber/pi-git-interceptor.git
```

## Why this matters

- **Editor hangs** — If the agent runs `git commit` or `git rebase -i` without setting `GIT_EDITOR`, the default editor (often nvim/vim) opens and blocks forever since there's no TTY attached.
- **Hook bypasses** — `--no-verify` skips pre-commit, commit-msg, and other quality gates. The agent should never skip these; if a hook fails, the code needs fixing.

## No configuration needed

Works out of the box. No config files, no commands, no UI. Just install and it silently protects every git command the agent runs.
