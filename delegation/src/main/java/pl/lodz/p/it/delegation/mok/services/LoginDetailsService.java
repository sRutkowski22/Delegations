package pl.lodz.p.it.delegation.mok.services;

import lombok.AllArgsConstructor;
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
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
@AllArgsConstructor
public class LoginDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if(accountRepository.findByEmail(email).isPresent()){
            Account account = accountRepository.findByEmail(email).get();
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            for(AccessLevel accessLevel : account.getAccessLevel()){
                if(accessLevel.isActive()){
                    authorities.add(new SimpleGrantedAuthority(accessLevel.getLevelName()));
                }

            }
            return new User(account.getEmail(),account.getPassword(),authorities);
        }else throw new UsernameNotFoundException("Account not found");
    }
}
