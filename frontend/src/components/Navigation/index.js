import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormPage/LoginFormModal';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);
  
    let sessionLinks;
    if(sessionUser) sessionLinks = (
        <>
        <NavLink to="/upload">Upload</NavLink> 
        <ProfileButton user={sessionUser}/>
        
        </>
    );
    else sessionLinks = (
        <>
          <LoginFormModal />
          <NavLink to="/signup">Sign Up</NavLink>
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