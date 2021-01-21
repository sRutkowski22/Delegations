package pl.lodz.p.it.delegation.mok.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.lodz.p.it.delegation.mok.model.AccessLevel;
import pl.lodz.p.it.delegation.mok.model.Account;
import pl.lodz.p.it.delegation.mok.repositories.AccountRepository;

import javax.management.relation.Role;
import javax.management.relation.RoleNotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
@AllArgsConstructor
@Slf4j
public class LoginDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException,SecurityException {
        if(accountRepository.findByEmail(email).isPresent()){
            Account account = accountRepository.findByEmail(email).get();
            for(AccessLevel accessLevel : account.getAccessLevel()){
                if(accessLevel.isActive()){
                    Collection<SimpleGrantedAuthority> authorities= Collections.singletonList(new SimpleGrantedAuthority(accessLevel.getLevelName()));
                    return new User(account.getEmail(),account.getPassword(),authorities);
                }
            }
            throw new UsernameNotFoundException("Account does not have any role");

        }else throw new UsernameNotFoundException("Account not found");
    }
}
