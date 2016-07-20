## O que é o [Node.js](https://nodejs.org/en/)?

É uma plataforma para executar aplicações em JavaScript que faz uso da máquina virtual V8 (a mesma do Google Chrome) para compilar JavaScript em linguagem de máquina, o que aumenta muito sua performance. A plataforma Node.js foi criada para uso em aplicações com uso intensivo de dados e comunicação em tempo real. Por isso, é cada vez mais usada em games e aplicativos web de colaboração e streaming. Por ser escrita toda em JS, a plataforma Node foi criada conta com as seguintes vantagens:

- Permitir a criação de aplicações web com uma stack em uma única linguagem.
- Permitir o uso nativo de JSON, um formato bastante popular para troca de dados.
- JavaScript é uma linguagem final, ou seja, outras linguagens compilam para JavaScript.

Abaixo vamos discutir alguns dos aspectos mais relevantes do Node.js para seu uso no desenvolvimento de aplicações web (e jogos).

### Plataforma event-driven e assíncrona

O Node, assim como browsers, tem uma arquitetura baseada no uso de eventos de forma assíncrona, ou seja, tem um loop de eventos como forma de comunicação entre funções e não bloqueiam a execução quando realizando operações de entrada e saída (I/O).

![Diagrama de fluxo no Node.js]()

Aqui vemos um exemplo de eventos e assincronia no browser.

```JavaScript
// usando a biblioteca jQuery
$.post('/resource.json', function (data) {
    console.log(data)
})
```

Já em uma aplicação Node no servidor, seria:

```JavaScript
var fs = require("fs")
fs.readFile("./resource.json", function (err, data) {
    console.log(data)
})
```

### A aplicação é o servidor

Em Node, uma aplicação cria seu próprio servidor (ou mais de um) para lidar com as requisições que recebe dos clientes que se conectarem a ela. Isso é particularmente poderoso no caso de aplicações que trabalham tanto com a entrega de arquivos estáticos através de [HTTP](https://pt.wikipedia.org/wiki/Hypertext_Transfer_Protocol) ou com eventos reais através de [WebSockets](https://pt.wikipedia.org/wiki/WebSocket), ou mesmo no caso de outros protocolos. Aqui está um exemplo de uma aplicação que cria um servidor que responde a qualquer request com um mesmo texto.

```JavaScript
var http = require('http') // carregamento de modulo
var server = http.createServer()
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World\n')
})
server.listen(3000)
console.log('Server running at http://localhost:3000/')
```

## Exercício

Para ter um primeiro contato com o ambiente do Node.js, vamos criar um aplicativo de chat em tempo real. Vamos utilizar alguns módulos externos (**socket.io** e **express**). Neste projeto vamos conhecer mais sobre como:

1. Como importar módulos externos através do *NPM*
1. Enviar arquivos estáticos para o cliente (CSS, JS, HTML)
2. Tratar mensagens no servidor com [socket.io](http://socket.io/)
3. Tratar mensagens no cliente com [socket.io](http://socket.io/)
