import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StudentList } from '../../../transactions/students/use-cases/student-list';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO } from './dto/student.dto';

@Controller()
export class StudentListController{
    constructor(private readonly studentListService: StudentList){}

    @Endpoint({
        status: HttpStatus.OK,
        type: FindStudentsResponseDTO,
        isArray: true,
        description: 'List students in the web application',
        tags: [DocumentationTags.STUDENTS]
    })
    @ApiQuery({
        name: 'category',
        example: 'teachers',
        required: false,
        description: 'Get students'
    })
    @Get('api/v1/students')
    async execute(): Promise<FindStudentsResponseDTO[] | HttpStatus.INTERNAL_SERVER_ERROR>{
        const result = await this.studentListService.execute();
        return result;
    }
}