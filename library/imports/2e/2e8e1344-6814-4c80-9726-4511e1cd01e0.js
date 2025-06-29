"use strict";
cc._RF.push(module, '2e8e1NEaBRMgJcmRRHhzQHg', 'ParabolaDemo');
// test/scripts/ParabolaDemo.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ParabolaDemo = /** @class */ (function (_super) {
    __extends(ParabolaDemo, _super);
    function ParabolaDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target_node = null;
        _this.start_node = null;
        _this.end_node = null;
        _this.time = 3;
        _this.g = -10;
        _this.dTime = 0;
        _this.last_position = cc.Vec3.ZERO;
        _this.speed = cc.Vec3.ZERO;
        _this.Gravity = cc.Vec3.ZERO;
        return _this;
    }
    ParabolaDemo.prototype.start = function () {
        this.target_node.position = this.start_node.position;
        this.last_position = this.start_node.position;
        this.speed = new cc.Vec3((this.end_node.position.x - this.start_node.position.x) / this.time, (this.end_node.position.y - this.start_node.position.y) / this.time - 0.5 * this.g * this.time, (this.end_node.position.z - this.start_node.position.z) / this.time);
        this.Gravity = cc.Vec3.ZERO;
    };
    ParabolaDemo.prototype.update = function (deltaTime) {
        if (this.dTime < this.time) {
            this.Gravity.y = this.g * (this.dTime += deltaTime);
            this.target_node.position = this.speed.multiplyScalar(deltaTime).add(this.target_node.position);
            this.target_node.position = this.Gravity.multiplyScalar(deltaTime).add(this.target_node.position);
            var deltaPosition = this.target_node.position.subtract(this.last_position);
            var angle = Math.atan2(deltaPosition.y, deltaPosition.x);
            this.target_node.angle = 180 * angle / Math.PI;
        }
    };
    __decorate([
        property(cc.Node)
    ], ParabolaDemo.prototype, "target_node", void 0);
    __decorate([
        property(cc.Node)
    ], ParabolaDemo.prototype, "start_node", void 0);
    __decorate([
        property(cc.Node)
    ], ParabolaDemo.prototype, "end_node", void 0);
    ParabolaDemo = __decorate([
        ccclass
    ], ParabolaDemo);
    return ParabolaDemo;
}(cc.Component));

cc._RF.pop();