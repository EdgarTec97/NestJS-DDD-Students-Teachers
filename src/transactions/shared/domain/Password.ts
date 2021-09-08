import * as bcrypt from 'bcrypt';
import { SingleValueObject } from '../../utils/hex/SingleValueObject';

export class Password extends SingleValueObject<string> {
  constructor(password: string) {
    super(password);
  }

  async hash(password: Password) {
    return await bcrypt.compare(this.getValue(), password.getValue());
  }
}
