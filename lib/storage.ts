import type { UiBundle } from "./ui-types";

const STORAGE_KEY = "digiemu-demo-ui-bundle-v7";
const MODE_KEY = "digiemu-demo-mode-v7";

export function saveBundle(bundle: UiBundle): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
}

export function loadBundle(): UiBundle | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UiBundle;
  } catch {
    return null;
  }
}

export function clearBundle(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveMode(mode: string): void {
  localStorage.setItem(MODE_KEY, mode);
}

export function loadMode(): string | null {
  return localStorage.getItem(MODE_KEY);
}