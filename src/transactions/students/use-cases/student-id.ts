import { Inject, Injectable } from '@nestjs/common';
import { STUDENT_REPOSITORY_TOKEN, StudentRepository } from '../domain/StudentRepository';

@Injectable()
export class StudentId {
    constructor(@Inject(STUDENT_REPOSITORY_TOKEN) private studentRepository: StudentRepository){}
    async execute(studentId: string){
        return await this.studentRepository.getStudentById(studentId);
    }
}
