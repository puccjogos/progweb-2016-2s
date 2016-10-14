/*global node*/
var express = require('express');
var app = express();
var servidor = require('http').Server(app);
var io = require('socket.io')(servidor);

var partidas = {};
var direcoes = [
    { c: 0, l: 1 },
    { c: 1, l: 1 },
    { c: -1, l: 1 },
    { c: 1, l: 0 },
    { c: -1, l: 0 },
    { c: -1, l: -1 },
    { c: 0, l: -1 },
    { c: 1, l: -1 }
];

// servidor de arquivos estáticos
app.use(express.static(__dirname + '/public'));

// nova conexao
io.on('connection', function (socket) {
    "use strict";
    console.log('novo jogador');
    
    if (partidas[socket.id] === undefined) {
        partidas[socket.id] = {};
        partidas[socket.id].tabuleiro = [];
    }
    var pecaNova = {};
    console.log("criar partida");
    for (var c = 0; c < 8; c++) {
        partidas[socket.id].tabuleiro[c] = [];
        for (var l = 0; l < 8; l++) {
            pecaNova = new Peca(c, l);
            partidas[socket.id].tabuleiro[c][l] = pecaNova;
        }
    }
    partidas[socket.id].tabuleiro[3][3].status = "branca";
    partidas[socket.id].tabuleiro[4][3].status = "preta";
    partidas[socket.id].tabuleiro[3][4].status = "preta";
    partidas[socket.id].tabuleiro[4][4].status = "branca";
    partidas[socket.id].etapa = "preta";
    AtualizarTabuleiro(partidas[socket.id], false);
    socket.emit("novaPartida", partidas[socket.id]);
    
    // recebeu novo turno
    socket.on("turno", function (data) {
        partidas[socket.id].tabuleiro[data.c][data.l].status = data.etapa;
        AtualizarTurno({c: data.c, l: data.l}, partidas[socket.id], true);
        AvancarEtapa(partidas[socket.id]);
        AtualizarTabuleiro(partidas[socket.id], false);
        socket.emit("atualizarTabuleiro", partidas[socket.id]);
    });

    // usuario desconectou
    socket.on('disconnect', function () {
        console.log('usuario desconectou');
        delete partidas[socket.id];
    });
});

//manda o servidor rodar eum uma determinada porta
servidor.listen(3000, function () {
    "use strict";
    console.log('servidor rodando em *:3000');
});

/* Peca */
function Peca(c, l, status) {
    "use strict";
    this.c = c;
    this.l = l;
    this.status = status || "nada";
}

/* processamentos */
function AtualizarTurno (casa, partida, alterar) {
    var procurada = (partida.etapa === "branca")? "preta" : "branca",
        sequencia = [],
        potenciais = [],
        mudancas = [];
    direcoes.forEach(function (direcao) {
        sequencia = [];
        ProcurarSequencia({ c: casa.c, l: casa.l}, partida.tabuleiro, sequencia, procurada, direcao, potenciais, mudancas);
    });
    if (alterar) {
        ProcessarMudancas(mudancas, partida.etapa);    
    }
    partida.potenciais = potenciais;
    partida.mudancas = mudancas;
}

function AtualizarTabuleiro (partida, alterar) {
    var procurada = (partida.etapa === "branca")? "preta" : "branca",
        sequencia = [],
        potenciais = [],
        mudancas = [];
    for (var c = 0; c < 8; c++) {
        for (var l = 0; l < 8; l++) {
            if(partida.tabuleiro[c][l].status === partida.etapa) {
                direcoes.forEach(function (direcao) {
                    sequencia = [];
                    ProcurarSequencia({ c: c, l: l}, partida.tabuleiro, sequencia, procurada, direcao, potenciais, mudancas);
                });
            }
        }
    }
    if (alterar) {
        ProcessarMudancas(mudancas, partida.etapa);    
    }
    partida.potenciais = potenciais;
    partida.mudancas = mudancas;
}

function ProcurarSequencia (inicio, tabuleiro, sequencia, procurada, direcao, potenciais, mudancas) {
    var nc = inicio.c + direcao.c,
        nl = inicio.l + direcao.l;
    // checagem de limites do tabuleiro
    if(nc < 0 || nc > 7 || nl < 0 || nl > 7) {
        // anula a sequencia potencial
        sequencia = [];
        return;
    }
    // se chegou numa casa vazia
    if(tabuleiro[nc][nl].status === "nada") {
        // se está logo ao lado do inicio da sequencia
        if (sequencia.length === 0) {
            return;
        }
        // se não, é uma casa em potencial
        potenciais.push(tabuleiro[nc][nl]);
        return;
    }
    // se é da cor desejada
    if(tabuleiro[nc][nl].status === procurada) {
        sequencia.push(tabuleiro[nc][nl]);
        ProcurarSequencia({c: nc, l: nl}, tabuleiro, sequencia, procurada, direcao, potenciais, mudancas);
        return;
    }
    // se é da mesma cor que jogador
    if (sequencia.length > 0) {
        sequencia.forEach(function (peca) {
            mudancas.push(peca);
        });
    }
    return;
}

function ProcessarMudancas (mudancas, etapa) {
    mudancas.forEach(function (casa) {
        casa.status = etapa;
    });
}

function AvancarEtapa (partida) {
    switch (partida.etapa) {
        case "preta" : partida.etapa = "branca"; break;
        case "branca" : partida.etapa = "preta"; break;
    }
}
