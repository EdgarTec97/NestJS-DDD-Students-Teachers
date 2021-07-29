import { Module } from "@nestjs/common";
import { JWT_SERVICE_TOKEN } from "./domain/JwtService";
import { JwtServiceNest } from "./infrastructure/JwtServiceNest";

@Module({
    providers:[{
        provide: JWT_SERVICE_TOKEN,
        useClass: JwtServiceNest
    }],
    exports: [JWT_SERVICE_TOKEN]
})
export class JwtServiceModule{}