## Workflow de assets e dados locais

Nesta aula, vamos trabalhar dois tópicos: o **workflow de assets** (criação, importação, ferramentas úteis) e **como salvar e recuperar dados localmente**.

### Workflow de assets

Todo asset carregado durante o `preload` passa pela classe [`Phaser.Loader`](http://docs.phaser.io/Phaser.Loader.html) e depois é armazenado, usando chaves em texto, dentro de uma única instância da classe [`Phaser.Cache`](http://docs.phaser.io/Phaser.Cache.html). Vale a pena dar uma olhada em algumas de suas funções. A classe `Cache` tem uma série de funções que permitem a [verificação se algum asset foi carregado corretamente](http://examples.phaser.io/_site/view_full.html?d=loader&f=check+cache.js&t=check%20cache).

Quando os arquivos são carregados (durante o `preload`), o Phaser dispara uma série de eventos que podemos usar para dar feedback ou criar funções em momentos específicos. Pode ser interessante para avisar os jogadores de carregamentos intermediários. [Veja o exemplo](http://examples.phaser.io/_site/view_full.html?d=loader&f=load+events.js&t=load%20events).

Outros exemplos interessantes estão disponíveis [aqui](http://phaser.io/examples/v2/category/loader).

#### Imagens

```javascript
game.load.image('imageKey', 'assets/sprites/phaser2.png');
```

#### Spritesheets

```javascript
game.load.spritesheet('animado', 'assets/sprites/sprites.png', 32, 32);
sprite.animations.add('walk');
sprite.animations.play('walk', 50, true);
```

#### Tilemaps

Para carregar mapas, são necessárias duas informações diferentes: o *tilemap*, com as informações sobre a disposição dos tiles no level em questão, e o *tileset*, que é a imagem de referência.

[Exemplo](http://examples.phaser.io/_site/view_full.html?d=loader&f=load+tilemap+json.js&t=load%20tilemap%20json)

#### Sons

```javascript
game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
```

[Exemplo: Som](http://examples.phaser.io/_site/view_full.html?d=loader&f=load+audio.js&t=load%20audio)

Uma outra possibilidade interessante relacionada a importação de sons dentro de um jogo HTML5 é o conceito de *audiosprites*, ou seja, um único arquivo contendo vários sons diferentes. Esses trechos diferentes são anotados em um arquivo externo ou configurados diretamente. Com esse audiosprite, é possível tocar vários sons ao mesmo tempo em um grande número de browsers, o que é uma limitação atual em dispositivos móveis.

#### Atlas

Atlas são uma forma de juntar vários sprites e imagens em uma única imagem que tem um arquivo auxiliar informando o nome e coordenadas de cada um dos sprites que a compõem. O objetivo com isso é economizar carregamento e memória, o que pode ser essencial quando o jogo for lançado. Os custos de servidor e a performance em dispositivos móveis são bastante beneficiados pelo uso de atlas. Algumas ferramentas que podem gerar atlas: [ShoeBox](http://renderhjs.net/shoebox/) e [TexturePacker](https://www.codeandweb.com/texturepacker).

[Exemplo de carregamento de atlas](http://examples.phaser.io/_site/view_full.html?d=loader&f=load+texture+atlas.js&t=load%20texture%20atlas).

### Dados locais

Para guardar dados localmente, podemos usar a funcionalidade `localStorage`, definida e suportada nos browsers mais modernos. O seu funcionamento é bastante simples.

```javascript
// para gravar
localStorage.setItem('nomeInfo', 'conteudo');
// para recuperar
localStorage.getItem('nomeInfo');
```

O `localStorage` guarda apenas strings, então, para guardar um objeto mais complexo, é necessário transformá-lo em JSON (formato de objeto serializado). Veja o exemplo abaixo.

```javascript
// para guardar
localStorage.setItem('chaveMeuObjeto', JSON.stringify(meuObjeto));
// para recuperar
meuObjeto = JSON.parse(localStorage.getItem('chaveMeuObjeto'));
```