import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupFormPage.css';
import { signup } from '../../store/session';

const SignupFormPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    
    if(sessionUser) return <Redirect to="/" />

    const handleSignup = e => {
        e.preventDefault();
        if(password === confirmPassword){
            const user = {
                username,
                email,
                password
            }
    
            dispatch(signup(user)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
              }); 
        }
        setErrors(['Password and Confirm Password fields must match'])
    }
    return (
        <form onSubmit={handleSignup}>
            <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>
                Username
                <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <label>
                Email
                <input 
                  type='text'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password
                <input 
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <label>
                Confirm Password
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </label>
            <button>Signup</button>
        </form>
    )
}

export default SignupFormPage