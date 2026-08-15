LIP: TBD
Title: Child Protection Through Local Digital Safeguards, Not Internet Age Verification
Author: Denis Roio
Status: Draft
Type: Standards Track
Created: 2026-03-21

# Abstract

This proposal recommends that Lugano adopt a child-protection approach for digital services and educational environments that does not rely on mandatory online age verification for general internet access. Instead of introducing identity-gated access to websites, applications, or communications services, the city should support a local, guardian-driven model based on operating-system-level controls, browser and application policies, school-network filtering, and shared management tooling for parents, schools, and educators.

The proposal separates two distinct problems that are often confused in policy debates:

- content moderation and filtering
- guardianship and educational responsibility

The proposed model keeps filtering and policy enforcement close to the endpoint and close to the institutions that actually care for minors. It rejects the creation of a general-purpose age-checking infrastructure for the web, and it explicitly rejects using child protection as a pretext for censorship, profiling, or routine identity disclosure.

# Motivation

The city has a legitimate interest in helping protect minors in digital environments. Children and adolescents are exposed to online harms that can include explicit sexual material, predatory contact, manipulative recommendation systems, self-harm content, eating-disorder communities, gambling-like mechanics, harassment, and compulsive engagement patterns. Schools and families need practical ways to reduce these risks.

However, mandatory age verification for access to online services is the wrong technical and civic response.

Online age verification is often presented as if it were a simple safety check, comparable to an offline document inspection at the entrance of a venue. In practice, it is not. At internet scale, it requires new trust infrastructure, new intermediaries, device compatibility, identity or age credentials, revocation mechanisms, support channels, and widespread changes to applications and services. It shifts the default condition of the network from open access to permissioned access, where users must prove something about themselves before receiving content or using a service.

This creates several problems:

- it confuses a child-protection problem with a user-authentication problem
- it is easy to bypass with borrowed accounts, VPNs, false credentials, or age-estimation workarounds
- it imposes privacy, security, and usability costs on the whole population, not only on minors
- it risks excluding people without compatible devices, accepted credentials, or sufficient digital literacy
- it creates infrastructure that can later be repurposed for broader surveillance, profiling, or access control

Most importantly, it assigns responsibility to the wrong actors. A platform or identity provider cannot replace the contextual judgment of a parent, teacher, school, or local community. The question of what is appropriate for a child is relational and contextual. It changes with age, maturity, educational setting, language, family values, and local obligations of care.

Lugano therefore needs a model that helps adults protect minors without normalizing identity-gated access to the internet.

# Specification

## Overview

Lugano should adopt a local digital safeguards model for child protection in municipal, school, and family-support contexts. The model should be based on four principles:

- local enforcement rather than remote identity checks
- guardian authority rather than centralized platform control
- configurable safeguards rather than universal blocking rules
- privacy-preserving operation rather than routine identity disclosure

The city should define a common framework that public schools, educational programs, youth services, libraries, and family-support initiatives can adopt voluntarily or through local policy where appropriate.

## Core Requirements

### 1. Endpoint-Level Safeguards

The city should encourage and, where it directly manages devices, provide support for safeguards implemented at the endpoint, including:

- operating-system-level content and application policies
- browser-level filtering and safe browsing policies
- application allowlists and denylists for managed devices
- time-based access policies
- search and discovery restrictions for age-inappropriate material
- local logging and review options controlled by guardians or institutions

These controls should operate on the device or within the local administrative domain, rather than by requiring each remote service to identify the user.

### 2. Network-Level Safeguards

Schools and other city-managed networks that serve minors should be able to apply local network protections, including:

- DNS or resolver-based filtering
- category-based blocking for clearly unsuitable destinations
- malware and scam protection
- school-hour or venue-specific policy profiles
- local override mechanisms for legitimate educational use

Network-level controls must be treated as contextual protections for managed environments, not as a general-purpose mechanism to control all residents' internet access.

### 3. Guardian and Educator Control

The system should support the authority of responsible adults who have a legitimate duty of care, including:

- parents and legal guardians
- teachers and school administrators
- educational IT staff
- child-protection professionals acting within defined roles

These actors should be able to:

- choose among policy profiles
- approve exceptions for specific resources or time windows
- review policy outcomes on managed devices or networks
- delegate administration where appropriate
- adapt settings to age, maturity, and educational context

The city should prefer systems where guardianship decisions are local, explicit, reviewable, and reversible.

### 4. Shared Policy Tooling

Lugano should support interoperable and easy-to-use tooling for policy distribution and administration, such as:

- curated filter lists suitable for schools and families
- policy templates for age groups or educational settings
- device-management guidance for common platforms
- documentation for home, classroom, and library deployments
- multilingual guidance for guardians and educators

The city may publish recommended configurations and reference profiles, but should avoid making these centrally mandatory beyond clearly defined managed environments.

### 5. Harm Reduction Beyond Blocking

The city should recognize that many online harms are amplified by design choices rather than by the mere existence of content. As a result, the child-protection strategy should also include:

- digital literacy for children and adults
- training for educators and families
- guidance on addictive design, recommendation systems, and dark patterns
- support channels for vulnerable minors and families
- procurement criteria for school tools and educational platforms

Blocking alone is not sufficient. It must be part of a broader care model.

## Non-Goals and Prohibited Uses

This proposal is not intended to create or justify any of the following:

- a mandatory age-verification system for general internet access
- a requirement that users disclose their age to websites, apps, or online services by default
- a city-wide identity or age-broadcasting layer for devices or operating systems
- a censorship system for lawful speech by adults
- a mechanism for political, ideological, or behavioral profiling
- a basis for expanding filtering to unrelated forms of population control

Any implementation derived from this LIP must preserve the distinction between child protection in managed contexts and generalized access control over the internet.

## Procurement and Design Constraints

Any municipal adoption or procurement under this proposal should prefer systems that:

- work without sending age or identity attributes to remote services
- minimize collection of personal and behavioral data
- support local administration and local override
- operate across multiple platforms where possible
- do not require a smartphone, digital identity wallet, or biometric check to function
- provide accessible interfaces for non-expert adults
- support auditability of policy changes without exposing minors' browsing data beyond what is necessary in the managed context

Any system that depends on universal age verification, biometric estimation, or centralized age-status APIs should be considered non-compliant with this proposal.

# Rationale

The proposal is based on a simple architectural distinction: filtering and care are not the same thing.

Content moderation asks whether some content or service should be blocked, delayed, labeled, or reviewed. That can often be implemented locally, through device policies, browser controls, and trusted filter lists.

Guardianship asks who has the legitimate authority to decide what is appropriate for a specific minor in a specific context. That authority belongs primarily to parents, schools, and other responsible adults, not to remote platforms or identity intermediaries.

This distinction matters because it leads to a different architecture. In the dominant age-verification model, the server assumes the user is not authorized until they provide proof of age or identity. In the proposed Lugano model, the endpoint or managed environment applies policy locally, while the guardian or institution retains control over exceptions and configuration.

This has several advantages:

- it protects minors without requiring identity disclosure by the whole population
- it reduces pressure toward centralized verification intermediaries
- it avoids making internet access conditional on accepted credentials or devices
- it preserves local judgment and educational flexibility
- it scales through policy distribution rather than identity infrastructure

The proposal also avoids a common policy error: assuming that strong cryptography makes a bad governance model acceptable. Privacy-enhancing technologies can improve some system designs, but they do not solve the underlying problem if the public-policy objective still depends on universal age checks, vendor-controlled devices, or global trust infrastructure.

Lugano should therefore lead with a proportionate, human-centered model: empower guardians, manage local environments well, and avoid redesigning the internet around age-gated access.

# Stakeholder and Impact Analysis

## Minors

Expected benefits:

- reduced exposure to harmful content in managed contexts
- more contextual and age-appropriate protection
- better alignment between school and family safeguards
- less dependence on invasive verification methods

Risks:

- overblocking of legitimate educational or support resources
- excessive local monitoring if institutions apply poor governance

Mitigations:

- exception workflows
- policy review and appeal mechanisms
- guidance on proportionality and safeguarding of sensitive use cases

## Parents and Guardians

Expected benefits:

- clearer tools for managing children's digital environments
- more direct control than remote platform settings provide
- support from schools and the city in applying protections

Risks:

- complexity of administration
- uneven technical capability across households

Mitigations:

- simple policy profiles
- city guidance and training
- support for delegation and managed defaults

## Schools and Educators

Expected benefits:

- consistent school-network and school-device policy
- ability to align safeguards with educational duties
- local override for teaching use cases

Risks:

- operational burden on IT staff
- disputes over filtering choices

Mitigations:

- reference policy templates
- defined governance roles
- documented review and override procedures

## Adults and General Internet Users

Expected benefits:

- preservation of anonymous or pseudonymous access to lawful online services
- avoidance of universal age checks and identity disclosure

Risks:

- concern that a local approach may be less visible politically than a universal mandate

Mitigations:

- public communication that child protection is being strengthened without imposing mass verification

## Municipal Administration

Expected benefits:

- a credible child-protection policy aligned with privacy and digital rights
- reduced vendor lock-in around identity systems
- clearer procurement boundaries for schools and public digital infrastructure

Risks:

- fragmented implementation if guidance is too loose

Mitigations:

- common standards for managed contexts
- shared tooling and documentation
- periodic review of deployments

# Consultation and Dissent

This proposal should be discussed with:

- public schools and school IT administrators
- teachers and parent associations
- child-protection and youth-service professionals
- privacy and civil-liberties experts
- accessibility and inclusion advocates
- municipal procurement and legal teams

Likely objections include:

- age verification appears simpler to explain politically
- local controls may be inconsistent across households
- some stakeholders may prefer stronger central enforcement

Response:

- apparent simplicity at the policy surface hides significant technical and civic costs
- consistency can be improved through shared profiles and guidance without building general internet access control
- stronger central enforcement is not justified when it undermines privacy, excludes users, and remains easy to bypass

The proposal should also remain open to evidence-based revisions if specific local deployments show clear gaps in effectiveness or equity.

# Compatibility and Transition

This proposal is compatible with existing school-network controls, device-management practices, parental-control features, browser safety settings, and local DNS filtering.

Transition should follow a staged path:

1. document current practices in schools, libraries, and youth services
2. define a minimal common framework for local safeguards
3. pilot reference configurations in selected managed environments
4. provide training and support materials for families and educators
5. adopt procurement guidance for future tools and managed devices

The transition must not require existing residents or users to obtain new identity credentials, age credentials, or compatible smartphones.

# Implementation Plan

## Phase 1: Assessment

- survey current school and municipal device-management practices
- identify existing filtering tools and policy gaps
- map contexts where minors use city-managed digital infrastructure

Acceptance criteria:

- inventory of current managed environments
- list of common requirements and gaps

## Phase 2: Reference Framework

- define policy principles for endpoint and network safeguards
- publish a non-invasive baseline profile for schools and youth services
- define rules for local override, exception approval, and proportional logging

Acceptance criteria:

- published reference guidance
- approved governance model for managed contexts

## Phase 3: Pilot Deployments

- pilot the framework in selected schools or youth-service environments
- test usability for educators, IT staff, and families
- evaluate overblocking, exception handling, and operational burden

Acceptance criteria:

- pilot report with lessons learned
- documented adjustments to policy templates

## Phase 4: Family and Educator Support

- publish multilingual guides for parents and schools
- offer workshops or support channels
- distribute recommended configurations for common device families and home-network setups

Acceptance criteria:

- support materials available publicly
- evidence of adoption in participating institutions

## Phase 5: Procurement and Long-Term Governance

- update city procurement guidance so new systems align with this LIP
- require review of any proposal that introduces age-verification or identity-gated access
- establish periodic review of effectiveness, inclusion, and privacy outcomes

Acceptance criteria:

- procurement rules updated
- governance review cycle defined

# Governance and Accountability

The city should assign ownership of this framework to the municipal function responsible for digital infrastructure in coordination with education and youth services.

Responsibilities should include:

- maintaining the reference framework
- coordinating pilots and evaluation
- updating procurement guidance
- publishing review findings
- handling revision proposals if deployments create disproportionate harms

Any expansion beyond managed contexts should require explicit public justification and a new formal review. This safeguard is necessary to prevent mission creep from child protection into generalized internet access control.

# Licensing and Reuse

This text should be released under a permissive documentation license suitable for reuse by other municipalities, or dedicated to the public domain where repository policy permits.

# Appendix: Summary Statement

Lugano can protect minors online without turning internet access into an identity checkpoint. The right model is local, contextual, and guardian-centered: better tools for families, schools, and educators; better filtering on devices and networks they manage; better guidance and procurement; and clear limits against censorship and universal age verification.
