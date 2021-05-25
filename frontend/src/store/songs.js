import {csrfFetch} from './csrf';
import {normalize} from './utils';
import { store } from '../index';
import { addProfileSong } from './currentProfile';
export const songsReducer = (state = {}, action) => {

    switch(action.type){
        case LOAD_SONGS:
            // return {...state, [state]: action.songs};
            return action.songs;
        case ADD_SONG:
            return {...state, [state]: action.song}
        default:
            return state;
    }
}

const ADD_SONG = "songs/addSong"
const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

// for currentProfile reducer
// const ADD_PROFILE_SONG = 'currentProfile/addProfileSong';
// const addProfileSong = song => {
//     return {
//         type: ADD_PROFILE_SONG,
//         song
//     }
// }



const LOAD_SONGS = "songs/loadSongs"
const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
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
    store.dispatch(addProfileSong(data.song));

    dispatch(addSong(data.song));
}

export const fetchSongs = () => async dispatch => {
    const res = await csrfFetch('/api/songs')
    const { songs } = await res.json();
    const normalizedData = normalize(songs);
    dispatch(loadSongs(normalizedData));
    return normalizedData;
}

