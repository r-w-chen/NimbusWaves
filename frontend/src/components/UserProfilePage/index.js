import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchProfileSongs } from '../../store/currentProfile';
import ProfileNavigation from './ProfileNavigation';
import SongContainer from './SongContainer';
import './UserProfilePage.css';
import UserHeader from './UserHeader';
export default function UserProfilePage() {
    const { userId } = useParams();
    const [profileLoaded, setProfileLoaded] = useState(false);
    const dispatch = useDispatch();
    const currentProfile = useSelector(state => state.currentProfile);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
       dispatch(fetchProfile(userId))
       .then(() => setProfileLoaded(true))
       .then(() => dispatch(fetchProfileSongs(userId)))
      
    }, [userId, dispatch])
    
    // Render all songs uploaded by current user 
    if(profileLoaded){
        if(currentProfile.user){
            return (
                <div className="single-page">

                    <UserHeader user={currentProfile.user} sessionUser={sessionUser}/>
                    <ProfileNavigation user={currentProfile.user} renderEdit={sessionUser && sessionUser.id === currentProfile.user.id}/>
                    <div className="songs-container">
                        {currentProfile.songs && Object.values(currentProfile.songs).map(song => (
                        <SongContainer key={song.id} song={song} user={currentProfile.user} sessionUser={sessionUser}/> 
                        )
                        )}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="single-page">
                    <div className="error-page">
                        <h1 className="error-header">Profile Not Found</h1>
                        <Link className="error-link" to="/discover">Return Home</Link>
                    </div>
                </div>
            )
        }
    } else {
        return null;
    }
    
}
