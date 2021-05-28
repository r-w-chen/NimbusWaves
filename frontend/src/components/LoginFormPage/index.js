import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { LoginBtn, LoginInput } from '../styled-components/index';
import DemoLogin from '../DemoLogin/DemoLogin';
import './LoginForm.css';
import { useLoginSignup } from '../../context/LoginSignup';

const LoginFormPage = ({hideModal, switchToSignup}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const {setCurrentModal} = useLoginSignup()
    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/discover" />;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        //should either expect errors obj or user obj
        const data = await dispatch(login(usernameOrEmail, password))
        if(data.errors){
            setErrors(data.errors);       
        } 
        setCurrentModal('');
    }
    

  

    const switchForms = () => {
        hideModal();
        switchToSignup();
    }
    
    return (    
        <form className="login-signup" onSubmit={handleSubmit}>
            <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
                <DemoLogin />

                <LoginInput
                  type="text"
                  value={usernameOrEmail}
                  onChange={e => setUsernameOrEmail(e.target.value)}
                  placeholder="Your username or email"
                  required
                />

                <LoginInput 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />

            <LoginBtn type="submit">Log In</LoginBtn>
            <p>Don't have an account? Signup <a className="signup-link" onClick={switchForms}>here</a></p>
        </form>
    )
}

export default LoginFormPage;