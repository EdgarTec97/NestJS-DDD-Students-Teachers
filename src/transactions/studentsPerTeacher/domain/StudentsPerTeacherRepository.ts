import { HttpStatus } from '@nestjs/common';
import { FindStudentsResponseDTO } from '../../../api/v1/students/dtos/student.dto';

export const STUDENTS_PER_TEACHER_REPOSITORY_TOKEN =
  'StudentsPerTeacherRepositoryToken';

export interface StudentsPerTeacherRepository {
  changeStudentsPerTeacherRepository(
    studentId: string,
    teacherId: string,
  ): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
}
