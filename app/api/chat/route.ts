import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { systemPrompt } from "@/lib/prompts";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const coreMessages = messages.map((m: any) => {
    let content = m.content;
    if (content === undefined && m.parts) {
      content = m.parts.map((p: any) => p.text || "").join("");
    }
    return {
      role: m.role,
      content: content || "",
    };
  });

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
