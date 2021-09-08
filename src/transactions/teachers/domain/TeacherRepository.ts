import { HttpStatus } from '@nestjs/common';
import {
  FindTeacherResponseDTO,
  TeacherDTO,
} from '../../../api/v1/teachers/dtos/teacher.dto';

export const TEACHER_REPOSITORY_TOKEN = 'TeacherRepositoryToken';

export interface TeacherRepository {
  getTeachers(): Promise<
    FindTeacherResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR
  >;
  getTeacherById(
    teacherId: string,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
  createTeacher(
    payload: TeacherDTO,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
  updateTeacher(
    payload: TeacherDTO,
    teacherId: string,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>;
  deleteTeacher(
    teacherId: string,
  ): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR>;
}
