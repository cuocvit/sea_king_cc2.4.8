
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/MailLogRewardItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5306fKSg5FiJyxvgsm7HKs', 'MailLogRewardItem');
// mail/scripts/MailLogRewardItem.ts

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
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailLogRewardItem = /** @class */ (function (_super) {
    __extends(MailLogRewardItem, _super);
    function MailLogRewardItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(MailLogRewardItem.prototype, "data", {
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
    MailLogRewardItem.prototype.update_view = function () {
        Utils_1.Utils.async_set_sprite_frame(this.item_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
        this.num_lbl.string = "x" + this._data.num;
    };
    MailLogRewardItem.prototype.reset = function () {
        this.item_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], MailLogRewardItem.prototype, "item_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogRewardItem.prototype, "num_lbl", void 0);
    MailLogRewardItem = __decorate([
        ccclass
    ], MailLogRewardItem);
    return MailLogRewardItem;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbExvZ1Jld2FyZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCxpRUFBaUU7QUFFM0QsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0MscUNBQVk7SUFBNUM7UUFBQSxxRUF5QkM7UUF2QlMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsYUFBTyxHQUFvQixJQUFJLENBQUM7O0lBb0IxQyxDQUFDO0lBbEJDLHNCQUFXLG1DQUFJO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzthQUVELFVBQWdCLEtBQWtDO1lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FMQTtJQU9NLHVDQUFXLEdBQWxCO1FBQ0UsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzdDLENBQUM7SUFFTSxpQ0FBSyxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ3FCO0lBTHBDLGlCQUFpQjtRQUR0QixPQUFPO09BQ0YsaUJBQWlCLENBeUJ0QjtJQUFELHdCQUFDO0NBekJELEFBeUJDLENBekIrQiwyQkFBWSxHQXlCM0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0Vmlld0l0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3SXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTWFpbExvZ1Jld2FyZEl0ZW0gZXh0ZW5kcyBMaXN0Vmlld0l0ZW0ge1xyXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgcHJpdmF0ZSBpdGVtX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICBwcml2YXRlIG51bV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiB7IGlkOiBzdHJpbmc7IG51bTogbnVtYmVyIH0ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IHsgaWQ6IHN0cmluZzsgbnVtOiBudW1iZXIgfSkge1xyXG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLml0ZW1fc3ByLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyB0aGlzLl9kYXRhLmlkKTtcclxuICAgIHRoaXMubnVtX2xibC5zdHJpbmcgPSBcInhcIiArIHRoaXMuX2RhdGEubnVtO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pdGVtX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICB0aGlzLm51bV9sYmwuc3RyaW5nID0gXCJcIjtcclxuICB9XHJcbn1cclxuIl19