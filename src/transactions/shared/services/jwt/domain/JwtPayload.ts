import { Role } from "./Role";

export type JwtPayload = {
    iat: number;
    exp: number;
    sub: string;
    role: Role;
    accessTokenRole?: Role;
};

export type JwtPayloadForRefreshToken = JwtPayload & { accessTokenRole: Role };

export type RequestWithJwt<T> = {
    jwtPayload: T;
};

export type RequestWithJwtPayload = RequestWithJwt<JwtPayload>;