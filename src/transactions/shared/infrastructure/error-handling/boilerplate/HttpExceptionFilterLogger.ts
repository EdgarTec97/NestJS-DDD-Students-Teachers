import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Optional,
} from '@nestjs/common';
import { DomainError } from '../../../../utils/hex/DomainError';
import { PinoLogger } from 'nestjs-pino';
import { config } from '../../../../../config';

const EXCEPTION_FILTER = 'EXCEPTION_FILTER';

@Catch()
export class HttpExceptionFilterLogger implements ExceptionFilter {
  constructor(@Optional() private readonly logger: PinoLogger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();

    if (exception instanceof DomainError) {
      const { code, message, name } = exception;
      const defaultStatus = 500;
      !config.testModeEnabled &&
        this.logger.warn({
          type: EXCEPTION_FILTER,
          subType: 'UNHANDLED_DOMAIN_ERROR',
          code: code,
          fullName: name,
          message: message,
          stack: exception.stack,
          status: defaultStatus,
        });
      response.status(defaultStatus).json({
        code,
        message,
        name,
        statusCode: defaultStatus,
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      !config.testModeEnabled &&
        this.logger.info({
          type: EXCEPTION_FILTER,
          subType: 'HTTP_EXCEPTION',
          status,
          body,
          stack: exception.stack,
        });
      response.status(status).json(body);
      return;
    }

    const defaultStatus = 500;
    !config.testModeEnabled &&
      this.logger.error({
        type: EXCEPTION_FILTER,
        subType: 'UNHANDLED_ERROR',
        fullName: exception.name,
        message: exception.message,
        stack: exception.stack,
        status: defaultStatus,
      });

    response.status(defaultStatus).json({
      message: exception.message,
      statusCode: defaultStatus,
    });
  }
}
