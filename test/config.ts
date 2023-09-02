import "dotenv/config";
export const SPOTIFY_CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_SECRET: string = process.env.SPOTIFY_SECRET || "";
export const SPOTIFY_AUTH_URL: string = process.env.SPOTIFY_AUTH_URL || "https://accounts.spotify.com/api/token";
