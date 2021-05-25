import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SongImg, DefaultSongImg } from '../styled-components/index';
export default function SingleSongPage() {
    const [comment, setComment] = useState('');
    const {songId, userId} = useParams();
    const song = useSelector(state => state.songs[songId]);
    const { User } = song;
    // console.log("did i get the song???", song);

    const handleCommentEntry = e => {
        if(e.key === "Enter"){
            console.log("ive been entered")
            e.target.blur(); //focuses out of input
            // TODO: dispatch and handle comment submit
            
            console.log("comment sent:", comment);
            setComment('');
        }  
    }
    return (
        <>
        <div>
            <Link to={`/${User.id}`}>{User.username}</Link>
            <h1>{song.title}</h1>
            {song.songImgURL ? <SongImg imgURL={song.songImgURL}/> : <DefaultSongImg />}
        </div>
        <div>
            Comments 
            <input 
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyUp={(e) => handleCommentEntry(e)}
            />
        </div>
        </>
    )
}
