"use strict";
cc._RF.push(module, '26b2auu0nRIvo9214oCuXdd', 'PolygonButton');
// start-scene/scripts/PolygonButton.ts

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
exports.PolygonButton = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var PolygonButton = /** @class */ (function (_super) {
    __extends(PolygonButton, _super);
    function PolygonButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.polygon = null;
        return _this;
    }
    PolygonButton_1 = PolygonButton;
    PolygonButton.prototype.onLoad = function () {
        if (this.polygon && this.polygon.points.length > 0) {
            this.node._hitTest = this._hitTest.bind(this);
        }
    };
    PolygonButton.prototype._onTouchMove = function (event) {
        if (this.interactable && this.enabledInHierarchy && this._pressed) {
            var touch = (event).touch;
            var isHit = this.node._hitTest(touch.getLocation(), this.node._touchListener);
            var target = this._getTarget();
            var originalScale = this._originalScale;
            if (this.transition === cc.Button.Transition.SCALE && originalScale) {
                if (isHit) {
                    this._fromScale.x = originalScale.x;
                    this._fromScale.y = originalScale.y;
                    this._toScale.x = originalScale.x * this.zoomScale;
                    this._toScale.y = originalScale.y * this.zoomScale;
                    this._transitionFinished = false;
                }
                else {
                    this.time = 0;
                    this._transitionFinished = true;
                    target.setScale(originalScale.x, originalScale.y);
                }
            }
            else {
                this._applyTransition(isHit ? 'pressed' : 'normal');
            }
            event.stopPropagation();
        }
    };
    PolygonButton.prototype._hitTest = function (location, listener) {
        if (null != location && null != listener) {
            var owner = listener.owner;
            var Polygon = owner.getComponent(PolygonButton_1);
            var ischeck = Polygon.pointInPolygon(owner.convertToNodeSpaceAR(location), Polygon.polygon.points);
            return listener.swallowTouches = ischeck;
        }
    };
    PolygonButton.prototype.pointInPolygon = function (point, polygonPoints) {
        var isInside = false;
        var x = point.x, y = point.y;
        var n = polygonPoints.length;
        for (var i = 0, j = n - 1; i < n; j = i++) {
            var xi = polygonPoints[i].x, yi = polygonPoints[i].y;
            var xj = polygonPoints[j].x, yj = polygonPoints[j].y;
            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                isInside = !isInside;
        }
        return isInside;
    };
    PolygonButton.prototype._applyTransition = function (param) { };
    PolygonButton.prototype._getTarget = function () {
        return;
    };
    ;
    var PolygonButton_1;
    __decorate([
        property(cc.PolygonCollider)
    ], PolygonButton.prototype, "polygon", void 0);
    PolygonButton = PolygonButton_1 = __decorate([
        ccclass,
        menu("添加自定义组件/PolygonButton")
    ], PolygonButton);
    return PolygonButton;
}(cc.Button));
exports.PolygonButton = PolygonButton;

cc._RF.pop();