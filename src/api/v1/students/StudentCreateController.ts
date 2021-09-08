import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Email } from '../../../transactions/shared/domain/Email';
import { PhoneNumber } from '../../../transactions/shared/domain/PhoneNumber';
import { TeacherValueId } from '../../../transactions/shared/domain/ids/TeacherValueId';
import { Name } from '../../../transactions/shared/domain/Name';
import { Password } from '../../../transactions/shared/domain/Password';
import { StudentCreate } from '../../../transactions/students/use-cases/student-create';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO, StudentDTO } from './dtos/student.dto';
import { StatusResponseDTO } from '../meta/dtos/StatusResponseDTO';

@Controller()
export class StudentCreateController {
  constructor(private readonly studentCreate: StudentCreate) {}

  @Endpoint({
    status: HttpStatus.CREATED,
    type: FindStudentsResponseDTO,
    description: 'Create a student',
    tags: [DocumentationTags.STUDENTS],
  })
  @ApiQuery({
    name: 'student data',
    example: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      teacherID: '610165f719dba314d653c6e8',
    },
    required: true,
    description: 'Create a student',
  })
  @Post('api/v1/student')
  async createStudent(
    @Body() { name, email, phoneNumber, password, teacherId }: StudentDTO,
  ): Promise<StatusResponseDTO> {
    await this.studentCreate.execute({
      name: new Name(name),
      email: new Email(email),
      phoneNumber: new PhoneNumber(phoneNumber),
      password: new Password(password),
      teacherId: TeacherValueId.fromString(teacherId),
    });

    return StatusResponseDTO.ok();
  }
}
