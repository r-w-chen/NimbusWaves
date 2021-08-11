import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SongImg, DefaultSongImg } from '../styled-components/index';
import { useAudio } from '../../context/Audio';

export default function HomeSongContainer({song}) {
    const [hovered, setHovered] = useState(false);
    const {audio, setShowPlayBar ,setIsPlaying, currentSong, setCurrentSong, lastPlayed}  = useAudio();
    const playStatus = song.id === currentSong ? "fas fa-pause-circle fa-3x play-button" : "fas fa-play-circle fa-3x play-button"

    useEffect(() => {
        if(audio.ended) setCurrentSong(null);
    }, [audio.ended])

     const updatePlayStatus = () => {
        if(currentSong === song.id){
            audio.pause();
            setIsPlaying(false);
            setCurrentSong(null);
        } else {
            if(audio.src !== song.audioURL) {
                audio.src = song.audioURL;
            }
            setShowPlayBar(true);
            audio.play();
            setIsPlaying(true);
            setCurrentSong(song.id)
            lastPlayed.current = song.id;
        } 
    }
    return (
        <div className="home-song-container">
            {song.songImgURL ? 
            <SongImg 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            imgURL={song.songImgURL} className="home-song-img">
            {hovered &&  <i className={`${playStatus} home-play-btn`} onClick={updatePlayStatus}></i>}
            </SongImg> 
            :<DefaultSongImg 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="home-song-img">
            {hovered &&  <i className={`${playStatus} home-play-btn`} onClick={updatePlayStatus}></i>}
            </DefaultSongImg>}
            <Link to={`/${song.User.id}/${song.id}`}className="home-song-title"> {
            song.title} 
            <p className="home-song-user">{song.User.username}</p>    
            </Link>
        </div>
    )
}
