package pl.lodz.p.it.delegation.mok;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "account_login", uniqueConstraints = { @UniqueConstraint(columnNames = {"email"})})
public @Data class Account implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotEmpty
    private String email;

    @NotEmpty
    @Column(name ="firstname")
    private String firstName;

    @NotEmpty
    @Column(name ="lastname")
    private String lastName;

    @NotEmpty
    private String password;

    @OneToMany(mappedBy = "account", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<AccessLevel> accessLevel;

}
