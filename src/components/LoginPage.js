import React from 'react';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, uiConfig} from '../firebase/firebase';
import 'firebase/auth';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../style.scss';


const LoginPage = () => (
    <div>
        <Container fluid className='container--login d-flex align-items-center'>
            <Row className='d-flex w-100'>
                <Col >
                    <h1 className='align-self-center text-center mb-5 container--login_h1'>Happy Tenants</h1>
                    <div className="d-flex justify-content-center pt-4 mb-3 w-100">
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
);

export default LoginPage;