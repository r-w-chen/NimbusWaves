import {csrfFetch} from './csrf';


const initialState = { user: null }
export const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case START_SESSION:
            // console.log("ACTION USER", action.user);
            return {...state, user: action.user}
        case END_SESSION:
            return {...state, user: null }
        case UPDATE_SESSION_USER:
            return {...state, user: action.user}
        default:
            return state;
    }
}

const START_SESSION = 'session/startSession';
const startSession = (user) => {
    return {
        type: START_SESSION,
        user
    }
}
export const login = (credential, password) => async dispatch => {

    try{
        const res = await csrfFetch(`/api/session`, {
            method: "POST", 
            body: JSON.stringify({
                credential, 
                password
             })
         })
        const data = await res.json();
        // console.log("user", data)
        dispatch(startSession(data.user));
        return data;
    } catch(err) {
        const errors = await err.json()
        return errors;
    }
   
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch(`/api/session`);
    const data = await res.json();
    dispatch(startSession(data.user));

    return res;
}

const END_SESSION = 'session/endSession';
export const endSession = () => {
    return {
        type: END_SESSION
    }
}


const UPDATE_SESSION_USER = 'session/updateSessionUser';
export const updateSessionUser = (user) => {
    return {
        type: UPDATE_SESSION_USER,
        user
    }
} 

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {method: "DELETE"});
    const data = res.json();
    dispatch(endSession());
    return data
}

export const signup = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify(user)
    });
    const data = await res.json();
    dispatch(startSession(data.user));
    return res;
}