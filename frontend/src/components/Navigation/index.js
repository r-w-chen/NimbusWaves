import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton';


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
        <NavLink to="login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink> 
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