import { Inject, Injectable } from '@nestjs/common';
import { StudentDTO } from '../../../api/v1/students/dto/student.dto';
import { STUDENT_REPOSITORY_TOKEN, StudentRepository } from '../domain/StudentRepository';

@Injectable()
export class StudentDelete {
    constructor(@Inject(STUDENT_REPOSITORY_TOKEN) private studentRepository: StudentRepository){}
    async execute(studentId: string){
        return await this.studentRepository.deleteStudent(studentId);
    }
}
