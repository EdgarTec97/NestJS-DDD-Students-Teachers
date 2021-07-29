import { ApiProperty } from "@nestjs/swagger";

export class TeacherDTO {
    @ApiProperty({example: 'Admin'})
    public name: string;
}

export class FindTeacherResponseDTO {
    @ApiProperty({example: '610165f719dba314d653c6e8'})
    id: string;

    @ApiProperty({example: 'Admin'})
    name: string;
}