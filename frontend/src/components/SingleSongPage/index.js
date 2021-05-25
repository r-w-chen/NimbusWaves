import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SongImg, DefaultSongImg } from '../styled-components/index';
import { postComment, getSongComments } from '../../store/comments';
export default function SingleSongPage() {
    const [content, setComment] = useState('');
    const {songId, userId} = useParams();
    const song = useSelector(state => state.songs[songId]);
    const comments = useSelector(state => Object.values(state.comments));
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getSongComments(song.id))
        //may want to add a dispatch to search for current song 
        //in case it's not found under songs (once I limit findAll query)
    }, [song.id])

    const { User } = song;

    // console.log("did i get the song???", song);

    const handleCommentEntry = e => {
        if(e.key === "Enter"){
            console.log("ive been entered")
            e.target.blur(); //focuses out of input
            // TODO: dispatch and handle comment submit
            const comment = {
                content,
                songId,
                userId
            }
            dispatch(postComment(comment))

            setComment('');
        }  
    }
    return (
        <>
        <section className="single-page">
            <div>
                <Link to={`/${User.id}`}>{User.username}</Link>
                <h1>{song.title}</h1>
                {song.songImgURL ? <SongImg imgURL={song.songImgURL}/> : <DefaultSongImg />}
            </div>
            <div>
                Comments 
                <input 
                    type="text"
                    value={content}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyUp={(e) => handleCommentEntry(e)}
                />
            </div>
            {comments.map(comment => (
                <div>
                    <small>{comment.User.username}</small>
                    <p>{comment.content}</p>
                </div>
            ))}
        </section>
        </>
    )
}
