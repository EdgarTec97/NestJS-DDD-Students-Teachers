import { Inject, Injectable } from '@nestjs/common';
import { StudentDTO } from '../../../api/v1/students/dtos/student.dto';
import { Email } from '../../shared/domain/Email';
import { StudentValueId } from '../../shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Name } from '../../shared/domain/Name';
import { Password } from '../../shared/domain/Password';
import { PhoneNumber } from '../../shared/domain/PhoneNumber';
import { Student } from '../domain/Student';
import {
  STUDENT_REPOSITORY_TOKEN,
  StudentRepository,
} from '../domain/StudentRepository';

@Injectable()
export class StudentUpdate {
  constructor(
    @Inject(STUDENT_REPOSITORY_TOKEN)
    private studentRepository: StudentRepository,
  ) {}
  async execute({
    studentId,
    name,
    email,
    phoneNumber,
    password,
    teacherId,
  }: {
    studentId: StudentValueId;
    name: Name;
    email: Email;
    phoneNumber: PhoneNumber;
    password: Password;
    teacherId: TeacherValueId;
  }) {
    return await this.modifyStudent(
      studentId,
      name,
      email,
      phoneNumber,
      password,
      teacherId,
    );
  }

  private async modifyStudent(
    studentId: StudentValueId,
    name: Name,
    email: Email,
    phoneNumber: PhoneNumber,
    password: Password,
    teacherId: TeacherValueId,
  ) {
    const student = Student.create(
      studentId,
      name,
      email,
      phoneNumber,
      password,
      teacherId,
    );

    return await this.studentRepository.updateStudent(student);
  }
}
