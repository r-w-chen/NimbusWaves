import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { Btn, ConfirmBox } from '../styled-components/index';
import { deleteProfileSong } from '../../store/currentProfile';
import { removeSong } from '../../store/songs';

export default function DeleteModal({song}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProfileSong(song.id))
        .then((deleted) => {
            if(deleted) dispatch(removeSong(song.id));
        })
        setShowModal(false);
    }
    return (
        <>
        <Btn onClick={() => setShowModal(true)}><i className="far fa-trash-alt"></i>Delete</Btn>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              <ConfirmBox>
                  <h1>Delete Song</h1>
                  <p>Are you sure you want to delete song "{song.title}"? This action cannot be undone.</p>
                  <Btn onClick={() => setShowModal(false)}>Cancel</Btn>
                  <Btn onClick={handleDelete}>Delete</Btn>
              </ConfirmBox>
          </Modal>
        )}
      </>
    )
}
