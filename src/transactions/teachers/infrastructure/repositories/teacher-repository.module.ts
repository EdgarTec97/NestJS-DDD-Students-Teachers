import { Module } from '@nestjs/common';
/*import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from 'src/api/v1/teachers/models/teacher.model';*/
import { TEACHER_REPOSITORY_TOKEN } from '../../domain/TeacherRepository';
import { TeacherRepositoryMemory } from './teacherRepositoryMemory';
import { TeacherRepositoryMikroORM } from './TeacherRepositoryMikroORM';
import { TeacherRepositoryMongodb } from './TeacherRepositoryMongodb';

@Module({
    imports: [
      //MongooseModule.forFeature([{name: Teacher.name, schema: TeacherSchema}])
    ],
    providers: [{
      provide: TEACHER_REPOSITORY_TOKEN,
      useClass: TeacherRepositoryMikroORM
    }],
    exports: [TEACHER_REPOSITORY_TOKEN]
  })
export class TeacherRepositoryModule{}