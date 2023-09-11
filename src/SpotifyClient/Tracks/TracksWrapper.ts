import {
  AudioAnalysis,
  AudioFeatures,
  Track,
  TrackRecommendationInput,
  TrackRecommendations,
} from "../../Types/Track";
import IHttpClient from "../IHttpClient";

export default class TracksWrapper {
  constructor(protected readonly client: IHttpClient) {
    this.client = client;
  }

  public async getTrack(trackId: string, market?: string): Promise<Track> {
    return await this.client.get<Track>(`tracks/${trackId}`, { market });
  }

  public async getTracks(
    trackIds: string[],
    market?: string,
  ): Promise<{ tracks: Track[] }> {
    return await this.client.get<{ tracks: Track[] }>("tracks", {
      ids: trackIds.join(","),
      market,
    });
  }

  public async getAudioFeatures(trackId: string): Promise<AudioFeatures> {
    return await this.client.get<AudioFeatures>(`audio-features/${trackId}`);
  }

  public async getAudioFeaturesForTracks(
    trackIds: string[],
  ): Promise<{ audio_features: AudioFeatures[] }> {
    return await this.client.get<{
      audio_features: AudioFeatures[];
    }>("audio-features", {
      ids: trackIds.join(","),
    });
  }

  public async getAudioAnalysis(trackId: string): Promise<AudioAnalysis> {
    return await this.client.get<AudioAnalysis>(`audio-analysis/${trackId}`);
  }

  public async getRecommendations(
    input: TrackRecommendationInput,
  ): Promise<TrackRecommendations> {
    if (
      input.seed_tracks.length +
        input.seed_artists.length +
        input.seed_genres.length >
      5
    ) {
      throw new Error(
        "The total number of seed tracks, artists and genres cannot be greater than 5",
      );
    }

    const buildQuery = (input: TrackRecommendationInput): string => {
      const query = Object.entries(input).map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.join(",")}`;
        }

        return `${key}=${value}`;
      });
      return query.join("&");
    };

    return await this.client.get<TrackRecommendations>(
      `recommendations?${buildQuery(input)}`,
    );
  }
}
