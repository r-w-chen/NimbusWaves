import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
const ProfileButton = ({user}) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        setShowMenu(false);
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
    <i className="far fa-user-circle" onClick={e => setShowMenu(prevState => !prevState)}></i>
    {showMenu && (
       <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
       </ul> 
    )}
    </>    
    )
}
export default ProfileButton;