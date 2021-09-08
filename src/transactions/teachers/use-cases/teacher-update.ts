import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import {
  FindTeacherResponseDTO,
  TeacherDTO,
} from '../../../api/v1/teachers/dtos/teacher.dto';
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
  async execute(
    teacher: TeacherDTO,
    teacherId: string,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.teacherRepository.updateTeacher(teacher, teacherId);
  }
}
