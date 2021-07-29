import {Inject, Injectable, HttpStatus } from '@nestjs/common';
import { TeacherRepository, TEACHER_REPOSITORY_TOKEN } from '../domain/TeacherRepository';

@Injectable()
export class TeacherDelete{
    constructor(@Inject(TEACHER_REPOSITORY_TOKEN) private teacherRepository: TeacherRepository){}
    async execute(teacherId: string): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR>{
        return await this.teacherRepository.deleteTeacher(teacherId);
    }
}