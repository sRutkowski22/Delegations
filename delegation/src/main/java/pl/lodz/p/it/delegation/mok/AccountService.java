package pl.lodz.p.it.delegation.mok;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;

    public void addAccount(Account account){

        accountRepository.save(account);
        List<AccessLevel> accessLevels = account.getAccessLevel();
        for(AccessLevel accessLevel : accessLevels) {
            log.error(accessLevel.getLevelName());
            log.error(accessLevel.getId() + " " + accessLevel.isActive() + " " + accessLevel.getAccount().getId());
            roleRepository.save(accessLevel);
        }
    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Account getAccountByUsername(String username){
        return accountRepository.findByUsername(username);
    }
}
