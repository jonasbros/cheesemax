import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase.config'
//components
import SignInPage from './components/SignInPage'
import Dashboard from './components/Dashboard'

function App() {
    const [user] = useAuthState(auth)

    return (
        <>
            {user ? <Dashboard /> : <SignInPage />}
        </>
    );
}

export default App;
