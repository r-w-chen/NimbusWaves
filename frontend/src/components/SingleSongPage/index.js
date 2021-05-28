import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SongImg, DefaultSongImg, CommentInputBox, CommentInputDiv, SmallUserImg, SmallUserImgDefault } from '../styled-components/index';
import { postComment, getSongComments } from '../../store/comments';
import { useAudio } from '../../context/Audio';
import SingleComment from './SingleComment';
import './SingleSongPage.css';

export default function SingleSongPage() {
    const { songId } = useParams();
    const song = useSelector(state => state.songs[songId]);
    const [content, setComment] = useState('');
    const {audio, isPlaying ,setIsPlaying, currentSong, setCurrentSong}  = useAudio();
    const playStatus = song.id === currentSong ? "fas fa-pause-circle fa-3x play-button" : "fas fa-play-circle fa-3x play-button"
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const updatePlayStatus = () => {
        if(currentSong === song.id){
            audio.pause();
            setIsPlaying(false);
            setCurrentSong(null);
        } else {
            if(audio.src !== song.audioURL) {
                audio.src = song.audioURL;
            }
            audio.play();
            setIsPlaying(true);
            setCurrentSong(song.id)
        } 
    }

    useEffect(() => {
        dispatch(getSongComments(song.id))
        //may want to add a dispatch to search for current song 
        //in case it's not found under songs (once I limit findAll query)
    }, [dispatch]) //removed song.id dependency for now


    useEffect(() => {
        if(audio.ended) setCurrentSong(null);
    }, [audio.ended])
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
           
            <div className="song-header">
                <div className="song-header__title">
                    <i className={playStatus} onClick={updatePlayStatus}></i>
                    <div className="song-header__artist">
                    <Link to={`/${User.id}`}>{User.username}</Link>
                    <h1>{song.title}</h1>
                    </div>
                </div>
                <div className="song-header__img">           
                    {song.songImgURL ? <SongImg imgURL={song.songImgURL}/> : <DefaultSongImg />}
                </div>
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
