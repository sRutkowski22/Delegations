package pl.lodz.p.it.delegation.mod.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.p.it.delegation.mod.model.Status;

import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<Status, String> {

    Status findByStatusName(String statusName);
}
