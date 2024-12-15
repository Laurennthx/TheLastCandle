package es.urjc.grupo10.thelastcandle;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public String usersPath() {
        return "src/main/resources/users"; // Ajusta la ruta según la ubicación real de tu archivo
    }
}