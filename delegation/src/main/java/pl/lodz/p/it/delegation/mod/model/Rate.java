package pl.lodz.p.it.delegation.mod.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import javax.persistence.*;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rate")
public @Data class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "domestic_allowance")
    private int domesticAllowance;

    @Column(name = "car_greater900_rate")
    private double carGreaterThan900rate;

    @Column(name = "car_lower900_rate")
    private double carLowerThan900rate;


}

