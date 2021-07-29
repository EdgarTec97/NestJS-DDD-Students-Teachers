import { DomainError } from "../../../../transactions/utils/hex/DomainError";
import { DomainErrorCode } from "./DomainErrorCode";

export class AccountAuthenticationFailed extends DomainError {
    constructor(){
        super({
            code: DomainErrorCode.ACCOUNT_AUTHENTICATION_FAILED,
            message: `Either the password is wrong or the account doesn't exists`
        });
    }
}