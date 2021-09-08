import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { config } from './config';
import { AuthModule } from './transactions/auth/auth.model';
import { GlobalErrorsInterceptor } from './transactions/shared/infrastructure/error-handling/boilerplate/GlobalErrorsInterceptor';
import { HttpExceptionFilterLogger } from './transactions/shared/infrastructure/error-handling/boilerplate/HttpExceptionFilterLogger';
import { DomainToInfrastructureMapper } from './transactions/shared/infrastructure/error-handling/DomainToInfrastructureMap';
import { JwtServiceModule } from './transactions/shared/services/jwt/jwt-service.module';
import { StudentModule } from './transactions/students/student.module';
import { StudentsPerTeacherModule } from './transactions/studentsPerTeacher/students-per-teacher.module';
import { TeacherModule } from './transactions/teachers/teacher.module';
import { LoggerSwitcherModule } from './utils/LoggerSwitcherModule';
import { MikroOrmSwitcherModule } from './utils/mikro-orm-switcher.module';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    StudentsPerTeacherModule,
    AuthModule,
    JwtServiceModule,
    LoggerSwitcherModule.init({ disable: config.testModeEnabled }),
    MikroOrmSwitcherModule.init({
      disable: false,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalErrorsInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilterLogger,
    },
    DomainToInfrastructureMapper,
  ],
})
export class AppModule {}
