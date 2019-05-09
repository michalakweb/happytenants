import React from 'react';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, uiConfig} from '../firebase/firebase';
import 'firebase/auth';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import logo from '../img/logo.png';
import '../style.scss';


const LoginPage = () => (
    <div>
        <Container className='container--login'> 
            <Row className='row--login text-white'>
                <Col className='align-self-center col--login animated bounceInLeft'>
                    <img src={logo} alt='logo' className='logo animated pulse delay-2s slower' />
                    <h1 className='text-center container--login_h1'>Happy Tenants</h1>
                </Col>

                <Col className='align-self-end col--login mb-4'>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                </Col>
            </Row>
        </Container>
    </div>
);

export default LoginPage;