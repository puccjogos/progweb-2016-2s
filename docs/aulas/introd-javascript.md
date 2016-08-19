## Introdução ao JavaScript

Nesta aula, vamos aprofundar nosso contato com a linguagem JavaScript, nos familiarizando com sua sintaxe e aprendendo a fazer uso de alguns de seus conceitos centrais, como a orientação a objetos.

Nos exercícios, vamos utilizar fluxogramas pra representar algoritmos. [Neste PDF](https://github.com/progweb2sem2014/repodidatico/blob/master/Docs/Dicas_para_codificar_um_fluxograma.pdf?raw=true) você encontra dicas de como representar programas em fluxograma e como traduzir de uma forma para outra.

Para rodar exercícios e exemplos, vamos utilizar a ferramenta [Repl.it](http://repl.it/languages/JavaScript).


### Sintaxe

#### Tipos de dados básicos

Uma variável pode guardar tipos de informações diferentes durante a execução. Os tipos primitivos básicos são:

```js
number, boolean, string, object
```

#### Declaração de variáveis

Variáveis podem ser declaradas em qualquer lugar do código. Se forem declaradas dentro de uma função, serão locais a essa função. Variáveis não têm seu tipo declarado.

```js
var nome = “enric”;
var idade = 27;
var controle = true; // ou false
var x, y, z;
```

#### Operadores

+ Atribuição: =
+ Igualdade e desigualdade: == ou ===, !=
+ Operadores lógicos: &&, ||, !
+ Incremento e decremento: ++, +=, --, -=

#### Repetição

```js
while (condicao) { … }

do { …  } while (condicao); 

for (variavel = v_inicial; variavel <= condicao; variavel++) { …  }
```

#### Decisão / desvio de fluxo

```js
if (condicao) { … }

if (condicao) { … } else { … }

switch (variavel) { case valor1 : … break; case valor2 : … break; }
```

#### Funções e procedimentos

```js
function NomeFuncao (parametro1, parametro2) {
   return valor; // nao eh obrigatorio
}
```

#### Vetor

Vetores são dinâmicos e aceitam valores de vários tipos (heterogêneos).

```js
var Exemplo1 = [1, “bob”, true, 4, 5]; // declaração literal de vetor

var Exemplo2 = new Array (tamanho); // declaracao por objeto Array
```

---

### Orientação a objetos

A orientação a objetos é um paradigma de análise, projeto e programação de sistemas de software baseado na composição e interação entre diversas unidades chamadas de [objetos](http://javascriptissexy.com/javascript-objects-in-detail/). Na programação orientada a objetos, implementa-se um conjunto de classes ou protótipos que definem os objetos presentes. Cada classe determina o comportamento (definido nos métodos) e estados possíveis (atributos) de seus objetos, assim como o relacionamento com outros objetos.

```js
var foo = {one: 1, two: 2};
 
// bar.[[prototype]] = foo
var bar = Object.create( foo );
 
bar.three = 3;
 
bar.one; // 1
bar.two; // 2
bar.three; // 3
```

##### Classe

Classe representa um conjunto de objetos com características afins. Uma classe define o comportamento dos objetos através de seus métodos, e quais estados ele é capaz de manter através de seus atributos. *Exemplo de classe: Os seres humanos.* Em Javacript não temos classes nativas, mas através de [protótipos e criação de objetos](http://www.phpied.com/3-ways-to-define-a-javascript-class/) podemos simular sua funcionalidade.

Em Javascript, não utilizamos classes para representar objetos ou relações de herança. O conceito utilizado é o de [protótipos](http://en.wikipedia.org/wiki/Prototype-based_programming), no qual esse tipo de relação é representado através da **clonagem** de objetos já existentes e da **delegação** de acesso a membros a partir do objeto-fliho até o objeto-pai com o membro procurado. Para mais detalhes do funcionamento de protótipos em Javascript, [este livro é uma boa referência](http://addyosmani.com/resources/essentialjsdesignpatterns/book/), assim como este [artigo](http://www.codeproject.com/Articles/687093/Understanding-JavaScript-Object-Creation-Patterns). Aqui está disponível [uma discussão mais aprofundada de protótipos na programação de jogos](http://gameprogrammingpatterns.com/prototype.html).

##### Subclasse

Subclasse é uma nova classe que herda características de sua(s) classe(s) ancestral.

##### Objeto / instância

Objeto / instância de uma classe. Um objeto é capaz de armazenar estados através de seus atributos e reagir a mensagens enviadas a ele, assim como se relacionar e enviar mensagens a outros objetos. *Exemplo de objetos da classe ``` Humano```: Alice, Maria.*

##### Membros

Membros são características de um objeto. Basicamente a estrutura de dados que vai representar a classe, assim como funções (ou métodos) associadas a ela. *Exemplos: Funcionário: nome, endereço, telefone, CPF,...; Carro: nome, marca, ano, cor, …; Livro: autor, editora, ano.* O conjunto de valores dos atributos de um determinado objeto é chamado de estado.

---

### Programação imperativa e funcional

programação imperativa é um paradigma de programação que descreve a computação como ações, enunciados ou comandos que mudam o estado (variáveis) de um programa. Já a programação funcional é um paradigma de programação que trata a computação como uma avaliação de funções matemáticas e que evita estados ou dados mutáveis. Ela enfatiza a aplicação de funções, em contraste da programação imperativa, que enfatiza mudanças no estado do programa.

Em Javascript, usamos elementos de ambos paradigmas: ao mesmo tempo que manipulamos o estado de objetos e variáveis de forma imperativa, a linguagem tem muitas funcionalidades para a manipulação de funções de forma elaborada, como [aninhamento de funções, closures e funções lambda](http://en.wikipedia.org/wiki/First-class_function).

```js
// exemplo de funcao de primeira classe
var umaFuncao = function (arg1) {
    return arg1 + 2;
}
umaFuncao (1) // retorna 3

// exemplo de closure
// retorna lista de livros com pelo menos montante de copias vendidas.
function bestSellers(montante) {
  return listaLivros.filter(
      function (livro) { return livro.vendas >= montante; }
    );
}
```

