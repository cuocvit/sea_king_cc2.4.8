"use strict";
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