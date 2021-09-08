import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../../../../transactions/teachers/domain/Teacher';

export class TeacherDTO {
  @ApiProperty({ example: 'Admin' })
  public name: string;

  @ApiProperty({ example: 'admin@admin.com' })
  public email: string;

  @ApiProperty({ example: '+528341667076' })
  public phoneNumber: string;

  @ApiProperty({ example: 'admin123' })
  public password: string;

  static fromDomain(teacher: Teacher): TeacherDTO {
    const { name, email, phoneNumber, password } = teacher.toPrimitives();

    return { name, email, phoneNumber, password };
  }
}

export class FindTeacherResponseDTO {
  @ApiProperty({ example: '610165f719dba314d653c6e8' })
  id: string;

  @ApiProperty({ example: 'Admin' })
  name: string;

  @ApiProperty({ example: 'admin@admin.com' })
  public email: string;

  @ApiProperty({ example: '+528341667076' })
  public phoneNumber: string;

  @ApiProperty({ example: true })
  public isEmailVerify: boolean;

  @ApiProperty({ example: true })
  public isPhoneNumberVerify: boolean;

  @ApiProperty({ example: 'admin123' })
  public password: string;

  static fromDomain(teacher: Teacher): FindTeacherResponseDTO {
    return teacher.toPrimitives();
  }
}
