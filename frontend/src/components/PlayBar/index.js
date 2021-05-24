import React, { useState, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player';
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
    const {audio, isPlaying, setIsPlaying, playOrPause} = useAudio();
    // console.log("what is the audio?", audio)
    useEffect(() => {
        audio.src = "https://sc-clone.s3.amazonaws.com/1621740311256.mp3";
    }, [])
   
     
    return (
        <>
          <PlayBarContainer>
            <ControlDiv>
              <i className={isPlaying ? "fas fa-pause":"fas fa-play"} onClick={playOrPause}></i>
            </ControlDiv>
          </PlayBarContainer>
        </>
    )
}
