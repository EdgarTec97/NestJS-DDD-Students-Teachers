import { Email } from '../../shared/domain/Email';
import { Student } from '../../students/domain/Student';

export const AUTHENTICATE_REPOSITORY_TOKEN = 'AuthenticateRepositoryToken';

export interface AuthenticateRepository {
  findOneByEmail(email: Email): Promise<Student>;
}
