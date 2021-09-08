import { StudentValueId } from '../../shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Student } from '../../students/domain/Student';

export const STUDENTS_PER_TEACHER_REPOSITORY_TOKEN =
  'StudentsPerTeacherRepositoryToken';

export interface StudentsPerTeacherRepository {
  changeStudentsPerTeacherRepository(
    studentId: StudentValueId,
    teacherId: TeacherValueId,
  ): Promise<Student>;
}
