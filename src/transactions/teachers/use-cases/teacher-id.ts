import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { FindTeacherResponseDTO } from '../../../api/v1/teachers/dtos/teacher.dto';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import {
  TeacherRepository,
  TEACHER_REPOSITORY_TOKEN,
} from '../domain/TeacherRepository';

@Injectable()
export class TeacherId {
  constructor(
    @Inject(TEACHER_REPOSITORY_TOKEN)
    private teacherRepository: TeacherRepository,
  ) {}
  async execute(teacherId: TeacherValueId) {
    return await this.teacherRepository.getTeacherById(teacherId);
  }
}
