import { User } from "../../Types/User";
import IHttpClient from "../IHttpClient";

export default class UsersWrapper {
  constructor(protected readonly client: IHttpClient) {
    this.client = client;
  }

  public async getUsersProfile(userId: string): Promise<User> {
    return await this.client.get<User>(`users/${userId}`);
  }

  public async checkIfUsersFollowPlaylist(
    playlistId: string,
    ids: string[],
  ): Promise<boolean[]> {
    return await this.client.get<boolean[]>(
      `playlists/${playlistId}/followers/contains`,
      {
        ids: ids.join(","),
      },
    );
  }
}
