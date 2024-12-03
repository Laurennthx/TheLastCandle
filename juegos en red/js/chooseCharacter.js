class ChoosingCharacterScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChoosingCharacterScene' });
    }
    
    preload() {
        this.load.audio("select", 'assets/select.mp3');
        this.load.audio("background", 'assets/8bit-music.mp3');
    
        this.load.image("chooseCharacterBG", "assets/UI/chooseCharacter.png");
        this.load.image("chooseDemon", "assets/UI/chooseDemon.png");
        this.load.image("chooseExorcist", "assets/UI/chooseExorcist.png");
        this.load.image("chooseRandom", "assets/UI/chooseRandom.png");
        
        this.load.image("continue", "assets/UI/continue.png");
        this.load.image("return", "assets/UI/return.png");
    }
    
    create() {
        // Imagen de fondo
        const chooseCharacterMenu = this.add.image(0, 0, "chooseCharacterBG").setOrigin(0, 0);
        chooseCharacterMenu.setDisplaySize(1920, 1080);

        // Boton back
        const back_button = this.add.image(800, 955, "return")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("ChoosingCharacterScene");
            this.scene.start("MenuScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        back_button.setScale(0.4,0.4);

        // Boton continue
        const continue_button = this.add.image(1150, 962, "continue")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("ChoosingCharacterScene");
            this.scene.start("TutorialScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        continue_button.setScale(0.75,0.75);
    }
    
    update() {
    }
}