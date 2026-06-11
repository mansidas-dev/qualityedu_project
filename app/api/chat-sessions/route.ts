import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// ─── POST /api/chat-sessions ──────────────────────────────────────────────────
// Save a new chat session for the authenticated user
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, messages } = body as { title: string; messages: unknown };

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const chatSession = await db.chatSession.create({
    data: {
      userId: session.user.id,
      title,
      messages: messages ?? [],
    },
  });

  return NextResponse.json(chatSession, { status: 201 });
}

// ─── GET /api/chat-sessions ───────────────────────────────────────────────────
// Fetch all chat sessions for the authenticated user
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chatSessions = await db.chatSession.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  return NextResponse.json(chatSessions);
}
