import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import {
  TeacherRepository,
  TEACHER_REPOSITORY_TOKEN,
} from '../domain/TeacherRepository';

@Injectable()
export class TeacherDelete {
  constructor(
    @Inject(TEACHER_REPOSITORY_TOKEN)
    private teacherRepository: TeacherRepository,
  ) {}
  async execute(teacherId: TeacherValueId) {
    return await this.teacherRepository.deleteTeacher(teacherId);
  }
}
