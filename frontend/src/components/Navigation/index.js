import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormPage/LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';

const Navigation = () => {
    const [currentModal, setCurrentModal] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    // console.log(currentModal);
    let sessionLinks;
    if(sessionUser) sessionLinks = (
        <>
        <NavLink to="/upload">Upload</NavLink> 
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
        <ul>
            <NavLink to="/">Home</NavLink>
            {sessionLinks}
        </ul>
    )
}

export default Navigation;