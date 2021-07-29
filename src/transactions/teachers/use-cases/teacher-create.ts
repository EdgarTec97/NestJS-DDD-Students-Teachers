import {Inject, Injectable, HttpStatus } from '@nestjs/common';
import { FindTeacherResponseDTO, TeacherDTO } from '../../../api/v1/teachers/dto/teacher.dto';
import { TeacherRepository, TEACHER_REPOSITORY_TOKEN } from '../domain/TeacherRepository';

@Injectable()
export class TeacherCreate{
    constructor(@Inject(TEACHER_REPOSITORY_TOKEN) private teacherRepository: TeacherRepository){}
    async execute(teacher: TeacherDTO): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        return await this.teacherRepository.createTeacher(teacher);
    }
}