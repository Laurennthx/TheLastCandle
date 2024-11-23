class GameSceneCopy extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSceneCopy' });
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

        // crucifix
        this.load.image('crucifix', 'assets/Objects/crucifix.png')

        // gradient
        this.load.image('gradient', 'assets/Pruebas/gradiente.png')

        // block
        this.load.image('block', 'assets/Pruebas/block.png')


    }

    create() {

        const zoomCamara = 4.5
        const height = this.scale.height
        const width = this.scale.width

        this.bgContainer = this.add.container(0, 0)
        // Crear el mapa como fondo, dimensiones: 9962 x 15522
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0)

        this.walls = this.physics.add.group();

        const block = this.walls.create(4080, 2050, 'block')
        block.body.setAllowGravity(false)
        block.body.setImmovable(true)
        block.setScale(0.8, 4)
        // Al meterlo dentro del 'container' para posicinarlo correctamente hay que tener en cuenta las dimensiones en píxeles del sprite background.
        // Otra manera es sacarlo del container y colocarlo en dimensiones de la pantalla 1990 x 1080
        const crucifix = this.add.image(100, 13000, 'crucifix').setOrigin(0, 0)


        this.bgContainer.add([background, crucifix, block])
        const escala = this.scale.height / background.height
        this.bgContainer.setScale(escala)


        this.charactersContainer = this.add.container(0, 0)
        // Create ball
        this.exorcist = this.physics.add.sprite(200, 200, 'exorcist');
        this.exorcist.setCollideWorldBounds(true);
        this.exorcist.setScale(0.03, 0.03);
        this.exorcist.body.setAllowGravity(false);
        this.exorcist.body.setImmovable(true);

        // this.gradientEx = this.add.image(this.exorcist.x, this.exorcist.y, 'gradient')  // La cámara del demonio debe ignorar esto
        // let gradientScale = 0.5
        // this.gradientEx.setScale(gradientScale, gradientScale)


        this.demon = this.physics.add.sprite(800, 650, 'demon');
        this.demon.setCollideWorldBounds(true);
        this.demon.body.setImmovable(true);
        this.demon.body.setAllowGravity(false);
        this.demon.setScale(0.06, 0.06); // Escalar a ojo los personajes

        this.charactersContainer.add([this.exorcist, this.demon])


        // Establecer los límites del mundo según el tamaño del mapa
        this.physics.world.setBounds(0, 0, background.width * escala, height);



        // Añadir la imagen del marco en el centro de la pantalla
        const divider = this.add.image(this.scale.width / 2, this.scale.height / 2, 'divider')
            .setOrigin(0.5, 0.5); // Centra la imagen en ambos ejes
        divider.setDepth(1); // Asegura que la imagen esté por encima de otros elementos




        // Add colliders
        this.physics.add.collider(this.exorcist, this.demon, this.hitGround, null, this); // LLama a la función "hitGround" cuando colisionan
        this.physics.add.collider(this.exorcist, block, this.hitBLock, null, this); // LLama a la función "hitGround" cuando colisionan




        // Enable inputs
        this.setupPaddleControllersExorcist();
        this.setupPaddleControllersDemon();


        // CREACIÓN DE LAS CÁMARAS:
        // Primera cámara que sigue al exorcista
        this.cameras.main.setSize(this.scale.width / 2, this.scale.height)
        // this.cameras.main.startFollow(this.exorcist)
        // this.cameras.main.setZoom(zoomCamara)

        // // Segunda cámara que sigue al demonio
        // const scndCamera = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height, false, 'demonCamera')
        // scndCamera.startFollow(this.demon)
        // scndCamera.setZoom(zoomCamara)

        // // Tercera cámara que sólo renderiza el borde
        // const marcoCamera = this.cameras.add(0, 0, this.scale.width, this.scale.height)

        // // limitar la camara principal y la secundaria al tamaño del mapa
        // //this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);
        // //scndCamera.setBounds(0, 0, this.background.width, this.background.height);

        // // IGNORAR SPRITES:
        // // Las cámaras de la pantalla dividida ignoran el marco
        // this.cameras.main.ignore(divider)
        // scndCamera.ignore(divider)
        // // La tercera cámara debe ignorar todos los sprites XD
        // marcoCamera.ignore([this.charactersContainer, this.bgContainer])

        //Luces

        // Enable lights in the scene
        this.lights.enable();
        this.lights.setAmbientColor(0x222222);
        // Add a light source
        this.light = this.lights.addLight(100, 100, 100, 0xffffff, 1);

        // Make objects affected by lighting
        [background, ...this.walls.getChildren()].forEach(obj => obj.setPipeline('Light2D'));

        // Create shadow graphics
        this.shadowGraphics = this.add.graphics();


    }

    setupPaddleControllersDemon() {
        this.input.keyboard.on('keydown-LEFT', () => {
            this.demon.setVelocity(-200, 0);
        });

        this.input.keyboard.on('keyup-LEFT', () => {
            this.demon.setVelocity(0);
        });

        this.input.keyboard.on('keydown-UP', () => {
            this.demon.setVelocity(0, -200);
        });

        this.input.keyboard.on('keyup-UP', () => {
            this.demon.setVelocity(0);
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            this.demon.setVelocity(0, 200);
        });

        this.input.keyboard.on('keyup-DOWN', () => {
            this.demon.setVelocity(0);
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.demon.setVelocity(200, 0);
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

    hitBLock() {
        // console.log('choque')
    }

    startGame() {
        this.gameStarted = true;
    }


    hitPaddle(ball, paddle) {

    }

    castShadow(wall) {
        if (!this.light || !wall) return;

    
        const shadowLength = 1000;
        const lightX = this.light.x;
        const lightY = this.light.y;
    
        // Calculate the corners of the wall
        const corners = [
            { x: wall.x - wall.displayWidth / 2, y: wall.y - wall.displayHeight / 2 },
            { x: wall.x + wall.displayWidth / 2, y: wall.y - wall.displayHeight / 2 },
            { x: wall.x + wall.displayWidth / 2, y: wall.y + wall.displayHeight / 2 },
            { x: wall.x - wall.displayWidth / 2, y: wall.y + wall.displayHeight / 2 }
        ];
    
        // Cast shadow for each face of the wall
        for (let i = 0; i < corners.length; i++) {
            const j = (i + 1) % corners.length;
            const p1 = corners[i];
            const p2 = corners[j];
    
            // Check if the face is visible to the light
            if (this.isFaceVisible(lightX, lightY, p1, p2)) {

                const dx1 = p1.x - lightX;
                const dy1 = p1.y - lightY;
                const dx2 = p2.x - lightX;
                const dy2 = p2.y - lightY;
    
                const endP1 = {
                    x: p1.x + dx1 * shadowLength / Math.sqrt(dx1 * dx1 + dy1 * dy1),
                    y: p1.y + dy1 * shadowLength / Math.sqrt(dx1 * dx1 + dy1 * dy1)
                };
                const endP2 = {
                    x: p2.x + dx2 * shadowLength / Math.sqrt(dx2 * dx2 + dy2 * dy2),
                    y: p2.y + dy2 * shadowLength / Math.sqrt(dx2 * dx2 + dy2 * dy2)
                };
    
                // Draw shadow
                if (this.shadowGraphics) {
                    this.shadowGraphics.fillStyle(0x000000, 0.7);
                    this.shadowGraphics.beginPath();
                    this.shadowGraphics.moveTo(p1.x, p1.y);
                    this.shadowGraphics.lineTo(p2.x, p2.y);
                    this.shadowGraphics.lineTo(endP2.x, endP2.y);
                    this.shadowGraphics.lineTo(endP1.x, endP1.y);
                    this.shadowGraphics.closePath();
                    this.shadowGraphics.fillPath();
                }
            }
        }
    }
    
    isFaceVisible(lightX, lightY, p1, p2) {
        // Calculate the normal vector of the face
        const nx = -(p2.y - p1.y);
        const ny = p2.x - p1.x;
    
        // Calculate the vector from p1 to the light
        const dx = lightX - p1.x;
        const dy = lightY - p1.y;
    
        // If the dot product is positive, the face is visible to the light
        return (nx * dx + ny * dy) > 0;
    }

    update(time, delta) {
        //this.gradientEx.setPosition(this.exorcist.x, this.exorcist.y)

        if (this.light) {
            this.light.x = this.exorcist.x;
            this.light.y = this.exorcist.y;
        }

        // Clear previous shadows
        if (this.shadowGraphics) {
            this.shadowGraphics.clear();
        }

        // Cast shadows for each wall
        this.walls.getChildren().forEach(wall => {
            this.castShadow.call(this, wall);
        });
    }

    
}