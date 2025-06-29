"use strict";
cc._RF.push(module, 'f8691OA34hGHITX4z9Pt9+Y', 'HandAnim');
// start-scene/scripts/HandAnim.ts

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
// +-+
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HandAnim = /** @class */ (function (_super) {
    __extends(HandAnim, _super);
    function HandAnim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HandAnim.prototype.onEnable = function () {
        var _this = this;
        this.node.children[0].getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function (t, e) {
            if ("hand_open" == e.name) {
                _this.node.children[0].getComponent(cc.Animation).play("hand_normal");
            }
        }, this);
        this.node.children[0].getComponent(cc.Animation).play("hand_open");
    };
    HandAnim.prototype.onDisable = function () {
        this.node.children[0].getComponent(cc.Animation).stop();
        this.node.children[0].getComponent(cc.Animation).targetOff(this);
    };
    HandAnim.prototype.onStop = function () {
        var _this = this;
        this.node.children[0].getComponent(cc.Animation).play("hand_normal");
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.node.children[0].getComponent(cc.Animation).stop();
        }, 0);
    };
    HandAnim = __decorate([
        ccclass
    ], HandAnim);
    return HandAnim;
}(cc.Component));
exports.default = HandAnim;

cc._RF.pop();