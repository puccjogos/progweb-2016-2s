/*global console, document, $*/

var io = {};

io.comparar = function (string1, string2) {
    "use strict";
    return (string1.toUpperCase() === string2.toUpperCase());
};

io.registrar = function (msg) {
    "use strict";
    var elementoMsg = document.createElement("p");
    elementoMsg.textContent = msg;
    document.getElementById("historico").appendChild(elementoMsg);
    elementoMsg.scrollIntoView();
};

io.interpretarAcao = function (jogo) {
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
    if (posEspaco === -1) {
        verbo = input;
        alvo = "";
    } else {
        verbo = input.slice(0, posEspaco);
        alvo = input.slice(posEspaco + 1, input.length);
    }
    acao = {
        verbo: verbo,
        alvo: alvo
    };
    if (jogo.acoes.hasOwnProperty(acao.verbo)) {
        jogo.acoes[acao.verbo](acao.alvo);
    } else {
        io.registrar("Não entendi o que você quer fazer. Tente novamente.");
    }
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
    this.combate = false;
    this.etapaCombate = ""; // ACAO ou REACAO
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
    olhar : function (alvo) {
        "use strict";
        var inimigos = rogue.mapa[rogue.player.sala].inimigos;
        if (io.comparar(alvo, "") || io.comparar(alvo, "sala")) {
            io.registrar("Você olha ao seu redor. ");
            io.registrar(rogue.mapa[rogue.player.sala].nome + " - " + rogue.mapa[rogue.player.sala].msg);
            if (inimigos.length > 0) {
                io.registrar("Você vê: ");
                inimigos.map(function (inimigo) {
                    io.registrar("- " + rogue.inimigos[inimigo].nome);
                });
            }
        } else {
            inimigos.map(function (i) {
                if (io.comparar(i, alvo)) {
                    io.registrar("Você observa melhor seu inimigo. " + rogue.inimigos[i].nome + " : " + rogue.inimigos[i].descricao);
                }
            });
        }
    },
    ir : function (alvo) {
        "use strict";
        var indiceDirecao = -1,
            salaDesejada = "";
        switch (alvo.toUpperCase()) {
        case "NORTE":
            indiceDirecao = 0;
            break;
        case "LESTE":
            indiceDirecao = 1;
            break;
        case "SUL":
            indiceDirecao = 2;
            break;
        case "OESTE":
            indiceDirecao = 3;
            break;
        default:
            io.registrar("Você tentou ir numa direção inválida.");
            return;
        }
        salaDesejada = rogue.mapa[rogue.player.sala].conexoes[indiceDirecao] || "";
        if (rogue.mapa.hasOwnProperty(salaDesejada)) {
            rogue.player.sala = salaDesejada;
            io.registrar("Você foi para o " + alvo + ". Você está em: " + salaDesejada + ".");
        } else {
            io.registrar("Não é possível ir nessa direção.");
        }
    },
    atacar : function (alvo) {
        "use strict";
        var inimigos = rogue.mapa[rogue.player.sala].inimigos,
            dado = -1,
            dano = -1;
        if (inimigos.length === 0) {
            io.registrar("Não adianta atacar, não existem inimigos aqui.");
            return;
        }
        if (rogue.player.combate && rogue.player.etapaCombate === "REACAO") {
            io.registrar("Você não pode atacar em sua reação.");
            return;
        }
        inimigos.map(function (i) {
            console.log(i);
            if (io.comparar(i, alvo)) {
                rogue.player.combate = true;
                rogue.player.etapaCombate = "REACAO";
                io.registrar("Você ataca " + rogue.inimigos[i].nome + ". ");
                dado = Math.floor(Math.random() * 6);
                io.registrar("O seu ataque foi " + rogue.player.ataque + " (base) + " + dado + " (dado).");
                if (dado + rogue.player.ataque > rogue.inimigos[i].defesa) {
                    dano = (dado + rogue.player.ataque) - rogue.inimigos[i].defesa;
                    rogue.inimigos[i].vida -= dano;
                    io.registrar(rogue.inimigos[i].nome + "(defesa " + rogue.inimigos[i].defesa + ") sofreu " + dano + " de dano. Sua vida agora é " + rogue.inimigos[i].vida + ".");
                    if (rogue.inimigos[i].vida <= 0) {
                        io.registrar(rogue.inimigos[i].nome + " morreu."); rogue.mapa[rogue.player.sala].inimigos.splice(inimigos.indexOf(i), 1);
                        delete rogue.inimigos[i];
                        if (inimigos.length === 0) {
                            io.registrar("Você matou todos os inimigos desta sala.");
                            rogue.player.combate = false;
                            rogue.player.etapaCombate = "ACAO";
                        }
                    }
                }
            }
        });
    },
    concentrar : function (alvo) {
        if (rogue.player.combate === false || rogue.player.etapaCombate === "REACAO" || rogue.player.concentracao >= 3) {
            io.registrar("Não adianta se concentrar agora.");
            return;
        }
        rogue.player.concentracao += 1;
        io.registrar("Você se concentra e se sente mais forte.");
        rogue.player.etapaCombate = "REACAO";
        // passa a vez para inimigos
    }
};

rogue.inicializar = function () {
    "use strict";
    var novaSala = {};
    console.log("Inicializando Rogue...");
    rogue.player = new rogue.Jogador();
    io.registrar("Você está numa dungeon escura. Sozinho.");
    $.getJSON("data/salas.json", function (data) {
        rogue.mapa = data;
        rogue.player.sala = "Hall de entrada";
    });
    $.getJSON("data/inimigos.json", function (data) {
        rogue.inimigos = data;
    });
};







