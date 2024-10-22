# The Last Candle

**Desarrolladores - Grupo 10:**
- Javier Álvarez Pérez
- Lucas García Marcos - l.garciamarc.2021@alumnos.urjc.es - https://github.com/Lololeifo
- Laura García Martín - l.garciamar.2021@alumnos.urjc.es - https://github.com/laurennthx 
- Cristina González De Lope - c.gonzalezde.2022@alumnos.urjc.es - https://github.com/crisstinagl
- André Miguel Pérez Sánchez

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
**Algoritmo de aparición:** Crea un sistema que activa la aparición del crucifijo después de un tiempo específico. Usa un conjunto de puntos predefinidos distribuidos por el mapa en lugares estratégicos. El crucifijo aparecerá en uno de estos puntos de forma aleatoria.

**Notificación al exorcista:** Cuando el crucifijo aparezca, se le puede mostrar una pista al exorcista (por ejemplo, un destello de luz en la dirección del crucifijo o un sonido sutil que aumente en intensidad al acercarse).

**Interacción del exorcista con el crucifijo:**
Al acercarse al crucifijo, aparecerá una notificación en pantalla (un ícono de interacción) para recogerlo.
Al recogerlo, el exorcista gana un "corazón" extra (representado visualmente en su barra de vida o un aura protectora temporal). Este corazón adicional le dará una ventaja crucial al permitirle resistir un ataque adicional del demonio.

**Feedback visual y sonoro:**
Cuando el exorcista recoge el crucifijo, se retroalimenta al jugador en respuesta a la acción que acaba realizar de diferentes maneras (elegiremos la más adecuada según el tiempo y los recursos). Algunos ejemplos: un brillo aparece alrededor de su personaje, sonido celestial o de campanas, indicando que ha recibido el "corazón" extra…

---

### Recoger velas escondidas por el mapa para completar el ritual (Exorcista) / Impedir que el exorcista acabe el ritual (Demonio)
#### Objetivo
El exorcista necesita recolectar velas repartidas por el mapa para completar el ritual y ganar la partida. El demonio puede contrarrestar este objetivo al apagar las velas o impedir que sean recolectadas, dinámica de contrarreloj.

#### Implementación
**Distribución de las velas**
* Las velas están ocultas en diferentes habitaciones o puntos estratégicos del mapa, y algunas están bloqueadas por puzzles o trampas.
* El número total de velas puede ser un requisito para el ritual (por ejemplo, el exorcista necesita encontrar 5 velas para iniciar el ritual).
* Cada vez que el exorcista encuentra una vela, deberá encenderla (interacción que toma unos segundos) antes de recogerla, aumentando la tensión.

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
El exorcista debe gestionar cuándo y dónde encender las luces, ya que no puede controlar todas las áreas a la vez. El demonio puede apagar las luces estratégicamente en áreas donde sepa que el exorcista necesita trabajar en puzzles, aprovechando la oscuridad para emboscarlo.

## Controles

## Niveles 

## Aspectos de negocio y distribución

### Público Objetivo
El juego se encuentra dirigido a jugadores a partir de dieciséis años. Pese a que los gráficos contarán con una estética “cartoon”, el género en el que se encuentra, es decir, el terror, atrae a jugadores de edades más altas, los cuales disfrutan del suspense propio del mismo. 
A su vez, se podría encasillar en un PEGI 16. Esto es debido a la violencia presente en las interacciones entre el demonio y el exorcista, así como la alta tensión en determinadas ocasiones dentro del “gameplay”, destacando en esta última la poca iluminación, sumada a la dificultad y rapidez con la que tendrá que actuar el jugador.
El propósito del juego es el entretenimiento. Los aspectos comentados proporcionarán un gran interés en el juego proveniente de jugadores experimentados en el género, dado que tiene aspectos similares a grandes videojuegos como “Don't Starve Together” o “Dead by Daylight”, entre otros.

### Tecnología y plataforma
Su desarrollo se diseñará e implementará mediante JavaScript. 
El juego estará diseñado para funcionar en el navegador a través de una red de ordenadores que cuenten con el sistema operativo de Windows (y macOS?).

### Modelo de negocio 
Poseerá un modelo de negocio mixto. Implementarán anuncios dentro del mismo, en algunos casos haciendo que el jugador obtenga beneficios al verlos, propio de un modelo de negocio “shareware”. Además, se utilizará el modelo de negocio “freemium”, ya que se ofrecerá contenido adicional para la personalización de los personajes y/o accesorios. Por último, se encontrará disponible la opción de donación para aquellos que decidan apoyar el desarrollo del videojuego, implementando así un modelo de negocio “donationware”.

## Apartado Artístico

### Estilo visual y referencias
### Interfaz de usuario
### Apartado Sonoro













