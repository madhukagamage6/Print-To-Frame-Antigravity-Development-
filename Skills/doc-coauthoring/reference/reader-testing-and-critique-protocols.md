# Reader Testing & Critique Protocols

Systematic procedures for validating document clarity, identifying implicit assumptions, and eliminating ambiguity prior to publication.

---

## 1. The Zero-Context Reader Protocol

The purpose of Reader Testing is to simulate how a fresh stakeholder (an executive, a peer engineer, or an autonomous AI agent) parses the document without relying on unwritten tribal knowledge.

### Reader Sub-Agent Prompt Template
```
You are an expert technical reader evaluating this document with ZERO prior context.
Analyze the document strictly based on the text provided:

1. COMPREHENSION TEST:
   - What is the core problem being solved?
   - What is the concrete mechanism proposed to solve it?
   - Who is responsible for each phase of execution?

2. AMBIGUITY & GAP DETECTION:
   - Identify any acronyms, internal terms, or project codenames not explicitly defined.
   - List statements that make unverified assumptions about system capacity or permissions.
   - Flag any conflicting directives or ambiguous requirements.

3. EDGE CASE CRITIQUE:
   - What happens when external dependencies fail?
   - What is the rollback or fallback procedure if the primary solution stalls?
```

---

## 2. Cognitive Load & Readability Checklist

| Heuristic | Good Standard | Warning Sign |
|---|---|---|
| **Sentence Length** | 15–22 words average | Sentences exceeding 35 words with nested parentheticals |
| **Section Density** | 1 central concept per paragraph | Multi-idea monolithic text blocks spanning 30+ lines |
| **Visual Anchors** | Tables, bulleted invariants, and code blocks break up text | Walls of unbroken prose with no scanning landmarks |
| **Actionability** | Clear owner and concrete acceptance criteria | Vague recommendations ("We should try to improve latency") |
| **Terminology** | Single consistent noun for each entity throughout | Switching between "Order", "Transaction", "Deal", and "Job" |

---

## 3. Slop & Redundancy Pruning Heuristics

1. **Delete Promotional Jargon**: Strip out words like "seamlessly", "revolutionary", "state-of-the-art", "game-changing", "supercharge".
2. **Compress Passive Voice**: Transform *"The files are received and processed by the worker service"* to *"The worker service processes incoming files"*.
3. **Verify Every Clause**: If removing a sentence does not diminish clarity or technical precision, remove it.
