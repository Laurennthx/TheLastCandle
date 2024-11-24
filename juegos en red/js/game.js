class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.candleCount = 0; // Contador de velas en el inventario

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
        this.load.image('divider', 'assets/UI/divider4.png');    

        // map
        this.load.image('background', 'assets/House/CasaSinFondo.jpg')

        // crucifix
        this.load.image('crucifix', 'assets/Objects/crucifix.png')

        // velas
        this.load.image('candle', 'assets/Objects/candle_on.png')

    }

    create() {

        // MUNDO
        const zoomCamara = 3.5
        const height = this.scale.height
        const width = this.scale.width

        this.bgContainer = this.add.container(0, 0)
        // Crear el mapa como fondo, dimensiones: 9962 x 15522
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0)
        // Al meterlo dentro del 'container' para posicinarlo correctamente hay que tener en cuenta las dimensiones en píxeles del sprite background.
        // Otra manera es sacarlo del container y colocarlo en dimensiones de la pantalla 1990 x 1080
        const crucifix = this.add.image(100, 13000, 'crucifix').setOrigin(0, 0) 

        this.bgContainer.add([background, crucifix])
        const escala = this.scale.height / background.height
        this.bgContainer.setScale(escala)

        // Establecer los límites del mundo según el tamaño del mapa
        this.physics.world.setBounds(0, 0, background.width * escala, height);

        // PERSONAJES
        // Contenedor de personajes
        this.charactersContainer = this.add.container(0, 0)
        
        // Exorcista
        this.exorcist = this.physics.add.sprite(400, 530, 'exorcist');
        this.exorcist.setCollideWorldBounds(true);
        this.exorcist.setScale(0.03,0.03);
        this.exorcist.body.setAllowGravity(false);
        this.exorcist.body.setImmovable(true);
        
        //Demonio 
        this.demon = this.physics.add.sprite(800, 650, 'demon');
        this.demon.setCollideWorldBounds(true);
        this.demon.body.setImmovable(true);
        this.demon.body.setAllowGravity(false);
        this.demon.setScale(0.037,0.037); // Escalar a ojo los personajes

        // añadimos los personajes al contenedor
        this.charactersContainer.add([this.exorcist, this.demon])
        
        // Colliders 
        this.physics.add.collider(this.exorcist, this.demon, this.hitGround, null, this); // LLama a la función "hitGround" cuando colisionan

        // OBJETOS
        // Crear velas
        this.candles = this.physics.add.group(); // Grupo para las velas
        this.generateCandles(5, background.width, background.height); // Generar 5 velas
        
        // Texto de contador e icono en la esquina superior izquierda de las velas 
        this.candleText = this.add.text(20, 20, 'Velas: 0', { fontSize: '30px', color: '#fff' }).setScrollFactor(0);
        this.candleIcon = this.add.image(200, 30, 'candle').setScale(0.1).setVisible(false).setScrollFactor(0);

        // Configurar teclas - pulsar E para recoger vela - SOLO EXORCISTA
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey('E');

        // Detectar colisiones con velas
        this.physics.add.overlap(this.exorcist, this.candles, this.collectCandle, null, this);


        


        
        // CONTROLES PERSONAJES
        this.setupPaddleControllersExorcist();
        this.setupPaddleControllersDemon();

        // DIVIDER PANTALLA
        // Añadir la imagen del marco en el centro de la pantalla
        const divider = this.add.image(this.scale.width / 2, this.scale.height / 2, 'divider')
        .setOrigin(0.5, 0.5); // Centra la imagen en ambos ejes
        divider.setDepth(1); // Asegura que la imagen esté por encima de otros elementos

        // CREACIÓN DE LAS CÁMARAS:
        // Primera cámara que sigue al exorcista
        this.cameras.main.setSize(this.scale.width / 2, this.scale.height)
        this.cameras.main.startFollow(this.exorcist)
        this.cameras.main.setZoom(zoomCamara)
        
        // Segunda cámara que sigue al demonio
        const scndCamera = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height, false, 'demonCamera')
        scndCamera.startFollow(this.demon)
        scndCamera.setZoom(zoomCamara)
        
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
        marcoCamera.ignore([this.charactersContainer, this.bgContainer])

        

    }    

    /**
     * Genera las velas en posiciones aleatorias.
     * @param {number} count - Número de velas a generar.
     * @param {number} maxWidth - Ancho máximo del mapa.
     * @param {number} maxHeight - Alto máximo del mapa.
     */

    // CREACIÓN ALEATORIA DE VELAS
    generateCandles(count, maxWidth, maxHeight) {
        const minDistance = 100; // Distancia mínima entre velas
        const positions = []; // Para almacenar las posiciones ya usadas
    
        // Dimensiones ajustadas según la escala del fondo
        const adjustedWidth = maxWidth * this.bgContainer.scaleX;
        const adjustedHeight = maxHeight * this.bgContainer.scaleY;
    
        for (let i = 0; i < count; i++) {
            let x, y, validPosition;
    
            do {
                validPosition = true;
    
                // Generar coordenadas aleatorias dentro del área ajustada
                x = Phaser.Math.Between(0, adjustedWidth);
                y = Phaser.Math.Between(0, adjustedHeight);
    
                // Verificar que la posición no esté demasiado cerca de otras velas
                for (let pos of positions) {
                    const distance = Phaser.Math.Distance.Between(x, y, pos.x, pos.y);
                    if (distance < minDistance) {
                        validPosition = false;
                        break;
                    }
                }
            } while (!validPosition);
    
            // Guardar la posición y crear la vela
            positions.push({ x, y });
            const candle = this.candles.create(x, y, 'candle');
    
            // Configuración de la vela
            candle.setOrigin(0.5, 0.5)
                  .setScale(0.1, 0.1)
                  .setCollideWorldBounds(true)
                  .setImmovable(true); // Evitar que se mueva por colisiones
            
            candle.body.setAllowGravity(false); // Desactiva la gravedad
        }
    }
    
    // RECOGER VELA
    collectCandle(exorcist, candle) {
        if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            candle.destroy(); // Eliminar la vela del mapa
            this.candleCount++; // Aumentar el contador
            this.candleText.setText(`Velas: ${this.candleCount}`); // Actualizar el texto
            this.candleIcon.setVisible(true); // Mostrar el icono
        }
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
        this.scene.stop("GameScene");
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