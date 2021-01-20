package pl.lodz.p.it.delegation.mod.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.delegation.exceptions.AccountException;
import pl.lodz.p.it.delegation.exceptions.AppBaseException;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mod.services.DelegationService;

@CrossOrigin
@RestController
@RequestMapping("/delegations")
@AllArgsConstructor
@Slf4j
public class DelegationController {

    private final DelegationService delegationService;

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> addDelegation(@RequestBody Delegation delegation){
        int counter =3;
        do{
            try {
                delegationService.addDelegation(delegation);
                counter = 0;


            }catch(Exception ex){
                log.warn(ex.getMessage()+ "Exception invoked");
                counter-=1;
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("There was an error.");
            }
        }while (counter!=0);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Account added successfully.");
    }
}

