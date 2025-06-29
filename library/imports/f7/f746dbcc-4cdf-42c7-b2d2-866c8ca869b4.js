"use strict";
cc._RF.push(module, 'f746dvMTN9Cx7LShmyMqGm0', 'LadderEntry');
// start-scene/scripts/LadderEntry.ts

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
exports.LadderEntry = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var ServerData_1 = require("./ServerData");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderEntry = /** @class */ (function (_super) {
    __extends(LadderEntry, _super);
    function LadderEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lv_spr = null;
        _this.star_lbl = null;
        _this.rank_lbl = null;
        _this.entry_btn = null;
        return _this;
    }
    LadderEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on("ladder_star_change", this.update_view, this);
        GameManager_1.gm.data.event_emitter.on("ladder_achievement_upgrade", this.play_ladder_achievement_upgrade, this);
        GameManager_1.gm.data.event_emitter.on("ladder_upgrade", this.on_ladder_upgrade, this);
        GameManager_1.gm.data.event_emitter.on("ladder_demotion", this.on_ladder_demotion, this);
        GameManager_1.gm.data.event_emitter.on(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    LadderEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off("ladder_star_change", this.update_view, this);
        GameManager_1.gm.data.event_emitter.off("ladder_achievement_upgrade", this.play_ladder_achievement_upgrade, this);
        GameManager_1.gm.data.event_emitter.off("ladder_upgrade", this.on_ladder_upgrade, this);
        GameManager_1.gm.data.event_emitter.off("ladder_demotion", this.on_ladder_demotion, this);
        GameManager_1.gm.data.event_emitter.off(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    LadderEntry.prototype.on_ladder_upgrade = function () {
        cc.log("on_ladder_upgrade");
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.LADDERUPLVLANIMPVP.key, true);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.LADDERUPLVLANIMPVP);
    };
    LadderEntry.prototype.on_ladder_demotion = function () {
        cc.log("on_ladder_demotion");
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.LADDERUPLVLANIMPVP.key, false);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.LADDERUPLVLANIMPVP);
    };
    LadderEntry.prototype.play_ladder_achievement_upgrade = function () {
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.LADDERUPLVLANIM);
    };
    LadderEntry.prototype.update_view = function () {
        var ladderTempData = GameManager_1.gm.data.ladder_temp_data;
        var rankLevel = ladderTempData.convert_rank_to_lv(ladderTempData.rank);
        var rowData = GameManager_1.gm.config.get_row_data("LadderRewardConfigData", rankLevel.toString());
        if (rowData) {
            Utils_1.Utils.async_set_sprite_frame(this.lv_spr, Constants_1.BundleName.LADDER, "res/" + rowData.iconId);
        }
        this.star_lbl.string = ladderTempData.total_star.toString();
        this.rank_lbl.string = ladderTempData.rank > 0 ? "Xếp hạng:" + ladderTempData.rank : "Xếp hạng:200+";
    };
    LadderEntry.prototype.reset = function () {
        this.lv_spr.spriteFrame = null;
        this.star_lbl.string = "";
        this.rank_lbl.string = "";
    };
    LadderEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.entry_btn.node) {
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
            if (!buildData || buildData.buildLvl < 1) {
                GameManager_1.gm.ui.show_notice("Điều kiện mở Liên Minh Hải Vương: Quân đồn trú đạt cấp 1");
            }
            else {
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Ladder);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], LadderEntry.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderEntry.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderEntry.prototype, "rank_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], LadderEntry.prototype, "entry_btn", void 0);
    LadderEntry = __decorate([
        ccclass
    ], LadderEntry);
    return LadderEntry;
}(NodePoolItem_1.NodePoolItem));
exports.LadderEntry = LadderEntry;

cc._RF.pop();