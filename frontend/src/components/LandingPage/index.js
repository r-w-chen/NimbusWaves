import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginFormModal from '../LoginFormPage';
import SignupFormModal from '../SignupFormPage';
import './LandingPage.css';

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const [currentModal, setCurrentModal] = useState('');

    if(sessionUser) return <Redirect to="/discover" />

    
    return (
        <div className="landing-image">
            <header className="landing-header">
                <h1>NimbusWaves</h1>
                <p>Next generation sounds right at your fingertips</p>
            </header>
            <button className="landing-signup-btn" onClick={e => setCurrentModal('signup')}>Get Started Here</button>
        </div>
    )
}
