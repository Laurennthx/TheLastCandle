class UserScene extends Phaser.Scene {
    constructor(){
        super({key: 'UserScene'});

    }

    preload(){
        this.load.image("userBG", 'assets/UI/userAccount.png');
        this.load.image("bQuit", 'assets/UI/quit.png');
        
    }


    create(){

        // inmagen de fondo
        const backgroundMenu = this.add.image(0,0, "userBG").setOrigin(0,0);
        backgroundMenu.setDisplaySize(1920, 1080);


        // boton quit
        const signUp_button = this.add.image(530, 950, "bQuit")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("UserScene");
            this.scene.start("MenuScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        signUp_button.setScale(0.5,0.5);

        // boton quit
        const signIn_button2 = this.add.image(1390, 950, "bQuit")
        .setInteractive()
        .on('pointerdown', () => {
            this.sound.play("select");
            this.scene.stop("UserScene");
            this.scene.start("MenuScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        signIn_button2.setScale(0.5,0.5);
    }

    update(){}



}

