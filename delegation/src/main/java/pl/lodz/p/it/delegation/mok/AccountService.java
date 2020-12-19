package pl.lodz.p.it.delegation.mok;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void addAccount(Account account){

        Account account1 = new Account();
        account1.setEmail(account.getEmail());
        account1.setFirstName(account.getFirstName());
        account1.setLastName(account.getLastName());
        log.error(account1.getEmail()+ "ya " + account1.getFirstName() + " " + account1.getPassword() + " " + account1.getLastName());
        log.error(account.getEmail()+ "ya " + account.getFirstName() + " " + account.getPassword() + " " + account.getLastName());
        account1.setPassword(passwordEncoder.encode(account.getPassword()));
        List<AccessLevel> accessLevels = account.getAccessLevel();

        for(AccessLevel accessLevel : accessLevels) {
            log.error(accessLevel.getLevelName());
            log.error(accessLevel.getId() + " " + accessLevel.isActive() + " " + accessLevel.getAccount().getId());
            accessLevel.setAccount(account1);
//            roleRepository.save(accessLevel);

        }
        account1.setAccessLevel(accessLevels);

        accountRepository.save(account1);


    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Account getAccountByEmail(String email){
        return accountRepository.findByEmail(email);
    }
}
