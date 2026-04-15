import type { ProfileSummary } from "@glydr/shared";
import { Download, ShieldCheck, Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileCardProps {
  profile: ProfileSummary;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="group flex h-full w-[300px] flex-shrink-0 cursor-pointer border-border/50 bg-card/50 transition-colors hover:bg-card/80">
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <Badge variant="secondary" className="bg-secondary/50 text-xs font-medium">
            {profile.gameName}
          </Badge>
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {profile.version}
          </Badge>
        </div>

        <Link to={`/profiles/${profile.slug}`}>
          <h3 className="mb-1 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
            {profile.name}
          </h3>
        </Link>

        <div className="mb-4 flex items-center gap-1.5">
          {profile.tier === "Official" ? (
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          ) : (
            <User className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {profile.creator}
          </span>
          {profile.tier === "Official" ? (
            <Badge
              variant="default"
              className="h-4 bg-primary/20 px-1 text-[9px] uppercase tracking-wide text-primary hover:bg-primary/20"
            >
              Official
            </Badge>
          ) : null}
        </div>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {profile.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-medium text-foreground">{profile.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>{profile.usage}</span>
            </div>
          </div>
          <Button asChild size="sm" className="h-8 rounded-full px-4 font-semibold">
            <Link to={`/profiles/${profile.slug}`}>Import</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
