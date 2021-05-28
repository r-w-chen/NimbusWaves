import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useLoginSignup } from '../../context/LoginSignup';

import './LandingPage.css';

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);
    const {setCurrentModal} = useLoginSignup();
    if(sessionUser) return <Redirect to="/discover" />

    
    return (
        <div className="landing-image">
            <header className="landing-header">
                <h1>NimbusWaves</h1>
                <p>Next generation sounds right at your fingertips</p>
            </header>
            <button className="landing-signup-btn" onClick={() => setCurrentModal('signup')}>Get Started Here</button>
        </div>
    )
}
