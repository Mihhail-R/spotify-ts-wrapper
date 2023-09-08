import HttpClient from "../src/http/HttpClient";
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "./util/config";
import {CategoryItems} from "../src/Types/Category";

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
		const result = await httpClient.post("posts", {
			title: "foo",
			body: "bar",
			userId: 1,
		});

		expect(result).toBeUndefined();
	});

	it('Should send a post request with params', async () => {
		const result = await httpClient.post("posts/1", {
			title: "foo",
			body: "bar",
			userId: 1,
		}, {userId: 1});

		expect(result).toBeUndefined();
	});

	it('Should send a put request', async () => {
		const result = await httpClient.put("posts/1", {
			title: "foo",
			body: "bar",
			userId: 1,
		});

		expect(result).toBeUndefined();
	});

	it('Should send a put request with params', async () => {
		const result = await httpClient.put("posts/1", {
			title: "foo",
			body: "bar",
			userId: 1,
		}, {userId: 1});

		expect(result).toBeUndefined();
	});

	it('Should send a delete request', async () => {
		const result = await httpClient.delete("posts/1");

		expect(result).toBeUndefined();
	});

	it('Should send a delete request with params', async () => {
		const result = await httpClient.delete("posts/1", {userId: 1});

		expect(result).toBeUndefined();
	});
});
