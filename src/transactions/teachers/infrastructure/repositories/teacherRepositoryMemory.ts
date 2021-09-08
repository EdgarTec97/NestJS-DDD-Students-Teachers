import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import {
  FindTeacherResponseDTO,
  TeacherDTO,
} from '../../../../api/v1/teachers/dtos/teacher.dto';
import { TeacherRepository } from '../../domain/TeacherRepository';
import { teachers } from 'src/db';

export class TeacherRepositoryMemory implements TeacherRepository {
  private teachers = teachers;
  async getTeachers(): Promise<
    FindTeacherResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR
  > {
    try {
      return await this.teachers;
    } catch (error) {
      console.log(error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
  async getTeacherById(
    teacherId: string,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    try {
      return await this.teachers.find((teacher) => teacher.id === teacherId);
    } catch (error) {
      console.log(error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
  async createTeacher(
    payload: TeacherDTO,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    try {
      let newTeacher = {
        id: uuid(),
        ...payload,
      };
      await this.teachers.push(newTeacher);
      return newTeacher;
    } catch (error) {
      console.log(error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
  async updateTeacher(
    payload: TeacherDTO,
    teacherId: string,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    try {
      let updatedTeacher: FindTeacherResponseDTO;
      const updatedTeacherList = await this.teachers.map((teacher) => {
        if (teacher.id == teacherId) {
          updatedTeacher = {
            id: teacherId,
            ...payload,
          };
          return updatedTeacher;
        } else {
          return teacher;
        }
      });
      this.teachers = updatedTeacherList;
      return updatedTeacher;
    } catch (error) {
      console.log(error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
  async deleteTeacher(
    teacherId: string,
  ): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR> {
    try {
      let i = 0;
      this.teachers.forEach((item, index) => {
        if (item.id === teacherId) {
          this.teachers.splice(index, 1);
          i++;
        }
      });
      if (i == 0) {
        return 'No se eliminó ningun profesor';
      } else {
        return 'Se eliminó con exito el profesor';
      }
    } catch (error) {
      console.log(error);
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
