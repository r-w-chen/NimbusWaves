import React, { useState, useEffect, useRef } from 'react'
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

export default function PlayBar({hidePlayBar}) {
  const {audio, isPlaying, setIsPlaying, playOrPause, currentSong, setCurrentSong} = useAudio();
    const [progress, setProgress] = useState(audio.currentTime);
    const [volume, setVolume] = useState(50);
    const [showVolumeCtrl, setShowVolumeCtrl] = useState(false);
    // const songRef = useRef(currentSong);
    const volumeRef = useRef();

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
      audio.currentTime = progress / 100 * audio.duration;
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
    // console.log("LAST VOLUME LEVEL BEFORE MUTE", volumeRef)
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
                <button>
                  <i class="fas fa-step-backward"></i>
                </button>
                <button>
                  <i className={isPlaying ? "fas fa-pause":"fas fa-play"} onClick={playOrPause}></i>
                </button>
                <button>
                  <i class="fas fa-step-forward"></i>
                </button>
              </div>
              <div className="progress-bar-wrapper">
                <input className="progress-bar" type="range" min='0' max='100' value={progress} onChange={handleProgress}/>
              </div>
            </ControlDiv>
            <ControlDiv onMouseEnter={() => setShowVolumeCtrl(true)} onMouseLeave={() => setShowVolumeCtrl(false)}>
              <div className="volume-container">
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
            </ControlDiv>
            <ControlDiv>
              Display Song Info and Cover
            </ControlDiv>
            </div>
          </PlayBarContainer>
        </>
    )
}
