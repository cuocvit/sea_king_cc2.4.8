
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/PolygonButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFBvbHlnb25CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBOEIsRUFBRSxDQUFDLFVBQVUsRUFBekMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBSWxEO0lBQW1DLGlDQUFTO0lBQTVDO1FBQUEscUVBeUVDO1FBdkVXLGFBQU8sR0FBOEIsSUFBSSxDQUFDOztJQXVFdEQsQ0FBQztzQkF6RVksYUFBYTtJQVdaLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRU8sb0NBQVksR0FBcEIsVUFBcUIsS0FBMEI7UUFDM0MsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQy9ELElBQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzVCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2hGLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRTFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFD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QVEsQ0FBQztJQUNwQixDQUFDO0lBRU8sd0NBQWdCLEdBQXhCLFVBQXlCLEtBQWEsSUFBVSxDQUFDO0lBQ3pDLGtDQUFVLEdBQWxCO1FBQ0ksT0FBTztJQUNYLENBQUM7SUFBQSxDQUFDOztJQXRFRjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDO2tEQUNxQjtJQUZ6QyxhQUFhO1FBRnpCLE9BQU87UUFDUCxJQUFJLENBQUMsdUJBQXVCLENBQUM7T0FDakIsYUFBYSxDQXlFekI7SUFBRCxvQkFBQztDQXpFRCxBQXlFQyxDQXpFa0MsRUFBRSxDQUFDLE1BQU0sR0F5RTNDO0FBekVZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi5re75Yqg6Ieq5a6a5LmJ57uE5Lu2L1BvbHlnb25CdXR0b25cIilcclxuZXhwb3J0IGNsYXNzIFBvbHlnb25CdXR0b24gZXh0ZW5kcyBjYy5CdXR0b24ge1xyXG4gICAgQHByb3BlcnR5KGNjLlBvbHlnb25Db2xsaWRlcilcclxuICAgIHByaXZhdGUgcG9seWdvbjogY2MuUG9seWdvbkNvbGxpZGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF90cmFuc2l0aW9uRmluaXNoZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9mcm9tU2NhbGU6IGNjLlZlYzI7XHJcbiAgICBwcml2YXRlIF90b1NjYWxlOiBjYy5WZWMyO1xyXG4gICAgcHJpdmF0ZSBfcHJlc3NlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX29yaWdpbmFsU2NhbGU6IGNjLlZlYzJcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBvbHlnb24gJiYgdGhpcy5wb2x5Z29uLnBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5faGl0VGVzdCA9IHRoaXMuX2hpdFRlc3QuYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25Ub3VjaE1vdmUoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pbnRlcmFjdGFibGUgJiYgdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkgJiYgdGhpcy5fcHJlc3NlZCkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VjaCA9IChldmVudCkudG91Y2g7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzSGl0ID0gdGhpcy5ub2RlLl9oaXRUZXN0KHRvdWNoLmdldExvY2F0aW9uKCksIHRoaXMubm9kZS5fdG91Y2hMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xyXG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFNjYWxlID0gdGhpcy5fb3JpZ2luYWxTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFICYmIG9yaWdpbmFsU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0hpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zyb21TY2FsZS54ID0gb3JpZ2luYWxTY2FsZS54O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zyb21TY2FsZS55ID0gb3JpZ2luYWxTY2FsZS55O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvU2NhbGUueCA9IG9yaWdpbmFsU2NhbGUueCAqIHRoaXMuem9vbVNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvU2NhbGUueSA9IG9yaWdpbmFsU2NhbGUueSAqIHRoaXMuem9vbVNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldFNjYWxlKG9yaWdpbmFsU2NhbGUueCwgb3JpZ2luYWxTY2FsZS55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5VHJhbnNpdGlvbihpc0hpdCA/ICdwcmVzc2VkJyA6ICdub3JtYWwnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hpdFRlc3QobG9jYXRpb246IGNjLlZlYzIsIGxpc3RlbmVyOiB7IG93bmVyOiBjYy5Ob2RlLCBzd2FsbG93VG91Y2hlczogYm9vbGVhbiB9KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gbG9jYXRpb24gJiYgbnVsbCAhPSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBvd25lciA9IGxpc3RlbmVyLm93bmVyO1xyXG4gICAgICAgICAgICBjb25zdCBQb2x5Z29uID0gb3duZXIuZ2V0Q29tcG9uZW50KFBvbHlnb25CdXR0b24pO1xyXG4gICAgICAgICAgICBjb25zdCBpc2NoZWNrID0gUG9seWdvbi5wb2ludEluUG9seWdvbihvd25lci5jb252ZXJ0VG9Ob2RlU3BhY2VBUihsb2NhdGlvbiksIFBvbHlnb24ucG9seWdvbi5wb2ludHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuc3dhbGxvd1RvdWNoZXMgPSBpc2NoZWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBvaW50SW5Qb2x5Z29uKHBvaW50OiBjYy5WZWMyLCBwb2x5Z29uUG9pbnRzOiBjYy5WZWMyW10pOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNJbnNpZGUgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCB4ID0gcG9pbnQueCwgeSA9IHBvaW50Lnk7XHJcbiAgICAgICAgY29uc3QgbiA9IHBvbHlnb25Qb2ludHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgaiA9IG4gLSAxOyBpIDwgbjsgaiA9IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB4aSA9IHBvbHlnb25Qb2ludHNbaV0ueCwgeWkgPSBwb2x5Z29uUG9pbnRzW2ldLnk7XHJcbiAgICAgICAgICAgIGNvbnN0IHhqID0gcG9seWdvblBvaW50c1tqXS54LCB5aiA9IHBvbHlnb25Qb2ludHNbal0ueTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPSAoeWogPiB5KSkgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcclxuICAgICAgICAgICAgaWYgKGludGVyc2VjdCkgaXNJbnNpZGUgPSAhaXNJbnNpZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNJbnNpZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYXBwbHlUcmFuc2l0aW9uKHBhcmFtOiBzdHJpbmcpOiB2b2lkIHsgfVxyXG4gICAgcHJpdmF0ZSBfZ2V0VGFyZ2V0KCk6IGNjLk5vZGUge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbn1cclxuIl19