import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { app } from '../../index'

import classes from './Cruiser.module.css'

const Cruiser = () => {

    const navigate = useNavigate()
    
    const logout = async()=>{
        const userId = app.currentUser.id;
        await app.allUsers[userId].logOut();
        navigate("/")
    }

    return (
        <div className={classes.Cruiser}>
            <div>
                <Link to="/main">Main</Link>
                <Link to="/details">Details</Link>
            </div>
            <div className={classes.LogoutContainer}>
                <Button disabled={false} clicked={logout}>Logout</Button>
            </div>
        </div> 
    );
};

export default Cruiser;