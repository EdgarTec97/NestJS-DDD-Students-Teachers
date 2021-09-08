import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  FindStudentsResponseDTO,
  StudentDTO,
} from '../../../../api/v1/students/dtos/student.dto';
import { StudentRepository } from '../../domain/StudentRepository';
import { students } from 'src/db';
import { Student, StudentPrimitives } from '../../domain/Student';
import { StudentValueId } from '../../../shared/domain/ids/StudentValueId';
import { Paginated } from '../../../shared/utils/hex/Paginated';

@Injectable()
export class StudentRepositoryMemory implements StudentRepository {
  private students = students;

  async getStudents(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Student>> {
    return new Paginated<Student>(
      students.map(Student.fromPrimitives),
      offset,
      numberOfItems,
      students.length,
    );
  }

  async getStudentById(
    studentId: StudentValueId,
  ): Promise<Student | undefined> {
    const student = (await this.students.find(
      (student) => student.id === studentId.getValue(),
    )) as StudentPrimitives;
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }
    return Student.fromPrimitives(student);
  }

  async createStudent(student: Student): Promise<void> {
    const studentEntity = student.toPrimitives();
    delete studentEntity.id;
    let newStudent = {
      id: uuid(),
      ...studentEntity,
    };
    await this.students.push(newStudent);
  }

  async updateStudent(payload: Student): Promise<Student> {
    const studentEntity = payload.toPrimitives();
    let updatedStudent: any;
    const updatedStudentList = await this.students.map((student) => {
      if (student.id == studentEntity.id) {
        updatedStudent = {
          ...studentEntity,
        };
        return updatedStudent;
      } else {
        return student;
      }
    });
    this.students = updatedStudentList;
    return updatedStudent;
  }

  async deleteStudent(studentId: StudentValueId): Promise<void> {
    let i = 0;
    this.students.forEach((item, index) => {
      if (item.id === studentId.getValue()) {
        this.students.splice(index, 1);
        i++;
      }
    });
    if (i == 0) {
      throw new NotFoundException('Student Not Found');
    }
  }
}
