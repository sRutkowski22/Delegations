package pl.lodz.p.it.delegation.mok.model;

import lombok.Data;

import java.io.Serializable;

public @Data
class AuthResponse implements Serializable {
    private final String jwt;
}
