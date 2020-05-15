import React, { useEffect } from 'react'

export default function Key({socket,key}){


    return (

        <button onClick={()=>alert(`hi`)}>
            Key
            {key}
        </button>
    )
}