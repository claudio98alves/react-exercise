

const ListTracks = ({tracks, title} : any) => {

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {tracks.map((track: any) => (
          <li key={track.id}>
            { track.images && <img src={track.images[0]?.url} alt={track.name} width="50" height="50" /> }
            <span>{track.name}</span>
            <button onClick={() => window.location.href = `/track/${track.id}`}>
              View Track
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTracks;