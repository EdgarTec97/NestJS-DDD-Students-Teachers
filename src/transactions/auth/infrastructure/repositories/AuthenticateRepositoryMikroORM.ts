import { MikroORM } from '@mikro-orm/core';
import { MongoConnection, MongoDriver } from '@mikro-orm/mongodb';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { MIKRO_ORM_MONGODB_TOKEN } from '../../../../utils/mikro-orm-switcher.module';
import { Email } from '../../../shared/domain/Email';
import { Student, StudentPrimitives } from '../../../students/domain/Student';
import { Teacher, TeacherPrimitives } from '../../../teachers/domain/Teacher';
import { AuthenticateRepository } from '../../domain/AuthenticateRepository';

@Injectable()
export class AuthenticateRepositoryMikroORM implements AuthenticateRepository {
  private connection: MongoConnection;
  constructor(
    @Inject(MIKRO_ORM_MONGODB_TOKEN)
    private readonly orm: MikroORM<MongoDriver>,
  ) {
    this.connection = this.orm.em.getDriver().getConnection();
  }
  async findStudentByEmail(email: Email): Promise<Student> {
    const primitiveEmail = email.getValue();
    const findStudent = (await this.connection
      .getCollection('students')
      .findOne({ email: primitiveEmail })) as StudentPrimitives;

    if (!findStudent) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.returnUndefinedOrDomainModel(findStudent, null) as Student;
  }

  async findTeacherByEmail(email: Email): Promise<Teacher> {
    const primitiveEmail = email.getValue();
    const findTeacher = (await this.connection
      .getCollection('teachers')
      .findOne({ email: primitiveEmail })) as TeacherPrimitives;

    if (!findTeacher) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.fixCorrectId([findTeacher]);

    return this.returnUndefinedOrDomainModel(null, findTeacher) as Teacher;
  }

  private returnUndefinedOrDomainModel(
    student: StudentPrimitives | null,
    teacher: TeacherPrimitives | null,
  ) {
    if (student && !teacher) {
      return Student.fromPrimitives(student);
    }
    return Teacher.fromPrimitives(teacher);
  }

  private async fixCorrectId(
    user: StudentPrimitives[] | TeacherPrimitives[],
    oldName: string = '_id',
    newName: string = 'id',
  ) {
    user.map((el: StudentPrimitives | TeacherPrimitives) => {
      if (oldName == newName) {
        return el;
      }
      if (el[oldName]) {
        el[newName] = el[oldName];
        delete el[oldName];
      }
      return el;
    });
    return user;
  }
}
