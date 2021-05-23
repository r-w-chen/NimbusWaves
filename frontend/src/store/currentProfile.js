import {csrfFetch} from './csrf';

export const currentProfileReducer = (state = {}, action) => {

    switch(action.type){
        case LOAD_PROFILE:
            return action.user
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

export const fetchProfile = username => async dispatch => {
    const res = await csrfFetch(`/api/users/${username}`)
    const data = await res.json();
    dispatch(loadProfile(data));
    return data;
}
