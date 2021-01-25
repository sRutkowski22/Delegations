package pl.lodz.p.it.delegation.mod.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "status", uniqueConstraints = { @UniqueConstraint(columnNames = {"status_name"})})
public  @Data class Status implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Setter(AccessLevel.NONE)
    @Column(name = "status_name", nullable = false)
    private String statusName;


}
