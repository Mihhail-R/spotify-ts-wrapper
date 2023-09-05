import {UserSavedTracks} from "../../src/Types/Track";

const userSavedTracks: UserSavedTracks = {
	limit: 20,
	offset: 0,
	total: 1,
	items: [
		{
			added_at: '2021-08-01T00:00:00Z',
			track: {
				is_playable: true,
				linked_from: {
					href: 'https://api.spotify.com/v1/tracks/2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
					id: '2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
					type: 'track',
					uri: 'spotify:track:2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
					external_urls: {
						spotify: 'https://open.spotify.com/track/2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
					},
				},
				restrictions: {
					reason: 'market',
				},
				album: {
					external_ids: {
						isrc: 'US4DG1700101',
						ean: '0884860199723',
						upc: '884860199723',
					},
					album_type: 'album',
					artists: [
						{
							external_urls: {
								spotify: 'https://open.spotify.com/artist/7F9ZL4TJNr8AoU0UUQX8ih'
							},
							href: 'https://api.spotify.com/v1/artists/7F9ZL4TJNr8AoU0UUQX8ih',
							id: '7F9ZL4TJNr8AoU0UUQX8ih',
							name: 'Archspire',
							type: 'artist',
							uri: 'spotify:artist:7F9ZL4TJNr8AoU0UUQX8ih',
							followers: {
								href: null,
								total: 0
							},
							genres: [],
							images: [],
							popularity: 0,
						},
					],
					available_markets: [
						'AD',
					],
					external_urls: {
						spotify: 'https://open.spotify.com/album/6ZQX0q5Y7QXQ8X2YXw5Q7J'
					},
					href: 'https://api.spotify.com/v1/albums/6ZQX0q5Y7QXQ8X2YXw5Q7J',
					id: '6ZQX0q5Y7QXQ8X2YXw5Q7J',
					images: [
						{
							height: 640,
							url: 'https://i.scdn.co/image/ab67616d0000b273e3b5b5b2b5b2b5b2b5b2b5b2',
							width: 640
						},
					],
					name: 'Relentless Mutation',
					release_date: '2017-09-22',
					release_date_precision: 'day',
					total_tracks: 9,
					type: 'album',
					uri: 'spotify:album:6ZQX0q5Y7QXQ8X2YXw5Q7J',
					popularity: 0,
				},
				artists: [
					{
						external_urls: {
							spotify: 'https://open.spotify.com/artist/7F9ZL4TJNr8AoU0UUQX8ih'
						},
						href: 'https://api.spotify.com/v1/artists/7F9ZL4TJNr8AoU0UUQX8ih',
						id: '7F9ZL4TJNr8AoU0UUQX8ih',
						name: 'Archspire',
						type: 'artist',
						uri: 'spotify:artist:7F9ZL4TJNr8AoU0UUQX8ih',
						followers: {
							href: null,
							total: 0
						},
						genres: [],
						images: [],
						popularity: 0,
					},
				],
				available_markets: [
					'AD',
				],
				disc_number: 1,
				duration_ms: 263000,
				explicit: false,
				external_ids: {
					isrc: 'US4DG1700101',
					ean: '0884860199723',
					upc: '884860199723',
				},
				external_urls: {
					spotify: 'https://open.spotify.com/track/2QZQ2YXQXZ3X1Z6Z6Z6Z6Z'
				},
				href: 'https://api.spotify.com/v1/tracks/2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
				id: '2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
				is_local: false,
				name: 'Involuntary Doppelgänger',
				popularity: 0,
				preview_url: 'https://',
				track_number: 1,
				type: 'track',
				uri: 'spotify:track:2QZQ2YXQXZ3X1Z6Z6Z6Z6Z',
			},
		},
	],
	href: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=20',
	next: null,
	previous: null,
};

export default userSavedTracks;
