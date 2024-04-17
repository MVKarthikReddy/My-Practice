const express = require('express')
const http = require('http')
const {Server} = require('socket.io')



const app = express()

const server = http.createServer(app)

port = 3000

app.use(express.static('./public'))

//socket.io
const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('user-message',(message) => {
        console.log(`A new message from user ${socket.id} : `,message)
    })
})

app.get('/', (req,res) => {
    return res.sendFile('./public/index.html')
})

server.listen(port,() => {
    console.log(`server is running on ${port}`);
})