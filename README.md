# Spotify Web API wrapper

## Description

Personal wrapper for the Spotify Web API written in TypeScript.

Please keep in mind that Spotify provides their own SDK as well. See more info here: https://developer.spotify.com/documentation/web-api/libraries/

## Usage

-   You must supply your own HTTP client implementing IBaseClient interface to the wrapper.
-   Import the wrapper and create a new instance of the SpotifyClient class.
-   Inject the HTTP client into the SpotifyClient constructor.
-   Call the methods on the SpotifyClient instance, all endpoints are separated into their own classes.
-   All responses are strongly typed, for example the getAlbum method from `SpotifyClient.albums.getAlbum()` returns an `Album` object.

```typescript
import { SpotifyClient } from '..';
import { IBaseClient } from '..';
import { Album } from './Album';

// Keep in mind you are also supposed to implement authorization. *This is not covered*
const httpClient: IBaseClient = {
	sendGetRequest: async (url: string, options?: any) => {
		// your implementation
	},
	sendPostRequest: async (url: string, options?: any) => {
		// your implementation
	},
	sendPutRequest: async (url: string, options?: any) => {
		// your implementation
	},
	sendDeleteRequest: async (url: string, options?: any) => {
		// your implementation
	},
};

const spotifyClient = new SpotifyClient(httpClient);

const album: Album = await spotifyClient.albums.getAlbum('albumId');
```
