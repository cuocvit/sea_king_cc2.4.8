
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/buy/scripts/buyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9c9631mB1FKQ7GcXbaj7TnT', 'buyItem');
// buy/scripts/buyItem.ts

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
exports.BuyItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuyItem = /** @class */ (function (_super) {
    __extends(BuyItem, _super);
    function BuyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.hero_spr = null;
        _this.money_lbl = null;
        _this.receive_btn = null;
        return _this;
    }
    Object.defineProperty(BuyItem.prototype, "data", {
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
    BuyItem.prototype.update_view = function () {
        var data = this._data;
        this.money_lbl.string =
            data.reward_data.money > 0
                ? data.reward_data.money.toString()
                : "Miễn Phí";
        this.receive_btn.node.active = data.state > 0;
        this.receive_btn.interactable = data.state === 1;
        Utils_1.Utils.set_sprite_state(this.receive_btn.node, data.state === 2 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        Utils_1.Utils.async_set_sprite_frame(this.hero_spr, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + data.reward_data.reward_id);
    };
    BuyItem.prototype.reset = function () {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
    };
    BuyItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.receive_btn.node) {
            var data = this._data;
            if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum <
                data.reward_data.money) {
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
                numList: [data.reward_data.reward_num],
            });
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            GameManager_1.gm.data.mapCell_data.addWareHouseList(rewardIds);
            GameManager_1.gm.data.mapCell_data.async_write_data();
            GameManager_1.gm.data.sign_data.async_write_data();
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BuyItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], BuyItem.prototype, "hero_spr", void 0);
    __decorate([
        property(cc.Label)
    ], BuyItem.prototype, "money_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], BuyItem.prototype, "receive_btn", void 0);
    BuyItem = __decorate([
        ccclass
    ], BuyItem);
    return BuyItem;
}(NodePoolItem_1.NodePoolItem));
exports.BuyItem = BuyItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYnV5XFxzY3JpcHRzXFxidXlJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELCtEQUFnRTtBQUNoRSxxRUFBMkQ7QUFDM0QsaUVBRzZDO0FBR3ZDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZCLDJCQUFZO0lBQXpDO1FBQUEscUVBaUZDO1FBL0VXLGVBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLGNBQVEsR0FBcUIsSUFBSSxDQUFDO1FBR2xDLGVBQVMsR0FBb0IsSUFBSSxDQUFDO1FBR2xDLGlCQUFXLEdBQXFCLElBQUksQ0FBQzs7SUFzRWpELENBQUM7SUFsRUcsc0JBQVcseUJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBc0I7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUxBO0lBT08sNkJBQVcsR0FBbkI7UUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FB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QVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUN1QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUN1QjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUN5QjtJQVhwQyxPQUFPO1FBRG5CLE9BQU87T0FDSyxPQUFPLENBaUZuQjtJQUFELGNBQUM7Q0FqRkQsQUFpRkMsQ0FqRjRCLDJCQUFZLEdBaUZ4QztBQWpGWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05vZGVQb29sSXRlbVwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tIFwiLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlsc1wiO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBCdW5kbGVOYW1lLFxyXG4gICAgU2V0SXRlbU51bUVudW0sXHJcbn0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFNpZ25CdXlJdGVtRGF0YSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1NpZ25EYXRhXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEJ1eUl0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgY29sb3Jfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBtb25leV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVjZWl2ZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IFNpZ25CdXlJdGVtRGF0YTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogU2lnbkJ1eUl0ZW1EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IFNpZ25CdXlJdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB0aGlzLm1vbmV5X2xibC5zdHJpbmcgPVxyXG4gICAgICAgICAgICBkYXRhLnJld2FyZF9kYXRhLm1vbmV5ID4gMFxyXG4gICAgICAgICAgICAgICAgPyBkYXRhLnJld2FyZF9kYXRhLm1vbmV5LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIDogXCJNaeG7hW4gUGjDrVwiO1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZV9idG4ubm9kZS5hY3RpdmUgPSBkYXRhLnN0YXRlID4gMDtcclxuICAgICAgICB0aGlzLnJlY2VpdmVfYnRuLmludGVyYWN0YWJsZSA9IGRhdGEuc3RhdGUgPT09IDE7XHJcbiAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZShcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlX2J0bi5ub2RlLFxyXG4gICAgICAgICAgICBkYXRhLnN0YXRlID09PSAyID8gY2MuU3ByaXRlLlN0YXRlLkdSQVkgOiBjYy5TcHJpdGUuU3RhdGUuTk9STUFMXHJcbiAgICAgICAgKTtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKFxyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc3ByLFxyXG4gICAgICAgICAgICBCdW5kbGVOYW1lLkNPTU1PTixcclxuICAgICAgICAgICAgXCJyZXMvaGVyb0NpcmNsZUltZy9cIiArIGRhdGEucmV3YXJkX2RhdGEucmV3YXJkX2lkXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb2xvcl9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVyb19zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5yZWNlaXZlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuZGlhbW9uZE51bSA8XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJld2FyZF9kYXRhLm1vbmV5XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HRVRDT0lOT1ApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJld2FyZF9kYXRhLm1vbmV5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgzNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFxyXG4gICAgICAgICAgICAgICAgU2V0SXRlbU51bUVudW0uUkVEVUNFX0lURU1fVFlQRSxcclxuICAgICAgICAgICAgICAgIGRhdGEucmV3YXJkX2RhdGEubW9uZXlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkSWRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucmV3YXJkX2RhdGEucmV3YXJkX251bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJZHMucHVzaChkYXRhLnJld2FyZF9kYXRhLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwge1xyXG4gICAgICAgICAgICAgICAgaWRMaXN0OiBbZGF0YS5yZXdhcmRfZGF0YS5yZXdhcmRfaWRdLFxyXG4gICAgICAgICAgICAgICAgbnVtTGlzdDogW2RhdGEucmV3YXJkX2RhdGEucmV3YXJkX251bV0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRSRVdBUkRPUCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QocmV3YXJkSWRzKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==