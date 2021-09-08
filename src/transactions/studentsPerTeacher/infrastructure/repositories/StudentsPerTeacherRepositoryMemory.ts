import { HttpStatus, Injectable } from '@nestjs/common';
import { FindStudentsResponseDTO } from '../../../../api/v1/students/dtos/student.dto';
import { StudentsPerTeacherRepository } from '../../domain/StudentsPerTeacherRepository';
import { students } from 'src/db';

@Injectable()
export class StudentsPerTeacherRepositoryMemory
  implements StudentsPerTeacherRepository
{
  private students = students;
  constructor() {}
  async changeStudentsPerTeacherRepository(
    studentId: string,
    teacherId: string,
  ): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    try {
      let updatedStudent: any;
      const updatedStudentList = await this.students.map((student) => {
        if (student.id == studentId) {
          updatedStudent = {
            ...student,
            teacherId: teacherId,
          };
          return updatedStudent;
        } else {
          return student;
        }
      });
      this.students = updatedStudentList;
      return updatedStudent;
    } catch (error) {
      console.log(error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
