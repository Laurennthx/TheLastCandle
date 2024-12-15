package es.urjc.grupo10.thelastcandle;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private ApiStatusService apiStatusService;  // Esto no sé si está bien

    //private ReentrantReadWriteLock lock; // La forma facil seria con synchronized(this.userDAO){dentro el codigo que queramos que sea atomico}

    public UsersController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    // Todo esto teniendo las clases de User y UserDTO creadas en el proyecto
    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) {

        this.apiStatusService.hasSeen(username);// hay que ponerlo en los demas metodos cuando se utilice el usuario
        Optional<User> user = this.userDAO.getUser(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(new UserDTO(user.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        boolean removed = this.userDAO.deleteUser(username);
        if (removed) {
            return ResponseEntity.noContent().build(); // Si se eliminó correctamente
        } else {
            return ResponseEntity.notFound().build(); // Si no se encontró el usuario
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> postUsername(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        Optional<User> other = this.userDAO.getUser(user.getUsername());
        if (other.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        this.userDAO.updateUser(user);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{username}/password")
    public ResponseEntity<?> updatepassword(@PathVariable String username, @RequestBody PasswordUpdateRequest passwordUpdate){
        if (passwordUpdate.password() == null || passwordUpdate.password().isEmpty()) { // Comprobar que no sea nula o vacía
            return ResponseEntity.badRequest().build();
        }
        Optional<User> optionalUser = this.userDAO.getUser(username);
        if(optionalUser.isPresent()) {
            var user = optionalUser.get();
            user.setPassword(passwordUpdate.password());
            this.userDAO.updateUser(user);
            return ResponseEntity.noContent().build(); // Contraseña actualizada correctamente
        } else {
            return ResponseEntity.notFound().build(); // Usuario no encontrado
        }
    }

    record PasswordUpdateRequest(String password) {}
}
