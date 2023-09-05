import {User, UserTopItems} from "../../src/Types/User";
import {PaginatedArtists} from "../../src/Types/Artist";

const meMock: User = {
	id: '1',
	display_name: 'test',
	external_urls: {
		spotify: 'https://open.spotify.com/user/1'
	},
	followers: {
		href: null,
		total: 0
	},
	href: 'https://api.spotify.com/v1/users/1',
	images: [],
	type: 'user',
	uri: 'spotify:user:1'
};

const userTopItemsMock: UserTopItems<'artists'> = {
	items: [
		{
			external_urls: {
				spotify: 'https://open.spotify.com/artist/1'
			},
			followers: {
				href: null,
				total: 0
			},
			href: 'https://api.spotify.com/v1/artists/1',
			id: '1',
			images: [],
			name: 'test',
			popularity: 0,
			type: 'artist',
			uri: 'spotify:artist:1',
			genres: []
		},
		{
			external_urls: {
				spotify: 'https://open.spotify.com/artist/2'
			},
			followers: {
				href: null,
				total: 0
			},
			href: 'https://api.spotify.com/v1/artists/2',
			id: '2',
			images: [],
			name: 'test',
			popularity: 0,
			type: 'artist',
			uri: 'spotify:artist:2',
			genres: []
		},
	],
	href: 'https://api.spotify.com/v1/me/top/artists?limit=2&offset=0&time_range=medium_term',
	limit: 20,
	next: 'https://api.spotify.com/v1/me/top/artists?limit=2&offset=2&time_range=medium_term',
	offset: 0,
	previous: null,
	total: 2
};

const getFollowedArtistsMock: { artists: PaginatedArtists } = {
	artists: {
		href: 'https://api.spotify.com/v1/me/following?type=artist&limit=20&offset=0',
		items: [
			{
				external_urls: {
					spotify: 'https://open.spotify.com/artist/1'
				},
				followers: {
					href: null,
					total: 0
				},
				genres: [],
				href: 'https://api.spotify.com/v1/artists/1',
				id: '1',
				images: [],
				name: 'test',
				popularity: 0,
				type: 'artist',
				uri: 'spotify:artist:1'
			},
		],
		limit: 20,
		next: null,
		offset: 0,
		previous: null,
		total: 1
	}
};

export {
	meMock,
	userTopItemsMock,
	getFollowedArtistsMock,
}
