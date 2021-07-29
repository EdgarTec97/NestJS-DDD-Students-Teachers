import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FindTeacherResponseDTO } from "../../../api/v1/teachers/dto/teacher.dto";
import { TeacherRepository, TEACHER_REPOSITORY_TOKEN } from "../domain/TeacherRepository";

@Injectable()
export class TeacherList{
    constructor(@Inject(TEACHER_REPOSITORY_TOKEN) private readonly teacherRepository: TeacherRepository){}
    async execute(): Promise<FindTeacherResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR>{
        return await this.teacherRepository.getTeachers();
    }
}