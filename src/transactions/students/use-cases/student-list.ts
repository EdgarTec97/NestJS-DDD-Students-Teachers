import { Inject, Injectable } from '@nestjs/common';
import { STUDENT_REPOSITORY_TOKEN, StudentRepository } from '../domain/StudentRepository';

@Injectable()
export class StudentList {
    constructor(@Inject(STUDENT_REPOSITORY_TOKEN) private studentRepository: StudentRepository){}
    async execute(){
        return await this.studentRepository.getStudents();
    }
}
