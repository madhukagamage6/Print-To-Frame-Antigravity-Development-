# Editing & Refinement Patterns

Guidelines for surgical edits, section-by-section co-authoring, and preserving version stability.

---

## 1. The Surgical Editing Pattern

When collaborating on documents, avoid full document rewrites. Full rewrites destroy fine-tuned nuances, invalidate stakeholder comments, and introduce subtle context drift.

### Core Rules:
1. **Targeted Replacements**: Use precise block replacements (`edit_file` / `str_replace`) targeting specific paragraphs or sections.
2. **Preserve Anchors**: Keep section headers, document metadata, and approved reference IDs unchanged.
3. **Traceability**: In your change summary, cite the exact reason for the adjustment (e.g. *"Tightened Section 3.2 to specify 150ms latency SLA"*).

---

## 2. Iterative 3-Step Section Workflow

```
[Step 1: Explore & Brainstorm]  ──> Generate 5-10 structured bullet points
              │
[Step 2: Curate & Prune]        ──> User selects: "Keep 1, 3, 5; drop 2, 4"
              │
[Step 3: Surgical Draft]        ──> Write the polished section into the scaffold
```

---

## 3. Document Health Metrics

A document is ready for final approval when:
1. **Completeness**: Zero `[To be written]` or placeholder tags remain.
2. **Self-Sufficiency**: A new team member can execute their role without asking clarifying questions about the core workflow.
3. **Scannability**: A stakeholder can extract the problem, solution, cost, and timeline in under 60 seconds of scanning.
