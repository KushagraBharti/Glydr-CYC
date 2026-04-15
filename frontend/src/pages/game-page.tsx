import type { GameDetail } from "@glydr/shared";
import { Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { ProfileListItem } from "@/components/platform/profile-list-item";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiGet } from "@/lib/api";

interface GamePageProps {
  onOpenCommandPalette: () => void;
}

export function GamePage({ onOpenCommandPalette }: GamePageProps) {
  const { slug = "apex-legends" } = useParams();
  const [game, setGame] = useState<GameDetail | null>(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    apiGet<GameDetail>(`/api/games/${slug}`)
      .then(setGame)
      .catch((error) => console.error("Failed to load game page", error));
  }, [slug]);

  const visibleProfiles = useMemo(() => {
    if (!game) {
      return [];
    }

    const filtered =
      filter === "all"
        ? game.profiles
        : game.profiles.filter((profile) =>
            filter === "official"
              ? profile.tier === "Official"
              : filter === "verified"
                ? profile.tier === "Verified"
                : profile.tier === "Community",
          );

    if (sort === "rated") {
      return [...filtered].sort((left, right) => right.rating - left.rating);
    }

    if (sort === "recent") {
      return [...filtered].sort((left, right) => right.version.localeCompare(left.version));
    }

    return [...filtered].sort(
      (left, right) =>
        parseUsageLabel(right.usage) - parseUsageLabel(left.usage),
    );
  }, [filter, game, sort]);

  if (!game) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onOpenCommandPalette={onOpenCommandPalette} />
        <div className="container mx-auto px-4 py-24 text-muted-foreground">
          Loading game data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar onOpenCommandPalette={onOpenCommandPalette} />

      <main className="flex-1">
        <section className="relative h-[300px] border-b border-border/40">
          <img
            src={game.heroImage}
            alt={game.name}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          <div className="container relative z-10 mx-auto flex h-full items-end px-4 pb-8">
            <div>
              <div className="mb-3 flex gap-2">
                {game.heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/10 px-2.5 py-1 text-sm text-white backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
                {game.name}
              </h1>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium text-primary">{game.profileCountLabel}</span>
                <span>·</span>
                <span>{game.updatedLabel}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
                <TabsList className="border border-border/50 bg-muted/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="official">Official</TabsTrigger>
                  <TabsTrigger value="verified">Verified</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex w-full items-center gap-3 md:w-auto">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  TODO Filters
                </Button>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="rated">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {visibleProfiles.map((profile) => (
                <ProfileListItem key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function parseUsageLabel(value: string): number {
  const normalized = value.trim().toLowerCase();
  if (normalized.endsWith("k")) {
    return Number.parseFloat(normalized.slice(0, -1)) * 1000;
  }

  return Number.parseFloat(normalized);
}
