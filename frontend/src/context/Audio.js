import React, { useContext, useRef, useState, useEffect } from 'react';

const AudioContext = React.createContext();

export function AudioProvider({children}){
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null); //uses id
    const [audio, setAudio] = useState();
    const audioRef = useRef();
    const lastPlayed = useRef(''); 

    const playOrPause = () => {
        if(isPlaying){
            audio.pause();
            lastPlayed.current = currentSong; //preserves which song you last played before pausing on playbar

            setIsPlaying(false);
            setCurrentSong(null);
        } else {
            audio.play();
            setIsPlaying(true);
            setCurrentSong(lastPlayed.current);
            console.log("CURRENT SONG", lastPlayed)
        }
    }
    useEffect(() => {
        setAudio(audioRef.current);
    }, [])
    return (
        <AudioContext.Provider value={{audio, isPlaying, setIsPlaying, playOrPause, currentSong, setCurrentSong}}>
            {children}
            <audio ref={audioRef}></audio>
        </AudioContext.Provider>
    )

}

export const useAudio = () => useContext(AudioContext);


