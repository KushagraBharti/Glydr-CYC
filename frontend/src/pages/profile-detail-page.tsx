import type {
  ApiListResponse,
  ImportReceipt,
  ProfileDetail,
  ProfileSummary,
} from "@glydr/shared";
import {
  AlertCircle,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Download,
  History,
  Info,
  MessageSquare,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { ProfileCard } from "@/components/platform/profile-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiGet, apiPost } from "@/lib/api";

interface ProfileDetailPageProps {
  onOpenCommandPalette: () => void;
}

export function ProfileDetailPage({ onOpenCommandPalette }: ProfileDetailPageProps) {
  const { slug = "pro-movement-config" } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [relatedProfiles, setRelatedProfiles] = useState<ProfileSummary[]>([]);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    Promise.all([
      apiGet<ProfileDetail>(`/api/profiles/${slug}`),
      apiGet<ApiListResponse<ProfileSummary>>(`/api/profiles/${slug}/related`),
    ])
      .then(([profileResponse, relatedResponse]) => {
        setProfile(profileResponse);
        setRelatedProfiles(relatedResponse.items);
      })
      .catch((error) => console.error("Failed to load profile detail", error));
  }, [slug]);

  async function handleImport() {
    if (!profile) {
      return;
    }

    setImporting(true);
    try {
      const receipt = await apiPost<ImportReceipt, { profileSlug: string }>(
        "/api/imports",
        { profileSlug: profile.slug },
      );
      navigate(`/import/success?importId=${receipt.id}`);
    } finally {
      setImporting(false);
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onOpenCommandPalette={onOpenCommandPalette} />
        <div className="container mx-auto px-4 py-24 text-muted-foreground">
          Loading profile data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar onOpenCommandPalette={onOpenCommandPalette} />

      <main className="flex-1 pb-20">
        <div className="border-b border-border/40 bg-card/30">
          <div className="container mx-auto px-4 pb-8 pt-6">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Profiles</span>
              <ChevronRight className="h-4 w-4" />
              <span>{profile.gameName}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">{profile.name}</span>
            </div>

            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
                  <Badge
                    variant="outline"
                    className="h-6 border-primary/30 text-xs uppercase tracking-wider text-primary"
                  >
                    {profile.version}
                  </Badge>
                  <Badge className="h-6 border-none bg-primary/20 text-primary hover:bg-primary/20">
                    Current
                  </Badge>
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{profile.creator}</span>
                    <Badge className="h-5 border-none bg-primary/20 px-1.5 text-[10px] uppercase tracking-wide text-primary hover:bg-primary/20">
                      {profile.tier}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-foreground">{profile.rating}</span>
                    <span>({profile.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Download className="h-4 w-4" />
                    <span className="font-medium text-foreground">
                      {profile.usage} imports
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">{profile.heroNote}</span>
                  </div>
                  <div>{profile.publishedAt}</div>
                </div>
              </div>

              <div className="w-full shrink-0 rounded-xl border border-border/50 bg-card/50 p-5 lg:w-auto lg:min-w-[300px]">
                <Button
                  size="lg"
                  className="h-12 w-full text-base font-bold shadow-[0_0_20px_rgba(153,255,0,0.15)] hover:shadow-[0_0_30px_rgba(153,255,0,0.25)]"
                  onClick={() => void handleImport()}
                  disabled={importing}
                >
                  {importing ? "Importing..." : "Import to Control Panel"}
                </Button>
                <div className="mt-3 flex gap-3">
                  <Button variant="outline" className="flex-1 bg-background/50">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save for Later
                  </Button>
                  <Button variant="outline" size="icon" className="bg-background/50">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  TODO: replace stub import with real Control Panel handoff
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-8 px-4">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="max-w-4xl flex-1">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8 h-auto w-full justify-start rounded-none border-b border-border/50 bg-transparent p-0">
                  <TabsTrigger className="rounded-none px-4 pb-3 pt-2 text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent" value="overview">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger className="rounded-none px-4 pb-3 pt-2 text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent" value="config">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Configuration
                  </TabsTrigger>
                  <TabsTrigger className="rounded-none px-4 pb-3 pt-2 text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent" value="history">
                    <History className="mr-2 h-4 w-4" />
                    Version History
                  </TabsTrigger>
                  <TabsTrigger className="rounded-none px-4 pb-3 pt-2 text-base data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent" value="reviews">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {profile.overview.summary}
                  </p>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">What it's optimized for</h3>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                      {profile.overview.optimizedFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">Recommended Playstyle</h3>
                    <p className="text-muted-foreground">
                      {profile.overview.recommendedPlaystyle}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <h4 className="mb-2 flex items-center gap-2 font-bold text-primary">
                      <AlertCircle className="h-4 w-4" />
                      What's new in {profile.version}
                    </h4>
                    <p className="text-sm text-primary/80">{profile.overview.whatsNew}</p>
                  </div>
                </TabsContent>

                <TabsContent value="config">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Preview of key settings included in this profile.
                    </p>
                    <Badge variant="outline" className="font-mono text-xs">
                      MVP Preview
                    </Badge>
                  </div>

                  <Accordion type="single" collapsible defaultValue={profile.configSections[0]?.id}>
                    {profile.configSections.map((section) => (
                      <AccordionItem
                        key={section.id}
                        value={section.id}
                        className="mb-3 rounded-lg border-border/40 bg-card/20 px-4"
                      >
                        <AccordionTrigger className="py-4 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded border border-border/50 bg-background">
                              <span className="font-mono text-xs">{section.icon}</span>
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="font-bold">{section.label}</span>
                              <span className="text-xs font-normal text-muted-foreground">
                                {section.subtitle}
                              </span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="grid gap-4 pt-2 md:grid-cols-3">
                            {section.values.map((value) => (
                              <div
                                key={value.label}
                                className="rounded border border-border/50 bg-background p-3"
                              >
                                <div className="mb-1 text-xs text-muted-foreground">
                                  {value.label}
                                </div>
                                <div
                                  className={`font-mono font-medium ${
                                    value.highlight ? "text-primary" : "text-foreground"
                                  }`}
                                >
                                  {value.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-6">
                    {profile.versions.map((version) => (
                      <div
                        key={version.version}
                        className="rounded-xl border border-border/50 bg-card/50 p-4 shadow"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <Badge className="border-none bg-primary/20 text-primary hover:bg-primary/20">
                            {version.label}
                          </Badge>
                          <span className="font-mono text-xs text-muted-foreground">
                            {version.publishedAt}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{version.notes}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="mb-8 flex items-center gap-6 rounded-xl border border-border/40 bg-card/20 p-6">
                    <div className="flex flex-col items-center justify-center border-r border-border/50 px-6">
                      <div className="mb-1 text-5xl font-bold text-primary">{profile.rating}</div>
                      <div className="mb-1 flex gap-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Star key={value} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {profile.reviewCount.toLocaleString()} Ratings
                      </div>
                    </div>
                    <div className="flex-1 text-sm text-muted-foreground">
                      TODO: replace synthetic review summary with real review data.
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="w-full shrink-0 space-y-6 lg:w-80">
              <Card className="border-border/40 bg-card/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Creator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5 text-lg font-bold leading-none">
                        {profile.creator}
                        <Badge className="h-4 border-none bg-primary/20 px-1 text-[9px] uppercase tracking-wide text-primary hover:bg-primary/20">
                          {profile.creatorMeta.badgeLabel}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {profile.creatorMeta.publishedCount} Profiles published
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="h-8 w-full text-xs">
                    TODO Creator page
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">App Version</span>
                    <span className="font-mono text-foreground">
                      {profile.compatibilityMeta.appVersion}
                    </span>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Firmware</span>
                    <span className="font-mono text-foreground">
                      {profile.compatibilityMeta.firmware}
                    </span>
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Device</span>
                    <span className="text-foreground">{profile.compatibilityMeta.device}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-20 border-t border-border/20 px-4 pt-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProfiles.map((item) => (
              <ProfileCard key={item.slug} profile={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
