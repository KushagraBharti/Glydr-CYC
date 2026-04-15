import type { ProfileSummary } from "@glydr/shared";
import { Download, ShieldCheck, Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileListItemProps {
  profile: ProfileSummary;
}

export function ProfileListItem({ profile }: ProfileListItemProps) {
  const compatibilityClasses =
    profile.compatibility === "requires-update"
      ? "text-destructive bg-destructive/10"
      : "text-green-400 bg-green-400/10";

  return (
    <Card
      className={`group relative overflow-hidden border-border/50 bg-card/50 transition-colors hover:bg-card/80 ${
        profile.recommended ? "border-primary/50" : ""
      }`}
    >
      {profile.recommended ? (
        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
      ) : null}
      <CardContent className="flex flex-col items-start gap-6 p-6 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <Link to={`/profiles/${profile.slug}`}>
              <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                {profile.name}
              </h3>
            </Link>
            <Badge variant="outline" className="h-5 text-[10px] uppercase tracking-wider">
              {profile.version}
            </Badge>
            {profile.recommended ? (
              <Badge className="h-5 border-none bg-primary/20 text-[10px] uppercase tracking-wider text-primary hover:bg-primary/20">
                Recommended
              </Badge>
            ) : null}
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {profile.tier === "Official" ? (
                <ShieldCheck className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4" />
              )}
              <span className="font-medium text-foreground">{profile.creator}</span>
              <span className="text-xs font-bold uppercase tracking-wide">
                {profile.tier}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{profile.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{profile.usage}</span>
            </div>
          </div>

          <p className="max-w-2xl text-sm text-muted-foreground">{profile.description}</p>
        </div>

        <div className="flex w-full shrink-0 flex-col items-end gap-3 md:w-auto md:min-w-[160px]">
          <div className={`rounded-md px-2.5 py-1 text-xs font-medium ${compatibilityClasses}`}>
            {profile.compatibleLabel}
          </div>
          <Button asChild className="w-full font-bold">
            <Link to={`/profiles/${profile.slug}`}>Import</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
