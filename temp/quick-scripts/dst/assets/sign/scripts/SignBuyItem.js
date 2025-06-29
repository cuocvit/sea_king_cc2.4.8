
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/sign/scripts/SignBuyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a280gecNpM04sTyw7ROPys', 'SignBuyItem');
// sign/scripts/SignBuyItem.ts

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
exports.SignBuyItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignBuyItem = /** @class */ (function (_super) {
    __extends(SignBuyItem, _super);
    function SignBuyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.hero_spr = null;
        _this.money_lbl = null;
        _this.receive_btn = null;
        return _this;
    }
    Object.defineProperty(SignBuyItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    SignBuyItem.prototype.update_view = function () {
        var data = this._data;
        this.money_lbl.string = data.reward_data.money > 0 ? data.reward_data.money.toString() : "Miễn Phí";
        this.receive_btn.node.active = data.state > 0;
        this.receive_btn.interactable = data.state === 1;
        Utils_1.Utils.set_sprite_state(this.receive_btn.node, data.state === 2 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        Utils_1.Utils.async_set_sprite_frame(this.hero_spr, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + data.reward_data.reward_id);
    };
    SignBuyItem.prototype.reset = function () {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
    };
    SignBuyItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.receive_btn.node) {
            var data = this._data;
            if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < data.reward_data.money) {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                return;
            }
            if (data.reward_data.money > 0) {
                NetUtils_1.ReportData.instance.report_once_point(10835);
            }
            data.state = 2;
            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, data.reward_data.money);
            var rewardIds = [];
            for (var i = 0; i < data.reward_data.reward_num; i++) {
                rewardIds.push(data.reward_data.reward_id);
            }
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                idList: [data.reward_data.reward_id],
                numList: [data.reward_data.reward_num]
            });
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            GameManager_1.gm.data.mapCell_data.addWareHouseList(rewardIds);
            GameManager_1.gm.data.mapCell_data.async_write_data();
            GameManager_1.gm.data.sign_data.async_write_data();
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SignBuyItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], SignBuyItem.prototype, "hero_spr", void 0);
    __decorate([
        property(cc.Label)
    ], SignBuyItem.prototype, "money_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], SignBuyItem.prototype, "receive_btn", void 0);
    SignBuyItem = __decorate([
        ccclass
    ], SignBuyItem);
    return SignBuyItem;
}(NodePoolItem_1.NodePoolItem));
exports.SignBuyItem = SignBuyItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2lnblxcc2NyaXB0c1xcU2lnbkJ1eUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQsK0RBQWdFO0FBQ2hFLHFFQUEyRDtBQUMzRCxpRUFBaUY7QUFHM0UsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBaUMsK0JBQVk7SUFBN0M7UUFBQSxxRUFpRUM7UUEvRFcsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFvQixJQUFJLENBQUM7UUFHbEMsaUJBQVcsR0FBcUIsSUFBSSxDQUFDOztJQXNEakQsQ0FBQztJQWxERyxzQkFBVyw2QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFzQjtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTyxpQ0FBVyxHQUFuQjtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FB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RUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDdUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDc0I7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDdUI7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDeUI7SUFYcEMsV0FBVztRQUR2QixPQUFPO09BQ0ssV0FBVyxDQWlFdkI7SUFBRCxrQkFBQztDQWpFRCxBQWlFQyxDQWpFZ0MsMkJBQVksR0FpRTVDO0FBakVZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlscyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUsIFNldEl0ZW1OdW1FbnVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBTaWduQnV5SXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1NpZ25EYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU2lnbkJ1eUl0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgY29sb3Jfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBtb25leV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVjZWl2ZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IFNpZ25CdXlJdGVtRGF0YTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogU2lnbkJ1eUl0ZW1EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IFNpZ25CdXlJdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB0aGlzLm1vbmV5X2xibC5zdHJpbmcgPSBkYXRhLnJld2FyZF9kYXRhLm1vbmV5ID4gMCA/IGRhdGEucmV3YXJkX2RhdGEubW9uZXkudG9TdHJpbmcoKSA6IFwiTWnhu4VuIFBow61cIjtcclxuICAgICAgICB0aGlzLnJlY2VpdmVfYnRuLm5vZGUuYWN0aXZlID0gZGF0YS5zdGF0ZSA+IDA7XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlX2J0bi5pbnRlcmFjdGFibGUgPSBkYXRhLnN0YXRlID09PSAxO1xyXG4gICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5yZWNlaXZlX2J0bi5ub2RlLCBkYXRhLnN0YXRlID09PSAyID8gY2MuU3ByaXRlLlN0YXRlLkdSQVkgOiBjYy5TcHJpdGUuU3RhdGUuTk9STUFMKTtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb19zcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oZXJvQ2lyY2xlSW1nL1wiICsgZGF0YS5yZXdhcmRfZGF0YS5yZXdhcmRfaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbG9yX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZXJvX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLnJlY2VpdmVfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuZGlhbW9uZE51bSA8IGRhdGEucmV3YXJkX2RhdGEubW9uZXkpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRDT0lOT1Aua2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXdhcmRfZGF0YS5tb25leSA+IDApIHtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA4MzUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5SRURVQ0VfSVRFTV9UWVBFLCBkYXRhLnJld2FyZF9kYXRhLm1vbmV5KTtcclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkSWRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucmV3YXJkX2RhdGEucmV3YXJkX251bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJZHMucHVzaChkYXRhLnJld2FyZF9kYXRhLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwge1xyXG4gICAgICAgICAgICAgICAgaWRMaXN0OiBbZGF0YS5yZXdhcmRfZGF0YS5yZXdhcmRfaWRdLFxyXG4gICAgICAgICAgICAgICAgbnVtTGlzdDogW2RhdGEucmV3YXJkX2RhdGEucmV3YXJkX251bV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkV2FyZUhvdXNlTGlzdChyZXdhcmRJZHMpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuc2lnbl9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=