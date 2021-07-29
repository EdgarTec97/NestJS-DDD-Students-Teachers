import { Module } from '@nestjs/common';
import { TeacherByIdController } from '../../api/v1/teachers/TeacherByIdController';
import { TeacherCreateController } from '../../api/v1/teachers/TeacherCreateController';
import { TeacherDeleteController } from '../../api/v1/teachers/TeacherDeleteController';
import { TeacherListController } from '../../api/v1/teachers/TeacherListController';
import { TeacherUpdateController } from '../../api/v1/teachers/TeacherUpdateController';
import { JWT_SERVICE_TOKEN } from '../shared/services/jwt/domain/JwtService';
import { JwtServiceNest } from '../shared/services/jwt/infrastructure/JwtServiceNest';
import { TeacherRepositoryModule } from './infrastructure/repositories/teacher-repository.module';
import { TeacherCreate } from './use-cases/teacher-create';
import { TeacherDelete } from './use-cases/teacher-delete';
import { TeacherId } from './use-cases/teacher-id';
import { TeacherList } from './use-cases/teacher-list';
import { TeacherUpdate } from './use-cases/teacher-update';

@Module({
    imports: [
      TeacherRepositoryModule
    ],
    controllers: [
      TeacherListController,
      TeacherByIdController,
      TeacherCreateController,
      TeacherUpdateController,
      TeacherDeleteController
    ],
    providers: [
      TeacherList,
      TeacherId,
      TeacherCreate,
      TeacherDelete,
      TeacherUpdate,
      {
        provide: JWT_SERVICE_TOKEN,
        useClass: JwtServiceNest 
      }
    ],
    exports: []
  })
export class TeacherModule{}