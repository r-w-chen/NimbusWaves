import { Route, Switch } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from './store/session';
import { fetchSongs } from './store/songs';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import UploadFormPage from './components/UploadFormPage';
import UserProfilePage from './components/UserProfilePage';
import SingleSongPage from './components/SingleSongPage';
import Navigation from "./components/Navigation";
import PlayBar from './components/PlayBar';
function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPlayBar, setShowPlayBar] = useState(false); //for later when i want to conditionally render playbar
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession()).then(() => dispatch(fetchSongs())).then(() => setIsLoaded(true));

  }, [dispatch]);

  //rendered slightly differently from example
  return isLoaded && (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <h1>Hello from App</h1>
        </Route>
        {/* <Route path="/login">
          <LoginFormPage />
        </Route> */}
        {/* <Route path="/signup">
          <SignupFormPage />
        </Route> */}
        <Route path="/upload">
          <UploadFormPage />
        </Route>
        <Route exact path="/:userId">
          <UserProfilePage />
        </Route>
        <Route path="/:userId/:songId">
          {/* render individual song page */}
          <SingleSongPage />
        </Route>
      </Switch>
      {showPlayBar && < PlayBar />}
    </>
  );
}

export default App;
