<p align="center">
  <img src="assets/readme-banner.jpg" alt="ETHGlobal Idea Validator - Validate your hackathon idea against thousands of past projects" width="100%" />
</p>

<h1 align="center">ETHGlobal Idea Validator</h1>

<p align="center">
  <em>Before you build it at a hackathon — find out who already did, who won, and what's worth stealing.</em>
</p>

<p align="center">
  <a href="https://github.com/soumalya340/ethglobal-idea-validator-skill">
    <img src="assets/ethglobal-idea-validator-logo.png" width="80" height="80" alt="ETHGlobal Idea Validator" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/soumalya340/ethglobal-idea-validator-skill/stargazers"><img src="https://img.shields.io/github/stars/soumalya340/ethglobal-idea-validator-skill?style=for-the-badge&logo=github&labelColor=1e293b&color=fbbf24" alt="GitHub stars"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge&labelColor=1e293b" alt="MIT License"/></a>
  <a href="#install"><img src="https://img.shields.io/badge/Agents-Claude%20Code%20%C2%B7%20Cursor-111827?style=for-the-badge&labelColor=1e293b" alt="Supported agents"/></a>
  <img src="https://img.shields.io/badge/Skill-SKILL.md-a855f7?style=for-the-badge&labelColor=0f172a" alt="Agent Skill"/>
</p>

<p align="center"><sub><a href="#what-it-does">What it does</a> · <a href="#install">Install</a> · <a href="#usage">Usage</a> · <a href="#how-it-works">How it works</a> · <a href="#example">Example</a> · <a href="#faq">FAQ</a> · <a href="#license">License</a></sub></p>

---

## What it does

ETHGlobal's public showcase holds **thousands** of hackathon projects — most of them low-effort. When you have an idea, the useful questions are buried:

- **Is this space already crowded?** Did similar projects *win*?
- **What did the good ones do well**, and where's the gap to differentiate?
- **Which 5 projects** (out of thousands) are actually worth reading deeply for *my* idea?

This skill does that triage for you. Give it your idea; it pulls the handful of projects worth studying — fast — and hands back a go / pivot / differentiate read.

It's an **anti-noise** skill: instead of admiring impressive-but-unrelated work, it gates everything on relevance to *your* specific idea.

## Install

The [`npx skills add`](https://github.com/vercel-labs/agent-skills) CLI scans the `skills/` folder in this repo, so installing is one line:

```bash
npx skills add https://github.com/soumalya340/ethglobal-idea-validator-skill
```

Or install just this skill by its install name (the `name:` in the SKILL frontmatter):

```bash
npx skills add https://github.com/soumalya340/ethglobal-idea-validator-skill --skill "ethglobal-idea-validator"
```

<details>
<summary><strong>Other ways to install</strong></summary>

**As a Claude Code plugin** (via marketplace):

```bash
/plugin marketplace add soumalya340/ethglobal-idea-validator-skill
/plugin install ethglobal-idea-validator
```

**With the bundled installer** (Claude Code global, project, or Cursor):

```bash
npx ethglobal-idea-validator            # Claude Code global  (~/.claude/skills/)
npx ethglobal-idea-validator --project  # Claude Code project  (.claude/skills/ here)
npx ethglobal-idea-validator --cursor   # Cursor               (.cursor/rules/ here)
npx ethglobal-idea-validator --all      # Claude Code project + Cursor
```

**By hand:** copy [`skills/ethglobal-idea-validator/SKILL.md`](skills/ethglobal-idea-validator/SKILL.md) into your project, or paste it into a ChatGPT / Codex conversation.

</details>

## Usage

Once installed, just talk to your agent. The skill activates on requests like:

- *"Has anyone built a private perp DEX on ETHGlobal?"*
- *"Validate my hackathon idea: [idea]"*
- *"Find similar ETHGlobal projects to [idea]"*
- *"What's been done in [space] at ETHGlobal?"*

You get back:

- A one-line verdict — `N relevant projects; M are prize winners in overlapping tracks; K non-winners scored ≥8`.
- A table: **Project · Winner? · Worth score · Key overlap/diff · Why study · Link**.
- Deep dives on the 2–3 most relevant projects.
- A recommendation: **go / pivot / differentiate**, plus demo strategy and tech to evaluate.

## How it works

The model is deliberately simple — only two moves:

1. **Winners are mandatory, no judgment.** A sponsor prize badge on the showcase listing is the one trustworthy winner signal. Every badged project relevant to your idea gets studied — it already carries judge/sponsor validation.
2. **Non-winners get a worth score (0–10), gated by relevance.** A technically brilliant project unrelated to your idea scores *low*. The rubric weighs **relevance (0–4, the gate) · specificity (0–2) · evidence it was built (0–2) · novelty (0–2)**, then deep-dives the 8–10s.

It searches **by concept, not keyword** — the closest project often uses totally different vocabulary for the same idea, so each term is expanded into its siblings ("perp dex" → "perpetual futures", "derivatives DEX", "margin trading"…) before searching.

> Built for Claude Code with `WebFetch` + `WebSearch`. WebFetch is JS-blind, so the skill works from ETHGlobal's server-rendered listing and `?page=N` pagination rather than the interactive search UI.

## Example

> **Idea:** *"Private perpetual-futures DEX — positions hidden from other traders but visible to a regulator/auditor, using real oracles."*

→ Expands terms: "private perpetual", "confidential dex", "auditor observer", "canton daml trading".
→ Finds `darkmargin-etnqz` — a very close match. **No prize badge** → score it.
→ Fetches the page: rich description, specific stack (Daml 3.5.1, Canton DevNet, Chainlink Sepolia) — but the "live demo" link is just bare `youtube.com`.
→ Score: relevance 4 · specificity 2 · evidence 1 · novelty 2 → **9/10. Deep-dive it.**
→ Read: it validates the exact thesis and privacy model. Differentiate via more markets, better liquidation UX, cross-chain, or a *verifiable* interactive demo. Study its party-based access-control pattern.

## FAQ

**What is a SKILL.md?**
A portable instruction file an agent loads automatically when your request matches it. Install via `npx skills add`, drop it into a repo, or paste it into a conversation.

**Does it work outside Claude Code?**
The core method is agent-agnostic. It's tuned for Claude Code (`WebFetch`/`WebSearch`); the installer also targets Cursor, and you can paste the SKILL.md into ChatGPT/Codex.

**Does it scrape ETHGlobal?**
No. It uses normal web fetches of public showcase and prize pages — the same pages you'd open in a browser.

**Why score non-winners at all — why not just read the winners?**
The closest project to your idea often *didn't* win (wrong track, weak demo, late submission). Those are frequently the best learning targets — a close-but-mediocre project is an ideal thing to out-execute.

## Contributing

Issues and PRs welcome. If a key ETHGlobal URL or page structure changes and the skill goes stale, that's the most valuable kind of fix.

## License

[MIT](LICENSE) · Copyright (c) 2026 Soumalya Paul
