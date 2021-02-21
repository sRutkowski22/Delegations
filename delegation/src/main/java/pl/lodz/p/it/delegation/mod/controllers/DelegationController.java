package pl.lodz.p.it.delegation.mod.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.it.delegation.exceptions.*;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mod.services.DelegationService;
import pl.lodz.p.it.delegation.utils.EntityIdentitySignerVerifier;

import javax.persistence.RollbackException;
import javax.validation.constraints.NotNull;
import java.util.List;

@CrossOrigin(exposedHeaders = "ETag", allowedHeaders = "ETag")
@RestController
@RequestMapping("/delegations")
@AllArgsConstructor
@Slf4j
public class DelegationController {

    private final DelegationService delegationService;

    @PostMapping(value = "worker/add/{email}")
    public ResponseEntity<String> addDelegation(@RequestBody Delegation delegation, @PathVariable String email){

                delegationService.calculateDelegationSum(delegation);
                delegationService.addDelegation(delegation, email);
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Success");

    }

    @PostMapping(value = "worker/add/{email}/{delnumber}")
    public ResponseEntity<String> submitDelegation(@RequestBody Delegation delegation, @PathVariable String email, @PathVariable String delnumber){

        delegationService.calculateDelegationSum(delegation);
        delegationService.submitDelegation(delegation, email, delnumber);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success");
    }



    @PutMapping(value = "accountant/changestatus/{delnumber}/{delstatus}")
    public ResponseEntity<String> changeDelegationStatus(@RequestBody Delegation delegation, @PathVariable String delnumber, @PathVariable String delstatus, @RequestHeader("If-Match") @NotNull String etag){

        try {
            delegationService.changeDelegationStatus(delegation,delnumber,delstatus, etag);
        } catch (StatusConflictException | EntityIntegrityException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
        log.error("jestem w delegation controlerze 2");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success");



    }

    @PutMapping(value = "worker/resubmit/{delnumber}/{delstatus}")
    public ResponseEntity<String> resubmitDelegation(@RequestBody Delegation delegation, @PathVariable String delnumber, @PathVariable String delstatus){

        log.error("jestem w delegation controlerze");
        delegationService.calculateDelegationSum(delegation);
        delegationService.resubmitDelegation(delegation,delnumber,delstatus);
        log.error("jestem w delegation controlerze 2");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success");



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
                    .eTag(EntityIdentitySignerVerifier.calculateEntitySignature(delegation))
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

