import { SingleValueObject } from '../../utils/hex/SingleValueObject';

export class PhoneNumber extends SingleValueObject<string> {
  constructor(phoneNumber: string) {
    super(phoneNumber.replace(/ /g, ''));
  }

  isTestPhoneNumber() {
    return this.getValue().match(/\+5299/);
  }
}
