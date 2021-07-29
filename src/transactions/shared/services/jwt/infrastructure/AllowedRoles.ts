import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RequestWithJwtPayload } from "../domain/JwtPayload";
import { Role } from "../domain/Role";

@Injectable()
export class AllowedRolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        
        const req = context.switchToHttp().getRequest() as RequestWithJwtPayload;

        return roles.includes(req.jwtPayload.role);
    }
}