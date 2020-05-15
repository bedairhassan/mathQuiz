import React, { useEffect } from 'react'
// import Key from './Key_depleted'

export default function Question({ question:{questionId,title,choices}, socket }) {

    const Submit = ({questionId,solutionSubmit})=>{

        const obj = {src:socket.id,solutionSubmit,questionId}
        console.table(obj)
        socket.emit(`submit`,obj)
    }

    return (
        <React.Fragment>
            <h1>{title}</h1>
            {
                choices.map(({ key, potentialAnswer }) =>
                    <li>

                        <button onClick={(e)=>Submit({
                            solutionSubmit: e.target.value,
                            questionId: questionId
                        })} value={key}>{key}</button>
                        {potentialAnswer}

                    </li>)
            }
        </React.Fragment>
    )
}
