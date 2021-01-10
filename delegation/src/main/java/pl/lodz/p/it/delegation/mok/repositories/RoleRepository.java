package pl.lodz.p.it.delegation.mok.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.p.it.delegation.mok.model.AccessLevel;

@Repository
public interface RoleRepository extends JpaRepository<AccessLevel,String> {
}
