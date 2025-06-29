
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/Arrow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcQXJyb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUN2QixxRUFBZ0IsQ0FBQTtJQUNoQixxREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUhXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBRzFCO0FBR0Q7SUFBMkIseUJBQVk7SUFBdkM7UUFBQSxxRUFnRkM7UUEvRVcsUUFBRSxHQUFXLENBQUMsRUFBRSxDQUFDO1FBQ2pCLGdCQUFVLEdBQVcsR0FBRyxDQUFDO1FBQ3pCLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBQzlCLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBQ2hDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUNsQyxZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN0QixVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFDaEMsWUFBTSxHQUFtQixJQUFJLENBQUM7O0lBcUUxQyxDQUFDO2NBaEZZLEtBQUs7SUFlSixzQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTyw0QkFBWSxHQUFwQixVQUFxQixPQUF3QixFQUFFLFFBQWlCLEVB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QUFDO0lBQ3BDLENBQUM7O0lBbEVjLFVBQUksR0FBWSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQWJwQyxLQUFLO1FBRGpCLE9BQU87T0FDSyxLQUFLLENBZ0ZqQjtJQUFELFlBQUM7Q0FoRkQsQUFnRkMsQ0FoRjBCLEVBQUUsQ0FBQyxTQUFTLEdBZ0Z0QztBQWhGWSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBXRUFQT05fRkxZX1RZUEUge1xyXG4gICAgTEVGVF9QQVJBQk9MID0gMCxcclxuICAgIExJTkUgPSAxXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBBcnJvdyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIF9nOiBudW1iZXIgPSAtMTA7XHJcbiAgICBwcml2YXRlIF9zaG90U3BlZWQ6IG51bWJlciA9IDQwMDtcclxuICAgIHByaXZhdGUgX3NwZWVkOiBjYy5WZWMzIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9ncmF2aXR5OiBjYy5WZWMzIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXJyQW5nbGU6IGNjLlZlYzMgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2RUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfZmx5VHlwZTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9kaXI6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIF9pc01vdmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzdGFydFBvczogY2MuVmVjMyB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBlbmRQb3M6IGNjLlZlYzMgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB2ZWMzOiBjYy5WZWMzID0gbmV3IGNjLlZlYzMoKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gbmV3IGNjLlZlYzMoKTtcclxuICAgICAgICB0aGlzLl9ncmF2aXR5ID0gbmV3IGNjLlZlYzMoKTtcclxuICAgICAgICB0aGlzLl9jdXJyQW5nbGUgPSBuZXcgY2MuVmVjMygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGF1bmNoV2VhcG9uKGZseVR5cGU6IFdFQVBPTl9GTFlfVFlQRSwgc3RhcnRQb3M6IGNjLlZlYzMsIGVuZFBvczogY2MuVmVjMyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSBzdGFydFBvcztcclxuICAgICAgICB0aGlzLmVuZFBvcyA9IGVuZFBvcztcclxuICAgICAgICB0aGlzLl9mbHlUeXBlID0gZmx5VHlwZTtcclxuICAgICAgICB0aGlzLl9kVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3RhcnRQb3MpO1xyXG4gICAgICAgIGNjLlZlYzMuc3VidHJhY3QoQXJyb3cudmVjMywgdGhpcy5zdGFydFBvcywgdGhpcy5lbmRQb3MpO1xyXG4gICAgICAgIGNvbnN0IHRyYXZlbFRpbWUgPSBBcnJvdy52ZWMzLm1hZygpIC8gdGhpcy5fc2hvdFNwZWVkO1xyXG4gICAgICAgIHRoaXMuX2RpciA9IHRoaXMuX2ZseVR5cGUgPT09IFdFQVBPTl9GTFlfVFlQRS5MRUZUX1BBUkFCT0wgPyAtMSA6IDE7XHJcbiAgICAgICAgbGV0IGdyYXZpdHlPZmZzZXRZID0gMDtcclxuICAgICAgICBsZXQgZ3Jhdml0eU9mZnNldFggPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZmx5VHlwZSA9PT0gV0VBUE9OX0ZMWV9UWVBFLkxJTkUpIHtcclxuICAgICAgICAgICAgZ3Jhdml0eU9mZnNldFkgPSAuNSAqIHRoaXMuX2cgKiB0cmF2ZWxUaW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdyYXZpdHlPZmZzZXRYID0gLjUgKiB0aGlzLl9nICogdHJhdmVsVGltZSAqIHRoaXMuX2RpcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkID0gbmV3IGNjLlZlYzMoXHJcbiAgICAgICAgICAgICh0aGlzLmVuZFBvcy54IC0gdGhpcy5zdGFydFBvcy54KSAvIHRyYXZlbFRpbWUgLSBncmF2aXR5T2Zmc2V0WCxcclxuICAgICAgICAgICAgKHRoaXMuZW5kUG9zLnkgLSB0aGlzLnN0YXJ0UG9zLnkpIC8gdHJhdmVsVGltZSAtIGdyYXZpdHlPZmZzZXRZLFxyXG4gICAgICAgICAgICAodGhpcy5lbmRQb3MueiAtIHRoaXMuc3RhcnRQb3MueikgLyB0cmF2ZWxUaW1lKTtcclxuICAgICAgICBjYy5WZWMzLnplcm8odGhpcy5fZ3Jhdml0eSk7XHJcbiAgICAgICAgdGhpcy5faXNNb3ZpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXNNb3ZpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZseVR5cGUgPT09IFdFQVBPTl9GTFlfVFlQRS5MSU5FKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmF2aXR5LnkgPSB0aGlzLl9nICogKHRoaXMuX2RUaW1lICs9IGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmF2aXR5LnggPSB0aGlzLl9nICogKHRoaXMuX2RUaW1lICs9IGRlbHRhVGltZSAqIHRoaXMuX2Rpcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgY2MuVmVjMy5hZGQoQXJyb3cudmVjMywgdGhpcy5fc3BlZWQsIHRoaXMuX2dyYXZpdHkpO1xyXG4gICAgICAgICAgICBjYy5WZWMzLm11bHRpcGx5U2NhbGFyKEFycm93LnZlYzMsIEFycm93LnZlYzMsIGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIGNjLlZlYzMuYWRkKGN1cnJlbnRQb3NpdGlvbiwgY3VycmVudFBvc2l0aW9uLCBBcnJvdy52ZWMzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mbHlUeXBlID09PSBXRUFQT05fRkxZX1RZUEUuTElORSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyckFuZ2xlLnggPSAxODAgKiBNYXRoLmF0YW4oKHRoaXMuX3NwZWVkLnkgKyB0aGlzLl9ncmF2aXR5LnkpIC8gdGhpcy5fc3BlZWQueikgLyBNYXRoLlBJO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyckFuZ2xlLnkgPSAxODAgKiBNYXRoLmF0YW4oKHRoaXMuX3NwZWVkLnggKyB0aGlzLl9ncmF2aXR5LngpIC8gdGhpcy5fc3BlZWQueikgLyBNYXRoLlBJO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZXVsZXJBbmdsZXMgPSB0aGlzLl9jdXJyQW5nbGU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjYy5WZWMzLnN1YnRyYWN0KEFycm93LnZlYzMsIHRoaXMuZW5kUG9zLCBjdXJyZW50UG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycm93LnZlYzMubWFnKCkgPD0gMC4zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycml2ZVRhcmdldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXJyaXZlVGFyZ2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzTW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwi6L6+5Yiw57uI54K5772e772e772e772e772e772e772e772e772e772e772eXCIpO1xyXG4gICAgfVxyXG59Il19