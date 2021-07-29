import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { STUDENTS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { StudentDelete } from '../../../transactions/students/use-cases/student-delete';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO } from './dto/student.dto';

@Controller()
export class StudentDeleteController{
    constructor(private readonly studentDelete: StudentDelete){}

    @Endpoint({
        status: HttpStatus.CREATED,
        type: FindStudentsResponseDTO,
        description: 'Delete a student',
        tags: [DocumentationTags.STUDENTS]
    })
    @ApiQuery({
        name: 'student id',
        example: '610165f719dba314d653c6e8',
        required: true,
        description: 'Delete a student'
    })
    @GuardWithJwt(STUDENTS)
    @Delete('api/v1/student/:studentId')
    async createStudent(
        @Param('studentId') studentId: string
    ): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR> {
        return await this.studentDelete.execute(studentId);
    }
}