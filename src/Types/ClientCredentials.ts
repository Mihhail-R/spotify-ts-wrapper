export type ClientCredentials = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type UserClientCredentials = {
  refresh_token?: string;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

export type UserScopes =
  | "ugc-image-upload"
  | "user-read-recently-played"
  | "user-modify-playback-state"
  | "user-read-playback-state"
  | "app-remote-control"
  | "streaming"
  | "playlist-modify-public"
  | "playlist-modify-private"
  | "playlist-read-private"
  | "playlist-read-collaborative"
  | "user-follow-modify"
  | "user-follow-read"
  | "user-read-playback-position"
  | "user-top-read"
  | "user-library-modify"
  | "user-library-read"
  | "user-read-email"
  | "user-read-private"
  | "user-read-currently-playing";
