package pl.lodz.p.it.delegation.utils;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import lombok.extern.slf4j.Slf4j;
import pl.lodz.p.it.delegation.mod.model.EntitySignature;

import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Slf4j
public class EntityIdentitySignerVerifier {

    // Obtained from: https://mkjwk.org/ type: oct
    // This should be written in some descriptor, not hardcoded!
    private static final String SECRET = "rPIU2CxA7hF01T-y7CmW_yM8QF2x5Uv-l9A_Q9rnE9bvfhqJHxaG8FXJQ852q2uRMfJlIReu1cI0m0U4pIIliD2buDO_IlZzsPAkv9QwM6NQ3nadZAXt70mczF4CaM7tC40T1IXw1M3vC2bDBDMDl6ApJOoOMQL92JU7JxqjFYsUigXwMTaWK78NEId2QkKI_gviDO7rXYQe-AJ4m1Xe7IId9gEWWDyAHct9sb9O0APDKqzM4FZYSTHfRvXgi8e2qHTVBrjGfSaB3fEFI-Oz84uZbGJ7Qb3Ds16uJh9-212WhT_TMhpe_MLjafaYsAHkfBw4cRTbFWFwVqGQeIpDFw";

    public static String calculateEntitySignature(EntitySignature entity) {
        try {
            // Create HMAC signer
            JWSSigner signer = new MACSigner(SECRET);
            // Prepare JWS object with entity signable payload
            JWSObject jwsObject = new JWSObject(new JWSHeader(JWSAlgorithm.HS256), new Payload(entity.getSignaturePayload()));
            // Apply the HMAC
            jwsObject.sign(signer);

            return jwsObject.serialize();
        } catch (JOSEException jex) {
            Logger.getLogger(EntityIdentitySignerVerifier.class.getName()).log(Level.SEVERE, null, jex);
            return "ETag failure";
        }

    }

    public static boolean validateEntitySignature(String tagValue)  {
        // this is ONLY validation of the signature itself
        try {
            JWSObject jwsObject = JWSObject.parse(tagValue);
            log.error("jws object " + jwsObject.toString());
            JWSVerifier verifier = new MACVerifier(SECRET);
            log.error("jws verifier " + verifier.toString());

            return jwsObject.verify(verifier);
        } catch (ParseException | JOSEException ex) {
            Logger.getLogger(EntityIdentitySignerVerifier.class.getName()).log(Level.SEVERE, null, ex);
            return false; //assume worst scenario!
        }
    }

    public static boolean verifyEntityIntegrity(String tagValue, EntitySignature entity)  {
        // This is REAL verification of entity immutable data integrity
        try {

            final String valueFromIfMatchHeader = JWSObject.parse(tagValue).getPayload().toString();
            final String valueFromEntitySignablePayload = entity.getSignaturePayload();
            log.error("validating " + validateEntitySignature(tagValue) + " " + valueFromIfMatchHeader + " " + valueFromEntitySignablePayload );

            return validateEntitySignature(tagValue) && valueFromIfMatchHeader.equals(valueFromEntitySignablePayload);
        } catch (ParseException ex) {

            return false; //assume worst scenario!
        }
    }

}