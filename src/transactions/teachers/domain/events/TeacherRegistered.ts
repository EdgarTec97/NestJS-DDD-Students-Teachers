import { DomainEvent } from '../../../shared/domain/events/DomainEvent';
import { EventType } from '../../../shared/domain/events/EventType';
import { TeacherValueId } from '../../../shared/domain/ids/TeacherValueId';
import { PhoneNumber } from '../../../shared/domain/PhoneNumber';

export class TeacherRegistered extends DomainEvent {
  private type: EventType = EventType.ACCOUNT_REGISTERED;
  constructor(
    private accountId: TeacherValueId,
    private phoneNumber: PhoneNumber,
  ) {
    super();
  }
  toPrimitives() {
    return {
      ...super.toPrimitives(),
      type: this.type,
      data: {
        accountId: this.accountId.getValue(),
        phoneNumber: this.phoneNumber.getValue(),
      },
    };
  }
}
