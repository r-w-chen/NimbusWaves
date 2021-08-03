import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormPage/LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';
import { useLoginSignup } from '../../context/LoginSignup';

const Navigation = () => {
    const { currentModal, setCurrentModal } = useLoginSignup();
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser) sessionLinks = (
        <>
        <div className="nav-item">
            <NavLink className="nav-link" to="/upload">Upload</NavLink> 
        </div>
        <ProfileButton user={sessionUser}/>
        
        </>
    );
    else sessionLinks = (
        <>
          <LoginFormModal isLogin={currentModal === "login"} setCurrentModal={setCurrentModal}/>
          <SignupFormModal isSignup={currentModal === "signup"} setCurrentModal={setCurrentModal}/>
          {/* <NavLink to="/signup">Sign Up</NavLink> */}
        </>
      )
    // *** might want to change ul to nav element
    return (
        <nav className="navbar">
            <div className="nav-item-container">
                <div className="nav-item">
                    <NavLink className="nav-link" to="/discover">Home</NavLink>        
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/discover">Stream</NavLink>        
                </div>
            </div>
            {/* <input 
            className="nav-search"
            type="text"
            placeholder="search (coming soon)"
            /> */}
            <div className="nav-item-container">
                {sessionLinks}
                <a className="nav-item" href="https://github.com/r-w-chen/sc-clone"  target='_blank'><i className="fab fa-github fa-2x"/></a>
            </div>
        </nav>
    )
}

export default Navigation;