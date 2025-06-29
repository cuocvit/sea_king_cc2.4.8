
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/DebugEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '266baOnyXFNO42+6F7sRDEb', 'DebugEntry');
// start-scene/scripts/DebugEntry.ts

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
// *-*
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DebugEntry = /** @class */ (function (_super) {
    __extends(DebugEntry, _super);
    function DebugEntry() {
        var _this = _super.call(this) || this;
        _this._touch_start_position = cc.Vec3.ZERO;
        _this._touch_start_timestamp = 0;
        return _this;
    }
    DebugEntry.prototype.onLoad = function () {
        GameManager_1.gm.data.catch_error_log();
    };
    DebugEntry.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start_handler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    };
    DebugEntry.prototype.onDisable = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start_handler, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    };
    DebugEntry.prototype.on_touch_move_handler = function (event) {
        this.node.y += event.getDelta().y;
        this.node.x += event.getDelta().x;
    };
    DebugEntry.prototype.on_touch_start_handler = function () {
        this._touch_start_position = this.node.position;
        this._touch_start_timestamp = Date.now();
    };
    DebugEntry.prototype.on_touch_end_handler = function () {
        if (Date.now() - this._touch_start_timestamp < 200) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Debug);
        }
    };
    DebugEntry = __decorate([
        ccclass
    ], DebugEntry);
    return DebugEntry;
}(NodePoolItem_1.NodePoolItem));
exports.default = DebugEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXERlYnVnRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUIsOEJBQVk7SUFJakM7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFGRyxLQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUMsS0FBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQzs7SUFDcEMsQ0FBQztJQUVTLDJCQUFNLEdBQWhCO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVTLDZCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVTLDhCQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVPLDBDQUFxQixHQUE3QixVQUE4QixLQUFxQztRQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLDJDQUFzQixHQUE5QjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTyx5Q0FBb0IsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxFQUFFO1lBQ2hELGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUF4Q0MsVUFBVTtRQURmLE9BQU87T0FDRixVQUFVLENBeUNmO0lBQUQsaUJBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q3dCLDJCQUFZLEdBeUNwQztBQUVELGtCQUFlLFVBQVUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICotKlxyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgRGVidWdFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBwcml2YXRlIF90b3VjaF9zdGFydF9wb3NpdGlvbjogY2MuVmVjMztcclxuICAgIHByaXZhdGUgX3RvdWNoX3N0YXJ0X3RpbWVzdGFtcDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fdG91Y2hfc3RhcnRfcG9zaXRpb24gPSBjYy5WZWMzLlpFUk87XHJcbiAgICAgICAgdGhpcy5fdG91Y2hfc3RhcnRfdGltZXN0YW1wID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuY2F0Y2hfZXJyb3JfbG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbl90b3VjaF9zdGFydF9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vbl90b3VjaF9tb3ZlX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbl90b3VjaF9zdGFydF9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25fdG91Y2hfbW92ZV9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl90b3VjaF9lbmRfaGFuZGxlciwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9tb3ZlX2hhbmRsZXIoZXZlbnQ6IGNjLlRvdWNoIHwgY2MuRXZlbnQuRXZlbnRNb3VzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS55ICs9IGV2ZW50LmdldERlbHRhKCkueTtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSBldmVudC5nZXREZWx0YSgpLng7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9zdGFydF9oYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RvdWNoX3N0YXJ0X3Bvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuX3RvdWNoX3N0YXJ0X3RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9lbmRfaGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMuX3RvdWNoX3N0YXJ0X3RpbWVzdGFtcCA8IDIwMCkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkRlYnVnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlYnVnRW50cnk7Il19