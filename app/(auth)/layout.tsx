import Link from "next/link";
import { Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Compass className="size-4" />
          </div>
          CareerCompass
        </Link>
        <Card>
          <CardContent className="p-6 md:p-8">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
