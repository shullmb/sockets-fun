require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const layouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3001;

app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index');
})

const server = app.listen(port, () => {
    console.log('Running on ' + port);
});

const io = socket(server);

io.sockets.on("connection", (socket) => {
    console.log(socket.id);

    socket.on('send-chat', (data) => {
        console.log(`User ${socket.id} sent chat: ${data}`);
        io.emit('rec-chat',`${socket.id}: ${data}`);
    })

    socket.on('mouse', (data) => {
        socket.broadcast.emit('mouse', data);
    })

    socket.on('disconnect', () => {
        console.log('Client: ',socket.id,' disconnected.');
    })
})
