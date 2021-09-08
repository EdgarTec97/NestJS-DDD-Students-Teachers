import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TeacherRepository } from '../../domain/TeacherRepository';
import { teachers } from 'src/db';
import { Teacher, TeacherPrimitives } from '../../domain/Teacher';
import { TeacherValueId } from '../../../shared/domain/ids/TeacherValueId';
import { Paginated } from '../../../shared/utils/hex/Paginated';

export class TeacherRepositoryMemory implements TeacherRepository {
  private teachers = teachers;
  async getTeachers(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Teacher>> {
    return new Paginated<Teacher>(
      teachers.map(Teacher.fromPrimitives),
      offset,
      numberOfItems,
      teachers.length,
    );
  }
  async getTeacherById(teacherId: TeacherValueId): Promise<Teacher> {
    const teacher = (await this.teachers.find(
      (teacher) => teacher.id === teacherId.getValue(),
    )) as TeacherPrimitives;
    if (!teacher) {
      throw new NotFoundException('No se a encontrado el profesor');
    }
    return Teacher.fromPrimitives(teacher);
  }
  async createTeacher(teacher: Teacher): Promise<void> {
    const teacherEntity = teacher.toPrimitives();
    delete teacherEntity.id;
    let newTeacher = {
      id: uuid(),
      ...teacherEntity,
    };
    await this.teachers.push(newTeacher);
  }
  async updateTeacher(payload: Teacher): Promise<Teacher> {
    const teacherEntity = payload.toPrimitives();
    let updatedTeacher: any;
    const updatedTeacherList = await this.teachers.map((teacher) => {
      if (teacher.id == teacherEntity.id) {
        updatedTeacher = {
          ...teacherEntity,
        };
        return updatedTeacher;
      } else {
        return teacher;
      }
    });
    this.teachers = updatedTeacherList;
    return updatedTeacher;
  }
  async deleteTeacher(teacherId: TeacherValueId): Promise<void> {
    let i = 0;
    this.teachers.forEach((item, index) => {
      if (item.id === teacherId.getValue()) {
        this.teachers.splice(index, 1);
        i++;
      }
    });
    if (i == 0) {
      throw new NotFoundException('Teacher Not Found');
    }
  }
}
