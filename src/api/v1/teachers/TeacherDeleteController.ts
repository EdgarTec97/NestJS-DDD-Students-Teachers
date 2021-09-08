import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { STUDENTS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { TeacherDelete } from '../../../transactions/teachers/use-cases/teacher-delete';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindTeacherResponseDTO } from './dtos/teacher.dto';

@Controller()
export class TeacherDeleteController {
  constructor(private readonly teacherDelete: TeacherDelete) {}

  @Endpoint({
    status: HttpStatus.CREATED,
    type: FindTeacherResponseDTO,
    description: 'Delete a teacher by id',
    tags: [DocumentationTags.TEACHERS],
  })
  @ApiQuery({
    name: 'teacher id',
    example: '610165f719dba314d653c6e8',
    required: true,
    description: 'Delete a teacher',
  })
  @GuardWithJwt(STUDENTS)
  @Delete('api/v1/teacher/:teacherId')
  async execute(
    @Param('teacherId') teacherId: string,
  ): Promise<string | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.teacherDelete.execute(teacherId);
  }
}
