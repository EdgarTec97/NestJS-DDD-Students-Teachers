import { Inject, Injectable } from "@nestjs/common";
import { authDTO } from "../../../api/v1/auth/dto/auth.dto";
import { StudentValueId } from "../../../transactions/shared/domain/ids/StudentValueId";
import { TokenPair } from "../../../transactions/shared/domain/TokenPair";
import { JwtService, JWT_SERVICE_TOKEN } from "../../../transactions/shared/services/jwt/domain/JwtService";
import { AccountAuthenticationFailed } from "../../../transactions/students/domain/errors/AccountAuthenticationFailed";
import { AuthenticateRepository, AUTHENTICATE_REPOSITORY_TOKEN } from "../domain/AuthenticateRepository";

@Injectable()
export class Authenticate{
    constructor(
        @Inject(AUTHENTICATE_REPOSITORY_TOKEN) private readonly authenticate: AuthenticateRepository,
        @Inject(JWT_SERVICE_TOKEN) private readonly jwtService: JwtService
    ){}

    async execute(user: authDTO): Promise<TokenPair>{
        const student = await this.authenticate.findStudent(user);
        if(!student) throw new AccountAuthenticationFailed();
        const userId = StudentValueId.fromString(student.id);
        return await this.jwtService.createTokenPairForStudent(userId);
    }
}