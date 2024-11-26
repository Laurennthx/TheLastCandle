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
        this.load.image('divider', 'assets/UI/divider5.png');

        // map
        this.load.image('background', 'assets/House/fondo3pentagonos.png')


        // crucifix
        this.load.image('crucifix', 'assets/Objects/crucifix.png')

        // velas
        this.load.image('candle', 'assets/Objects/velaApagada.png')
        this.load.image('candleOn', 'assets/Objects/velaEncendida.png')

        // estrellas de ritual 
        this.load.image('ritual', 'assets/Objects/star.png');

        // gradiente negro 
        this.load.image('gradiente', 'assets/Pruebas/gradiente.png');

        // interruptores
        this.load.image('switch_on', 'assets/Objects/switch_on.png');
        this.load.image('switch_off', 'assets/Objects/switch_off.png');

        // Caja de prueba para testear cosas
        this.load.image('block', 'assets/Pruebas/block.png')
        this.load.image('collider1_2', 'assets/House/collider1_2.png');

        // botón de return
        this.load.image('return', 'assets/UI/return.png');

        // textBox Exorcista gana
        this.load.image('textBoxExorcist', 'assets/UI/textBox.png');
        // textBox Demonio gana
        this.load.image('textBoxDemon', 'assets/UI/demonTextBox.png');

    }

    create() {
        // MUNDO
        const zoomCamara = 5
        const height = this.scale.height
        const width = this.scale.width

        // BOTÓN RETURN TO MENU
        // boton back
        const returnButton = this.add.image(1810, 40, "return")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("GameScene");
            this.scene.start("MenuScene");   
        });       
        returnButton.setScale(0.28,0.28);



        // MOVIMIENTO
        this.lastKeyExorcist
        this.lastKeyDemon
        this.keysPressedDe = [[[-1, 0], false], [[0, -1], false], [[0, 1], false], [[1, 0], false]]
        this.keysPressedEx = [[[-1, 0], false], [[0, -1], false], [[0, 1], false], [[1, 0], false]]
        this.speedDe = 200
        this.speedEx = 200

        const posInterruptores =
            [[2660, 1240], [6512, 1240], [816, 2176],
            [8698, 13040], [1542, 10940], [6190, 9139],
            [1906, 6976], [4440, 5451], [4734, 3677]]


        this.bgContainer = this.add.container(0, 0)
        // Crear el mapa como fondo, dimensiones: 9962 x 15522
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0)
        // Al meterlo dentro del 'container' para posicinarlo correctamente hay que tener en cuenta las dimensiones en píxeles del sprite background.
        // Otra manera es sacarlo del container y colocarlo en dimensiones de la pantalla 1990 x 1080
        const crucifix = this.add.image(100, 13000, 'crucifix').setOrigin(0, 0)


        // Ejemplo para que los personajes no puedan atravesar paredes
        this.walls = this.physics.add.group()
        this.walls.create(5000, 5000, 'block')
        const collider1 = this.createCollider(1737, 876, 6804, 144)
        const collider2 = this.createCollider(1744, 876, 120, 2720)
        const collider3 = this.createCollider(96, 1768, 1784, 168)
        const collider4 = this.createCollider(8360, 888, 168, 2582)
        const collider5 = this.createCollider(4016, 880, 124, 736)
        const collider6 = this.createCollider(5648, 880, 124, 736)
        const collider7 = this.createCollider(4016, 2980, 128, 444)
        const collider8 = this.createCollider(5648, 2980, 128, 444)
        const collider9 = this.createCollider(1740, 3288, 615, 138)
        const collider10 = this.createCollider(3234, 3288, 2898, 138)
        const collider11 = this.createCollider(7023, 3288, 1506, 138)
        const collider12 = this.createCollider(98, 1778, 140, 8902)
        const collider13 = this.createCollider(7762, 3316, 148, 9750)
        const collider14 = this.createCollider(982, 5072, 5898, 182)
        const collider15 = this.createCollider(1732, 4927, 150, 329)
        const collider16 = this.createCollider(6700, 5074, 178, 3808)
        const collider17 = this.createCollider(5802, 8680, 1078, 202)
        const collider18 = this.createCollider(2619, 8680, 2136, 202)
        const collider19 = this.createCollider(92, 8680, 1352, 202)
        const collider20 = this.createCollider(92, 6608, 3880, 158)
        const collider21 = this.createCollider(3839, 6608, 142, 300)
        const collider22 = this.createCollider(3839, 8392, 142, 484)
      
        const collider24 = this.createCollider(2945, 10496, 739, 223)
        const collider25 = this.createCollider(3534, 10494, 158, 528)     
        const collider28 = this.createCollider(3557, 12294, 132, 2899)
        const collider29 = this.createCollider(3546, 15005, 6150, 199)
        const collider30 = this.createCollider(9569, 12632, 145, 2562)
        const collider31 = this.createCollider(7307, 12617, 2406, 218)
        const collider32 = this.createCollider(7758, 14429, 151, 776)
        const collider33 = this.createCollider(5051, 12609, 1351, 234)
        const collider34 = this.createCollider(1290, 12608, 2876, 168)
        const collider35 = this.createCollider(1274, 10489, 170, 2286)
        const collider36 = this.createCollider(100, 10489, 1776, 193)



        // COLLIDERS
        // ritual 1
        const ritual1 = this.createCollider(512, 7843, 473, 473); // (pos x, pos y, ancho, alto)
        // ritual 2
        const ritual2 = this.createCollider(8540, 14048, 473, 473); // (pos x, pos y, ancho, alto)
        // ritual 3
        const ritual3 = this.createCollider(4679, 2332, 473, 473); // (pos x, pos y, ancho, alto)

        this.rituals = [ritual1, ritual2, ritual3]; // Lista de colliders de rituales

        // Aplicar setImmovable a todos los objetos en el grupo
        this.walls.children.iterate(function (child) {
            child.setImmovable(true);
        });

        //CONTENEDOR HABITACIONES
        this.roomsContainer = this.add.container(0.0);

        this.bedroom1 = this.add.rectangle(1001.5,3870,1495,2390);
        this.bedroom2 = this.add.rectangle(2934,2545.5,2130,1471);
        this.bedroom3 = this.add.rectangle(7056,2539,2566,1496);
        this.bathroom1 = this.add.rectangle(4886.5,2533,1471,1458);
        this.bathroom2 = this.add.rectangle(2512,12016.5,2124,1205);
        this.kitchen = this.add.rectangle(5341.5,7329.5,2723,2693);
        this.diningRoom = this.add.rectangle(2030,8084.5,3564,1175);
        this.storageRoom = this.add.rectangle(8738,14278,1634,1520);
        this.livingRoom = this.add.rectangle(5704,11096.5,4048,2977);
        this.hall = this.add.rectangle(1968.5,10037,3455,872);

        this.roomsContainer.add([this.bedroom1,this.bedroom2,this.bedroom3,this.bathroom1,this.bathroom2,this.kitchen,this.diningRoom,this.storageRoom,this.livingRoom,this.hall]);
        const escala = this.scale.height / background.height
        this.roomsContainer.setScale(escala);

        // Poner los interruptores
        this.interruptoresOn = this.physics.add.group(); // Grupo para los interruptores
        this.interruptoresOff = this.physics.add.group(); // Grupo para los interruptores
        this.ponerInterruptores(posInterruptores)

        this.bgContainer.add([background, crucifix, ...this.walls.getChildren(), ...this.interruptoresOn.getChildren(), ...this.interruptoresOff.getChildren()])
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
        this.exorcist.setScale(0.02, 0.02);

        // Demonio 
        this.demon = this.physics.add.sprite(400, 1000, 'demon');
        this.demon.setCollideWorldBounds(true);
        this.demon.body.setImmovable(false);
        this.demon.setScale(0.025, 0.025); // Escalar a ojo los personajes

        // Añadimos los personajes al contenedor
        this.charactersContainer.add([this.exorcist, this.demon])
        // #endregion


        // OBJETOS
        // Crear velas
        this.candles = this.physics.add.group(); // Grupo para las velas
        this.generateCandles(5, background.width, background.height); // Generar 3 velas

        // Texto de contador e icono en la esquina superior izquierda de las velas 
        this.candleText = this.add.text(20, 20, 'Candles: 0', { fontSize: '30px', color: '#fff' }).setScrollFactor(0);
        this.candleIcon = this.add.image(245, 35, 'candle').setScale(0.05).setVisible(false).setScrollFactor(0);

        // Texto de contador e icono en la esquina superior izquierda de los rituales 
        this.ritualText = this.add.text(20, 60, 'Completed Rituals: 0', { fontSize: '30px', color: '#fff' }).setScrollFactor(0);
        this.ritualIcon = this.add.image(400, 60, 'candleOn').setScale(0.05).setVisible(false).setScrollFactor(0);

        // MATAR AL DEMONIO
        this.killDemon = this.add.image(480, 900, "textBoxExorcist")
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play("select");
                this.scene.stop("gameScene");
                this.scene.start("ExorcistWinsScene");   
            });       
        this.killDemon.setScale(0.4, 0.4);
        this.killDemon.setVisible(false);

        // MATAR AL EXORCISTA
        this.killExorcist = this.add.image(1480, 900, "textBoxDemon")
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play("select");
                this.scene.stop("gameScene");
                this.scene.start("EndScene");   
            });       
        this.killExorcist.setScale(0.4, 0.4);
        this.killExorcist.setVisible(false);


        // Configurar teclas - pulsar E para recoger vela - SOLO EXORCISTA
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey('E');
        this.interactKeyDe = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // Detectar colisiones con velas
        this.physics.add.overlap(this.exorcist, this.candles, this.collectCandle, null, this);
        // Detectar colisiones con rituales
        this.physics.add.overlap(this.exorcist, this.rituals, this.placeCandle, null, this);
        // Detectar colisiones con interruptores
        this.physics.add.overlap(this.exorcist, this.interruptoresOn, this.cambiarInterruptores, null, this);
        this.physics.add.overlap(this.demon, this.interruptoresOn, this.cambiarInterruptores, null, this);
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

        // #region LIGHTS 
        this.lights.enable();
        this.lights.setAmbientColor(0xffffff);  // Luces ambientales blancas para así no atenuar el fondo
        this.rLight = 70    // Radio de las luces indicadoras de los interruptores
        this.cd = 3000  // Cooldown de 3 segundos

        this.lucesEncendidas = false
        this.cooldownLuces = false

        // Radios del gradiente
        this.vScaleSmall = 0.18
        this.vScaleBig = 0.3

        // Definir los campos de visión de los jugadores; el gradiente negro que hay alrededor de ellos
        this.visionAreaEx = this.add.image(this.exorcist.x, this.exorcist.y, 'gradiente').setOrigin(0.5, 0.5)
        this.visionAreaEx.setScale(this.vScaleSmall, this.vScaleSmall)
        this.visionAreaDe = this.add.image(this.demon.x, this.demon.y, 'gradiente').setOrigin(0.5, 0.5)
        this.visionAreaDe.setScale(this.vScaleBig, this.vScaleBig)

        // Indicar a qué objetos les afecta la luz
        background.setPipeline('Light2D')
        //this.visionAreaDe.setPipeline('Light2D')
        //this.visionAreaEx.setPipeline('Light2D')

        // Arrays de luces que se encienden encima de los interruptores para indicar que pueden ser pulsados
        this.lucesEx = this.ponerLuces(posInterruptores, 0xb8afd0)  // Las luces indicadores del ex. son blancas
        this.lucesDe = this.ponerLuces(posInterruptores, 0xff8e0d)  // Las luces indicadoras del dem. son naranjas
        this.lucesEx.forEach(luz => {
            luz.setPosition(luz.x * escala, luz.y * escala) // Ajustar la posición de las luces
            luz.setRadius(0)
        })
        this.lucesDe.forEach(luz => {
            luz.setPosition(luz.x * escala, luz.y * escala) // Ajustar la posición de las luces
        })

        this.cambiarInterruptores() // Función que cuando los jugadores interactuan con el interruptor cambian las luces
        // #endregion


        // #region CAMERA
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

        // Indicar qué luces son visibles para cada personaje
        this.lucesEx.forEach(luzEx => {
            scndCamera.ignore(luzEx)
        })
        this.lucesDe.forEach(luzDe => {
            this.cameras.main.ignore(luzDe)
        })
        // La tercera cámara debe ignorar todos los sprites XD
        marcoCamera.ignore([this.charactersContainer, this.bgContainer, this.candles, this.visionAreaEx, this.visionAreaDe])

        // #endregion


    }


    // MÉTODO CREACIÓN DE COLLIDERS
    createCollider(x, y, width, height) {
        const collider = this.walls.create(x, y, 'block').setOrigin(0, 0)
        collider.alpha = 0
        collider.displayWidth = width
        collider.displayHeight = height
        return collider
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
        const rooms = [this.bedroom1,this.bedroom2,this.bedroom3,this.bathroom1,this.bathroom2,this.kitchen,this.diningRoom,this.storageRoom,this.livingRoom,this.hall]
        // Dimensiones ajustadas según la escala del fondo
        const adjustedWidth = maxWidth * this.bgContainer.scaleX;
        const adjustedHeight = maxHeight * this.bgContainer.scaleY;

        for (let i = 0; i < count; i++) {
            let x, y, validPosition;

            // Generar coordenadas aleatorias dentro de habitaciones (sin usar contenedor)
            //fuera del do porque estaba probando todavia sin guardar posiciones ya usadas
            /*const randomRoom = Phaser.Utils.Array.GetRandom(rooms);

            x = randomRoom.x + Phaser.Math.Between(-randomRoom.width / 2, randomRoom.width / 2);
            y = randomRoom.y + Phaser.Math.Between(-randomRoom.height / 2, randomRoom.height / 2);*/

            do {
                validPosition = true;

                // Generar coordenadas aleatorias dentro del área ajustada (sin habitaciones)
                x = Phaser.Math.Between(0, adjustedWidth);
                y = Phaser.Math.Between(0, adjustedHeight);

                // Generar coordenadas aleatorias dentro de habitaciones (con contenedor)
                /*const randomIndex = Phaser.Math.Between(0, roomsContainer.list.length - 1);
                const randomRoom = roomsContainer.list[randomIndex];
            
                const candleX =  randomRoom.x + Phaser.Math.Between(-randomRoom.width / 2, randomRoom.width / 2);
                const candleY = randomRoom.y + Phaser.Math.Between(-randomRoom.height / 2, randomRoom.height / 2);*/
                
                
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
                .setScale(0.013, 0.013)
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
                ).setScale(0.013); // Ajustar el tamaño si es necesario

                // Reducir el número de velas disponibles
                this.candleCount--;
                this.candleText.setText(`Candles: ${this.candleCount}`); // Actualizar el texto

                // Incrementar el contador de rituales
                this.ritualCount++;
                this.ritualText.setText(`Completed Rituals: ${this.ritualCount}`); // Actualizar el texto de rituales
                this.ritualIcon.setVisible(true); // Mostrar el icono

                // Desactivar el ritualCollider para evitar múltiples activaciones
                ritualCollider.active = false; // Desactiva el collider para futuras colisiones

                // Llama al método para verificar rituales
                this.checkCompletedRituals();
            } 
        }
    }

    // COMPROBAR NUMERO RITUALES - MATAR DEMONIO
    // comprueba el numero de rituales y da la opción de matar al demonio 
    checkCompletedRituals() {
        if (this.ritualCount == 3) { // Si se completaron 3 rituales
            console.log("All 3 rituals completed! Activating the text box.");
            this.killDemon.setVisible(true); // Activa la caja de texto
        }
    }
    
    ponerInterruptores(posiciones) {
        const scale = 0.5
        for (let i = 0; i < posiciones.length; i++) {
            const switchOn = this.interruptoresOn.create(posiciones[i][0], posiciones[i][1], 'switch_on').setOrigin(0, 0)
            switchOn.setScale(scale, scale).setImmovable(true)
            const switchOff = this.interruptoresOff.create(posiciones[i][0], posiciones[i][1], 'switch_off').setOrigin(0, 0)
            switchOff.setScale(scale, scale).setImmovable(true).alpha = 0
        }
    }

    // USAR INTERRUPTOR
    cambiarInterruptores(player, interruptor) {
        if (interruptor != undefined) {
            if (player == this.exorcist) {
                if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
                    if (!this.lucesEncendidas) {
                        this.encenderLuces()
                    }
                }
            }
            if (player == this.demon) {
                if (Phaser.Input.Keyboard.JustDown(this.interactKeyDe)) {
                    if (this.lucesEncendidas) {
                        this.apagarLuces()
                    }
                }
            }

        }
    }

    // El demonio llama a esta función para apagar las luces
    apagarLuces() {
        if (this.cooldownLuces == false) {
            this.cooldownLuces = true
            this.visionAreaEx.setScale(this.vScaleSmall, this.vScaleSmall)
            this.visionAreaDe.setScale(this.vScaleBig, this.vScaleBig)

            this.interruptoresOn.children.iterate(function (child) {
                child.alpha = 0;
            });
            this.interruptoresOff.children.iterate(function (child) {
                child.alpha = 1;
            });

            this.lucesDe.forEach(luz => {
                luz.setRadius(0)
            })

            this.time.delayedCall(this.cd, () => { // Al terminar el cooldown se enciende un indicador para el exorcista
                this.lucesEncendidas = false
                this.lucesEx.forEach(luz => {
                    luz.setRadius(this.rLight)
                })
                this.cooldownLuces = false
            })
        }
    }

    // El exorcista llama a esta función para encender las luces
    encenderLuces() {
        if (this.cooldownLuces == false) {
            this.cooldownLuces = true
            this.visionAreaEx.setScale(this.vScaleBig, this.vScaleBig)
            this.visionAreaDe.setScale(this.vScaleSmall, this.vScaleSmall)

            this.interruptoresOn.children.iterate(function (child) {
                child.alpha = 1;
            });
            this.interruptoresOff.children.iterate(function (child) {
                child.alpha = 0;
            });

            this.lucesEx.forEach(luz => {
                luz.setRadius(0)
            })

            this.time.delayedCall(this.cd, () => { // Al terminar el cooldown se enciende un indicador para el demonio
                this.lucesEncendidas = true
                this.lucesDe.forEach(luz => {
                    luz.setRadius(this.rLight)
                })
                this.cooldownLuces = false
            })
        }
    }

    ponerLuces(posiciones, color) {
        const arrLuces = []
        for (let i = 0; i < posiciones.length; i++) {
            arrLuces[i] = this.lights.addLight(posiciones[i][0] + 150, posiciones[i][1] + 100, 70, color, 2);
        }
        return arrLuces
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
        this.killExorcist.setVisible(true);
    }

    startGame() {
        this.gameStarted = true;
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