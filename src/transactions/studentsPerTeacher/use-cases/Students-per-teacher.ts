import { Inject, Injectable } from '@nestjs/common';
import { StudentValueId } from '../../shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Student } from '../../students/domain/Student';
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
    studentId: StudentValueId,
    teacherId: TeacherValueId,
  ): Promise<Student> {
    return await this.studentPerTeacherRepository.changeStudentsPerTeacherRepository(
      studentId,
      teacherId,
    );
  }
}
