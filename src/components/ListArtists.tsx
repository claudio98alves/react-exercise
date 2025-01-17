import { ArtistProps } from "../types";

const ListArtists = ({artists}: {artists: ArtistProps[]}) => {

  return (
    <div>
      <h2 className="title">Top Artists</h2>
      <div>
        {artists.map((artist) => (
          <div key={artist.id} className="card">
            <div className="flex justify-start space-x-4 items-center">
              <img src={artist.images[0].url} alt={artist.name} width="50" height="50" />
              <span>{artist.name}</span>
            </div>
            <button onClick={() => window.location.href = `/artist/${artist.id}`}>
              View Artist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListArtists;