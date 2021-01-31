package pl.lodz.p.it.delegation.mod.singleton;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.delegation.mod.model.Rate;
import pl.lodz.p.it.delegation.mod.repositories.RateRepository;

import javax.annotation.PostConstruct;

@Service
public @Data class RateSingleton {


    @Autowired
    private RateRepository rateRepository;
    private Rate rate;



    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    public RateSingleton rateSingleton1() {

        return new RateSingleton();
    }


}


