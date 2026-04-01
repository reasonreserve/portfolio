---
title: ADR 0001 - Agentic State Trust Model
permalink: /technical/adr/0001-agentic-state-trust-model/
---

# ADR 0001 — Agentic State Trust Model

| | |
| --- | --- |
| **Status** | Proposed |
| **Date** | 2026-04-01 |
| **Deciders** | Workshop participants, systems architecture lead, engineering leads, programme owners |
| **Related** | [#4 Identity 2.0 — machine delegation](https://github.com/reasonreserve/portfolio/issues/4), [#5 Trust registry — agent registry](https://github.com/reasonreserve/portfolio/issues/5), [#6 Interoperability — MCP / A2A & standards](https://github.com/reasonreserve/portfolio/issues/6), [#7 MaRu pilot — MVP](https://github.com/reasonreserve/portfolio/issues/7) |

> Initial workshop draft. This ADR is deliberately written to provoke technical debate about trust, failure handling, and avoiding vendor lock-in before implementation choices harden.

<!-- Draft on purpose: the controls below should remain portable across identity stacks, policy engines, model hosts, and cloud vendors. -->

## Context

Aruait aims to move the Estonian e-state from a conversational model toward an agentic state, where machine actors negotiate with each other on behalf of humans, businesses, and institutions. That creates a new class of risks:

- Prompt injection and indirect prompt injection against agents, tools, and model context.
- Agent impersonation, key theft, stale delegation, and replay attacks.
- Over-delegation, where an agent acts beyond the authority granted by a human or business principal.
- Cascading failures, where one compromised or misconfigured agent propagates bad decisions across multiple institutions.
- Opaque or vendor-bound execution paths that make public accountability, portability, and procurement leverage weaker over time.

The programme therefore needs a trust model that keeps machine agency auditable, revocable, and subordinated to public authority.

## Decision

### 1. Use a zero-trust machine identity model

Every agent participating in Aruait must present a verifiable machine identity with:

- A cryptographic key set used to sign every cross-boundary action.
- A delegation scope defining what the machine may do, for whom, where, and for how long.
- A verifiable credential chain linking the machine back to a human, business, or public institution.

The agent registry is the authoritative source for active status, delegation scope, and revocation state. No agent may rely on informal trust, long-lived shared secrets, or unauthenticated prompt context as proof of authority.

### 2. Implement a kill-switch for delegated authority

The platform must support immediate revocation of a machine's delegated authority when the machine exceeds its boundaries, shows signs of compromise, or violates policy.

The kill-switch design is:

1. An authorized authority marks the machine identity or delegation scope as `suspended` or `revoked` in the trust registry.
2. The orchestration layer, protocol gateways, compute runtimes, and policy caches consume revocation updates with short time-to-live caching and fail closed on stale state.
3. Any in-flight transaction from the revoked machine is paused, rejected, or escalated to a human operator before further side effects occur.
4. Key material associated with the machine is blocked from signing new high-trust actions.
5. A signed governance event is written to the audit log so downstream systems can prove when revocation occurred.

Emergency revocation should require dual control for production identities, but it must still be fast enough to stop a compromised agent before the next privileged action is executed.

### 3. Require human-on-the-loop for critical decisions

Agents may prepare, negotiate, and recommend actions, but they may not have final legal effect on their own for critical decisions. Human-on-the-loop review is required for at least:

- Permit issuance or rejection.
- Enforcement actions, sanctions, or penalties.
- Identity, delegation, or registry changes.
- Public money movement or binding legal commitments.

Human reviewers must receive a structured explanation bundle that includes the originating intent, evidence used, policy references, rule evaluations, and the model or tool contribution to the recommendation.

### 4. Make auditability mandatory and cryptographic

One hundred percent of agent actions that cross trust boundaries must be logged as signed, append-only events. Each event must be independently verifiable and include:

- Who acted: machine identity, represented entity, and counterparty.
- What happened: intent, action, outcome, and transaction identifier.
- Why it happened: cited rules, policies, evidence, and explanation summary.
- How it was produced: signing keys, model references, tool references, and timestamps.

Audit logs must be exportable, cryptographically checkable, and readable without dependence on a single vendor's proprietary control plane.

### 5. Mitigate agentic attacks with layered controls

| Threat | Mitigation |
| --- | --- |
| Prompt injection or context poisoning | Treat prompts and retrieved content as untrusted input, separate policy execution from model generation, and require signed tool calls plus allowlisted capabilities. |
| Agent impersonation or credential theft | Use strong machine identity, short-lived credentials, key rotation, hardware-backed signing where possible, and registry-based revocation. |
| Replay or duplicate execution | Require nonces, expiration windows, transaction identifiers, and idempotency checks at the orchestration layer. |
| Over-delegation | Enforce scope-bounded delegation, step-up approval, and human-on-the-loop review for critical actions. |
| Vendor or cloud failure | Keep protocols, audit formats, and policy bundles portable; prefer sovereign fallback paths for high-assurance workloads. |

### 6. Fail safely under system degradation

If the registry, policy layer, or authoritative rules are unavailable, the system must deny, queue, or escalate rather than silently continue with stale authority. If public cloud inference is unavailable, critical services must degrade to sovereign runtimes or human handling rather than fail open.

## Consequences

**Positive:** stronger public accountability, better containment of compromised agents, clearer separation of authority and execution, and better long-term leverage against vendor lock-in.  

**Negative / trade-offs:** more operational complexity, more latency from policy checks and signatures, higher upfront investment in registry and audit infrastructure, and a heavier approval path for high-risk decisions.  

**Follow-ups:** define revocation service-level objectives, standardize the explanation bundle schema, specify which decisions are legally critical, and test fail-closed behavior in the MaRu pilot before broader rollout.
