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
        this.load.svg('ball', 'assets/ball.svg');
        this.load.image("terrain", "assets/bomba.svg");

        // divider image
        this.load.image('divider', 'assets/UI/divider2.png');
    }

    create() {

        // Set debug mode for the physics engine (shows the bounding boxes)
        // this.physics.world.createDebugGraphic();

        // Create ball
        this.ball = this.physics.add.sprite(400, 530, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setScale(0.1,0.1);
        this.ball.body.setAllowGravity(false);
        this.ball.body.setImmovable(true);

        this.terrain = this.physics.add.sprite(800, 650, 'terrain');
        this.terrain.setCollideWorldBounds(true);
        this.terrain.body.setImmovable(true);
        this.terrain.body.setAllowGravity(false);
        this.terrain.setScale(0.06,0.06);

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
        this.physics.add.collider(this.ball, this.terrain, this.hitGround, null, this); // LLama a la función "hitGround" cuando colisionan

        
        // Enable inputs
        this.setupPaddleControllersExorcist();
        this.setupPaddleControllersDemon();


        // CREACIÓN DE LAS CÁMARAS:
        // Primera cámara que sigue al exorcista
        this.cameras.main.setSize(this.scale.width / 2, this.scale.heigh)
        this.cameras.main.startFollow(this.ball)
        // Segunda cámara que sigue al demonio
        const scndCamera = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.heigh, false, 'demonCamera')
        scndCamera.startFollow(this.terrain)
        // Tercera cámara que sólo renderiza el borde
        const marcoCamera = this.cameras.add(0, 0, this.scale.width, this.scale.heigh)        

        // IGNORAR SPRITES:
        // Las cámaras de la pantalla dividida ignoran el marco
        this.cameras.main.ignore(divider)
        scndCamera.ignore(divider)
        // La tercera cámara debe ignorar todos los sprites XD
        marcoCamera.ignore([this.ball, this.terrain, hello_text])
    }    

    setupPaddleControllersDemon() {
        this.input.keyboard.on('keydown-LEFT', () => {
            this.terrain.setVelocity(-200,0);
        });

        this.input.keyboard.on('keyup-LEFT', () => {
            this.terrain.setVelocity(0);
        });

        this.input.keyboard.on('keydown-UP', () => {
            this.terrain.setVelocity(0,-200);
        });

        this.input.keyboard.on('keyup-UP', () => {
            this.terrain.setVelocity(0);
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            this.terrain.setVelocity(0,200);
        });

        this.input.keyboard.on('keyup-DOWN', () => {
            this.terrain.setVelocity(0);
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.terrain.setVelocity(200,0);
        });

        this.input.keyboard.on('keyup-RIGHT', () => {
            this.terrain.setVelocity(0);
        });
    }

    setupPaddleControllersExorcist() {
        this.input.keyboard.on('keydown-A', () => {
            this.ball.setVelocity(-200, 0);
        });
    
        this.input.keyboard.on('keyup-A', () => {
            this.ball.setVelocity(0);
        });
    
        this.input.keyboard.on('keydown-W', () => {
            this.ball.setVelocity(0, -200);
        });
    
        this.input.keyboard.on('keyup-W', () => {
            this.ball.setVelocity(0);
        });
    
        this.input.keyboard.on('keydown-S', () => {
            this.ball.setVelocity(0, 200);
        });
    
        this.input.keyboard.on('keyup-S', () => {
            this.ball.setVelocity(0);
        });
    
        this.input.keyboard.on('keydown-D', () => {
            this.ball.setVelocity(200, 0);
        });
    
        this.input.keyboard.on('keyup-D', () => {
            this.ball.setVelocity(0);
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