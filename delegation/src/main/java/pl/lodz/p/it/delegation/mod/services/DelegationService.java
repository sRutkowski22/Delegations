package pl.lodz.p.it.delegation.mod.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.delegation.exceptions.DelegationNotFoundException;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mod.repositories.DelegationRepository;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class DelegationService  {

    private final DelegationRepository delegationRepository;

    public List<Delegation> getDelegationByAccountEmail(String email) throws DelegationNotFoundException {
        if(delegationRepository.findByEmail(email).isEmpty())
            throw new DelegationNotFoundException("No delegations for this user");
        else {
            return delegationRepository.findByEmail(email);
        }

    }

    public Delegation getDelegationByItsNumber(Long delegationNumber) throws DelegationNotFoundException {
        if(delegationRepository.findByDelegationNumber(delegationNumber).isPresent())
            return delegationRepository.findByDelegationNumber(delegationNumber).get();
        else throw new DelegationNotFoundException("Delegation not found");

    }

    public void addDelegation(Delegation delegation){
        delegationRepository.save(delegation);

    }
}
