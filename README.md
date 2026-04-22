# DigiEmu Core Demo

A demonstration of deterministic knowledge bundles with canonical verification.

## Overview

This demo shows how a structured knowledge state can be:

- captured in explicit semantic fields
- transformed into a canonical representation
- hashed with SHA-256
- verified later for integrity
- checked for drift or tampering

The core idea is:

**same structured input → same canonical state → same hash → same verifiable state**

If the state is changed afterwards without recomputing the canonical representation and hash, verification fails.

## Live Demo

[Vercel Demo](https://YOUR-VERCEL-URL.vercel.app)

## Repository

[GitHub Repository](https://github.com/DigiEmu/demo)

## What the Demo Shows

The app demonstrates:

- structured knowledge capture
- canonical serialization
- deterministic hashing
- bundle verification
- tamper / drift detection
- separation between UI models and Core contract models
- adapter-ready architecture for future DigiEmu Core integration

## Concept

The demo is based on the idea that AI systems should not only generate outputs, but should also be able to anchor those outputs to a **verifiable knowledge state**.

Instead of treating knowledge as loose text or transient context, the system structures it into fields such as:

- Meaning
- Claim
- Uncertainty
- Provenance
- Confidence
- Tags
- Event Timestamp

That structured state is then serialized canonically and hashed.  
This makes it possible to prove whether the knowledge state is still identical later, or whether it has changed.

## Current Status

This demo is **Core-aligned**, but it is **not yet running the full real DigiEmu Core runtime**.

What is already implemented:

- deterministic bundle construction
- canonical JSON generation
- SHA-256 hashing
- verification logic
- external Core bridge architecture
- contract separation between UI and Core models

What can be added later:

- direct integration with real DigiEmu Core services
- exact production bundle schemas
- signatures
- verifier reports
- replay-based state reconstruction
- compliance-oriented audit extensions

## Modes

The demo supports two modes:

- `demo-local`
- `core-http`

### demo-local
Uses the local fallback implementation.

### core-http
Uses the server bridge for external Core integration.  
If configured, it can fall back to demo logic when the external Core service is unavailable.

## Local Development

Install dependencies:

```bash
npm install
