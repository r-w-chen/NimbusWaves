import { useState } from 'react';
import { Link } from 'react-router-dom';

import {useAudio} from '../../context/Audio';
import { Btn, SongImg, DefaultSongImg } from '../styled-components/index';
import UploadFormModal from '../UploadFormPage/UploadFormModal';
import DeleteModal from '../DeleteModal/DeleteModal';

export default function SongContainer({song, user, sessionUser}) {
    const {audio, isPlaying ,setIsPlaying, currentSong, setCurrentSong}  = useAudio();
    const playStatus = song.id === currentSong ? "fas fa-pause-circle fa-3x play-button" : "fas fa-play-circle fa-3x play-button"

    const updatePlayStatus = () => {
        if(currentSong === song.id){
            audio.pause();
            setIsPlaying(false);
            setCurrentSong(null);
        } else {
            audio.src = song.audioURL;
            audio.play();
            setIsPlaying(true);
            setCurrentSong(song.id)
        } 
    }
    const onSessionUserPage = !!(sessionUser && sessionUser.id === user.id)

    return (
        <div className="song-container">
            <div>
                {song.songImgURL ? <SongImg imgURL={song.songImgURL} /> : <DefaultSongImg />}
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
