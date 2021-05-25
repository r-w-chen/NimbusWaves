import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { LoginBtn } from '../styled-components/index';

import SignupFormPage from './index.js';


export default function SignupFormModal({isSignup, setCurrentModal}) {
    const [showModal, setShowModal] = useState(false);
    // console.log("Should Signup be revealed?" , isSignup)

    useEffect(() => {
        if(isSignup){
            setShowModal(true);
        }
    }, [isSignup])

    return (
        <>
          <button onClick={() => setShowModal(true)}>Signup</button>
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
