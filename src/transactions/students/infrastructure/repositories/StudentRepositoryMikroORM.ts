import { MikroORM } from '@mikro-orm/core';
import { MongoConnection, MongoDriver, ObjectId } from '@mikro-orm/mongodb';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MIKRO_ORM_MONGODB_TOKEN } from '../../../../utils/mikro-orm-switcher.module';
import { StudentValueId } from '../../../shared/domain/ids/StudentValueId';
import { Paginated } from '../../../shared/utils/hex/Paginated';
import { Student, StudentPrimitives } from '../../domain/Student';
import { StudentRepository } from '../../domain/StudentRepository';

@Injectable()
export class StudentRepositoryMikroORM implements StudentRepository {
  private connection: MongoConnection;

  constructor(
    @Inject(MIKRO_ORM_MONGODB_TOKEN)
    private readonly orm: MikroORM<MongoDriver>,
  ) {
    this.connection = this.orm.em.getDriver().getConnection();
  }
  async getStudents(
    numberOfItems: number,
    offset: number,
  ): Promise<Paginated<Student>> {
    let students = (await this.connection.find(
      'students',
      {},
      {},
      numberOfItems,
      offset,
    )) as StudentPrimitives[];
    this.fixCorrectId(students);
    return new Paginated<Student>(
      students.map(Student.fromPrimitives),
      offset,
      numberOfItems,
      students.length,
    );
  }

  async getStudentById(
    studentId: StudentValueId,
  ): Promise<Student | undefined> {
    const student = (await this.connection
      .getCollection('students')
      .findOne(new ObjectId(studentId.getValue()))) as StudentPrimitives;
    if (!student) {
      throw new NotFoundException('Student Not Found');
    }
    this.fixCorrectId([student]);
    return Student.fromPrimitives(student);
  }

  async createStudent(student: Student): Promise<void> {
    const studentEntity = student.toPrimitives();
    const { email, password } = studentEntity;
    const user = await this.connection
      .getCollection('students')
      .findOne({ email });
    if (user) {
      throw new BadRequestException('User Already exist');
    }
    studentEntity.password = await bcrypt.hash(password, 10);
    delete studentEntity.id;
    await this.connection.insertOne('students', {
      _id: null,
      ...studentEntity,
    });
  }

  async updateStudent(payload: Student): Promise<Student> {
    const student = payload.toPrimitives();
    if (
      student.password &&
      student.password !== '' &&
      student.password !== null
    ) {
      const { password } = student;
      student.password = await bcrypt.hash(password, 10);
    } else {
      delete student.password;
    }
    if (student.email && student.email !== '' && student.email !== null) {
      const { email } = student;
      const user = await this.connection
        .getCollection('students')
        .findOne({ email });
      if (user && user._id != student.id) {
        throw new BadRequestException('User Already exist');
      }
    }
    const id = student.id;
    delete student.id;
    const result = await this.connection
      .getCollection('students')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...student } },
        { returnOriginal: false },
      );
    if (!result['value']) {
      throw new NotFoundException('Student Not Found');
    }
    return Student.fromPrimitives(result['value']);
  }

  async deleteStudent(studentId: StudentValueId): Promise<void> {
    const studentDelete = await this.connection.deleteMany('students', {
      _id: new ObjectId(studentId.getValue()),
    });
    if (studentDelete['affectedRows'] == 0) {
      throw new NotFoundException('Student Not Found');
    }
  }

  private async fixCorrectId(
    student: StudentPrimitives[],
    oldName: string = '_id',
    newName: string = 'id',
  ) {
    student.map((el: StudentPrimitives) => {
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
