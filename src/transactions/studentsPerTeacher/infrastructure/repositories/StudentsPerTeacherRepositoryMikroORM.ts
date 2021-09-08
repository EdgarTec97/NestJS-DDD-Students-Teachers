import { MikroORM } from '@mikro-orm/core';
import { MongoConnection, MongoDriver, ObjectId } from '@mikro-orm/mongodb';
import { Inject, Injectable } from '@nestjs/common';
import { MIKRO_ORM_MONGODB_TOKEN } from '../../../../utils/mikro-orm-switcher.module';
import { StudentValueId } from '../../../shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../../shared/domain/ids/TeacherValueId';
import { Student, StudentPrimitives } from '../../../students/domain/Student';
import { StudentsPerTeacherRepository } from '../../domain/StudentsPerTeacherRepository';

@Injectable()
export class StudentsPerTeacherRepositoryMikroORM
  implements StudentsPerTeacherRepository
{
  private connection: MongoConnection;
  constructor(
    @Inject(MIKRO_ORM_MONGODB_TOKEN)
    private readonly orm: MikroORM<MongoDriver>,
  ) {
    this.connection = this.orm.em.getDriver().getConnection();
  }
  async changeStudentsPerTeacherRepository(
    studentId: StudentValueId,
    teacherId: TeacherValueId,
  ): Promise<Student> {
    const updatedStudent = (await this.connection
      .getCollection('students')
      .findOneAndUpdate(
        { _id: new ObjectId(studentId.getValue()) },
        { $set: { teacherId: teacherId.getValue() } },
        { returnOriginal: false },
      )) as StudentPrimitives;

    return Student.fromPrimitives(updatedStudent['value']);
  }
}
