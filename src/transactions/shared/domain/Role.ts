import { SingleValueObject } from '../../utils/hex/SingleValueObject';

export class Role extends SingleValueObject<string> {
  constructor(role: string) {
    super(role);
  }
}
