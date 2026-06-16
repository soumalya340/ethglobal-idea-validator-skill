---
name: ethglobal-idea-validator
description: Validate a project idea against ETHGlobal's showcase of hackathon projects. Given an idea, find close/similar past projects, check whether the space is already crowded, study every prize winner, and score non-winning projects by how worthwhile they are to study for THIS idea. Activate on requests like "has anyone built X on ETHGlobal", "validate my hackathon idea", "find similar ETHGlobal projects", or "what's been done in [space] at ETHGlobal".
allowed-tools: WebFetch, WebSearch
---

# ETHGlobal Idea Validator

## What this is for

The user has a project idea (usually web3 / crypto / AI-agent flavored) and wants to:
1. **Validate it** — is this space already crowded at ETHGlobal? Did similar things win?
2. **Find inspiration** — what did the good projects do well, and where are the gaps to differentiate.

ETHGlobal's public showcase holds thousands of hackathon projects, most low-effort. The job is to pull the few worth studying — fast.

## The model: take all winners, score the rest

Don't sort everything into bins. There are only two moves:

**1. Winners are mandatory — no judgment.**
On the showcase listing, a recognized/winning project shows a **sponsor prize badge** (a logo next to the title — Hedera, ENS, Chainlink, etc.). Non-winners have no badge. **Take every badged project that's relevant to the idea and study it.** They carry judge/sponsor validation; there's nothing to decide.

**2. Non-winners get a worth score — judged on their description, gated by relevance to the idea.**
Most projects have no badge. Among those, the only question is: *is it worth opening and reading deeply for THIS idea?* Score the description 0-10. The key principle: **relevance comes first.** A technically brilliant project that has nothing to do with the user's idea scores low — this skill exists to validate and inspire one specific idea, not to admire unrelated work.

## The worth score (0-10) for a non-winning project

Apply this to a project's **description** — first the one-line listing blurb as a cheap pre-filter, then the full project page ("Project Description" + "How it's Made") for anything that passes.

| Factor | Weight | What earns points |
|---|---|---|
| **Relevance to the idea** | 0-4 | Same problem space / solution approach / target user as the user's idea. 4 = direct overlap, 0 = unrelated. **This is the gate — it hard-caps the total (see below), so a low score here sinks the project no matter how good the rest is.** |
| **Specificity** | 0-2 | Names real tech with versions/networks (e.g. "Daml 3.5.1, Canton DevNet, Chainlink Sepolia") vs vague buzzwords ("AI-powered decentralized platform"). |
| **Evidence it was built** | 0-2 | Architecture described, contracts/modules named, deployment, test scenarios, real screenshots — and links that resolve to something *specific* (a real GitHub path, a specific demo URL), not bare `youtube.com` / `github.com`. |
| **Novelty** | 0-2 | A non-obvious angle or technical decision vs an incremental "another X". |

**The gate is a hard cap, not just a weight.** Compute the raw 0-10 total, then apply: **if relevance is 0, total = 0; if relevance is 1, cap total at 4.** This guarantees an off-topic project can never climb into the "worth opening" band on the strength of specificity/evidence/novelty alone — relevance is the whole point of this skill. (Without the cap, relevance 1 + perfect on the other three = 7, which wrongly reads as "open it.")

**Reading the score:**
- **8-10** → deep-dive now. Close to the idea AND substantive.
- **5-7** → open it; likely worth a skim, maybe a deep dive if it's one of the closest matches.
- **0-4** → skip. Either irrelevant to the idea or too thin to reward attention.

> The one-liner alone can't fully score "evidence it was built" — that needs the page. Use the blurb to kill obvious 0-4s (irrelevant or pure buzzword), then open the survivors to finish scoring. Budget for opening ~5-10 pages, not 50.

## Tools available here

- **WebFetch** — primary tool. Fetches a URL → markdown → answers a prompt. Use for listing pages AND project pages. Does NOT run JavaScript, so interactive/filtered search UIs won't render — work from the server-rendered listing + `?page=N` pagination.
- **WebSearch** — for finding event pages, prize pages, and leads by keyword ("ethglobal showcase [keyword]").
- **x_semantic_search / x_keyword_search** — *Grok-only, not in Claude Code.* On Grok, use to check post-event X traction (project + "ETHGlobal won"). On Claude Code, skip or substitute a WebSearch.

## Key URLs (verified)

- Showcase listing: `https://ethglobal.com/showcase` — paginated via `?page=N`. **No server-side search box or filters**; flat paginated list. Prize badges appear here.
- Project page: `https://ethglobal.com/showcase/[slug]`, slug = `[name]-[id]`, e.g. `/showcase/darkmargin-etnqz`.
- Event prizes: `https://ethglobal.com/events/[event]/prizes` — **verified working** — lists every sponsor, prize pool, and track. Per-sponsor detail (with judging criteria) at `https://ethglobal.com/events/[event]/prizes/[sponsor]`, e.g. `/events/newyork2026/prizes/chainlink`. `[event]` must be a real slug (e.g. `newyork2026`); slug formats vary, so get it from the project/showcase page or WebSearch rather than guessing.
- "ETHGlobal Explorer" (`/showcase/ethglobal-explorer-i8ie4`) is a **third-party scraper project**, not an official filter; its own live demo is a searchable index. Optional, may be stale/down — don't depend on it.

> Pages and prize claims go stale. Verify by fetching before telling the user a project "won."

## Workflow

**1. Deconstruct the idea.** Core problem, solution approach, tech choices, differentiators. Generate 6-10 search terms (broad + specific). This also defines the **relevance** axis for scoring.

**2. Find candidates — search by concept, not just the literal word.** The closest project often uses different vocabulary for the same idea, so expand each term into its synonyms and sibling concepts before searching. Example: "perp dex" should also search "perpetual futures", "futures trading", "options trading", "margin trading", "leveraged trading", "derivatives DEX". Always generate this expanded set first, then:
- `WebSearch` each expanded term (`ethglobal showcase [variant]`) to surface specific slugs.
- `WebFetch` listing pages (`?page=1,2,…`) with a structured prompt describing the idea *by concept*: *"List projects related to [plain-language description of the idea and its sibling concepts: e.g. any onchain leverage/derivatives/futures/options/margin trading], even if the wording differs. For each: name, whether a sponsor prize badge is shown (and which sponsor), one-line description, slug/link."*
- A project counts as a match if it's *conceptually* close, even with zero shared keywords — that's the whole point of expanding.

**3. Split immediately.**
- **Badged + relevant** → winners, auto-shortlist for deep dive.
- **Unbadged** → pre-filter by the one-liner (drop the irrelevant / pure-buzzword), then score the survivors.

**4. Score and deep-dive.** `WebFetch` each survivor's page with: *"Extract: name; event; any prize/finalist status; full description; features and user flow; architecture (contracts, privacy model, integrations); tech stack with versions/networks; links (demo/GitHub/video) and whether they're specific or generic; strengths; limitations."* Apply the 0-10 rubric. Deep-dive the 8-10s and the closest 5-7s.

**5. Synthesize.**
- **Validation read:** many close + some badged → space is hot, validated, competitive — edge must be demonstrable. Few/none → real opening OR unvalidated problem (flag the ambiguity). One close-but-mediocre → ideal learning target.
- **Differentiation:** features they missed, better demo, different tech for cost/privacy/scale, new integrations/markets.
- **Reusable patterns:** architectures, demo techniques, integration choices worth copying.

**6. Deliver.**
- One-liner: "N relevant projects; M are prize winners in overlapping tracks; K non-winners scored ≥8."
- Table: `Project | Winner? | Worth score | Key overlap/diff | Why study | Link`.
- Deep dives on the 2-3 most relevant.
- Recommendation: go / pivot / differentiate, plus demo strategy and tech to evaluate.

## Heuristics & cautions

- **Prize badge = the only listing-level winner signal.** Take all relevant winners; spend judgment only on non-winners.
- **Relevance gates worth.** A 10/10-quality project unrelated to the idea is a 3 for this task. Don't get distracted by impressive-but-off-topic work.
- **Demo quality is decisive at ETHGlobal.** Live interactive "kill-shot" moments win attention — flag them as inspiration.
- **Be skeptical of generic links.** A "live demo" that's bare `youtube.com`, or a repo at bare `github.com`, is a weak signal — often a thin project dressed up. It costs points on "evidence it was built."
- **Don't over-collect.** 5-8 high-signal projects beat skimming 50. WebFetch is JS-blind and rate-limited — spend it on pages worth reading.
- **Examples here are illustrative.** Events, prize amounts, and project details go stale — describe the method, verify specifics live.

## Quick example

**Idea:** "Private perpetual-futures DEX — positions hidden from other traders but visible to a regulator/auditor, using real oracles."

→ Terms: "private perpetual", "confidential dex", "auditor observer", "canton daml trading".
→ Find `darkmargin-etnqz` as a very close match. **No prize badge** → it's a non-winner, so score it.
→ Fetch page: rich "Project Description" + "How it's Made"; specific stack (Daml 3.5.1, Canton DevNet, Chainlink Sepolia, Dynamic); but the "live demo" link is just `youtube.com`.
→ Score: relevance 4 (direct hit), specificity 2, evidence 1 (architecture described but generic demo link), novelty 2 → **9/10. Deep-dive it.**
→ Read: validates the exact thesis and privacy model. Differentiate via more markets, better liquidation UX, cross-chain, or a *verifiable* interactive demo (which DarkMargin's link doesn't prove). Study its party-based access-control pattern.
