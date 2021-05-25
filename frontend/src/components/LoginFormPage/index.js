import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { LoginBtn } from '../styled-components/index';
import './LoginForm.css';

const LoginFormPage = ({hideModal}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/" />;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        //should either expect errors obj or user obj
        const data = await dispatch(login(usernameOrEmail, password))
        if(data.errors){
            setErrors(data.errors);       
        } 
    }
    return (    
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <LoginBtn>Login as a Demo User</LoginBtn>
            <label>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={e => setUsernameOrEmail(e.target.value)}
                  placeholder="Your username or email"
                  required
                />
            </label>
            <label>
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
            </label>
            <LoginBtn type="submit">Log In</LoginBtn>
            <p>Don't have an account? Sign Up <Link className="signup-link" to="/signup" onClick={hideModal}>here</Link></p>
        </form>
    )
}

export default LoginFormPage;