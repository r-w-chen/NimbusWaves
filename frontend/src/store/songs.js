import {csrfFetch} from './csrf';

export const songsReducer = (state = {}, action) => {

    switch(action.type){
        case ADD_SONG:
            return {...state, audio: action.song}
        default:
            return state;
    }
}


const ADD_SONG = "song/addSong"
const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}
//thunk
export const uploadSong = (song) => async dispatch => {
    const {title, genre, description, audioFile, audioImg, userId} = song;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    if(description) formData.append("description", description);
    formData.append('audioFile', audioFile); //will need to change later if accomodating multiple files
    if(audioImg) formData.append('audioImg', audioImg);
    formData.append('userId', userId);

    const res = await csrfFetch('/api/songs', {
        method: "POST",
        headers: {
        "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const data = await res.json();

    //still need to dispatch action creator 
    dispatch(addSong(data.song));
}