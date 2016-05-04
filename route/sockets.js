module.exports = function(io){
  //var gpsData = {};
  io.on('connection',function(socket){
    console.log('one user connected ' + socket.id);
    //gpsData[socket.id] = {socket: socket};

    socket.on('searchTaxi',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'socket':socket.id, 'latitude':data.latitude, 'longitude':data.longitude, 'working':data.working };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('searchTaxi',paquet);
        }
      });
    });

    socket.on('preBook',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'tokenDriver':data.tokenDriver, 'tokenClient':data.tokenClient, 'fname':data.fname, 'latitude':data.latitude, 'longitude':data.longitude };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('preBook',paquet);
        }
      });
    });

    socket.on('validBook',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'latitude':data.latitude, 'longitude':data.longitude };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('validBook',paquet);
        }
      });
    });

    socket.on('postBook',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'latitude':data.latitude, 'longitude':data.longitude };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('postBook',paquet);
        }
      });
    });

    socket.on('drawRoute',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'originLatitude':data.originLatitude, 'originLongitude':data.originLongitude,
        'desLatitude':data.desLatitude, 'desLongitude':data.desLongitude };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('drawRoute',paquet);
        }
      });
    });

    socket.on('stopBook',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'stopBook':data.stopBook, 'tokenClient':data.tokenClient };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('stopBook',paquet);
        }
      });
    });

    socket.on('endCourse',function(data){
      //gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { '_id':data._id, 'pcourse':data.pcourse, 'ptake':data.ptake, 'preturn':data.preturn, 'token':data.token };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('endCourse',paquet);
        }
      });
    });

    socket.on('notify',function(data){
      var sockets = io.sockets.sockets;
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('notify',data);
        }
      });
    });

    socket.on('reclamation',function(data){
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'socket':socket.id, 'latitude':data.latitude, 'longitude':data.longitude, 'working':data.working };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('gps',paquet);
        }
      });
    });

    socket.on('disconnect',function(){
      console.log('one user disconnected ' + socket.id);

      var sockets = io.sockets.sockets;
      var paquet = { 'socket':socket.id, 'working':false };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('gps',paquet);
        }
      });
      //delete gpsData[socket.id];
    })
  });
}
