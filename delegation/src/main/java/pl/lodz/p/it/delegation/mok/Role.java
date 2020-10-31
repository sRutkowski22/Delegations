package pl.lodz.p.it.delegation.mok;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "role", uniqueConstraints = { @UniqueConstraint(columnNames = {"role_name", "account_id"})})
public @Data class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String role_name;

    @NotNull
    private boolean active;

    @NotNull
    @JoinColumn( name = "account_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne( optional = false)
    private Account account;


}
