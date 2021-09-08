import { ApiProperty } from '@nestjs/swagger';

export class StatusResponseDTO {
  @ApiProperty({ example: 'ok' })
  status!: string;

  static ok() {
    return new StatusResponseDTO('ok');
  }

  constructor(status: string) {
    this.status = status;
  }
}
