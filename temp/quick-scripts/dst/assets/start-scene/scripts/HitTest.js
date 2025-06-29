
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/HitTest.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEhpdFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBOEIsRUFBRSxDQUFDLFVBQVUsRUFBekMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBSWxEO0lBQTZCLDJCQUFZO0lBQXpDO1FBQUEscUVBMkNDO1FBekNXLGFBQU8sR0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBeUMxRixDQUFDO2dCQTNDWSxPQUFPO0lBTU4sMEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFUywyQkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUMsQ0FBQztJQUVPLDJCQUFTLEdBQWpCLFVBQWtCLEtBQWMsRUFBRSxLQUFVO1FBQ3hDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2hDLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDMUIsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RixLQUFLLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztZQUNoQyxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxrQ0FBZ0IsR0FBeEIsVUFBeUIsS0FBYyxFQUFFLE9BQWtCO1FBQ3ZELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUVyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUMvRCxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhCLElBQU0sU0FBUyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzNHLElBQUksU0FBUztnQkFBRSxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUM7U0FDdkM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOztJQXhDRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0Q0FDa0U7SUFGN0UsT0FBTztRQUZuQixPQUFPO1FBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDO09BQ1gsT0FBTyxDQTJDbkI7SUFBRCxjQUFDO0NBM0NELEFBMkNDLENBM0M0QixFQUFFLENBQUMsU0FBUyxHQTJDeEM7QUEzQ1ksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCLmt7vliqDoh6rlrprkuYnnu4Tku7YvSGl0VGVzdFwiKVxyXG5leHBvcnQgY2xhc3MgSGl0VGVzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoW2NjLlZlYzJdKVxyXG4gICAgcHJpdmF0ZSBwb2x5Z29uOiBjYy5WZWMyW10gPSBbY2MuVmVjMi5aRVJPLCBjYy5WZWMyLlpFUk8sIGNjLlZlYzIuWkVSTywgY2MuVmVjMi5aRVJPXTtcclxuXHJcbiAgICBwcml2YXRlIF9vbGRfZnVuY3Rpb246IChwb2ludD86IGNjLlZlYzIsIGV2ZW50PzogYW55KSA9PiBib29sZWFuO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbGRfZnVuY3Rpb24gPSB0aGlzLm5vZGUuX2hpdFRlc3Q7XHJcbiAgICAgICAgdGhpcy5ub2RlLl9oaXRUZXN0ID0gdGhpcy5faGl0X3Rlc3QuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5faGl0VGVzdCA9IHRoaXMuX29sZF9mdW5jdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oaXRfdGVzdChwb2ludDogY2MuVmVjMiwgZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChwb2ludCAhPSBudWxsICYmIGV2ZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3duZXIgPSBldmVudC5vd25lcjtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gb3duZXIuZ2V0Q29tcG9uZW50KEhpdFRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCBpc0luc2lkZSA9IHRoaXMucG9pbnRfaW5fcG9seWdvbihvd25lci5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb2ludCksIGNvbXBvbmVudC5wb2x5Z29uKTtcclxuICAgICAgICAgICAgZXZlbnQuc3dhbGxvd1RvdWNoZXMgPSBpc0luc2lkZTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzSW5zaWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb2ludF9pbl9wb2x5Z29uKHBvaW50OiBjYy5WZWMyLCBwb2x5Z29uOiBjYy5WZWMyW10pOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNJbnNpZGUgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBwb2ludFggPSBwb2ludC54O1xyXG4gICAgICAgIGNvbnN0IHBvaW50WSA9IHBvaW50Lnk7XHJcbiAgICAgICAgY29uc3QgcG9seWdvbkxlbmd0aCA9IHBvbHlnb24ubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgaiA9IHBvbHlnb25MZW5ndGggLSAxOyBpIDwgcG9seWdvbkxlbmd0aDsgaiA9IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB4aSA9IHBvbHlnb25baV0ueDtcclxuICAgICAgICAgICAgY29uc3QgeWkgPSBwb2x5Z29uW2ldLnk7XHJcbiAgICAgICAgICAgIGNvbnN0IHhqID0gcG9seWdvbltqXS54O1xyXG4gICAgICAgICAgICBjb25zdCB5aiA9IHBvbHlnb25bal0ueTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdCA9ICh5aSA+IHBvaW50WSkgIT09ICh5aiA+IHBvaW50WSkgJiYgKHBvaW50WCA8ICh4aiAtIHhpKSAqIChwb2ludFkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XHJcbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3QpIGlzSW5zaWRlID0gIWlzSW5zaWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNJbnNpZGU7XHJcbiAgICB9XHJcbn0iXX0=