import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Credentials } from 'realm-web'
import { app } from '../index'
import { debounce } from 'lodash'
import useAdvise  from '../hooks/useAdvise/useAdvise'
import Button from '../components/Button/Button'
import classes from './LoginPage.module.css'

const Page = () => {
    const [ usr, setUsr ] = useState(null)
    const [ pwd, setPwd ] = useState(null)
    const [ btnBlocked, setBtnBlocked ] = useState(true)

    const navigate = useNavigate()
    const {adviseComponent, setShowAdvise, setAdviseMsg, setLoading} = useAdvise()

    useEffect(()=>{
        const userFilled = usr && usr!==''    
        const pwdFilled = pwd && pwd!==''
        
        if (userFilled && pwdFilled){
            setBtnBlocked(false)
            return
        }

        setBtnBlocked(true)

    }, [usr, pwd])

    const updateUsr = debounce(setUsr, 300)
    const updatePwd = debounce(setPwd, 300)

    const login = async () => {
        setLoading(true)
        setShowAdvise(true)

        try{
            const user = await app.logIn(Credentials.emailPassword(usr, pwd))
            setLoading(false)
            setShowAdvise(false)
            navigate("../main")
        }
        catch (e) {
            setLoading( false )
            setAdviseMsg( `Login Failed: ${e}` )
        }
    }

    return (
        <React.Fragment>
            {adviseComponent}

            <div className={classes.Page}>

                <h1>Bus Drivers Schedule</h1>
                <h2>Login</h2>

                <div className={classes.LoginBox}>

                    <div className={classes.InputBox}>
                        <input type='text' placeholder='username...' onChange={(e)=>{updateUsr(e.target.value)}}/>
                        <input type='password' placeholder='password...'onChange={(e)=>{updatePwd(e.target.value)}}/>
                    </div>

                    <Button clicked={login} disabled={btnBlocked}>Login</Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Page;