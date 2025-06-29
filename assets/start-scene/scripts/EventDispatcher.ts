const { ccclass, property } = cc._decorator;

interface EventListener {
    event: Function;
    target: cc.Component;
}

@ccclass
export class EventDispatcher extends cc.Component {
    private events: { [key: string]: EventListener[] };

    constructor() {
        super();
        this.events = {};
    }

    public dispatchEvent(ccEvent: cc.Event): void {
        const event = this.events[ccEvent.type];
        if (null != event) {
            for (let index = 0; index < event.length; index++) {
                event[index].event.apply(event[index].target, [ccEvent])
            }
        }
    }

    public addEventListener(key: string, newEvent: Function, _target: cc.Component): void {
        let event = this.events[key];
        if (null == event) {
            this.events[key] = new Array;
            event = this.events[key];
        }

        for (let index = 0; index < event.length; index++) {
            if (event[index].event == newEvent && event[index].target == _target) {
                return;
            }
        }

        event.push({
            event: newEvent,
            target: _target
        })
    }

    public removeEventListener(key: string, newEvent: Function, _target: cc.Component): void {
        const event = this.events[key];
        if (null != event) {
            for (let index = 0; index < event.length; index++) {
                if (event[index].event == newEvent && event[index].target == _target) {
                    event.splice(index, 1);
                    return;
                }
            }
        }
    }
}
