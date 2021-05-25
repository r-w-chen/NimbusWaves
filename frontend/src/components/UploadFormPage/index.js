import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './UploadFormPage.css';
import { uploadSong } from '../../store/songs';
import { patchProfileSong } from '../../store/currentProfile';
const UploadFormPage = ({type, songId}) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('None');
    // *** possible bonus: tags, captions for a posts section
    const [description, setDescription] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [audioImg, setAudioImg] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(false);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    // *** add logic that pops up a login modal if sessionUser is null
    if(uploadStatus) return <Redirect to="/" />

    const handleAudioFile = e => {
        const file = e.target.files[0];
        if(file) setAudioFile(file);
    }

    const handleImageFile = e => {
        const file = e.target.files[0];
        if(file) setAudioImg(file);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let song = {
            title,
            genre,
            description,
            audioImg,
            userId: sessionUser.id
        }
        if(type === "update"){
            song.id = songId
            dispatch(patchProfileSong(song));
        } else {
            song.audioFile = audioFile;
            setUploadStatus(true);
            dispatch(uploadSong(song));
        }
      
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </label>
            <label>
                Genre
                <select 
                value={genre}
                onChange={e => setGenre(e.target.value)}
                >
                    <option>None</option>
                    <option>River</option>
                    <option>Forest</option>
                    <option>Binaural</option>
                </select>
            </label>
            <label>
                Description
                <textarea
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </label>
            {type === "update"?  null
            :<label>
                Upload Song Here
                <input 
                    type="file"
                    onChange={handleAudioFile}
                />
            </label>}
            <label>
                Upload Song Cover Photo Here
                <input 
                    type="file"
                    onChange={handleImageFile}
                />
            </label>
            <button>Save</button>
        </form>
    )
}

export default UploadFormPage;