import { Module } from '@nestjs/common';
import { AuthModule } from './transactions/auth/auth.model';
import { JwtServiceModule } from './transactions/shared/services/jwt/jwt-service.module';
//import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './transactions/students/student.module';
import { StudentsPerTeacherModule } from './transactions/studentsPerTeacher/students-per-teacher.module';
import { TeacherModule } from './transactions/teachers/teacher.module';
import { MikroOrmSwitcherModule } from './utils/mikro-orm-switcher.module';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    StudentsPerTeacherModule,
    AuthModule,
    JwtServiceModule,
    /*MongooseModule.forRoot('mongodb://root:root@localhost:27017/challenge',{
      autoCreate: true
    }),*/
    MikroOrmSwitcherModule.init({
      disable: false
    })
  ],
  providers: [],
})
export class AppModule {}
