# Document Archetypes & Templates Catalog

Standardized, battle-tested templates and structural blueprints for collaborative technical and executive co-authoring.

---

## 1. Technical Architecture & System Design Spec (RFC / Architecture Spec)

```markdown
# Technical Specification: [System / Subsystem Name]
**Author(s):** [Names / Roles]  
**Status:** [Draft | In Review | Approved | Deprecated]  
**Target Milestone:** [Release / Sprint / Date]  
**Audience:** Engineering Leads, Architecture Review Board, Implementing Developers

---

## 1. Executive Summary & Problem Statement
- **Context**: 2-3 sentences explaining the current state and operational constraints.
- **Problem**: Explicitly why the current architecture fails or bottlenecks business goals.
- **Proposed Solution**: 1-paragraph summary of the architectural intervention.

---

## 2. Goals & Non-Goals
### In Scope (Goals)
- [ ] Primary functional requirement with measurable SLA / metric.
- [ ] Architectural decoupling or scale target.

### Out of Scope (Non-Goals)
- [ ] Explicit features deferred to future versions.
- [ ] Adjacent workflows deliberately excluded.

---

## 3. Architecture & Data Flow
### High-Level System Diagram
```
[Client / UI] ──(HTTPS/WSS)──> [API Gateway] ──(gRPC/REST)──> [Core Engine]
                                                                    │
                                                            [Firestore / SQL]
```

### Component Breakdown
1. **Component A (Ingress & Validation)**: Responsibility, state lifecycle, failure modes.
2. **Component B (Data Processing)**: Throughput, batch vs. streaming, error retry policies.

---

## 4. Data Models & Interface Contracts (TypeScript / Protobuf / SQL)
```typescript
export interface DataEntity {
  id: string;
  createdAt: number;
  status: 'PENDING' | 'ACTIVE' | 'ARCHIVED';
  payload: Record<string, unknown>;
}
```

---

## 5. Security, Access Control & Privacy (RBAC)
- Authentication mechanisms (Tokens, mTLS).
- Authorization rules (Role-Based Access Control matrix).
- Data at rest & in-transit encryption.

---

## 6. Migration, Rollout & Rollback Strategy
- **Phase 1: Shadow Deployment**: Dual-writing with zero client impact.
- **Phase 2: Canary Rollout**: 5% traffic routing with automated health metrics.
- **Phase 3: Full Cutover**: Deprecation of legacy pipeline.
- **Rollback Trigger**: Conditions (error rate > 0.1%) and exact step-by-step reversal sequence.

---

## 7. Open Questions & Alternatives Considered
| Alternative Approach | Pros | Cons | Reason Rejected |
|---|---|---|---|
| Approach X | Fast initial setup | High operational cost at scale | Fails 10x throughput requirement |
```

---

## 2. Product Requirements Document (PRD)

```markdown
# Product Requirements Document: [Feature Name]
**Product Owner:** [Name] | **Design Lead:** [Name] | **Tech Lead:** [Name]  
**Target Delivery:** [Quarter / Date]

---

## 1. Opportunity & User Value Proposition
- **User Persona**: [e.g. ERP Production Manager, BIM Engineer]
- **User Pain Point**: What is frustrating, time-consuming, or prone to error today?
- **Core Value Hypothesis**: *"By providing X, users will reduce Y by Z%."*

---

## 2. User Journeys & Core Stories
- **Story 1 (Primary Flow)**: As a [user], I want to [action], so that [outcome].
- **Story 2 (Edge / Exception Flow)**: As a [user], when [error condition happens], I need [clear recovery path].

---

## 3. Functional Requirements & Acceptance Criteria
| ID | Requirement | Priority (P0/P1/P2) | Acceptance Criteria |
|---|---|---|---|
| FR-01 | Real-time BIM frame dimension rendering | P0 | Renders within 150ms of CAD upload with bounding box. |
| FR-02 | CSV/DXF Export of cutting list | P0 | Generates compliant DXF coordinates matching ASTM tolerance. |
| FR-03 | Custom Material Cost Markup | P1 | Allows admin to define % surcharge by alloy grade. |

---

## 4. Telemetry & Success Metrics (KPIs)
- **Primary North Star**: e.g., "Time from CAD upload to finalized production order < 2 minutes."
- **Secondary Quality Metric**: Order error return rate < 0.2%.
```

---

## 3. Executive Decision Brief / One-Pager

```markdown
# Executive Decision Brief: [Decision Title]
**Date:** [Date] | **Decision Owner:** [Name] | **Stakeholders:** [Executive Sponsors]

---

## The Core Decision
A single sentence stating the exact decision requested (e.g., *"Approve migration to Cloud Run container clusters for Print-To-Frame production microservices"*).

## Financial & Operational Impact
- **Cost**: Estimated CapEx/OpEx change.
- **Time to Value**: Implementation timeline and payback period.
- **Risk Mitigation**: Major hazards addressed.

## Recommended Course of Action
Summary of the recommended path and 3 core supporting arguments.
```
