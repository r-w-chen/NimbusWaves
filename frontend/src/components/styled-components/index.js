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
    margin-bottom: 20px;
`;

export const DefaultSongImg = styled.div`
background: linear-gradient(to right, red, blue);
width: 160px;
height: 160px;
margin-bottom: 20px;
`;

export const ConfirmBox = styled.div`
    width: 350px;
    height: 175px;
    padding: 15px;
`;