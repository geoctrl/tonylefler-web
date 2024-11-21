export class EventBus<T> {
  private eventTarget: EventTarget;
  private eventName: string;
  private listeners: Map<(event: CustomEvent<T>) => void, EventListener> =
    new Map();

  constructor(eventName: string) {
    this.eventTarget = new EventTarget();
    this.eventName = eventName;
  }

  // Subscribe to the event
  on(callback: (event: CustomEvent<T>) => void): {
    remove: () => void;
  } {
    const listener: EventListener = (event) => {
      callback(event as CustomEvent<T>);
    };

    this.listeners.set(callback, listener);
    this.eventTarget.addEventListener(this.eventName, listener);

    // Return an unsubscribe function
    return {
      remove: () => this.off(callback),
    };
  }

  // Emit the event
  emit(detail: T): void {
    this.eventTarget.dispatchEvent(new CustomEvent(this.eventName, { detail }));
  }

  // Unsubscribe a single listener
  off(callback: (event: CustomEvent<T>) => void): void {
    const listener = this.listeners.get(callback);
    if (listener) {
      this.eventTarget.removeEventListener(this.eventName, listener);
      this.listeners.delete(callback); // Clean up the map
    }
  }

  // Remove all subscribers
  offAll(): void {
    this.listeners.forEach((listener) => {
      this.eventTarget.removeEventListener(this.eventName, listener);
    });
    this.listeners.clear();
  }
}
