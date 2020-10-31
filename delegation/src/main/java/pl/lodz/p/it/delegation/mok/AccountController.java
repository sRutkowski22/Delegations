package pl.lodz.p.it.delegation.mok;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/accounts")
@AllArgsConstructor
public class AccountController {

   private final AccountRepository accountRepository;

//    @PostMapping("/notice")
//    public ResponseEntity<String> addNotice(@RequestBody Account account) {
//        noticeRepo.insert(account);
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body("Notice added successfully.");
//    }

//    @PostMapping("/notices")
//    public ResponseEntity<String> addManyNotices(@RequestBody List<Account> accounts) {
//        noticeRepo.insert(accounts);
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body("Notices added successfully.");
//    }

    @GetMapping("/account/{username}")
    public Account getAccount(@PathVariable String username) {
       return accountRepository.findByUsername(username);



    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Account>> getAllNotices() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountRepository.findAll());
    }

    @GetMapping("/hello")
    public String hello(){
        return "Hello world";
    }
}
