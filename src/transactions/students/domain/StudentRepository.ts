import { StudentValueId } from '../../shared/domain/ids/StudentValueId';
import { Paginated } from '../../shared/utils/hex/Paginated';
import { Student } from './Student';

export const STUDENT_REPOSITORY_TOKEN = 'StudentRepositoryToken';

export interface StudentRepository {
  getStudents(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Student>>;
  getStudentById(studentId: StudentValueId): Promise<Student>;
  createStudent(student: Student): Promise<void>;
  updateStudent(payload: Student): Promise<Student>;
  deleteStudent(studentId: StudentValueId): Promise<void>;
}
