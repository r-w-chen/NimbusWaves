import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import './LoginForm.css';
const LoginFormPage = () => {
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
            <label>
                Username or Email
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={e => setUsernameOrEmail(e.target.value)}
                  required
                />
            </label>
            <label>
                Password
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
            </label>
            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginFormPage;