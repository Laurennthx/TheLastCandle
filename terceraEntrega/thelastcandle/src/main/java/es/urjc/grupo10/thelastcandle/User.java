package es.urjc.grupo10.thelastcandle;

import java.io.Serializable;

public class User implements Serializable {
    // To ensure serialization
    private static final long serialVersionUID = 1L;

    String name;
    String password;
    int victories;

    public User() {
    }

    public User(String name, String password) {
        this.name = name;
        this.password = password;
        victories = 0;
    }

    public String getUsername() {
        return name;
    }

    public void setName(String newName) {
        name = newName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getVictories() {
        return victories;
    }

    public void hasWon() {
        victories += 1;
    }

    @Override
    public String toString() {
        return "USER : Name: " + name + ", Password:" + password;
    }
}
