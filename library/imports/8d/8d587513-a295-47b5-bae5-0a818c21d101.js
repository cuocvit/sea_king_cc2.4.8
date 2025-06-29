"use strict";
cc._RF.push(module, '8d587UTopVHtbrlCoGMIdEB', 'EventDispatcher');
// start-scene/scripts/EventDispatcher.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EventDispatcher = /** @class */ (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        var _this = _super.call(this) || this;
        _this.events = {};
        return _this;
    }
    EventDispatcher.prototype.dispatchEvent = function (ccEvent) {
        var event = this.events[ccEvent.type];
        if (null != event) {
            for (var index = 0; index < event.length; index++) {
                event[index].event.apply(event[index].target, [ccEvent]);
            }
        }
    };
    EventDispatcher.prototype.addEventListener = function (key, newEvent, _target) {
        var event = this.events[key];
        if (null == event) {
            this.events[key] = new Array;
            event = this.events[key];
        }
        for (var index = 0; index < event.length; index++) {
            if (event[index].event == newEvent && event[index].target == _target) {
                return;
            }
        }
        event.push({
            event: newEvent,
            target: _target
        });
    };
    EventDispatcher.prototype.removeEventListener = function (key, newEvent, _target) {
        var event = this.events[key];
        if (null != event) {
            for (var index = 0; index < event.length; index++) {
                if (event[index].event == newEvent && event[index].target == _target) {
                    event.splice(index, 1);
                    return;
                }
            }
        }
    };
    EventDispatcher = __decorate([
        ccclass
    ], EventDispatcher);
    return EventDispatcher;
}(cc.Component));
exports.EventDispatcher = EventDispatcher;

cc._RF.pop();