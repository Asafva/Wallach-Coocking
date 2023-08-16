import React, { useEffect } from 'react'
import Card from '../../Card/Card'
import './Mid.css'
import { userLoggedin } from '../../Global'

function Mid() {
    useEffect(() => {
        userLoggedin()
    }, [])
    return (
        <div className='grid'>
            <Card />
        </div>
    )
}

export default Mid