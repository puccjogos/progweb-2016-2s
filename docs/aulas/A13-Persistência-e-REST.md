Nesta aula, vamos conhecer como criar persistência em nossos jogos de forma simples e rápida usando Node.js e arquivos JSON. Também vamos começar a trabalhar com APIs REST.

### JSON

A primeira alternativa que vamos ver para a persistência de dados no servidor é o uso de arquivos JSON. É uma forma bastante básica, mas que pode ser a base para alternativas mais elaboradas posteriores, como o uso de bancos de dados **NoSQL**, como o [MongoDB](https://www.mongodb.org/).

Para ler e escrever arquivos, vamos usar o módulo `fs` do Node. Primeiro, vamos escrevê-los como arquivos de texto e depois, como JSON diretamente. O exemplo abaixo escreve o texto do arquivo diretamente.

```javascript
var fs = require("fs")

// leitura de arquivo
fs.readFile(
  "data/usuarios.json", // endereco
  "utf8", 		// encoding
  function(err, data){ 	// callback
    if(err){
      throw err
    }
    usuarios = JSON.parse(data)
  })

// escrita
fs.writeFile(
  "data/usuarios.json",		// endereco
  JSON.stringify(usuarios), 	// dados
  "utf8",			// encoding
  function(err) {		// callback
    if(err) {
        return console.log(err)
    }
    console.log("Usuarios.json foi salvo!")
  })
```

### REST APIs

APIs (*interfaces para programação de aplicações*) do tipo REST são um tipo de protocolo para a comunicação entre cliente e servidor. Seus principais diferenciais são:

+ Cada pedido é independente de outros e não exige que o servidor guarde dados entre pedidos (estado)
+ Interface padrão: comandos **GET** (buscar), **POST** (escrever), **PUT** (sobre-escrever), **DELETE** (apagar)
+ Uso de resultados e informações em formatos hipermídia / hipertexo: HMTL, XML, JSON
+ Sintaxe universal, através do uso de endereços URI (*Universal Resource Identifier*)

A arquitetura de API que segue esses princípios é bastante utilizada para serviços web, ou seja, como forma de acessar e escrever informações no banco de dados de serviços hospedados em servidores remotos e públicos. Assim, serviços web podem agregar valor ao permitir que outros serviços secundários integrem-se à sua rede. Por exemplo, jogos que se conectam ao Facebook para acessar os amigos de um usuário e realizar cross-promotion.

Para ter mais controle em relação a quem acessa as informações de seus banco de dados, é comum que provedores de serviços exijam que todo acesso à seus serviços sejam autenticados, ou seja, estejam associados a uma chave ou autorização em seu banco.

Como exemplo de implementação, vamos usar as ferramentas de routing do ExpressJS em Node (para o lado do backend) e as ferramentas de request da biblioteca jQuery (para o lado frontend).