import React from 'react'
import { SongImg, DefaultSongImg } from '../styled-components/index';

export default function HomeSongContainer({song}) {
    return (
        <div className="home-song-container">
            {song.songImgURL ? 
            <SongImg imgURL={song.songImgURL} className="home-song-img"/> 
            :<DefaultSongImg className="home-song-img"/>}
            <p className="home-song-title">{song.title}</p>
            <p className="home-song-user">{song.User.username}</p>
        </div>
    )
}
