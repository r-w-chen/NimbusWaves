import {csrfFetch} from './csrf';

export const currentProfileReducer = (state = { user: null, songs: null}, action) => {

    switch(action.type){
        case LOAD_PROFILE:
            return {...state, user: action.user}
        case LOAD_PROFILE_SONGS:
            return {...state, songs: action.songs}
        case UNLOAD_PROFILE:
            return {};
        default:
            return state;
    }
}

//actions for: leaving profile page, loading profile page


const LOAD_PROFILE = 'currentProfile/loadProfile';
const loadProfile = user => {
    return {
        type: LOAD_PROFILE,
        user
    }
}
const LOAD_PROFILE_SONGS = 'currentProfile/loadProfileSongs';

const loadProfileSongs = songs => {
    return {
        type: LOAD_PROFILE_SONGS,
        songs
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

export const fetchProfileSongs = (userId) => async dispatch => {
    console.log("HERE'S THE FUCKING DATA");

    const res = await csrfFetch(`/api/songs/user/${userId}`)
    const data = await res.json();
    dispatch(loadProfileSongs(data.userSongs));
}