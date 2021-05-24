import React from 'react'

export default function SongContainer({song, user}) {
    return (
        <div className="song-container">
            <img className="profile-song-img" src={song.songImgURL}></img>
            <div className="play-button-container">
                <i className="fas fa-play-circle fa-3x play-button"></i>
                <div className="song-title-container">
                    <h2>{user.username}</h2>
                    <h1>{song.title}</h1>
                </div>
            </div>
        </div>
    )
}
