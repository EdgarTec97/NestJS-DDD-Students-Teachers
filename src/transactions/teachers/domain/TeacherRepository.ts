import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Paginated } from '../../shared/utils/hex/Paginated';
import { Teacher } from './Teacher';

export const TEACHER_REPOSITORY_TOKEN = 'TeacherRepositoryToken';

export interface TeacherRepository {
  getTeachers(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Teacher>>;
  getTeacherById(teacherId: TeacherValueId): Promise<Teacher>;
  createTeacher(teacher: Teacher): Promise<void>;
  updateTeacher(teacher: Teacher): Promise<Teacher>;
  deleteTeacher(teacherId: TeacherValueId): Promise<void>;
}
