import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import {
  FindTeacherResponseDTO,
  TeacherDTO,
} from '../../../api/v1/teachers/dtos/teacher.dto';
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
export class TeacherUpdate {
  constructor(
    @Inject(TEACHER_REPOSITORY_TOKEN)
    private teacherRepository: TeacherRepository,
  ) {}
  async execute({
    teacherId,
    name,
    email,
    phoneNumber,
    password,
  }: {
    teacherId: TeacherValueId;
    name: Name;
    email: Email;
    phoneNumber: PhoneNumber;
    password: Password;
  }) {
    return await this.modifyTeacher(
      teacherId,
      name,
      email,
      phoneNumber,
      password,
    );
  }

  private async modifyTeacher(
    teacherId: TeacherValueId,
    name: Name,
    email: Email,
    phoneNumber: PhoneNumber,
    password: Password,
  ) {
    const teacher = Teacher.create(
      teacherId,
      name,
      email,
      phoneNumber,
      password,
    );

    return await this.teacherRepository.updateTeacher(teacher);
  }
}
