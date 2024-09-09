package com.user.model;

import com.user.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Admin extends User {
    public Admin(Long id, String fullName, String username, String password, String email, Role role) {
        super(id, fullName, username, password, email, role);
        this.setRole(Role.ADMIN);
    }

    public Admin() {
        this.setRole(Role.ADMIN);
    }

}
