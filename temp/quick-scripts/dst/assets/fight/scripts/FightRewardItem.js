
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightRewardItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '39cd5rGCiVH65G7Ehrq9MDk', 'FightRewardItem');
// fight/scripts/FightRewardItem.ts

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
exports.FightRewardItem = void 0;
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightRewardItem = /** @class */ (function (_super) {
    __extends(FightRewardItem, _super);
    function FightRewardItem() {
        var _this = _super.call(this) || this;
        _this.item_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(FightRewardItem.prototype, "data", {
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
    FightRewardItem.prototype.update_view = function () {
        Utils_1.Utils.async_set_sprite_frame(this.item_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
        this.num_lbl.string = this._data.num + "/" + this._data.max_num;
    };
    FightRewardItem.prototype.reset = function () {
        this.item_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightRewardItem.prototype, "item_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightRewardItem.prototype, "num_lbl", void 0);
    FightRewardItem = __decorate([
        ccclass
    ], FightRewardItem);
    return FightRewardItem;
}(ListViewItem_1.ListViewItem));
exports.FightRewardItem = FightRewardItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0UmV3YXJkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCxpRUFBaUU7QUFHM0QsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUMsbUNBQVk7SUFDL0M7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFHTyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxhQUFPLEdBQW9CLElBQUksQ0FBQzs7SUFOeEMsQ0FBQztJQVFELHNCQUFXLGlDQUFJO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzthQUVELFVBQWdCLEtBQTBCO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FMQTtJQU9NLHFDQUFXLEdBQWxCO1FBQ0UsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2xFLENBQUM7SUFFTSwrQkFBSyxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ3FCO0lBVDdCLGVBQWU7UUFEM0IsT0FBTztPQUNLLGVBQWUsQ0E2QjNCO0lBQUQsc0JBQUM7Q0E3QkQsQUE2QkMsQ0E3Qm9DLDJCQUFZLEdBNkJoRDtBQTdCWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgRmlnaHRSZXdhcmRJdGVtRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvRmlnaHRUZW1wRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEZpZ2h0UmV3YXJkSXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICBwcml2YXRlIGl0ZW1fc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gIHByaXZhdGUgbnVtX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHVibGljIGdldCBkYXRhKCk6IEZpZ2h0UmV3YXJkSXRlbURhdGEge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEZpZ2h0UmV3YXJkSXRlbURhdGEpIHtcclxuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5pdGVtX3NwciwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgdGhpcy5fZGF0YS5pZCk7XHJcbiAgICB0aGlzLm51bV9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5udW0gKyBcIi9cIiArIHRoaXMuX2RhdGEubWF4X251bTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXRlbV9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgdGhpcy5udW1fbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgfVxyXG59Il19