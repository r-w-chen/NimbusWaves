import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Btn } from '../styled-components/index';
import UploadFormPage from './index';

export default function UploadFormModal({type, song}) {
  const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Btn onClick={() => setShowModal(true)}><i className="far fa-edit"></i>Edit</Btn>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UploadFormPage type={type} song={song} hideModal={() => setShowModal(false)}/>
          </Modal>
        )}
      </>
    )
}
