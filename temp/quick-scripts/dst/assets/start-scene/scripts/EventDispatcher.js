
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/EventDispatcher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEV2ZW50RGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFRNUM7SUFBcUMsbUNBQVk7SUFHN0M7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7SUFDckIsQ0FBQztJQUVNLHVDQUFhLEdBQXBCLFVBQXFCLE9BQWlCO1FBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMvQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUMzRDtTQUNKO0lBQ0wsQ0FBQztJQUVNLDBDQUFnQixHQUF2QixVQUF3QixHQUFXLEVBQUUsUUFBa0IsRUFBRSxPQUFxQjtRQUMxRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUM7WUFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFFRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUNsRSxPQUFPO2FBQ1Y7U0FDSjtRQUVELEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDUCxLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSw2Q0FBbUIsR0FBMUIsVUFBMkIsR0FBVyxFQUFFLFFBQWtCLEVBQUUsT0FBcUI7UUFDN0UsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDZixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRTtvQkFDbEUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQTlDUSxlQUFlO1FBRDNCLE9BQU87T0FDSyxlQUFlLENBK0MzQjtJQUFELHNCQUFDO0NBL0NELEFBK0NDLENBL0NvQyxFQUFFLENBQUMsU0FBUyxHQStDaEQ7QUEvQ1ksMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuaW50ZXJmYWNlIEV2ZW50TGlzdGVuZXIge1xyXG4gICAgZXZlbnQ6IEZ1bmN0aW9uO1xyXG4gICAgdGFyZ2V0OiBjYy5Db21wb25lbnQ7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBldmVudHM6IHsgW2tleTogc3RyaW5nXTogRXZlbnRMaXN0ZW5lcltdIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGNjRXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tjY0V2ZW50LnR5cGVdO1xyXG4gICAgICAgIGlmIChudWxsICE9IGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBldmVudC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50W2luZGV4XS5ldmVudC5hcHBseShldmVudFtpbmRleF0udGFyZ2V0LCBbY2NFdmVudF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoa2V5OiBzdHJpbmcsIG5ld0V2ZW50OiBGdW5jdGlvbiwgX3RhcmdldDogY2MuQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGV2ZW50ID0gdGhpcy5ldmVudHNba2V5XTtcclxuICAgICAgICBpZiAobnVsbCA9PSBldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1trZXldID0gbmV3IEFycmF5O1xyXG4gICAgICAgICAgICBldmVudCA9IHRoaXMuZXZlbnRzW2tleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZXZlbnQubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudFtpbmRleF0uZXZlbnQgPT0gbmV3RXZlbnQgJiYgZXZlbnRbaW5kZXhdLnRhcmdldCA9PSBfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50LnB1c2goe1xyXG4gICAgICAgICAgICBldmVudDogbmV3RXZlbnQsXHJcbiAgICAgICAgICAgIHRhcmdldDogX3RhcmdldFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoa2V5OiBzdHJpbmcsIG5ld0V2ZW50OiBGdW5jdGlvbiwgX3RhcmdldDogY2MuQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1trZXldO1xyXG4gICAgICAgIGlmIChudWxsICE9IGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBldmVudC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudFtpbmRleF0uZXZlbnQgPT0gbmV3RXZlbnQgJiYgZXZlbnRbaW5kZXhdLnRhcmdldCA9PSBfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19