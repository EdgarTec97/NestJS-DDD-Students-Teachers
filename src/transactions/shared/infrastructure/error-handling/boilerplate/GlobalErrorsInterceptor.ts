import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { DomainToInfrastructureMapper } from '../DomainToInfrastructureMap';

@Injectable()
export class GlobalErrorsInterceptor implements NestInterceptor {
  constructor(
    private domainToInfrastructureMapper: DomainToInfrastructureMapper,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(
      catchError((error) => {
        for (const mapper of this.domainToInfrastructureMapper.getMappings()) {
          const [DomainErrorClass, NestHttpExceptionClass] = mapper;

          if (error instanceof DomainErrorClass) {
            throw new NestHttpExceptionClass({
              code: error.code,
              message: error.message,
            });
          }
        }

        throw error;
      }),
    );
  }
}
