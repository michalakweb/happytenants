import React from 'react';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, uiConfig} from '../firebase/firebase';
import 'firebase/auth';


const LoginPage = () => (
    <div>
        Login page
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> 
    </div>
);

export default LoginPage;