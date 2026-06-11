"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, MessageSquarePlus, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSessionSummary {
  id: string;
  title: string;
  createdAt: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/chat-sessions");
        if (res.ok) {
          const data = await res.json();
          setSessions(data);
        }
      } catch {
        // silently fail — user just won't see history
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [pathname]); // refetch when route changes (e.g. after saving new session)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r bg-card transition-all duration-300 shrink-0",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden border-r-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm">CareerCompass</span>
        </div>

        {/* New Chat button */}
        <div className="p-3 border-b">
          <Button
            className="w-full justify-start gap-2"
            size="sm"
            onClick={() => router.push("/chat")}
          >
            <MessageSquarePlus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto py-2">
          <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Chats
          </p>

          {loading ? (
            <div className="space-y-1.5 px-3 mt-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-md bg-muted/60 animate-pulse"
                />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <p className="px-4 py-3 text-xs text-muted-foreground">
              No saved chats yet.
            </p>
          ) : (
            <ul className="space-y-0.5 px-2">
              {sessions.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/chat/${s.id}`}
                    className={cn(
                      "flex flex-col gap-0.5 w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-muted",
                      pathname === `/chat/${s.id}` && "bg-muted"
                    )}
                  >
                    <span className="text-sm font-medium leading-tight truncate">
                      {s.title}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDate(s.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Main content + toggle button */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className={cn(
            "absolute top-4 z-20 flex items-center justify-center w-5 h-8 rounded-r-md bg-card border border-l-0 border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all",
            sidebarOpen ? "left-0" : "left-0"
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            className={cn(
              "w-3 h-3 transition-transform duration-300",
              sidebarOpen && "rotate-180"
            )}
          />
        </button>

        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
