import { CheckCircle2, Download, Gamepad2, Smartphone, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { ImportReceipt } from "@glydr/shared";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";

interface ImportSuccessPageProps {
  onOpenCommandPalette: () => void;
}

export function ImportSuccessPage({ onOpenCommandPalette }: ImportSuccessPageProps) {
  const [searchParams] = useSearchParams();
  const importId = searchParams.get("importId");
  const [receipt, setReceipt] = useState<ImportReceipt | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!importId) {
      return;
    }

    apiGet<ImportReceipt>(`/api/imports/${importId}`)
      .then(setReceipt)
      .catch((error) => console.error("Failed to load import receipt", error));
  }, [importId]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 400);
    const timer2 = setTimeout(() => setStep(2), 1000);
    const timer3 = setTimeout(() => setStep(3), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar onOpenCommandPalette={onOpenCommandPalette} />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px] opacity-50" />

        <div className="z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
          <div className="relative mb-8 h-32 w-32">
            <div
              className={`absolute inset-0 rounded-full border-4 border-primary/30 transition-all duration-1000 ${
                step >= 3 ? "scale-110 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full border border-primary/50 bg-gradient-to-br from-primary/20 to-primary/5 shadow-[0_0_40px_rgba(153,255,0,0.2)] transition-all duration-500 delay-300 ${
                step >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <CheckCircle2
                className={`h-16 w-16 text-primary transition-all duration-500 delay-500 ${
                  step >= 2 ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
              />
            </div>
          </div>

          <h1
            className={`mb-3 text-center text-3xl font-bold tracking-tight transition-all duration-700 md:text-4xl ${
              step >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Profile Imported Successfully
          </h1>

          <p
            className={`mb-10 max-w-md text-center text-muted-foreground transition-all duration-700 delay-100 ${
              step >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {receipt ? (
              <>
                <strong className="font-medium text-foreground">
                  {receipt.profileName} {receipt.version}
                </strong>{" "}
                is now available in your Glydr Control Panel stub flow.
              </>
            ) : (
              "Loading import receipt..."
            )}
          </p>

          <div
            className={`mb-10 w-full max-w-md rounded-xl border border-border/50 bg-card/30 p-6 transition-all duration-700 delay-200 ${
              step >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <PipelineRow
                icon={<Download className="h-4 w-4" />}
                title="Profile Downloaded"
                detail="Securely fetched from platform"
                complete
              />
              <PipelineRow
                icon={<Smartphone className="h-4 w-4" />}
                title="Delivered to Control Panel"
                detail="Synced to your local app"
                complete={step >= 1}
              />
              <PipelineRow
                icon={<Gamepad2 className="h-4 w-4" />}
                title="Ready to Apply"
                detail="Open app to activate on controller"
                complete={step >= 3}
              />
            </div>
          </div>

          <div
            className={`flex w-full max-w-md flex-col gap-4 transition-all duration-700 delay-300 sm:flex-row ${
              step >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button asChild size="lg" className="flex-1 font-bold">
              <a href={receipt?.nextAction.href ?? "/todo/control-panel"}>
                Open Control Panel
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 bg-background/50">
              <Link to="/">Browse More Profiles</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function PipelineRow({
  icon,
  title,
  detail,
  complete,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
          complete
            ? "border-primary/30 bg-primary/20 text-primary"
            : "border-border/50 bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className={`text-sm font-medium ${complete ? "text-foreground" : "text-muted-foreground"}`}>
          {title}
        </div>
        <div className="text-xs text-muted-foreground">{detail}</div>
      </div>
      {complete ? <CheckCircle2 className="h-5 w-5 text-primary" /> : null}
    </div>
  );
}
