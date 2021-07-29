import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { Authenticate } from "../../../transactions/auth/use-cases/authenticate";
import { DocumentationTags, Endpoint } from "../../../utils/Endpoint";
import { authDTO } from "./dto/auth.dto";
import { tokenDTO } from "./dto/token.dto";

@Controller()
export class AuthenticateController{
    constructor(private authenticate: Authenticate){}

    @Endpoint({
        status: HttpStatus.ACCEPTED,
        type: authDTO,
        description: 'Authenticate a Student',
        tags: [DocumentationTags.STUDENTS]
    })
    @ApiQuery({
        name: 'credentials',
        example: {email: 'admin@admin.com', password: 'admin123'},
        required: true,
        description: 'Email and Password for get JWT'
    })
    @Post('/api/v1/auth')
    async execute(
        @Body() user: authDTO
    ): Promise<tokenDTO>{
        const tokenPair = await this.authenticate.execute(user);

        return tokenPair.toPrimitives();
    }
}