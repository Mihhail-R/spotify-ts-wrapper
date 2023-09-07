export default interface IHttpClient {
  get<T>(endpoint: string, params?: any): Promise<T>;
  post(endpoint: string, data?: any, params?: any): Promise<void>;
  put(endpoint: string, data?: any, params?: any): Promise<void>;
  delete(endpoint: string, params?: any): Promise<void>;
}
