import React from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => (
    <div>
        <h1>Welcome to the chores</h1>
        <Link to='/buyingList'>Go to buying list</Link>
    </div>
);

export default Dashboard;