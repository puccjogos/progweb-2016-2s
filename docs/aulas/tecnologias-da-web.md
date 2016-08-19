## Tecnologias da Web

Nesta aula, vamos ver na prática como diferentes tecnologias se combinam dentro do browser.

### [HTML](http://en.wikipedia.org/wiki/HTML)

É uma linguagem de marcação baseada em *tags* (etiquetas) que definem tipos de informação e seu conteúdo para que um browser passa mostrá-los ao usuário. Documentos html são a base para a web, pois eles são o hub onde outros arquivos são interligados no browser. Abaixo, um exemplo simples de arquivo HTML.

```html
<!DOCTYPE html>
<html>
    <!-- isto é um comentário -->
    <head>
        <meta charset="UTF-8">
        <title>Título da página</title>
    </head>
    <body>
        <p class="exemplo">Parágrafo com conteúdo</p>
    </body>
</html>
```

Aqui está uma lista das principais tags de HTML:

+ **head** : marca o início e fim de informações meta, como caracteres autorizados, folhas de estilo, palavras-chave.
+ **title** : título da página.
+ **body** : onde está o conteúdo que é mostrado no corpo da página.
+ **script** : tag para marcar trechos de script variados, como JavaScript, dentro do próprio arquivo HTML.
+ **link** : tag que indica um arquivo externo sendo referenciado pelo arquivo HTML, como folhas de estilo e scripts. 
+ **style** : marca trechos de código que define estilo visual da página.
+ **img** : define uma imagem a ser carregada de um arquivo externo.
+ **canvas** : tag que define uma área para conter gráficos desenhados por código.
+ **div** : tag que define uma sub-divisão da página, prática para organizar o seu conteúdo.
+ **a** : tag que define um hiperlink.

Existe, a partir da definição do HTML5, uma série de novas tags que permitem uma organização mais semântica do conteúdo. Aqui está um diagrama com algumas das mais importantes. Para saber mais sobre as novas tags, [leia essa lista compilada pela Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/HTML/HTML5/HTML5_element_list) ou esse [mini-tutorial da w3schools](http://www.w3schools.com/html/html5_semantic_elements.asp).

![Elementos semânticos em HTML5](../imgs/html5-elementos-semanticos.gif)

Cada tag em HTML pode ter atributos, que especificam como ela funciona. Alguns atributos se aplicam a todas as tags, como **ids** e **classes** (ambos servem para nomear uma parte do conteúdo da página). Outros são específicos de algumas tags, como **src** (endereço de arquivo referenciado) ou **href** (endereço para link).

```html
<h1 id="manchete">Um dentista animal!</h1>

<p class="lide">Cachorro foge de casa em Campinas pra estudar odontologia em Botucatu. <a href="noticia.html">Saiba mais!</a></p>
```

### [CSS](http://en.wikipedia.org/wiki/Cascading_Style_Sheets)

É uma linguagem que define a apresentação visual de elementos de uma página. Vale tanto para HTML quanto outras linguagens de marcação, como XML. O seu funcionamento básico se dá através de [**seletores**](http://www.w3schools.com/cssref/css_selectors.asp), que definem os objetos nos quais um determinado estilo será aplicado (seja pela tag, por atributos ou posição relativa), e [**propriedades**](http://www.w3schools.com/cssref/css3_browsersupport.asp), onde o estado de cada característica desse objeto é definido. Veja o exemplo abaixo.

```css
/* seletor de parágrafo */
p {
    // propriedades alteradas
    color : #ff0000;
    font-weight : bold;
}
```

O código em CSS pode existir de diversas formas em uma página HTML: como parte da própria página, delimitada por uma tag **style**, dentro de um arquivo externo conectado através da tag **link** ou como o atributo **style** de uma tag.

Outro aspecto importante do CSS é que as regras de estilo são aplicadas em cascata, ou seja, regras definidas antes são aplicadas antes que regras posteriores e regras mais específicas tem prioridade sobre regras mais gerais. Veja o exemplo abaixo.

```css
body {
    color : red;
}

p {
    color : green;
}
/* neste exemplo, os parágrafos serão verdes e
todos outros textos no corpo da página 
serão vermelhos. */
```

Mais referências e tutoriais sobre HTML e CSS [aqui](https://github.com/progweb2sem2014/repodidatico/wiki/Refer%C3%AAncias-e-tutoriais#html-e-css). Para fazer testes e praticar HTML e CSS, o [Codepen](http://codepen.io/) é uma boa alternativa.

### [JavaScript (ou JS)](http://en.wikipedia.org/wiki/JavaScript)

É uma linguagem de programação de alto nível, que permite o uso de vários paradigmas de programação. É também dinâmica, orientada a objetos (através de protótipos), imperativa e funcional. É através de JS que criamos a maior parte da interatividade dentro de uma página no browser. O JavaScript tem acesso a diferentes propriedades e informações contidas numa página e podemos criar **scripts** para manuseá-las.

Código em JS pode estar conectado a uma página de duas maneiras principais: através de tags **script** e de arquivos externos linkados com tags **script**. Exemplo abaixo.

```html
<script type="text/JavaScript">
// funcao JavaScript
function OlaMundo () {
    console.log("ola mundo");
}
</script>

// arquivo externo
<script src="olaMundo.js" />
```

Quando uma página web é carregada no browser, o documento é transformado em uma hierarquia de objetos, acessíveis via código. Essa hierarquia é chamada de [DOM (documento object model)](http://en.wikipedia.org/wiki/Document_Object_Model). Através dela, podemos criar funções para reagir a eventos diversos, alterar propriedades e conteúdo de tags e até criar novos conteúdos a partir de scripts. Exemplo abaixo.

```html
// quando clicar em qualquer lugar da pagina
// altera o conteúdo do elemento com id "mensagem"

<p id="mensagem"> algum texto anterior </p>

<script type="text/JavaScript">
document.addEventListener("click", function(){
    document.getElementById("mensagem").innerHTML = "Ola Mundo";
});
</script>
```

Como vemos no exemplo, a sintaxe para acessar elementos é um tanto quanto verbosa. Para isso, foram criadas bibliotecas para facilitar esse acessoe  deixar a escrita de JavaScript no browser mais simples. Uma das mais populares é o [jQuery](http://jquery.com/). O mesmo código acima ficaria:

```html
<p id="mensagem"> algum texto anterior </p>

$(document).click(function() {
  $("#mensagem").text ("Ola Mundo");
});
</script>
```

Existem muitas bibliotecas de JavaScript, com objetivos e funcionalidades diferentes. É bastante comum que várias bibliotecas sejam utilizadas ao mesmo tempo em um projeto para web, e a engine [Phaser](http://phaser.io) que vamos utilizar para desenvolver jogos é uma dessas bibliotecas. Por sua vez, ela também utiliza a biblioteca [Pixi](http://www.pixijs.com/) para a renderização de gráficos. Essa diversidade e extensibilidade do JavaScript é uma de suas principais vantagens, e também uma de suas características mais desorientadoras no início de aprendizado.