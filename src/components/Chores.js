import React from 'react';
import { Link } from "react-router-dom";

// Moment
import moment from 'moment';
import 'moment/locale/pl';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../style.scss';

// Setting the locale to pl, to have Monday as first day of the week
moment.locale('pl')

// weekly time sets for dispatching chores
let set1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52];
let set2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50];
let set3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51];

class Dashboard extends React.Component {
    state = {
        people: ['Kamil', 'Kasia', 'Mateusz'],
        // week fetches the current week number (eg. 1 out of 52)
        week: Number(moment().format('w')),
    }

    render() {
        return (
            <div>
                <Container className='container container--main text-center'>
                    <Row>
                        <Col className='px-0 mb-4'>
                            <h1 className="display-4 py-4 header">This weeks's cleaning:</h1>
                        </Col>
                    </Row>
                    <Container className='container--list'>
                        <Row className='py-5'>
                            <Col xs={5}>
                                <i className="fas fa-utensils fa-3x"></i>
                                
                            </Col>
                            <Col className='align-self-center'>
                                <p className='h2'> 
                                    {
                                    set1.includes(this.state.week) ? this.state.people[0] : 
                                    (set3.includes(this.state.week) ? this.state.people[1] : this.state.people[2])
                                    }
                                </p>
                            </Col>
                        </Row>
                        <Row className='py-5'>
                            <Col xs={5} className=''>
                                <i className="fas fa-bath fa-2x px-2"></i>
                                <i className="fas fa-broom fa-2x px-2"></i>
                            </Col>
                            <Col className='align-self-center'>
                                <p className='h2'>
                                    {
                                        set2.includes(this.state.week) ? this.state.people[0] : 
                                        (set1.includes(this.state.week) ? this.state.people[1] : this.state.people[2])
                                    }
                                </p>
                            </Col>
                        </Row>
                    </Container>
                   
                    <Row className='endRow text-center pt-2'>
                        <Col>
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
                </Container>
            </div>
        );
    }
}

    

export default Dashboard;