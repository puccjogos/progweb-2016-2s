Aula do dia 01/10/15.

---

Exitem duas etapas principais para o desenvolvimento de sistemas de input multi-plataformas. Primeiro, é importante desacoplar as ações no mundo do jogo de um tipo de entrada. Segundo, é importante associar essa nova camada de abstração a cada uma das plataformas desejadas, adaptando conforme necessário. Para ajudar nesse processo, vamos trabalhar com a criação de objetos para auxiliar nosso input.

A própria biblioteca também agrupa uma série de funcionalidade de input dentro do próprio `Sprite`, na propriedade `sprite.input`, do tipo `InputHandler`. A documentação desta classe está disponível [aqui](http://docs.phaser.io/Phaser.InputHandler.html#toc0).

+ Docs: [Phaser.Input](http://docs.phaser.io/Phaser.Input.html)
+ Docs: [Phaser.InputHandler](http://docs.phaser.io/Phaser.InputHandler.html)
+ Docs: [Phaser.Key](http://docs.phaser.io/Phaser.Key.html)
+ Docs: [Phaser.Keyboard](http://docs.phaser.io/Phaser.Keyboard.html)
+ Docs: [Phaser.Pointer](http://docs.phaser.io/Phaser.Pointer.html)
+ Docs: [Phaser.Mouse](http://docs.phaser.io/Phaser.Mouse.html)
+ Docs: [Phaser.Gamepad](http://docs.phaser.io/Phaser.Gamepad.html)

#### Teclado

+ Exemplo: [usando teclas direcionais](http://phaser.io/examples/v2/input/cursor-key-movement)
+ Exemplo: [teclas com funções](http://phaser.io/examples/v2/input/keyboard-hotkeys)
+ Exemplo: [bloquear eventos-padrão do browser](http://phaser.io/examples/v2/input/override-default-controls)

#### Mouse e toque

Phaser usa o conceito de *pointer* tanto para o mouse quanto para interfaces de toque. A classe Pointer guarda uma série de informações relativas à posição, velocidade, id e estado dos eventos de toque e mouse.

+ Exemplo: [eventos de mouse/toque](http://examples.phaser.io/_site/view_full.html?d=input&f=button%20open%20popup.js&t=button%20open%20popup&phaser_version=v2.4.3&)
+ Exemplo: [toque fora do jogo](http://examples.phaser.io/_site/view_full.html?d=input&f=out%20of%20game.js&t=out%20of%20game&phaser_version=v2.4.3&)
+ Exemplo: [multi-toque](http://examples.phaser.io/_site/view_full.html?d=input&f=multi%20touch.js&t=multi%20touch&phaser_version=v2.4.3&).
+ Exemplo: [joystick por toque](http://examples.phaser.io/_site/view_full.html?d=input&f=touch%20joystick.js&t=touch%20joystick&phaser_version=v2.4.3&)

#### Gamepad

O Phaser tem suporte a gamepads, como de XBox 360 ou qualquer outro conectado ao dispositivo PC. No entanto, este suporte ainda é experimental e instável.

+ Exemplo: [tela de teste de gamepad](http://examples.phaser.io/_site/view_full.html?d=input&f=gamepad%20debug.js&t=gamepad%20debug&phaser_version=v2.4.3&)
+ Exemplo: [múltiplos gamepads](http://examples.phaser.io/_site/view_full.html?d=input&f=gamepad%20multiple%20pads.js&t=gamepad%20multiple%20pads&phaser_version=v2.4.3&)