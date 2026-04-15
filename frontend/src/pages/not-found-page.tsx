import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

interface NotFoundPageProps {
  onOpenCommandPalette: () => void;
}

export function NotFoundPage({ onOpenCommandPalette }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onOpenCommandPalette={onOpenCommandPalette} />
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-primary">404</p>
        <h1 className="mb-4 text-4xl font-bold">This route is not in the MVP.</h1>
        <p className="mb-8 max-w-xl text-muted-foreground">
          TODO: flesh out the rest of the product surfaces after the discovery, trust,
          and import flow is stable.
        </p>
        <Button asChild>
          <Link to="/">Back to homepage</Link>
        </Button>
      </div>
    </div>
  );
}
