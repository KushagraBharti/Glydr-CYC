import type { ApiListResponse, GameSummary, ProfileSummary } from "@glydr/shared";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { ProfileCard } from "@/components/platform/profile-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/api";

interface HomePageProps {
  onOpenCommandPalette: () => void;
}

export function HomePage({ onOpenCommandPalette }: HomePageProps) {
  const [games, setGames] = useState<GameSummary[]>([]);
  const [profiles, setProfiles] = useState<ProfileSummary[]>([]);

  useEffect(() => {
    Promise.all([
      apiGet<ApiListResponse<GameSummary>>("/api/games"),
      apiGet<ApiListResponse<ProfileSummary>>("/api/profiles"),
    ])
      .then(([gamesResponse, profilesResponse]) => {
        setGames(gamesResponse.items);
        setProfiles(profilesResponse.items);
      })
      .catch((error) => {
        console.error("Failed to load home data", error);
      });
  }, []);

  const officialProfiles = profiles.filter((profile) => profile.tier === "Official");
  const communityProfiles = profiles.filter((profile) => profile.tier !== "Official");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar onOpenCommandPalette={onOpenCommandPalette} />

      <main className="flex-1">
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-2xl">
              <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
                New: Control Panel sync is stubbed for the MVP
              </Badge>
              <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
                Find the perfect <br />
                <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  profile
                </span>{" "}
                for your game.
              </h1>
              <p className="mb-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
                Discover, trust, and import device profiles tuned by pros and the Glydr
                team. This MVP keeps the flow thin but functional.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-base font-bold">
                  <Link to="/games/apex-legends">Browse Profiles</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base font-bold"
                  onClick={onOpenCommandPalette}
                >
                  Open Command Palette
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/20 bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Browse by Game</h2>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
              {games.map((game) => (
                <Link
                  key={game.slug}
                  to={`/games/${game.slug}`}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border/50"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3">
                    <span className="text-sm font-bold leading-tight text-white">
                      {game.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/20 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Official Profiles
              </h2>
              <p className="mt-1 text-muted-foreground">
                Tuned and verified by the Glydr team.
              </p>
            </div>

            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
              {officialProfiles.map((profile) => (
                <ProfileCard key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Trending in Community</h2>
              <p className="mt-1 text-muted-foreground">
                Top-rated configs from trusted players and early creators.
              </p>
            </div>

            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4">
              {communityProfiles.map((profile) => (
                <ProfileCard key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>Glydr Profile Platform MVP. TODO: replace JSON storage and stub sync.</p>
        </div>
      </footer>
    </div>
  );
}
