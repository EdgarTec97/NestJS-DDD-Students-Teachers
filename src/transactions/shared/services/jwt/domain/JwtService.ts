import { PhoneNumber } from '../../../../../transactions/shared/domain/PhoneNumber';
import { TokenPair } from '../../../../../transactions/shared/domain/TokenPair';
import { Uuid } from '../../../../../transactions/shared/domain/Uuid';
import { StudentValueId } from '../../../../../transactions/shared/domain/ids/StudentValueId';
import { JwtPayload } from './JwtPayload';
import { Role } from './Role';
import { AccessToken } from './tokens/AccessToken';
import { TeacherValueId } from '../../../domain/ids/TeacherValueId';

export const JWT_SERVICE_TOKEN = 'JwtServiceToken';

export interface JwtService {
  sign(uuid: Uuid, role: Role): Promise<AccessToken>;
  createTokenPairForStudent(studentId: StudentValueId): Promise<TokenPair>;
  createTokenPairForTeacher(teacherId: TeacherValueId): Promise<TokenPair>;
  createForSettingPassword(accountId: StudentValueId): Promise<AccessToken>;
  createForRegistering(phoneNumber: PhoneNumber): Promise<AccessToken>;
  createForLogin(studentId: StudentValueId): Promise<AccessToken>;
  verify(jwt: AccessToken): Promise<boolean>;
  decode(jwt: AccessToken): Promise<JwtPayload>;
}
