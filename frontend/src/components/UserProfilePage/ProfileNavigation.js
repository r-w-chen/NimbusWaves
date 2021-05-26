import React from 'react'
import styled from 'styled-components';
// import { NavLink } from 'react-router-dom';

const ProfileNav = styled.nav`
    padding: 5px;
    border-bottom: 1px solid lightgray;
`;

export default function ProfileNavigation({user, renderEdit}) {
    return (
        <ProfileNav>
            <a className="profile-navlink">All Songs</a>
            {renderEdit && <button>Edit</button>}
        </ProfileNav>
    )
}
