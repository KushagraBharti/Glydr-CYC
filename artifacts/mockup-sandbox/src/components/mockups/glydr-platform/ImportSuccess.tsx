import React, { useEffect, useState } from "react";
import { Search, CheckCircle2, ChevronRight, Download, Gamepad2, Settings, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <div className="flex items-center gap-2 mr-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">G</span>
          </div>
          <span className="font-bold text-xl tracking-tight">GLYDR</span>
        </div>
        
        <div className="hidden md:flex flex-1 items-center space-x-2">
          <div className="relative w-full max-w-sm opacity-50 pointer-events-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search profiles, games, or creators..."
              className="w-full bg-muted/50 border-none pl-9 h-9"
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="sm" className="hidden sm:flex">Creator Hub</Button>
          <div className="w-8 h-8 rounded-full bg-muted border border-border/50 overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=glydruser`} alt="User" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function ImportSuccess() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Simulate the steps of the import process for a nice reveal
    const timer1 = setTimeout(() => setStep(1), 600);
    const timer2 = setTimeout(() => setStep(2), 1400);
    const timer3 = setTimeout(() => setStep(3), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-50" />
        
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center z-10">
          
          {/* Animated Success Visual */}
          <div className="relative w-32 h-32 mb-8">
            {/* Pulsing ring */}
            <div className={`absolute inset-0 rounded-full border-4 border-primary/30 transition-all duration-1000 ${step >= 3 ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`} />
            
            {/* Main circle */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/50 flex items-center justify-center shadow-[0_0_40px_rgba(153,255,0,0.2)] transition-all duration-500 delay-300 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <CheckCircle2 className={`w-16 h-16 text-primary transition-all duration-500 delay-500 ${step >= 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
            </div>
            
            {/* Particles */}
            {step >= 3 && (
              <>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full animate-[ping_1s_ease-out_forwards]" style={{ transform: 'translate(-50%, -40px)' }} />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary rounded-full animate-[ping_1s_ease-out_forwards]" style={{ transform: 'translate(-50%, 40px)' }} />
                <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full animate-[ping_1s_ease-out_forwards]" style={{ transform: 'translate(-40px, -50%)' }} />
                <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full animate-[ping_1s_ease-out_forwards]" style={{ transform: 'translate(40px, -50%)' }} />
              </>
            )}
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold tracking-tight mb-3 text-center transition-all duration-700 ${step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            Profile Imported Successfully
          </h1>
          
          <p className={`text-muted-foreground text-center max-w-md mb-10 transition-all duration-700 delay-100 ${step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <strong className="text-foreground font-medium">Pro Movement Config v2.3</strong> is now available in your Glydr Control Panel and ready to apply to your controller.
          </p>

          {/* Status Pipeline */}
          <div className={`w-full max-w-md bg-card/30 border border-border/50 rounded-xl p-6 mb-10 transition-all duration-700 delay-200 ${step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                  <Download className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Profile Downloaded</div>
                  <div className="text-xs text-muted-foreground">Securely fetched from platform</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              
              <div className="relative">
                <div className="absolute -top-6 left-4 bottom-6 w-px bg-border/50 -z-10" />
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${step >= 1 ? 'bg-primary/20 border-primary/30 text-primary' : 'bg-muted border-border/50 text-muted-foreground'}`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium text-sm transition-colors duration-500 ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Delivered to Control Panel</div>
                    <div className="text-xs text-muted-foreground">Synced to your local app</div>
                  </div>
                  {step >= 1 && <CheckCircle2 className="w-5 h-5 text-primary animate-in fade-in zoom-in duration-300" />}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-6 left-4 bottom-6 w-px bg-border/50 -z-10" />
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${step >= 3 ? 'bg-primary/20 border-primary/30 text-primary shadow-[0_0_15px_rgba(153,255,0,0.2)]' : 'bg-muted border-border/50 text-muted-foreground'}`}>
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium text-sm transition-colors duration-500 ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>Ready to Apply</div>
                    <div className="text-xs text-muted-foreground">Open app to activate on controller</div>
                  </div>
                  {step >= 3 && <CheckCircle2 className="w-5 h-5 text-primary animate-in fade-in zoom-in duration-300" />}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={`flex flex-col sm:flex-row gap-4 w-full max-w-md transition-all duration-700 delay-300 ${step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Button size="lg" className="flex-1 font-bold shadow-[0_0_20px_rgba(153,255,0,0.15)] hover:shadow-[0_0_30px_rgba(153,255,0,0.25)]">
              Open Control Panel <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="flex-1 bg-background/50">
              Browse More Profiles
            </Button>
          </div>
          
          <div className={`mt-8 text-center transition-all duration-700 delay-500 ${step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
              View Import History
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
