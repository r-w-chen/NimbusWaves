import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/Audio';
import { SongImg, DefaultSongImg } from '../styled-components/index';
import UploadFormModal from '../UploadFormPage/UploadFormModal';
import DeleteModal from '../DeleteModal/DeleteModal';

const margins = {
    marginBottom: '20px'
}

export default function SongContainer({song, user, sessionUser}) {
    const {audio, isPlaying ,setIsPlaying, currentSong, setCurrentSong}  = useAudio();
    const playStatus = song.id === currentSong ? "fas fa-pause-circle fa-3x play-button" : "fas fa-play-circle fa-3x play-button"

    const updatePlayStatus = () => {
        if(currentSong === song.id){
            audio.pause();
            setIsPlaying(false);
            setCurrentSong(null);
        } else {
            //ensures that we don't reassign the src so it doesn't restart the song
            if(audio.src !== song.audioURL) {
                audio.src = song.audioURL;
            }
            audio.play();
            setIsPlaying(true);
            setCurrentSong(song.id)
        } 
    }

    useEffect(() => {
        if(audio.ended) setCurrentSong(null);
    }, [audio.ended])

    const onSessionUserPage = !!(sessionUser && sessionUser.id === user.id)

    return (
        <div className="single-song-container">
            <div>
                {song.songImgURL ? <SongImg imgURL={song.songImgURL} style={margins}/> : <DefaultSongImg style={margins}/>}
            </div>
            <div className="play-button-container">
                <i className={playStatus} onClick={updatePlayStatus}></i>
                <div className="song-title-container">
                    <div>
                        <h2>{user.username}</h2>
                        <Link to={`/${user.id}/${song.id}`}>{song.title}</Link>
                    </div>
                    <div>
                        {onSessionUserPage && (
                        <>    
                            <UploadFormModal type="update" songId={song.id}></UploadFormModal>
                            <DeleteModal song={song}></DeleteModal>
                        </>
                        )}
                    </div>
                </div>
              
            </div>
        </div>
    )
}
