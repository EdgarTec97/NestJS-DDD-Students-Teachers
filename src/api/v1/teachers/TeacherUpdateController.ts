import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Email } from '../../../transactions/shared/domain/Email';
import { TeacherValueId } from '../../../transactions/shared/domain/ids/TeacherValueId';
import { Name } from '../../../transactions/shared/domain/Name';
import { Password } from '../../../transactions/shared/domain/Password';
import { PhoneNumber } from '../../../transactions/shared/domain/PhoneNumber';
import { TEACHERS } from '../../../transactions/shared/services/jwt/domain/Role';
import { GuardWithJwt } from '../../../transactions/shared/services/jwt/infrastructure/JwtAuthGuard';
import { Teacher } from '../../../transactions/teachers/domain/Teacher';
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
    example: {
      teacherId: '610165f719dba314d653c6e8',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      phoneNumber: '8341667077',
    },
    required: true,
    description: 'Delete a teacher',
  })
  @GuardWithJwt(TEACHERS)
  @Put('api/v1/teacher/:teacherId')
  async execute(
    @Param('teacherId') teacherId: string,
    @Body() { name, email, phoneNumber, password }: TeacherDTO,
  ): Promise<FindTeacherResponseDTO> {
    const teacher: Teacher = await this.teacherUpdate.execute({
      teacherId: TeacherValueId.fromString(teacherId),
      name: new Name(name),
      email: new Email(email),
      phoneNumber: new PhoneNumber(phoneNumber),
      password: new Password(password),
    });

    return FindTeacherResponseDTO.fromDomain(teacher);
  }
}
