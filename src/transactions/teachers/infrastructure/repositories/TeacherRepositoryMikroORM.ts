import { MikroORM } from '@mikro-orm/core';
import { MongoConnection, MongoDriver, ObjectId } from '@mikro-orm/mongodb';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MIKRO_ORM_MONGODB_TOKEN } from '../../../../utils/mikro-orm-switcher.module';
import { TeacherValueId } from '../../../shared/domain/ids/TeacherValueId';
import { Paginated } from '../../../shared/utils/hex/Paginated';
import { Teacher, TeacherPrimitives } from '../../domain/Teacher';
import { TeacherRepository } from '../../domain/TeacherRepository';

@Injectable()
export class TeacherRepositoryMikroORM implements TeacherRepository {
  private connection: MongoConnection;
  constructor(
    @Inject(MIKRO_ORM_MONGODB_TOKEN)
    private readonly orm: MikroORM<MongoDriver>,
  ) {
    this.connection = this.orm.em.getDriver().getConnection();
  }

  async getTeachers(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Teacher>> {
    let teachers = (await this.connection.find(
      'teachers',
      {},
      {},
      numberOfItems,
      offset,
    )) as TeacherPrimitives[];
    this.fixCorrectId(teachers);
    return new Paginated<Teacher>(
      teachers.map(Teacher.fromPrimitives),
      offset,
      numberOfItems,
      teachers.length,
    );
  }

  async getTeacherById(teacherId: TeacherValueId): Promise<Teacher> {
    const teacher = (await this.connection
      .getCollection('teachers')
      .findOne(new ObjectId(teacherId.getValue()))) as TeacherPrimitives;
    if (!teacher) {
      throw new NotFoundException('Teacher Not Found');
    }
    this.fixCorrectId([teacher]);
    return Teacher.fromPrimitives(teacher);
  }
  async createTeacher(teacher: Teacher): Promise<void> {
    const teacherEntity = teacher.toPrimitives();
    const { email, password } = teacherEntity;
    const user = await this.connection
      .getCollection('teachers')
      .findOne({ email });
    if (user) {
      throw new BadRequestException('User Already exist');
    }
    teacherEntity.password = await bcrypt.hash(password, 10);
    delete teacherEntity.id;
    await this.connection.insertOne('teachers', {
      _id: null,
      ...teacherEntity,
    });
  }

  async updateTeacher(payload: Teacher): Promise<Teacher> {
    const teacher = payload.toPrimitives();
    if (
      teacher.password &&
      teacher.password !== '' &&
      teacher.password !== null
    ) {
      const { password } = teacher;
      teacher.password = await bcrypt.hash(password, 10);
    } else {
      delete teacher.password;
    }
    if (teacher.email && teacher.email !== '' && teacher.email !== null) {
      const { email } = teacher;
      const user = await this.connection
        .getCollection('teachers')
        .findOne({ email });
      if (user && user._id != teacher.id) {
        throw new BadRequestException('User Already exist');
      }
    }
    const id = teacher.id;
    delete teacher.id;
    const result = await this.connection
      .getCollection('teachers')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...teacher } },
        { returnOriginal: false },
      );
    if (!result['value']) {
      throw new NotFoundException('Teacher Not Found');
    }
    this.fixCorrectId([result['value']]);
    return Teacher.fromPrimitives(result['value']);
  }

  async deleteTeacher(teacherId: TeacherValueId): Promise<void> {
    const result = await this.connection.deleteMany('teachers', {
      _id: new ObjectId(teacherId.getValue()),
    });
    if (result['affectedRows'] == 0) {
      throw new NotFoundException('Teacher Not Found');
    }
  }

  private async fixCorrectId(
    student: TeacherPrimitives[],
    oldName: string = '_id',
    newName: string = 'id',
  ) {
    student.map((el: TeacherPrimitives) => {
      if (oldName == newName) {
        return el;
      }
      if (el[oldName]) {
        el[newName] = el[oldName];
        delete el[oldName];
      }
      return el;
    });
    return student;
  }
}
