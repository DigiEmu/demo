import { NextResponse } from "next/server";
import { serverVerifyBundle } from "@/lib/server-core";
import type {
  ApiVerifyBundleRequest,
  ApiVerifyBundleResponse,
} from "@/lib/core-contract";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApiVerifyBundleRequest;
    const { result, source } = await serverVerifyBundle(body.input, body.mode);

    const response: ApiVerifyBundleResponse = {
      ok: true,
      result,
      source,
    };

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to verify bundle.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}