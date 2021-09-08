import { UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { config } from '../../../../../config';
import { ManagerId } from '../../../../../transactions/shared/domain/ids/ManagerId';
import { PhoneNumber } from '../../../../../transactions/shared/domain/PhoneNumber';
import { TokenPair } from '../../../../../transactions/shared/domain/TokenPair';
import { Uuid } from '../../../../../transactions/shared/domain/Uuid';
import { StudentValueId } from '../../../../../transactions/shared/domain/ids/StudentValueId';
import { JwtPayload } from '../domain/JwtPayload';
import { JwtService } from '../domain/JwtService';
import { Role } from '../domain/Role';
import { AccessToken } from '../domain/tokens/AccessToken';
import { ResetPasswordRequestToken } from '../domain/tokens/ResetPasswordRequestToken';

export class JwtServiceNest implements JwtService {
  private jwtNestService = new NestJwtService({
    privateKey: {
      key: config.jwt.privateKey,
      passphrase: config.jwt.secret,
    },
    publicKey: config.jwt.publicKey,
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '1y',
    },
  });

  private async createRefreshToken(
    refreshToken: AccessToken,
  ): Promise<AccessToken> {
    const { role, sub } = this.jwtNestService.decode(
      refreshToken.getValue(),
    ) as JwtPayload;

    const jwt = this.jwtNestService.sign(
      { accessTokenRole: role, role: Role.REFRESH_TOKEN, sub },
      {
        expiresIn: '30d',
      },
    );

    return new AccessToken(jwt);
  }
  private async createManager(managerId: ManagerId): Promise<AccessToken> {
    const payload = {
      role: Role.MANAGER,
      sub: managerId.getValue(),
    };

    const jwt = this.jwtNestService.sign(payload, {
      expiresIn: '7d',
    });

    return new AccessToken(jwt);
  }
  private async createForStudent(
    studentId: StudentValueId,
  ): Promise<AccessToken> {
    const payload = {
      role: Role.STUDENT,
      sub: studentId.getValue(),
    };
    const jwt = this.jwtNestService.sign(payload, {
      expiresIn: '7d',
    });
    return new AccessToken(jwt);
  }
  async sign(uuid: Uuid, role: Role): Promise<AccessToken> {
    const payload = {
      role,
      sub: uuid.getValue(),
    };
    const jwt = this.jwtNestService.sign(payload);

    return new AccessToken(jwt);
  }
  async createForSettingPassword(
    accountId: StudentValueId,
  ): Promise<AccessToken> {
    const payload = {
      role: Role.ALLOW_SET_PASSWORD,
      sub: accountId.getValue(),
    };

    const jwt = this.jwtNestService.sign(payload, {
      expiresIn: '10m',
    });

    return new ResetPasswordRequestToken(jwt);
  }
  async createForRegistering(phoneNumber: PhoneNumber): Promise<AccessToken> {
    const payload = {
      role: Role.REGISTER_ALLOWED,
      sub: phoneNumber.getValue(),
      phoneNumber: phoneNumber.getValue(),
    };

    const jwt = this.jwtNestService.sign(payload, {
      expiresIn: '1h',
    });

    return new AccessToken(jwt);
  }
  async createForLogin(studentId: StudentValueId): Promise<AccessToken> {
    const payload = {
      role: Role.LOGIN_ALLOWED,
      sub: studentId.getValue(),
    };

    const jwt = this.jwtNestService.sign(payload, {
      expiresIn: '1h',
    });

    return new AccessToken(jwt);
  }
  async verify(jwt: AccessToken): Promise<boolean> {
    return this.jwtNestService
      .verifyAsync(jwt.getValue(), {
        ignoreExpiration: false,
      })
      .then(() => true)
      .catch((error) => {
        const code = error.message.replace(' ', '_').toUpperCase();
        const description =
          code === 'JWT_EXPIRED'
            ? `Expired at ${error.expiredAt.toISOString()}`
            : '';

        throw new UnauthorizedException(code, description);
      });
  }
  async decode(jwt: AccessToken): Promise<JwtPayload> {
    return this.jwtNestService.decode(jwt.getValue()) as JwtPayload;
  }
  async createTokenPairForManager(managerId: ManagerId): Promise<TokenPair> {
    const accessToken = await this.createManager(managerId);
    const refreshToken = await this.createRefreshToken(managerId);

    return new TokenPair(accessToken, refreshToken);
  }
  async createTokenPairForStudent(
    studentId: StudentValueId,
  ): Promise<TokenPair> {
    const accessToken = await this.createForStudent(studentId);
    const refreshToken = await this.createRefreshToken(accessToken);

    return new TokenPair(accessToken, refreshToken);
  }
}
