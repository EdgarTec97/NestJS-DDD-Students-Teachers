import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { Paginated } from '../../../../transactions/shared/utils/hex/Paginated';
import { Teacher } from '../../../../transactions/teachers/domain/Teacher';
import { FindTeacherResponseDTO } from './teacher.dto';

export class PaginatedTeacherDTO {
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

  @ApiProperty({ type: [FindTeacherResponseDTO] })
  public readonly teachers: FindTeacherResponseDTO[];

  static fromDomain(
    paginatedTeachers: Paginated<Teacher>,
  ): PaginatedTeacherDTO {
    const { offset, total, numberOfItems } = paginatedTeachers.toPrimitives();

    return {
      total,
      offset,
      numberOfItems,
      teachers: paginatedTeachers
        .getElements()
        .map(FindTeacherResponseDTO.fromDomain),
    };
  }
}
