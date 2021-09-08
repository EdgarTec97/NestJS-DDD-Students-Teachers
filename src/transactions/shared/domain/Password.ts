import { SingleValueObject } from '../../utils/hex/SingleValueObject';

export class Password extends SingleValueObject<string> {
  constructor(password: string) {
    super(password);
  }
}
