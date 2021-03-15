package pl.lodz.p.it.delegation.mok.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mok.model.AccessLevel;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "account_login", uniqueConstraints = { @UniqueConstraint(columnNames = {"email"})})
public @Data class Account implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotEmpty
    @NotNull
    private String email;

    @NotEmpty
    @NotNull
    @Column(name ="firstname")
    private String firstName;

    @NotEmpty
    @NotNull
    @Column(name ="lastname")
    private String lastName;

    @NotEmpty
    @NotNull
    private String password;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "account", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<AccessLevel> accessLevel;

    @OneToMany(mappedBy = "account", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<Delegation> delegationList;



}
