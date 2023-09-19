# Spotify Web API wrapper

## Description

Personal wrapper for the Spotify Web API written in TypeScript.

Please keep in mind that Spotify provides their own SDK as well. See more info here: https://developer.spotify.com/documentation/web-api/libraries/

## Installation and configuration

```
npm i @mihhailreh/spotify-ts-wrapper
yarn add @mihhailreh/spotify-ts-wrapper
```

-   Create a Spotify app here: https://developer.spotify.com/dashboard/applications

## How to use

-   You can create your own HTTP client or use the one provided.
-   Import the wrapper and create a new instance of the SpotifyClient class.
-   Inject the HTTP client into the SpotifyClient constructor.
-   Call the methods on the SpotifyClient instance, all endpoints are separated into their own classes.
-   All responses are strongly typed, for example, the getAlbum method from `SpotifyClient.albums.getAlbum()` returns an `Album` object.

## Example with your own HTTP client
```typescript
import { SpotifyClient, IHttpClient } from '@mihhailreh/spotify-ts-wrapper';

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

const album = await spotifyClient.albumsWrapper.getAlbum('albumId');
```

## Example with the provided HTTP client
```typescript
import { SpotifyClient, HttpClient } from '@mihhailreh/spotify-ts-wrapper';

const newTokenClient = new HttpClient({
    baseUrl: 'string',
    authenticationUrl: 'string',
    clientId: 'string',
    clientSecret: 'string',
});

// or if you already have a token, you can pass it in the constructor
const existingTokenClient = new HttpClient({
     baseUrl: 'string',
     token: 'string',
});

// this will authorize based on provided clientId and clientSecret
// Keep in mind that this will not authorize a user, only your app
// If you want to authorize a user you need to create your own implementation
// you could extend the HttpClient class and override the authorizeApp method
// or you could create your own authorizeUser method ontop of it
await newTokenClient.authorizeApp();

const spotifyClient = new SpotifyClient(newTokenClient);

const album = await spotifyClient.albumsWrapper.getAlbum('albumId');
```

## Example for user authorization with express js
```typescript
import { SpotifyClient, HttpClient } from '@mihhailreh/spotify-ts-wrapper';
import { UserScopes } from '@mihhailreh/spotify-ts-wrapper/Types/ClientCredentials';
import express from 'express';

const app = express();

const clientId = 'yourClientId';
const clientSecret = 'yourClientSecret';
const redirectUri = 'yourRedirectUri';
const scopes: UserScopes = ['user-read-private', 'user-read-email'];

const httpClient = new HttpClient({
    baseUrl: 'https://accounts.spotify.com',
    authenticationUrl: 'https://accounts.spotify.com/authorize',
    clientId,
    clientSecret,
});

const spotifyAuthUrl = httpClient.createUserAuthUrl(redirectUri, scopes);

app.get('/login', (req, res) => {
    res.redirect(spotifyAuthUrl);
});

app.get('/callback', async (req, res) => {
    if (req.query.error) {
        throw new Error(req.query.error as string);
    }

    const code = req.query.code as string;

    // Save the access_token and refresh_token somewhere
    const { access_token, refresh_token } = await httpClient.authorizeUser(redirectUri, code);

    const spotifyClient = new SpotifyClient(new HttpClient({
        baseUrl: 'https://api.spotify.com/v1',
        token: access_token,
    }));

    const user = await spotifyClient.usersWrapper.getCurrentUser();

    res.send(user);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
