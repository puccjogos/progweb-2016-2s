/*global console*/
var io = {};

io.registrar = function (msg) {
    "use strict";
    var elementoMsg = document.createElement("p");
    elementoMsg.textContent = msg;
    document.getElementById("historico").appendChild(elementoMsg);
};

io.interpretarAcao = function () {
    "use strict";
    var input = "",
        verbo = "",
        alvo = "",
        posEspaco = 0,
        acao = {};
    input = document.getElementById('inputAcao').value;
    document.getElementById('inputAcao').value = "";
    console.log("input:  " + input);
    posEspaco = input.indexOf(" ");
    verbo = input.slice(0, posEspaco);
    alvo = input.slice(posEspaco + 1, input.length);
    acao = {
        verbo: verbo,
        alvo: alvo
    };
    console.log(acao);
    return acao;
};

var rogue = {};

rogue.Jogador = function () {
    "use strict";
    this.ataque = 10;
    this.defesa = 9;
    this.esquiva = 8;
    this.concentracao = 0;
    this.vida = 10;
    this.poderes = [];
    this.sala = "";
};

rogue.Sala = function (nome, msg, inimigos, conexoes) {
    "use strict";
    this.nome = nome;
    this.msg = msg;
    this.inimigos = inimigos;
    this.conexoes = conexoes;
};

rogue.acoes = {};

rogue.acoes = {
    olhar : function (acao) {
        "use strict";
        if (acao.alvo === "" || acao.alvo === "sala") {
           // TODO var salaAtual = rogue.player;
            console.log("puxar sala com esse nome");
        }
    }
};

rogue.inicializar = function () {
    "use strict";
    var novaSala = {};
    console.log("Inicializando Rogue...");
    rogue.player = new rogue.Jogador();
    console.log(rogue.player);
    io.registrar("Você está numa dungeon escura. Sozinho.");
    rogue.mapa =  [];
    novaSala = new rogue.Sala("Portão de entrada", "Um portão meio quebrado, com marcas de arranhões e ferrugem.", [], []);
    rogue.mapa.push(novaSala);
    rogue.player.sala = rogue.mapa[0].nome;
};





















