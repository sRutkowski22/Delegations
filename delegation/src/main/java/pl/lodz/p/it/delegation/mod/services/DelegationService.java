package pl.lodz.p.it.delegation.mod.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import pl.lodz.p.it.delegation.exceptions.DelegationNotFoundException;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mod.model.DelegationRoute;
import pl.lodz.p.it.delegation.mod.model.DelegationStatuses;
import pl.lodz.p.it.delegation.mod.model.Status;
import pl.lodz.p.it.delegation.mod.repositories.DelegationRepository;
import pl.lodz.p.it.delegation.mod.repositories.DelegationRouteRepository;
import pl.lodz.p.it.delegation.mod.repositories.StatusRepository;
import pl.lodz.p.it.delegation.mok.model.Account;
import pl.lodz.p.it.delegation.mok.repositories.AccountRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class DelegationService  {

    private final DelegationRepository delegationRepository;
    private final DelegationRouteRepository routeRepository;
    private final AccountRepository accountRepository;
    private final StatusRepository statusRepository;

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


    public void addDelegation(Delegation delegation, String email){
        log.error("delegacja "+ delegation.getId() + " account idd "   + delegation.getCrossingForeignBorder()
                + delegation.getCrossingHomeBorder() + delegation.getDelegationNumber() + delegation.getEndDate() + " " + delegation.getStartDate());
        if(delegation.getRouteList() != null)
        for(DelegationRoute route : delegation.getRouteList()){
            route.setDelegation(delegation);
        }
        Account account = accountRepository.findByEmail(email).get();
        Status status = statusRepository.findByStatusName(DelegationStatuses.submitted.toString());

        delegation.setDelegationStatus(status);
        delegation.setAccount(account);
        delegation.setDelegationNumber(UUID.randomUUID().toString());
        delegationRepository.save(delegation);

    }
}
