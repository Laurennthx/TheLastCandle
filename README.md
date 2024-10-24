# The Last Candle

**Desarrolladores - Grupo 10:**
- Javier Álvarez Pérez - j.alvarezp.2020@alumnos.urjc.es - https://github.com/JavierAlper
- Lucas García Marcos - l.garciamarc.2021@alumnos.urjc.es - https://github.com/Lololeifo
- Laura García Martín - l.garciamar.2021@alumnos.urjc.es - https://github.com/laurennthx 
- Cristina González De Lope - c.gonzalezde.2022@alumnos.urjc.es - https://github.com/crisstinagl
- André Miguel Pérez Sánchez - am.perezs.2021@alumnos.urjc.es - https://github.com/andremip

## Introducción
En este documento se detalla la concepción de nuestro proyecto de prácticas para la asignatura de juegos en red: ‘The Last Candle’. 

## Sinopsis y Concepto
The Last Candle se enmarca en el género de terror y combina elementos de escape room con la resolución de acertijos, generando una atmósfera de tensión y misterio. La dinámica principal enfrenta a dos jugadores, cada uno con objetivos opuestos para ganar la partida. Uno de los personajes, el exorcista, deberá escapar y liberar la casa de una maldición, mientras que el otro, un demonio, intentará evitarlo, asesinando al exorcista y perpetuando su permanencia en la casa.

El argumento del juego gira en torno a dos protagonistas: un exorcista y un demonio de gran poder. El demonio ha tomado control de una casa, la cual se encuentra maldita, y el exorcista ha sido contratado para liberar la casa en nombre de un cliente. Sin embargo, al ingresar, el exorcista se percata de que está atrapado dentro de la casa. Para sobrevivir, no solo deberá exorcizar al demonio, sino también resolver una serie de complicados acertijos que le permitirán escapar con vida. El demonio, por su parte, hará todo lo posible para impedir que el exorcista logre su misión, creando una experiencia intensa y llena de suspense.

## Historia y personajes
Una vez más, la niebla densa rodeaba la vieja mansión en la colina. Nadie recordaba quién había construido aquella casa, pero todos sabían lo que habitaba en su interior. La maldición había cobrado vida, y con ella, un demonio de poder inimaginable. Ningún alma valiente que había intentado purificarla había vuelto a salir… hasta ahora.

El exorcista fue llamado a la mansión por un cliente desesperado. Sabía que esta no sería una misión sencilla, pero lo que no imaginaba era la trampa mortal que le aguardaba. Al cruzar el umbral de la casa, las puertas se cerraron de golpe detrás de él, como si la propia mansión lo hubiera devorado. No había vuelta atrás.

Dentro, la atmósfera era opresiva, y el frío de la muerte flotaba en el aire. Voces susurraban desde las sombras, pero el exorcista sabía que no debía prestarles atención. Lo que importaba era una cosa: exorcizar al demonio que gobernaba este lugar. Sin embargo, pronto comprendió que no solo luchaba contra fuerzas oscuras, sino contra la propia casa.

El demonio, consciente de la presencia del exorcista, no se limitaba a observar desde las sombras. Con una sonrisa maliciosa, hacía que las paredes temblaran y las luces se apagaran. Se burlaba de cada paso en falso y disfrutaba al ver cómo el exorcista luchaba por su cordura, atrapado en un ciclo de caos e incertidumbre.

Pero el exorcista no estaba dispuesto a ceder. Armado no solo con oraciones y símbolos sagrados, sino con su astucia y una voluntad de hierro, comenzó a resolver los acertijos que la casa le lanzaba. Cada enigma descifrado lo acercaba más a la verdad oculta tras la maldición, pero también desataba la furia del demonio, quien redoblaba sus esfuerzos para mantener su control sobre la mansión y su prisionero.

La batalla entre los dos no era solo física, sino mental. Cada movimiento del exorcista desafiaba la autoridad del demonio, y cada trampa y juego macabro impuesto por el demonio ponía a prueba la fe y la determinación del exorcista.

Así comenzó una danza mortal entre la luz y la oscuridad, con la vida del exorcista colgando de un hilo.

## Mecánicas
### Recoger un crucifijo que aparece en un lugar aleatorio (Exorcista)
#### Objetivo
El crucifijo actúa como un ítem especial que aparece en una ubicación aleatoria tras cierto tiempo, otorgando al exorcista un "corazón extra" (aumento de vida o resistencia) cuando lo recoja. Esta mecánica aumenta la tensión, ya que el demonio también puede intentar bloquear su acceso.

#### Implementación
* **Algoritmo de aparición:** Crea un sistema que activa la aparición del crucifijo después de un tiempo específico. Usa un conjunto de puntos predefinidos distribuidos por el mapa en lugares estratégicos. El crucifijo aparecerá en uno de estos puntos de forma aleatoria.

* **Notificación al exorcista:** Cuando el crucifijo aparezca, se le puede mostrar una pista al exorcista (por ejemplo, un destello de luz en la dirección del crucifijo o un sonido sutil que aumente en intensidad al acercarse).

**Interacción del exorcista con el crucifijo**
* Al acercarse al crucifijo, aparecerá una notificación en pantalla (un ícono de interacción) para recogerlo.
* Al recogerlo, el exorcista gana un "corazón" extra (representado visualmente en su barra de vida o un aura protectora temporal). Este corazón adicional le dará una ventaja crucial al permitirle resistir un ataque adicional del demonio.

#### Feedback visual y sonoro
Cuando el exorcista recoge el crucifijo, se retroalimenta al jugador en respuesta a la acción que acaba realizar de diferentes maneras (elegiremos la más adecuada según el tiempo y los recursos). Algunos ejemplos: un brillo aparece alrededor de su personaje, sonido celestial o de campanas, indicando que ha recibido el "corazón" extra…

---

### Recoger velas escondidas por el mapa para completar el ritual (Exorcista) / Impedir que el exorcista acabe el ritual (Demonio)
#### Objetivo
El exorcista necesita encontrar y encender las velas repartidas por el mapa y llevarlas a la sala del ritual, un lugar donde el demonio no puede entrar, para poder iniciarlo y así ganar la partida. El demonio puede contrarrestar este objetivo al apagar las velas o impedir que sean recolectadas, dinámica de contrarreloj.

#### Implementación
**Distribución de las velas**
* Las velas están ocultas en diferentes habitaciones o puntos estratégicos del mapa, y algunas están bloqueadas por puzzles o trampas.
* El número total de velas puede ser un requisito para el ritual (por ejemplo, el exorcista necesita encontrar 5 velas para iniciar el ritual).
* Cada vez que el exorcista encuentra una vela, deberá encenderla (interacción que toma unos segundos) antes de recogerla, aumentando la tensión. Luego, deberá llevar las velas encendidas una por una hasta la sala del ritual.

**Mecánica de Tiempo Limitado**
* Para añadir más presión, una vez que el exorcista encuentra la primera vela, se puede activar una cuenta regresiva (por ejemplo, 5 minutos) durante la cual debe recoger todas las velas antes de que se apaguen.
* El demonio puede interactuar con las velas ya encendidas por el exorcista, apagándolas. Esto obligará al exorcista a volver a encenderlas y perder tiempo.

**Retroalimentación visual y auditiva**

Cada vez que el exorcista recoge o enciende una vela, puede sonar una música de fondo más intensa o generar una pequeña animación de luz. Si el demonio apaga una vela, se puede producir un sonido siniestro. De nuevo, elegiremos el tipo de retroalimentación en base al tiempo y los recursos que dispongamos.

---

### Encender y apagar la luz de la casa usando interruptores de las paredes
#### Objetivo
La mecánica de control de luz crea un contraste interesante entre los dos personajes: el exorcista necesita luz para ver el entorno completo, mientras que el demonio se beneficia de la oscuridad. Cuando el estado de la luz perjudique a un personaje, ese personaje tendrá una visión limitada favoreciendo la tensión del gameplay.

#### Implementación
**Sistema de interruptores**
* Los interruptores de luz están distribuidos por la casa en puntos clave (cerca de las entradas de las habitaciones, en pasillos largos, etc.).
* Ambos personajes pueden interactuar con los interruptores para encender o apagar la luz y ganar visibilidad de la zona, o reducirla.
* Tras interactuar con los interruptores, tendrán un cooldown de unos 3s para poder volver a cambiar el estado de la luz.

**Visibilidad reducida**
* Cuando el estado de las luces perjudique a un personaje, su campo de visión quedará limitado a un área pequeña a su alrededor. En el caso de que las luces les favorezcan, tendrán una visión clara de la zona.
* La visión del exorcista se reduce drásticamente en la oscuridad, haciéndolo más vulnerable a trampas o ataques sorpresa del demonio.
* Por el contrario, el demonio tiene mejor visión en la oscuridad, dándole una ventaja táctica cuando las luces están apagadas. 

#### Estrategia de juego
El exorcista debe gestionar cuándo y dónde encender las luces, ya que no puede controlar todas las áreas a la vez. El demonio puede apagar las luces estratégicamente en áreas donde sepa que el exorcista necesita trabajar en puzzles, aprovechando la oscuridad para emboscarlo. Como extra, se puede hacer que el fuego de las velas sea visible para ambos jugadores, independientemente del estado de la luz de las salas.

## Controles
Mientras que ambos personajes pueden moverse libremente por el espacio, cada uno puede llevar a cabos sus propias acciones al pulsar el botón de interactuar. Ambos tienen acciones relacionadas, como encender o apagar las velas y los interruptores y otras acciones descritas en las mecánicas. Sin embargo, el demonio también puede atacar al exorcista si está lo suficientemente cerca, causándole daño y dándole un instante para huir si le queda más de un corazón.

**Controles en modo local:**
* Jugador 1: WASD para moverse por el espacio y el ESPACIO para el resto de interacciones.
* Jugador 2: FLECHAS del teclado para moverse y el ENTER para el resto de interacciones.

**Controles en modo online:** ambos jugadores tendrán los mismos controles, siendo estos WASD para moverse y el ESPACIO para el resto de interacciones.

## Niveles y misiones
En este juego, no existen niveles convencionales (como nivel 1, nivel 2, etc.). En lugar de progresar a través de múltiples fases, toda la acción tiene lugar en una casa encantada. El jugador deberá completar la partida en esta misma pantalla, que funciona a modo de "escape room." El objetivo es resolver los acertijos y evitar ser atrapado por el demonio, o bien morir en el proceso. No hay transición a otros niveles, sólo el éxito al escapar o el fracaso al ser eliminado.
El juego se va a desarrollar en una única planta (más concretamente en la planta baja de una casa encantada) con diferentes habitaciones, escondites, acertijos y obstáculos. El exorcista y el demonio comenzarán la partida en una sala aleatoria, pero alejados el uno del otro. Se podrá distinguir la habitación principal, en la cual el exorcista deberá de reunir y colocar correctamente las velas pertenecientes al ritual. Además, en dicha estancia el demonio tendrá prohibida la entrada. El juego finalizará cuando el exorcista haya completado el ritual y haya matado al demonio, o, si por el contrario, el demonio encuentra al exorcista y acaba con su vida. 

* **Misión del exorcista:** deberá recoger cinco de las velas repartidas por la casa encantada, de la forma más sigilosa posible, para realizar el ritual satánico y lograr escapar de la casa acabando con el demonio. Para poder recoger algunas de las velas, tendrá que resolver los acertijos o puzzles planteados. Durante su travesía por la planta, deberá evitar hacer ruido al interactuar con los distintos objetos, ya que esto llamará la atención del demonio y tendrá más información de su localización para acudir en su búsqueda.

* **Misión del demonio:** deberá impedir que el exorcista recoja las velas, ya sea llevando a cabo persecuciones en las que podrá dañar su vida o situando trampas. También podrá apagar las velas, perjudicando la visión del exorcista al reducir la iluminación. Su misión principal es intentar matar al exorcista antes de que logre colocar las cinco velas, finalizando el ritual y acabando con su vida.


## Aspectos de negocio y distribución
### Estrategia de mercado
#### Público objetivo
El juego se encuentra dirigido a jugadores a partir de dieciséis años. Pese a que los gráficos contarán con una estética “cartoon”, el género en el que se encuentra, es decir, el terror, atrae a jugadores de edades más altas, los cuales disfrutan del suspense propio del mismo. 
A su vez, se podría encasillar en un PEGI 16. Esto es debido a la violencia presente en las interacciones entre el demonio y el exorcista, así como la alta tensión en determinadas ocasiones dentro del “gameplay”, destacando en esta última la poca iluminación, sumada a la dificultad y rapidez con la que tendrá que actuar el jugador si quiere permanecer vivo.
El propósito del juego es el entretenimiento. Los aspectos comentados proporcionarán un gran interés en el juego proveniente de jugadores experimentados en el género, dado que tiene aspectos similares a grandes videojuegos como “Don't Starve Together” o “Dead by Daylight”, entre otros.

#### Tecnología y plataforma
Su desarrollo se diseñará e implementará mediante JavaScript. 
El juego estará diseñado para ejecutarse en el navegador, a través de una red de ordenadores que cuenten con el sistema operativo de Windows.

#### Modelo de negocio
Se ha decidido que el juego cuente con un modelo de negocio mixto. Implementarán anuncios dentro del mismo, en algunos casos haciendo que el jugador obtenga beneficios al verlos, propio de un modelo de negocio “shareware”. Además, se utilizará el modelo de negocio “freemium”, ya que se ofrecerá contenido adicional para la personalización de los personajes y/o accesorios. Por último, se encontrará disponible la opción de donación para aquellos que decidan apoyar el desarrollo del videojuego, implementando así un modelo de negocio “donationware”.

## Apartado Artístico

### Estilo visual y referencias
El videojuego presentará un estilo 2D con perspectiva top-down, usada por videojuegos como Among Us, lo cual permitirá al jugador obtener una visión clara y estratégica del entorno. Esta perspectiva será clave para facilitar la correcta exploración, un elemento esencial para la experiencia de juego que proponemos, donde la tensión entre el asesino y el superviviente es constante.

El objetivo visual es crear una ambientación lúgubre y tenebrosa, evocando sensaciones de inquietud y peligro. Para lograr esto, tanto los escenarios como los personajes adoptarán una estética creepy inspirada en el cine de terror clásico y slasher, con influencias directas de películas como Viernes 13, Halloween y Pesadilla en Elm Street. 

Se empleará un estilo cartoon con toques góticos y gore, en línea con el estilo visual visto en videojuegos como Cult of the Lamb o Don't Starve Together, que mezclan lo macabro con lo caricaturesco. También se tomará inspiración del universo visual de Tim Burton y las ilustraciones de Benjamin Lacombe, caracterizadas por personajes de formas angulosas, ojos grandes y una estética visualmente atractiva pero perturbadora. 

La paleta de colores será predominantemente fría, con énfasis en tonos oscuros, azules y grises que potenciarán la atmósfera nocturna e inquietante del juego. Las sombras jugarán un papel crucial en la creación de una sensación de desorientación y peligro constante, contribuyendo al sentimiento de estar siendo acechado.

La iluminación será usada de manera estratégica, con momentos de luz artificial que generarán fuertes contrastes con el entorno. Estas zonas iluminadas resaltarán áreas “seguras” dentro de un escenario mayormente oscuro, acentuando la sensación de vulnerabilidad del jugador y creando un ambiente de tensión y misterio. 

En resumen, el apartado visual se centrará en construir un mundo donde el miedo y la tensión se vivan a través de una estética cartoon-gótica, con influencias tanto del cine como de los videojuegos de terror que logran mezclar lo macabro con lo estilizado.

* ***Referencias temáticas y atmosféricas:***

 ***Imagen promocional de Halloween película dirigida por John Carpenter***
 
 ![Halloween](https://github.com/user-attachments/assets/00062072-5603-422b-8ff3-0f3aca6f9bc7)

 ***Imagen de El Exorcista película dirigida por William Friedkin***
 
 ![Exorcista](https://github.com/user-attachments/assets/c5726137-b0f4-41f4-903c-45dfd21decf0)

 ***Imagen promocional del videojuego Dead By Daylight de Behaviour Interactive***
 
 ![Dbd](https://github.com/user-attachments/assets/f583a441-6926-4caa-8c76-f4e949b606d5)

 ***Imagen promocional del videojuego Friday The 13th The Game de IIIFonic***
 
 ![fridat13](https://github.com/user-attachments/assets/760da2e1-4784-49d7-93f1-9f938a18d5c1)


* ***Referencias estéticas:***

 ***Imagen del videojuego Don't Starve Together de Klei Entertainment***
 
 ![DontStarve](https://github.com/user-attachments/assets/c802828f-3804-49ce-885e-8825de5efc68)
 
 ***Imagen del videojuego Cult of the Lamb de Massive Monster***
 
 ![Cult](https://github.com/user-attachments/assets/59c2175a-4339-4869-bb5e-aebaaaa68d65)

 ***Imagen del videojuego Among Us de Innersloth***
 
 ![AmongUS](https://github.com/user-attachments/assets/8c234ef8-11a9-4142-b19a-c8cddbd969d8)

 ***Diferentes bocetos por el director de cine Tim Burton***
 
 ![TimBurton](https://github.com/user-attachments/assets/cda203da-e6a5-4ad4-9dd4-c5226c44ed85)

 ***Ilustración de Benjamin Lacombe para la edición de Edelvives del libro Cuentos Macabros por Edgar Allan Poe***
 
 ![Benjamin](https://github.com/user-attachments/assets/74ecf249-8739-49bf-ab2c-7bcae7a18860)
 


### Interfaz de usuario
Para implementar las interfaces de este juego de escape room multijugador, es clave que el diseño sea intuitivo, atmosférico y funcional, permitiendo a los jugadores centrarse en sus objetivos y sentir la tensión del entorno.

#### Pantalla de Inicio / Menú principal
Título del juego en el centro, con efectos de niebla y sombras para crear un ambiente inquietante.
Opciones de Menú: "Jugar", "Opciones", "Créditos", "Salir". Al seleccionar "Jugar", se podrá elegir entre jugar como el exorcista o el demonio. Si ambos jugadores escogen el mismo rol, el juego les asignará los roles al azar. Tras ello se les mostrará un recordatorio de los controles de movimiento e interacción.

![Diagrama](https://github.com/user-attachments/assets/7701ef31-6e9d-41d7-9e09-56d101229568)


#### Interfaz Personajes
Minimalista pero funcional: Permite tener acceso rápido a su inventario y visualidad la barra de salud o corazones.
Barra de estrés/salud: En la esquina superior izquierda, una barra con el nivel de estrés, con efectos en la pantalla a medida que el estrés aumenta.
Inventario rápido: Una fila horizontal en la parte inferior de la pantalla que muestra los objetos recogidos (velas, crucifijos). 

### Apartado Sonoro
El diseño de la música y los efectos de sonido juegan un papel fundamental en los videojuegos de terror. No solo sirven como retroalimentación, sino que poseen un gran lugar a la hora de conseguir la atmósfera terrorífica y la inmersión del jugador. 
Se buscará una música de ambiente que infunda misterio, así cómo momentos de silencio que aumenten la tensión del jugador. Contaremos con diversos efectos de sonido como chirridos, sonido del viento, interruptores (para las mecánicas de la luz), pisadas…

#### Advertencia de cercanía del demonio
El exorcista podrá escuchar un sonido cuando el demonio esté cerca. Este sonido es de tipo “mono” para no revelarle desde donde se acerca el demonio y se hará más intenso según se acerca más hacia él. Esto aporta tensión al jugador y le dará la ventaja de poder esconderse al detectar que el demonio se acerca.
Esta advertencia no siempre sonará a la misma intensidad. Si el demonio deja de moverse y se queda quieto durante varios segundos, el volumen de la advertencia se reducirá y hará creer al exorcista que se encuentra lejos del peligro aunque en realidad lo tenga al lado.

#### Música y sonido del menú
El menú contará con su propia música, pudiendo cada pantalla tener una melodía diferente. Además, el sistema emitirá un sonido cada vez que el jugador presione un botón del menú.

#### Efectos principales
 Aquellos íntimamente relacionados con las mecánicas:
 * Vela encendiéndose.
 * Interruptores.
 * Coger objeto.
 * Sonido que emite el crucifijo para que el jugador lo encuentre.
 * Obtención del crucifijo.
 * Ataque del demonio y daño recibido.
 * Ritual activado

## Estrategia de mercado
### Público objetivo
El juego se encuentra dirigido a jugadores a partir de dieciséis años. Pese a que los gráficos contarán con una estética “cartoon”, el género en el que se encuentra, es decir, el terror, atrae a jugadores de edades más altas, los cuales disfrutan del suspense propio del mismo. 

A su vez, se podría encasillar en un PEGI 16. Esto es debido a la violencia presente en las interacciones entre el demonio y el exorcista, así como la alta tensión en determinadas ocasiones dentro del “gameplay”, destacando en esta última la poca iluminación, sumada a la dificultad y rapidez con la que tendrá que actuar el jugador si quiere permanecer vivo.

El propósito del juego es el entretenimiento. Los aspectos comentados proporcionarán un gran interés en el juego proveniente de jugadores experimentados en el género, dado que tiene aspectos similares a grandes videojuegos como “Don't Starve Together” o “Dead by Daylight”, entre otros.

### Tecnología y plataforma
Su desarrollo se diseñará e implementará mediante JavaScript. 

El juego estará diseñado para ejecutarse en el navegador, a través de una red de ordenadores que cuenten con el sistema operativo de Windows.

### Modelo de negocio
Se ha decidido que el juego cuente con un modelo de negocio mixto. Se implementarán anuncios dentro del mismo, en algunos casos haciendo que el jugador obtenga beneficios al verlos, propio de un modelo de negocio “adware”. Además, se utilizará el modelo de negocio “freemium”, ya que se ofrecerá contenido adicional para la personalización de los personajes y/o accesorios. Por último, se encontrará disponible la opción de donación para aquellos que decidan apoyar el desarrollo del videojuego, implementando así un modelo de negocio “donationware”.












