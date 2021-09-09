import { Module } from '@nestjs/common';
import { StudentsPerTeacherController } from '../../api/v1/studentsPerTeacher/StudentsPerTeacherController';
import { JWT_SERVICE_TOKEN } from '../shared/services/jwt/domain/JwtService';
import { JwtServiceNest } from '../shared/services/jwt/infrastructure/JwtServiceNest';
import { StudentsPerTeacherRepositoryModule } from './infrastructure/repositories/students-per-teacher-repository.module';
import { StudentsPerTeacher } from './use-cases/Students-per-teacher';

@Module({
  imports: [StudentsPerTeacherRepositoryModule],
  controllers: [StudentsPerTeacherController],
  providers: [
    StudentsPerTeacher,
    {
      provide: JWT_SERVICE_TOKEN,
      useClass: JwtServiceNest,
    },
  ],
  exports: [StudentsPerTeacher],
})
export class StudentsPerTeacherModule {}
