import React from 'react';
import BottomNav from './BottomNav';

// Moment
import moment from 'moment';
import 'moment/locale/pl';

// Bootstrap, styles, icons
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Setting the locale to pl, to have Monday as first day of the week
moment.locale('pl')

// Weekly time sets for dispatching chores.
// In this case there are 3 people in the house, but only two chores to do, so
// there is always a week when one person doesn't have to do anything.
let set1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52];
let set2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50];
let set3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51];

class Dashboard extends React.Component {
    state = {
        people: ['Kamil', 'Kasia', 'Mateusz'],
        // week fetches the current week number (eg. "1" out of 52)
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
                                <FontAwesomeIcon className='fontAwesomeIcon px-2' size='3x' icon="utensils" />
                                <FontAwesomeIcon className='fontAwesomeIcon px-2' size='3x' icon="trash-alt" />
                            </Col>
                            <Col className='align-self-center'>
                                <p className='h2'> 
                                    {/* set of if/else statements to determine who has to do the chores */}
                                    {
                                    set1.includes(this.state.week) ? this.state.people[0] : 
                                    (set3.includes(this.state.week) ? this.state.people[1] : this.state.people[2])
                                    }
                                </p>
                            </Col>
                        </Row>
                        <Row className='py-5'>
                            <Col xs={5} className=''>
                                <FontAwesomeIcon className='fontAwesomeIcon px-2' size='3x' icon="bath" />
                                <FontAwesomeIcon className='fontAwesomeIcon px-2' size='3x' icon="broom" />
                            </Col>
                            <Col className='align-self-center'>
                                <p className='h2'>
                                    {/* set of if/else statements to determine who has to do the chores */}
                                    {
                                    set2.includes(this.state.week) ? this.state.people[0] : 
                                    (set1.includes(this.state.week) ? this.state.people[1] : this.state.people[2])
                                    }
                                </p>
                            </Col>
                        </Row>
                    </Container>
                   
                    <BottomNav/>
                    
                </Container>
            </div>
        );
    }
}

    

export default Dashboard;