/*global Phaser */

/** 
 * @class MC
 * @classdesc Estado que contém o jogo inteiro.
 */
var MC = {};

/**
 * @class City
 * @classdesc Usado pelos canhões e as cidades embaixo da tela. Usa Arcade Physics e BitmapData.
 * @augments Phaser.Sprite
 * @param {Phaser.Game}   game Referência ao game global
 * @param {number}    x    Posição X
 * @param {number} y    Posição Y
 */
MC.City = function (game, x, y) {
    "use strict";
     // Cria e desenha um retângulo no BitmapData
    var bmd = game.add.bitmapData(50, 20);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 50, 20);
    bmd.ctx.fillStyle = '#040347';
    bmd.ctx.fill();
    Phaser.Sprite.call(this, game, x, y, bmd);
    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(50, 20, 25, 10);
    game.add.existing(this);
};
// Lógica para herança
MC.City.prototype = Object.create(Phaser.Sprite.prototype);
MC.City.prototype.constructor = MC.City;

/**
 * Função estática usada em overlaps para resolver colisões entre balas inimigas e a cidade.
 * @function collisionHandler
 * @memberof City
 * @param {City} city    Cidade que foi atingida
 * @param {Bullet} eBullet Bala que atingiu a cidade
 */
MC.City.collisionHandler = function (city, eBullet) {
    "use strict";
    city.kill();
    eBullet.kill();
};

/**
 * @classdesc  Cria uma bala, seja do jogador ou inimigos. Cuida de atualizar as linhas, tratar colisões
 * e atualizar lógica de gameplay.
 * @class Bullet
 * @augments Phaser.Sprite
 * @param {Phaser.Game}   game    Referência ao game global
 * @param {string} color   Cor da bala e seu rastro
 * @param {number} originX Posição X da origem
 * @param {number} originY Posição Y da origem
 * @param {number} targetX Posição X do alvo
 * @param {number} targetY Posição Y do alvo
 */
MC.Bullet = function (game, color, originX, originY, targetX, targetY) {
    "use strict";
    // Cria e desenha um círculo no BitmapData
    var bmd = game.add.bitmapData(10, 10);
    bmd.circle(5, 5, 5, color);
    Phaser.Sprite.call(this, game, originX, originY, bmd);
    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.setCircle(10);
    game.physics.arcade.moveToXY(this, targetX, targetY, 100);
    game.add.existing(this);
    // Propriedades
    this.bulletColor = color;
    this.origin = new Phaser.Point(originX, originY);
    this.target = new Phaser.Point(targetX, targetY);
};
// Lógica para herança
MC.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MC.Bullet.prototype.constructor = MC.PlayerBullet;

/**
 * Cuida de destruir balas mortas e ativar explosões.
 * @function update
 * @memberof Bullet
 */
MC.Bullet.prototype.update = function () {
    "use strict";
    if (!this.alive) {
        this.destroy();
        return;
    }
    MC.lineLayer.line(this.origin.x, this.origin.y, this.x, this.y, this.bulletColor, 5);
    if (!this.inWorld || this.target.distance(this) < 5) {
        this.explode();
    }
};

/**
 * Explode e mata as balas, criando um sprite temporário de explosão no lugar.
 * @function explode
 * @memberof Bullet
 */
MC.Bullet.prototype.explode = function () {
    "use strict";
    var exp = this.game.add.sprite(this.x, this.y, 'explosion');
    this.game.physics.arcade.enable(exp);
    exp.body.setCircle(25);
    exp.tint = "#040347";
    MC.playerExplosions.add(exp);
    exp.anchor.setTo(0.5, 0.5);
    this.game.time.events.add(120,
        function () {
            this.destroy();
        }, exp);
    this.kill();
};

/**
 * @classdesc Escolhe uma origem e um alvo entre as cidades e o canhão e dispara novas balas
 * de inimigo. Também reduz o intervalo entre balas progressivamente até um valor mínimo.
 * @class EnemySpawner
 */
MC.EnemySpawner = function () {
    "use strict";
    this.fire = function () {
        var newBullet = {},
            origin = {},
            target = {},
            rand = Math.random();
        if (rand < 0.3) {
            target = new Phaser.Point(MC.city1.x, MC.city1.y);
        } else if (rand < 0.6) {
            target = new Phaser.Point(MC.city2.x, MC.city2.y);
        } else {
            target = new Phaser.Point(MC.cannon.x, MC.cannon.y);
        }
        rand = Math.random();
        if (rand < 0.3) {
            origin = new Phaser.Point(0, rand * MC.game.height / 3);
        } else if (rand < 0.6) {
            origin = new Phaser.Point(MC.game.width, rand * MC.game.height / 3);
        } else {
            origin = new Phaser.Point(rand * MC.game.width, 0);
        }
        newBullet = new MC.Bullet(MC.game, '#54fb9f', origin.x, origin.y, target.x, target.y);
        MC.enemyBullets.add(newBullet);
        if (this.timer.delay > 800) {
            this.timer.delay -= 40;
        }
    };
    this.timer = MC.game.time.events.loop(2000, this.fire, this);
};

/**
 * Carrega alguns sprites (no fim só está usando o de explosão).
 * @memberof MC
 * @function preload
 */
MC.preload = function () {
    "use strict";
    this.game.load.image('city', 'assets/city.png');
    this.game.load.image('bullet', 'assets/bullet.png');
    this.game.load.image('explosion', 'assets/explosion.png');
};

/**
 * Faz o setup do jogo, inicializando objetos e definindo callbacks.
 * @memberof MC
 * @function create
 */
MC.create = function () {
    "use strict";
    this.game.stage.backgroundColor = '#13bbae';
    // Setup do BitmapData das linhas
    MC.lineLayer = this.game.add.bitmapData(this.game.width, this.game.height);
    var lineSprite = this.game.add.sprite(0, 0, MC.lineLayer);
    // Setup dos vários objetos 
    MC.city1 = new MC.City(this.game, 70, 450);
    MC.cannon = new MC.City(this.game, 160, 450);
    MC.city2 = new MC.City(this.game, 320 - 70, 450);
    MC.spawner = new MC.EnemySpawner();
    // Setup de grupos
    MC.playerExplosions = this.game.add.group();
    MC.playerBullets = this.game.add.group();
    MC.enemyBullets = this.game.add.group();
    MC.gameOver = false;
    
    // Interação de clique usa callbacks para disparar balas
    this.game.input.mouse.mouseUpCallback = function () {
        if (MC.gameOver) {
            return;
        }
        var newBullet = new MC.Bullet(this, "#040347", MC.cannon.x, MC.cannon.y, this.input.mousePointer.x, this.input.mousePointer.y);
        MC.playerBullets.add(newBullet);
    };
};

/**
 * Operações realizadas em todo frame, como colisões e checagens de gameover.
 * @memberof MC
 * @function update
 */
MC.update = function () {
    "use strict";
    this.lineLayer.clear();
    this.game.physics.arcade.overlap(this.playerExplosions, this.enemyBullets, function (exp, eBullet) {
        eBullet.destroy();
    });
    
    if (this.city1.alive) {
        this.game.physics.arcade.overlap(this.city1, this.enemyBullets, MC.City.collisionHandler);
    }
    
    if (this.city2.alive) {
        this.game.physics.arcade.overlap(this.city2, this.enemyBullets, MC.City.collisionHandler);
    }
    
    if (this.cannon.alive) {
        this.game.physics.arcade.overlap(this.cannon, this.enemyBullets, MC.City.collisionHandler);
    }
    
    if ((!this.city1.alive && !this.city2.alive) || !this.cannon.alive) {
        this.game.stage.backgroundColor = '#000000';
        MC.gameOver = true;
    }
    
    if (!this.city1.alive && !this.city2.alive) {
        MC.spawner.timer.timer.remove(MC.spawner.timer);
    }
};

/**
 * Operações realizadas após update, como renderizar as linhas das balas.
 * @memberof MC
 * @function render
 */
MC.render = function () {
    "use strict";
    MC.lineLayer.render();
};

// Cria o objeto jogo e o liga ao HTML
MC.game = new Phaser.Game(320, 500, Phaser.CANVAS, 'jogo', MC);















