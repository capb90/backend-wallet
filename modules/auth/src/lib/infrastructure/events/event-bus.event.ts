import { Subject } from 'rxjs';

export class EventBus {
  private eventStream = new Subject<{ type: string; payload: unknown }>();

  public publish(event: { type: string; payload: unknown }) {
    this.eventStream.next(event);
  }

  public subscribe(eventType: string, handler: (payload: unknown) => void) {
    this.eventStream.subscribe((event) => {
      if (event.type === eventType) {
        handler(event.payload);
      }
    });
  }
}
