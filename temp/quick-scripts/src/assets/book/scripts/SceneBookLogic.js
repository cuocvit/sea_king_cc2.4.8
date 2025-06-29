"use strict";
cc._RF.push(module, '47bf0yAo15MMpNkeO+2LUqd', 'SceneBookLogic');
// book/scripts/SceneBookLogic.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SceneBookLogic = /** @class */ (function (_super) {
    __extends(SceneBookLogic, _super);
    function SceneBookLogic() {
        var _this = _super.call(this) || this;
        _this.sCurTab = null;
        _this.pView = null;
        _this.tSubTypeLists = null;
        _this.tLvLists = null;
        _this.sCurTab = null;
        _this.tDelayCds = null;
        return _this;
    }
    SceneBookLogic_1 = SceneBookLogic;
    SceneBookLogic.prototype.setView = function (view) {
        this.pView = view;
    };
    SceneBookLogic.prototype.onLoad = function () { };
    SceneBookLogic.prototype.doEvent = function () { };
    SceneBookLogic.prototype.onEnable = function () {
        this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO);
        this.showTabHero();
        this.refreshRed();
    };
    SceneBookLogic.prototype.getMaxLvListBySubType = function (subType) {
        var list = this.getListBySubType(subType);
        var maxLvList = [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var lvList = this.getLvList(item);
            var maxItem = item;
            for (var j = 0; j < lvList.length; j++) {
                var lvItem = lvList[j];
                if (this.checkIsUnlock(lvItem)) {
                    maxItem = lvItem;
                }
            }
            maxLvList.push(maxItem);
        }
        return maxLvList;
    };
    SceneBookLogic.prototype.getLvListBySubType = function () {
        var subTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subTypes[_i] = arguments[_i];
        }
        var lvList = [];
        for (var i = 0; i < subTypes.length; i++) {
            var subType = subTypes[i];
            var list = this.getListBySubType(subType);
            for (var j = 0; j < list.length; j++) {
                var item = list[j];
                var levels = this.getLvList(item);
                lvList.push.apply(lvList, levels);
            }
        }
        return lvList;
    };
    SceneBookLogic.prototype.getListBySubType = function (subType) {
        if (this.tSubTypeLists == null) {
            this.tSubTypeLists = {};
            this.tLvLists = {};
            var configData = GameManager_1.gm.config.get_config_data("BookConfigData");
            for (var key in configData.data) {
                var item = configData.data[key];
                if (this.tSubTypeLists[item.sub_type] == null) {
                    this.tSubTypeLists[item.sub_type] = [];
                }
                if (this.getLv(item.id) == 1) {
                    this.tSubTypeLists[item.sub_type].push(item.id);
                }
                var lvKey = Math.floor(item.id / 10);
                if (this.tLvLists[lvKey] == null) {
                    this.tLvLists[lvKey] = [];
                }
                this.tLvLists[lvKey].push(item.id);
            }
        }
        return this.tSubTypeLists[subType] || [];
    };
    SceneBookLogic.prototype.checkListHaveRed = function (list, hasRed) {
        if (hasRed === void 0) { hasRed = false; }
        if (hasRed)
            return true;
        for (var i = 0; i < list.length; i++) {
            if (GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward(list[i])) {
                return true;
            }
        }
        return false;
    };
    SceneBookLogic.prototype.refreshRed = function () {
        var heroList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO);
        var heroWallList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO_WALL);
        var heroWallLvList = this.getLvList(heroWallList[0]);
        var hasRed = this.checkListHaveRed(heroList, false);
        hasRed = this.checkListHaveRed(heroWallLvList, hasRed);
        this.pView.refreshRed("btn_hero", hasRed);
        var materialList = this.getLvListBySubType(SceneBookLogic_1.SUB_TYPE_MATERIAL_NORMAL, SceneBookLogic_1.SUB_TYPE_MATERIAL_SPECIAL, SceneBookLogic_1.SUB_TYPE_MATERIAL_RARE);
        hasRed = this.checkListHaveRed(materialList, false);
        this.pView.refreshRed("btn_item", hasRed);
        var decorateList = this.getLvListBySubType(SceneBookLogic_1.SUB_TYPE_DECORATE);
        hasRed = this.checkListHaveRed(decorateList, false);
        this.pView.refreshRed("btn_decorate", hasRed);
    };
    SceneBookLogic.prototype.showTabHero = function () {
        this.sCurTab = "btn_hero";
        this.pView.showTabPanel("btn_hero");
        this.pView.refreshSelectTabBtn("btn_hero");
        this.pView.recyleBookItems();
        var superHeroList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_SUPER_HERO);
        var heroList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO);
        var defendList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_DEFEND);
        var heroWallList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO_WALL);
        var heroWallLvList = this.getLvList(heroWallList[0]);
        this.resetDelayCds(heroList, heroWallLvList);
        this.pView.initSuperHeroList(superHeroList);
        this.pView.initHeroList(heroList);
        this.pView.initDefendList(defendList);
        this.pView.initWallList(heroWallLvList);
    };
    SceneBookLogic.prototype.showTabItem = function () {
        this.pView.recyleBookItems();
        this.sCurTab = "btn_item";
        this.pView.showTabPanel("btn_item");
        this.pView.refreshSelectTabBtn("btn_item");
        var normalList = this.getMaxLvListBySubType(SceneBookLogic_1.SUB_TYPE_MATERIAL_NORMAL);
        var specialList = this.getMaxLvListBySubType(SceneBookLogic_1.SUB_TYPE_MATERIAL_SPECIAL);
        var rareList = this.getMaxLvListBySubType(SceneBookLogic_1.SUB_TYPE_MATERIAL_RARE);
        this.resetDelayCds(normalList, specialList, rareList);
        this.pView.initNormalList(normalList);
        this.pView.initSpecialList(specialList);
        this.pView.initResList(rareList);
    };
    SceneBookLogic.prototype.showTabDecorate = function () {
        this.pView.recyleBookItems();
        this.sCurTab = "btn_decorate";
        this.pView.showTabPanel("btn_decorate");
        this.pView.refreshSelectTabBtn("btn_decorate");
        var decorateList = this.getMaxLvListBySubType(SceneBookLogic_1.SUB_TYPE_DECORATE);
        this.resetDelayCds(decorateList);
        this.pView.initDecorateList(decorateList);
    };
    SceneBookLogic.prototype.showTabFormula = function () {
        this.pView.recyleBookItems();
        this.sCurTab = "btn_formula";
        this.pView.showTabPanel("btn_formula");
        this.pView.refreshSelectTabBtn("btn_formula");
        this.resetDelayCds();
        var heroList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO);
        var heroWallList = this.getListBySubType(SceneBookLogic_1.SUB_TYPE_HERO_WALL);
        var heroWallLvList = this.getLvList(heroWallList[0]);
        var formulaGroups = {};
        for (var i = 0; i < heroList.length; i++) {
            var item = heroList[i];
            var rowData = GameManager_1.gm.config.get_row_data("BookConfigData", item.toString());
            if (rowData.unlock_formula.length > 0) {
                if (!formulaGroups[rowData.formula_group]) {
                    formulaGroups[rowData.formula_group] = [];
                }
                formulaGroups[rowData.formula_group].push(item);
            }
        }
        for (var i = 0; i < heroWallLvList.length; i++) {
            var item = heroWallLvList[i];
            var rowData = GameManager_1.gm.config.get_row_data("BookConfigData", item.toString());
            if (rowData.unlock_formula.length > 0) {
                if (!formulaGroups[rowData.formula_group]) {
                    formulaGroups[rowData.formula_group] = [];
                }
                formulaGroups[rowData.formula_group].push(item);
            }
        }
        this.pView.initFormulaList(formulaGroups);
    };
    SceneBookLogic.prototype.resetDelayCds = function () {
        var lists = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            lists[_i] = arguments[_i];
        }
        if (lists.length == 0) {
            this.tDelayCds = null;
        }
        else {
            this.tDelayCds = {};
            var delay = 0;
            for (var i = 0; i < lists.length; i++) {
                var list = lists[i];
                for (var j = 0; j < list.length; j++) {
                    this.tDelayCds[list[j]] = delay += 0.1;
                }
            }
        }
    };
    SceneBookLogic.prototype.getDelayCd = function (id) {
        return this.tDelayCds && this.tDelayCds[id] !== null ? this.tDelayCds[id] : 0;
    };
    SceneBookLogic.prototype.refreshCurTab = function () {
        if (this.sCurTab != null) {
            this.onBtnClick(this.sCurTab);
        }
    };
    SceneBookLogic.prototype.getLv = function (id) {
        return id - 10 * Math.floor(id / 10);
    };
    SceneBookLogic.prototype.getLvList = function (id) {
        var lvKey = Math.floor(id / 10);
        return this.tLvLists ? this.tLvLists[lvKey] || [] : [];
    };
    SceneBookLogic.prototype.checkIsUnlock = function (id) {
        return GameManager_1.gm.data.mapCell_data.checkBookItemIsUnlock(id);
    };
    SceneBookLogic.prototype.onDisable = function () {
        GameManager_1.gm.ui.emit("bookRedStatus");
    };
    SceneBookLogic.prototype.onBtnClick = function (buttonId, event) {
        if (event === void 0) { event = null; }
        switch (buttonId) {
            case "btn_close":
            case "bg":
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BOOK);
                break;
            case "btn_hero":
                this.showTabHero();
                break;
            case "btn_item":
                this.showTabItem();
                break;
            case "btn_decorate":
                this.showTabDecorate();
                break;
            case "btn_formula":
                this.showTabFormula();
                break;
        }
    };
    var SceneBookLogic_1;
    SceneBookLogic.SUB_TYPE_HERO = 1;
    SceneBookLogic.SUB_TYPE_HERO_WALL = 2;
    SceneBookLogic.SUB_TYPE_MATERIAL_NORMAL = 3;
    SceneBookLogic.SUB_TYPE_MATERIAL_SPECIAL = 4;
    SceneBookLogic.SUB_TYPE_MATERIAL_RARE = 5;
    SceneBookLogic.SUB_TYPE_DECORATE = 6;
    SceneBookLogic.SUB_TYPE_SUPER_HERO = 7;
    SceneBookLogic.SUB_TYPE_DEFEND = 8;
    SceneBookLogic = SceneBookLogic_1 = __decorate([
        ccclass
    ], SceneBookLogic);
    return SceneBookLogic;
}(cc.Component));
exports.default = SceneBookLogic;

cc._RF.pop();