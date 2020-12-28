const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
var sms = [];
// Socket 
const io = require('socket.io')(http)
var cont = 0;
io.on('connection', (socket) => {
    console.log('Connected...')
    cont = cont + 1;
    console.log(cont)
    socket.broadcast.emit('login', cont)
    socket.emit('login', cont, sms);
    socket.on('message', (msg) => {
        sms.push(msg);
        socket.broadcast.emit('message', msg)
    })
    socket.on('connect', function() {
        console.log("connected from the client side");
    });
    socket.on('disconnect', () => {
        cont = cont - 1;
        console.log(cont)
        socket.broadcast.emit('logout', cont)
    });

});
