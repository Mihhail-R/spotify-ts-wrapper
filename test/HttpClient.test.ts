import { HttpClient } from '../src';

describe('HttpClient', () => {
	const httpClient = new HttpClient({
		baseUrl: "https://jsonplaceholder.typicode.com/",
	});

	it('should send a get request', async () => {
		const result =
			await httpClient.get<any>("posts");

		expect(result.length).toBeGreaterThan(1);
	});

	it('Should send a get request with params', async () => {
		const result = await httpClient.get<any>("posts", { userId: 1 });

		expect(result.length).toBeGreaterThan(1);
	});

	it('Should send a post request', async () => {
		const result = httpClient.post("posts", {
			title: "foo",
			body: "bar",
			userId: 1,
		});

		await expect(result).resolves.not.toThrow();
	});

	it('Should send a post request with params', async () => {
		const result = httpClient.post("posts/1", {
			title: "foo",
			body: "bar",
			userId: 1,
		}, {userId: 1});

		await expect(result).resolves.not.toThrow();
	});

	it('Should send a put request', async () => {
		const result = httpClient.put("posts/1", {
			title: "foo",
			body: "bar",
			userId: 1,
		});

		await expect(result).resolves.not.toThrow();
	});

	it('Should send a put request with params', async () => {
		const result = httpClient.put("posts/1", {
			title: "foo",
			body: "bar",
			userId: 1,
		}, {userId: 1});

		await expect(result).resolves.not.toThrow();
	});

	it('Should send a delete request', async () => {
		const result = httpClient.delete("posts/1");

		await expect(result).resolves.not.toThrow();
	});

	it('Should send a delete request with params', async () => {
		const result = httpClient.delete("posts/1", {userId: 1});

		await expect(result).resolves.not.toThrow();
	});

	it('Should fail to authorize app', async () => {
		const result = httpClient.authorizeApp();

		await expect(result).rejects.toThrow();
	})
});
