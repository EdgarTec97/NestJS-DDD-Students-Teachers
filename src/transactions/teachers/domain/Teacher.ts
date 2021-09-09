import { Email } from '../../shared/domain/Email';
import { PhoneNumber } from '../../shared/domain/PhoneNumber';
import { TeacherValueId } from '../../shared/domain/ids/TeacherValueId';
import { Name } from '../../shared/domain/Name';
import { Password } from '../../shared/domain/Password';
import { AggregateRoot } from '../../shared/utils/hex/AggregateRoot';
import { TeacherRegistered } from './events/TeacherRegistered';

export type TeacherPrimitives = ReturnType<Teacher['toPrimitives']>;

export class Teacher extends AggregateRoot {
  public static fromPrimitives(p: TeacherPrimitives): Teacher {
    return new Teacher(
      new TeacherValueId(p.id),
      new Name(p.name),
      new Email(p.email),
      new PhoneNumber(p.phoneNumber),
      new Password(p.password),
      p.isEmailVerify,
      p.isPhoneNumberVerify,
    );
  }

  public static create(
    id: TeacherValueId,
    name: Name,
    email: Email,
    phoneNumber: PhoneNumber,
    password: Password,
  ): Teacher {
    const student = new Teacher(
      id,
      name,
      email,
      phoneNumber,
      password,
      false,
      false,
    );

    student.record(new TeacherRegistered(id, phoneNumber));

    return student;
  }

  constructor(
    readonly id: TeacherValueId,
    private name: Name,
    private email: Email,
    private phoneNumber: PhoneNumber,
    private password: Password,
    private isEmailVerify: boolean,
    private isPhoneNumberVerify: boolean,
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

  hasId(id: TeacherValueId) {
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

  async passwordMatches(password: Password) {
    return await password.hash(this.password);
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
    };
  }
}
