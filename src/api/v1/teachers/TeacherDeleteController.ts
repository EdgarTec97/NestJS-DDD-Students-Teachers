import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TeacherValueId } from '../../../transactions/shared/domain/ids/TeacherValueId';
import { TEACHERS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { TeacherDelete } from '../../../transactions/teachers/use-cases/teacher-delete';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { StatusResponseDTO } from '../meta/dtos/StatusResponseDTO';
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
  @GuardWithJwt(TEACHERS)
  @Delete('api/v1/teacher/:teacherId')
  async execute(
    @Param('teacherId') teacherId: string,
  ): Promise<StatusResponseDTO> {
    await this.teacherDelete.execute(TeacherValueId.fromString(teacherId));

    return StatusResponseDTO.ok();
  }
}
