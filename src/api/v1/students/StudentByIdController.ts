import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StudentValueId } from '../../../transactions/shared/domain/ids/StudentValueId';
import {
  STUDENTS,
  TEACHERS,
} from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { Student } from '../../../transactions/students/domain/Student';
import { StudentId } from '../../../transactions/students/use-cases/student-id';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO } from './dtos/student.dto';

@Controller()
export class StudentByIdController {
  constructor(private readonly studentId: StudentId) {}
  @Endpoint({
    status: HttpStatus.OK,
    type: FindStudentsResponseDTO,
    description: 'Show a student by id',
    tags: [DocumentationTags.STUDENTS],
  })
  @ApiQuery({
    name: 'student id',
    example: '610165f719dba314d653c6e8',
    required: true,
    description: 'Get data of a student',
  })
  @GuardWithJwt(STUDENTS.concat(TEACHERS))
  @Get('api/v1/student/:studentId')
  async execute(
    @Param('studentId') studentId: string,
  ): Promise<FindStudentsResponseDTO> {
    const student: Student = await this.studentId.execute(
      StudentValueId.fromString(studentId),
    );
    return FindStudentsResponseDTO.fromDomain(student);
  }
}
