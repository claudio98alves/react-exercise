export interface ArtistProps {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
  external_urls: { spotify: string };
  genres: string[];
}

export interface TrackProps {
  id: string;
  name: string;
  images: { url: string }[];
  artists: ArtistProps[];
  external_urls: {spotify: string}
  album: AlbumProps;
}

export interface AlbumProps {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  artists: ArtistProps[];
  external_urls: {spotify: string}
}