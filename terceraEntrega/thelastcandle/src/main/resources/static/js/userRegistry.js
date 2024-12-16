class UserScene extends Phaser.Scene {
    constructor(){
        super({key: 'UserScene'});

    }

    preload(){
        this.load.image("userBG", 'assets/UI/userAccount.png');
        this.load.image("bSignIn", 'assets/UI/SignIn_Button.png');
        this.load.image("bSignUp", 'assets/UI/SignUp_Button.png');
        this.load.image("inputBG", 'assets/UI/User_Password.png');
        
    }


    create(){

        // inmagen de fondo
        const backgroundMenu = this.add.image(0,0, "userBG").setOrigin(0,0);
        backgroundMenu.setDisplaySize(1920, 1080);

        // Crear campos de texto
        const usernameFieldUp = this.createInputField(530, 730, 'Username');
        const passwordFieldUp = this.createInputField(530, 830, 'Password', true);
        const usernameFieldIn= this.createInputField(1390, 730, 'Username');
        const passwordFieldIn = this.createInputField(1390, 830, 'Password', true);
        
        // boton sign up
        const signUp_button = this.add.image(530, 950, "bSignUp")
        .setInteractive()
        .on('pointerdown', () => {
            const username = usernameFieldUp.getData('value');
            const password = passwordFieldUp.getData('value');
            console.log("Sign Up:", username, password);
            this.sound.play("select");
            this.scene.stop("UserScene");
            this.scene.start("MenuScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        signUp_button.setScale(0.7,0.7);

        // boton sign in
        const signIn_button = this.add.image(1390, 950, "bSignIn")
        .setInteractive()
        .on('pointerdown', () => {
            const username = usernameFieldIn.getData('value');
            const password = passwordFieldIn.getData('value');
            console.log("Sign In:", username, password);
            this.sound.play("select");
            this.scene.stop("UserScene");
            this.scene.start("MenuScene");   
        }).on('pointerover', () => {
            this.sound.play("hover"); // Reproduce sonido al pasar el cursor
        });  
        signIn_button.setScale(0.7,0.7);

        // Activar entrada de teclado
        this.input.keyboard.on('keydown', (event) => {
            this.handleKeyboardInput(event, usernameFieldUp, passwordFieldUp ,usernameFieldIn, passwordFieldIn);
        });
        

        // Variable para rastrear el campo de entrada actualmente activo
        this.currentField = null;
    }

    createInputField(x, y, placeholder, isPassword = false) {
        // Fondo del campo
        const inputBG = this.add.image(x, y, 'inputBG').setOrigin(0.5, 0.5).setScale(0.8);

        // Texto interactivo como "campo de entrada"
        const inputText = this.add.text(x, y, placeholder, {
            font: '24px Arial',
            color: '#000',
            backgroundColor: 'rgba(255, 255, 255, 0)',
        })
            .setOrigin(0.5, 0.5)
            .setPadding(10, 5)
            .setInteractive()
            .on('pointerdown', () => {
                this.currentField = inputText; // Hacer este campo activo
                if (inputText.getData('value') === undefined) {
                    inputText.setData('value', ''); // Inicializar valor
                }
                if (inputText.text === placeholder) {
                    inputText.setText(''); // Borrar placeholder
                }
            });

        inputText.setData('value', ''); // Inicializar valor vacío
        inputText.setData('isPassword', isPassword); // Indicar si es contraseña
        return inputText;
    }

    handleKeyboardInput(event, usernameFieldUp, passwordFieldUp,usernameFieldIn, passwordFieldIn) {
        if (this.currentField) {
            const value = this.currentField.getData('value');
            const isPassword = this.currentField.getData('isPassword');

            if (event.key === 'Backspace') {
                // Eliminar el último carácter
                const newValue = value.slice(0, -1);
                this.currentField.setData('value', newValue);
                this.currentField.setText(isPassword ? '*'.repeat(newValue.length) : newValue);
            } else if (event.key.length === 1) {
                // Añadir carácter
                const newValue = value + event.key;
                this.currentField.setData('value', newValue);
                this.currentField.setText(isPassword ? '*'.repeat(newValue.length) : newValue);
            }
        }
    }

    update(){}



}

