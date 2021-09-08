import { SingleValueObject } from '../../utils/hex/SingleValueObject';

export class Email extends SingleValueObject<string> {
  constructor(email: string) {
    super(email.toLocaleLowerCase());
  }
  isTestEmail() {
    return this.getValue().match(/test@notiexpresstam.com/);
  }
}
