
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderUpLvlAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1a938TBeXJP8IG60xBmSxBP', 'LadderUpLvlAnim');
// ladder/scripts/LadderUpLvlAnim.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var LadderRewardItem_1 = require("./LadderRewardItem");
var TempData_1 = require("../../start-scene/scripts/TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderUpLvlAnim = /** @class */ (function (_super) {
    __extends(LadderUpLvlAnim, _super);
    function LadderUpLvlAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.star_lbl = null;
        _this.rewardList = [];
        return _this;
    }
    LadderUpLvlAnim.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.getComponent(cc.Animation).play("ladder_up_open");
        this.refreshPanel();
    };
    LadderUpLvlAnim.prototype.refreshPanel = function () {
        var ladderData = GameManager_1.gm.data.ladder_data;
        var rewardArray = GameManager_1.gm.data.ladder_temp_data.ladder_achievement_data_array[ladderData.achievement_id - 2].reward_array;
        var configData = GameManager_1.gm.config.get_row_data("LadderAchievementConfigData", ladderData.achievement_id - 1 + "");
        this.star_lbl.string = configData.star + "";
        for (var index = 0; index < this.rewardList.length; index++) {
            var rewardItem = this.rewardList[index];
            if (index < rewardArray.length) {
                rewardItem.node.active = true;
                rewardItem.data = rewardArray[index];
                var Anim = rewardItem.getComponent(cc.Animation);
                if (Anim) {
                    Anim.play();
                }
            }
            else {
                rewardItem.node.active = !1;
            }
        }
    };
    LadderUpLvlAnim.prototype.playAnimEnd = function (animation, event) {
        if (event.name == "ladder_up_close") {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.LADDERUPLVLANIM);
            if (TempData_1.TempData.is_need_open_barrkPanel) {
                TempData_1.TempData.is_need_open_barrkPanel = false;
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BARRACKS_LIST);
            }
        }
    };
    LadderUpLvlAnim.prototype.onClosePanel = function () {
        this.node.getComponent(cc.Animation).play("ladder_up_close");
    };
    LadderUpLvlAnim.prototype.onDisable = function () {
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
    };
    __decorate([
        property(cc.Label)
    ], LadderUpLvlAnim.prototype, "star_lbl", void 0);
    __decorate([
        property([LadderRewardItem_1.LadderRewardItem])
    ], LadderUpLvlAnim.prototype, "rewardList", void 0);
    LadderUpLvlAnim = __decorate([
        ccclass
    ], LadderUpLvlAnim);
    return LadderUpLvlAnim;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJVcEx2bEFuaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELHVEQUFzRDtBQUN0RCwrREFBOEQ7QUFHeEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEIsbUNBQVk7SUFBMUM7UUFBQSxxRUFvREM7UUFsRFcsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUF1QixFQUFFLENBQUM7O0lBK0NoRCxDQUFDO0lBN0NhLGtDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxzQ0FBWSxHQUFwQjtRQUNJLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxJQUFNLFdBQVcsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUN2SCxJQUFNLFVBQVUsR0FBRyxnQkFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxDQUFDLGNBQWMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUE0QixDQUFDO1FBQ3hJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRTVDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6RCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDOUIsVUFBVSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2Y7YUFDSjtpQkFBTTtnQkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMvQjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHFDQUFXLEdBQW5CLFVBQW9CLFNBQXVCLEVBQUUsS0FBb0I7UUFDN0QsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLGlCQUFpQixFQUFFO1lBRWpDLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELElBQUksbUJBQVEsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDbEMsbUJBQVEsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7Z0JBQ3pDLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7SUFDTCxDQUFDO0lBRU8sc0NBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBakREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsQ0FBQyxtQ0FBZ0IsQ0FBQyxDQUFDO3VEQUNlO0lBTDFDLGVBQWU7UUFEcEIsT0FBTztPQUNGLGVBQWUsQ0FvRHBCO0lBQUQsc0JBQUM7Q0FwREQsQUFvREMsQ0FwRDZCLEVBQUUsQ0FBQyxTQUFTLEdBb0R6QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IExhZGRlclJld2FyZEl0ZW0gfSBmcm9tICcuL0xhZGRlclJld2FyZEl0ZW0nO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVGVtcERhdGEnO1xyXG5pbXBvcnQgeyBMYWRkZXJBY2hpZXZlbWVudENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9hY2hpZXZlbWVudCc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTGFkZGVyVXBMdmxBbmltIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc3Rhcl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW0xhZGRlclJld2FyZEl0ZW1dKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRMaXN0OiBMYWRkZXJSZXdhcmRJdGVtW10gPSBbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsIHRoaXMucGxheUFuaW1FbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwibGFkZGVyX3VwX29wZW5cIik7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsYWRkZXJEYXRhID0gZ20uZGF0YS5sYWRkZXJfZGF0YTtcclxuICAgICAgICBjb25zdCByZXdhcmRBcnJheSA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfYWNoaWV2ZW1lbnRfZGF0YV9hcnJheVtsYWRkZXJEYXRhLmFjaGlldmVtZW50X2lkIC0gMl0ucmV3YXJkX2FycmF5O1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiTGFkZGVyQWNoaWV2ZW1lbnRDb25maWdEYXRhXCIsIGxhZGRlckRhdGEuYWNoaWV2ZW1lbnRfaWQgLSAxICsgXCJcIikgYXMgTGFkZGVyQWNoaWV2ZW1lbnRDb25maWc7XHJcbiAgICAgICAgdGhpcy5zdGFyX2xibC5zdHJpbmcgPSBjb25maWdEYXRhLnN0YXIgKyBcIlwiO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5yZXdhcmRMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCByZXdhcmRJdGVtID0gdGhpcy5yZXdhcmRMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgcmV3YXJkQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJdGVtLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJld2FyZEl0ZW0uZGF0YSA9IHJld2FyZEFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEFuaW0gPSByZXdhcmRJdGVtLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKEFuaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBBbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJld2FyZEl0ZW0ubm9kZS5hY3RpdmUgPSAhMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlBbmltRW5kKGFuaW1hdGlvbjogY2MuQW5pbWF0aW9uLCBldmVudD86IGNjLkFuaW1hdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5uYW1lID09IFwibGFkZGVyX3VwX2Nsb3NlXCIpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkxBRERFUlVQTFZMQU5JTSk7XHJcbiAgICAgICAgICAgIGlmIChUZW1wRGF0YS5pc19uZWVkX29wZW5fYmFycmtQYW5lbCkge1xyXG4gICAgICAgICAgICAgICAgVGVtcERhdGEuaXNfbmVlZF9vcGVuX2JhcnJrUGFuZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkJBUlJBQ0tTX0xJU1QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZVBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwibGFkZGVyX3VwX2Nsb3NlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9mZihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCB0aGlzLnBsYXlBbmltRW5kLCB0aGlzKTtcclxuICAgIH1cclxufVxyXG4iXX0=