
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GuideGiftEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b10b6aYXbpMvL7EneawYAHc', 'GuideGiftEntry');
// start-scene/scripts/GuideGiftEntry.ts

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
exports.GuideGiftEntry = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuideGiftEntry = /** @class */ (function (_super) {
    __extends(GuideGiftEntry, _super);
    function GuideGiftEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Gift_btn = null;
        _this.red_point_node = null;
        _this.time_lbl = null;
        _this.endTime = 0;
        _this.timeContainer = 0;
        return _this;
    }
    GuideGiftEntry.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("guideGiftChange", this.update_view, this);
        this.update_view();
        this.time_lbl.string = "";
    };
    GuideGiftEntry.prototype.update = function () { };
    GuideGiftEntry.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("guideGiftChange", this.update_view, this);
    };
    GuideGiftEntry.prototype.update_view = function () {
        if (GameManager_1.gm.data.mapCell_data.guideGift.guideIsGet) {
            if (this.node.parent) {
                this.node.parent.active = false;
            }
            GameManager_1.gm.pool.put(this.node);
            return;
        }
        this.red_point_node.active = true;
    };
    GuideGiftEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a;
        if (event.target == ((_a = this.Gift_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDEGIFT);
        }
    };
    __decorate([
        property(cc.Button)
    ], GuideGiftEntry.prototype, "Gift_btn", void 0);
    __decorate([
        property(cc.Node)
    ], GuideGiftEntry.prototype, "red_point_node", void 0);
    __decorate([
        property(cc.Label)
    ], GuideGiftEntry.prototype, "time_lbl", void 0);
    GuideGiftEntry = __decorate([
        ccclass
    ], GuideGiftEntry);
    return GuideGiftEntry;
}(NodePoolItem_1.NodePoolItem));
exports.GuideGiftEntry = GuideGiftEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEd1aWRlR2lmdEVudHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLCtDQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QixrQ0FBWTtJQUF6QztRQUFBLHFFQTBDQztRQXhDVyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFFakMsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUErQnRDLENBQUM7SUE1QmEsaUNBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUywrQkFBTSxHQUFoQixjQUEyQixDQUFDO0lBRWxCLGtDQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLG9DQUFXLEdBQW5CO1FBQ0ksSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ25DO1lBQ0QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVPLHVEQUE4QixHQUF0QyxVQUF1QyxLQUFlOztRQUNsRCxJQUFJLEtBQUssQ0FBQyxNQUFNLFdBQUksSUFBSSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFBLEVBQUU7WUFDckMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQXZDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUM0QjtJQUc5QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNzQjtJQVJ2QyxjQUFjO1FBRG5CLE9BQU87T0FDRixjQUFjLENBMENuQjtJQUFELHFCQUFDO0NBMUNELEFBMENDLENBMUM0QiwyQkFBWSxHQTBDeEM7QUFFUSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgR3VpZGVHaWZ0RW50cnkgZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgR2lmdF9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZWRfcG9pbnRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdGltZV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBlbmRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB0aW1lQ29udGFpbmVyOiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub24oXCJndWlkZUdpZnRDaGFuZ2VcIiwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgIHRoaXMudGltZV9sYmwuc3RyaW5nID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJndWlkZUdpZnRDaGFuZ2VcIiwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ3VpZGVHaWZ0Lmd1aWRlSXNHZXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ20ucG9vbC5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZF9wb2ludF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLkdpZnRfYnRuPy5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR1VJREVHSUZUKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEd1aWRlR2lmdEVudHJ5IH07Il19