'use strict';
const express = require('express');
const app = express();
const serv = require('http').Server(app);
let SOCKET_LIST = {};
let PLAYER_LIST = {};

var io = require('socket.io')(serv, {});

io.sockets.on('connection', (socket) => {
    console.log('socket connection');
    socket.emit('online');
    socket.on('namePlace',(data)=>{
        if(/^[0-9A-Za-z]+$/.test(data.nickName) && /^[0-9A-Za-z]+$/.test(data.place) ){
            socket.emit('alfaTime');
        }
    })
})



app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/client/index.html')
});
app.use('/',express.static(__dirname+'/client'));
console.log('server started');

serv.listen(4200);

