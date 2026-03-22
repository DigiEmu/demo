import type { UiBundle } from "./ui-types";

export function downloadBundle(bundle: UiBundle) {
  const blob = new Blob([JSON.stringify(bundle.raw, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const ts = new Date().toISOString().replace(/[:.]/g, "-");

  a.href = url;
  a.download = `digiemu-core-bundle-v1-${ts}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function readJsonFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        resolve(JSON.parse(String(reader.result)));
      } catch {
        reject(new Error("Invalid JSON file."));
      }
    };

    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsText(file);
  });
}