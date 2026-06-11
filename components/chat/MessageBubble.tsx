"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";
  const timestamp = useMemo(() => formatTime(new Date()), []);

  return (
    <div
      className={cn(
        "flex gap-3 w-full animate-bubble-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold select-none">
          Y
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
          <Compass className="w-4 h-4 text-primary" />
        </div>
      )}

      {/* Bubble + timestamp */}
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[78%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card border border-border text-card-foreground rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold mb-2 mt-1">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold mb-1 mt-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-primary">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic opacity-90">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 mb-2 pl-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 mb-2 pl-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");
                  return isBlock ? (
                    <code className="block bg-muted border border-border rounded-md px-3 py-2 text-xs font-mono my-2 overflow-x-auto whitespace-pre">
                      {children}
                    </code>
                  ) : (
                    <code className="bg-muted border border-border rounded px-1.5 py-0.5 text-xs font-mono">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-muted border border-border rounded-md p-3 my-2 overflow-x-auto text-xs font-mono">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/40 pl-3 italic opacity-80 my-2">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="border-border my-3" />,
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[11px] text-muted-foreground px-1">{timestamp}</span>
      </div>
    </div>
  );
}
