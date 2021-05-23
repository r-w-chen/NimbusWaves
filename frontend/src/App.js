import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from './store/session';
import { fetchSongs } from './store/songs';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import UploadFormPage from './components/UploadFormPage';
import UserProfilePage from './components/UserProfilePage';
import SingleSongPage from './components/SingleSongPage';
import Navigation from "./components/Navigation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
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
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/upload">
          <UploadFormPage />
        </Route>
        <Route path="/:user">
          <UserProfilePage />
        </Route>
        <Route path="/:username/:songId">
          {/* render individual song page */}
          <SingleSongPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
