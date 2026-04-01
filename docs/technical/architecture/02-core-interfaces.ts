/**
 * Initial workshop draft for Aruait's agentic-state architecture.
 *
 * These types are intentionally incomplete and are meant to spark technical
 * debate about trust, portability, and avoiding vendor lock-in. The goal is
 * to anchor discussions in open interfaces instead of any single registry,
 * cloud, or model provider.
 */

export type Iso8601String = string;
export type UriString = string;

export type SignatureAlgorithm = "Ed25519" | "ES256" | "RSASSA-PSS";
export type DelegationStatus = "active" | "suspended" | "revoked" | "expired";
export type AssuranceLevel = "low" | "substantial" | "high";
export type SupportedProtocol = "mcp" | "a2a";
export type InteractionMode = "synchronous" | "asynchronous" | "human-gated";

export interface CryptographicSignature {
  keyId: string;
  algorithm: SignatureAlgorithm;
  value: string;
  payloadHash: string;
  signedAt: Iso8601String;
  certificateChain?: string[];
}

export interface DelegationScope {
  scopeId: string;
  delegatorEntityId: string;
  delegatedToMachineId: string;
  permissions: string[];
  jurisdiction: string[];
  resourceConstraints?: Record<string, string | number | boolean>;
  validFrom: Iso8601String;
  validUntil: Iso8601String;
  requiresHumanApprovalFor?: string[];
}

export interface VerifiableCredentialLink {
  credentialId: string;
  credentialType: string[];
  issuer: string;
  subject: string;
  evidenceUri?: UriString;
  digest: string;
}

export interface RepresentedEntity {
  entityId: string;
  entityType: "human" | "business" | "government-agency";
  legalName: string;
  nationalIdentifier: string;
  jurisdiction: string;
}

/**
 * Machine identity is the minimum portable trust object every agent must carry.
 * It binds keys, delegation scope, and a verifiable credential chain back to
 * a real human, business, or public authority.
 */
export interface MachineIdentity {
  machineId: string;
  agentId: string;
  did: string;
  registryEntryId: string;
  status: DelegationStatus;
  assuranceLevel: AssuranceLevel;
  signatures: CryptographicSignature[];
  delegationScopes: DelegationScope[];
  controllingCredential: VerifiableCredentialLink;
  representedEntity: RepresentedEntity;
  publicKeys: Array<{
    keyId: string;
    algorithm: SignatureAlgorithm;
    publicKeyJwk?: Record<string, unknown>;
    publicKeyMultibase?: string;
  }>;
  issuedAt: Iso8601String;
  expiresAt?: Iso8601String;
  metadata?: Record<string, unknown>;
}

export interface RegistryVerificationResult {
  isActive: boolean;
  checkedAt: Iso8601String;
  machineIdentity?: MachineIdentity;
  applicableScopes: DelegationScope[];
  trustChain: VerifiableCredentialLink[];
  revocationReason?: string;
}

export interface ExplanationBundle {
  summary: string;
  policyRefs: string[];
  ruleRefs: string[];
  modelRefs?: string[];
}

export interface AuditLogEntry {
  transactionId: string;
  intentId: string;
  requesterAgentId: string;
  responderAgentId: string;
  action: string;
  outcome: "accepted" | "rejected" | "counter-offer" | "executed" | "revoked";
  timestamp: Iso8601String;
  signatures: CryptographicSignature[];
  explanation: ExplanationBundle;
}

export interface AuditReceipt {
  receiptId: string;
  appendedAt: Iso8601String;
  ledgerHash: string;
  verificationUri?: UriString;
}

/**
 * The registry acts as the zero-trust phonebook for agents.
 * It must be able to verify active status quickly and emit durable receipts
 * for every transaction that crosses trust boundaries.
 */
export interface AgentRegistry {
  verifyActiveStatus(
    machineId: string,
    atTime?: Iso8601String,
  ): Promise<RegistryVerificationResult>;

  logTransaction(entry: AuditLogEntry): Promise<AuditReceipt>;

  publishRevocation(
    machineId: string,
    reason: string,
    revokedAt: Iso8601String,
  ): Promise<void>;
}

export interface TargetCapability {
  agentId: string;
  capabilityId: string;
  preferredProtocols: SupportedProtocol[];
}

export interface EvidenceClaim {
  claimId: string;
  type: string;
  issuer: string;
  subject: string;
  issuedAt: Iso8601String;
  expiresAt?: Iso8601String;
  dataHash: string;
  sourceUri?: UriString;
}

export interface NegotiationTerm {
  key: string;
  operator: "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "in" | "requires";
  value: string | number | boolean | string[] | Record<string, unknown>;
  rationale?: string;
}

export interface RequestedOutcome {
  outcomeType: string;
  successCriteria: string[];
}

/**
 * IntentPayload is the transport-neutral envelope for intent-based protocols.
 * It lets agents negotiate goals, evidence, and constraints instead of binding
 * the programme to rigid endpoint-specific REST contracts.
 */
export interface IntentPayload {
  intentId: string;
  correlationId: string;
  protocolVersion: "aruait.intent.v0";
  requester: {
    machineId: string;
    onBehalfOfEntityId: string;
  };
  target: TargetCapability;
  intentType: string;
  goal: string;
  requestedOutcome: RequestedOutcome;
  context: {
    serviceDomain: string;
    jurisdiction: string;
    caseReference?: string;
    rulesetRefs: string[];
    knowledgeGraphRefs?: string[];
  };
  evidence: EvidenceClaim[];
  negotiableTerms: NegotiationTerm[];
  nonNegotiableConstraints: NegotiationTerm[];
  executionMode: InteractionMode;
  humanOnLoop: {
    required: boolean;
    approverRoles?: string[];
    escalationAfter?: Iso8601String;
  };
  responseWindow: {
    notBefore?: Iso8601String;
    expiresAt: Iso8601String;
  };
  explanationRequired: boolean;
  signatures: CryptographicSignature[];
}
