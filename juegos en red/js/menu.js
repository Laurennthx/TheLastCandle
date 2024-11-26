class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'MenuScene'});

    }

    preload(){
        this.load.image("menuBG", 'assets/UI/BGpersonajes.jpg');
        this.load.image("bStart", 'assets/UI/start.png');
        this.load.image("bOptions", 'assets/UI/options.png');
        this.load.image("bCredits", 'assets/UI/credits.png');
        this.load.image("bQuit", 'assets/UI/quit.png');
        this.load.image("CreditsBG", 'assets/UI/creditos.jpg');
    }


    create(){

        // inmagen de fondo
        const backgroundMenu = this.add.image(0,0, "menuBG").setOrigin(0,0);
        backgroundMenu.setDisplaySize(1920, 1080);

        // boton start
        const start_button = this.add.image(350, 450, "bStart")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("MenuScene");
            this.scene.start("LoadingScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        start_button.setScale(0.5,0.5);


        // boton options
        const options_button = this.add.image(350, 570, "bOptions")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("MenuScene");
            this.scene.start("OptionsScene");   
        });  
        options_button.setScale(0.5,0.5);

        // boton credits
        const credits_button = this.add.image(350, 690, "bCredits")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            // actualizar las escenas más tarde
            this.scene.stop("MenuScene");
            this.scene.start("CreditsScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        credits_button.setScale(0.5,0.5);

        // boton quit
        const quit_button = this.add.image(350, 810, "bQuit")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("MenuScene");
            this.scene.start("WelcomeScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        quit_button.setScale(0.5,0.5);
    }

    update(){}



}

