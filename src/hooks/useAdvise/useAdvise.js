import React, { useState } from 'react';
import Advise from '../../components/Advise/Advise';

const useAdvise = () => {
    const [ showAdvise, setShowAdvise ] = useState(false)
    const [ adviseMsg, setAdviseMsg ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const hideAdvise = () => {
        setShowAdvise(false)
    }

    const adviseComponent = React.createElement(Advise, {show:showAdvise, showSpinner:loading, hideAdvise:hideAdvise, children:adviseMsg})

    return {
        adviseComponent,
        setShowAdvise,
        setAdviseMsg,
        setLoading
    }
};

export default useAdvise;