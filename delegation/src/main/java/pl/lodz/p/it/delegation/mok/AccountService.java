package pl.lodz.p.it.delegation.mok;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.delegation.exceptions.AccountException;
import pl.lodz.p.it.delegation.exceptions.AppBaseException;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public void addAccount(Account account) throws AppBaseException {
        if (accountRepository.findByEmail(account.getEmail()).isEmpty()) {


            Account account1 = new Account();
            account1.setEmail(account.getEmail());
            account1.setFirstName(account.getFirstName());
            account1.setLastName(account.getLastName());
            account1.setPassword(passwordEncoder.encode(account.getPassword()));
            log.error(account1.getEmail() + "ya " + account1.getFirstName() + " " + account1.getPassword() + " " + account1.getLastName());
            log.error(account.getEmail() + "ya " + account.getFirstName() + " " + account.getPassword() + " " + account.getLastName());
            log.error("access levels: " + account.getAccessLevel().get(1).getLevelName() );
            List<AccessLevel> accessLevels = account.getAccessLevel();

            for (AccessLevel accessLevel : accessLevels) {
                log.error(accessLevel.getLevelName());
                log.error(accessLevel.getId() + " " + accessLevel.isActive() + " " + accessLevel.getAccount().getId());
                accessLevel.setAccount(account1);
            }
            account1.setAccessLevel(accessLevels);
            accountRepository.save(account1);
        } else{
            throw new AccountException("Account already exists");
        }

    }

    public List<Account> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Account getAccountByEmail(String email){
        return accountRepository.findByEmail(email).get();
    }
}
