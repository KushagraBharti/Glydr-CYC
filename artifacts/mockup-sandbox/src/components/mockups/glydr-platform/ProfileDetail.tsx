import React from "react";
import { Search, ChevronRight, Star, Download, ShieldCheck, User, Share2, Bookmark, CheckCircle2, History, MessageSquare, AlertCircle, Info, Settings2, ShieldAlert } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Separator } from "../../ui/separator";

const RELATED_PROFILES = [
  { name: "Low Sensitivity Aim Lab", game: "Apex Legends", creator: "AimGods", rating: 4.8, usage: "8.2k", version: "v1.1", type: "Verified" },
  { name: "Ranked Competitive v3", game: "Apex Legends", creator: "GlydrTeam", rating: 4.9, usage: "3.2k", version: "v3.1", type: "Official" },
  { name: "Recoil Control Master", game: "Apex Legends", creator: "NoRecoil", rating: 4.5, usage: "9.8k", version: "v1.0", type: "Verified" },
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
    <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors cursor-pointer group">
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
          {profile.type === 'Official' ? <ShieldCheck className="w-3.5 h-3.5 text-primary" /> : <User className="w-3.5 h-3.5 text-muted-foreground" />}
          <span className="text-sm text-muted-foreground font-medium">
            {profile.creator}
          </span>
          {profile.type === 'Official' && (
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
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileDetail() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Breadcrumb & Header */}
        <div className="border-b border-border/40 bg-card/30">
          <div className="container mx-auto px-4 pt-6 pb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="hover:text-foreground cursor-pointer transition-colors">Profiles</span>
              <ChevronRight className="w-4 h-4" />
              <span className="hover:text-foreground cursor-pointer transition-colors">Apex Legends</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">Pro Movement Config</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold tracking-tight">Pro Movement Config</h1>
                  <Badge variant="outline" className="text-xs uppercase tracking-wider h-6 border-primary/30 text-primary">
                    v2.3
                  </Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-none h-6">
                    Current
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">GlydrTeam</span>
                    <Badge variant="default" className="h-5 px-1.5 text-[10px] uppercase tracking-wide bg-primary/20 text-primary hover:bg-primary/20">
                      Official
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-medium text-foreground">4.9</span>
                    <span>(2,104 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Download className="w-4 h-4" />
                    <span className="font-medium text-foreground">14,823 imports</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Compatible with Control Panel 3.1+</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Published Oct 12, 2023</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[300px] shrink-0 w-full lg:w-auto p-5 bg-card/50 rounded-xl border border-border/50">
                <Button size="lg" className="w-full font-bold text-base h-12 shadow-[0_0_20px_rgba(153,255,0,0.15)] hover:shadow-[0_0_30px_rgba(153,255,0,0.25)] transition-shadow">
                  Import to Control Panel
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-background/50">
                    <Bookmark className="w-4 h-4 mr-2" /> Save for Later
                  </Button>
                  <Button variant="outline" size="icon" className="bg-background/50">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Info className="w-3.5 h-3.5" /> Requires Glydr Firmware v1.4.2+
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 max-w-4xl">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-transparent border-b border-border/50 w-full justify-start h-auto p-0 rounded-none mb-8">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2 text-base"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="config" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2 text-base flex items-center gap-2"
                  >
                    <Settings2 className="w-4 h-4" /> Configuration
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2 text-base flex items-center gap-2"
                  >
                    <History className="w-4 h-4" /> Version History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3 pt-2 text-base flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Reviews
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8 mt-0 focus-visible:outline-none">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      The definitive movement profile for competitive Apex Legends. Tuned specifically for players who prioritize advanced movement mechanics—tap-strafing, super-gliding, and wall-bouncing—without sacrificing aiming precision in close-quarters combat.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">What it's optimized for</h3>
                    <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                      <li><strong>Instant Response:</strong> Zero deadzone configuration on the left stick for immediate directional input.</li>
                      <li><strong>Movement Tech:</strong> Dedicated macro mapping for consistent super-glides and easier zip-line jumps.</li>
                      <li><strong>Close Quarters:</strong> Aggressive response curve on the right stick for rapid target acquisition.</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-4">Recommended Playstyle</h3>
                    <p className="text-muted-foreground">
                      Best suited for aggressive players who prefer SMGs (R-99, CAR, Volt) and Shotguns (Peacekeeper, Mastiff). The high sensitivity curve requires good thumb control but rewards you with unparalleled turn speed.
                    </p>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-8">
                      <h4 className="text-primary font-bold flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4" /> What's new in v2.3
                      </h4>
                      <p className="text-sm text-primary/80">
                        Adjusted the outer threshold on the right stick to prevent accidental flick-overs during intense tracking scenarios. Minor tweaks to the trigger deadzones for faster semi-auto firing.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="config" className="mt-0 focus-visible:outline-none">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">Preview of key settings included in this profile.</p>
                    <Badge variant="outline" className="font-mono text-xs">Size: 14KB</Badge>
                  </div>
                  
                  <Accordion type="single" collapsible defaultValue="aim" className="w-full">
                    <AccordionItem value="aim" className="border-border/40 bg-card/20 px-4 rounded-lg mb-3">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border/50">
                            <span className="font-mono text-xs">R</span>
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-bold">Aim / Look (Right Stick)</span>
                            <span className="text-xs text-muted-foreground font-normal">Response curve, deadzone, outer threshold</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Response Curve</div>
                            <div className="font-mono text-primary font-medium">Linear (Aggressive)</div>
                          </div>
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Deadzone</div>
                            <div className="font-mono text-foreground font-medium">3% (Minimal)</div>
                          </div>
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Outer Threshold</div>
                            <div className="font-mono text-foreground font-medium">2%</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="move" className="border-border/40 bg-card/20 px-4 rounded-lg mb-3">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border/50">
                            <span className="font-mono text-xs">L</span>
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-bold">Movement (Left Stick)</span>
                            <span className="text-xs text-muted-foreground font-normal">Deadzone, max input</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Deadzone</div>
                            <div className="font-mono text-primary font-medium">0% (Instant)</div>
                          </div>
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Max Input Threshold</div>
                            <div className="font-mono text-foreground font-medium">90%</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="triggers" className="border-border/40 bg-card/20 px-4 rounded-lg">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border/50">
                            <span className="font-mono text-xs">T</span>
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-bold">Triggers (L2/R2)</span>
                            <span className="text-xs text-muted-foreground font-normal">Actuation point, hair-trigger settings</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Mode</div>
                            <div className="font-mono text-primary font-medium">Digital (Hair Trigger)</div>
                          </div>
                          <div className="bg-background rounded p-3 border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">Actuation Point</div>
                            <div className="font-mono text-foreground font-medium">10%</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="history" className="mt-0 focus-visible:outline-none">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/50 bg-card/50 shadow">
                        <div className="flex items-center justify-between mb-1">
                          <Badge className="bg-primary/20 text-primary border-none hover:bg-primary/20">v2.3 (Current)</Badge>
                          <span className="text-xs text-muted-foreground font-mono">Oct 12, 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Adjusted outer threshold on right stick and minor trigger deadzone tweaks.</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/20 bg-background/50 shadow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-foreground">v2.2</span>
                          <span className="text-xs text-muted-foreground font-mono">Sep 04, 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Fixed left stick drift issues for older controllers by bumping deadzone from 0% to 1%.</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/20 bg-background/50 shadow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-foreground">v2.1</span>
                          <span className="text-xs text-muted-foreground font-mono">Aug 15, 2023</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Optimized for Season 18 movement changes. Re-tuned response curve.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0 focus-visible:outline-none">
                  <div className="flex items-center gap-6 mb-8 p-6 rounded-xl bg-card/20 border border-border/40">
                    <div className="flex flex-col items-center justify-center px-6 border-r border-border/50">
                      <div className="text-5xl font-bold text-primary mb-1">4.9</div>
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                      </div>
                      <div className="text-xs text-muted-foreground">2,104 Ratings</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[
                        { stars: 5, pct: 92 },
                        { stars: 4, pct: 6 },
                        { stars: 3, pct: 1 },
                        { stars: 2, pct: 0 },
                        { stars: 1, pct: 1 }
                      ].map((row) => (
                        <div key={row.stars} className="flex items-center gap-3 text-sm">
                          <div className="w-12 text-muted-foreground text-right">{row.stars} star</div>
                          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${row.pct}%` }} />
                          </div>
                          <div className="w-8 text-muted-foreground text-right">{row.pct}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center p-8 text-muted-foreground border border-border/40 rounded-xl bg-background/50">
                    <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p>Reviews are only visible after importing and using a profile for 24 hours.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 shrink-0 space-y-6">
              <Card className="bg-card/30 border-border/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Creator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg leading-none mb-1 flex items-center gap-1.5">
                        GlydrTeam
                        <Badge variant="default" className="h-4 px-1 text-[9px] uppercase tracking-wide bg-primary/20 text-primary hover:bg-primary/20">
                          Official
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">34 Profiles published</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full text-xs h-8">View all profiles</Button>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">App Version</span>
                    <span className="font-mono text-foreground">3.1+</span>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Firmware</span>
                    <span className="font-mono text-foreground">v1.4.2+</span>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Device</span>
                    <span className="text-foreground">Glydr Pro</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Profiles */}
        <div className="container mx-auto px-4 mt-20 pt-10 border-t border-border/20">
          <h2 className="text-2xl font-bold tracking-tight mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_PROFILES.map((profile, i) => (
              <ProfileCard key={i} profile={profile} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
