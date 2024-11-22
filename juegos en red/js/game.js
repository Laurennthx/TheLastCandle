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
    }

    create() {

        // Set debug mode for the physics engine (shows the bounding boxes)
        this.physics.world.createDebugGraphic();

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
        

        // Add colliders
        this.physics.add.collider(this.ball, this.terrain, this.hitGround, null, this); // LLama a la función "hitGround" cuando colisionan


        const hello_text = this.add.text(250, 350, 'Press space to start!', { fill: '#000000', fontSize: 40 });
        hello_text.setOrigin(-0.7, 1);
        this.input.keyboard.on("keydown-SPACE", () => {
            if (!this.gameStarted) {
                hello_text.destroy();
                this.startGame();
            }

        });

        this.setupPaddleControllersExorcist();
        this.setupPaddleControllersDemon();

        this.cameras.main.setSize(this.scale.width / 2, this.scale.heigh)
        this.cameras.main.startFollow(this.ball)

        const scndCamera = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.heigh, false, 'demonCamera')
        scndCamera.startFollow(this.terrain)
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