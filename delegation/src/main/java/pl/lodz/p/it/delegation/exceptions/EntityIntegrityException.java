package pl.lodz.p.it.delegation.exceptions;


import pl.lodz.p.it.delegation.mod.model.EntitySignature;

public class EntityIntegrityException extends AppBaseException {

    public EntityIntegrityException() {
        super();
    }

    public EntityIntegrityException(String message) {
        super(message);
    }

}
