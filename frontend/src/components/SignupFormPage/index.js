import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { LoginBtn, LoginInput } from '../styled-components/index';
import './SignupFormPage.css';
import { signup } from '../../store/session';

const SignupFormPage = ({hideModal, switchToLogin}) => {
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


    const switchForms = () => {
        hideModal();
        switchToLogin();
    }


    return (
        <form className="login-signup" onSubmit={handleSignup}>
            <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <LoginBtn type="button">Try as a Demo User</LoginBtn>
            <div className="auth-separator">----- or -----</div>
                <LoginInput
                    type='text'
                    value={username}
                    placeholder="Your username"
                    onChange={e => setUsername(e.target.value)}
                />

                <LoginInput 
                  type='text'
                  value={email}
                  placeholder="Your email"
                  onChange={e => setEmail(e.target.value)}
                />


                <LoginInput 
                    type='password'
                    value={password}
                    placeholder="Your password"
                    onChange={e => setPassword(e.target.value)}
                />


                <LoginInput 
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    onChange={e => setConfirmPassword(e.target.value)}
                />

            <LoginBtn>Signup</LoginBtn>
            <p>Already have an account? Login <a className="signup-link" onClick={switchForms}>here</a></p>
        </form>
    )
}

export default SignupFormPage