"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import BundleSummary from "./components/bundle-summary";
import ComposeForm from "./components/compose-form";
import DiffView from "./components/diff-view";
import ModeBadge from "./components/mode-badge";
import SnapshotView from "./components/snapshot-view";
import StatusBar from "./components/status-bar";
import StructuredEntryView from "./components/structured-entry-view";
import VerifyView from "./components/verify-view";
import { coreCreateBundle, coreVerifyBundle } from "@/lib/core-bridge";
import {
  diffUiBundle,
  mapComposeToApiCreateRequest,
  mapCoreBundleToUi,
  mapCoreVerifyToUi,
  mapUiBundleToCoreVerifyRequest,
} from "@/lib/core-mappers";
import { downloadBundle, readJsonFile } from "@/lib/export-json";
import {
  clearBundle,
  loadBundle,
  loadMode,
  saveBundle,
  saveMode,
} from "@/lib/storage";
import type { CoreBundleV1 } from "@/lib/core-contract";
import type {
  AppStatus,
  ComposeFormInput,
  CoreMode,
  UiBundle,
  UiDiffField,
  UiVerifyResult,
} from "@/lib/ui-types";

const initialInput: ComposeFormInput = {
  title: "Municipal knowledge entry",
  content:
    "The municipality plans to publish board decisions in a structured digital archive.",
  meaning:
    "Administrative knowledge should be recorded in a stable, accessible, and reconstructible form.",
  claim:
    "Board decisions are intended to be documented in a structured archive.",
  uncertainty:
    "Publication timing, legal review, archive schema, and approval workflow remain open.",
  provenance: "Municipal board planning note",
  confidence: "medium",
  tags: "municipality, archive, governance",
  eventTimestamp: "2026-03-22T12:00:00Z",
};

export default function HomePage() {
  const [input, setInput] = useState<ComposeFormInput>(initialInput);
  const [bundle, setBundle] = useState<UiBundle | null>(null);
  const [verifyResult, setVerifyResult] = useState<UiVerifyResult | null>(null);
  const [status, setStatus] = useState<AppStatus>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Ready. Compose knowledge and build a deterministic core-aligned bundle."
  );
  const [isBusy, setIsBusy] = useState(false);
  const [mode, setMode] = useState<CoreMode>("core-http");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedMode = loadMode();
    if (savedMode === "demo-local" || savedMode === "core-http") {
      setMode(savedMode);
    }

    const stored = loadBundle();
    if (stored) {
      setBundle(stored);
      setStatus("snapshot-loaded");
      setStatusMessage("Stored UI bundle loaded from browser storage.");
    }
  }, []);

  function handleModeChange(nextMode: CoreMode) {
    setMode(nextMode);
    saveMode(nextMode);
    setStatus("idle");
    setStatusMessage(`Mode changed to ${nextMode}.`);
  }

  async function handleBuildSnapshot() {
    try {
      setIsBusy(true);

      const request = mapComposeToApiCreateRequest(input, mode);
      const response = await coreCreateBundle(request);
      const uiBundle = mapCoreBundleToUi(response.bundle);

      saveBundle(uiBundle);
      setBundle(uiBundle);
      setVerifyResult(null);

      const sourceText = response.source ? ` Source: ${response.source}.` : "";
      setStatus("snapshot-built");
      setStatusMessage(`Core-aligned bundle created.${sourceText}`);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Could not build bundle."
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function handleVerify() {
    if (!bundle) return;

    try {
      setIsBusy(true);

      const request = {
        mode,
        input: mapUiBundleToCoreVerifyRequest(bundle),
      };

      const response = await coreVerifyBundle(request);
      const uiResult = mapCoreVerifyToUi(response.result);

      setVerifyResult(uiResult);

      const sourceText = response.source ? ` Source: ${response.source}.` : "";

      if (uiResult.ok) {
        setStatus("verify-valid");
        setStatusMessage(`Verification passed.${sourceText}`);
      } else {
        setStatus("verify-invalid");
        setStatusMessage(`Verification failed.${sourceText}`);
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Verification failed."
      );
    } finally {
      setIsBusy(false);
    }
  }

  function handleTamper() {
    if (!bundle) return;

    const tampered: UiBundle = {
      ...bundle,
      claim: `${bundle.claim} [tampered]`,
    };

    saveBundle(tampered);
    setBundle(tampered);
    setVerifyResult(null);
    setStatus("snapshot-tampered");
    setStatusMessage(
      "UI bundle was changed without updating canonical content and hash."
    );
  }

  function handleClear() {
    clearBundle();
    setBundle(null);
    setVerifyResult(null);
    setStatus("snapshot-cleared");
    setStatusMessage("Stored bundle removed from browser storage.");
  }

  function handleExport() {
    if (!bundle) return;

    downloadBundle(bundle);
    setStatus("snapshot-exported");
    setStatusMessage("Core-aligned bundle exported as JSON.");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleImportFile(file: File) {
    try {
      setIsBusy(true);
      const raw = await readJsonFile(file);
      const uiBundle = mapCoreBundleToUi(raw as CoreBundleV1);

      saveBundle(uiBundle);
      setBundle(uiBundle);
      setVerifyResult(null);
      setStatus("snapshot-imported");
      setStatusMessage("Core-aligned bundle imported from JSON.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Import failed."
      );
    } finally {
      setIsBusy(false);
    }
  }

  const diffs: UiDiffField[] = useMemo(() => {
    if (!bundle || verifyResult?.ok !== false) return [];
    return diffUiBundle(bundle);
  }, [bundle, verifyResult]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(48,84,120,0.2),transparent_35%),linear-gradient(180deg,#05070c_0%,#0a0f16_100%)] text-neutral-100">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">
              DigiEmu
            </p>
            <ModeBadge mode={mode} />
          </div>

          <h1 className="mb-4 max-w-5xl text-4xl font-bold tracking-tight md:text-5xl">
            DigiEmu Core Demo
          </h1>

          <p className="max-w-3xl text-neutral-300">
            Deterministic knowledge bundles with canonical verification.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => handleModeChange("demo-local")}
              className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                mode === "demo-local"
                  ? "border-cyan-700 bg-cyan-300 text-neutral-950"
                  : "border-neutral-700 bg-neutral-950 text-neutral-100 hover:bg-neutral-900"
              }`}
            >
              Demo Local
            </button>

            <button
              onClick={() => handleModeChange("core-http")}
              className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                mode === "core-http"
                  ? "border-emerald-700 bg-emerald-300 text-neutral-950"
                  : "border-neutral-700 bg-neutral-950 text-neutral-100 hover:bg-neutral-900"
              }`}
            >
              Core HTTP
            </button>
          </div>
        </header>

        <div className="mb-6">
          <StatusBar status={status} message={statusMessage} />
          {isBusy && (
            <p className="mt-3 text-sm text-neutral-400">Processing...</p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              void handleImportFile(file);
            }
            e.currentTarget.value = "";
          }}
        />

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <ComposeForm
              value={input}
              onChange={setInput}
              onBuildSnapshot={handleBuildSnapshot}
              disabled={isBusy}
            />
          </div>

          <div className="xl:col-span-1">
            <StructuredEntryView bundle={bundle} />
          </div>

          <div className="xl:col-span-1">
            <VerifyView
              result={verifyResult}
              onVerify={handleVerify}
              onClear={handleClear}
              onImportClick={handleImportClick}
              hasBundle={!!bundle}
              disabled={isBusy}
            />
          </div>
        </div>

        <div className="mt-6">
          <BundleSummary bundle={bundle} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div>
            <SnapshotView
              bundle={bundle}
              onTamper={handleTamper}
              onExport={handleExport}
              hasBundle={!!bundle}
              disabled={isBusy}
            />
          </div>

          <div>
            <DiffView diffs={diffs} />
          </div>
        </div>
      </div>
    </main>
  );
}