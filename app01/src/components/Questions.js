import React, { useState, useEffect } from 'react'
import Question from './Question/Question.js'

const centerStyle= {
        margin: `auto`,
        width: `10%`,
        padding: `20px`,
}

export default function Questions({ socket }) {

    const [questions, setQuestions] = useState([])
    const Action = (questions)=>{

        setQuestions(questions)
        console.table(questions)
    }
    const FetchAllQuestions = () => socket.on(`fetch`, questions => Action([...questions]))
    useEffect(() => FetchAllQuestions(), [])

    return (

        <React.Fragment>

            <h1 style={centerStyle}>Questions</h1>
            {
                questions.map(question => <Question question={question} socket={socket} />)
            }

        </React.Fragment>

    )
}
