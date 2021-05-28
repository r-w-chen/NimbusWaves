import React, { useContext, useState } from 'react';
import './Modal.css';

const LoginSignupContext = React.createContext();

export function LoginSignupProvider({ children }) {
    const [currentModal, setCurrentModal] = useState('');

    return (
      <>
        <LoginSignupContext.Provider value={{currentModal, setCurrentModal}}>
          {children}
        </LoginSignupContext.Provider>
      </>
    );
  }
  
export const useLoginSignup = () => useContext(LoginSignupContext);
