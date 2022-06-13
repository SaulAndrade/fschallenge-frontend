import React from 'react';
import ReactDOM from 'react-dom'
import classes from './Advise.module.css'
import Spinner from '../Spinner/Spinner';

const Advise = ({show, hideAdvise, showSpinner, children}) => {

    const adviseClasses = show ? [classes.Advise, classes.Open] : [classes.Advise]
    const content = showSpinner ? React.createElement(Spinner) : children

    return ReactDOM.createPortal(
        <div className={adviseClasses.join(' ')} onClick={hideAdvise}>

            <div className={classes.MessageBox}>
                {content}
            </div>
            
        </div>
    , document.getElementById('root'));
};

export default Advise;