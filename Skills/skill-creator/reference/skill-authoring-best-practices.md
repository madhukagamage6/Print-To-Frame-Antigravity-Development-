# Skill Authoring Best Practices

Engineering rules, architectural guidelines, and progressive disclosure principles for authoring high-performing AI agent skills.

---

## 1. The 3-Tier Progressive Disclosure Architecture

Skills must be structured to prevent context bloat while providing deep technical execution ability:

1. **Tier 1: Frontmatter & Description (~100 words)**
   - Always loaded in agent context.
   - Must be "assertive" in its trigger conditions: describe both *what* the skill accomplishes and *exact trigger phrases / scenarios*.
2. **Tier 2: SKILL.md Body (< 500 lines)**
   - Loaded when the skill is explicitly activated.
   - Contains end-to-end workflows, decision trees, step sequences, and quick checklists.
3. **Tier 3: Bundled References & Scripts (Unlimited)**
   - Loaded on-demand via `view_file` only when detailed schemas, templates, or scripts are required.
   - Subdirectories: `/reference/` (deep docs), `/scripts/` (executable tools), `/assets/` (templates, fonts, logos).

---

## 2. Writing Principles for Agent Instructions

- **Explain the "Why"**: Models reason significantly better when given the operational rationale rather than blunt all-caps "MUST" mandates.
- **Provide Structural Examples**: Include concrete input/output pairings, JSON schemas, and command examples.
- **Fail-Fast & Guardrails**: Specify explicit exit criteria, fallback recovery steps, and anti-patterns.
- **Modularity**: When a skill addresses multiple frameworks (e.g. Node vs. Python), split them into distinct reference markdown files.

---

## 3. Skill Review Checklist Before Publishing

- [ ] Is frontmatter YAML formatted with valid `name` and `description`?
- [ ] Is `SKILL.md` under 500 lines, delegating heavy schemas to `/reference/`?
- [ ] Are all referenced file paths accurate and tested?
- [ ] Are input/output schemas clearly typed (TypeScript / JSON Schema)?
- [ ] Does the skill contain realistic failure recovery paths?
