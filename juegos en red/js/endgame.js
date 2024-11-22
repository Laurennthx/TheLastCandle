class EndGame extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    preload() {
        this.load.image("endGameImage", "assets/UI/endGame.png");
    }

    create(data) {

        // Imagen de fondo
        const background = this.add.image(0,0, "endGameImage").setOrigin(0,0);
        background.setDisplaySize(1920, 1080);

        const remaining_bricks = data.remaining_bricks;

        const message = "You lose";

        const messageText = this.add.text(400, 300, message + '\nClick to restart', {
            fontSize: '64px',
            fill: '#000000',
            align: 'center'
        }).setOrigin(-0.15,-0.2);

        this.input.once('pointerdown', () => {
            this.scene.start("MenuScene");
        });

    }

    update() {}

}
