import React, { useState, useEffect } from 'react';
import { useLoginSignup } from '../../context/LoginSignup';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index.js';


export default function SignupFormModal({isSignup, setCurrentModal}) {
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        if(isSignup) setShowModal(true);
        
    }, [isSignup])

    return (
        <>
          <button className="login-signup-btn" onClick={() => setShowModal(true)}>Signup</button>
          {showModal && (
            <Modal onClose={() => {
              setShowModal(false)
              setCurrentModal('')
              }}>
              <SignupFormPage switchToLogin={() => setCurrentModal('login')} hideModal={() => setShowModal(false)}/>
            </Modal>
          )}
        </>
      );
}
