import type {
  GameDetail,
  GameSummary,
  HomeFeed,
  ImportReceipt,
  ImportRequest,
  ProfileSummary,
  SessionState,
  ToggleAuthBypassRequest,
} from "@glydr/shared";
import { randomUUID } from "node:crypto";
import { JsonRepository } from "../repositories/json-repository.js";
import type { GamesStorage, ProfilesStorage, StoredProfile, UsersStorage } from "../types/storage.js";

const gamesRepository = new JsonRepository<GamesStorage>("storage/games.json");
const profilesRepository = new JsonRepository<ProfilesStorage>("storage/profiles.json");
const importsRepository = new JsonRepository<ImportReceipt[]>("storage/imports.json");
const usersRepository = new JsonRepository<UsersStorage>("storage/users.json");

function getCoverImage(slug: string): string {
  switch (slug) {
    case "apex-legends":
      return "/images/cover-apex.png";
    case "valorant":
      return "/images/cover-valorant.png";
    case "fortnite":
      return "/images/cover-fortnite.png";
    case "call-of-duty-warzone":
      return "/images/cover-cod.png";
    case "overwatch-2":
      return "/images/cover-ow2.png";
    case "cs2":
      return "/images/cover-cs2.png";
    case "elden-ring":
      return "/images/cover-elden.png";
    case "rocket-league":
      return "/images/cover-rocket.png";
    default:
      return "/images/cover-apex.png";
  }
}

function toSummary(profile: StoredProfile): ProfileSummary {
  const {
    reviewCount: _reviewCount,
    publishedAt: _publishedAt,
    heroNote: _heroNote,
    overview: _overview,
    configSections: _configSections,
    compatibilityMeta: _compatibilityMeta,
    creatorMeta: _creatorMeta,
    versions: _versions,
    relatedProfileSlugs: _relatedProfileSlugs,
    ...summary
  } = profile;
  return summary;
}

export class PlatformService {
  async getHomeFeed(): Promise<HomeFeed> {
    const [games, profiles] = await Promise.all([
      gamesRepository.read(),
      profilesRepository.read(),
    ]);

    return {
      games: games.map((game): GameSummary => ({
        slug: game.slug,
        name: game.name,
        image: getCoverImage(game.slug),
      })),
      officialProfiles: profiles.filter((profile) => profile.tier === "Official").map(toSummary),
      communityProfiles: profiles.filter((profile) => profile.tier !== "Official").map(toSummary),
    };
  }

  async listGames(): Promise<GameSummary[]> {
    return (await this.getHomeFeed()).games;
  }

  async getGame(slug: string): Promise<GameDetail | null> {
    const [games, profiles] = await Promise.all([
      gamesRepository.read(),
      profilesRepository.read(),
    ]);

    const game = games.find((item) => item.slug === slug);
    if (!game) {
      return null;
    }

    return {
      ...game,
      profiles: profiles
        .filter((profile) => profile.gameSlug === slug)
        .map(toSummary),
    };
  }

  async listProfiles(): Promise<ProfileSummary[]> {
    const profiles = await profilesRepository.read();
    return profiles.map(toSummary);
  }

  async getProfile(slug: string): Promise<StoredProfile | null> {
    const profiles = await profilesRepository.read();
    return profiles.find((profile) => profile.slug === slug) ?? null;
  }

  async getRelatedProfiles(slug: string): Promise<ProfileSummary[]> {
    const profiles = await profilesRepository.read();
    const profile = profiles.find((item) => item.slug === slug);
    if (!profile) {
      return [];
    }

    return profile.relatedProfileSlugs
      .map((relatedSlug) => profiles.find((item) => item.slug === relatedSlug))
      .filter((item): item is StoredProfile => Boolean(item))
      .map(toSummary);
  }

  async createImport(payload: ImportRequest): Promise<ImportReceipt | null> {
    const profile = await this.getProfile(payload.profileSlug);
    if (!profile) {
      return null;
    }

    const imports = await importsRepository.read();

    const receipt: ImportReceipt = {
      id: randomUUID(),
      profileSlug: profile.slug,
      profileName: profile.name,
      version: profile.version,
      gameName: profile.gameName,
      createdAt: new Date().toISOString(),
      steps: [
        {
          id: "downloaded",
          label: "Profile Downloaded",
          detail: "Securely fetched from platform",
          status: "complete",
        },
        {
          id: "delivered",
          label: "Delivered to Control Panel",
          detail: "Synced to your local app",
          status: "complete",
        },
        {
          id: "ready",
          label: "Ready to Apply",
          detail: "Open app to activate on controller",
          status: "complete",
        },
      ],
      nextAction: {
        label: "Open Control Panel",
        href: "/todo/control-panel",
      },
    };

    await importsRepository.write([receipt, ...imports]);
    return receipt;
  }

  async getImport(id: string): Promise<ImportReceipt | null> {
    const imports = await importsRepository.read();
    return imports.find((item) => item.id === id) ?? null;
  }

  async getSession(): Promise<SessionState> {
    const users = await usersRepository.read();
    return users.session;
  }

  async toggleAuthBypass(payload: ToggleAuthBypassRequest): Promise<SessionState> {
    const users = await usersRepository.read();
    users.session = payload.enabled
      ? {
          isAuthenticated: true,
          authMode: "dev-bypass",
          userName: "Dev Pilot",
          shortcutHint: "Ctrl+K auth bypass enabled",
        }
      : {
          isAuthenticated: false,
          authMode: "guest",
          userName: null,
          shortcutHint: "Press Ctrl+K for local dev actions",
        };

    await usersRepository.write(users);
    return users.session;
  }
}
