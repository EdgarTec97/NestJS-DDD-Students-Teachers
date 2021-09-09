import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  STUDENTS,
  TEACHERS,
} from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { StudentList } from '../../../transactions/students/use-cases/student-list';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { PaginatedStudentDTO } from './dtos/PaginatedStudent.dto';
import { FindStudentsResponseDTO } from './dtos/student.dto';

@Controller()
export class StudentListController {
  constructor(private readonly studentListService: StudentList) {}

  @Endpoint({
    status: HttpStatus.OK,
    type: FindStudentsResponseDTO,
    isArray: true,
    description: 'List students in the web application',
    tags: [DocumentationTags.STUDENTS],
  })
  @ApiQuery({
    name: 'category',
    example: 'students',
    required: false,
    description: 'Get students',
  })
  @GuardWithJwt(STUDENTS.concat(TEACHERS))
  @Get('api/v1/students')
  async execute(
    @Query('offset') offset?: number,
    @Query('numberOfItems') numberOfItems?: number,
  ): Promise<PaginatedStudentDTO> {
    const paginatedStudent = await this.studentListService.execute(
      Number(numberOfItems ?? 5),
      Number(offset ?? 0),
    );
    return PaginatedStudentDTO.fromDomain(paginatedStudent);
  }
}
