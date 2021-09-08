import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../../../../transactions/students/domain/Student';

export class StudentDTO {
  @ApiProperty({ example: 'Admin' })
  public name: string;

  @ApiProperty({ example: 'admin@admin.com' })
  public email: string;

  @ApiProperty({ example: '+528341667076' })
  public phoneNumber: string;

  @ApiProperty({ example: 'admin123' })
  public password: string;

  @ApiProperty({ example: '610165f719dba314d653c6e8' })
  public teacherId: string;

  static fromDomain(student: Student): StudentDTO {
    const { name, email, phoneNumber, password, teacherId } =
      student.toPrimitives();

    return { name, email, phoneNumber, password, teacherId };
  }
}

export class FindStudentsResponseDTO {
  @ApiProperty({ example: '610165f719dba314d653c6e8' })
  public id: string;

  @ApiProperty({ example: 'Admin' })
  public name: string;

  @ApiProperty({ example: 'admin@admin.com' })
  public email: string;

  @ApiProperty({ example: '+528341667076' })
  public phoneNumber: string;

  @ApiProperty({ example: 'admin123' })
  public password: string;

  @ApiProperty({ example: true })
  public isEmailVerify: boolean;

  @ApiProperty({ example: true })
  public isPhoneNumberVerify: boolean;

  @ApiProperty({ example: '610165f719dba314d653c6e8' })
  public teacherId: string;

  static fromDomain(student: Student): FindStudentsResponseDTO {
    return student.toPrimitives();
  }
}
