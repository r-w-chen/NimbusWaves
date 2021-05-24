import {useAudio} from '../../context/Audio';
import styled from 'styled-components';

//add these to styled components page for re-use
const Btn = styled.button`
    padding: 2px 10px;
    background: white;
    border: 1px solid lightgray;
    border-radius: 3px;
    &:hover{
        border: 1px solid gray;
    }
`;
const SongImg = styled.div`
    background-image: url(${props => props.imgURL});
    background-size: cover;
    width: 160px;
    height: 160px;
    margin-bottom: 20px;
`;
const DefaultSongImg = styled.div`
    background: linear-gradient(to right, red, blue);
    width: 160px;
    height: 160px;
    margin-bottom: 20px;
`;
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
                        <Btn><i className="far fa-edit"></i>Edit</Btn>
                    </div>
                </div>
              
            </div>
        </div>
    )
}
