import React from "react";
import { Search, ChevronRight, Star, Download, ShieldCheck, User } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";

const GAMES = [
  { name: "Apex Legends", image: "/__mockup/images/cover-apex.png" },
  { name: "Valorant", image: "/__mockup/images/cover-valorant.png" },
  { name: "Fortnite", image: "/__mockup/images/cover-fortnite.png" },
  { name: "Call of Duty: Warzone", image: "/__mockup/images/cover-cod.png" },
  { name: "Overwatch 2", image: "/__mockup/images/cover-ow2.png" },
  { name: "CS2", image: "/__mockup/images/cover-cs2.png" },
  { name: "Elden Ring", image: "/__mockup/images/cover-elden.png" },
  { name: "Rocket League", image: "/__mockup/images/cover-rocket.png" },
];

const OFFICIAL_PROFILES = [
  { name: "Pro Movement Config", game: "Apex Legends", creator: "GlydrTeam", rating: 4.9, usage: "14.8k", version: "v2.3", official: true },
  { name: "Low Sensitivity Aim Lab", game: "Valorant", creator: "GlydrTeam", rating: 4.8, usage: "8.2k", version: "v1.1", official: true },
  { name: "Controller Aim Assist Max", game: "Call of Duty", creator: "GlydrTeam", rating: 4.7, usage: "21.4k", version: "v3.0", official: true },
  { name: "Building & Edits", game: "Fortnite", creator: "GlydrTeam", rating: 4.6, usage: "11.1k", version: "v1.4", official: true },
  { name: "Sniper Precision Build", game: "CS2", creator: "GlydrTeam", rating: 4.8, usage: "5.5k", version: "v2.0", official: true },
];

const COMMUNITY_PROFILES = [
  { name: "Ranked Competitive v3", game: "Valorant", creator: "TenzFan", rating: 4.9, usage: "3.2k", version: "v3.1", official: false },
  { name: "Recoil Control Master", game: "Apex Legends", creator: "NoRecoil", rating: 4.5, usage: "9.8k", version: "v1.0", official: false },
  { name: "High DPI Aggressive", game: "Overwatch 2", creator: "GenjiMain", rating: 4.3, usage: "1.4k", version: "v1.2", official: false },
  { name: "Tournament Standard", game: "Rocket League", creator: "FlipReset", rating: 4.7, usage: "4.1k", version: "v2.1", official: false },
];

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
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search profiles, games, or creators..."
              className="w-full bg-muted/50 border-none pl-9 h-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="sm" className="hidden sm:flex">Creator Hub</Button>
          <Button variant="outline" size="sm">Sign In</Button>
        </div>
      </div>
    </nav>
  );
}

function ProfileCard({ profile }: { profile: any }) {
  return (
    <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors cursor-pointer group flex-shrink-0 w-[300px]">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="bg-secondary/50 text-xs font-medium">
            {profile.game}
          </Badge>
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {profile.version}
          </Badge>
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
          {profile.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-4">
          {profile.official ? (
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          ) : (
            <User className="w-3.5 h-3.5 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground font-medium">
            {profile.creator}
          </span>
          {profile.official && (
            <Badge variant="default" className="h-4 px-1 text-[9px] uppercase tracking-wide bg-primary/20 text-primary hover:bg-primary/20">
              Official
            </Badge>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="font-medium text-foreground">{profile.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>{profile.usage}</span>
            </div>
          </div>
          <Button size="sm" className="h-8 rounded-full px-4 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Import
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                New: Auto-Sync for Control Panel 3.1
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                Find the perfect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">profile</span> for your game.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Discover, trust, and instantly import device profiles tuned by pros and the Glydr team. High-performance settings applied in seconds.
              </p>
              <div className="flex items-center gap-4">
                <Button size="lg" className="h-12 px-8 font-bold text-base">
                  Browse Profiles
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 font-bold text-base">
                  Open Control Panel
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-12 border-t border-border/20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Browse by Game</h2>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {GAMES.map((game, i) => (
                <div key={i} className="group cursor-pointer relative rounded-xl overflow-hidden aspect-[3/4] border border-border/50">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <span className="font-bold text-sm text-white leading-tight">{game.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Official Profiles */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" /> Official Profiles
                </h2>
                <p className="text-muted-foreground mt-1">Tuned and verified by the Glydr team.</p>
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
              {OFFICIAL_PROFILES.map((profile, i) => (
                <div key={i} className="snap-start">
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Profiles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Trending in Community</h2>
                <p className="text-muted-foreground mt-1">Top rated configs from trusted players.</p>
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
              {COMMUNITY_PROFILES.map((profile, i) => (
                <div key={i} className="snap-start">
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/40 text-center text-sm text-muted-foreground bg-background">
        <div className="container mx-auto">
          <p>Glydr Profile Platform. Built for performance.</p>
        </div>
      </footer>
    </div>
  );
}
