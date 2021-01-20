package pl.lodz.p.it.delegation.mod.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.delegation.mod.model.DelegationRoute;

public interface DelegationRouteRepository extends JpaRepository<DelegationRoute,String> {
}
