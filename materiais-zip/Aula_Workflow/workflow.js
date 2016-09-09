/*global Phaser*/
var estado = {};

var jogo = new Phaser.Game(960, 640, Phaser.AUTO, "jogo", estado);

estado.preload = function () {
    "use strict";
    jogo.load.image("nave", "nave.png");
    
    jogo.load.tilemap("mapa", "mapa.json", null, Phaser.Tilemap.TILED_JSON);
    jogo.load.image("tiles", "Tiles-BW.png");
    
    jogo.load.spritesheet("laserAzul", "lasers.png", 48, 46);
    
    jogo.load.atlas("laserVermelho", "laserRed.png", "laserRed.xml", null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);
    
    jogo.load.audio("somLaser", ["sfx_laser1.mp3", "sfx_laser1.ogg"]);
};

estado.create = function () {
    "use strict";
    jogo.physics.startSystem(Phaser.Physics.ARCADE);
    estado.nave = jogo.add.sprite(150, 200, "nave");
    estado.nave.anchor.setTo(0.5, 0.5);
    jogo.physics.enable(estado.nave, Phaser.Physics.ARCADE);
    
    estado.mapa = jogo.add.tilemap("mapa");
    estado.mapa.setCollisionBetween(0, 43);
    estado.mapa.addTilesetImage("Tileset", "tiles");
    estado.paredes = estado.mapa.createLayer("Paredes");
    estado.paredes.resizeWorld();
    
    estado.laserAzul = jogo.add.sprite(400, 300, "laserAzul");
    estado.laserAzul.animations.add("brilhar", [0, 1, 2, 3], 12, true);
    estado.laserAzul.animations.play("brilhar");
    
    estado.laserVermelho = jogo.add.sprite(600, 200, "laserVermelho");
    estado.laserVermelho.animations.add("brilhar", [0, 1, 2, 3], 12, true);
    estado.laserVermelho.animations.play("brilhar");
};

estado.update = function () {
    "use strict";
    estado.nave.rotation = jogo.physics.arcade.accelerateToPointer(estado.nave, Phaser.Input.activePointer, 120, 100, 100);
    if (jogo.physics.arcade.distanceToPointer(estado.nave) <= 30) {
        estado.nave.body.velocity.setTo(0, 0);
    }
    jogo.physics.arcade.collide(estado.nave, estado.paredes);
    if(jogo.input.activePointer.justPressed(30)) {
        jogo.sound.play("somLaser", 1, false);
    }
};