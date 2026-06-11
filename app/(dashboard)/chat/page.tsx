"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageBubble } from "@/components/chat/MessageBubble";
import ExportButton from "@/components/chat/ExportButton";

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  const suggestions = [
    "I'm a CS student interested in AI and data",
    "I studied commerce and like finance and Excel",
    "I'm a biology student unsure about my career",
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="flex flex-col items-center justify-center py-4 border-b bg-background shrink-0 relative">
        <h1 className="text-xl font-bold">CareerCompass</h1>
        <p className="text-sm text-muted-foreground">Your AI Career Counselor</p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ExportButton messages={messages} />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto space-y-6">
            <Card className="w-full">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-3">
                <h2 className="text-2xl font-semibold">Hi! I&apos;m CareerCompass 👋</h2>
                <p className="text-muted-foreground text-sm">
                  Tell me about yourself — your academic background, skills, and interests — and I&apos;ll suggest personalized career paths for you.
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2 w-full max-w-md">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 whitespace-normal"
                  onClick={() => handleSuggestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto pb-4">
            {messages.map((m) => {
              const textContent = (m as any).text || (m as any).content || (m.parts ? m.parts
                .filter((p: any) => p.type === "text")
                .map((p: any) => p.text)
                .join("") : "");
              if (!textContent) return null;
              return (
                <MessageBubble
                  key={m.id}
                  role={m.role as "user" | "assistant"}
                  content={textContent}
                />
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm pl-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                CareerCompass is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 border-t bg-background shrink-0">
        <div className="flex gap-2 max-w-3xl mx-auto items-end">
          <textarea
            ref={textareaRef}
            className="flex-1 min-h-[60px] max-h-[160px] w-full resize-none rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={input}
            placeholder="Type your message here..."
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            size="icon"
            className="h-[60px] w-[60px] rounded-xl shrink-0"
            disabled={isLoading || !input.trim()}
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
