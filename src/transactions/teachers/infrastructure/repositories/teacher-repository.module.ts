import { Module } from '@nestjs/common';
import { TEACHER_REPOSITORY_TOKEN } from '../../domain/TeacherRepository';
import { TeacherRepositoryMemory } from './teacherRepositoryMemory';
import { TeacherRepositoryMikroORM } from './TeacherRepositoryMikroORM';

@Module({
  providers: [
    {
      provide: TEACHER_REPOSITORY_TOKEN,
      useClass: TeacherRepositoryMikroORM,
    },
  ],
  exports: [TEACHER_REPOSITORY_TOKEN],
})
export class TeacherRepositoryModule {}
