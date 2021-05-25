import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { LoginBtn } from '../styled-components/index';
import LoginForm from './index';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm hideModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;