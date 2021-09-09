import { Email } from '../../shared/domain/Email';
import { Student } from '../../students/domain/Student';
import { Teacher } from '../../teachers/domain/Teacher';

export const AUTHENTICATE_REPOSITORY_TOKEN = 'AuthenticateRepositoryToken';

export interface AuthenticateRepository {
  findStudentByEmail(email: Email): Promise<Student>;
  findTeacherByEmail(email: Email): Promise<Teacher>;
}
