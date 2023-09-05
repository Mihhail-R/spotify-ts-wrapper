import { Category, CategoryItems } from "../../Types/Category";
import IHttpClient from "../IHttpClient";

export default class MiscWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getAvailableGenreSeeds(): Promise<{ genres: string[] }> {
    return await this.client.get<{ genres: string[] }>(
      "recommendations/available-genre-seeds",
    );
  }

  public async getCategories(): Promise<{ categories: CategoryItems }> {
    return await this.client.get<{ categories: CategoryItems }>(
      "browse/categories",
    );
  }

  public async getCategory(categoryId: string): Promise<Category> {
    return await this.client.get<Category>(`browse/categories/${categoryId}`);
  }

  public async getAvailableMarkets(): Promise<{ markets: string[] }> {
    return await this.client.get<{ markets: string[] }>("markets");
  }
}
