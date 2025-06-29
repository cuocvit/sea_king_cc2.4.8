"use strict";
cc._RF.push(module, '3157ejOCydEKbtHeqWibfGF', 'TouchSingle');
// start-scene/scripts/TouchSingle.ts

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
exports.TouchSingle = void 0;
// *-*
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var TouchSingle = /** @class */ (function (_super) {
    __extends(TouchSingle, _super);
    function TouchSingle() {
        var _this = _super.call(this) || this;
        _this._touchID = null;
        return _this;
    }
    TouchSingle.prototype._touchStart = function (event) {
        if (this._touchID != null) {
            event.stopPropagation();
        }
        else {
            this._touchID = event.getID();
        }
    };
    TouchSingle.prototype._touchMove = function (event) {
        if (this._touchID != event.getID()) {
            event.stopPropagation();
        }
    };
    TouchSingle.prototype._touchEnd = function (event) {
        if (this._touchID != event.getID()) {
            event.stopPropagation();
        }
        else if (!event.simulate) {
            this._touchID = null;
        }
    };
    TouchSingle.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStart, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEnd, this, true);
    };
    TouchSingle.prototype.onDisable = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._touchStart, this, true);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEnd, this, true);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEnd, this, true);
    };
    TouchSingle = __decorate([
        ccclass,
        menu("添加自定义组件/TouchSingle")
    ], TouchSingle);
    return TouchSingle;
}(cc.Component));
exports.TouchSingle = TouchSingle;

cc._RF.pop();