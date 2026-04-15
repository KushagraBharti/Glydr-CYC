import type {
  GameDetail,
  ProfileDetail,
  SessionState,
} from "@glydr/shared";

export interface StoredProfile extends ProfileDetail {
  relatedProfileSlugs: string[];
}

export interface UsersStorage {
  session: SessionState;
  users: Array<{
    id: string;
    name: string;
    role: string;
  }>;
}

export type GamesStorage = GameDetail[];
export type ProfilesStorage = StoredProfile[];
