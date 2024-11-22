class CreditsScene extends Phaser.Scene {
constructor() {
    super({ key: 'CreditsScene' });
    
}

preload() {
    this.load.audio("select", 'assets/select.mp3');
    this.load.audio("background", 'assets/8bit-music.mp3');
    
    this.load.image("CreditsBG", "assets/UI/creditos.jpg");
    this.load.image("back_button", "assets/UI/backBrown.png");
}

create() {

    // imagen de fondo
    const CreditsBG = this.add.image(0,0, "CreditsBG").setOrigin(0,0);
    CreditsBG.setDisplaySize(1920, 1080);


    // musica
    //this.bgMusic = this.sound.add('background');
    //this.bgMusic.loop = true;
    //this.bgMusic.play();

    // boton back
    const back_button = this.add.image(980, 1000, "back_button")
    .setInteractive()
    .on('pointerdown', () => {
        this.sound.play("select");
        this.scene.stop("CreditsScene");
        this.scene.start("MenuScene");   
    });
    back_button.setScale(0.4,0.4);

}

update() {}
}
