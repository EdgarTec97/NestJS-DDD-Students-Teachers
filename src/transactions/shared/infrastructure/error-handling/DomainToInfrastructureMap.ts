import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountAuthenticationFailed } from '../../domain/errors/AccountAuthenticationFailed';
import { mapDomainError, Mapper } from './boilerplate/mapDomainError';

export class DomainToInfrastructureMapper {
  // 400 //
  private badRequestExceptions = [].map((error) =>
    mapDomainError(error).to(BadRequestException),
  );

  // 401 //
  private unauthorizedExceptions = [AccountAuthenticationFailed].map((error) =>
    mapDomainError(error).to(UnauthorizedException),
  );

  // 403 //
  private forbiddenExceptions = [].map((error) =>
    mapDomainError(error).to(ForbiddenException),
  );

  // 404 //
  private notFoundExceptions = [].map((error) =>
    mapDomainError(error).to(NotFoundException),
  );

  // 409 //
  private conflictExceptions = [].map((error) =>
    mapDomainError(error).to(ConflictException),
  );

  // 503 //
  private serviceUnavailableExceptions = [].map((error) =>
    mapDomainError(error).to(ServiceUnavailableException),
  );

  getMappings(): Mapper[] {
    return [
      ...this.unauthorizedExceptions,
      ...this.forbiddenExceptions,
      ...this.notFoundExceptions,
      ...this.conflictExceptions,
      ...this.badRequestExceptions,
      ...this.serviceUnavailableExceptions,
    ];
  }
}
