import { ApiProperty } from "@nestjs/swagger";

export class StudentDTO{
    @ApiProperty({example: 'Admin'})
    public name: string;

    @ApiProperty({example: 'admin@admin.com'})
    public email: string;

    @ApiProperty({example: 'admin123'})
    public password: string;

    @ApiProperty({example: '610165f719dba314d653c6e8'})
    public teacherId: string;
}

export class FindStudentsResponseDTO{
    @ApiProperty({example: '610165f719dba314d653c6e8'})
    public id: string;

    @ApiProperty({example: 'Admin'})
    public name: string;

    @ApiProperty({example: 'admin@admin.com'})
    public email: string;

    @ApiProperty({example: 'admin123'})
    public password: string;

    @ApiProperty({example: '610165f719dba314d653c6e8'})
    public teacherId: string;
}