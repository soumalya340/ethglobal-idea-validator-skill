# Changelog

All notable changes to this skill are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-16

Production-grade repackaging. No change to the validation method itself — this
release makes the skill installable the standard way and look like a real
published project.

### Added
- `npx skills add` support — restructured to `skills/ethglobal-idea-validator/SKILL.md`
  so the [Vercel agent-skills CLI](https://github.com/vercel-labs/agent-skills)
  can discover and install it.
- Claude Code plugin packaging via `.claude-plugin/plugin.json` and
  `.claude-plugin/marketplace.json` (`/plugin marketplace add …`).
- Full `README.md` with badges, install matrix, worked example, and FAQ.
- `LICENSE` (MIT) and this `CHANGELOG.md`.
- `.gitignore`.

### Changed
- `install.js` now reads `SKILL.md` from its new `skills/…` path; bundled
  installer (global / project / cursor / all) still works.
- `package.json` updated with repository, homepage, bugs, author, and the new
  `files` list.

## [1.0.0]

### Added
- Initial release: the `ethglobal-idea-validator` SKILL.md.
- Custom `install.js` for Claude Code (global/project) and Cursor.
- Winner/non-winner triage model, 0–10 worth rubric, concept-expansion search,
  and the end-to-end validation workflow.
