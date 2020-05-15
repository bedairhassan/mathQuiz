// TODO: server.js // student
// TODO: server2.js // teacher

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

var questionsSolution = [

    {questionId:12,solution:`A`}    ,
    {questionId:13,solution:`B`}  
]

//    {src,questionsId,solutionSubmit}
var studentSubmits = []

// var exams = [{questions,description},{questions,description}]

var questions = [

    // {tilte,choices}
    {questionId:12,title:`What is 5+3?`,choices:[

        {key:`A`,potentialAnswer:8},
        {key:`B`,potentialAnswer:9},
        {key:`C`,potentialAnswer:10},
        {key:`D`,potentialAnswer:12}
    ]},
    {questionId:13,title:`What is 6+10?`,choices:[

        {key:`A`,potentialAnswer:12},
        {key:`B`,potentialAnswer:16},
        {key:`C`,potentialAnswer:22},
        {key:`D`,potentialAnswer:33}
    ]}
]

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
    
    socket.emit(`fetch`,questions)
    socket.on(`submit`,obj=> {

        const found = studentSubmits.filter(question=>
            question.src===obj.src 
            && question.questionId==obj.questionId)[0]

            // CONTINUE: write the logic of not having repeated records in user submits unless it is console logging

        console.log(new Date(),`found`,found)
        
        studentSubmits.push(obj)
        console.log(new Date(),`studentSubmits`,studentSubmits)
    } )

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
