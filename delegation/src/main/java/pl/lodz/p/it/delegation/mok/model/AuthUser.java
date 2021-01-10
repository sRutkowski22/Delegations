package pl.lodz.p.it.delegation.mok.model;

import lombok.Data;

import java.io.Serializable;

public @Data class AuthUser implements Serializable {
    private String email;
    private String password;
}
