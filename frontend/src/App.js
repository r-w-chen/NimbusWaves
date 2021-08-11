import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from './store/session';
import { fetchSongs } from './store/songs';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage/index.js'
import UploadFormPage from './components/UploadFormPage';
import UserProfilePage from './components/UserProfilePage';
import SingleSongPage from './components/SingleSongPage';
import Navigation from "./components/Navigation";
import PlayBar from './components/PlayBar';
import Footer from './components/Footer';
import { useAudio } from "./context/Audio";
function App() {
  // const {isPlaying} = useAudio();
  const [isLoaded, setIsLoaded] = useState(false)
  const {showPlayBar, setShowPlayBar} = useAudio(); //for later when i want to conditionally render playbar
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession()).then(() => dispatch(fetchSongs())).then(() => setIsLoaded(true));

  }, [dispatch]);

  return isLoaded && (
    <>
    <div className="page-container">
    {/* <div className="content-wrap"> */}
      <Navigation />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/discover">
          <HomePage />
        </Route>
        <Route path="/upload">
          <UploadFormPage />
        </Route>
        <Route exact path="/:userId">
          <UserProfilePage />
        </Route>
        <Route path="/:userId/:songId">
          <SingleSongPage />
        </Route>
      </Switch>
      {showPlayBar && <PlayBar hidePlayBar={() => setShowPlayBar(false)}/>}
    {/* </div> */}
    <Footer />
    </div>

    </>
  );
}

export default App;
