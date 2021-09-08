import { SingleValueObject } from '../../utils/hex/SingleValueObject';

export class Name extends SingleValueObject<string> {
  constructor(name: string) {
    super(name);
  }
}
