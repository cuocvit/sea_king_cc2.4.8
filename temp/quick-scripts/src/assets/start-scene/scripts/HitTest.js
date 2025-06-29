"use strict";
cc._RF.push(module, 'dccc9P6ylZL7rW3jEz9e9sM', 'HitTest');
// start-scene/scripts/HitTest.ts

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
exports.HitTest = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var HitTest = /** @class */ (function (_super) {
    __extends(HitTest, _super);
    function HitTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.polygon = [cc.Vec2.ZERO, cc.Vec2.ZERO, cc.Vec2.ZERO, cc.Vec2.ZERO];
        return _this;
    }
    HitTest_1 = HitTest;
    HitTest.prototype.onEnable = function () {
        this._old_function = this.node._hitTest;
        this.node._hitTest = this._hit_test.bind(this);
    };
    HitTest.prototype.onDisable = function () {
        this.node._hitTest = this._old_function;
    };
    HitTest.prototype._hit_test = function (point, event) {
        if (point != null && event != null) {
            var owner = event.owner;
            var component = owner.getComponent(HitTest_1);
            var isInside = this.point_in_polygon(owner.convertToNodeSpaceAR(point), component.polygon);
            event.swallowTouches = isInside;
            return isInside;
        }
        return false;
    };
    HitTest.prototype.point_in_polygon = function (point, polygon) {
        var isInside = false;
        var pointX = point.x;
        var pointY = point.y;
        var polygonLength = polygon.length;
        for (var i = 0, j = polygonLength - 1; i < polygonLength; j = i++) {
            var xi = polygon[i].x;
            var yi = polygon[i].y;
            var xj = polygon[j].x;
            var yj = polygon[j].y;
            var intersect = (yi > pointY) !== (yj > pointY) && (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
            if (intersect)
                isInside = !isInside;
        }
        return isInside;
    };
    var HitTest_1;
    __decorate([
        property([cc.Vec2])
    ], HitTest.prototype, "polygon", void 0);
    HitTest = HitTest_1 = __decorate([
        ccclass,
        menu("添加自定义组件/HitTest")
    ], HitTest);
    return HitTest;
}(cc.Component));
exports.HitTest = HitTest;

cc._RF.pop();