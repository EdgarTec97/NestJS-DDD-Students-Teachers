import { Inject, Injectable } from '@nestjs/common';
import { StudentValueId } from '../../../transactions/shared/domain/ids/StudentValueId';
import { TokenPair } from '../../../transactions/shared/domain/TokenPair';
import {
  JwtService,
  JWT_SERVICE_TOKEN,
} from '../../../transactions/shared/services/jwt/domain/JwtService';
import { Email } from '../../shared/domain/Email';
import { AccountAuthenticationFailed } from '../../shared/domain/errors/AccountAuthenticationFailed';
import { Password } from '../../shared/domain/Password';
import { Student } from '../../students/domain/Student';
import {
  AuthenticateRepository,
  AUTHENTICATE_REPOSITORY_TOKEN,
} from '../domain/AuthenticateRepository';

@Injectable()
export class Authenticate {
  constructor(
    @Inject(AUTHENTICATE_REPOSITORY_TOKEN)
    private readonly authenticate: AuthenticateRepository,
    @Inject(JWT_SERVICE_TOKEN) private readonly jwtService: JwtService,
  ) {}

  async execute(email: Email, password: Password): Promise<TokenPair> {
    const student: Student = await this.authenticate.findOneByEmail(email);

    const passwordVerify = await student.passwordMatches(password);

    if (!student || !passwordVerify) throw new AccountAuthenticationFailed();

    const userId = StudentValueId.fromString(student.toPrimitives().id);

    return await this.jwtService.createTokenPairForStudent(userId);
  }
}
