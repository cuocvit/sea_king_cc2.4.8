
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderRewardItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '158655gzv1LUYYM+PBw+Mqs', 'LadderRewardItem');
// ladder/scripts/LadderRewardItem.ts

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
exports.LadderRewardItem = void 0;
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderRewardItem = /** @class */ (function (_super) {
    __extends(LadderRewardItem, _super);
    function LadderRewardItem() {
        var _this = _super.call(this) || this;
        _this.color_spr = null;
        _this.reward_spr = null;
        _this.num_lbl = null;
        _this.mask_node = null;
        _this.right_node = null;
        return _this;
    }
    Object.defineProperty(LadderRewardItem.prototype, "data", {
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
    Object.defineProperty(LadderRewardItem.prototype, "select", {
        set: function (value) {
            this._select = value;
            if (this.mask_node && this.right_node) {
                this.mask_node.active = this.right_node.active = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    LadderRewardItem.prototype.update_view = function () {
        var rowData = GameManager_1.gm.config.get_row_data("ItemConfigData", this._data.reward_id.toString());
        if (rowData) {
            Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + rowData.color);
            Utils_1.Utils.async_set_sprite_frame(this.reward_spr, Constants_1.BundleName.LADDER, "res/" + rowData.icon);
        }
        this.num_lbl.string = this._data.reward_num + "";
    };
    LadderRewardItem.prototype.reset = function () {
        if (this.reward_spr) {
            this.reward_spr.spriteFrame = null;
        }
        if (this.num_lbl) {
            this.num_lbl.string = "";
        }
    };
    __decorate([
        property(cc.Sprite)
    ], LadderRewardItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderRewardItem.prototype, "reward_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRewardItem.prototype, "num_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], LadderRewardItem.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], LadderRewardItem.prototype, "right_node", void 0);
    LadderRewardItem = __decorate([
        ccclass
    ], LadderRewardItem);
    return LadderRewardItem;
}(ListViewItem_1.ListViewItem));
exports.LadderRewardItem = LadderRewardItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJSZXdhcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELGlFQUFpRTtBQUNqRSxxRUFBMkQ7QUFJckQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0Msb0NBQVk7SUFnQjlDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBaEJPLGVBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLGdCQUFVLEdBQXFCLElBQUksQ0FBQztRQUdwQyxhQUFPLEdBQW9CLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQW1CLElBQUksQ0FBQztRQUdqQyxnQkFBVSxHQUFtQixJQUFJLENBQUM7O0lBSTFDLENBQUM7SUFFRCxzQkFBVyxrQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUE4QjtZQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPRCxzQkFBVyxvQ0FBTTthQUFqQixVQUFrQixLQUFjO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDMUQ7UUFDTCxDQUFDOzs7T0FBQTtJQUVNLHNDQUFXLEdBQWxCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFlLENBQUM7UUFDeEcsSUFBSSxPQUFPLEVBQUU7WUFDVCxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlGLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0Y7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVNLGdDQUFLLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQWxERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUN1QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUN3QjtJQUc1QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNxQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUN1QjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUN3QjtJQWRqQyxnQkFBZ0I7UUFENUIsT0FBTztPQUNLLGdCQUFnQixDQXFENUI7SUFBRCx1QkFBQztDQXJERCxBQXFEQyxDQXJEcUMsMkJBQVksR0FxRGpEO0FBckRZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgSXRlbUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2l0ZW0nO1xyXG5pbXBvcnQgeyBMYWRkZXJSZXdhcmREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MYWRkZXJUZW1wRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIExhZGRlclJld2FyZEl0ZW0gZXh0ZW5kcyBMaXN0Vmlld0l0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgY29sb3Jfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIG51bV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1hc2tfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByaWdodF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogTGFkZGVyUmV3YXJkRGF0YSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogTGFkZGVyUmV3YXJkRGF0YSB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMubWFza19ub2RlICYmIHRoaXMucmlnaHRfbm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tfbm9kZS5hY3RpdmUgPSB0aGlzLnJpZ2h0X25vZGUuYWN0aXZlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIHRoaXMuX2RhdGEucmV3YXJkX2lkLnRvU3RyaW5nKCkpIGFzIEl0ZW1Db25maWc7XHJcbiAgICAgICAgaWYgKHJvd0RhdGEpIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmNvbG9yX3NwciwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2NvbG9yX1wiICsgcm93RGF0YS5jb2xvcik7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5yZXdhcmRfc3ByLCBCdW5kbGVOYW1lLkxBRERFUiwgXCJyZXMvXCIgKyByb3dEYXRhLmljb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm51bV9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5yZXdhcmRfbnVtICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmV3YXJkX3Nwcikge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZF9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5udW1fbGJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==