import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SmallUserImg, SmallUserImgDefault, CommentBox, Btn, DialogBox, DialogArrow } from '../styled-components';
import { deleteComment } from '../../store/comments';

const timeStamp = {
    position: 'absolute',
    right: '0px'
}
const userStyle = {
    margin: "10px 0px 0px 15px",
    fontSize : "12px",
    color : 'gray'
}

const contentStyle = {
    margin: "0px 0px 10px 15px",
    fontSize : "14px"
}

const circle = {
    borderRadius: "50%"
}

const editStyles = {
    position: 'absolute',
    right: '0px',
    bottom: '0px'
}


export default function SingleComment({comment, user}) {
    const [showEdit, setShowEdit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();

    const reveal = () => setShowEdit(true)
    const hide = () => setShowEdit(false)

    const toggleConfirm = () => {
        setShowConfirm(prevState => !prevState);
    }

    const handleDelete = () => {
        dispatch(deleteComment(comment.id));
    }   

    const handleCommentEdit = e => {
        if(e.key === "Enter"){
            e.target.blur();

            //dispatch editedContent
            setEditMode(false);
        }

    }
    return (
        <CommentBox onMouseEnter={reveal} onMouseLeave={hide}>
                {user.profileImgURL ? <SmallUserImg style={circle}imgURL={user.profileImgURL}/> : <SmallUserImgDefault style={circle}/>}
                <div>
                    <p style={userStyle}>{user.username}</p>
                    {editMode ? 
                    <input 
                    type='text'
                    onChange={e => setEditedContent(e.target.value)} 
                    value={editedContent}
                    onKeyUp={e => handleCommentEdit(e)}
                    />
                    :
                    <p style={contentStyle}>{comment.content}</p>}
                </div>
                <p style={{...userStyle, ...timeStamp}}>{comment.createdAt.slice(0,10)}</p>
                <div style={editStyles}> 
                    {showEdit && (
                    <>
                        <Btn onClick={e => setEditMode(true)}><i className="fas fa-edit" /></Btn>
                        <Btn onClick={toggleConfirm}><i className="fas fa-trash-alt"/></Btn>
                    </>
                    )}
                </div>
                {showConfirm && 
                <DialogBox>
                    <DialogArrow />
                    <p style={contentStyle}>Are you sure you want to delete?</p>
                    <Btn onClick={() => setShowConfirm(false)}>Cancel</Btn>
                    <Btn onClick={handleDelete}>Yes</Btn>
                </DialogBox>}

        </CommentBox>
    )
}
