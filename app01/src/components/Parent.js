import React, { useState, useEffect } from 'react'
import Questions from '../components/Questions'

function Parent({ socket }) {

    return (
        <React.Fragment>
            <Questions socket={socket} />
        </React.Fragment>
    )
}

export default Parent
