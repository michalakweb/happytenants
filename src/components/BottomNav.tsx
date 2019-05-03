import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BottomNav: React.FunctionComponent = () => (
    <div>
        <Row className='endRow text-center pt-2'>
            <Col>
            
                <Link to='/list'>
                    <p className='mb-1'>
                        <FontAwesomeIcon className='fontAwesomeIcon' size='2x' icon="clipboard-list" />
                    </p>
                    <p className='mb-1 p--nav'>Todo</p>
                </Link>
            </Col>
            <Col xs={1}>
                <div className="vl"></div>
            </Col>    
            <Col>
                <Link to='/chores'>
                    <p className='mb-1'>
                        <FontAwesomeIcon className='fontAwesomeIcon' size='2x' icon="broom" />
                    </p>
                    <p className='mb-1 p--nav'>Chores</p>
                </Link>
            </Col>
        </Row>
    </div>
);

export default BottomNav;