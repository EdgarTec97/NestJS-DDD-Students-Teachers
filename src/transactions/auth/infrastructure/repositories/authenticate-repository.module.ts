import { Module } from "@nestjs/common";
import { AUTHENTICATE_REPOSITORY_TOKEN } from "../../domain/AuthenticateRepository";
import { AuthenticateRepositoryMikroORM } from "./AuthenticateRepositoryMikroORM";

@Module({
    providers: [{
        provide: AUTHENTICATE_REPOSITORY_TOKEN,
        useClass: AuthenticateRepositoryMikroORM
    }],
    exports: [AUTHENTICATE_REPOSITORY_TOKEN]
})
export class AuthenticateRepositoryModule{}