import React, { useEffect, useState } from 'react'


var socket = require('socket.io-client')('http://localhost:4000');


function App() {

  const disconnect = () => socket.emit(`disconnect`, { src: socket.id })
  useEffect(() => window.addEventListener('beforeunload', () => disconnect()), [])

  const [message, setMessage] = useState(``)
  const helloWorld = () => socket.on(`helloWorld`, message => setMessage(message))
  useEffect(() => helloWorld(), [])


  const Log = ()=> socket.on(`users`,users=>console.table(users))
  useEffect(()=>Log(),[])

  return (

    <div>
      <h1>This is App.</h1>
      validate correct repo
      <h2>message: {message}</h2>
    </div>
  )
}

export default App
