import { Inject, Injectable } from '@nestjs/common';
import { Email } from '../../shared/domain/Email';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Name } from '../../shared/domain/Name';
import { Password } from '../../shared/domain/Password';
import { PhoneNumber } from '../../shared/domain/PhoneNumber';
import { Teacher } from '../domain/Teacher';
import {
  TeacherRepository,
  TEACHER_REPOSITORY_TOKEN,
} from '../domain/TeacherRepository';

@Injectable()
export class TeacherCreate {
  constructor(
    @Inject(TEACHER_REPOSITORY_TOKEN)
    private teacherRepository: TeacherRepository,
  ) {}
  async execute({
    name,
    email,
    phoneNumber,
    password,
  }: {
    name: Name;
    email: Email;
    phoneNumber: PhoneNumber;
    password: Password;
  }): Promise<void> {
    const teacher = await this.registerTeacher(
      name,
      email,
      phoneNumber,
      password,
    );
  }

  private async registerTeacher(
    name: Name,
    email: Email,
    phoneNumber: PhoneNumber,
    password: Password,
  ) {
    const teacher = Teacher.create(
      TeacherValueId.fromString(''),
      name,
      email,
      phoneNumber,
      password,
    );
    if (teacher.hasMockedEmail()) teacher.verifyEmail();

    await this.teacherRepository.createTeacher(teacher);
  }
}
