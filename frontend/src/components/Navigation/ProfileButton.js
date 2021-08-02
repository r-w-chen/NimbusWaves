import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { SmallUserImg, SmallUserImgDefault } from '../styled-components/index';

const circle = { 
    borderRadius: '50%',
    width: '30px', 
    height: '30px',
    marginRight: '10px'
};
const ProfileButton = ({user}) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        dispatch(logout());
        setShowMenu(false);
        history.push('/')
    }
    useEffect(() => {
        const closeMenu = () => setShowMenu(false);

        if(showMenu){
            document.addEventListener('click', closeMenu);
        }

        return () => document.removeEventListener('click', closeMenu);

    }, [showMenu])

    //**** may want to create a variable containing menu items in a container ****
    return (
    <>    
    <div className="nav-user nav-item" onClick={e => setShowMenu(prevState => !prevState)}>
      {!!user.profileImgURL ? <SmallUserImg style={circle} imgURL={user.profileImgURL}/> : <SmallUserImgDefault style={circle}/>}
      <p>{user.username}</p>
      {showMenu && (
       <ul className="profile-dropdown">
            <li className="profile-btn">  
                <NavLink to={`/${user.id}`}><i className="fas fa-user-alt fa-xs"></i> Profile</NavLink>
            </li>
            <li>
                <button onClick={handleLogout}><i className="fas fa-door-open fa-xs"></i> Logout</button>
            </li>
       </ul> 
    )}
    </div>
    
    </>    
    )
}
export default ProfileButton;