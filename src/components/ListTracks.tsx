import { TrackProps } from "../types";

const ListTracks = ({tracks, title} : {tracks: TrackProps[], title: string}) => {

  return (
    <div>
      <h2 className="title">{title}</h2>
      {tracks.map((track) => (
        <div key={track.id} className="card">
          <div className="flex justify-start space-x-4 items-center">
            { track.images && <img src={track.images[0]?.url} alt={track.name} width="50" height="50" /> }
            <span>{track.name}</span>
          </div>
          <button onClick={() => window.location.href = `/track/${track.id}`}>
            View Track
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListTracks;