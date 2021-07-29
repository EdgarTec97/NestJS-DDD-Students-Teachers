import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StudentId } from '../../../transactions/students/use-cases/student-id';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO } from './dto/student.dto';

@Controller()
export class StudentByIdController {
    constructor(private readonly studentId: StudentId){}
    @Endpoint({
        status: HttpStatus.OK,
        type: FindStudentsResponseDTO,
        description: 'Show a student by id',
        tags: [DocumentationTags.STUDENTS]
    })
    @ApiQuery({
        name: 'student id',
        example: '610165f719dba314d653c6e8',
        required: true,
        description: 'Get data of a student'
    })
    @Get('api/v1/student/:studentId')
    async execute(
        @Param('studentId') studentId: string
    ): Promise<FindStudentsResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR>{
        const result = await this.studentId.execute(studentId);
        return result;
    }
}