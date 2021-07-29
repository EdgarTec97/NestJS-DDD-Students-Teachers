import { Module } from "@nestjs/common";
import { AuthenticateController } from "../../api/v1/auth/AuthenticateController";
import { JWT_SERVICE_TOKEN } from "../shared/services/jwt/domain/JwtService";
import { JwtServiceNest } from "../shared/services/jwt/infrastructure/JwtServiceNest";
import { AuthenticateRepositoryModule } from "./infrastructure/repositories/authenticate-repository.module";
import { Authenticate } from "./use-cases/authenticate";

@Module({
    imports: [AuthenticateRepositoryModule],
    controllers: [
        AuthenticateController
    ],
    providers:[
        Authenticate,
        {
            provide: JWT_SERVICE_TOKEN,
            useClass: JwtServiceNest
        }
    ],
    exports: []
})
export class AuthModule{}