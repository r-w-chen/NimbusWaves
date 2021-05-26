import {csrfFetch} from './csrf';
import {normalize} from './utils';

export const commentsReducer = (state = {}, action) => {
         let newState;
    switch(action.type){
        case ADD_SONG_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case SHOW_COMMENTS:
            return action.comments;
        case REMOVE_COMMENT:
            newState = JSON.parse(JSON.stringify(state));
            delete newState[action.id];
            return newState;
        case UPDATE_COMMENT:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.comment.id] = action.comment
            return newState;
        default: 
            return {};
    }
}
const ADD_SONG_COMMENT = "comments/addSongComment";

const addSongComment = comment => {
    return {
        type: ADD_SONG_COMMENT,
        comment
    }
}

export const postComment = comment => async dispatch => {
    const res = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
    });

    const data = await res.json();
    
    console.log(data);
    dispatch(addSongComment(data));

}


const SHOW_COMMENTS = 'comments/showComments';
const showComments = comments => {
    comments = normalize(comments);
    return {
        type: SHOW_COMMENTS,
        comments
    }
}
export const getSongComments = songId => async dispatch => {
    const res = await csrfFetch(`/api/comments/${songId}`)

    const data = await res.json();

    dispatch(showComments(data));
}

const REMOVE_COMMENT = 'comments/removeComment';
const removeComment = id => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

export const deleteComment = id => async dispatch => {
    const res = await csrfFetch(`/api/comments/${id}`, {method: "DELETE"})

    dispatch(removeComment(id))
}


const UPDATE_COMMENT = 'comments/updateComment';
const updateComment = comment => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}
export const patchComment = comment => async dispatch => {
    const res = await csrfFetch('/api/comments', {
        method: 'PATCH',
        body: JSON.stringify(comment)
    })

    const data = await res.json();

    // console.log('the data I got back', data);
    dispatch(updateComment(data));
    return data;
}