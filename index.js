'use strict';
const
express         = require('express'),
http = require('http'),
app             = express(),
httpServer = http.Server(app);

let SOCKET_LIST = {};
let PLAYER_LIST = {};

//const ala = require('./sCode/controller.js');
const io = require('socket.io')(httpServer, {});

io.sockets.on('connection', (socket)=>{
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;


    socket.on('disconnect',()=>{
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    })

})

app.use(express.static(__dirname+'/'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
});

//ala(app);
app.listen(4203);
