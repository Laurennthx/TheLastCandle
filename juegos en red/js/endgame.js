class EndGame extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    preload() {}

    create(data) {
        const remaining_bricks = data.remaining_bricks;

        const message = "You loose";

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
