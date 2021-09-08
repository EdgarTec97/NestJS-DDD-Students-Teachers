import { Injectable } from '@nestjs/common';
import { StudentsPerTeacherRepository } from '../../domain/StudentsPerTeacherRepository';
import { students } from 'src/db';
import { StudentValueId } from '../../../shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../../shared/domain/ids/TeacherValueId';
import { Student } from '../../../students/domain/Student';

@Injectable()
export class StudentsPerTeacherRepositoryMemory
  implements StudentsPerTeacherRepository
{
  private students = students;
  constructor() {}
  async changeStudentsPerTeacherRepository(
    studentId: StudentValueId,
    teacherId: TeacherValueId,
  ): Promise<Student> {
    let updatedStudent: any;
    const updatedStudentList = await this.students.map((student) => {
      if (student.id == studentId.getValue()) {
        updatedStudent = {
          ...student,
          teacherId: teacherId.getValue(),
        };
        return updatedStudent;
      } else {
        return student;
      }
    });
    this.students = updatedStudentList;
    return updatedStudent;
  }
}
