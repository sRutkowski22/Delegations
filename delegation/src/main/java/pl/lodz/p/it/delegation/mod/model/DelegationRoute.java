package pl.lodz.p.it.delegation.mod.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "delegation_route")
public @Data class DelegationRoute implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String location;

    @ManyToOne(optional = false)
    @JoinColumn(name = "delegation_id", referencedColumnName = "id", nullable = false)
    private Delegation delegation;


}
