import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindStudentsResponseDTO } from '../../../api/v1/students/dtos/student.dto';
import {
  StudentsPerTeacherRepository,
  STUDENTS_PER_TEACHER_REPOSITORY_TOKEN,
} from '../domain/StudentsPerTeacherRepository';

@Injectable()
export class StudentsPerTeacher {
  constructor(
    @Inject(STUDENTS_PER_TEACHER_REPOSITORY_TOKEN)
    private studentPerTeacherRepository: StudentsPerTeacherRepository,
  ) {}
  async execute(
    studentId: string,
    teacherId: string,
  ): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.studentPerTeacherRepository.changeStudentsPerTeacherRepository(
      studentId,
      teacherId,
    );
  }
}
