import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { TeacherUpdate } from '../../../transactions/teachers/use-cases/teacher-update';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindTeacherResponseDTO, TeacherDTO } from './dtos/teacher.dto';

@Controller()
export class TeacherUpdateController {
  constructor(private readonly teacherUpdate: TeacherUpdate) {}

  @Endpoint({
    status: HttpStatus.CREATED,
    type: FindTeacherResponseDTO,
    description: 'Update teacher by id',
    tags: [DocumentationTags.TEACHERS],
  })
  @ApiQuery({
    name: 'teacher data',
    example: { teacherId: '610165f719dba314d653c6e8', name: 'Admin' },
    required: true,
    description: 'Delete a teacher',
  })
  @Put('api/v1/teacher/:teacherId')
  async execute(
    @Param('teacherId') teacherID: string,
    @Body() teacher: TeacherDTO,
  ): Promise<FindTeacherResponseDTO | HttpStatus.INTERNAL_SERVER_ERROR> {
    return await this.teacherUpdate.execute(teacher, teacherID);
  }
}
