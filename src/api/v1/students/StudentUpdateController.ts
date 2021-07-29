import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StudentUpdate } from '../../../transactions/students/use-cases/student-update';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO, StudentDTO } from './dto/student.dto';

@Controller()
export class StudentUpdateController{
    constructor(private readonly studentUpdate: StudentUpdate){}

    @Endpoint({
        status: HttpStatus.CREATED,
        type: FindStudentsResponseDTO,
        description: 'Update a student',
        tags: [DocumentationTags.STUDENTS]
    })
    @ApiQuery({
        name: 'student data',
        example: {studentId: '610165f719dba314d653c6e8', name: 'Admin', email: 'admin@admin.com', password: 'admin123', teacherID: '610165f719dba314d653c6e8'},
        required: true,
        description: 'Update a student'
    })
    @Put('api/v1/student/:studentId')
    async createStudent(
        @Body() body: StudentDTO,
        @Param('studentId') studentId: string
    ): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        return await this.studentUpdate.execute(body,studentId);
    }
}