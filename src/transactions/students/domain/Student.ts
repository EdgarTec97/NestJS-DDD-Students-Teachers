import { Email } from '../../shared/domain/Email';
import { PhoneNumber } from '../../shared/domain/PhoneNumber';
import { StudentValueId } from '../../shared/domain/ids/StudentValueId';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Name } from '../../shared/domain/Name';
import { Password } from '../../shared/domain/Password';
import { AggregateRoot } from '../../shared/utils/hex/AggregateRoot';
import { StudentRegistered } from './events/StudentRegistered';

export type StudentPrimitives = ReturnType<Student['toPrimitives']>;

export class Student extends AggregateRoot {
  public static fromPrimitives(p: StudentPrimitives): Student {
    return new Student(
      new StudentValueId(p.id),
      new Name(p.name),
      new Email(p.email),
      new PhoneNumber(p.phoneNumber),
      new Password(p.password),
      p.isEmailVerify,
      p.isPhoneNumberVerify,
      new TeacherValueId(p.teacherId),
    );
  }

  public static create(
    studentId: StudentValueId,
    name: Name,
    email: Email,
    phoneNumber: PhoneNumber,
    password: Password,
    teacherId: TeacherValueId,
  ): Student {
    const student = new Student(
      studentId,
      name,
      email,
      phoneNumber,
      password,
      false,
      false,
      teacherId,
    );

    student.record(new StudentRegistered(studentId, phoneNumber));

    return student;
  }

  constructor(
    readonly id: StudentValueId,
    private name: Name,
    private email: Email,
    private phoneNumber: PhoneNumber,
    private password: Password,
    private isEmailVerify: boolean,
    private isPhoneNumberVerify: boolean,
    private teacherId: TeacherValueId,
  ) {
    super();
  }

  resetEmail(email: Email) {
    this.email = email;
    this.isEmailVerify = false;
  }

  resetPhoneNumber(phoneNumber: PhoneNumber) {
    this.phoneNumber = phoneNumber;
    this.isPhoneNumberVerify = false;
  }

  hasId(id: StudentValueId) {
    return this.id.equals(id);
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  verifyEmail() {
    this.isEmailVerify = true;
  }

  emailHasBeenVerify() {
    return this.isEmailVerify;
  }

  verifyPhoneNumber() {
    this.isPhoneNumberVerify = true;
  }

  phoneNumberHasBeenVerify() {
    return this.isPhoneNumberVerify;
  }

  hasMockedEmail() {
    return this.email.isTestEmail();
  }

  toPrimitives() {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      phoneNumber: this.phoneNumber.getValue(),
      password: this.password.getValue(),
      isEmailVerify: this.isEmailVerify,
      isPhoneNumberVerify: this.isPhoneNumberVerify,
      teacherId: this.teacherId.getValue(),
    };
  }
}
