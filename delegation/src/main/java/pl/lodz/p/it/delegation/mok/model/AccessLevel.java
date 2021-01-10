package pl.lodz.p.it.delegation.mok.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "access_level", uniqueConstraints = { @UniqueConstraint(columnNames = {"level_name", "account_id"})})
public @Data class AccessLevel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull
    @Column(name = "level_name")
    private String levelName;

    @NotNull
    private boolean active;

    @NotNull
    @JoinColumn( name = "account_id", referencedColumnName = "id", nullable = false,
            updatable = false)
    @ManyToOne( optional = false)
    @JsonBackReference
    private Account account;

    @Override
    public String toString(){
        return "pl.lodz.p.it.delegation.mok.Role[id =" + getId() + "Role name =" + getLevelName();
    }


}
