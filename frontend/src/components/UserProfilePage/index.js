import React, { useEffect, useState } from 'react'
import { useParams, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchProfileSongs } from '../../store/currentProfile';
import ProfileNavigation from './ProfileNavigation';
import SongContainer from './SongContainer';
import './UserProfilePage.css';
export default function UserProfilePage() {
    const { userId } = useParams();
    // const [onSessionUserPage, setOnSessionUserPage] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const dispatch = useDispatch();
    const currentProfile = useSelector(state => state.currentProfile);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
       dispatch(fetchProfile(userId))
       .then(() => setProfileLoaded(true))
       .then(() => dispatch(fetchProfileSongs(userId)))
      
    }, [userId])
 
    // Render all songs uploaded by current user 
    if(profileLoaded){
        if(currentProfile){
            return (
                <div>
                    <p>Welcome to {currentProfile.user.username}'s page</p>

                    {/* *** Add conditional render for images */}
                    {<img src={currentProfile.user.profileImgURL}></img>}
                    <img src={currentProfile.user.coverImgURL}></img>
                    <ProfileNavigation user={userId} renderEdit={sessionUser && sessionUser.id === currentProfile.user.id}/>
                    {currentProfile.songs && Object.values(currentProfile.songs).map(song => (
                    <SongContainer key={song.id} song={song} user={currentProfile.user} sessionUser={sessionUser}/> 
                    )
                    )}
                    <Route path={`/${userId}/popular-songs`}>
                        <h1>Popular Songs</h1>
                    </Route>
                    <Route path={`/${userId}/songs`}>
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
