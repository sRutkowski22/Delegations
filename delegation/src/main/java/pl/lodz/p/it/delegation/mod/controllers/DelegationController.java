package pl.lodz.p.it.delegation.mod.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.delegation.exceptions.AccountException;
import pl.lodz.p.it.delegation.exceptions.AppBaseException;
import pl.lodz.p.it.delegation.exceptions.DelegationNotFoundException;
import pl.lodz.p.it.delegation.exceptions.StatusConflictException;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mod.services.DelegationService;

import javax.persistence.RollbackException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/delegations")
@AllArgsConstructor
@Slf4j
public class DelegationController {

    private final DelegationService delegationService;

    @PostMapping(value = "worker/add/{email}")
    public ResponseEntity<String> addDelegation(@RequestBody Delegation delegation, @PathVariable String email){

                log.error("jestem w delegation controlerze");
                delegationService.calculateDelegationSum(delegation);
                delegationService.addDelegation(delegation, email);
                log.error("jestem w delegation controlerze 2");

                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("udalo sie");



    }

    @PostMapping(value = "worker/add/{email}/{delnumber}")
    public ResponseEntity<String> submitDelegation(@RequestBody Delegation delegation, @PathVariable String email, @PathVariable String delnumber){

        log.error("jestem w delegation controlerze");
        delegationService.calculateDelegationSum(delegation);
        delegationService.submitDelegation(delegation, email, delnumber);
        log.error("jestem w delegation controlerze 2");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("udalo sie");



    }



    @PutMapping(value = "accountant/changestatus/{delnumber}/{delstatus}")
    public ResponseEntity<String> changeDelegationStatus(@RequestBody Delegation delegation, @PathVariable String delnumber, @PathVariable String delstatus){

        log.error("jestem w delegation controlerze");
        try {
            delegationService.changeDelegationStatus(delegation,delnumber,delstatus);
        } catch (StatusConflictException e) {
            log.error("message " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
        log.error("jestem w delegation controlerze 2");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("udalo sie");



    }

    @PutMapping(value = "worker/resubmit/{delnumber}/{delstatus}")
    public ResponseEntity<String> resubmitDelegation(@RequestBody Delegation delegation, @PathVariable String delnumber, @PathVariable String delstatus){

        log.error("jestem w delegation controlerze");
        delegationService.calculateDelegationSum(delegation);
        delegationService.resubmitDelegation(delegation,delnumber,delstatus);
        log.error("jestem w delegation controlerze 2");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("udalo sie");



    }
    
    @GetMapping(value="worker/getforuser/{email}")
    @PreAuthorize("#email == authentication.principal.username")
    public ResponseEntity<?> getDelegationsForUser(@PathVariable String email){
        try {
            List<Delegation> delegationList = delegationService.getDelegationByAccountEmail(email);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(delegationList);
        } catch (DelegationNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("An error has occured");
        }
    }

    @GetMapping(value="worker/getdelegationbynumber/{number}")
    @PreAuthorize("#email == authentication.principal.username")
    public ResponseEntity<?> getDelegationsDelegationByNumber(@PathVariable String number){
        try {
            Delegation delegation = delegationService.getDelegationByItsNumber(number);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(delegation);
        } catch (DelegationNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Delegation not found");
        }
    }

    @GetMapping(value="accountant/getdelegationbynumber/{number}")
    @PreAuthorize("#email == authentication.principal.username")
    public ResponseEntity<?> getDelegationsDelegationByNumberForAccountant(@PathVariable String number){
        try {
            Delegation delegation = delegationService.getDelegationByItsNumber(number);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(delegation);
        } catch (DelegationNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Delegation not found");
        }
    }

    @GetMapping(value="accountant/getall")
    @PreAuthorize("#email == authentication.principal.username")
    public ResponseEntity<?> getAllDelegations(){
        try {
            List<Delegation> delegationList = delegationService.getSubmittedAndVerified();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(delegationList);
        } catch (DelegationNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("An error has occured");
        }
    }
}

