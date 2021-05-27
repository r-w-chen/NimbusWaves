import React from 'react'
import { UserHeaderImg, UserHeaderDefault, UserProfileDefault, UserProfileImg} from '../styled-components/index';

const headerStyle = {
    background: '#333',
    color: 'white',
    position: 'absolute',
    left: '250px',
    top: '40px',
    padding: '5px'
}
export default function UserHeader({user, sessionUser}) {
    if(user.coverImgURL){
        return (
            <UserHeaderImg coverImgURL={user.coverImgURL}>
                {user.profileImgURL ? 
                <UserProfileImg profileImgURL={user.profileImgURL}/>
                : <UserProfileDefault />}
                <h1 style={headerStyle}>{user.username}</h1>
            </UserHeaderImg>
    )
    } else {      
        return (
            <UserHeaderDefault>
            
                {user.profileImgURL ? 
                <UserProfileImg profileImgURL={user.profileImgURL}/>
                : <UserProfileDefault />}
                <h1 style={headerStyle}>{user.username}</h1>
            </UserHeaderDefault>
        )
    }
}
