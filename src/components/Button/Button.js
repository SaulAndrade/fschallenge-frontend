import React from 'react';
import classes from './Button.module.css'

const Button = ({children, clicked, disabled}) => {

    const btnClasses = disabled ? [classes.Button, classes.Disabled] : [classes.Button]

    return (
        <button className={btnClasses.join(' ')} onClick={clicked} disabled={disabled}>{children}</button>
    );
};

export default Button;