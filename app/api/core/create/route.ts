import { NextResponse } from "next/server";
import { serverCreateBundle } from "@/lib/server-core";
import type {
  ApiCreateBundleRequest,
  ApiCreateBundleResponse,
} from "@/lib/core-contract";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApiCreateBundleRequest;
    const { bundle, source } = await serverCreateBundle(body.input, body.mode);

    const response: ApiCreateBundleResponse = {
      ok: true,
      bundle,
      source,
    };

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create bundle.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}