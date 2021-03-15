package pl.lodz.p.it.delegation.mok.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.delegation.exceptions.AccountException;
import pl.lodz.p.it.delegation.exceptions.AppBaseException;
import pl.lodz.p.it.delegation.mod.model.Rate;
import pl.lodz.p.it.delegation.mok.model.AccessLevel;
import pl.lodz.p.it.delegation.mok.model.Account;
import pl.lodz.p.it.delegation.mok.repositories.AccountRepository;

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
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            List<AccessLevel> accessLevels = account.getAccessLevel();
            for (AccessLevel accessLevel : accessLevels) {
                accessLevel.setAccount(account);
            }
            account.setAccessLevel(accessLevels);
            accountRepository.save(account);
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
