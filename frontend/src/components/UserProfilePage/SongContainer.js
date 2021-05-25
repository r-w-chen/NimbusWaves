import { useState } from 'react';
import {useAudio} from '../../context/Audio';
import { Btn, SongImg, DefaultSongImg } from '../styled-components/index';
import UploadFormModal from '../UploadFormPage/UploadFormModal';


export default function SongContainer({song, user}) {
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
                        <h1>{song.title}</h1>
                    </div>
                    <div>
                        <UploadFormModal type="update" songId={song.id}></UploadFormModal>
                    </div>
                </div>
              
            </div>
        </div>
    )
}
