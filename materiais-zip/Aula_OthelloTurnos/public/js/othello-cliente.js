/*global Phaser, io*/
var telaInicio = {},
    game = new Phaser.Game(512, 512, Phaser.AUTO, 'jogo', telaInicio),
    tabuleiro = [],
    etapa = "",
    jogador = "",
    socket = {};
                           
telaInicio.preload = function () {
    "use strict";
    console.log("preload");
    game.load.spritesheet("pecas", "assets/pecas.png", 64, 64);
    
    socket = io();
    
    socket.on("novaPartida", function (data) {
        console.log("carregando nova partida");
        var pecaNova = {};
        etapa = data.etapa;
        jogador = data.jogador || "preta";
        tabuleiro = [];
        for (var c = 0; c < 8; c++) {
            tabuleiro[c] = [];
            for (var l = 0; l < 8; l++) {
                pecaNova = new Peca(c, l, data.tabuleiro[c][l].status);
                tabuleiro[c][l] = pecaNova;
            }
        }
        console.log(data.potenciais);
        if(data.etapa === jogador) {
            data.potenciais.forEach(function (peca) {
                tabuleiro[peca.c][peca.l].status = "potencial"; 
                tabuleiro[peca.c][peca.l].atualizarVisual();
            });
        }
    });
    
    socket.on("atualizarTabuleiro", function (data) {
        console.log("atualizando tabuleiro");
        etapa = data.etapa;
        for (var c = 0; c < 8; c++) {
            for (var l = 0; l < 8; l++) {
                tabuleiro[c][l].status = data.tabuleiro[c][l].status;
                tabuleiro[c][l].atualizarVisual();
            }
        }
        if(data.etapa === jogador) {
            data.potenciais.forEach(function (peca) {
                tabuleiro[peca.c][peca.l].status = "potencial"; 
                tabuleiro[peca.c][peca.l].atualizarVisual();
            });
        }
    });
};

telaInicio.create = function () {
    "use strict";
};

telaInicio.update = function () {
    "use strict";    
};

/* Pecas */
function Peca(c, l, status) {
    "use strict";
    this.c = c;
    this.l = l;
    this.status = status || "nada";
    this.sprite = game.add.sprite(c * 64, l * 64, "pecas");
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.clique, this);
    this.atualizarVisual();
}

Peca.prototype.atualizarVisual = function () {
    switch(this.status) {
        case "nada" : this.sprite.frame = 0; break;
        case "potencial" : this.sprite.frame = 1; break;
        case "preta" : this.sprite.frame = 2; break;
        case "branca" : this.sprite.frame = 3; break;
    }
}

Peca.prototype.clique = function () {
    console.log(this);
    if(etapa == jogador && this.status == "potencial"){
        this.status = jogador;
        this.atualizarVisual();
        AvancarEtapa(this.c, this.l);
    }
}

/* Etapas */
function AvancarEtapa(c, l) {
    socket.emit("turno", {etapa: jogador, c: c, l: l });
    switch(etapa){
        case "preta" : etapa = "aguardarBranca"; console.log(etapa); jogador = "branca"; break;
        case "branca" : etapa = "aguardarPreta"; console.log(etapa); jogador = "preta"; break;
    }
}





