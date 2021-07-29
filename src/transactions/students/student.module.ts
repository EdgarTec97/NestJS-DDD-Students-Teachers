import { Module } from '@nestjs/common';
import { StudentByIdController } from '../../api/v1/students/StudentByIdController';
import { StudentListController } from '../../api/v1/students/StudentListController';
import { StudentRepositoryModule } from './infrastructure/repositories/student-repository.module';
import { StudentList } from './use-cases/student-list';
import { StudentId } from './use-cases/student-id';
import { StudentCreateController } from '../../api/v1/students/StudentCreateController';
import { StudentCreate } from './use-cases/student-create';
import { StudentUpdate } from './use-cases/student-update';
import { StudentUpdateController } from '../../api/v1/students/StudentUpdateController';
import { StudentDeleteController } from '../../api/v1/students/StudentDeleteController';
import { StudentDelete } from './use-cases/student-delete';
import { JWT_SERVICE_TOKEN } from '../shared/services/jwt/domain/JwtService';
import { JwtServiceNest } from '../shared/services/jwt/infrastructure/JwtServiceNest';

@Module({
  imports: [
    StudentRepositoryModule
  ],
  controllers: [
    StudentListController,
    StudentByIdController,
    StudentCreateController,
    StudentUpdateController,
    StudentDeleteController
  ],
  providers: [
    StudentList,
    StudentId,
    StudentCreate,
    StudentUpdate,
    StudentDelete,
    {
      provide: JWT_SERVICE_TOKEN,
      useClass: JwtServiceNest 
    }
  ],
  exports: []
})
export class StudentModule {}
