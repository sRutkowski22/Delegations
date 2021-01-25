package pl.lodz.p.it.delegation.mod.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
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
    private Long id;

    @NotEmpty
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "delegation_number")
    private String delegationNumber;


    @Column(name="delegation_start_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startDate;


    @Column(name="delegation_end_date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endDate;

    @Column(name="leaving_country_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime crossingForeignBorder;

    @Column(name="crossing_home_border_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime crossingHomeBorder;

    private boolean guaranteedDomesticBreakfast;

    private boolean guaranteedDomesticDinner;

    private boolean guaranteedDomesticSupper;

    private boolean guaranteedForeignBreakfast;

    private boolean guaranteedForeignDinner;

    private boolean guaranteedForeignSupper;

    private boolean privateCar;

    private boolean guaranteedAccommodation;

    @NotNull
    @JoinColumn(name = "status_id", referencedColumnName = "id", nullable = false)
    @ManyToOne(optional = false)
    private Status delegationStatus;

    private int advancePayment;

    @NotNull
    private int sum;

    @OneToMany(mappedBy = "delegation" , cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<DelegationRoute> routeList;

    @NotNull
    @JoinColumn(name = "account_id", referencedColumnName = "id", nullable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonBackReference
    private Account account;


}
