import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from './store/session';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import UploadFormPage from './components/UploadFormPage';
import Navigation from "./components/Navigation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession()).then(() => setIsLoaded(true));
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
      </Switch>
    </>
  );
}

export default App;
