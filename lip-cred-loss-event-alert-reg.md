LIP: TBD Title: Credential Loss Event Alert Registry
Author: Jaromil
Discussions-To: https://github.com/LuganoPlanB/lugano-lips/issues
Status: Draft
Type: Standards Track
Created: 2026-04-14

# Abstract

This proposal defines a civic micro-service that lets an authentication
endpoint verify, in a privacy-preserving way, whether a specific person
has recently reported the loss or theft of a personal device used as an
authentication factor, such as a mobile phone. The service ingests
time-limited police loss reports, converts them into short-lived
compromise signals, and answers queries only through zero-knowledge
proof workflows that avoid disclosing the underlying police report, the
full identity record, or the querying service's broader user data.

# Motivation

Authentication systems increasingly rely on possession-based factors
implemented through personal hardware devices such as mobile phones,
wallet devices, and SIM-bound credentials. These factors can be lost,
stolen, or temporarily brought under the control of another person.

Today, police reports about lost or stolen phones are largely isolated
from the authentication systems that could use them to reduce fraud.
This leaves a clear gap:

* a citizen may promptly report a lost device to the police, yet online
  services keep trusting that device as if it were still in the
  citizen's possession
* service operators often learn about device compromise only after
  account takeover has happened
* a direct data-sharing model between police and service providers would
  create disproportionate privacy and governance risks

Lugano can address this gap by creating a public-interest trust service
that does only one narrow task: provide a temporary risk signal that a
person recently reported the loss of an authentication device. The
service should raise security without becoming a surveillance database.

# Specification

## Service scope

The proposed service, called the Credential Loss Event Alert Registry
(CLEAR), provides a yes-or-no risk answer for a narrowly defined
question:

"Has person P reported within the retention window the loss or theft of
device D, where D is eligible for use as an authentication factor?"

The CLEAR service is not a general device registry, not a
law-enforcement data portal, and not a replacement for revocation
systems operated by mobile carriers, identity wallets, or relying
parties.

## Eligible records

The CLEAR service may ingest only reports that satisfy all of the
following:

* the loss or theft was denounced to a competent police authority
* the report identifies a natural person or other legally recognized
  subject
* the report identifies a personal device that can act in an
  authentication procedure
* the report timestamp is known
* the report includes enough structured data to derive a stable device
  claim for matching without storing unnecessary narrative details

Examples of eligible device claims include a phone number, SIM
identifier, device-bound wallet identifier, or another authentication
binding approved by governance.

## Data minimization

The CLEAR service must not store full police reports. It stores only
the minimum fields required to support the query:

* a subject reference derived from the person's legal identity
* a device reference derived from the compromised authentication device
* the event type: lost, stolen, or recovered
* the report time
* the expiry time
* the reporting authority identifier
* an audit reference to the originating record

Narrative descriptions, location details, witness statements, and other
extraneous police data must remain outside the service.

Where possible, the stored subject and device references should be
represented as commitments derived from the source identifiers rather
than as directly readable identifiers.

## Retention and state transitions

Each loss or theft record must expire automatically after a limited
retention period defined by policy. The default retention period should
be 30 days unless another period is approved through governance and
supported by evidence.

The service must support at least these state transitions:

* `reported`: a loss or theft was reported and is within retention
* `recovered`: the device was recovered or control was restored
* `expired`: the retention window ended

Queries must treat `recovered` and `expired` records as not compromised,
unless another active report for the same subject and device remains in
force.

## Privacy-preserving query model

The CLEAR service must expose a query protocol based on zero-knowledge
proofs over an authenticated set of active records, for example a
Merkle-tree representation of active subject-device commitments, with
these properties:

* the querier proves authorization to ask about a subject-device pair
  for a legitimate authentication event
* the service learns only the minimum needed to answer the query
* the querier learns only whether an active compromise signal exists,
  plus optional policy metadata such as signal age bucket
* the querier cannot enumerate the full database
* observers cannot link separate queries to reconstruct a citizen's
  broader activity

One conforming design is:

* police authorities send structured event attestations to the service
* the service converts the subject identifier and device identifier into
  commitments
* active commitments are inserted into a Merkle tree or similar
  authenticated set that is updated as reports are added, recovered, or
  expired
* an authentication endpoint submits a privacy-preserving query and
  receives a zero-knowledge proof that the queried pair is or is not
  present in the active set represented by the current root

Alternative designs may be used if they preserve the same privacy,
auditability, and anti-enumeration guarantees.

## Query authorization

Only approved authentication endpoints may query the service.
Authorization must require:

* a registered operator identity
* a declared use case tied to authentication or account recovery
* signed requests
* per-operator rate limits
* logging suitable for later oversight

The authorization flow should cryptographically bind each query to a
specific authentication transaction so that proofs cannot be replayed or
reused as general lookup tokens.

The CLEAR service must reject bulk lookups, background profiling,
marketing uses, and generalized identity screening.

## Response semantics

The response format must be intentionally minimal. A conforming response
contains:

* a boolean result: `active_signal` true or false
* a proof artifact verifiable by the querier against the active-set root
* an optional freshness bucket such as `0-24h`, `1-7d`, `8-30d`
* a response expiry time

The response must not reveal the police report text, exact filing
location, or unnecessary identity attributes.

## Required relying-party behavior

This CLEAR service provides a risk signal, not an automatic denial
mandate.  Operators integrating the service must define policy actions
for a positive result, such as:

* step-up verification using a separate factor
* temporary hold on high-risk actions
* manual review for recovery flows
* citizen notification through an already trusted channel

Operators must not use a positive result as the sole basis for permanent
account closure or unrelated service denial.

# Rationale

The design chooses a narrow compromise-check service instead of a broad
"stolen property" platform.

This is preferable because:

* it directly targets a high-value fraud pattern affecting digital
  identity and account security
* it minimizes data collection and institutional scope
* it is easier to govern, audit, and pilot
* it creates reusable civic infrastructure that any authentication
  endpoint can integrate

Zero-knowledge proofs are justified here because a simple central API
would otherwise create a new sensitive registry linking police reports,
device identifiers, and authentication activity. Commitments and
Merkle-based proofs let the service answer the narrow compromise-check
question while reducing disclosure of the underlying records.

Alternatives considered:

* Direct police-to-platform data sharing.
  This is simpler technically, but scales poorly, increases legal
  complexity, and spreads sensitive data widely.
* Carrier-only revocation feeds.
  Useful where available, but incomplete. Many authentication factors
  are not controlled by carriers, and public services need a neutral
  coordination layer.
* User-managed self-report only.
  Helpful but weaker. Fraud prevention benefits from attested reports
  and independent timestamps.

# Stakeholder and Impact Analysis

Affected stakeholders:

* citizens who report device loss or theft
* police authorities or intake offices
* municipal and private authentication service operators
* digital identity wallet providers
* privacy, data protection, and civil liberties authorities
* auditors and incident responders

Expected benefits:

* earlier detection of compromised authentication factors
* lower account takeover risk after device theft
* better coordination between public reporting and digital defense
* a reusable risk-control component for multiple services

Key risks:

* false positives caused by identifier mismatch or delayed recovery
  updates
* function creep into generalized surveillance or profiling
* over-reliance on the signal by operators with poor fallback design
* cryptographic and operational complexity

Mitigations:

* short retention windows and explicit recovery events
* strict purpose limitation and public governance
* minimal response semantics
* independent security review and privacy impact assessment
* phased deployment starting with a pilot

Budget and sustainability impact:

* moderate initial implementation and review cost
* low-to-moderate ongoing operational cost if the service remains
  minimal and centralized
* lower ecosystem cost than bilateral integrations between many police
  offices and many service providers

Vendor lock-in should be limited by requiring open specifications,
portable proofs, and exportable audit data.

# Consultation and Dissent

This draft should be reviewed with:

* municipal digital identity operators
* police reporting authorities
* the municipal data protection function
* civil society organizations focused on privacy and due process
* operators of high-value authentication endpoints such as e-government,
  banking, and digital wallet services

Likely objections include:

* police data should never influence login decisions
* zero-knowledge systems are too complex for a municipal service
* the proposal may still reveal sensitive life events indirectly

These objections are material and should be tested in pilot design. The
proposal answers them by keeping the service narrow, temporary,
auditable, and advisory rather than punitive.

# Compatibility and Transition

The proposal is additive. Existing authentication systems can integrate
it as an optional risk check without breaking current login flows.

A recommended transition path is:

* pilot with one municipal authentication endpoint and one external
  relying party
* support only one or two device claim types at first, such as phone
  number and wallet binding identifier
* evaluate false positive rates, latency, operator usability, and legal
  fitness
* expand only after governance approval and publication of results

Fallback behavior must remain available when the service is offline or
not yet integrated.

# Implementation Plan

1. Define the legal basis, governance perimeter, and permitted use
   cases.
2. Agree the minimal structured schema for police-originated event
   attestations.
3. Specify the commitment derivation method, proof system, and response
   format.
4. Build a pilot ingestion adapter for one reporting authority.
5. Build the active-set service with automatic expiry and recovery
   handling.
6. Integrate one authentication endpoint as a relying-party pilot.
7. Run privacy, security, and operational evaluations.
8. Publish results and decide whether to standardize, revise, or
   reject.

Acceptance criteria for the pilot should include:

* bounded query latency suitable for live authentication
* no disclosure of raw police-report content to relying parties
* successful expiry of records after the retention period
* auditable authorization and rate limiting
* evidence that the signal improves fraud controls without excessive
  false positives

# Governance and Accountability

The service should be governed as shared civic infrastructure with a
clearly designated operator and an oversight function that includes
privacy review.

Governance responsibilities should include:

* approving eligible device claim types
* approving retention periods
* approving authorized querying operators
* reviewing audit logs and abuse reports
* triggering suspension or rollback if misuse or excessive error rates
  are detected

Any expansion beyond authentication-related use must require a new LIP
or an explicit amendment to this one.

# Licensing and Reuse

This document is made available under GNU Free Documentation License so
that other municipalities can reuse for non-commercial purposes awith
attribution and same sharing conditions.
