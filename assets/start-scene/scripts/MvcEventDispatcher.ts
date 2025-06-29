//
import { EventDispatcher } from './EventDispatcher';

interface MvcEventDispatcher {
    dispatchEvent: (eventName: string, event: any) => void;
    getInstance: (key: string) => EventDispatcher;
}


const MvcEventDispatcher: MvcEventDispatcher = (function() {
    const _DISPATCHERS_DIC: { [key: string]: EventDispatcher } = {};

    const dispatchEvent = function(eventName: string, event: cc.Event): void {
        if (eventName) {
            this.getInstance(eventName).dispatchEvent(event);
        } else {
            for (const key in _DISPATCHERS_DIC) {
                _DISPATCHERS_DIC[key].dispatchEvent(event);
            }
        }
    };

    const getInstance = function(key: string): EventDispatcher {
        if (_DISPATCHERS_DIC[key] == null) {
            _DISPATCHERS_DIC[key] = new EventDispatcher();
        }
        return _DISPATCHERS_DIC[key];
    };

    return {
        dispatchEvent,
        getInstance,
        _DISPATCHERS_DIC
    };
})();

export { MvcEventDispatcher };