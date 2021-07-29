import { ValueObject } from "../../../transactions/utils/hex/ValueObject";
import { AccessToken } from "../services/jwt/domain/tokens/AccessToken";

export class TokenPair extends ValueObject{
    constructor(
        private readonly accessToken: AccessToken,
        private readonly refrestToken: AccessToken
    ){
        super();
    }

    toPrimitives() {
        return {
            accessToken: this.accessToken.getValue(),
            refreshToken: this.refrestToken.getValue()
        };
    }
}