import { NextResponse } from "next/server";
import { z } from "zod";
import { parseSearchQuery } from "@/lib/ai/parse-search-query";

const requestSchema = z.object({
  query: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const result = await parseSearchQuery(parsed.data.query);
  return NextResponse.json(result);
}
