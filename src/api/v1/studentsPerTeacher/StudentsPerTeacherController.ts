import { Controller, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { StudentsPerTeacher } from "../../../transactions/studentsPerTeacher/use-cases/Students-per-teacher";
import { DocumentationTags, Endpoint } from "../../../utils/Endpoint";
import { FindStudentsResponseDTO } from "../students/dto/student.dto";

@Controller()
export class StudentsPerTeacherController{
    constructor(private readonly studentsPerTeacher: StudentsPerTeacher){}

    @Endpoint({
        status: HttpStatus.CREATED,
        type: FindStudentsResponseDTO,
        description: 'Update student of teacherId',
        tags: [DocumentationTags.STUDENTSPERTEACHERS]
    })
    @ApiQuery({
        name: 'student id and teacher id',
        example: {studentId: '610165f719dba314d653c6e8', teacherID: '610165f719dba314d653c6e8'},
        required: true,
        description: 'Update a student of teacher'
    })
    @Put('/api/v1/:studentId/student/:teacherId')
    async execute(
        @Param('studentId') studentId: string,
        @Param('teacherId') teacherId: string
    ): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        return await this.studentsPerTeacher.execute(studentId,teacherId);
    }
}