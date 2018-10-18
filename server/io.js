module.exports = (io) => {
  console.log("Socketio listening...");

  io.on('connection', function(socket){
      // console.log(`A user connected with id: ${socket.id}`);
      // console.log(socket.handshake.headers.cookie);    
//        socket.emit('message',{msg:"Holafromserverrr", timestamp: Date.now()});
      
      // socket.on('message', data => {
      //     console.log("Received message from client");
      //     console.log(data);
      //     socket.broadcast.emit('message', data);
      // })

      


      socket.on('room', function(room) {
        socket.join(room);
        io.sockets.in(room).emit('request buttons')
        console.log(`A user connected with id: ${socket.id} in ${room}`);

        socket.on('get buttons', data => {
          io.in(room).clients((error, buttons) => {
            if (error) throw error;
            console.log(`CLIENTS CONECTED IN ${room}:`)
            console.log(buttons); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
            io.sockets.in(room).emit('get buttons', buttons);
          }); 
        })

        socket.on('feedback', ({id, feedback}) =>{
          feedback === "success" ? socket.broadcast.to(id).emit('feedback', feedback)
          : socket.broadcast.in(room).emit('feedback', feedback)
        })

        socket.on('sequence', id => {
          console.log(id)
          socket.broadcast.in(room).emit('sequence', id);
        })

        socket.on('message', data => {
          console.log("Received message from client");
          console.log(data);
          console.log("the socket is in room")
          console.log(Object.keys(socket.rooms))
          socket.broadcast.in(room).emit('message', data);
        })
      });
  });

}