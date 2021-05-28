import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useAudio } from '../../context/Audio';


const PlayBarContainer = styled.div`
    position: fixed;
    width: 100%;
    background-color: #c1eeff;
    height: 48px;
    border-top: 1px solid #00b7ff70;
    bottom: 0px;
`;
const ControlDiv = styled.div`
    padding: 15px;
`;

export default function PlayBar() {
  const {audio, isPlaying, setIsPlaying, playOrPause, currentSong, setCurrentSong} = useAudio();
    const [progress, setProgress] = useState(audio.currentTime);
    const [volume, setVolume] = useState(50);
    // const songRef = useRef(currentSong);

    //duration
    //currentTime 
    const handleVolume = (e) => {
      setVolume(e.target.value);
      audio.volume = volume / 100; 
    }
    const handleProgress = (e) => {
      setProgress(e.target.value);
      audio.currentTime = progress / 100 * audio.duration;
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
            <ControlDiv>
              <i className={isPlaying ? "fas fa-pause":"fas fa-play"} onClick={playOrPause}></i>
              <label>
                Progress
              <input className="progress-bar" type="range" min='0' max='100' value={progress} onChange={handleProgress}/>
              </label>
              <label>
                Volume
              <input className="volume" type="range" min='0' max='100' value={volume} onChange={handleVolume}/>
              </label>
            </ControlDiv>
          </PlayBarContainer>
        </>
    )
}
