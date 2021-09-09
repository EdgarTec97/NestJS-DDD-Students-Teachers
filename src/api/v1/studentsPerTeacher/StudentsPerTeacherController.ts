import {
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StudentValueId } from '../../../transactions/shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../../transactions/shared/domain/ids/TeacherValueId';
import { TEACHERS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { Student } from '../../../transactions/students/domain/Student';
import { StudentsPerTeacher } from '../../../transactions/studentsPerTeacher/use-cases/Students-per-teacher';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO } from '../students/dtos/student.dto';

@Controller()
export class StudentsPerTeacherController {
  constructor(private readonly studentsPerTeacher: StudentsPerTeacher) {}

  @Endpoint({
    status: HttpStatus.CREATED,
    type: FindStudentsResponseDTO,
    description: 'Update student of teacherId',
    tags: [DocumentationTags.STUDENTSPERTEACHERS],
  })
  @ApiQuery({
    name: 'student id and teacher id',
    example: {
      studentId: '610165f719dba314d653c6e8',
      teacherID: '610165f719dba314d653c6e8',
    },
    required: true,
    description: 'Update a student of teacher',
  })
  @GuardWithJwt(TEACHERS)
  @Put('/api/v1/:studentId/student/:teacherId')
  async execute(
    @Param('studentId') studentId: string,
    @Param('teacherId') teacherId: string,
  ): Promise<FindStudentsResponseDTO> {
    const student: Student = await this.studentsPerTeacher.execute(
      StudentValueId.fromString(studentId),
      TeacherValueId.fromString(teacherId),
    );

    return FindStudentsResponseDTO.fromDomain(student);
  }
}
