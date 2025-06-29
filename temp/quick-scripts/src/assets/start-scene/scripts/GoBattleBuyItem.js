"use strict";
cc._RF.push(module, '758e1G4rwtAuI9w0h+e040u', 'GoBattleBuyItem');
// start-scene/scripts/GoBattleBuyItem.ts

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
exports.GoBattleBuyItem = void 0;
// +-+
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var TempData_1 = require("./TempData");
var GameManager_1 = require("./GameManager");
var MapCellCfgData_1 = require("./MapCellCfgData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoBattleBuyItem = /** @class */ (function (_super) {
    __extends(GoBattleBuyItem, _super);
    function GoBattleBuyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.heroColorSpr = null;
        _this.heroSpr = null;
        _this.heroLvlSpr = null;
        _this.price_lbl = null;
        _this.cost_sprite = null;
        _this.heroID = 0;
        _this.heroDiam = 0;
        return _this;
    }
    GoBattleBuyItem.prototype.initdata = function (heroID, heroDiam) {
        this.heroID = heroID;
        this.heroDiam = heroDiam;
        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this.heroID);
        if (heroConfig) {
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this.heroID);
            Utils_1.Utils.async_set_sprite_frame(this.heroLvlSpr, Constants_1.BundleName.BOOK, "res/icon_lv" + heroConfig.lv);
            this.price_lbl.string = this.heroDiam.toString();
            this.cost_sprite.node.color = cc.Color.WHITE;
            this.price_lbl.node.getComponent(cc.LabelOutline).enabled = true;
            this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#FFDA58");
            this.price_lbl.node.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#7D2713");
            this.cost_sprite.node.height = 50;
            this.cost_sprite.node.width = 50;
            if (this.heroDiam == 0) {
                this.price_lbl.string = "Miễn phí";
                this.cost_sprite.node.color = cc.Color.BLACK.fromHEX("#253D45");
                this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#1C3F00");
                this.price_lbl.node.getComponent(cc.LabelOutline).enabled = false;
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/video_1");
                this.cost_sprite.node.width = 55;
                this.cost_sprite.node.height = 40;
            }
            else if (this.heroDiam > 200) {
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + Constants_1.RewardIdEnum.GOLD);
            }
            else {
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + Constants_1.RewardIdEnum.DIAMOND);
            }
        }
    };
    GoBattleBuyItem.prototype.onClickAddHeroTobattle = function () {
        if (GameManager_1.gm.data.fight_temp_data.get_battle_hero_is_space()) {
            if (this.heroDiam == 0) {
                GameManager_1.gm.channel.show_video_ad(this.addHero, this);
            }
            else if (this.heroDiam > 200) {
                if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this.heroDiam) {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                    return;
                }
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this.heroDiam);
                this.addHero();
            }
            else {
                if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < this.heroDiam) {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                    return;
                }
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this.heroDiam);
                this.addHero();
            }
        }
        else {
            GameManager_1.gm.ui.show_notice("Bạn không có đủ ô trống, vui lòng dọn dẹp chúng trước");
        }
    };
    GoBattleBuyItem.prototype.addHero = function () {
        var spaceIndex;
        if (TempData_1.TempData.getDefenseType() != 2) {
            spaceIndex = GameManager_1.gm.data.mapCell_data.getRoleSpceListShift();
            var heroID = this.heroID;
            GameManager_1.gm.data.mapCell_data.addItem(heroID, 1, spaceIndex);
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
            var roleGoBattleItem = new MapCellCfgData_1.roleGoBattleItemVO();
            roleGoBattleItem.cellID = spaceIndex;
            if (heroConfig) {
                roleGoBattleItem.itemID = heroConfig.heroid;
                roleGoBattleItem.itemType = heroConfig.occupation;
                roleGoBattleItem.hp = heroConfig.hp;
                roleGoBattleItem.maxHp = heroConfig.hp;
                GameManager_1.gm.data.fight_temp_data.battle_hero_array.push(roleGoBattleItem);
            }
            switch (this.heroID) {
                case 34003:
                    NetUtils_1.ReportData.instance.report_once_point(10900);
                    NetUtils_1.ReportData.instance.report_point(10901);
                    break;
                case 35003:
                    NetUtils_1.ReportData.instance.report_once_point(10902);
                    NetUtils_1.ReportData.instance.report_point(10903);
                    break;
                case 37003:
                    NetUtils_1.ReportData.instance.report_once_point(10904);
                    NetUtils_1.ReportData.instance.report_point(10905);
                    break;
                case 38003:
                    NetUtils_1.ReportData.instance.report_once_point(10906);
                    NetUtils_1.ReportData.instance.report_point(10907);
                    break;
                case 39003:
                    NetUtils_1.ReportData.instance.report_once_point(10908);
                    NetUtils_1.ReportData.instance.report_point(10909);
                    break;
            }
            GameManager_1.gm.ui.emit("refreshHeroBattle");
            GameManager_1.gm.ui.emit("refreshBattleHero");
        }
        else if (GameManager_1.gm.data.fight_temp_data.get_defense_hero_is_space()) {
            spaceIndex = GameManager_1.gm.data.mapCell_data.getRoleSpceListShift();
            var heroID = this.heroID;
            GameManager_1.gm.data.mapCell_data.addItem(heroID, 1, spaceIndex);
            var roleData = GameManager_1.gm.data.mapCell_data.role_map_data[spaceIndex];
            if (roleData.itemID > 30000) {
                var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
                if (heroConfig) {
                    var defenseHeroItem = new MapCellCfgData_1.DefenseHeroItemVO();
                    defenseHeroItem.cellID = spaceIndex;
                    defenseHeroItem.heroid = heroID;
                    defenseHeroItem.heroUID = roleData.heroUID;
                    GameManager_1.gm.data.mapCell_data.addDefenseDataByID(defenseHeroItem);
                }
                GameManager_1.gm.ui.emit("refreshHeroBattle");
                GameManager_1.gm.ui.emit("refreshBattleHero");
                GameManager_1.gm.data.mapCell_data.async_write_data();
            }
        }
    };
    GoBattleBuyItem.prototype.reset = function () {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
    };
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "heroColorSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "heroSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "heroLvlSpr", void 0);
    __decorate([
        property(cc.Label)
    ], GoBattleBuyItem.prototype, "price_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "cost_sprite", void 0);
    GoBattleBuyItem = __decorate([
        ccclass
    ], GoBattleBuyItem);
    return GoBattleBuyItem;
}(cc.Component));
exports.GoBattleBuyItem = GoBattleBuyItem;

cc._RF.pop();