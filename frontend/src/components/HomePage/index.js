import { useSelector } from 'react-redux';
import HomeSongContainer from './HomeSongContainer';
import "./HomePage.css";
import { Redirect } from 'react-router';

export default function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => Object.values(state.songs));

    if(!sessionUser) return <Redirect to='/'/>

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