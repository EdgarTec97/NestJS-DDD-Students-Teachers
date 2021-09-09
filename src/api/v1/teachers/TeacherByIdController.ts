import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TeacherValueId } from '../../../transactions/shared/domain/ids/TeacherValueId';
import { TEACHERS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { Teacher } from '../../../transactions/teachers/domain/Teacher';
import { TeacherId } from '../../../transactions/teachers/use-cases/teacher-id';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindTeacherResponseDTO } from './dtos/teacher.dto';

@Controller()
export class TeacherByIdController {
  constructor(private readonly teacherId: TeacherId) {}

  @Endpoint({
    status: HttpStatus.OK,
    type: FindTeacherResponseDTO,
    description: 'Show teacher by id',
    tags: [DocumentationTags.TEACHERS],
  })
  @ApiQuery({
    name: 'teacher id',
    example: '610165f719dba314d653c6e8',
    required: true,
    description: 'Get a teacher',
  })
  @GuardWithJwt(TEACHERS)
  @Get('api/v1/teacher/:teacherId')
  async execute(
    @Param('teacherId') teacherID: string,
  ): Promise<FindTeacherResponseDTO> {
    const teacher: Teacher = await this.teacherId.execute(
      TeacherValueId.fromString(teacherID),
    );
    return FindTeacherResponseDTO.fromDomain(teacher);
  }
}
