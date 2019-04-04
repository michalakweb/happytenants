import React from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => (
    <div>
        <h1>Welcome to the dashboard</h1>
        <Link to='/counter'>Go to counter</Link>
    </div>
);

export default Dashboard;