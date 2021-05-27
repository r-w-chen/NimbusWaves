import styled from 'styled-components';


//buttons
export const Btn = styled.button`
    padding: 2px 10px;
    background: white;
    border: 1px solid lightgray;
    border-radius: 3px;
    &:hover{
        border: 1px solid gray;
    }
`;

//images
export const SongImg = styled.div`
    background-image: url(${props => props.imgURL});
    background-size: cover;
    width: 160px;
    height: 160px;
`;

export const DefaultSongImg = styled.div`
background: linear-gradient(to right, red, blue);
width: 160px;
height: 160px;
`;

export const ConfirmBox = styled.div`
    width: 350px;
    height: 175px;
    padding: 15px;
`;


export const LoginBtn = styled.button`
    border-radius: 3px;
    margin: 15px;
    width: 80%;
    height: 40px;
    background-color: #6288f3;
    color: white;
    transition: .5s;
    &:hover{
        background-color: #506fc7;
        cursor: pointer;
    }
`;

export const LoginInput = styled.input`
    width: 80%;
    height: 40px;
    margin: 10px 0px;
    font-size: 16px;
`;

//COMMENT STYLING
export const CommentInputBox = styled.input`
    width: 94%;
    height: 70%;
`;

export const CommentInputDiv = styled.div`
    height: 40px;
    width: 96%;
    background: lightgray;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    margin: 15px;

`;

export const SmallUserImg = styled.div`
    background-image: url(${props => props.imgURL});
    background-size: cover;
    width: 40px;
    height: 40px;
    align-self: center;

`;

export const SmallUserImgDefault = styled.div`
    width: 40px;
    height: 40px;
    /* border-radius: 50%; */
    background: linear-gradient(to right, blue, red);
    align-self: center;
`;

export const CommentBox = styled.div`
    display: flex;
    background: url(${props => props.imgURL});
    /* width: 500px; */
    position: relative;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    margin: 15px;
`;


//confirm delete comment
export const DialogBox = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 7px -1px rgb(0 0 0 / 40%);
    width: 220px;
    /* height: 50px; */
    min-height: auto;
    position: absolute;
    right: 0px;
    top: 59px;
    z-index: 2;
`;

export const DialogArrow = styled.div`
    width: 8px;
    height: 8px;
    position: absolute;
    top: -5px;
    right: 12px;
    /* bottom: auto; */
    transform: rotate(45deg);
    box-shadow: -1px -1px 1px -1px rgb(0 0 0 / 50%);
    border: 1px solid #ccc;
    border-width: 1px 0 0 1px;
    background: white;
    z-index: 1;
`;

//user profile 
//user edit

export const UserHeaderDefault = styled.div`
    width: 100%;
    background: linear-gradient(to right, pink, teal);
    height: 260px;
    position: relative;
`;
export const UserHeaderImg = styled.div`
    position: relative;
    width: 100%;
    background-image: url(${props => props.coverImgURL});
    background-size: cover;
    height: 260px;
`;

export const UserProfileDefault = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(to right, pink, teal);
    padding: 20px;
    transform: rotate(45deg);
`;
export const UserProfileImg = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-image: url(${props => props.profileImgURL});
    background-size: cover;
    padding: 20px;
`;