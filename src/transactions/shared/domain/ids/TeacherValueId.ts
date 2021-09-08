import { DomainId } from './DomainId';

export class TeacherValueId extends DomainId {
  static fromString(uuid: string) {
    return new TeacherValueId(uuid);
  }
}
