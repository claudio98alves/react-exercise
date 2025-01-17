

const ListAlbums = ({albums} : any) => {

  console.log(albums)

  return (
    <div>
      <h2>Artist's Albums</h2>
      <ul>
        {albums.map((album: any) => (
          <li key={album.id}>
            { album.images && <img src={album.images[0]?.url} alt={album.name} width="50" height="50" /> }
            <span>{album.name}</span>
            <button onClick={() => window.location.href = `/album/${album.id}`}>
              View Album
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListAlbums;