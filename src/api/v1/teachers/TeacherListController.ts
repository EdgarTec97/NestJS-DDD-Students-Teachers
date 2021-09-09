import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TEACHERS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { TeacherList } from '../../../transactions/teachers/use-cases/teacher-list';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { PaginatedTeacherDTO } from './dtos/PaginatedTeacher.dto';
import { FindTeacherResponseDTO } from './dtos/teacher.dto';

@Controller()
export class TeacherListController {
  constructor(private readonly teacherList: TeacherList) {}

  @Endpoint({
    status: HttpStatus.OK,
    type: FindTeacherResponseDTO,
    isArray: true,
    description: 'List teachers in the web application',
    tags: [DocumentationTags.TEACHERS],
  })
  @ApiQuery({
    name: 'category',
    example: 'students',
    required: false,
    description: 'Get teachers',
  })
  @GuardWithJwt(TEACHERS)
  @Get('api/v1/teachers')
  async execute(
    @Query('offset') offset?: number,
    @Query('numberOfItems') numberOfItems?: number,
  ): Promise<PaginatedTeacherDTO> {
    const paginatedTeacher = await this.teacherList.execute(
      Number(numberOfItems ?? 5),
      Number(offset ?? 0),
    );
    return PaginatedTeacherDTO.fromDomain(paginatedTeacher);
  }
}
