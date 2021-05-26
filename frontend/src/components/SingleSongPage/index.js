import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SongImg, DefaultSongImg, CommentInputBox, CommentInputDiv, SmallUserImg, SmallUserImgDefault } from '../styled-components/index';
import { postComment, getSongComments } from '../../store/comments';
import SingleComment from './SingleComment';
export default function SingleSongPage() {
    const [content, setComment] = useState('');
    const {songId, userId} = useParams();
    const song = useSelector(state => state.songs[songId]);
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSongComments(song.id))
        //may want to add a dispatch to search for current song 
        //in case it's not found under songs (once I limit findAll query)
    }, [dispatch]) //removed song.id dependency for now

    const { User } = song;

    const handleCommentEntry = e => {
        if(e.key === "Enter"){
            e.target.blur(); //focuses out of input
            const comment = {
                content,
                songId,
                userId: sessionUser.id
            }
            dispatch(postComment(comment))

            setComment('');
        }  
    }
    return (
        <>
        <section className="single-page">
            <div>
                by <Link to={`/${User.id}`}>{User.username}</Link>
                <h1>{song.title}</h1>
                {song.songImgURL ? <SongImg imgURL={song.songImgURL}/> : <DefaultSongImg />}
            </div>
            <CommentInputDiv>
                <SmallUserImgDefault />
                <CommentInputBox 
                    type="text"
                    placeholder="Write a comment"
                    value={content}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyUp={(e) => handleCommentEntry(e)}
                />
            </CommentInputDiv>
            {comments.map(comment => (
                <SingleComment 
                key={comment.id}
                comment={comment} 
                user={comment.User}
                sessionUser={sessionUser}
                />  
            ))}
        </section>
        </>
    )
}
