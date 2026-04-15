import { Command, Search, ShieldCheck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@/features/session/session-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link to="/" className="mr-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight">GLYDR</span>
        </Link>

        <div className="hidden flex-1 items-center space-x-2 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search is stubbed for MVP"
              className="h-9 w-full border-none bg-muted/50 pl-9"
              readOnly
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={onOpenCommandPalette}
          >
            <Command className="mr-2 h-4 w-4" />
            Ctrl+K
          </Button>
          {session?.isAuthenticated ? (
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">{session.userName}</span>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={onOpenCommandPalette}>
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
