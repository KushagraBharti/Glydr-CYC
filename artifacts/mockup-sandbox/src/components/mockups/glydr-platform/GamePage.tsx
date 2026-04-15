import React from "react";
import { Search, ChevronDown, Star, Download, ShieldCheck, User, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

const PROFILES = [
  { name: "Pro Movement Config", creator: "GlydrTeam", rating: 4.9, usage: "14.8k", version: "v2.3", type: "Official", desc: "Optimized for tap-strafing and rapid directional changes. Official tournament standard.", compatible: true, recommended: true },
  { name: "Low Sensitivity Aim Lab", creator: "AimGods", rating: 4.8, usage: "8.2k", version: "v1.1", type: "Verified", desc: "Pixel-perfect tracking for medium to long range engagements.", compatible: true },
  { name: "Controller Aim Assist Max", creator: "ConsoleKing", rating: 4.7, usage: "21.4k", version: "v3.0", type: "Community", desc: "Maximizes rotational aim assist engagement. High linear sensitivity.", compatible: true },
  { name: "Sniper Precision Build", creator: "LongShot", rating: 4.6, usage: "5.5k", version: "v2.0", type: "Community", desc: "Lowered ADS sensitivity for scopes 4x and above.", compatible: false },
  { name: "Ranked Competitive v3", creator: "GlydrTeam", rating: 4.9, usage: "3.2k", version: "v3.1", type: "Official", desc: "Balanced configuration for solo-queue ranked play. Good all-rounder.", compatible: true },
  { name: "Recoil Control Master", creator: "NoRecoil", rating: 4.5, usage: "9.8k", version: "v1.0", type: "Verified", desc: "Specific deadzone tweaks to make flatline and r301 recoil easier to manage.", compatible: true },
  { name: "High DPI Aggressive", creator: "WKeyOnly", rating: 4.3, usage: "1.4k", version: "v1.2", type: "Community", desc: "Extremely fast response curve for aggressive close-quarters combat.", compatible: true },
  { name: "Tournament Standard", creator: "ALGS_Pro", rating: 4.7, usage: "4.1k", version: "v2.1", type: "Verified", desc: "Exact replica of settings used by top controller pros in recent tournaments.", compatible: true },
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

function ProfileListItem({ profile }: { profile: any }) {
  return (
    <Card className={`bg-card/50 border-border/50 hover:bg-card/80 transition-colors group relative overflow-hidden ${profile.recommended ? 'border-primary/50' : ''}`}>
      {profile.recommended && (
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      )}
      <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
              {profile.name}
            </h3>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider h-5">
              {profile.version}
            </Badge>
            {profile.recommended && (
              <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/20 border-none h-5 text-[10px] uppercase tracking-wider">
                Recommended
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5">
              {profile.type === 'Official' ? <ShieldCheck className="w-4 h-4 text-primary" /> : <User className="w-4 h-4" />}
              <span className="font-medium text-foreground">{profile.creator}</span>
              {profile.type === 'Official' && <span className="text-primary text-xs uppercase tracking-wide font-bold">Official</span>}
              {profile.type === 'Verified' && <span className="text-blue-400 text-xs uppercase tracking-wide font-bold">Verified</span>}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{profile.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{profile.usage}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 max-w-2xl">
            {profile.desc}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[140px] shrink-0 w-full md:w-auto">
          {profile.compatible ? (
            <div className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Compatible
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-destructive bg-destructive/10 px-2.5 py-1 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
              Firmware Update Req
            </div>
          )}
          <Button className="w-full font-bold">
            Import
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function GamePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Game Hero */}
        <section className="relative h-[300px] border-b border-border/40">
          <img 
            src="/__mockup/images/apex-hero.png" 
            alt="Apex Legends" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          <div className="container mx-auto px-4 h-full relative z-10 flex items-end pb-8">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur">Battle Royale</Badge>
                <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur">FPS</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Apex Legends</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="text-primary font-medium">3,847 profiles</span>
                <span>·</span>
                <span>Updated today</span>
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <Tabs defaultValue="all" className="w-full md:w-auto">
                <TabsList className="bg-muted/50 border border-border/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="official" className="flex gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Official</TabsTrigger>
                  <TabsTrigger value="verified">Verified Creators</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px] h-9">
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

            {/* Profile List */}
            <div className="flex flex-col gap-4">
              {PROFILES.map((profile, i) => (
                <ProfileListItem key={i} profile={profile} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="font-medium">
                Load More Profiles
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
