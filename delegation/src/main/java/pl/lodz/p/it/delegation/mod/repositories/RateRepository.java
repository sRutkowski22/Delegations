package pl.lodz.p.it.delegation.mod.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.p.it.delegation.mod.model.Rate;

@Repository
public interface RateRepository extends JpaRepository<Rate,String> {


}
