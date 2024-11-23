class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        this.gameStarted = false;
        this.score = 0;
    }

    preload() {
        // Load game assets
        this.load.image('exorcist', 'assets/Characters/exorcist.png');
        this.load.image("demon", "assets/Characters/demon.png");

        // divider image
        this.load.image('divider', 'assets/UI/divider2.png');    

        // map
        this.load.image('background', 'assets/House/Provisional/mansionConFondo.jpg')
    }

    create() {

       
        // Set debug mode for the physics engine (shows the bounding boxes)
        // this.physics.world.createDebugGraphic();

        // Create ball
        this.exorcist = this.physics.add.sprite(400, 530, 'exorcist');
        this.exorcist.setCollideWorldBounds(true);
        this.exorcist.setScale(0.15,0.15);
        this.exorcist.body.setAllowGravity(false);
        this.exorcist.body.setImmovable(true);

        this.demon = this.physics.add.sprite(800, 650, 'demon');
        this.demon.setCollideWorldBounds(true);
        this.demon.body.setImmovable(true);
        this.demon.body.setAllowGravity(false);
        this.demon.setScale(0.15,0.15);

        
        // mapa
        // Crear el mapa como fondo
        //this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Establecer los límites del mundo según el tamaño del mapa
        //this.physics.world.setBounds(0, 0, this.background.width, this.background.height);

        

        // Añadir la imagen del marco en el centro de la pantalla
        const divider = this.add.image(this.scale.width / 2, this.scale.height / 2, 'divider')
        .setOrigin(0.5, 0.5); // Centra la imagen en ambos ejes
        divider.setDepth(1); // Asegura que la imagen esté por encima de otros elementos

        // Bueno esto no sirve de mucho.
        const hello_text = this.add.text(250, 350, 'Press space to start!', { fill: '#000000', fontSize: 40 });
        hello_text.setOrigin(-0.7, 1);
        this.input.keyboard.on("keydown-SPACE", () => {
            if (!this.gameStarted) {
                hello_text.destroy();
                this.startGame();
            }

        });

        // CAMBIAR!!! He visto que se pueden usar grupos o containers para hacer colecciones de sprites. Los grupos y containers
        // hacen cosas distintas pero no me ha dado tiempo a mirar cómo funcionan. Serviría para que la tercera cámara ignore todo el
        // grupo o el container. 
        //this.backgroundGroup = this.add.group()
        //this.backgroundGroup.add(divider)
        //this.backgroundGroup.add(hello_text)
        

        // Add colliders
        this.physics.add.collider(this.exorcist, this.demon, this.hitGround, null, this); // LLama a la función "hitGround" cuando colisionan

        
        // Enable inputs
        this.setupPaddleControllersExorcist();
        this.setupPaddleControllersDemon();


        // CREACIÓN DE LAS CÁMARAS:
        // Primera cámara que sigue al exorcista
        this.cameras.main.setSize(this.scale.width / 2, this.scale.height)
        this.cameras.main.startFollow(this.exorcist)
        
        // Segunda cámara que sigue al demonio
        const scndCamera = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height, false, 'demonCamera')
        scndCamera.startFollow(this.demon)
        
        // Tercera cámara que sólo renderiza el borde
        const marcoCamera = this.cameras.add(0, 0, this.scale.width, this.scale.height)        

        // limitar la camara principal y la secundaria al tamaño del mapa
        //this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);
        //scndCamera.setBounds(0, 0, this.background.width, this.background.height);



        // IGNORAR SPRITES:
        // Las cámaras de la pantalla dividida ignoran el marco
        this.cameras.main.ignore(divider)
        scndCamera.ignore(divider)
        // La tercera cámara debe ignorar todos los sprites XD
        marcoCamera.ignore([this.exorcist, this.demon, hello_text])

        

    }    

    setupPaddleControllersDemon() {
        this.input.keyboard.on('keydown-LEFT', () => {
            this.demon.setVelocity(-200,0);
        });

        this.input.keyboard.on('keyup-LEFT', () => {
            this.demon.setVelocity(0);
        });

        this.input.keyboard.on('keydown-UP', () => {
            this.demon.setVelocity(0,-200);
        });

        this.input.keyboard.on('keyup-UP', () => {
            this.demon.setVelocity(0);
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            this.demon.setVelocity(0,200);
        });

        this.input.keyboard.on('keyup-DOWN', () => {
            this.demon.setVelocity(0);
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.demon.setVelocity(200,0);
        });

        this.input.keyboard.on('keyup-RIGHT', () => {
            this.demon.setVelocity(0);
        });
    }

    setupPaddleControllersExorcist() {
        this.input.keyboard.on('keydown-A', () => {
            this.exorcist.setVelocity(-200, 0);
        });
    
        this.input.keyboard.on('keyup-A', () => {
            this.exorcist.setVelocity(0);
        });
    
        this.input.keyboard.on('keydown-W', () => {
            this.exorcist.setVelocity(0, -200);
        });
    
        this.input.keyboard.on('keyup-W', () => {
            this.exorcist.setVelocity(0);
        });
    
        this.input.keyboard.on('keydown-S', () => {
            this.exorcist.setVelocity(0, 200);
        });
    
        this.input.keyboard.on('keyup-S', () => {
            this.exorcist.setVelocity(0);
        });
    
        this.input.keyboard.on('keydown-D', () => {
            this.exorcist.setVelocity(200, 0);
        });
    
        this.input.keyboard.on('keyup-D', () => {
            this.exorcist.setVelocity(0);
        });
    }
    


    hitGround() {
        this.scene.stop("welcome");
        this.scene.start("EndScene");
    }

    startGame() {
        this.gameStarted = true;
    }


    hitPaddle(ball, paddle) {

    }

    update(time, delta) {

    }
}