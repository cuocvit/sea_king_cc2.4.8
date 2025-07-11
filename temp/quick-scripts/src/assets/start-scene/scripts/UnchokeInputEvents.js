"use strict";
cc._RF.push(module, 'cb3d3UAV/tJwIjweqksqOwF', 'UnchokeInputEvents');
// start-scene/scripts/UnchokeInputEvents.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var UnchokeInputEvents = /** @class */ (function (_super) {
    __extends(UnchokeInputEvents, _super);
    function UnchokeInputEvents() {
        var _this = _super.call(this) || this;
        _this._isSwallow = false;
        return _this;
    }
    UnchokeInputEvents.prototype.onEnable = function () {
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(this._isSwallow);
        }
    };
    UnchokeInputEvents = __decorate([
        ccclass,
        menu("添加自定义组件/UnchokeInputEvents")
    ], UnchokeInputEvents);
    return UnchokeInputEvents;
}(cc.Component));
exports.default = UnchokeInputEvents;

cc._RF.pop();