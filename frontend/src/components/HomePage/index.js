import { useSelector } from 'react-redux';
import HomeSongContainer from './HomeSongContainer';
import "./HomePage.css";

export default function HomePage() {
    const songs = useSelector(state => Object.values(state.songs));

    return (
        <div className="homepage">  
            <div className="home-header">
                <h1>All Tracks</h1>
                <p>Explore different sounds</p>
            </div>
            <div className="song-grid">
                {songs.map(song => <HomeSongContainer song={song} key={song.id}/>)}
            </div>
        </div>
    )
}