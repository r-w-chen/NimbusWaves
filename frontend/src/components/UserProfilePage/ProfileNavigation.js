import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const ProfileNav = styled.nav`
    background: gray;
`;

export default function ProfileNavigation({user, renderEdit}) {
    return (
        <ProfileNav>
            <NavLink className="profile-navlink" to={`/${user}/popular-songs`}>Popular</NavLink>
            <NavLink className="profile-navlink" to={`/${user}/songs`}>Songs</NavLink>
            {/* *** have edit render a modal form to edit properties */}
            {renderEdit && <button>Edit</button>}
        </ProfileNav>
    )
}
