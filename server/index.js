// npm run watch // runs nodemon
var express = require('express');
var socket = require('socket.io');

// import {mysocketid} from './events'
// import {mysocketid} from './events'

// App setup
var app = express();
var server = app.listen(4000, function () {
    console.log('listening for requests on port 4000,');
});

// Static files
// app.use(express.static('public'));

// Server Variables
var users = [] // {socketid,whocansendmefr}

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    // base code
    socket.emit(`helloWorld`,`hello world`)
    socket.emit(`users`,users)
    // base code, users.push
    console.log(new Date(),`users.push`,{src:socket.id})
    users.push({src:socket.id})
    //
    console.log(new Date(),`users`,users)
    
    // cheat sheet
    // io.emit(event, data)
    // socket.broadcast.to(target).emit(event, data)
    
    socket.on(`disconnect`, () => {

        for (let i = 0; i < users.length; i++) {

            if (users[i].src === socket.id) {
                
                users.splice(i, 1)
                break;
            }
        }

        socket.disconnect()
        
        console.log(new Date(), `users`, users)
        io.emit(`users`,users)
    })
});
