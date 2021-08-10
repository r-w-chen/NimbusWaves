import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAudio } from '../../context/Audio';
import './PlayBar.css';

const PlayBarContainer = styled.div`
    position: fixed;
    width: 100%;
    background-color: #f2f2f2;
    height: 48px;
    border-top: 1px solid #cecece;
    bottom: 0px;
    display: flex;
    justify-content: center;

`;
const ControlDiv = styled.div`
    padding: 15px;
    display: flex;
    position: relative;
    flex-grow: 1;
`;

const SongInfoCover = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${props => props.imgURL});
    background-size: cover;
    margin: 10px;
`;

const SongInfoCoverDflt = styled.div`
    width: 30px;
    height: 30px;
    background: linear-gradient(to right, pink, teal);
    margin: 10px;
`;

export default function PlayBar({hidePlayBar}) {
    const {audio, isPlaying, setIsPlaying, playOrPause, currentSong, setCurrentSong, lastPlayed} = useAudio();
    const [progress, setProgress] = useState(audio.currentTime);
    const [volume, setVolume] = useState(50);
    const [showVolumeCtrl, setShowVolumeCtrl] = useState(false);
    const volumeRef = useRef(); // holds reference to previous volume anytime audio is muted
    // need to change to lastPlayed.current
    const songs = useSelector(state => state.songs);
    const currentSongObj = songs[lastPlayed.current];

    //duration
    //currentTime 
    const handleVolume = (e) => {
      setVolume(e.target.value);
      audio.volume = e.target.value / 100; 
      if(audio.muted && e.target.value){
        audio.muted = false;
      }
    }

    const handleProgress = (e) => {
      setProgress(e.target.value);
      audio.currentTime = e.target.value / 100 * audio.duration;
    }

    const muteVolume = (e) => {
      //If audio is not muted, hold ref of what the volume was before it is muted
      //So if user hits mute button again, we set volume back to that ref value
      if(!audio.muted){
        volumeRef.current = volume;
        setVolume(0);
      } else {
        setVolume(volumeRef.current);
      }
      audio.muted = !audio.muted;
    }

    const handlePlayback = (command) => {
      const songList = Object.values(songs);
      const idxCurrentSong = songList.findIndex(song => +song.id === +lastPlayed.current);
      const nextSong = songList[idxCurrentSong + 1];

      // change to next song in array if 'next' was hit
      if(command === 'next' && nextSong){
        setCurrentSong(nextSong.id)
        audio.src = nextSong.audioURL;
        lastPlayed.current = nextSong.id;
        setIsPlaying(true);
        audio.play();
      }


      // if 'back' was hit, either restart the song from the beginning
      // or if the song was already at the beginning, change to previous song
      if(command === 'back'){
        const prevSong = songList[idxCurrentSong - 1];
        if(progress <= 1 && prevSong){
          audio.src = prevSong.audioURL;
          setIsPlaying(true);
          lastPlayed.current = prevSong.id;
          audio.play();
        } else {
          setProgress(0);
          audio.play();
          setIsPlaying(true);
          audio.currentTime = 0;
        }
      }
    }


    useEffect(() => {
      let timer;
      if(isPlaying){
        timer = setInterval(() => {
            //every second, currentTime goes up by 1 
            //currentTime / duration * 100 
            setProgress(audio.currentTime / audio.duration * 100);
        }, 1000)
      } else {
        clearInterval(timer);
      }
      if(audio.ended) setIsPlaying(false);
    }, [isPlaying, audio.ended])
   
    return (
        <>
          <PlayBarContainer>
            <div className="audio-controls-wrapper">
              <ControlDiv>
                <div className="play-controls">
                  <button onClick={() => handlePlayback('back')}>
                    <i class="fas fa-step-backward"></i>
                  </button>
                  <button>
                    <i className={isPlaying ? "fas fa-pause":"fas fa-play"} onClick={playOrPause}></i>
                  </button>
                  <button onClick={() => handlePlayback('next')}>
                    <i class="fas fa-step-forward"></i>
                  </button>
                </div>
                <div className="progress-bar-wrapper">
                  <input className="progress-bar" type="range" min='0' max='100' value={progress} onChange={handleProgress}/>
                </div>
              </ControlDiv>
                <div className="volume-container" onMouseEnter={() => setShowVolumeCtrl(true)} onMouseLeave={() => setShowVolumeCtrl(false)}>
                <button onClick={muteVolume}>
                  <i className={volume >= 50 ? "fas fa-volume-up" : volume > 0 && volume < 50? "fas fa-volume-down" : "fas fa-volume-mute"}></i>
                </button>
                {showVolumeCtrl && 
                <div className="volume-control-wrapper">
                  <input className="volume" type="range" min='0' max='100' value={volume} onChange={handleVolume}/>
                  <div className="volume-control-wrapper-arrow"></div>
                </div>
                }     
                </div>
              <div className='playbar-song-display'>
                {currentSongObj?.songImgURL ? <SongInfoCover imgURL={currentSongObj.songImgURL}/> : <SongInfoCoverDflt />}
                <div className='playbar-song-info'>
                  <Link to={`/${currentSongObj?.User.id}`} className="playbar-song-user">{currentSongObj?.User.username}</Link>
                  <Link to={`/${currentSongObj?.User.id}/${currentSongObj?.id}`} className="playbar-song-title">{currentSongObj?.title}</Link>
                </div>
              </div>
            </div>
          </PlayBarContainer>
        </>
    )
}
