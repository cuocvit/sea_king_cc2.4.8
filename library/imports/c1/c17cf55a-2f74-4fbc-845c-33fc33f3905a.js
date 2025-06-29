"use strict";
cc._RF.push(module, 'c17cfVaL3RPvIRcM/wz85Ba', 'DefenseOp');
// start-scene/scripts/DefenseOp.ts

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
// +-+
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var MapCellCfgData_1 = require("./MapCellCfgData");
var Utils_1 = require("./Utils");
var TempData_1 = require("./TempData");
var ListView_1 = require("./ListView");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DefenseOp = /** @class */ (function (_super) {
    __extends(DefenseOp, _super);
    function DefenseOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.heroPosNode = [];
        _this.hero_list = null;
        _this.noHeroTips = null;
        _this.lblLvl = null;
        _this._curUnlockNum = 0;
        _this._tempLockList = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8];
        _this._clickHeroData = null;
        _this._startPos = null;
        _this._heroList = [];
        return _this;
    }
    DefenseOp.prototype.onEnable = function () {
        TempData_1.TempData.setDefenseType(2);
        this._clickHeroData = new MapCellCfgData_1.roleGoBattleItemVO();
        GameManager_1.gm.ui.on("refreshHeroBattle", this.refreshPanel, this);
        GameManager_1.gm.ui.on("refreshBattleHero", this.update_view, this);
        var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.GARRISION_TYPE];
        var cfgByID = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
        if (cfgByID) {
            this.lblLvl.string = "Lv." + buildData.buildLvl;
            this._curUnlockNum = cfgByID.capacity;
            var color = cc.Color.BLACK.fromHEX("#FFF8E8");
            for (var i = 0; i < this.heroPosNode.length; i++) {
                this.heroPosNode[i].color = color;
                if (this._curUnlockNum < i + 1) {
                    this.heroPosNode[i].children[0].active = false;
                    this.heroPosNode[i].children[1].active = true;
                    var lockColor = cc.Color.BLACK.fromHEX("#BAAF93");
                    this.heroPosNode[i].children[1].children[0].color = lockColor;
                    this.heroPosNode[i].children[1].children[1].color = lockColor;
                    this.heroPosNode[i].children[1].children[1].getComponent(cc.Label).string = "level " + this._tempLockList[i];
                }
                else {
                    this.heroPosNode[i].children[0].active = true;
                    this.heroPosNode[i].children[1].active = false;
                }
                this.heroPosNode[i].on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this, i), this);
            }
            TempData_1.TempData.getInitAllHeroList(true);
            this.noHeroTips.active = TempData_1.TempData.localHeroList.length <= 0;
            this.refreshPanel();
            this.update_view();
        }
    };
    DefenseOp.prototype.update_view = function () {
        var _a;
        (_a = this.hero_list) === null || _a === void 0 ? void 0 : _a.setData(TempData_1.TempData.localHeroList);
    };
    DefenseOp.prototype.touchEnd = function (index) {
        if (this._curUnlockNum <= index || !(this._heroList.length > index))
            return;
        var heroData = GameManager_1.gm.data.mapCell_data.getHeroDefanseDataByHeroUID(this._heroList[index].heroUID);
        if (heroData) {
            var cellID = heroData.cellID;
            var heroid = heroData.heroid;
            var heroUID = heroData.heroUID;
            TempData_1.TempData.addHeroByID(heroid, cellID);
            GameManager_1.gm.data.mapCell_data.delDefenseDataByID(heroUID);
            this.refreshPanel();
            this.update_view();
            GameManager_1.gm.data.mapCell_data.async_write_data();
        }
    };
    DefenseOp.prototype.refreshPanel = function () {
        this._heroList = [];
        var heroData = GameManager_1.gm.data.mapCell_data.getDefanseHeroData();
        var a = 0;
        for (var key in heroData) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroData[key].heroid);
            if (heroConfig) {
                this.heroPosNode[a].children[0].children[1].active = true;
                Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
                Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + heroConfig.heroid);
                Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[2].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
                this._heroList.push(heroData[key]);
                a++;
            }
        }
        for (var o = a; o < this._curUnlockNum; o++) {
            this.heroPosNode[o].children[0].children[1].active = false;
        }
    };
    DefenseOp.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.DEFENSE);
    };
    DefenseOp.prototype.onDisable = function () {
        var _a;
        (_a = this.hero_list) === null || _a === void 0 ? void 0 : _a.reset();
        GameManager_1.gm.ui.off("refreshHeroBattle", this.refreshPanel, this);
        GameManager_1.gm.ui.off("refreshBattleHero", this.update_view, this);
    };
    __decorate([
        property([cc.Node])
    ], DefenseOp.prototype, "heroPosNode", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], DefenseOp.prototype, "hero_list", void 0);
    __decorate([
        property(cc.Node)
    ], DefenseOp.prototype, "noHeroTips", void 0);
    __decorate([
        property(cc.Label)
    ], DefenseOp.prototype, "lblLvl", void 0);
    DefenseOp = __decorate([
        ccclass
    ], DefenseOp);
    return DefenseOp;
}(GameModule_1.GameModule));
exports.default = DefenseOp;

cc._RF.pop();