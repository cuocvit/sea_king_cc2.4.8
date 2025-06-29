
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderUpLvlAnimPVP.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a20ccxphYZIFaKZJKZifAxA', 'LadderUpLvlAnimPVP');
// ladder/scripts/LadderUpLvlAnimPVP.ts

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
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderUpLvlAnimPVP = /** @class */ (function (_super) {
    __extends(LadderUpLvlAnimPVP, _super);
    function LadderUpLvlAnimPVP() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.succ_title = null;
        _this.fail_title = null;
        _this.lvl_spr = null;
        _this.lvl_name = null;
        _this.star_lbl = null;
        return _this;
    }
    LadderUpLvlAnimPVP.prototype.onEnable = function () {
        this.refreshPanel();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    LadderUpLvlAnimPVP.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    LadderUpLvlAnimPVP.prototype.refreshPanel = function () {
        var isSuccess = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.LADDERUPLVLANIMPVP.key);
        this.succ_title.active = isSuccess;
        this.fail_title.active = !isSuccess;
        var ladderData = GameManager_1.gm.data.ladder_temp_data;
        var rankLevel = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(ladderData.rank);
        var ladderConfig = GameManager_1.gm.config.get_row_data("LadderLvConfigData", rankLevel + "");
        Utils_1.Utils.async_set_sprite_frame(this.lvl_spr, Constants_1.BundleName.LADDER, "res/" + ladderConfig.icon_id);
        this.star_lbl.string = ladderData.total_star + "";
        this.lvl_name.string = ladderConfig.name + "";
    };
    LadderUpLvlAnimPVP.prototype.onClosePanel = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.LADDERUPLVLANIMPVP);
    };
    __decorate([
        property(cc.Node)
    ], LadderUpLvlAnimPVP.prototype, "succ_title", void 0);
    __decorate([
        property(cc.Node)
    ], LadderUpLvlAnimPVP.prototype, "fail_title", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderUpLvlAnimPVP.prototype, "lvl_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderUpLvlAnimPVP.prototype, "lvl_name", void 0);
    __decorate([
        property(cc.Label)
    ], LadderUpLvlAnimPVP.prototype, "star_lbl", void 0);
    LadderUpLvlAnimPVP = __decorate([
        ccclass
    ], LadderUpLvlAnimPVP);
    return LadderUpLvlAnimPVP;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJVcEx2bEFuaW1QVlAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELHlEQUF3RDtBQUN4RCxpRUFBaUU7QUFDakUsMkVBQTBFO0FBR3BFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWlDLHNDQUFZO0lBQTdDO1FBQUEscUVBMENDO1FBeENXLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFHbEMsYUFBTyxHQUFxQixJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFvQixJQUFJLENBQUM7O0lBNEI3QyxDQUFDO0lBMUJhLHFDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLGdCQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFUyxzQ0FBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyx5Q0FBWSxHQUFwQjtRQUNJLElBQU0sU0FBUyxHQUFHLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQVksQ0FBQztRQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFFcEMsSUFBTSxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDNUMsSUFBTSxTQUFTLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9FLElBQU0sWUFBWSxHQUFHLGdCQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFtQixDQUFDO1FBRXBHLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVPLHlDQUFZLEdBQXBCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBdkNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ3dCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MERBQ3dCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ3FCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ3NCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ3NCO0lBZHZDLGtCQUFrQjtRQUR2QixPQUFPO09BQ0Ysa0JBQWtCLENBMEN2QjtJQUFELHlCQUFDO0NBMUNELEFBMENDLENBMUNnQyxFQUFFLENBQUMsU0FBUyxHQTBDNUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBCQU5ORVJfQURfVFlQRSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ2hhbm5lbE1hbmFnZXInO1xyXG5pbXBvcnQgeyBMYWRkZXJMVkNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9sdic7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTGFkZGVyVXBMdmxBbmltUFZQIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzdWNjX3RpdGxlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGZhaWxfdGl0bGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdmxfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGx2bF9uYW1lOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc3Rhcl9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlzU3VjY2VzcyA9IGdtLnVpLmdldF9tb2R1bGVfYXJncyhnbS5jb25zdC5MQURERVJVUExWTEFOSU1QVlAua2V5KSBhcyBib29sZWFuO1xyXG4gICAgICAgIHRoaXMuc3VjY190aXRsZS5hY3RpdmUgPSBpc1N1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy5mYWlsX3RpdGxlLmFjdGl2ZSA9ICFpc1N1Y2Nlc3M7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhZGRlckRhdGEgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGE7XHJcbiAgICAgICAgY29uc3QgcmFua0xldmVsID0gZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLmNvbnZlcnRfcmFua190b19sdihsYWRkZXJEYXRhLnJhbmspO1xyXG4gICAgICAgIGNvbnN0IGxhZGRlckNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJMYWRkZXJMdkNvbmZpZ0RhdGFcIiwgcmFua0xldmVsICsgXCJcIikgYXMgTGFkZGVyTFZDb25maWc7XHJcblxyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5sdmxfc3ByLCBCdW5kbGVOYW1lLkxBRERFUiwgXCJyZXMvXCIgKyBsYWRkZXJDb25maWcuaWNvbl9pZCk7XHJcbiAgICAgICAgdGhpcy5zdGFyX2xibC5zdHJpbmcgPSBsYWRkZXJEYXRhLnRvdGFsX3N0YXIgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMubHZsX25hbWUuc3RyaW5nID0gbGFkZGVyQ29uZmlnLm5hbWUgKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZVBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkxBRERFUlVQTFZMQU5JTVBWUCk7XHJcbiAgICB9XHJcbn0iXX0=