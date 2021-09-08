import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FindTeacherResponseDTO } from '../../../api/v1/teachers/dtos/teacher.dto';
import { Paginated } from '../../shared/utils/hex/Paginated';
import { Teacher } from '../domain/Teacher';
import {
  TeacherRepository,
  TEACHER_REPOSITORY_TOKEN,
} from '../domain/TeacherRepository';

@Injectable()
export class TeacherList {
  constructor(
    @Inject(TEACHER_REPOSITORY_TOKEN)
    private readonly teacherRepository: TeacherRepository,
  ) {}
  async execute(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Teacher>> {
    return await this.teacherRepository.getTeachers(numberOfItems, offset);
  }
}
