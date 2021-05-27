import React from 'react'
import styled from 'styled-components';
import EditUserModal from './EditUserModal';
const ProfileNav = styled.nav`
    padding: 5px;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
`;

export default function ProfileNavigation({user, renderEdit}) {
    return (
        <ProfileNav>
            <a className="profile-navlink">All Songs</a>
            {renderEdit && <EditUserModal user={user}/>}
        </ProfileNav>
    )
}
