import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Authenticate } from '../../../transactions/auth/use-cases/authenticate';
import { Email } from '../../../transactions/shared/domain/Email';
import { Password } from '../../../transactions/shared/domain/Password';
import { TokenPair } from '../../../transactions/shared/domain/TokenPair';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { authDTO } from './dto/auth.dto';
import { tokenDTO } from './dto/token.dto';

@Controller()
export class AuthenticateController {
  constructor(private authenticate: Authenticate) {}

  @Endpoint({
    status: HttpStatus.ACCEPTED,
    type: authDTO,
    description: 'Authenticate a Student',
    tags: [DocumentationTags.STUDENTS],
  })
  @ApiQuery({
    name: 'credentials',
    example: { email: 'admin@admin.com', password: 'admin123' },
    required: true,
    description: 'Email and Password for get JWT',
  })
  @Post('/api/v1/auth')
  async execute(@Body() { email, password }: authDTO): Promise<tokenDTO> {
    const tokenPair: TokenPair = await this.authenticate.execute(
      new Email(email),
      new Password(password),
    );

    return tokenPair.toPrimitives();
  }
}
