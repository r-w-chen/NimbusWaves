import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchUserProfile } from '../../store/currentProfile';
import { Modal } from '../../context/Modal';
import { Btn, LoginInput, LoginBtn } from '../styled-components/index';

export default function EditUserModal({user}) {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(user.username)
    const [profileImg, setProfileImg] = useState(null);
    const [coverImg, setCoverImg] = useState(null);
    const dispatch = useDispatch();

    // *** have coverImg and profileImg uploaded separately instead
    const handleProfileImg = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        if(file) setProfileImg(file);
        // console.log(profileImg);
    }

    const handleCoverImg = (e) => {
        const file = e.target.files[0];
        if(file) setCoverImg(file);

    }

    const handleUserEdit = (e) => {
        e.preventDefault();
        const editedUser = {
            id: user.id,
            username,
            profileImg,
            coverImg
        }
        dispatch(patchUserProfile(editedUser));
        setShowModal(false);
    }

    return (
        <>
        <Btn onClick={() => setShowModal(true)} style={{alignSelf: 'center'}}><i className="fas fa-pen" style={{marginRight: '5px'}}/> Edit Profile</Btn>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              <form className="edit-form-container" onSubmit={handleUserEdit}>
                  <div className="edit-header">
                      <h1 >Edit Profile</h1>
                  </div>
                  <label className="edit-label" >
                  Display name
                  <LoginInput
                    style={{display: 'block', width:'100%'}}
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </label>
                <input type="file" name="file" id="file" className="profile-img-input" onChange={handleProfileImg}/>
                <label htmlFor="file"><i className="fas fa-camera" /> Choose Profile Photo</label>
                <input type="file" name="file2" id="file2" className="profile-img-input" onChange={handleCoverImg}/>
                <label htmlFor="file2"><i className="fas fa-camera" /> Choose Cover Photo</label>
                <LoginBtn>Save changes</LoginBtn>
              </form>
          </Modal>
        )}
      </>
    )
}
