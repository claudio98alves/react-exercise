import { ArtistProps } from "../types";

const ListArtists = ({artists}: {artists: ArtistProps[]}) => {

  return (
    <div>
      <h2>Top Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} width="50" height="50" />
            <span>{artist.name}</span>
            <button onClick={() => window.location.href = `/artist/${artist.id}`}>
              View Artist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListArtists;