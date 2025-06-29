
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/ParabolaDemo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcUGFyYWJvbGFEZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQixnQ0FBWTtJQUF2QztRQUFBLHFFQXNDQztRQXBDVyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLFVBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsT0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDO1FBQ2hCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsbUJBQWEsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QyxXQUFLLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUIsYUFBTyxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztJQXVCNUMsQ0FBQztJQXJCVSw0QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FDcEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFDbkUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUM5RixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUN0RSxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRU0sNkJBQU0sR0FBYixVQUFjLFNBQWlCO1FBQzNCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xHLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBbkNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ2tCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2U7SUFSL0IsWUFBWTtRQURqQixPQUFPO09BQ0YsWUFBWSxDQXNDakI7SUFBRCxtQkFBQztDQXRDRCxBQXNDQyxDQXRDMEIsRUFBRSxDQUFDLFNBQVMsR0FzQ3RDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFBhcmFib2xhRGVtbyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdGFyZ2V0X25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzdGFydF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZW5kX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgdGltZTogbnVtYmVyID0gMztcclxuICAgIHByaXZhdGUgZzogbnVtYmVyID0gLTEwO1xyXG4gICAgcHJpdmF0ZSBkVGltZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgbGFzdF9wb3NpdGlvbjogY2MuVmVjMyA9IGNjLlZlYzMuWkVSTztcclxuICAgIHByaXZhdGUgc3BlZWQ6IGNjLlZlYzMgPSBjYy5WZWMzLlpFUk87XHJcbiAgICBwcml2YXRlIEdyYXZpdHk6IGNjLlZlYzMgPSBjYy5WZWMzLlpFUk87XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24gPSB0aGlzLnN0YXJ0X25vZGUucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5sYXN0X3Bvc2l0aW9uID0gdGhpcy5zdGFydF9ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBuZXcgY2MuVmVjMyhcclxuICAgICAgICAgICAgKHRoaXMuZW5kX25vZGUucG9zaXRpb24ueCAtIHRoaXMuc3RhcnRfbm9kZS5wb3NpdGlvbi54KSAvIHRoaXMudGltZSxcclxuICAgICAgICAgICAgKHRoaXMuZW5kX25vZGUucG9zaXRpb24ueSAtIHRoaXMuc3RhcnRfbm9kZS5wb3NpdGlvbi55KSAvIHRoaXMudGltZSAtIDAuNSAqIHRoaXMuZyAqIHRoaXMudGltZSxcclxuICAgICAgICAgICAgKHRoaXMuZW5kX25vZGUucG9zaXRpb24ueiAtIHRoaXMuc3RhcnRfbm9kZS5wb3NpdGlvbi56KSAvIHRoaXMudGltZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5HcmF2aXR5ID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kVGltZSA8IHRoaXMudGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLkdyYXZpdHkueSA9IHRoaXMuZyAqICh0aGlzLmRUaW1lICs9IGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24gPSB0aGlzLnNwZWVkLm11bHRpcGx5U2NhbGFyKGRlbHRhVGltZSkuYWRkKHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldF9ub2RlLnBvc2l0aW9uID0gdGhpcy5HcmF2aXR5Lm11bHRpcGx5U2NhbGFyKGRlbHRhVGltZSkuYWRkKHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgZGVsdGFQb3NpdGlvbiA9IHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24uc3VidHJhY3QodGhpcy5sYXN0X3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMihkZWx0YVBvc2l0aW9uLnksIGRlbHRhUG9zaXRpb24ueCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0X25vZGUuYW5nbGUgPSAxODAgKiBhbmdsZSAvIE1hdGguUEk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==