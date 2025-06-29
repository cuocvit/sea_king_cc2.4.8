
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/book/scripts/SceneBookLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYm9va1xcc2NyaXB0c1xcU2NlbmVCb29rTG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUVBQTJEO0FBR3JELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZCLGtDQUFZO0lBZ0JyQztRQUFBLFlBQ0ksaUJBQU8sU0FNVjtRQW5CTyxhQUFPLEdBQWtCLElBQUksQ0FBQztRQWNsQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7SUFDMUIsQ0FBQzt1QkF2QkMsY0FBYztJQXlCVCxnQ0FBTyxHQUFkLFVBQWUsSUFBbUI7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVTLCtCQUFNLEdBQWhCLGNBQTJCLENBQUM7SUFFcEIsZ0NBQU8sR0FBZixjQUEwQixDQUFDO0lBRWpCLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sOENBQXFCLEdBQTdCLFVBQThCLE9BQWU7UUFDekMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxH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TUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLE1BQU07WUFDVixLQUFLLGNBQWM7Z0JBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsS0FBSyxhQUFhO2dCQUNkLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsTUFBTTtTQUNiO0lBQ0wsQ0FBQzs7SUFuUXNCLDRCQUFhLEdBQVcsQ0FBQyxDQUFDO0lBQzFCLGlDQUFrQixHQUFXLENBQUMsQ0FBQztJQUMvQix1Q0FBd0IsR0FBVyxDQUFDLENBQUM7SUFDckMsd0NBQXlCLEdBQVcsQ0FBQyxDQUFDO0lBQ3RDLHFDQUFzQixHQUFXLENBQUMsQ0FBQztJQUNuQyxnQ0FBaUIsR0FBVyxDQUFDLENBQUM7SUFDOUIsa0NBQW1CLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDLDhCQUFlLEdBQVcsQ0FBQyxDQUFDO0lBZGpELGNBQWM7UUFEbkIsT0FBTztPQUNGLGNBQWMsQ0EyUW5CO0lBQUQscUJBQUM7Q0EzUUQsQUEyUUMsQ0EzUTRCLEVBQUUsQ0FBQyxTQUFTLEdBMlF4QztBQUVELGtCQUFlLGNBQWMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2tDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9ib29rcyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCBTY2VuZUJvb2tWaWV3IGZyb20gJy4vU2NlbmVCb29rVmlldyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgU2NlbmVCb29rTG9naWMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBwVmlldzogU2NlbmVCb29rVmlldyB8IG51bGw7XHJcbiAgICBwcml2YXRlIHRTdWJUeXBlTGlzdHM6IFJlY29yZDxudW1iZXIsIG51bWJlcltdPiB8IG51bGw7XHJcbiAgICBwcml2YXRlIHRMdkxpc3RzOiBSZWNvcmQ8bnVtYmVyLCBudW1iZXJbXT4gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBzQ3VyVGFiOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgdERlbGF5Q2RzOiBSZWNvcmQ8bnVtYmVyLCBudW1iZXI+IHwgbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNVQl9UWVBFX0hFUk86IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNVQl9UWVBFX0hFUk9fV0FMTDogbnVtYmVyID0gMjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU1VCX1RZUEVfTUFURVJJQUxfTk9STUFMOiBudW1iZXIgPSAzO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTVUJfVFlQRV9NQVRFUklBTF9TUEVDSUFMOiBudW1iZXIgPSA0O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTVUJfVFlQRV9NQVRFUklBTF9SQVJFOiBudW1iZXIgPSA1O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTVUJfVFlQRV9ERUNPUkFURTogbnVtYmVyID0gNjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU1VCX1RZUEVfU1VQRVJfSEVSTzogbnVtYmVyID0gNztcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU1VCX1RZUEVfREVGRU5EOiBudW1iZXIgPSA4O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucFZpZXcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudFN1YlR5cGVMaXN0cyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50THZMaXN0cyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zQ3VyVGFiID0gbnVsbDtcclxuICAgICAgICB0aGlzLnREZWxheUNkcyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZpZXcodmlldzogU2NlbmVCb29rVmlldyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucFZpZXcgPSB2aWV3O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcml2YXRlIGRvRXZlbnQoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0hFUk8pO1xyXG4gICAgICAgIHRoaXMuc2hvd1RhYkhlcm8oKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hSZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE1heEx2TGlzdEJ5U3ViVHlwZShzdWJUeXBlOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZ2V0TGlzdEJ5U3ViVHlwZShzdWJUeXBlKTtcclxuICAgICAgICBjb25zdCBtYXhMdkxpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXTtcclxuICAgICAgICAgICAgY29uc3QgbHZMaXN0ID0gdGhpcy5nZXRMdkxpc3QoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsdkxpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGx2SXRlbSA9IGx2TGlzdFtqXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrSXNVbmxvY2sobHZJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEl0ZW0gPSBsdkl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWF4THZMaXN0LnB1c2gobWF4SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhMdkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMdkxpc3RCeVN1YlR5cGUoLi4uc3ViVHlwZXM6IG51bWJlcltdKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IGx2TGlzdDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YlR5cGUgPSBzdWJUeXBlc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZ2V0TGlzdEJ5U3ViVHlwZShzdWJUeXBlKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gbGlzdFtqXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVscyA9IHRoaXMuZ2V0THZMaXN0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgbHZMaXN0LnB1c2goLi4ubGV2ZWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbHZMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TGlzdEJ5U3ViVHlwZShzdWJUeXBlOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMudFN1YlR5cGVMaXN0cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudFN1YlR5cGVMaXN0cyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnRMdkxpc3RzID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBnbS5jb25maWcuZ2V0X2NvbmZpZ19kYXRhKFwiQm9va0NvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ0RhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGNvbmZpZ0RhdGEuZGF0YVtrZXldIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50U3ViVHlwZUxpc3RzW2l0ZW0uc3ViX3R5cGVdID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRTdWJUeXBlTGlzdHNbaXRlbS5zdWJfdHlwZV0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRMdihpdGVtLmlkKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50U3ViVHlwZUxpc3RzW2l0ZW0uc3ViX3R5cGVdLnB1c2goaXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsdktleSA9IE1hdGguZmxvb3IoaXRlbS5pZCAvIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRMdkxpc3RzW2x2S2V5XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50THZMaXN0c1tsdktleV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudEx2TGlzdHNbbHZLZXldLnB1c2goaXRlbS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudFN1YlR5cGVMaXN0c1tzdWJUeXBlXSB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTGlzdEhhdmVSZWQobGlzdDogbnVtYmVyW10sIGhhc1JlZDogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGhhc1JlZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5jaGVja0Jvb2tJdGVtSGF2ZVVubG9ja1Jld2FyZChsaXN0W2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWZyZXNoUmVkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhlcm9MaXN0ID0gdGhpcy5nZXRMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0hFUk8pO1xyXG4gICAgICAgIGNvbnN0IGhlcm9XYWxsTGlzdCA9IHRoaXMuZ2V0TGlzdEJ5U3ViVHlwZShTY2VuZUJvb2tMb2dpYy5TVUJfVFlQRV9IRVJPX1dBTEwpO1xyXG4gICAgICAgIGNvbnN0IGhlcm9XYWxsTHZMaXN0ID0gdGhpcy5nZXRMdkxpc3QoaGVyb1dhbGxMaXN0WzBdKTtcclxuICAgICAgICBsZXQgaGFzUmVkID0gdGhpcy5jaGVja0xpc3RIYXZlUmVkKGhlcm9MaXN0LCBmYWxzZSk7XHJcbiAgICAgICAgaGFzUmVkID0gdGhpcy5jaGVja0xpc3RIYXZlUmVkKGhlcm9XYWxsTHZMaXN0LCBoYXNSZWQpO1xyXG4gICAgICAgIHRoaXMucFZpZXcucmVmcmVzaFJlZChcImJ0bl9oZXJvXCIsIGhhc1JlZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsTGlzdCA9IHRoaXMuZ2V0THZMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX01BVEVSSUFMX05PUk1BTCwgU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfTUFURVJJQUxfU1BFQ0lBTCwgU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfTUFURVJJQUxfUkFSRSk7XHJcbiAgICAgICAgaGFzUmVkID0gdGhpcy5jaGVja0xpc3RIYXZlUmVkKG1hdGVyaWFsTGlzdCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucFZpZXcucmVmcmVzaFJlZChcImJ0bl9pdGVtXCIsIGhhc1JlZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlY29yYXRlTGlzdCA9IHRoaXMuZ2V0THZMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0RFQ09SQVRFKTtcclxuICAgICAgICBoYXNSZWQgPSB0aGlzLmNoZWNrTGlzdEhhdmVSZWQoZGVjb3JhdGVMaXN0LCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5wVmlldy5yZWZyZXNoUmVkKFwiYnRuX2RlY29yYXRlXCIsIGhhc1JlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93VGFiSGVybygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNDdXJUYWIgPSBcImJ0bl9oZXJvXCI7XHJcbiAgICAgICAgdGhpcy5wVmlldy5zaG93VGFiUGFuZWwoXCJidG5faGVyb1wiKTtcclxuICAgICAgICB0aGlzLnBWaWV3LnJlZnJlc2hTZWxlY3RUYWJCdG4oXCJidG5faGVyb1wiKTtcclxuICAgICAgICB0aGlzLnBWaWV3LnJlY3lsZUJvb2tJdGVtcygpO1xyXG5cclxuICAgICAgICBjb25zdCBzdXBlckhlcm9MaXN0ID0gdGhpcy5nZXRMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX1NVUEVSX0hFUk8pO1xyXG4gICAgICAgIGNvbnN0IGhlcm9MaXN0ID0gdGhpcy5nZXRMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0hFUk8pO1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZExpc3QgPSB0aGlzLmdldExpc3RCeVN1YlR5cGUoU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfREVGRU5EKTtcclxuICAgICAgICBjb25zdCBoZXJvV2FsbExpc3QgPSB0aGlzLmdldExpc3RCeVN1YlR5cGUoU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVST19XQUxMKTtcclxuICAgICAgICBjb25zdCBoZXJvV2FsbEx2TGlzdCA9IHRoaXMuZ2V0THZMaXN0KGhlcm9XYWxsTGlzdFswXSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXREZWxheUNkcyhoZXJvTGlzdCwgaGVyb1dhbGxMdkxpc3QpO1xyXG4gICAgICAgIHRoaXMucFZpZXcuaW5pdFN1cGVySGVyb0xpc3Qoc3VwZXJIZXJvTGlzdCk7XHJcbiAgICAgICAgdGhpcy5wVmlldy5pbml0SGVyb0xpc3QoaGVyb0xpc3QpO1xyXG4gICAgICAgIHRoaXMucFZpZXcuaW5pdERlZmVuZExpc3QoZGVmZW5kTGlzdCk7XHJcbiAgICAgICAgdGhpcy5wVmlldy5pbml0V2FsbExpc3QoaGVyb1dhbGxMdkxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1RhYkl0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wVmlldy5yZWN5bGVCb29rSXRlbXMoKTtcclxuICAgICAgICB0aGlzLnNDdXJUYWIgPSBcImJ0bl9pdGVtXCI7XHJcbiAgICAgICAgdGhpcy5wVmlldy5zaG93VGFiUGFuZWwoXCJidG5faXRlbVwiKTtcclxuICAgICAgICB0aGlzLnBWaWV3LnJlZnJlc2hTZWxlY3RUYWJCdG4oXCJidG5faXRlbVwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9ybWFsTGlzdCA9IHRoaXMuZ2V0TWF4THZMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX01BVEVSSUFMX05PUk1BTCk7XHJcbiAgICAgICAgY29uc3Qgc3BlY2lhbExpc3QgPSB0aGlzLmdldE1heEx2TGlzdEJ5U3ViVHlwZShTY2VuZUJvb2tMb2dpYy5TVUJfVFlQRV9NQVRFUklBTF9TUEVDSUFMKTtcclxuICAgICAgICBjb25zdCByYXJlTGlzdCA9IHRoaXMuZ2V0TWF4THZMaXN0QnlTdWJUeXBlKFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX01BVEVSSUFMX1JBUkUpO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2V0RGVsYXlDZHMobm9ybWFsTGlzdCwgc3BlY2lhbExpc3QsIHJhcmVMaXN0KTtcclxuICAgICAgICB0aGlzLnBWaWV3LmluaXROb3JtYWxMaXN0KG5vcm1hbExpc3QpO1xyXG4gICAgICAgIHRoaXMucFZpZXcuaW5pdFNwZWNpYWxMaXN0KHNwZWNpYWxMaXN0KTtcclxuICAgICAgICB0aGlzLnBWaWV3LmluaXRSZXNMaXN0KHJhcmVMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dUYWJEZWNvcmF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBWaWV3LnJlY3lsZUJvb2tJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuc0N1clRhYiA9IFwiYnRuX2RlY29yYXRlXCI7XHJcbiAgICAgICAgdGhpcy5wVmlldy5zaG93VGFiUGFuZWwoXCJidG5fZGVjb3JhdGVcIik7XHJcbiAgICAgICAgdGhpcy5wVmlldy5yZWZyZXNoU2VsZWN0VGFiQnRuKFwiYnRuX2RlY29yYXRlXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBkZWNvcmF0ZUxpc3QgPSB0aGlzLmdldE1heEx2TGlzdEJ5U3ViVHlwZShTY2VuZUJvb2tMb2dpYy5TVUJfVFlQRV9ERUNPUkFURSk7XHJcbiAgICAgICAgdGhpcy5yZXNldERlbGF5Q2RzKGRlY29yYXRlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5wVmlldy5pbml0RGVjb3JhdGVMaXN0KGRlY29yYXRlTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93VGFiRm9ybXVsYSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBWaWV3LnJlY3lsZUJvb2tJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuc0N1clRhYiA9IFwiYnRuX2Zvcm11bGFcIjtcclxuICAgICAgICB0aGlzLnBWaWV3LnNob3dUYWJQYW5lbChcImJ0bl9mb3JtdWxhXCIpO1xyXG4gICAgICAgIHRoaXMucFZpZXcucmVmcmVzaFNlbGVjdFRhYkJ0bihcImJ0bl9mb3JtdWxhXCIpO1xyXG4gICAgICAgIHRoaXMucmVzZXREZWxheUNkcygpO1xyXG5cclxuICAgICAgICBjb25zdCBoZXJvTGlzdCA9IHRoaXMuZ2V0TGlzdEJ5U3ViVHlwZShTY2VuZUJvb2tMb2dpYy5TVUJfVFlQRV9IRVJPKTtcclxuICAgICAgICBjb25zdCBoZXJvV2FsbExpc3QgPSB0aGlzLmdldExpc3RCeVN1YlR5cGUoU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVST19XQUxMKTtcclxuICAgICAgICBjb25zdCBoZXJvV2FsbEx2TGlzdCA9IHRoaXMuZ2V0THZMaXN0KGhlcm9XYWxsTGlzdFswXSk7XHJcbiAgICAgICAgY29uc3QgZm9ybXVsYUdyb3VwczogUmVjb3JkPHN0cmluZywgbnVtYmVyW10+ID0ge307XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVyb0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGhlcm9MaXN0W2ldO1xyXG4gICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJvb2tDb25maWdEYXRhXCIsIGl0ZW0udG9TdHJpbmcoKSkgYXMgQm9va0NvbmZpZztcclxuICAgICAgICAgICAgaWYgKHJvd0RhdGEudW5sb2NrX2Zvcm11bGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmb3JtdWxhR3JvdXBzW3Jvd0RhdGEuZm9ybXVsYV9ncm91cF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhR3JvdXBzW3Jvd0RhdGEuZm9ybXVsYV9ncm91cF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvcm11bGFHcm91cHNbcm93RGF0YS5mb3JtdWxhX2dyb3VwXS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlcm9XYWxsTHZMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBoZXJvV2FsbEx2TGlzdFtpXTtcclxuICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCBpdGVtLnRvU3RyaW5nKCkpIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgICAgIGlmIChyb3dEYXRhLnVubG9ja19mb3JtdWxhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICghZm9ybXVsYUdyb3Vwc1tyb3dEYXRhLmZvcm11bGFfZ3JvdXBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXVsYUdyb3Vwc1tyb3dEYXRhLmZvcm11bGFfZ3JvdXBdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhR3JvdXBzW3Jvd0RhdGEuZm9ybXVsYV9ncm91cF0ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wVmlldy5pbml0Rm9ybXVsYUxpc3QoZm9ybXVsYUdyb3Vwcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldERlbGF5Q2RzKC4uLmxpc3RzOiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxpc3RzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudERlbGF5Q2RzID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnREZWxheUNkcyA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgZGVsYXkgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gbGlzdHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnREZWxheUNkc1tsaXN0W2pdXSA9IGRlbGF5ICs9IDAuMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVsYXlDZChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50RGVsYXlDZHMgJiYgdGhpcy50RGVsYXlDZHNbaWRdICE9PSBudWxsID8gdGhpcy50RGVsYXlDZHNbaWRdIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaEN1clRhYigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zQ3VyVGFiICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkJ0bkNsaWNrKHRoaXMuc0N1clRhYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0THYoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGlkIC0gMTAgKiBNYXRoLmZsb29yKGlkIC8gMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMdkxpc3QoaWQ6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCBsdktleSA9IE1hdGguZmxvb3IoaWQgLyAxMCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudEx2TGlzdHMgPyB0aGlzLnRMdkxpc3RzW2x2S2V5XSB8fCBbXSA6IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lzVW5sb2NrKGlkOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZ20uZGF0YS5tYXBDZWxsX2RhdGEuY2hlY2tCb29rSXRlbUlzVW5sb2NrKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLmVtaXQoXCJib29rUmVkU3RhdHVzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkJ0bkNsaWNrKGJ1dHRvbklkOiBzdHJpbmcsIGV2ZW50OiBjYy5FdmVudCA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGJ1dHRvbklkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fY2xvc2VcIjpcclxuICAgICAgICAgICAgY2FzZSBcImJnXCI6XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5CT09LKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2hlcm9cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RhYkhlcm8oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2l0ZW1cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RhYkl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2RlY29yYXRlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUYWJEZWNvcmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZm9ybXVsYVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VGFiRm9ybXVsYSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2VuZUJvb2tMb2dpYzsiXX0=