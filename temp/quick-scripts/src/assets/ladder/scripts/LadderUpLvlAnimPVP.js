"use strict";
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