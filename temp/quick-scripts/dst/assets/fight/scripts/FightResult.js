
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6d76ZkOrtLZoiqje82kvLT', 'FightResult');
// fight/scripts/FightResult.ts

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
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightResult = /** @class */ (function (_super) {
    __extends(FightResult, _super);
    function FightResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask_node = null;
        _this.star_lbl = null;
        _this.gold_lbl = null;
        _this.bucket_lbl = null;
        _this.prop_list = null;
        _this.death_hero_list = null;
        _this.home_btn = null;
        _this.watch_ad_btn = null;
        _this.cur_ladder_lv_spr = null;
        _this.cur_star_lbl = null;
        _this.hand_node = null;
        _this.CURTIMES = 2;
        return _this;
    }
    FightResult.prototype.onEnable = function () {
        if (GameManager_1.gm.data.record_data.record_type == 0) {
            GameManager_1.gm.channel.record_stop(false);
        }
        this.mask_node.color = FightConstants_1.FightConstants.SEA_AREA_COLOR_ARRAY[GameManager_1.gm.data.fight_temp_data.play_type];
        this.update_view();
        if (!GameManager_1.gm.data.mapCell_data.isGuide &&
            GameManager_1.gm.channel.get_channel_name() == ChannelManager_1.ChannelManager.TT_GAME &&
            GameManager_1.gm.data.record_data.record_type == 0 &&
            GameManager_1.gm.data.record_data.left_push_share_count > 0) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.RecordShare);
        }
    };
    FightResult.prototype.onDisable = function () {
        this.prop_list.reset();
        this.death_hero_list.reset();
        if (GameManager_1.gm.data.record_data.record_type == 0) {
            GameManager_1.gm.data.record_data.record_state = 0;
            GameManager_1.gm.data.record_data.record_timestamp = 0;
            GameManager_1.gm.data.event_emitter.emit(RecordData_1.RecordData.RECORD_STATE_CHANGE);
            GameManager_1.gm.data.record_data.async_write_data();
        }
    };
    FightResult.prototype.update_view = function () {
        var fightResultData = GameManager_1.gm.data.fight_temp_data.fight_result_data;
        this.gold_lbl.string = "X" + fightResultData.gold_num;
        this.bucket_lbl.string = "X" + fightResultData.bucket_num;
        this.prop_list.setData(fightResultData.prop_data_array);
        this.death_hero_list.setData(fightResultData.death_hero_data_array);
        var rank = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(GameManager_1.gm.data.ladder_temp_data.rank);
        var ladderData = GameManager_1.gm.config.get_row_data("LadderLvConfigData", rank.toString());
        Utils_1.Utils.async_set_sprite_frame(this.cur_ladder_lv_spr, Constants_1.BundleName.LADDER, "res/" + ladderData.icon_id);
        var starChange = 0;
        if (fightResultData.result == 1) {
            this.star_lbl.node.color = cc.Color.GREEN;
            starChange = fightResultData.star_num;
            this.star_lbl.string = "+ " + fightResultData.star_num;
        }
        else {
            this.star_lbl.node.color = cc.Color.RED;
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
            if (buildData && buildData.buildLvl >= 1) {
                this.star_lbl.string = "- " + ladderData.failed_star;
                starChange = -ladderData.failed_star;
            }
            else {
                this.star_lbl.string = "- 0";
                starChange = 0;
            }
        }
        this.cur_star_lbl.string = Math.max(0, GameManager_1.gm.data.ladder_temp_data.total_star + starChange).toString();
        this.watch_ad_btn.node.active = !GameManager_1.gm.data.mapCell_data.isGuide;
        this.hand_node.active = GameManager_1.gm.data.mapCell_data.isGuide;
    };
    FightResult.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.home_btn.node) {
            GameManager_1.gm.data.fight_temp_data.map_end_many_times = 1;
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightResult);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Fight);
            GameManager_1.gm.ui.show_start();
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: 17,
                guidedesc: cc.js.formatStr("17.点击结算界面的返航按钮")
            });
        }
        else if (event.target == this.watch_ad_btn.node) {
            GameManager_1.gm.channel.show_video_ad(this.watch_ad_cb, this);
        }
    };
    FightResult.prototype.watch_ad_cb = function () {
        NetUtils_1.ReportData.instance.report_once_point(10829);
        NetUtils_1.ReportData.instance.report_point(10830);
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightResult);
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Fight);
        GameManager_1.gm.data.fight_temp_data.map_end_many_times = this.CURTIMES;
        GameManager_1.gm.ui.show_start();
        GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
            guideid: 17,
            guidedesc: cc.js.formatStr("17.点击结算界面的返航按钮")
        });
    };
    __decorate([
        property(cc.Node)
    ], FightResult.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Label)
    ], FightResult.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], FightResult.prototype, "gold_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], FightResult.prototype, "bucket_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightResult.prototype, "prop_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightResult.prototype, "death_hero_list", void 0);
    __decorate([
        property(cc.Button)
    ], FightResult.prototype, "home_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightResult.prototype, "watch_ad_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightResult.prototype, "cur_ladder_lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightResult.prototype, "cur_star_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], FightResult.prototype, "hand_node", void 0);
    FightResult = __decorate([
        ccclass
    ], FightResult);
    return FightResult;
}(GameModule_1.GameModule));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0UmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJFQUEwRTtBQUMxRSxpRUFBZ0Y7QUFDaEYsMkVBQTBFO0FBQzFFLG1FQUFrRTtBQUNsRSxxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBQ2xFLCtEQUE4RDtBQUM5RCx5REFBd0Q7QUFDeEQsK0RBQWdFO0FBSTFELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLCtCQUFVO0lBQXBDO1FBQUEscUVBeUhDO1FBdkhXLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQix1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQVcsQ0FBQyxDQUFDOztJQXVGakMsQ0FBQztJQXJGYSw4QkFBUSxHQUFsQjtRQUNJLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUU7WUFDdEMsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsK0JBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENB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Q1AsQ0FBQztJQXRIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNlO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDaUI7SUFHcEM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQztrREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzt3REFDc0I7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNtQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUN3QjtJQUc1QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNtQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNnQjtJQWhDaEMsV0FBVztRQURoQixPQUFPO09BQ0YsV0FBVyxDQXlIaEI7SUFBRCxrQkFBQztDQXpIRCxBQXlIQyxDQXpIeUIsdUJBQVUsR0F5SG5DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbm5lbE1hbmFnZXIgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgQnVpbGRUeXBlRW51bSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgRmlnaHRDb25zdGFudHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0Q29uc3RhbnRzJztcclxuaW1wb3J0IHsgUmVjb3JkRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvUmVjb3JkRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXcnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlscyc7XHJcbmltcG9ydCB7IExhZGRlckJ1aWxkZGluZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9idWlsZGluZyc7XHJcbmltcG9ydCB7IExhZGRlckxWQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvbGFkZGVyX2x2JztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBGaWdodFJlc3VsdCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1hc2tfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBzdGFyX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgZ29sZF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGJ1Y2tldF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIHByb3BfbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgZGVhdGhfaGVyb19saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgaG9tZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgd2F0Y2hfYWRfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGN1cl9sYWRkZXJfbHZfc3ByOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgY3VyX3N0YXJfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGhhbmRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBDVVJUSU1FUzogbnVtYmVyID0gMjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEucmVjb3JkX2RhdGEucmVjb3JkX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnJlY29yZF9zdG9wKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXNrX25vZGUuY29sb3IgPSBGaWdodENvbnN0YW50cy5TRUFfQVJFQV9DT0xPUl9BUlJBWVtnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5wbGF5X3R5cGVdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgJiZcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5nZXRfY2hhbm5lbF9uYW1lKCkgPT0gQ2hhbm5lbE1hbmFnZXIuVFRfR0FNRSAmJlxyXG4gICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90eXBlID09IDAgJiZcclxuICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5sZWZ0X3B1c2hfc2hhcmVfY291bnQgPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuUmVjb3JkU2hhcmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvcF9saXN0LnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5kZWF0aF9oZXJvX2xpc3QucmVzZXQoKTtcclxuICAgICAgICBpZiAoZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEucmVjb3JkX2RhdGEucmVjb3JkX3N0YXRlID0gMDtcclxuICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfdGltZXN0YW1wID0gMDtcclxuICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoUmVjb3JkRGF0YS5SRUNPUkRfU1RBVEVfQ0hBTkdFKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRSZXN1bHREYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZmlnaHRfcmVzdWx0X2RhdGE7XHJcbiAgICAgICAgdGhpcy5nb2xkX2xibC5zdHJpbmcgPSBcIlhcIiArIGZpZ2h0UmVzdWx0RGF0YS5nb2xkX251bTtcclxuICAgICAgICB0aGlzLmJ1Y2tldF9sYmwuc3RyaW5nID0gXCJYXCIgKyBmaWdodFJlc3VsdERhdGEuYnVja2V0X251bTtcclxuICAgICAgICB0aGlzLnByb3BfbGlzdC5zZXREYXRhKGZpZ2h0UmVzdWx0RGF0YS5wcm9wX2RhdGFfYXJyYXkpO1xyXG4gICAgICAgIHRoaXMuZGVhdGhfaGVyb19saXN0LnNldERhdGEoZmlnaHRSZXN1bHREYXRhLmRlYXRoX2hlcm9fZGF0YV9hcnJheSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJhbmsgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEuY29udmVydF9yYW5rX3RvX2x2KGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5yYW5rKTtcclxuICAgICAgICBjb25zdCBsYWRkZXJEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkxhZGRlckx2Q29uZmlnRGF0YVwiLCByYW5rLnRvU3RyaW5nKCkpIGFzIExhZGRlckxWQ29uZmlnO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5jdXJfbGFkZGVyX2x2X3NwciwgQnVuZGxlTmFtZS5MQURERVIsIFwicmVzL1wiICsgbGFkZGVyRGF0YS5pY29uX2lkKTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJDaGFuZ2UgPSAwO1xyXG4gICAgICAgIGlmIChmaWdodFJlc3VsdERhdGEucmVzdWx0ID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFyX2xibC5ub2RlLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgICAgIHN0YXJDaGFuZ2UgPSBmaWdodFJlc3VsdERhdGEuc3Rhcl9udW07XHJcbiAgICAgICAgICAgIHRoaXMuc3Rhcl9sYmwuc3RyaW5nID0gXCIrIFwiICsgZmlnaHRSZXN1bHREYXRhLnN0YXJfbnVtO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Rhcl9sYmwubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpO1xyXG4gICAgICAgICAgICBpZiAoYnVpbGREYXRhICYmIGJ1aWxkRGF0YS5idWlsZEx2bCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJfbGJsLnN0cmluZyA9IFwiLSBcIiArIGxhZGRlckRhdGEuZmFpbGVkX3N0YXI7XHJcbiAgICAgICAgICAgICAgICBzdGFyQ2hhbmdlID0gLWxhZGRlckRhdGEuZmFpbGVkX3N0YXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJfbGJsLnN0cmluZyA9IFwiLSAwXCI7XHJcbiAgICAgICAgICAgICAgICBzdGFyQ2hhbmdlID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9zdGFyX2xibC5zdHJpbmcgPSBNYXRoLm1heCgwLCBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEudG90YWxfc3RhciArIHN0YXJDaGFuZ2UpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy53YXRjaF9hZF9idG4ubm9kZS5hY3RpdmUgPSAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZTtcclxuICAgICAgICB0aGlzLmhhbmRfbm9kZS5hY3RpdmUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5ob21lX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1hcF9lbmRfbWFueV90aW1lcyA9IDE7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkZpZ2h0UmVzdWx0KTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuRmlnaHQpO1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3N0YXJ0KCk7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgZ3VpZGVpZDogMTcsXHJcbiAgICAgICAgICAgICAgICBndWlkZWRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIjE3LueCueWHu+e7k+eul+eVjOmdoueahOi/lOiIquaMiemSrlwiKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLndhdGNoX2FkX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLndhdGNoX2FkX2NiLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3YXRjaF9hZF9jYigpOiB2b2lkIHtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODI5KTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDgzMCk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuRmlnaHRSZXN1bHQpO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkZpZ2h0KTtcclxuICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5tYXBfZW5kX21hbnlfdGltZXMgPSB0aGlzLkNVUlRJTUVTO1xyXG4gICAgICAgIGdtLnVpLnNob3dfc3RhcnQoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgZ3VpZGVpZDogMTcsXHJcbiAgICAgICAgICAgIGd1aWRlZGVzYzogY2MuanMuZm9ybWF0U3RyKFwiMTcu54K55Ye757uT566X55WM6Z2i55qE6L+U6Iiq5oyJ6ZKuXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=