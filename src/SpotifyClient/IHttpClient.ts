export default interface IHttpClient {
	sendGetRequest<T>(endpoint: string, params?: any): Promise<T>;
	sendPostRequest<T>(endpoint: string, data?: any, params?: any): Promise<T>;
	sendPutRequest<T>(endpoint: string, data?: any, params?: any): Promise<T>;
	sendDeleteRequest<T>(endpoint: string, params?: any): Promise<T>;
}
