"use strict";
cc._RF.push(module, 'be53ecvYzxIJae8lpYAGqpa', 'Arrow');
// test/scripts/Arrow.ts

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
exports.Arrow = exports.WEAPON_FLY_TYPE = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WEAPON_FLY_TYPE;
(function (WEAPON_FLY_TYPE) {
    WEAPON_FLY_TYPE[WEAPON_FLY_TYPE["LEFT_PARABOL"] = 0] = "LEFT_PARABOL";
    WEAPON_FLY_TYPE[WEAPON_FLY_TYPE["LINE"] = 1] = "LINE";
})(WEAPON_FLY_TYPE = exports.WEAPON_FLY_TYPE || (exports.WEAPON_FLY_TYPE = {}));
var Arrow = /** @class */ (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._g = -10;
        _this._shotSpeed = 400;
        _this._speed = null;
        _this._gravity = null;
        _this._currAngle = null;
        _this._dTime = 0;
        _this._flyType = -1;
        _this._dir = 1;
        _this._isMoving = false;
        _this.startPos = null;
        _this.endPos = null;
        return _this;
    }
    Arrow_1 = Arrow;
    Arrow.prototype.onLoad = function () {
        this._speed = new cc.Vec3();
        this._gravity = new cc.Vec3();
        this._currAngle = new cc.Vec3();
    };
    Arrow.prototype.launchWeapon = function (flyType, startPos, endPos) {
        this.startPos = startPos;
        this.endPos = endPos;
        this._flyType = flyType;
        this._dTime = 0;
        this.node.setPosition(this.startPos);
        cc.Vec3.subtract(Arrow_1.vec3, this.startPos, this.endPos);
        var travelTime = Arrow_1.vec3.mag() / this._shotSpeed;
        this._dir = this._flyType === WEAPON_FLY_TYPE.LEFT_PARABOL ? -1 : 1;
        var gravityOffsetY = 0;
        var gravityOffsetX = 0;
        if (this._flyType === WEAPON_FLY_TYPE.LINE) {
            gravityOffsetY = .5 * this._g * travelTime;
        }
        else {
            gravityOffsetX = .5 * this._g * travelTime * this._dir;
        }
        this._speed = new cc.Vec3((this.endPos.x - this.startPos.x) / travelTime - gravityOffsetX, (this.endPos.y - this.startPos.y) / travelTime - gravityOffsetY, (this.endPos.z - this.startPos.z) / travelTime);
        cc.Vec3.zero(this._gravity);
        this._isMoving = true;
    };
    Arrow.prototype.update = function (deltaTime) {
        if (this._isMoving) {
            if (this._flyType === WEAPON_FLY_TYPE.LINE) {
                this._gravity.y = this._g * (this._dTime += deltaTime);
            }
            else {
                this._gravity.x = this._g * (this._dTime += deltaTime * this._dir);
            }
            var currentPosition = this.node.position;
            cc.Vec3.add(Arrow_1.vec3, this._speed, this._gravity);
            cc.Vec3.multiplyScalar(Arrow_1.vec3, Arrow_1.vec3, deltaTime);
            cc.Vec3.add(currentPosition, currentPosition, Arrow_1.vec3);
            if (this._flyType === WEAPON_FLY_TYPE.LINE) {
                this._currAngle.x = 180 * Math.atan((this._speed.y + this._gravity.y) / this._speed.z) / Math.PI;
            }
            else {
                this._currAngle.y = 180 * Math.atan((this._speed.x + this._gravity.x) / this._speed.z) / Math.PI;
            }
            this.node.eulerAngles = this._currAngle;
            this.node.setPosition(currentPosition);
            cc.Vec3.subtract(Arrow_1.vec3, this.endPos, currentPosition);
            if (Arrow_1.vec3.mag() <= 0.3) {
                this.arriveTarget();
            }
        }
    };
    Arrow.prototype.arriveTarget = function () {
        this._isMoving = false;
        console.warn("达到终点～～～～～～～～～～～");
    };
    var Arrow_1;
    Arrow.vec3 = new cc.Vec3();
    Arrow = Arrow_1 = __decorate([
        ccclass
    ], Arrow);
    return Arrow;
}(cc.Component));
exports.Arrow = Arrow;

cc._RF.pop();