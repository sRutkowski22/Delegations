package pl.lodz.p.it.delegation.mod.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.lodz.p.it.delegation.mod.model.Delegation;

import java.util.List;
import java.util.Optional;

@Repository
public interface DelegationRepository extends JpaRepository<Delegation,String> {
    @Query(value ="Select del from Delegation del, Account account where account.id=del.account.id and account.email=?1")
    List<Delegation> findByEmail(String email);

    Optional<Delegation> findByDelegationNumber(Long delegationNumber);


}
