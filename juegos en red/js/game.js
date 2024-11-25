class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.candleCount = 0; // Contador de velas en el inventario
        this.ritualCount = 0; // Contador de rituales completados

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
        this.load.image('background', 'assets/House/fondo3pentagonos.png')
        

        // crucifix
        this.load.image('crucifix', 'assets/Objects/crucifix.png')

        // velas
        this.load.image('candle', 'assets/Objects/velaApagada.png')
        this.load.image('candleOn', 'assets/Objects/velaEncendida.png')

        // estrellas de ritual 
        this.load.image('ritual', 'assets/Objects/star.png');

        // estrellas de ritual 
        this.load.image('gradiente', 'assets/Pruebas/gradiente.png');

        // Caja de prueba para testear cosas
        this.load.image('block', 'assets/Pruebas/block.png')
        this.load.image('collider1_2','assets/House/collider1_2.png');

    }

    create() {


        // Enable lights in the scene
        this.lights.enable();
        this.lights.setAmbientColor(0x222222);
        this.lucesEncendidas = true


        // MUNDO
        const zoomCamara = 4.5
        const height = this.scale.height
        const width = this.scale.width

        // MOVIMIENTO
        this.lastKeyExorcist
        this.lastKeyDemon
        this.keysPressedDe = [[[-1, 0], false], [[0, -1], false], [[0, 1], false], [[1, 0], false]]
        this.keysPressedEx = [[[-1, 0], false], [[0, -1], false], [[0, 1], false], [[1, 0], false]]
        this.speedDe = 200
        this.speedEx = 200

        this.bgContainer = this.add.container(0, 0)
        // Crear el mapa como fondo, dimensiones: 9962 x 15522
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0)
        // Al meterlo dentro del 'container' para posicinarlo correctamente hay que tener en cuenta las dimensiones en píxeles del sprite background.
        // Otra manera es sacarlo del container y colocarlo en dimensiones de la pantalla 1990 x 1080
        const crucifix = this.add.image(100, 13000, 'crucifix').setOrigin(0, 0)


        // Ejemplo para que los personajes no puedan atravesar paredes
        this.walls = this.physics.add.group()
        this.walls.create(5000, 5000, 'block')
        this.walls.create(5150, 950, 'collider1_2')

        // COLLIDERS
        // ritual 1
        const ritual1 = this.createCollider(512, 7843, 473, 473); // (pos x, pos y, alto, ancho)
        // ritual 2
        const ritual2 = this.createCollider(8540, 14048, 473, 473); // (pos x, pos y, alto, ancho)
        // ritual 3
        const ritual3 = this.createCollider(4679, 2332, 473, 473); // (pos x, pos y, alto, ancho)

        this.rituals = [ritual1, ritual2, ritual3]; // Lista de colliders de rituales

        // Aplicar setImmovable a todos los objetos en el grupo
        this.walls.children.iterate(function (child) {
            child.setImmovable(true);
        });


        this.bgContainer.add([background, crucifix, ...this.walls.getChildren()])
        const escala = this.scale.height / background.height
        this.bgContainer.setScale(escala)

        // Establecer los límites del mundo según el tamaño del mapa
        this.physics.world.setBounds(0, 0, background.width * escala, height);


        // #region ***** CREACION DE PERSONAJES *****
        // Contenedor de personajes
        this.charactersContainer = this.add.container(0, 0)

        // Exorcista
        this.exorcist = this.physics.add.sprite(400, 530, 'exorcist');
        this.exorcist.setCollideWorldBounds(true);
        this.exorcist.body.setImmovable(false);
        this.exorcist.setScale(0.03, 0.03);

        // Demonio 
        this.demon = this.physics.add.sprite(800, 650, 'demon');
        this.demon.setCollideWorldBounds(true);
        this.demon.body.setImmovable(false);
        this.demon.setScale(0.037, 0.037); // Escalar a ojo los personajes

        // Añadimos los personajes al contenedor
        this.charactersContainer.add([this.exorcist, this.demon])
        // #endregion


        // OBJETOS
        // Crear velas
        this.candles = this.physics.add.group(); // Grupo para las velas
        this.generateCandles(5, background.width, background.height); // Generar 5 velas

        
        
        // Texto de contador e icono en la esquina superior izquierda de las velas 
        this.candleText = this.add.text(20, 20, 'Candles: 0', { fontSize: '30px', color: '#fff' }).setScrollFactor(0);
        this.candleIcon = this.add.image(245, 35, 'candle').setScale(0.05).setVisible(false).setScrollFactor(0);

        // Texto de contador e icono en la esquina superior izquierda de los rituales 
        this.ritualText = this.add.text(20, 60, 'Completed Rituals: 0', { fontSize: '30px', color: '#fff' }).setScrollFactor(0);
        this.ritualIcon = this.add.image(400, 60, 'candleOn').setScale(0.05).setVisible(false).setScrollFactor(0);

        // Configurar teclas - pulsar E para recoger vela - SOLO EXORCISTA
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey('E');

        // Detectar colisiones con velas
        this.physics.add.overlap(this.exorcist, this.candles, this.collectCandle, null, this);
        // Detectar colisiones con rituales
        this.physics.add.overlap(this.exorcist, this.rituals, this.placeCandle, null, this);
        // Collider del exorcista con el demonio, se podría quitar 
        this.physics.add.collider(this.exorcist, this.demon, this.hitGround, null, this); // LLama a la función "hitGround" cuando colisionan
        // Activar colisión entre las paredes y el exorcista
        this.physics.add.collider(this.exorcist, this.walls)
        // Activar colisión entre las paredes y el exorcista
        this.physics.add.collider(this.demon, this.walls)



        // CONTROLES PERSONAJES
        this.setupPaddleControllersExorcist();
        this.setupPaddleControllersDemon();

        // DIVIDER PANTALLA
        // Añadir la imagen del marco en el centro de la pantalla
        const divider = this.add.image(this.scale.width / 2, this.scale.height / 2, 'divider')
            .setOrigin(0.5, 0.5); // Centra la imagen en ambos ejes
        divider.setDepth(1); // Asegura que la imagen esté por encima de otros elementos

        // #region ***** INTERRUPTORES *****
        this.vScaleSmall = 0.3
        this.vScaleBig = 0.5


        this.visionAreaEx = this.add.image(this.exorcist.x, this.exorcist.y, 'gradiente').setOrigin(0.5, 0.5)
        this.visionAreaEx.setScale(this.vScaleBig, this.vScaleBig)

        this.visionAreaDe = this.add.image(this.demon.x, this.demon.y, 'gradiente').setOrigin(0.5, 0.5)
        this.visionAreaDe.setScale(this.vScaleBig, this.vScaleBig)

        




        // #endregion






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
        this.cameras.main.ignore([this.visionAreaDe, divider])
        scndCamera.ignore([this.visionAreaEx, divider])
        // La tercera cámara debe ignorar todos los sprites XD
        marcoCamera.ignore([this.charactersContainer, this.bgContainer, this.candles, this.visionAreaEx, this.visionAreaDe])

    

    }


    // MÉTODO CREACIÓN DE COLLIDERS
    createCollider(x, y, width, height){
        const collider = this.walls.create(x, y, 'block').setOrigin(0,0)
        collider.alpha = 0
        collider.displayWidth = width
        collider.displayHeight = height        
        return collider
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
                .setScale(0.02, 0.02)
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
            this.candleText.setText(`Candles: ${this.candleCount}`); // Actualizar el texto
            this.candleIcon.setVisible(true); // Mostrar el icono
        }
    }

    // COMPLETAR UN RITUAL
// Método para colocar una vela en un ritual
placeCandle(exorcist, ritualCollider) {
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        // Verificar si hay velas disponibles
        if (this.candleCount > 0) {
            // Obtener las coordenadas centrales del ritualCollider
            const bounds = ritualCollider.getBounds();
            const candle = this.add.sprite(
                bounds.centerX - 1, // Coordenada X central ajustada
                bounds.centerY - 7, // Coordenada Y central ajustada
                'candleOn' // Textura de la vela
            ).setScale(0.015); // Ajustar el tamaño si es necesario

            // Reducir el número de velas disponibles
            this.candleCount--;
            this.candleText.setText(`Candles: ${this.candleCount}`); // Actualizar el texto

            // Incrementar el contador de rituales
            this.ritualCount++;
            this.ritualText.setText(`Completed Rituals: ${this.ritualCount}`); // Actualizar el texto de rituales
            this.ritualIcon.setVisible(true); // Mostrar el icono

            // Desactivar el ritualCollider para evitar múltiples activaciones
            ritualCollider.active = false; // Desactiva el collider para futuras colisiones
            // ritualCollider.destroy(); // Alternativamente, elimina el collider del mundo
        } else {
            // Opcional: Notificar al jugador que no tiene suficientes velas
            console.log("You need a candle to complete the ritual!");
        }
    }
}

    
    

    setupPaddleControllersDemon() {
        // Key down
        this.input.keyboard.on('keydown-LEFT', () => {
            this.keysPressedDe[0][1] = true
            this.lastKeyDemon = 0
        });
        this.input.keyboard.on('keydown-UP', () => {
            this.keysPressedDe[1][1] = true
            this.lastKeyDemon = 1
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.keysPressedDe[2][1] = true
            this.lastKeyDemon = 2
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
            this.keysPressedDe[3][1] = true
            this.lastKeyDemon = 3
        });

        // Key up
        this.input.keyboard.on('keyup-LEFT', (event) => {
            this.keysPressedDe[0][1] = false
        });
        this.input.keyboard.on('keyup-UP', (event) => {
            this.keysPressedDe[1][1] = false
        });
        this.input.keyboard.on('keyup-DOWN', (event) => {
            this.keysPressedDe[2][1] = false
        });
        this.input.keyboard.on('keyup-RIGHT', (event) => {
            this.keysPressedDe[3][1] = false
        });
    }

    setupPaddleControllersExorcist() {
        // Key down
        this.input.keyboard.on('keydown-A', () => {
            this.keysPressedEx[0][1] = true
            this.lastKeyExorcist = 0
        });
        this.input.keyboard.on('keydown-W', () => {
            this.keysPressedEx[1][1] = true
            this.lastKeyExorcist = 1
        });
        this.input.keyboard.on('keydown-S', () => {
            this.keysPressedEx[2][1] = true
            this.lastKeyExorcist = 2
        });
        this.input.keyboard.on('keydown-D', () => {
            this.keysPressedEx[3][1] = true
            this.lastKeyExorcist = 3
        });

        // Key up
        this.input.keyboard.on('keyup-A', (event) => {
            this.keysPressedEx[0][1] = false
        });
        this.input.keyboard.on('keyup-W', (event) => {
            this.keysPressedEx[1][1] = false
        });
        this.input.keyboard.on('keyup-S', (event) => {
            this.keysPressedEx[2][1] = false
        });
        this.input.keyboard.on('keyup-D', (event) => {
            this.keysPressedEx[3][1] = false
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
        this.demon.setVelocity(0, 0)
        for (let i = 0; i < this.keysPressedDe.length; i++) {
            if (this.keysPressedDe[i][1] == true) {
                this.demon.setVelocity(this.keysPressedDe[i][0][0] * this.speedDe, this.keysPressedDe[i][0][1] * this.speedDe)
                if (this.lastKeyDemon == i) break
            }
        }

        this.exorcist.setVelocity(0, 0)
        for (let i = 0; i < this.keysPressedEx.length; i++) {
            if (this.keysPressedEx[i][1] == true) {
                this.exorcist.setVelocity(this.keysPressedEx[i][0][0] * this.speedEx, this.keysPressedEx[i][0][1] * this.speedEx)
                if (this.lastKeyExorcist == i) break
            }
        }

        this.visionAreaEx.setPosition(this.exorcist.x, this.exorcist.y)
        this.visionAreaDe.setPosition(this.demon.x, this.demon.y)

    }
}