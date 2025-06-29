// @@
interface IEventListener {
    callback: CallbackType;
    target: object;
    isOnce: boolean;
}

// @@
type EventArgsType = number | string | boolean | object;
export type CallbackType = (...args: EventArgsType[]) => void;

// @@
export class EventEmitter {
    private readonly _events: Record<string, IEventListener[]>;

    // @@
    public constructor() {
        this._events = {};
    }

    // @@
    public emit(eventName: string, ...args: EventArgsType[]): void {
        const listeners: IEventListener[] = this._events[eventName];
        if (!Array.isArray(listeners)) return;
        for (let i = listeners.length - 1; i >= 0; i--) {
            const listener: IEventListener = listeners[i];
            if (typeof listener.callback === "function" && listener.target) {
                listener.callback.apply(listener.target, args);
                if (listener.isOnce) listeners.splice(i, 1);
            }
        }
    }

    // @@
    public on(eventName: string, callback: CallbackType, target: object): void {
        this._addListener(eventName, callback, target);
    }

    // @@ (not used)
    public once(eventName: string, callback: CallbackType, target: object): void {
        this._addListener(eventName, callback, target, true);
    }

    // @@
    public off(eventName: string, callback: CallbackType, target?: object): void {
        const listeners: IEventListener[] = this._events[eventName];
        if (!Array.isArray(listeners)) return;
        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i].callback === callback && listeners[i].target === target) {
                listeners.splice(i, 1);
                return;
            }
        }
    }

    // @@ (not used)
    public count(eventName: string): number {
        return (this._events[eventName] || []).length;
    }

    // @@
    private _addListener(eventName: string, callback: CallbackType, target: object, isOnce: boolean = false): void {
        if (!eventName || typeof eventName !== "string" || typeof callback !== "function" || !target || typeof target !== "object") return;
        const listeners: IEventListener[] = this._events[eventName] || [];
        for (const listener of listeners) {
            if (listener.callback === callback && listener.target === target) {
                console.log("Do not register listeners repeatedly"); // 不要重复注册监听
                return;
            }
        }
        listeners.unshift({ callback, target, isOnce });
        this._events[eventName] = listeners;
    }
}
