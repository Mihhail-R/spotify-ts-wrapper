# Spotify Web API wrapper

## Description

Personal wrapper for the Spotify Web API written in TypeScript.

Please keep in mind that Spotify provides their own SDK as well. See more info here: https://developer.spotify.com/documentation/web-api/libraries/

## Usage

-   You can create your own HTTP client or use the one provided.
-   Import the wrapper and create a new instance of the SpotifyClient class.
-   Inject the HTTP client into the SpotifyClient constructor.
-   Call the methods on the SpotifyClient instance, all endpoints are separated into their own classes.
-   All responses are strongly typed, for example, the getAlbum method from `SpotifyClient.albums.getAlbum()` returns an `Album` object.

## Example with your own HTTP client
```typescript
import { SpotifyClient } from '..';
import { IHttpClient } from '..';
import { Album } from './Album';

// your implementation of the IHttpClient interface
const httpClient: IHttpClient = {
	get: async (url: string, options?: any) => {
		// your implementation
	},
	post: async (url: string, options?: any) => {
		// your implementation
	},
	put: async (url: string, options?: any) => {
		// your implementation
	},
	delete: async (url: string, options?: any) => {
		// your implementation
	},
};

const spotifyClient = new SpotifyClient(httpClient);

const album: Album = await spotifyClient.albums.getAlbum('albumId');
```

## Example with the provided HTTP client
```typescript
import { SpotifyClient, HttpClient } from '..';
import { Album } from './Album';

const httpClient = new HttpClient({
    baseUrl: 'string',
    authenticationUrl: 'string',
    clientId: 'string',
    clientSecret: 'string',
});

// this will authorize based on provided clientId and clientSecret
// Keep in mind that this will not authorize a user, only your app
// If you want to authorize a user you need to create your own implementation
// you could extend the HttpClient class and override the authorizeApp method
// or you could create your own authorizeUser method ontop of it
await httpClient.authorizeApp();

const spotifyClient = new SpotifyClient(HttpClient);

const album: Album = await spotifyClient.albums.getAlbum('albumId');
```
