import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TeacherCreate } from '../../../transactions/teachers/use-cases/teacher-create';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindTeacherResponseDTO, TeacherDTO } from './dtos/teacher.dto';

@Controller()
export class TeacherCreateController {
  constructor(private readonly teacherCreate: TeacherCreate) {}

  @Endpoint({
    status: HttpStatus.CREATED,
    type: FindTeacherResponseDTO,
    description: 'Create a teacher',
    tags: [DocumentationTags.TEACHERS],
  })
  @ApiQuery({
    name: 'teacher data',
    example: { name: 'Admin' },
    required: true,
    description: 'Create a teacher',
  })
  @Post('api/v1/teacher')
  async execute(
    @Body() teacher: TeacherDTO,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.teacherCreate.execute(teacher);
  }
}
