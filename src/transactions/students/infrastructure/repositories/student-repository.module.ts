import { Module } from '@nestjs/common';
import { STUDENT_REPOSITORY_TOKEN } from '../../domain/StudentRepository';
//import { StudentRepositoryMemory } from './StudentRepositoryMemory';
import { StudentRepositoryMikroORM } from './StudentRepositoryMikroORM';

@Module({
  providers: [
    {
      provide: STUDENT_REPOSITORY_TOKEN,
      useClass: StudentRepositoryMikroORM,
    },
  ],
  exports: [STUDENT_REPOSITORY_TOKEN],
})
export class StudentRepositoryModule {}
