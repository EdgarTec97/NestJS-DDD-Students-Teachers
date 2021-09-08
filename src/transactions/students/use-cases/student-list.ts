import { Inject, Injectable } from '@nestjs/common';
import { Paginated } from '../../shared/utils/hex/Paginated';
import { Student } from '../domain/Student';
import {
  STUDENT_REPOSITORY_TOKEN,
  StudentRepository,
} from '../domain/StudentRepository';

@Injectable()
export class StudentList {
  constructor(
    @Inject(STUDENT_REPOSITORY_TOKEN)
    private studentRepository: StudentRepository,
  ) {}
  async execute(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Student>> {
    return await this.studentRepository.getStudents(numberOfItems, offset);
  }
}
