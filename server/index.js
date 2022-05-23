const express = require("express");
//This variable will require the express dependency
const app = express();
//Instance of express function
const http = require("http");
//Variable for HTTP Library of Express to build server on Socket.IO
const cors = require("cors");
//Requires the Cors library (Socket.IO deals with alot of CORS Issues)
const { Server }= require("socket.io")

const server = http.createServer(app) //Server will use the HTTP Library and CreateServer function.
//Express app will generate server for us
app.use(cors()); //App will use CORS Middleware
//new Instance of server class from Socket Io
const io = new Server(server, {
//resolves CORS Issues
cors: {
    origin: "http://localhost:3000", //Socket.io - it is okay to accept communication with this URL
    methods: ["GET", "POST"], //Specified methods that are allowed
},
}
)

//Listening for events in our Socket.IO Server

io.on("connection", (socket) => {
      //User Connections
    console.log('User Connected', socket.id);

    //User Disconnect
    socket.on("disconnect", () => {
        console.log('User Disconnected', socket.id)
    })

    //Join Room
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    //Send Message
    socket.on("send_message", (data) => {
       console.log(data)
       socket.to(data.room).emit("receive_message", data)
    })



}) //Listening for an event with this ID

//Listens for the port 3001
server.listen(3001, () => {
console.log('SERVER RUNNING')
//When server runs, it will console.log the message "Server Running"
}
)

