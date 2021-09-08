import { Body, Controller, HttpStatus, Param, Put } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Email } from '../../../transactions/shared/domain/Email';
import { StudentValueId } from '../../../transactions/shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../../transactions/shared/domain/ids/TeacherValueId';
import { Name } from '../../../transactions/shared/domain/Name';
import { Password } from '../../../transactions/shared/domain/Password';
import { PhoneNumber } from '../../../transactions/shared/domain/PhoneNumber';
import { Student } from '../../../transactions/students/domain/Student';
import { StudentUpdate } from '../../../transactions/students/use-cases/student-update';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { FindStudentsResponseDTO, StudentDTO } from './dtos/student.dto';

@Controller()
export class StudentUpdateController {
  constructor(private readonly studentUpdate: StudentUpdate) {}

  @Endpoint({
    status: HttpStatus.CREATED,
    type: FindStudentsResponseDTO,
    description: 'Update a student',
    tags: [DocumentationTags.STUDENTS],
  })
  @ApiQuery({
    name: 'student data',
    example: {
      studentId: '610165f719dba314d653c6e8',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin123',
      teacherID: '610165f719dba314d653c6e8',
    },
    required: true,
    description: 'Update a student',
  })
  @Put('api/v1/student/:studentId')
  async createStudent(
    @Body() { name, email, phoneNumber, password, teacherId }: StudentDTO,
    @Param('studentId') studentId: string,
  ): Promise<FindStudentsResponseDTO> {
    const student: Student = await this.studentUpdate.execute({
      studentId: StudentValueId.fromString(studentId),
      name: new Name(name),
      email: new Email(email),
      phoneNumber: new PhoneNumber(phoneNumber),
      password: new Password(password),
      teacherId: TeacherValueId.fromString(teacherId),
    });

    return FindStudentsResponseDTO.fromDomain(student);
  }
}
