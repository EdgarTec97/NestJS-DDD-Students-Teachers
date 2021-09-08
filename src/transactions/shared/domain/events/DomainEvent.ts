import { generateUuid } from '../../utils/generate-uuid';
import { DomainId } from '../ids/DomainId';

class DomainEventId extends DomainId {}

export abstract class DomainEvent {
  private id: DomainEventId = new DomainEventId(generateUuid());

  toPrimitives() {
    return { id: this.id.getValue() };
  }
}
