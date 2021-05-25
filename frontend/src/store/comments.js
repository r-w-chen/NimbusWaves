import {csrfFetch} from './csrf';
import {normalize} from './utils';

export const commentsReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_SONG_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case SHOW_COMMENTS:
            return action.comments;
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