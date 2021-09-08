import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { Paginated } from '../../../../transactions/shared/utils/hex/Paginated';
import { Student } from '../../../../transactions/students/domain/Student';
import { FindStudentsResponseDTO } from './student.dto';

export class PaginatedStudentDTO {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  public readonly offset!: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  public readonly numberOfItems!: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @IsPositive()
  public readonly total!: number;

  @ApiProperty({ type: [FindStudentsResponseDTO] })
  public readonly students: FindStudentsResponseDTO[];

  static fromDomain(
    paginatedStudents: Paginated<Student>,
  ): PaginatedStudentDTO {
    const { offset, total, numberOfItems } = paginatedStudents.toPrimitives();

    return {
      total,
      offset,
      numberOfItems,
      students: paginatedStudents
        .getElements()
        .map(FindStudentsResponseDTO.fromDomain),
    };
  }
}
