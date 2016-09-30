/*global Phaser*/
var estado = {},
    jogo;

jogo = new Phaser.Game(960, 640, Phaser.AUTO, "jogo", estado); 

estado.preload = function () {
    "use strict";
    jogo.load.image("nave", "nave.png");
    jogo.load.spritesheet("laserAzul", "lasers.png", 48, 46);
    jogo.load.atlas("laserVermelho", "laserRed.png", "laserRed.xml", null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);
    jogo.load.tilemap("mapa", "mapa.json", null, Phaser.Tilemap.TILED_JSON);
    jogo.load.image("tileset", "Tiles-BW.png");
    jogo.load.audio("sfxLaser", ["sfx_laser1.mp3", "sfx_laser1.ogg"]);
};

estado.create = function () {
    "use strict";
    jogo.physics.startSystem(Phaser.Physics.ARCADE);
    
    estado.numTiros = 0;
    
    estado.nave = jogo.add.sprite(650, 200, "nave");
    jogo.physics.enable(estado.nave, Phaser.Physics.ARCADE);
    estado.nave.body.gravity.setTo(0, 100);
    
    estado.laserAzul = jogo.add.sprite(300, 400, "laserAzul");
    estado.laserAzul.animations.add("brilhar", [0, 1, 2, 3], 12, true);
    estado.laserAzul.animations.play("brilhar");
    
    estado.laserVermelho = jogo.add.sprite(400, 200, "laserVermelho");
    estado.laserVermelho.animations.add("brilhar", [0, 1, 2, 3], 12, true);
    estado.laserVermelho.animations.play("brilhar");
    
    estado.mapa = jogo.add.tilemap("mapa");
    estado.mapa.setCollisionBetween(0, 45, true);
    estado.mapa.addTilesetImage("Tileset", "tileset");
    estado.paredes = estado.mapa.createLayer("Paredes");
    estado.paredes.resizeWorld();
};

estado.update = function () {
    "use strict";
    jogo.physics.arcade.collide(estado.paredes,estado.nave);
    if(jogo.input.activePointer.justPressed(30)) {
        jogo.sound.play("sfxLaser", 1, false);
        var historicoTiros = new Number(localStorage.getItem("numTiros"));
        historicoTiros += 1;
        localStorage.setItem("numTiros", historicoTiros);
    }
    
    /*
    estado.nave.rotation = jogo.physics.arcade.accelerateToPointer(estado.nave, Phaser.Input.activePointer, 120, 100, 100);
    if (jogo.physics.arcade.distanceToPointer(estado.nave) <= 30) {
        estado.nave.body.velocity.setTo(0, 0);
    }
    jogo.physics.arcade.collide(estado.nave, estado.paredes);
    if(jogo.input.activePointer.justPressed(30)) {
        //jogo.sound.play("somLaser", 1, false);
        jogo.state.start("inicio");
    }
    */
};