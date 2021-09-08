import { DomainEvent } from '../../../shared/domain/events/DomainEvent';
import { EventType } from '../../../shared/domain/events/EventType';
import { PhoneNumber } from '../../../shared/domain/PhoneNumber';
import { StudentValueId } from '../../../shared/domain/ids/StudentValueId';

export class StudentRegistered extends DomainEvent {
  private type: EventType = EventType.ACCOUNT_REGISTERED;
  constructor(
    private accountId: StudentValueId,
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
