
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/MailDetailsRewardItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a3027kz0xKoaE2yHG8mVdq', 'MailDetailsRewardItem');
// mail/scripts/MailDetailsRewardItem.ts

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
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailDetailsRewardItem = /** @class */ (function (_super) {
    __extends(MailDetailsRewardItem, _super);
    function MailDetailsRewardItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.reward_spr = null;
        _this.num_lbl = null;
        _this.mask_node = null;
        _this.right_node = null;
        return _this;
    }
    Object.defineProperty(MailDetailsRewardItem.prototype, "data", {
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
    Object.defineProperty(MailDetailsRewardItem.prototype, "select", {
        set: function (value) {
            this._select = value;
            if (this.mask_node && this.right_node) {
                this.mask_node.active = this.right_node.active = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    MailDetailsRewardItem.prototype.update_view = function () {
        var rowData = GameManager_1.gm.config.get_row_data("ItemConfigData", this._data.reward_id.toString());
        if (rowData) {
            Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + rowData.color);
            Utils_1.Utils.async_set_sprite_frame(this.reward_spr, Constants_1.BundleName.LADDER, "res/" + rowData.icon);
        }
        this.num_lbl.string = this._data.reward_num + "";
    };
    MailDetailsRewardItem.prototype.reset = function () {
        this.reward_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], MailDetailsRewardItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], MailDetailsRewardItem.prototype, "reward_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailDetailsRewardItem.prototype, "num_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailDetailsRewardItem.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], MailDetailsRewardItem.prototype, "right_node", void 0);
    MailDetailsRewardItem = __decorate([
        ccclass
    ], MailDetailsRewardItem);
    return MailDetailsRewardItem;
}(ListViewItem_1.ListViewItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbERldGFpbHNSZXdhcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQscUVBQTJEO0FBQzNELGlFQUFpRTtBQUczRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQyx5Q0FBWTtJQUFoRDtRQUFBLHFFQThDQztRQTVDVyxlQUFTLEdBQXFCLElBQUksQ0FBQztRQUduQyxnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFHaEMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFHakMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDOztJQWdDOUMsQ0FBQztJQTlCRyxzQkFBVyx1Q0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUF1RDtZQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyx5Q0FBTTthQUFqQixVQUFrQixLQUFjO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDMUQ7UUFDTCxDQUFDOzs7T0FBQTtJQUVNLDJDQUFXLEdBQWxCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFlLENBQUM7UUFDeEcsSUFBSSxPQUFPLEVBQUU7WUFDVCxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlGLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVNLHFDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUEzQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDdUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2REFDd0I7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDdUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDd0I7SUFkeEMscUJBQXFCO1FBRDFCLE9BQU87T0FDRixxQkFBcUIsQ0E4QzFCO0lBQUQsNEJBQUM7Q0E5Q0QsQUE4Q0MsQ0E5Q21DLDJCQUFZLEdBOEMvQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgSXRlbUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2l0ZW0nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIE1haWxEZXRhaWxzUmV3YXJkSXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBjb2xvcl9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHJld2FyZF9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbnVtX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFza19ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJpZ2h0X25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogeyByZXdhcmRfaWQ6IG51bWJlcjsgcmV3YXJkX251bTogbnVtYmVyIH0gfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IHsgcmV3YXJkX2lkOiBudW1iZXI7IHJld2FyZF9udW06IG51bWJlciB9IHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzZWxlY3QodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3QgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5tYXNrX25vZGUgJiYgdGhpcy5yaWdodF9ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFza19ub2RlLmFjdGl2ZSA9IHRoaXMucmlnaHRfbm9kZS5hY3RpdmUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSXRlbUNvbmZpZ0RhdGFcIiwgdGhpcy5fZGF0YS5yZXdhcmRfaWQudG9TdHJpbmcoKSkgYXMgSXRlbUNvbmZpZztcclxuICAgICAgICBpZiAocm93RGF0YSkge1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuY29sb3Jfc3ByLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvY29sb3JfXCIgKyByb3dEYXRhLmNvbG9yKTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnJld2FyZF9zcHIsIEJ1bmRsZU5hbWUuTEFEREVSLCBcInJlcy9cIiArIHJvd0RhdGEuaWNvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm51bV9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5yZXdhcmRfbnVtICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfc3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLm51bV9sYmwuc3RyaW5nID0gXCJcIjtcclxuICAgIH1cclxufSJdfQ==