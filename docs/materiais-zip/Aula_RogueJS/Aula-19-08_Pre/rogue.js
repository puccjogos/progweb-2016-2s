function interpretarAcao() {
    "use strict";
    var input = "",
        verbo = "",
        objeto = "",
        posEspaco = 0,
        acao = {};
    input = document.getElementById('inputAcao').value;
    document.getElementById('inputAcao').value = "";
    console.log("input:  " + input);
    posEspaco = input.indexOf(" ");
    verbo = input.slice(0, posEspaco);
    objeto = input.slice(posEspaco + 1, input.length);
    acao = {
        verbo: verbo,
        objeto: objeto
    };
    return acao;
}