import { applyDecorators, CanActivate, ExecutionContext, Inject, Injectable, SetMetadata, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { Request } from "express";
import { JwtService, JWT_SERVICE_TOKEN } from "../domain/JwtService";
import { Role } from "../domain/Role";
import { AccessToken } from "../domain/tokens/AccessToken";
import { AllowedRolesGuard } from "./AllowedRoles";

@Injectable()
class JwtAuthGuard implements CanActivate {
    constructor(@Inject(JWT_SERVICE_TOKEN) private readonly jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const authorizationHeader = request.headers.authorization;

        if(!authorizationHeader) throw new UnauthorizedException('Missing authorization header');

        const matches = authorizationHeader.match(/Bearer (.+)/);

        if(!matches) throw new UnauthorizedException('Malformed authorization header');

        const accessToken = new AccessToken(matches[1]);

        await this.jwtService.verify(accessToken);

        const jwtPayload = await this.jwtService.decode(accessToken);

        request.jwtPayload = jwtPayload;

        return true;
    }
}

export enum DocumentationRoles {
    MANAGER_JWT = 'manager-jwt',
    STUDENT_JWT = 'student-jwt',
    LOGIN_ALLOWED_JWT = 'login-allowed-jwt',
    REGISTER_ALLOWED_JWT = 'register-allowed-jwt',
    STUDENT_DEMO_JWT = 'student-allowed-jwt',
    EMAIL_VALIDATOR_JWT = 'email-validator-jwt',
    FINANCES_MANAGER_JWT = 'finances-manager-jwt',
    SET_PASSWORD_ALLOWED_JWT = 'set-password-allowed-jwt',
    REFRESH_TOKEN = 'refresh-token'
}

const roleToDocumentationRole: { [key in Role]: DocumentationRoles } = {
    [Role.MANAGER]: DocumentationRoles.MANAGER_JWT,
    [Role.STUDENT]: DocumentationRoles.STUDENT_JWT,
    [Role.LOGIN_ALLOWED]: DocumentationRoles.LOGIN_ALLOWED_JWT,
    [Role.REGISTER_ALLOWED]: DocumentationRoles.REGISTER_ALLOWED_JWT,
    [Role.STUDENT_DEMO]: DocumentationRoles.STUDENT_DEMO_JWT,
    [Role.EMAIL_VERIFY]: DocumentationRoles.EMAIL_VALIDATOR_JWT,
    [Role.FINANCES_MANAGER]: DocumentationRoles.FINANCES_MANAGER_JWT,
    [Role.ALLOW_SET_PASSWORD]: DocumentationRoles.SET_PASSWORD_ALLOWED_JWT,
    [Role.REFRESH_TOKEN]: DocumentationRoles.REFRESH_TOKEN
};

export function GuardWithJwt(roles: Role[]) {
    const apiSecurities = roles.map((role) => ApiSecurity(roleToDocumentationRole[role]));

    return applyDecorators(
        ApiBearerAuth('access-token'),
        UseGuards(JwtAuthGuard),
        SetMetadata('roles',roles),
        UseGuards(AllowedRolesGuard),
        ...apiSecurities
    );
}