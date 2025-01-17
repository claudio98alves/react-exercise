import { AlbumProps } from "../types";


const ListAlbums = ({albums} : {albums : AlbumProps[]}) => {

  return (
    <div>
      <h2 className="title">Artist's Albums</h2>
      <div>        
        {albums.map((album) => (
          <div key={album.id} className="card">
            <div className="flex justify-start space-x-4 items-center">
              {album.images && <img src={album.images[0]?.url} alt={album.name} width="50" height="50" />}
              <div className="w-2/4 text-start">{album.name}</div>
            </div>
            <button onClick={() => window.location.href = `/album/${album.id}`} className="w-1/4 self-center">
              View Album
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbums;