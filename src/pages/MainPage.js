import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../index'
import Button from '../components/Button/Button';
import useAdvise from '../hooks/useAdvise/useAdvise';
import BarChart from '../components/BarChart/BarChart';
import Cruiser from '../components/Cruiser/Cruiser'

import classes from './MainPage.module.css'

const MainPage = () => {
    const navigate = useNavigate()
    if(!app.currentUser){
        navigate("/")
    }

    const [ from, setFrom ] = useState('2022-01-01T00:00')
    const [ to, setTo ] = useState('2022-01-07T23:59')
    const [ drivers, setDrivers ] = useState(1)
    const [ btnBlocked, setBtnBlocked ] = useState(true)
    const [ score, setScore ] = useState(null)
    const [ fetching, setFetching ] = useState(false)

    const {adviseComponent, setShowAdvise, setAdviseMsg, setLoading} = useAdvise()

    useEffect(()=>{
        const fromFilled = from && !isNaN( Date.parse(from) )
        const toFilled = to && !isNaN( Date.parse(to) )
        const driversFilled = drivers && drivers >= 1
        
        if (fromFilled && toFilled && driversFilled){
            setBtnBlocked(false)
            return
        }

        setBtnBlocked(true)

    }, [from, to, drivers])

    const getScore = async () => {
        setFetching(true)
        setLoading(true)
        setShowAdvise(true)
        try {
            const score = await app.currentUser.functions.getScore({from:from, to:to, ndrivers:drivers})
            setFetching(false)
            setLoading(false)
            setShowAdvise(false)
            setScore(score)
        }
        catch(e){
            setLoading(false)
            setAdviseMsg( `Fetching data failed: ${e}` )
            setFetching(false)
        }
    }

    return (
        <React.Fragment>
            {adviseComponent}
            <Cruiser />
            <div className={classes.MainPage}>
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
                        <label htmlFor='nDrivers'>Number of drivers</label>
                        <input id='nDrivers' type='number' defaultValue={drivers} onChange={(e)=>{setDrivers(e.target.value)}}/>
                    </div>
                    <div>
                        <Button clicked={getScore} disabled={btnBlocked}>Go</Button>
                    </div>
                    
                </div>
                <div className={classes.ChartContainer}>
                    <BarChart scoreData={score}/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainPage;