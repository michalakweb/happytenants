import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomNav = () => (
    <div>
        <Row className='endRow text-center pt-2'>
            <Col>
            <FontAwesomeIcon icon="stroopwafel" />
                <Link to='/buyingList'>
                    <p className='mb-1'>
                        <i className="fas fa-clipboard-list fa-2x"></i>
                    </p>
                    <p className='mb-1 p--nav'>Todo</p>
                </Link>
            </Col>
            <Col xs={1}>
                <div className="vl"></div>
            </Col>    
            <Col>
                <Link to='/'>
                    <p className='mb-1'>
                        <i className="fas fa-broom fa-2x"></i>
                    </p>
                    <p className='mb-1 p--nav'>Chores</p>
                </Link>
            </Col>
        </Row>
    </div>
);

export default BottomNav;