const express=require('express')
const app=express()
const http=require('http')
server=http.createServer(app)
const PORT= process.env.PORT || 3000

server.listen(PORT, ()=> {
    console.log("Server Listening")
});
app.use(express.static(__dirname+"/public"))
app.get('/',(req,res) =>{
    res.sendFile(__dirname+"/index.html")
});

const io=require("socket.io")(server)
const users = {}
io.on('connection',(socket)=>{
    console.log("Connected")
    socket.on("message",(msg)=>{
        socket.broadcast.emit('message',msg)
    })
    socket.on('new-user', user_name => {
        users[socket.id]=user_name
        socket.broadcast.emit('user_connected',user_name)
      })
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      })
});



