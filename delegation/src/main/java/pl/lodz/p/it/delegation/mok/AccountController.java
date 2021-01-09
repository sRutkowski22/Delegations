package pl.lodz.p.it.delegation.mok;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.delegation.exceptions.AccountException;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/accounts")
@AllArgsConstructor
@Slf4j
public class AccountController {



    private final AccountService accountService;

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> addAccount(@RequestBody Account account) {
        int counter =3;
        do{
        try {
            accountService.addAccount(account);
            counter = 0;

        }catch( AccountException ex) {
            log.warn(ex.getMessage()+ "AccountExceptionInvoked");
            counter -= 1;
            return ResponseEntity
                    .status((HttpStatus.METHOD_FAILURE))
                    .body("Email is already used.")
                    ;
        }catch(Exception ex){
            log.warn(ex.getMessage()+ "Exception invoked");
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("There was an error.");
        }
        }while (counter!=0);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Account added successfully.");
    }

//    @PostMapping("/notices")
//    public ResponseEntity<String> addManyNotices(@RequestBody List<Account> accounts) {
//        noticeRepo.insert(accounts);
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body("Notices added successfully.");
//    }

    @GetMapping("/account/{email}")
    public Account getAccount(@PathVariable String email) {
       return accountService.getAccountByEmail(email);



    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Account>> getAllNotices() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountService.getAllAccounts());
    }

    @GetMapping("/hello")
    public String hello(){
        return "Hello world";
    }

    @RequestMapping("/lombok")
    public String index() {
        log.trace("A TRACE Message");
        log.debug("A DEBUG Message");
        log.info("An INFO Message");
        log.warn("A WARN Message");
        log.error("An ERROR Message");

        return "Howdy! Check out the Logs to see the output...";
    }
}
