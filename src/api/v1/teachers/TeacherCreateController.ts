import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Email } from '../../../transactions/shared/domain/Email';
import { Name } from '../../../transactions/shared/domain/Name';
import { Password } from '../../../transactions/shared/domain/Password';
import { PhoneNumber } from '../../../transactions/shared/domain/PhoneNumber';
import { TeacherCreate } from '../../../transactions/teachers/use-cases/teacher-create';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { StatusResponseDTO } from '../meta/dtos/StatusResponseDTO';
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
    example: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      phoneNumber: '8341667077',
    },
    required: true,
    description: 'Create a teacher',
  })
  @Post('api/v1/teacher')
  async execute(
    @Body() { name, email, phoneNumber, password }: TeacherDTO,
  ): Promise<StatusResponseDTO> {
    await this.teacherCreate.execute({
      name: new Name(name),
      email: new Email(email),
      phoneNumber: new PhoneNumber(phoneNumber),
      password: new Password(password),
    });

    return StatusResponseDTO.ok();
  }
}
