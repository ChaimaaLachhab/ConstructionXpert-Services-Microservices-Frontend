package com.user.model;

import com.user.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Customer extends User {

    public Customer(Long id, String fullName, String username, String password, String email, Role role) {
        super(id, fullName, username, password, email, role);
        this.setRole(Role.CUSTOMER);
    }

    public Customer() {
        this.setRole(Role.CUSTOMER);
    }

}
