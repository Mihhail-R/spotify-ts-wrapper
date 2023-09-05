export default interface IHttpClient {
  get<T>(endpoint: string, params?: any): Promise<T>;
  post<T>(endpoint: string, data?: any, params?: any): Promise<T>;
  put<T>(endpoint: string, data?: any, params?: any): Promise<T>;
  delete<T>(endpoint: string, params?: any): Promise<T>;
}
