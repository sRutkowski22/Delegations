package pl.lodz.p.it.delegation.mod.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import pl.lodz.p.it.delegation.exceptions.DelegationNotFoundException;
import pl.lodz.p.it.delegation.mod.model.Delegation;
import pl.lodz.p.it.delegation.mod.model.DelegationRoute;
import pl.lodz.p.it.delegation.mod.model.DelegationStatuses;
import pl.lodz.p.it.delegation.mod.model.Status;
import pl.lodz.p.it.delegation.mod.repositories.DelegationRepository;
import pl.lodz.p.it.delegation.mod.repositories.DelegationRouteRepository;
import pl.lodz.p.it.delegation.mod.repositories.RateRepository;
import pl.lodz.p.it.delegation.mod.repositories.StatusRepository;
import pl.lodz.p.it.delegation.mod.singleton.RateSingleton;
import pl.lodz.p.it.delegation.mok.model.Account;
import pl.lodz.p.it.delegation.mok.repositories.AccountRepository;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class DelegationService  {

    private final DelegationRepository delegationRepository;
    private final DelegationRouteRepository routeRepository;
    private final RateRepository rateRepository;
    private final AccountRepository accountRepository;
    private final StatusRepository statusRepository;

    public List<Delegation> getDelegationByAccountEmail(String email) throws DelegationNotFoundException {
        if(delegationRepository.findByEmail(email).isEmpty())
            throw new DelegationNotFoundException("No delegations for this user");
        else {
            return delegationRepository.findByEmail(email);
        }

    }

    public List<Delegation> getAllDelegations() throws  DelegationNotFoundException {
        if(delegationRepository.findAll().isEmpty())
            throw new DelegationNotFoundException("No delegations found");
        else {
            return delegationRepository.findAll();
        }
    }

    public Delegation getDelegationByItsNumber(String delegationNumber) throws DelegationNotFoundException {
        if(delegationRepository.findByDelegationNumber(delegationNumber).isPresent()) {
            return delegationRepository.findByDelegationNumber(delegationNumber).get();
        }
        else throw new DelegationNotFoundException("Delegation not found");

    }


    public void addDelegation(Delegation delegation, String email){
        log.error("delegacja "+ delegation.getId() + " account idd "   + delegation.getCrossingForeignBorder()
                + delegation.getCrossingHomeBorder() + delegation.getDelegationNumber() + delegation.getEndDate() + " " + delegation.getStartDate());
        if(delegation.getRouteList() != null)
        for(DelegationRoute route : delegation.getRouteList()){
            route.setDelegation(delegation);
        }
        Account account = accountRepository.findByEmail(email).get();
        Status status = statusRepository.findByStatusName(DelegationStatuses.submitted.toString());

        delegation.setDelegationStatus(status);
        delegation.setAccount(account);
        delegation.setDelegationNumber(UUID.randomUUID().toString());
        delegationRepository.save(delegation);

    }

    public void calculateDelegationSum(Delegation delegation){
        ApplicationContext applicationContext =
                new ClassPathXmlApplicationContext("scopes.xml");

        RateSingleton rateSingleton = (RateSingleton) applicationContext.getBean("rateSingleton1");
        rateSingleton.setRate(rateRepository.findAll().get(0));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        log.error(" Rate singleton " + rateSingleton.getRate().getDomesticAllowance() );
        log.error(" Delegation  " + delegation.getStartDate() );

        double sum = 0;
        if( delegation.getCrossingForeignBorder() == null){
            log.error(" dieta krajowa!! ");
           sum = calculateHomeDelegation( delegation,rateSingleton, delegation.getStartDate(), delegation.getEndDate());
//            Duration delegationDuration = Duration.between(delegation.getStartDate(), delegation.getEndDate());
//            double delegationDurationMinutes = delegationDuration.toMinutes();
//            log.error("delegationdura in minutes " + delegationDurationMinutes);
//            int days = (int) delegationDurationMinutes/60/24;
//            double extrahours = ((delegationDurationMinutes )%1440)/60;
//            log.error("duration home " + delegationDuration + "days " + days + "extrahours " + extrahours);
//            if(days == 0){
//                if(8.0 <= extrahours && extrahours <= 12) {
//                    sum = 0.5 * rateSingleton.getRate().getDomesticAllowance();
//                }else if(Double.compare(extrahours,12) > 0)
//                    sum = rateSingleton.getRate().getDomesticAllowance();
//            }else{
//                sum = days*rateSingleton.getRate().getDomesticAllowance();
//                if(extrahours > 0 && extrahours < 8){
//                    sum += 0.5 * rateSingleton.getRate().getDomesticAllowance();
//                }else if(extrahours > 12){
//                    sum += rateSingleton.getRate().getDomesticAllowance();
//                }
//            }
//            double guaranteedMeals = 1;
//            if(delegation.isGuaranteedDomesticBreakfast()){
//                guaranteedMeals = guaranteedMeals - 0.25;
//            }
//
//            if(delegation.isGuaranteedDomesticDinner()) {
//                guaranteedMeals -= 0.5;
//            }
//
//            if(delegation.isGuaranteedDomesticSupper()){
//                guaranteedMeals -= 0.25;
//            }
//
//            log.error("guaranteed meals po odjeciu "+ guaranteedMeals);
//            log.error("sum "+ sum);
//            sum *= guaranteedMeals;
//            if(delegation.isGuaranteedAccommodation())
//                sum += rateSingleton.getRate().getDomesticAllowance() * 1.5 * days;
//            int numberOfstartedDays = (int) Duration.between(delegation.getStartDate(), delegation.getEndDate()).toDays();
//            if((delegationDurationMinutes%60)>0)
//                numberOfstartedDays+=1;
//            log.error(" number of started days " + numberOfstartedDays);
//            if(delegation.isHomeTransportCharge())
//                sum += numberOfstartedDays * 0.2 * rateSingleton.getRate().getDomesticAllowance();
//            sum -= delegation.getAdvancePayment();
        }else{
            log.error("dieta zagraniczna!! ");

            double foreignDelegationduration = Duration.between(delegation.getCrossingForeignBorder(), delegation.getCrossingHomeBorder()).toMinutes();
            log.error("2 duration " + foreignDelegationduration);
            sum += calculateHomeDelegation(delegation,rateSingleton,delegation.getStartDate(),delegation.getCrossingForeignBorder());
            sum+=calculateHomeDelegation(delegation,rateSingleton,delegation.getCrossingHomeBorder(),delegation.getEndDate());
            double foreignSum=0;
            int days = (int) foreignDelegationduration/60/24;
            double extrahours = ((foreignDelegationduration )%1440)/60;
            log.error("duration abroad " + foreignDelegationduration + "days " + days + "extrahours " + extrahours);
            foreignSum+= days * delegation.getForeignAllowance();
            log.error("foreign sum " + foreignSum);
            if(extrahours <= 8 && extrahours>0){
                foreignSum += 0.33 * delegation.getForeignAllowance();
            }else if(8 < extrahours && extrahours <= 12){
                foreignSum+= 0.5 * delegation.getForeignAllowance();
            }else if(extrahours > 12){
                foreignSum+= delegation.getForeignAllowance();
            }
            double guaranteedMeals = 1;
            if(delegation.isGuaranteedForeignBreakfast()){
                guaranteedMeals -= 0.15;
            }

            if(delegation.isGuaranteedForeignDinner()) {
                guaranteedMeals -= 0.3;
            }

            if(delegation.isGuaranteedForeignSupper()){
                guaranteedMeals -= 0.3;
            }
           foreignSum *= guaranteedMeals;
            sum+=foreignSum;
        }
        if(delegation.getDistance() != 0){
            if(delegation.isGreaterThan900cm3())
                sum += delegation.getDistance() * rateSingleton.getRate().getCarGreaterThan900rate();
            else
                sum += delegation.getDistance() * rateSingleton.getRate().getCarLowerThan900rate();
        }
        sum = Math.round(sum*100.0)/100.0;
        delegation.setSum(sum);
    }

    public double calculateHomeDelegation(Delegation delegation, RateSingleton rateSingleton, LocalDateTime startDate, LocalDateTime endDate){
        Duration delegationDuration = Duration.between(startDate, endDate);
        double sum = 0;
        double delegationDurationMinutes = delegationDuration.toMinutes();
        log.error("delegationdura in minutes " + delegationDurationMinutes);
        int days = (int) delegationDurationMinutes/60/24;
        double extrahours = ((delegationDurationMinutes )%1440)/60;
        log.error("duration home " + delegationDuration + "days " + days + "extrahours " + extrahours);
        if(days == 0){
            if(8.0 <= extrahours && extrahours <= 12) {
                sum = 0.5 * rateSingleton.getRate().getDomesticAllowance();
            }else if(Double.compare(extrahours,12) > 0)
                sum = rateSingleton.getRate().getDomesticAllowance();
        }else{
            sum = days*rateSingleton.getRate().getDomesticAllowance();
            if(extrahours > 0 && extrahours < 8){
                sum += 0.5 * rateSingleton.getRate().getDomesticAllowance();
            }else if(extrahours > 12){
                sum += rateSingleton.getRate().getDomesticAllowance();
            }
        }
        double guaranteedMeals = 1;
        if(delegation.isGuaranteedDomesticBreakfast()){
            guaranteedMeals = guaranteedMeals - 0.25;
        }

        if(delegation.isGuaranteedDomesticDinner()) {
            guaranteedMeals -= 0.5;
        }

        if(delegation.isGuaranteedDomesticSupper()){
            guaranteedMeals -= 0.25;
        }

        log.error("guaranteed meals po odjeciu "+ guaranteedMeals);
        log.error("sum "+ sum);
        sum *= guaranteedMeals;
        if(delegation.isGuaranteedAccommodation())
            sum += rateSingleton.getRate().getDomesticAllowance() * 1.5 * days;
        int numberOfstartedDays = (int) Duration.between(delegation.getStartDate(), delegation.getEndDate()).toDays();
        if((delegationDurationMinutes%60)>0)
            numberOfstartedDays+=1;
        log.error(" number of started days " + numberOfstartedDays);
        if(delegation.isHomeTransportCharge())
            sum += numberOfstartedDays * 0.2 * rateSingleton.getRate().getDomesticAllowance();
        sum -= delegation.getAdvancePayment();
        return sum;
    }

    public void changeDelegationStatus(Delegation del, String delNumber, String delStatus){
        Delegation delegation = delegationRepository.findByDelegationNumber(delNumber).get();
        Status status = statusRepository.findByStatusName(delStatus);
        delegation.setDelegationStatus(status);
        log.error("note " + del.getNote());
        delegation.setNote(del.getNote());
        delegationRepository.save(delegation);

    }

    public List<Delegation> getSubmittedAndVerified() throws DelegationNotFoundException {
        if(delegationRepository.findSubmittedAndVerified().isEmpty())
            throw new DelegationNotFoundException("No delegations found");
        else {
            return delegationRepository.findSubmittedAndVerified();
        }
    }
}
