class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        // Carga la imagen de fondo para la pantalla de carga
        this.load.image('LoadingBG', 'assets/UI/Loading.jpg');

        // Mostrar la imagen de fondo
        this.load.once('filecomplete-image-LoadingBG', () => {
            this.add.image(this.scale.width / 2, this.scale.height / 2, 'LoadingBG')
                .setOrigin(0.5)
                .setDisplaySize(this.scale.width, this.scale.height);
        });

        // Carga los recursos necesarios de la siguiente escena
        this.load.image('exorcist', 'assets/Characters/exorcist.png');
        this.load.image('demon', 'assets/Characters/demon.png');
        this.load.image('divider', 'assets/UI/divider4.png');
        this.load.image('background', 'assets/House/CasaSinFondo.png');
        this.load.image('crucifix', 'assets/Objects/crucifix.png');
        this.load.image('candle', 'assets/Objects/velaApagada.png');
        this.load.image('star', 'assets/Objects/star.png');
    }

    create() {
        // Iniciar la escena del juego una vez terminada la carga
        this.scene.start('GameScene');
    }
}
