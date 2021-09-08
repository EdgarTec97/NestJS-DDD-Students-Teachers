import { MikroORM } from '@mikro-orm/core';
import { MongoConnection, MongoDriver } from '@mikro-orm/mongodb';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MIKRO_ORM_MONGODB_TOKEN } from '../../../../utils/mikro-orm-switcher.module';
import { Email } from '../../../shared/domain/Email';
import { Student, StudentPrimitives } from '../../../students/domain/Student';
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
  async findOneByEmail(email: Email): Promise<Student> {
    const primitiveEmail = email.getValue();
    const findUser = (await this.connection
      .getCollection('students')
      .findOne({ email: primitiveEmail })) as StudentPrimitives;

    if (!findUser) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.returnUndefinedOrDomainModel(findUser);
  }
  private returnUndefinedOrDomainModel(student: StudentPrimitives | null) {
    if (student) return Student.fromPrimitives(student);
  }
}
