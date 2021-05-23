import React, { useEffect, useState } from 'react'
import { useParams, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/currentProfile';
import ProfileNavigation from './ProfileNavigation';
import './UserProfilePage.css';
export default function UserProfilePage() {
    const { user } = useParams();
    // const [onSessionUserPage, setOnSessionUserPage] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const dispatch = useDispatch();
    const currentProfile = useSelector(state => state.currentProfile);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
       dispatch(fetchProfile(user)).then((data) => {
           setProfileLoaded(true)
    });  

    }, [dispatch])
 


    if(profileLoaded){
        if(currentProfile){
            return (
                <div>
                    <p>Welcome to {currentProfile.username}'s page</p>
                    {/* *** Add conditional render for images */}
                    {<img src={currentProfile.profileImgURL}></img>}
                    <img src={currentProfile.coverImgURL}></img>
                    <ProfileNavigation user={user} renderEdit={sessionUser.id === currentProfile.id}/>

                    <Route path={`/${user}/popular-songs`}>
                        <h1>Popular Songs</h1>
                    </Route>
                    <Route path={`/${user}/songs`}>
                        <h1>All Songs</h1>
                    </Route>
                </div>
            )
        } else {
            return (
                <div>
                    Profile Not Found
                </div>
            )
        }
    } else {
        return null;
    }
    
}
