import { Inject, Injectable } from '@nestjs/common';
import { StudentValueId } from '../../../transactions/shared/domain/ids/StudentValueId';
import { TokenPair } from '../../../transactions/shared/domain/TokenPair';
import {
  JwtService,
  JWT_SERVICE_TOKEN,
} from '../../../transactions/shared/services/jwt/domain/JwtService';
import { Email } from '../../shared/domain/Email';
import { AccountAuthenticationFailed } from '../../shared/domain/errors/AccountAuthenticationFailed';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Password } from '../../shared/domain/Password';
import { Role } from '../../shared/domain/Role';
import { Student } from '../../students/domain/Student';
import { Teacher } from '../../teachers/domain/Teacher';
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

  async execute(
    email: Email,
    password: Password,
    role: Role,
  ): Promise<TokenPair> {
    switch (role.getValue()) {
      case 'student':
        const student: Student = await this.authenticate.findStudentByEmail(
          email,
        );

        const passwordVerify = await student.passwordMatches(password);

        if (!student || !passwordVerify)
          throw new AccountAuthenticationFailed();

        const studentId = StudentValueId.fromString(student.toPrimitives().id);

        return await this.jwtService.createTokenPairForStudent(studentId);

      case 'teacher':
        const teacher: Teacher = await this.authenticate.findTeacherByEmail(
          email,
        );

        const teacherVerify = await teacher.passwordMatches(password);

        if (!teacher || !teacherVerify) throw new AccountAuthenticationFailed();

        const teacherId = TeacherValueId.fromString(teacher.toPrimitives().id);

        return await this.jwtService.createTokenPairForTeacher(teacherId);

      default:
        throw new AccountAuthenticationFailed();
    }
  }
}
