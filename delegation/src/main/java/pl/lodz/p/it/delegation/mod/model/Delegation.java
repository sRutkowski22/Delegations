package pl.lodz.p.it.delegation.mod.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import pl.lodz.p.it.delegation.mok.model.Account;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "delegation", uniqueConstraints = @UniqueConstraint(columnNames = {"delegation_number"} ))
public @Data class Delegation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @NotEmpty
    private Long id;

    @NotEmpty
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "delegation_number")
    private Long delegationNumber;

    @NotEmpty
    @Column(name="delegation_start_date", nullable = false)
    private LocalDateTime startDate;

    @NotEmpty
    @Column(name="delegation_end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name="leaving_country_date")
    private LocalDateTime crossingForeignBorder;

    @Column(name="crossing_home_border_date")
    private LocalDateTime crossingHomeBorder;

    private boolean guaranteedDomesticBreakfast;

    private boolean guaranteedDomesticDinner;

    private boolean guaranteedDomesticSupper;

    private boolean guaranteedForeignBreakfast;

    private boolean guaranteedForeignDinner;

    private boolean guaranteedForeignSupper;

    private boolean privateCar;

    private boolean guaranteedAccommodation;

    private boolean delegationVerified;

    @OneToMany(mappedBy = "delegation")
    @JsonManagedReference
    private List<DelegationRoute> routeList;

    @NotNull
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonBackReference
    private Account account;


}
