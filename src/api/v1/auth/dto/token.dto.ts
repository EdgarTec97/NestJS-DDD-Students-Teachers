import { ApiProperty } from "@nestjs/swagger";

export class tokenDTO{
    @ApiProperty()
    public readonly accessToken!: string;
    @ApiProperty()
    public readonly refreshToken!: string;
}