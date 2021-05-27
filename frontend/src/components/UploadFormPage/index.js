import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './UploadFormPage.css';
import { uploadSong } from '../../store/songs';
import { patchProfileSong } from '../../store/currentProfile';


const UploadFormPage = ({type, songId, hideModal}) => {
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
            hideModal();
        } else {
            song.audioFile = audioFile;
            setUploadStatus(true);
            dispatch(uploadSong(song));

        }
        
    }

    return (

            <div className="full-upload-container">
                <div className="upload-header">
                    <h1 style={{fontSize:"20px"}}>Basic Info</h1>
                </div>
                <div className="upload-form-container">
                    <div className="upload-form-image">
                            <div className="file-input-container img-btn">
                                <button className="upload-btn">
                                    <i className="fas fa-camera" />
                                    Upload image
                                    </button>
                                <input 
                                    className='file-upload'
                                    type="file"
                                    onChange={handleImageFile}
                                />
                            </div>
                    </div>
                    <form className="upload-form" onSubmit={handleSubmit}>
                        <label>
                            Title
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="title-input"
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
                        :   
                            <div className="file-input-container song-input">
                                <button type='button' className="upload-btn">Choose Song</button>
                                <input 
                                    className='file-upload'
                                    type="file"
                                    onChange={handleAudioFile}
                                    size="30"
                                />
                            </div>}
                            
                        
                        <button className="save-btn">Save</button>
                    </form>
                </div>
            </div>

    )
}

export default UploadFormPage;