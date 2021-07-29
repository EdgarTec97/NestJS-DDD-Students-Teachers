import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StudentCreate } from '../../../transactions/students/use-cases/student-create';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO, StudentDTO } from './dto/student.dto';

@Controller()
export class StudentCreateController{
    constructor(private readonly studentCreate: StudentCreate){}
    
    @Endpoint({
        status: HttpStatus.CREATED,
        type: FindStudentsResponseDTO,
        description: 'Create a student',
        tags: [DocumentationTags.STUDENTS]
    })
    @ApiQuery({
        name: 'student data',
        example: {name: 'Admin', email: 'admin@admin.com', password: 'admin123', teacherID: '610165f719dba314d653c6e8'},
        required: true,
        description: 'Create a student'
    })
    @Post('api/v1/student')
    async createStudent(@Body() body: StudentDTO): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
        return await this.studentCreate.execute(body);
    }
}