import { Inject, Injectable } from '@nestjs/common';
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
export class StudentCreate {
  constructor(
    @Inject(STUDENT_REPOSITORY_TOKEN)
    private studentRepository: StudentRepository,
  ) {}
  async execute({
    name,
    email,
    phoneNumber,
    password,
    teacherId,
  }: {
    name: Name;
    email: Email;
    phoneNumber: PhoneNumber;
    password: Password;
    teacherId: TeacherValueId;
  }): Promise<void> {
    const student = await this.registerStudent(
      name,
      email,
      phoneNumber,
      password,
      teacherId,
    );
  }

  private async registerStudent(
    name: Name,
    email: Email,
    phoneNumber: PhoneNumber,
    password: Password,
    teacherId: TeacherValueId,
  ) {
    const student = Student.create(
      StudentValueId.fromString(''),
      name,
      email,
      phoneNumber,
      password,
      teacherId,
    );

    if (student.hasMockedEmail()) student.verifyEmail();

    await this.studentRepository.createStudent(student);
  }
}
