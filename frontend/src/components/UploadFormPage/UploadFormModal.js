import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Btn } from '../styled-components/index';
import UploadFormPage from './index';

export default function UploadFormModal({type, songId}) {
  const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Btn onClick={() => setShowModal(true)}><i className="far fa-edit"></i>Edit</Btn>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UploadFormPage type={type} songId={songId} hideModal={() => setShowModal(false)}/>
          </Modal>
        )}
      </>
    )
}
