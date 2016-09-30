/*global node*/
var express = require('express');
var app = express();
var servidor = require('http').Server(app);
var io = require('socket.io')(servidor);

/*
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
*/

// servidor de arquivos estáticos
app.use(express.static(__dirname + '/public'));

// nova conexao
io.on('connection', function (socket) {
    "use strict";
    console.log('novo usuario conectou');


    socket.on('msg-chat', function (msg) {
        console.log('msg: ' + msg);
        io.emit('msg-chat-servidor', msg);
    });

    // usuario desconectou
    socket.on('disconnect', function () {
        console.log('usuario desconectou');
    });
});

//manda o servidor rodar eum uma determinada porta
servidor.listen(3000, function () {
    "use strict";
    console.log('listening on *:3000');
});