import React, { useRef, useState } from 'react'
import styled from 'styled-components';


const PlayBarContainer = styled.div`
    position: fixed;
    width: 100%;
    background-color: #00b7ff40;
    height: 48px;
    border-top: 1px solid #00b7ff70;
    bottom: 0px;
`;

export default function PlayBar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();
    console.log("", audioRef.current);
    if(audioRef.current){
    audioRef.current.src = "https://sc-clone.s3.amazonaws.com/1621740311256.mp3"

    }
    const playAudio = () => {
        // if(isPlaying){
        //     audioRef.current.pause();
        //     setIsPlaying(false);
        // } else {
        //     audioRef.current.play();
        //     setIsPlaying(true);
        // }
        audioRef.current.play();
    }
    const pause = () => {
        audioRef.current.pause();
    }
     
    return (
        <>
          <PlayBarContainer>
            <button onClick={playAudio}>Play</button>
            <button onClick={pause}>Pause</button>
          </PlayBarContainer>
          <audio ref={audioRef}></audio>
          
        </>
    )
}
