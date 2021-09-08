import { Module } from '@nestjs/common';
import { STUDENTS_PER_TEACHER_REPOSITORY_TOKEN } from '../../domain/StudentsPerTeacherRepository';
//import { StudentsPerTeacherRepositoryMemory } from './StudentsPerTeacherRepositoryMemory';
import { StudentsPerTeacherRepositoryMikroORM } from './StudentsPerTeacherRepositoryMikroORM';

@Module({
  providers: [
    {
      provide: STUDENTS_PER_TEACHER_REPOSITORY_TOKEN,
      useClass: StudentsPerTeacherRepositoryMikroORM,
    },
  ],
  exports: [STUDENTS_PER_TEACHER_REPOSITORY_TOKEN],
})
export class StudentsPerTeacherRepositoryModule {}
