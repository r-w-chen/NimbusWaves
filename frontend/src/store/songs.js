import {csrfFetch} from './csrf';
import {normalize} from './utils';
import { store } from '../index';
import { addProfileSong } from './currentProfile';
export const songsReducer = (state = {}, action) => {
    let newState
    switch(action.type){
        case LOAD_SONGS:
            // return {...state, [state]: action.songs};
            return action.songs;
        case ADD_SONG:
            return {...state, [action.song.id]: action.song}
        case REMOVE_SONG:
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.id];
            return newState;
        case UPDATE_SONG:
            newState = JSON.parse(JSON.stringify(state))
            newState[action.song.id] = action.song;
            return newState;
        default:
            return state;
    }
}
const REMOVE_SONG = 'songs/removeSong'
export const removeSong = (id) => {
    return {
        type: REMOVE_SONG,
        id
    }
}

const UPDATE_SONG = "songs/updateSong"
export const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
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

    const res = await csrfFetch('/api/songs/', {
        method: "POST",
        headers: {
        "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const data = await res.json();
    // console.log("what's the data?", data);
    //still need to dispatch action creator 
    // store.dispatch(addProfileSong(data.song));

    dispatch(addSong(data.song));
}

export const fetchSongs = () => async dispatch => {
    const res = await csrfFetch('/api/songs/')
    const { songs } = await res.json();
    const normalizedData = normalize(songs);
    dispatch(loadSongs(normalizedData));
    return normalizedData;
}


