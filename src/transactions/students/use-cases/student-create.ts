import { Inject, Injectable } from '@nestjs/common';
import { StudentDTO } from '../../../api/v1/students/dto/student.dto';
import { STUDENT_REPOSITORY_TOKEN, StudentRepository } from '../domain/StudentRepository';

@Injectable()
export class StudentCreate {
    constructor(@Inject(STUDENT_REPOSITORY_TOKEN) private studentRepository: StudentRepository){}
    async execute(student: StudentDTO){
        return await this.studentRepository.createStudent(student);
    }
}
