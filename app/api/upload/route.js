import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || `hhgoa-${Date.now()}.png`;

    const blob = await put(filename, request.body, {
      access: "public",
      contentType: "image/png",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image. Make sure BLOB_READ_WRITE_TOKEN is set in your Vercel environment." },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
