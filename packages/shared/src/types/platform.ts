export type ProfileTier = "Official" | "Verified" | "Community";

export type CompatibilityStatus = "compatible" | "warning" | "requires-update";

export interface GameSummary {
  slug: string;
  name: string;
  image: string;
}

export interface ProfileSummary {
  slug: string;
  gameSlug: string;
  gameName: string;
  name: string;
  creator: string;
  rating: number;
  usage: string;
  version: string;
  tier: ProfileTier;
  compatibility: CompatibilityStatus;
  compatibleLabel: string;
  description: string;
  recommended?: boolean;
  featured?: boolean;
}

export interface ProfileVersion {
  version: string;
  label: string;
  publishedAt: string;
  notes: string;
  current?: boolean;
}

export interface ProfileDetail extends ProfileSummary {
  reviewCount: number;
  publishedAt: string;
  heroNote: string;
  overview: {
    summary: string;
    optimizedFor: string[];
    recommendedPlaystyle: string;
    whatsNew: string;
  };
  configSections: Array<{
    id: string;
    label: string;
    subtitle: string;
    icon: string;
    values: Array<{ label: string; value: string; highlight?: boolean }>;
  }>;
  compatibilityMeta: {
    appVersion: string;
    firmware: string;
    device: string;
  };
  creatorMeta: {
    badgeLabel: string;
    publishedCount: number;
  };
  versions: ProfileVersion[];
}

export interface GameDetail {
  slug: string;
  name: string;
  heroImage: string;
  heroTags: string[];
  profileCountLabel: string;
  updatedLabel: string;
  profiles: ProfileSummary[];
}

export interface ImportRequest {
  profileSlug: string;
}

export interface ImportReceipt {
  id: string;
  profileSlug: string;
  profileName: string;
  version: string;
  gameName: string;
  createdAt: string;
  steps: Array<{
    id: string;
    label: string;
    detail: string;
    status: "complete" | "pending";
  }>;
  nextAction: {
    label: string;
    href: string;
  };
}

export interface SessionState {
  isAuthenticated: boolean;
  authMode: "guest" | "dev-bypass";
  userName: string | null;
  shortcutHint: string;
}

export interface ToggleAuthBypassRequest {
  enabled: boolean;
}

export interface ApiListResponse<T> {
  items: T[];
}

export interface HomeFeed {
  games: GameSummary[];
  officialProfiles: ProfileSummary[];
  communityProfiles: ProfileSummary[];
}
