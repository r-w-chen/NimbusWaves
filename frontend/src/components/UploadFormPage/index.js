import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './UploadFormPage.css';
import { uploadSong } from '../../store/songs';
import { patchProfileSong } from '../../store/currentProfile';


const UploadFormPage = ({type, song, hideModal}) => {
    const [title, setTitle] = useState(type === 'update' ? song.title : '');
    const [genre, setGenre] = useState(type === 'update' ? song.genre : 'None');
    // *** possible bonus: tags, captions for a posts section
    const [description, setDescription] = useState(type === 'update' ? song.description : '');
    const [audioFile, setAudioFile] = useState(null);
    const [audioImgPreview, setAudioImgPreview] = useState(type === 'update' ? song.songImgURL : '');
    const [audioImg, setAudioImg] = useState(null);
    const [errors, setErrors] = useState([]);
    
    // const [uploadStatus, setUploadStatus] = useState(false);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const imageDiv = useRef();
    const history = useHistory();
    // *** add logic that pops up a login modal if sessionUser is null


    useEffect(() => {
        if(audioImgPreview){
            imageDiv.current.style.backgroundImage = `url("${audioImgPreview}")`
        }
    }, [audioImg, audioImgPreview])


    const handleAudioFile = e => {
        const file = e.target.files[0];
        if(file) setAudioFile(file);
    }

    const handleImageFile = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => setAudioImgPreview(e.target.result);
        
        if(file){
            setAudioImg(file);
            reader.readAsDataURL(file);
        } 
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = [];
        // Check that title is not empty and audio file was selected
        if(title.trim().length === 0) errors.push('Title field cannot be empty')
       
        let newSong = {
            title,
            genre,
            description,
            audioImg,
            userId: sessionUser.id
        }
        if(type === "update"){

            if(errors.length){
                setErrors(errors);
                return;
            }

            newSong.id = song.id
            dispatch(patchProfileSong(newSong));
            hideModal();
        } else {

            if(!audioFile) errors.push('Must include audio file')

            if(errors.length){
                setErrors(errors);
                return;
            }
            
            newSong.audioFile = audioFile;
            // setUploadStatus(true);
            dispatch(uploadSong(newSong));
            history.push('/discover')
        }
        
    }

    const exitEdit = e => {
        e.preventDefault();
        hideModal();
    }


    return (

            <form onSubmit={handleSubmit} className="full-upload-container">
                <div className="upload-header">
                    <h1 style={{fontSize:"20px"}}>{type === 'update'? `Edit Song: ${song.title}`: 'Basic Info'}</h1>
                </div>
                <ul className="error-list">
                    {errors.length > 0 && errors.map(error => (
                        <li>* {error}</li>
                    ))}
                </ul>
                <div className="upload-form-container">
                    <div ref={imageDiv} className="upload-form-image">
                            {/* {audioImgPreview && <img src={audioImgPreview}/>} */}
                            <div className="file-input-container img-btn">
                                <label for='img-upload' className="upload-img-btn">
                                    <i className="fas fa-camera" />
                                    Upload image
                                    </label>
                                <input 
                                    id='img-upload'
                                    className='file-upload'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageFile}
                                />
                            </div>
                    </div>
                    <div className="upload-form" >
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
                        {type === "update" ? 
                        <p className="audio-file-name">Hit 'Save' to confirm changes</p>
                        :   
                            <div className="file-input-container song-input">
                                <label for="song-upload" className="upload-song-btn">
                                    {audioFile ? 'Change Song' : 'Choose Song'}
                                <input 
                                    id="song-upload"
                                    className='file-upload'
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleAudioFile}
                                    size="30"
                                />
                                </label>
                                {audioFile && <p className="audio-file-name">{audioFile.name}</p>}
                            </div>}
                        
                    </div>
                </div>
                <div className='upload-form-footer'>
                    {type === 'update' && <button onClick={exitEdit}className='save-btn'>Cancel</button>}
                    <button className="save-btn">{type === 'update' ? 'Save' : 'Upload'}</button>
                </div>
            </form>

    )
}

export default UploadFormPage;