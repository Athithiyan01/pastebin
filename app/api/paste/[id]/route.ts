import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  // 🔁 TEMP DATA (replace with DB later)
  const paste = {
    id,
    content: "Hello from Pastebin API",
    created_at: new Date().toISOString(),
  };

  if (!paste) {
    return NextResponse.json(
      { message: "Paste not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(paste);
}
