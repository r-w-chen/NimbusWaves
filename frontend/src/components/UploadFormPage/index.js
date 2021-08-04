import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './UploadFormPage.css';
import { uploadSong } from '../../store/songs';
import { patchProfileSong } from '../../store/currentProfile';


const UploadFormPage = ({type, songId, hideModal}) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('None');
    // *** possible bonus: tags, captions for a posts section
    const [description, setDescription] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [audioImgPreview, setAudioImgPreview] = useState('');
    const [audioImg, setAudioImg] = useState(null);
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
            // setUploadStatus(true);
            dispatch(uploadSong(song));
            history.push('/discover')
        }
        
    }


    return (

            <form onSubmit={handleSubmit} className="full-upload-container">
                <div className="upload-header">
                    <h1 style={{fontSize:"20px"}}>Basic Info</h1>
                </div>
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
                        {type === "update"?  null
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
                <button className="save-btn">Save</button>
            </form>

    )
}

export default UploadFormPage;