import {normalize} from './utils';
import {csrfFetch} from './csrf';

export const currentProfileReducer = (state = { user: null, songs: null}, action) => {
        let newState;
    switch(action.type){
        case LOAD_PROFILE:
            return {...state, user: action.user}
        case LOAD_PROFILE_SONGS:
            return {...state, songs: action.songs}
        case ADD_PROFILE_SONG:
            newState = JSON.parse(JSON.stringify(state));
            newState.songs[action.song.id] = action.song
            return newState;
        case UNLOAD_PROFILE:
            return {};
        case UPDATE_PROFILE_SONG:
            newState = JSON.parse(JSON.stringify(state));
            newState.songs[action.song.id] = action.song
            return newState;
        case REMOVE_PROFILE_SONG:
            newState = JSON.parse(JSON.stringify(state));
            delete newState.songs[action.songId]
            return newState;
        case UPDATE_PROFILE:
            newState = JSON.parse(JSON.stringify(state));
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
}

//actions for: leaving profile page, loading profile page
// for currentProfile reducer
export const ADD_PROFILE_SONG = 'currentProfile/addProfileSong';
export const addProfileSong = song => {
    return {
        type: ADD_PROFILE_SONG,
        song
    }
}

const LOAD_PROFILE = 'currentProfile/loadProfile';
const loadProfile = user => {
    return {
        type: LOAD_PROFILE,
        user
    }
}
const LOAD_PROFILE_SONGS = 'currentProfile/loadProfileSongs';

const loadProfileSongs = songs => {
    normalize(songs);
    return {
        type: LOAD_PROFILE_SONGS,
        songs: normalize(songs)
    }
}
const UNLOAD_PROFILE = 'currentProfile/unloadProfile';

export const unloadProfile = () => {
    return {
        type: UNLOAD_PROFILE,
    }
}

export const fetchProfile = userId => async dispatch => {
    // const res = await csrfFetch(`/api/users/${userId}`)
    // const data = await res.json();
    // dispatch(loadProfile(data));
    // return data;

    const userDataResponse = await csrfFetch(`/api/users/${userId}`)
    const userData = await userDataResponse.json();
    dispatch(loadProfile(userData));

    // const userSongsDataRes = await csrfFetch(`/api/songs/user/${userId}`)
    // const userSongsData = await userSongsDataRes.json();
    // dispatch(loadProfileSongs(userSongsData))
    // return {userData, userSongsData};
}

export const fetchProfileSongs = userId => async dispatch => {

    const res = await csrfFetch(`/api/songs/user/${userId}`)
    const data = await res.json();
    dispatch(loadProfileSongs(data.userSongs));
}

const UPDATE_PROFILE_SONG = "songs/updateProfileSong";
const updateProfileSong = song => {
    return {
        type: UPDATE_PROFILE_SONG,
        song
    }
}

const REMOVE_PROFILE_SONG = "songs/removeProfileSong";
const removeProfileSong = songId => {
    return {
        type: REMOVE_PROFILE_SONG,
        songId
    }
}

export const patchProfileSong = song => async dispatch => {
    const {title, genre, description, audioImg, id} = song;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append('id', id);
    if(description) formData.append("description", description);
    if(audioImg) formData.append('audioImg', audioImg);
    else formData.append('noAudioImg', true);


    const res = await csrfFetch('/api/songs/', {
        method: "PATCH",
        headers: {
        "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const data = await res.json();
    // console.log("THE DATA I GOT BACK", data.songToUpdate);
    dispatch(updateProfileSong(data.songToUpdate))
}

export const deleteProfileSong = songId => async dispatch => {
    // console.log("DELETING SONG", songId);
    const res = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    if(data.deleted){
        dispatch(removeProfileSong(songId));
        return true;
    }
}


const UPDATE_PROFILE = "currentProfile/updateProfile"
const updateProfile = user => {
    return {
        type: UPDATE_PROFILE,
        user
    }
}
export const patchUserProfile = user => async dispatch => {
    const { id, username, profileImg, coverImg} = user;
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    if(profileImg) form.append('profileImg', profileImg);
    if(coverImg) form.append('coverImg', coverImg);
    const res = await csrfFetch(`/api/users/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "multipart/form-data",
            },
        body: form,
    })
    const data = await res.json();
    dispatch(updateProfile(data));
}