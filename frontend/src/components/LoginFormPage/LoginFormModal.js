import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './index';

function LoginFormModal({isLogin, setCurrentModal}) {
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // console.log("should I be on login?", isLogin);
    if(isLogin){
        setShowModal(true);
    }
}, [isLogin])

  return (
    <>
      <button className="login-signup-btn" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => {
          setShowModal(false)
          setCurrentModal('')
          }}>
          <LoginForm switchToSignup={() => setCurrentModal('signup')} hideModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;