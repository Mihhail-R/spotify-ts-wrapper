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
    return await this.client.sendGetRequest<Playback>("me/player/devices", {
      market,
      additional_types: additionalTypes,
    });
  }

  public async transferPlayback(
    deviceIds: string[],
    play?: boolean,
  ): Promise<void> {
    await this.client.sendPutRequest("me/player", {
      device_ids: deviceIds,
      play,
    });
  }

  public async getAvailableDevices(): Promise<{ devices: Device }> {
    return await this.client.sendGetRequest<{ devices: Device }>(
      "me/player/devices",
    );
  }

  public async getCurrentlyPlaying(
    market?: string,
    additionalTypes?: "track" | "episode",
  ): Promise<Playback> {
    return await this.client.sendGetRequest<Playback>(
      "me/player/currently-playing",
      { market,
additional_types: additionalTypes },
    );
  }

  public async startResumePlayback(input: StartResumePlayback): Promise<void> {
    if (input.device_id) {
      const { device_id, ...rest } = input;

      await this.client.sendPutRequest(
        `me/player/play?device_id=${device_id}`,
        rest,
      );
    } else {
      await this.client.sendPutRequest("me/player/play", input);
    }
  }

  public async pausePlayback(deviceId?: string): Promise<void> {
    if (deviceId) {
      await this.client.sendPutRequest(`me/player/pause?device_id=${deviceId}`);
    } else {
      await this.client.sendPutRequest("me/player/pause");
    }
  }

  public async skipToNext(deviceId?: string): Promise<void> {
    if (deviceId) {
      await this.client.sendPostRequest(`me/player/next?device_id=${deviceId}`);
    } else {
      await this.client.sendPostRequest("me/player/next");
    }
  }

  public async skipToPrevious(deviceId?: string): Promise<void> {
    if (deviceId) {
      await this.client.sendPostRequest(
        `me/player/previous?device_id=${deviceId}`,
      );
    } else {
      await this.client.sendPostRequest("me/player/previous");
    }
  }

  public async seek(positionMs: number, deviceId?: string): Promise<void> {
    if (deviceId) {
      await this.client.sendPutRequest(
        `me/player/seek?position_ms=${positionMs}&device_id=${deviceId}`,
      );
    } else {
      await this.client.sendPutRequest(
        `me/player/seek?position_ms=${positionMs}`,
      );
    }
  }

  public async setRepeatState(
    state: "track" | "context" | "off",
    deviceId?: string,
  ): Promise<void> {
    if (deviceId) {
      await this.client.sendPutRequest(
        `me/player/repeat?state=${state}&device_id=${deviceId}`,
      );
    } else {
      await this.client.sendPutRequest(`me/player/repeat?state=${state}`);
    }
  }

  public async setVolume(
    volumePercent: number,
    deviceId?: string,
  ): Promise<void> {
    if (deviceId) {
      await this.client.sendPutRequest(
        `me/player/volume?volume_percent=${volumePercent}&device_id=${deviceId}`,
      );
    } else {
      await this.client.sendPutRequest(
        `me/player/volume?volume_percent=${volumePercent}`,
      );
    }
  }

  public async toggleShuffle(state: boolean, deviceId?: string): Promise<void> {
    if (deviceId) {
      await this.client.sendPutRequest(
        `me/player/shuffle?state=${state}&device_id=${deviceId}`,
      );
    } else {
      await this.client.sendPutRequest(`me/player/shuffle?state=${state}`);
    }
  }

  public async addToQueue(uri: string, deviceId?: string): Promise<void> {
    if (deviceId) {
      await this.client.sendPostRequest(
        `me/player/queue?uri=${uri}&device_id=${deviceId}`,
      );
    } else {
      await this.client.sendPostRequest(`me/player/queue?uri=${uri}`);
    }
  }

  public async getRecentlyPlayed(
    limit?: number,
    after?: number,
    before?: number,
  ): Promise<RecentlyPlayed> {
    return await this.client.sendGetRequest<RecentlyPlayed>(
      "me/player/recently-played",
      { limit,
after,
before },
    );
  }

  public async getUserQueue(): Promise<Queue> {
    return await this.client.sendGetRequest<Queue>("me/player/queue");
  }
}
