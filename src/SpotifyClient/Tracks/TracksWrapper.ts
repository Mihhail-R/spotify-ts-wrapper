import { AudioAnalysis, AudioFeatures, Track } from "../../Types/Track";
import IHttpClient from "../IHttpClient";

export default class TracksWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getTrack(trackId: string, market?: string): Promise<Track> {
    return await this.client.get<Track>(`tracks/${trackId}?market=${market}`);
  }

  public async getTracks(
    trackIds: string[],
    market?: string,
  ): Promise<{ tracks: Track[] }> {
    return await this.client.get<{ tracks: Track[] }>(
      `tracks?ids=${trackIds.join(",")}&market=${market}`,
    );
  }

  public async getAudioFeatures(trackId: string): Promise<AudioFeatures> {
    return await this.client.get<AudioFeatures>(`audio-features/${trackId}`);
  }

  public async getAudioFeaturesForTracks(
    trackIds: string[],
  ): Promise<{ audio_features: AudioFeatures[] }> {
    return await this.client.get<{
      audio_features: AudioFeatures[];
    }>(`audio-features?ids=${trackIds.join(",")}`);
  }

  public async getAudioAnalysis(trackId: string): Promise<AudioAnalysis> {
    return await this.client.get<AudioAnalysis>(`audio-analysis/${trackId}`);
  }
}
