import React from 'react';
import { Link } from "react-router-dom";

import moment from 'moment';
import 'moment/locale/pl';
moment.locale('pl')


let kitchenPerson1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52];
let bathroomPerson1 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50];

let kitchenPerson2 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51]
let bathroomPerson2 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52];

class Dashboard extends React.Component {
    state = {
        people: ['Kamil', 'Kasia', 'Mateusz'],
        week: Number(moment().format('w')),
    }

    render() {
        return (
            <div>
                {}
                <h1>Welcome to the chores</h1>
                <div>
                    <p>Kuchnia: {
                        kitchenPerson1.includes(this.state.week) ? this.state.people[0] : 
                        (kitchenPerson2.includes(this.state.week) ? this.state.people[1] : this.state.people[2])
                    }</p>
                    <p>Łazienka: {
                        bathroomPerson1.includes(this.state.week) ? this.state.people[0] : 
                        (bathroomPerson2.includes(this.state.week) ? this.state.people[1] : this.state.people[2])
                    }</p>
                </div>
                <Link to='/buyingList'>Go to buying list</Link>
                <button onClick={this.handleUpdate}>click</button>
            </div>
        );
    }
}

    

export default Dashboard;