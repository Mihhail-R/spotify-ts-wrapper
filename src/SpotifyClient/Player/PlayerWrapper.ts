import {
  Device,
  StartResumePlayback,
  Playback,
  RecentlyPlayed,
  Queue,
} from "../../Types/Player";
import IHttpClient from "../IHttpClient";

export default class PlayerWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getPlaybackState(
    market?: string,
    additionalTypes?: "track" | "episode",
  ): Promise<Playback> {
    return await this.client.get<Playback>("me/player/devices", {
      market,
      additional_types: additionalTypes,
    });
  }

  public async transferPlayback(
    deviceIds: string[],
    play?: boolean,
  ): Promise<void> {
    await this.client.put("me/player", {
      device_ids: deviceIds,
      play,
    });
  }

  public async getAvailableDevices(): Promise<{ devices: Device[] }> {
    return await this.client.get<{ devices: Device[] }>("me/player/devices");
  }

  public async getCurrentlyPlaying(
    market?: string,
    additionalTypes?: "track" | "episode",
  ): Promise<Playback> {
    return await this.client.get<Playback>("me/player/currently-playing", {
      market,
      additional_types: additionalTypes,
    });
  }

  public async startResumePlayback(input?: StartResumePlayback): Promise<void> {
    await this.client.put("me/player/play", input);
  }

  public async pausePlayback(deviceId?: string): Promise<void> {
    await this.client.put("me/player/pause", {
      device_id: deviceId,
    });
  }

  public async skipToNext(deviceId?: string): Promise<void> {
    await this.client.post("me/player/next", {
      device_id: deviceId,
    });
  }

  public async skipToPrevious(deviceId?: string): Promise<void> {
    await this.client.post("me/player/previous", {
      device_id: deviceId,
    });
  }

  public async seek(positionMs: number, deviceId?: string): Promise<void> {
    await this.client.put("me/player/seek", {
      position_ms: positionMs,
      device_id: deviceId,
    });
  }

  public async setRepeatState(
    state: "track" | "context" | "off",
    deviceId?: string,
  ): Promise<void> {
    await this.client.put("me/player/repeat", {
      state,
      device_id: deviceId,
    });
  }

  public async setVolume(
    volumePercent: number,
    deviceId?: string,
  ): Promise<void> {
    await this.client.put("me/player/volume", {
      volume_percent: volumePercent,
      device_id: deviceId,
    });
  }

  public async toggleShuffle(state: boolean, deviceId?: string): Promise<void> {
    await this.client.put("me/player/shuffle", {
      state,
      device_id: deviceId,
    });
  }

  public async addToQueue(uri: string, deviceId?: string): Promise<void> {
    await this.client.post("me/player/queue", {
      uri,
      device_id: deviceId,
    });
  }

  public async getRecentlyPlayed(
    limit?: number,
    after?: number,
    before?: number,
  ): Promise<RecentlyPlayed> {
    return await this.client.get<RecentlyPlayed>("me/player/recently-played", {
      limit,
      after,
      before,
    });
  }

  public async getUserQueue(): Promise<Queue> {
    return await this.client.get<Queue>("me/player/queue");
  }
}
