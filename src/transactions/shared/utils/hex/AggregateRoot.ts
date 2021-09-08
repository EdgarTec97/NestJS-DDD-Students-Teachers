import { DomainEvent } from '../../domain/events/DomainEvent';

export abstract class AggregateRoot {
  private events: DomainEvent[] = [];

  record(domainEvent: DomainEvent) {
    this.events.push(domainEvent);
  }

  pullDomainEvents() {
    const events = this.events;
    this.events = [];
    return events;
  }
}
