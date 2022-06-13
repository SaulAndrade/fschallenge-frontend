import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import useAdvise from '../hooks/useAdvise/useAdvise';
import Table from '../components/Table/Table'
import Cruiser from '../components/Cruiser/Cruiser';
import { app } from '../index'

import classes from './SecondPage.module.css'

const SecondPage = () => {

    const navigate = useNavigate()
    if(!app.currentUser){
        navigate("/")
    }

    const [ from, setFrom ] = useState('2022-01-01T00:00')
    const [ to, setTo ] = useState('2022-01-07T23:59')
    const [ btnBlocked, setBtnBlocked ] = useState(true)
    const [ scheduleData, setScheduleData ] = useState(null)

    const {adviseComponent, setShowAdvise, setAdviseMsg, setLoading} = useAdvise()

    useEffect(()=>{
        const fromFilled = from && !isNaN( Date.parse(from) )
        const toFilled = to && !isNaN( Date.parse(to) )
        
        if (fromFilled && toFilled){
            setBtnBlocked(false)
            return
        }

        setBtnBlocked(true)

    }, [from, to])

    const getSchedules = async () => {
        setLoading(true)
        setShowAdvise(true)
        try {
            const schData = await app.currentUser.functions.getSchedules({from:from, to:to})
            setLoading(false)
            setShowAdvise(false)
            setScheduleData(schData)
        }
        catch(e){
            setAdviseMsg( `Fetching data failed: ${e}` )
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            {adviseComponent}
            <Cruiser />
            <div className={classes.SecondPage}>
                <div className={classes.FiltersContainer}>
                    <div>
                        <label htmlFor='From'>From</label>
                        <input id='From' type='datetime-local' min='2022-01-01T00:00' max='2022-03-31T23:59' defaultValue={from} onChange={(e)=>{setFrom(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor='To'>To</label>
                        <input id='To' type='datetime-local' min='2022-01-01T00:00' max='2022-03-31T23:59' defaultValue={to} onChange={(e)=>{setTo(e.target.value)}}/>
                    </div>
                    <div>
                        <Button clicked={getSchedules} disabled={btnBlocked}>Go</Button>
                    </div>
                    
                </div>
                <div className={classes.TableContainer}>
                    {scheduleData ? <Table schData={scheduleData}/> : null}
                </div>
            </div>
        </React.Fragment>
    );
};

export default SecondPage;