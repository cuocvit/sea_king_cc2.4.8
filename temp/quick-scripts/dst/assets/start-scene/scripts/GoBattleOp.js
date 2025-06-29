
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GoBattleOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0d1bNj2oBC8ZpcABCf1YOI', 'GoBattleOp');
// start-scene/scripts/GoBattleOp.ts

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
// _hitTest???
var ListView_1 = require("./ListView");
var GameModule_1 = require("./GameModule");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var MapCellCfgData_1 = require("./MapCellCfgData");
var Utils_1 = require("./Utils");
var TempData_1 = require("./TempData");
var GoBattleBuyItem_1 = require("./GoBattleBuyItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoBattleOp = /** @class */ (function (_super) {
    __extends(GoBattleOp, _super);
    function GoBattleOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.heroPosNode = [];
        _this.heroParendNode = null;
        _this.clickMoveNode = null;
        _this.bgUINormal = null;
        _this.bgUIDongku = null;
        _this.bgUIMiHuan = null;
        _this.kuangSprFrameList = [];
        _this.handAnim = null;
        _this.hero_list = null;
        _this.battleBtn = null;
        _this.noHeroTips = null;
        _this.lblLvl = null;
        _this.adheroNode = null;
        _this._curUnlockNum = 0;
        _this._tempLockList = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        _this._tempHeroList = {
            34003: 0,
            35003: 0,
            37003: 33,
            38003: 35,
            39003: 220
        };
        _this._curType = 1;
        _this._clickHeroData = null;
        _this._startPos = null;
        return _this;
    }
    GoBattleOp.prototype.onLoad = function () {
        var _a;
        var num = 0;
        for (var t in this._tempHeroList) {
            (_a = this.adheroNode) === null || _a === void 0 ? void 0 : _a.children[num].getComponent(GoBattleBuyItem_1.GoBattleBuyItem).initdata(parseInt(t), this._tempHeroList[t]);
            num++;
        }
    };
    GoBattleOp.prototype.onEnable = function () {
        var _a;
        this.adheroNode.active = false;
        var dataByType = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE);
        if (dataByType && dataByType.buildLvl >= 2) {
            this.adheroNode.active = true;
        }
        if ((_a = this.adheroNode) === null || _a === void 0 ? void 0 : _a.active) {
            this.hero_list.node.height = 344;
            this.hero_list.node.y = -715;
            this.hero_list.scrollView.node.height = 220;
            this.hero_list.scrollView.node.children[0].height = 220;
        }
        else {
            this.hero_list.node.height = 380;
            this.hero_list.scrollView.node.children[0].height = 380;
            this.hero_list.scrollView.node.height = 380;
            this.hero_list.node.y = -637;
        }
        this.hero_list.scrollView.node.children[0].y = 0.5 * this.hero_list.scrollView.node.height;
        TempData_1.TempData.setDefenseType(1);
        this._curType = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GOBATTLE.key);
        if (GameManager_1.gm.data.mapCell_data.isGuide)
            GameManager_1.gm.data.mapCell_data.isGuide;
        this.initPanelUI();
        this._clickHeroData = new MapCellCfgData_1.roleGoBattleItemVO;
        GameManager_1.gm.ui.on("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.on("refreshHeroBattle", this.refreshPanel, this);
        GameManager_1.gm.ui.on("refreshBattleHero", this.update_view, this);
        GameManager_1.gm.data.fight_temp_data.open_battle_panel_state = 1;
        GameManager_1.gm.data.fight_temp_data.battle_hero_array = [];
        var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE];
        var cfById = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
        if (cfById) {
            this.lblLvl.string = this._curType !== 1 ? "" : "Lv." + buildData.buildLvl;
            this._curUnlockNum = cfById.capacity;
            console.log("this._curType: ", this._curType);
            for (var i = 0; i < this.heroPosNode.length; i++) {
                var color = cc.Color.BLACK.fromHEX("#FFF8E8");
                if (this._curType === 2) {
                    color = cc.Color.BLACK.fromHEX("#916d87");
                }
                else if (this._curType === 3) {
                    color = cc.Color.BLACK.fromHEX("#E6D6FD");
                }
                this.heroPosNode[i].color = color;
                this.heroPosNode[i].children[0].children[0].getComponent(cc.Sprite).spriteFrame = this.kuangSprFrameList[this._curType - 1];
                if (this._curUnlockNum < i + 1) {
                    this.heroPosNode[i].children[0].active = false;
                    this.heroPosNode[i].children[1].active = true;
                    color = this._curType === 2 ? cc.Color.BLACK.fromHEX("#613a55") : this._curType === 3 ? cc.Color.BLACK.fromHEX("#8d5cd1") : cc.Color.BLACK.fromHEX("#BAAF93");
                    this.heroPosNode[i].children[1].children[0].color = color;
                    this.heroPosNode[i].children[1].children[1].color = color;
                    this.heroPosNode[i].children[1].children[1].getComponent(cc.Label).string = "level " + this._tempLockList[i];
                }
                else {
                    this.heroPosNode[i].children[0].active = true;
                    this.heroPosNode[i].children[1].active = false;
                }
                this.heroPosNode[i].on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this, i), this);
            }
            this.clickMoveNode.active = false;
            TempData_1.TempData.getInitAllHeroList();
            this.noHeroTips.active = TempData_1.TempData.localHeroList.length <= 0;
            this.battleBtn.interactable = TempData_1.TempData.localHeroList.length > 0;
            this.refreshPanel();
            this.update_view();
        }
    };
    GoBattleOp.prototype.update_view = function () {
        var _a;
        (_a = this.hero_list) === null || _a === void 0 ? void 0 : _a.setData(TempData_1.TempData.localHeroList);
    };
    GoBattleOp.prototype.initPanelUI = function () {
        this.bgUINormal.active = true;
        this.bgUIMiHuan.active = false;
        this.bgUIDongku.active = false;
        if (this._curType === 1) {
            // Do nothing
        }
        else if (this._curType === 2) {
            this.bgUINormal.active = false;
            this.bgUIDongku.active = true;
        }
        else if (this._curType === 3) {
            this.bgUINormal.active = false;
            this.bgUIMiHuan.active = true;
        }
    };
    GoBattleOp.prototype.on_move_item_hide = function (newT, eventNum) {
        if (this.heroParendNode._hitTest(newT) && GameManager_1.gm.data.fight_temp_data.get_battle_hero_is_space()) { // ???
            var item = new MapCellCfgData_1.roleGoBattleItemVO;
            item.cellID = eventNum;
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(GameManager_1.gm.data.mapCell_data.role_map_data[item.cellID].itemID);
            if (heroConfig) {
                item.itemID = heroConfig.heroid;
                item.itemType = heroConfig.occupation;
                GameManager_1.gm.data.fight_temp_data.battle_hero_array.push(item);
            }
            this.refreshPanel();
        }
    };
    GoBattleOp.prototype.touchStart = function (number, event) {
        this.clickMoveNode.active = true;
        this.clickMoveNode.position = this.clickMoveNode.parent.convertToNodeSpaceAR(event.getLocation());
        this._clickHeroData.itemID = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].itemID;
        this._clickHeroData.cellID = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].cellID;
        this._clickHeroData.itemType = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].itemType;
        this._clickHeroData.hp = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].hp;
        this._clickHeroData.maxHp = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].maxHp;
        GameManager_1.gm.data.fight_temp_data.battle_hero_array.splice(number, 1);
        this.refreshPanel();
    };
    GoBattleOp.prototype.touchMove = function (event) {
        var _a;
        this.clickMoveNode.position = (_a = this.clickMoveNode) === null || _a === void 0 ? void 0 : _a.parent.convertToNodeSpaceAR(event.getLocation());
    };
    GoBattleOp.prototype.touchEnd = function (number) {
        if (GameManager_1.gm.data.fight_temp_data.battle_hero_array.length > number && GameManager_1.gm.data.fight_temp_data.battle_hero_array[number]) {
            var cellID = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].cellID;
            var itemID = GameManager_1.gm.data.fight_temp_data.battle_hero_array[number].itemID;
            TempData_1.TempData.addHeroByID(itemID, cellID);
            GameManager_1.gm.data.fight_temp_data.battle_hero_array.splice(number, 1);
            this.refreshPanel();
            this.update_view();
        }
    };
    GoBattleOp.prototype.touchCanel = function (num, event) {
        if (this.heroParendNode._hitTest(event.getLocation())) { // ???
            for (var a = 0; a < this._curUnlockNum; a++) {
                if (this.heroPosNode[a]._hitTest(event.getLocation())) {
                    GameManager_1.gm.data.fight_temp_data.battle_hero_array.splice(a, 0, this._clickHeroData);
                    this._clickHeroData = null;
                    this.refreshPanel();
                    break;
                }
            }
            if (this._clickHeroData) {
                GameManager_1.gm.data.fight_temp_data.battle_hero_array.push(this._clickHeroData);
                this._clickHeroData = null;
                this.refreshPanel();
            }
        }
        if (this._clickHeroData) {
            GameManager_1.gm.data.fight_temp_data.battle_hero_array.splice(num, 1);
            this.refreshPanel();
        }
    };
    GoBattleOp.prototype.refreshPanel = function () {
        var _a;
        var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE];
        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
        if (buildConfig) {
            this._curUnlockNum = buildConfig.capacity;
            var heroArr = GameManager_1.gm.data.fight_temp_data.battle_hero_array;
            if (GameManager_1.gm.data.mapCell_data.isGuide && GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID == 13) {
                this.handAnim.active = true;
                this.handAnim.position = heroArr.length == 2 ? (_a = this.battleBtn) === null || _a === void 0 ? void 0 : _a.node.position : cc.v3(-238, -556);
            }
            else {
                this.handAnim.active = false;
            }
            for (var i = 0; i < this._curUnlockNum; i++) {
                this.heroPosNode[i].children[0].children[1].active = true;
                if (heroArr.length > i && heroArr[i]) {
                    var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroArr[i].itemID);
                    if (heroConfig) {
                        this.heroPosNode[i].children[0].children[1].active = true;
                        Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[i].children[0].children[1].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
                        Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[i].children[0].children[1].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + heroConfig.heroid);
                        Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[i].children[0].children[1].children[2].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
                    }
                }
                else {
                    this.heroPosNode[i].children[0].children[1].active = false;
                }
            }
        }
    };
    GoBattleOp.prototype.onClickHeroPhoto = function (t, key) {
        if (this.node.getNumberOfRunningActions() > 0)
            return;
        var index = parseInt(key);
        if (this._curUnlockNum > index) {
            GameManager_1.gm.data.fight_temp_data.battle_hero_array.splice(index, 1);
            this.refreshPanel();
        }
    };
    GoBattleOp.prototype.onClickClose = function () {
        GameManager_1.gm.data.fight_temp_data.battle_hero_array = [];
        GameManager_1.gm.data.fight_temp_data.open_battle_panel_state = 0;
        GameManager_1.gm.data.mail_temp_data.target_uid = "";
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GOBATTLE);
    };
    GoBattleOp.prototype.onClickFight = function () {
        if (GameManager_1.gm.data.fight_temp_data.battle_hero_array.length != 0) {
            if (GameManager_1.gm.data.mapCell_data.isGuide && GameManager_1.gm.data.fight_temp_data.battle_hero_array.length < 2) {
                GameManager_1.gm.ui.show_notice("Hãy đưa 2 anh hùng vào đội hình!!!");
            }
            else {
                if (GameManager_1.gm.data.mapCell_data.isGuide) {
                    GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.TOWER_TYPE].buildState = 2;
                    GameManager_1.gm.data.mapCell_data.async_write_data();
                    GameManager_1.gm.data.mapCell_data.role_build_lock_num = 1;
                    GameManager_1.gm.ui.emit("build_show_stateIcon", true);
                    GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 13,
                        guidedesc: cc.js.formatStr("13.Nhấn vào nút tấn công trên giao diện!!!")
                    });
                }
                for (var t = 0; t < GameManager_1.gm.data.fight_temp_data.battle_hero_array.length; t++) {
                    GameManager_1.gm.ui.emit("set_item_battle_hero_operty", GameManager_1.gm.data.fight_temp_data.battle_hero_array[t].cellID, false);
                }
                GameManager_1.gm.data.fight_temp_data.open_battle_panel_state = 0;
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GOBATTLE);
                TempData_1.TempData.map_type = this._curType;
                GameManager_1.gm.ui.emit("ship_play_anim", 1);
            }
        }
        else {
            GameManager_1.gm.ui.show_notice("Hãy đưa anh hùng vào đội hình!!!");
        }
    };
    GoBattleOp.prototype.onDisable = function () {
        for (var t = 0; t < this.heroPosNode.length; t++) {
            this.heroPosNode[t].targetOff(this);
        }
        GameManager_1.gm.ui.off("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.off("refreshHeroBattle", this.refreshPanel, this);
        GameManager_1.gm.ui.off("refreshBattleHero", this.update_view, this);
    };
    __decorate([
        property([cc.Node])
    ], GoBattleOp.prototype, "heroPosNode", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "heroParendNode", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "clickMoveNode", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "bgUINormal", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "bgUIDongku", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "bgUIMiHuan", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GoBattleOp.prototype, "kuangSprFrameList", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "handAnim", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], GoBattleOp.prototype, "hero_list", void 0);
    __decorate([
        property(cc.Button)
    ], GoBattleOp.prototype, "battleBtn", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "noHeroTips", void 0);
    __decorate([
        property(cc.Label)
    ], GoBattleOp.prototype, "lblLvl", void 0);
    __decorate([
        property(cc.Node)
    ], GoBattleOp.prototype, "adheroNode", void 0);
    GoBattleOp = __decorate([
        ccclass
    ], GoBattleOp);
    return GoBattleOp;
}(GameModule_1.GameModule));
exports.default = GoBattleOp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdvQmF0dGxlT3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHVDQUFzQztBQUN0QywyQ0FBMEM7QUFDMUMsNkNBQW1DO0FBQ25DLHlDQUF3RDtBQUN4RCxtREFBc0Q7QUFDdEQsaUNBQWdDO0FBQ2hDLHVDQUFzQztBQUN0QyxxREFBb0Q7QUFFOUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUIsOEJBQVU7SUFBbkM7UUFBQSxxRUFpU0M7UUEvUlcsaUJBQVcsR0FBYyxFQUFFLENBQUM7UUFHNUIsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3RDLG1CQUFhLEdBQW1CLElBQUksQ0FBQztRQUdyQyxnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFHbEMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBR2xDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyx1QkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBR3pDLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGVBQVMsR0FBb0IsSUFBSSxDQUFDO1FBR2xDLGVBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxZQUFNLEdBQW9CLElBQUksQ0FBQztRQUcvQixnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFFbEMsbUJBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsbUJBQWEsR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pELG1CQUFhLEdBQThCO1lBQy9DLEtBQUssRUFBRSxDQUFD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RGYsT0FBTztPQUNGLFVBQVUsQ0FpU2Y7SUFBRCxpQkFBQztDQWpTRCxBQWlTQyxDQWpTd0IsdUJBQVUsR0FpU2xDO0FBRUQsa0JBQWUsVUFBVSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gX2hpdFRlc3Q/Pz9cclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICcuL0xpc3RWaWV3JztcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gJy4vR2FtZU1vZHVsZSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSwgQnVuZGxlTmFtZSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgcm9sZUdvQmF0dGxlSXRlbVZPIH0gZnJvbSAnLi9NYXBDZWxsQ2ZnRGF0YSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IEdvQmF0dGxlQnV5SXRlbSB9IGZyb20gXCIuL0dvQmF0dGxlQnV5SXRlbVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEdvQmF0dGxlT3AgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBwcml2YXRlIGhlcm9Qb3NOb2RlOiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaGVyb1BhcmVuZE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2xpY2tNb3ZlTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBiZ1VJTm9ybWFsOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJnVUlEb25na3U6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmdVSU1pSHVhbjogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBrdWFuZ1NwckZyYW1lTGlzdDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBoYW5kQW5pbTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgaGVyb19saXN0OiBMaXN0VmlldyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJhdHRsZUJ0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG5vSGVyb1RpcHM6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibEx2bDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYWRoZXJvTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2N1clVubG9ja051bTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3RlbXBMb2NrTGlzdDogbnVtYmVyW10gPSBbMSwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XHJcbiAgICBwcml2YXRlIF90ZW1wSGVyb0xpc3Q6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7XHJcbiAgICAgICAgMzQwMDM6IDAsXHJcbiAgICAgICAgMzUwMDM6IDAsXHJcbiAgICAgICAgMzcwMDM6IDMzLFxyXG4gICAgICAgIDM4MDAzOiAzNSxcclxuICAgICAgICAzOTAwMzogMjIwXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfY3VyVHlwZTogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgX2NsaWNrSGVyb0RhdGEgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRQb3MgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCB0IGluIHRoaXMuX3RlbXBIZXJvTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkaGVyb05vZGU/LmNoaWxkcmVuW251bV0uZ2V0Q29tcG9uZW50KEdvQmF0dGxlQnV5SXRlbSkuaW5pdGRhdGEocGFyc2VJbnQodCksIHRoaXMuX3RlbXBIZXJvTGlzdFt0XSk7XHJcbiAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGhlcm9Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGRhdGFCeVR5cGUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKTtcclxuICAgICAgICBpZiAoZGF0YUJ5VHlwZSAmJiBkYXRhQnlUeXBlLmJ1aWxkTHZsID49IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGhlcm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFkaGVyb05vZGU/LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fbGlzdC5ub2RlLmhlaWdodCA9IDM0NDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3Qubm9kZS55ID0gLTcxNTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3Quc2Nyb2xsVmlldy5ub2RlLmhlaWdodCA9IDIyMDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3Quc2Nyb2xsVmlldy5ub2RlLmNoaWxkcmVuWzBdLmhlaWdodCA9IDIyMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fbGlzdC5ub2RlLmhlaWdodCA9IDM4MDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3Quc2Nyb2xsVmlldy5ub2RlLmNoaWxkcmVuWzBdLmhlaWdodCA9IDM4MDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3Quc2Nyb2xsVmlldy5ub2RlLmhlaWdodCA9IDM4MDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2xpc3Qubm9kZS55ID0gLTYzNztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3Quc2Nyb2xsVmlldy5ub2RlLmNoaWxkcmVuWzBdLnkgPSAwLjUgKiB0aGlzLmhlcm9fbGlzdC5zY3JvbGxWaWV3Lm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIFRlbXBEYXRhLnNldERlZmVuc2VUeXBlKDEpO1xyXG4gICAgICAgIHRoaXMuX2N1clR5cGUgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR09CQVRUTEUua2V5KSBhcyBudW1iZXI7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGU7XHJcbiAgICAgICAgdGhpcy5pbml0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrSGVyb0RhdGEgPSBuZXcgcm9sZUdvQmF0dGxlSXRlbVZPO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaXRlbV9tb3ZlX2VuZFwiLCB0aGlzLm9uX21vdmVfaXRlbV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInJlZnJlc2hIZXJvQmF0dGxlXCIsIHRoaXMucmVmcmVzaFBhbmVsLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInJlZnJlc2hCYXR0bGVIZXJvXCIsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm9wZW5fYmF0dGxlX3BhbmVsX3N0YXRlID0gMTtcclxuICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXTtcclxuICAgICAgICBsZXQgY2ZCeUlkID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQoYnVpbGREYXRhLmJ1aWxkSUQpO1xyXG4gICAgICAgIGlmIChjZkJ5SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxMdmwuc3RyaW5nID0gdGhpcy5fY3VyVHlwZSAhPT0gMSA/IFwiXCIgOiBcIkx2LlwiICsgYnVpbGREYXRhLmJ1aWxkTHZsO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJVbmxvY2tOdW0gPSBjZkJ5SWQuY2FwYWNpdHk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5fY3VyVHlwZTogXCIsIHRoaXMuX2N1clR5cGUpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVyb1Bvc05vZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjRkZGOEU4XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1clR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjOTE2ZDg3XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJUeXBlID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiI0U2RDZGRFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmt1YW5nU3ByRnJhbWVMaXN0W3RoaXMuX2N1clR5cGUgLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJVbmxvY2tOdW0gPCBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5fY3VyVHlwZSA9PT0gMiA/IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjNjEzYTU1XCIpIDogdGhpcy5fY3VyVHlwZSA9PT0gMyA/IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjOGQ1Y2QxXCIpIDogY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiNCQUFGOTNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0uY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9Qb3NOb2RlW2ldLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJsZXZlbCBcIiArIHRoaXMuX3RlbXBMb2NrTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9Qb3NOb2RlW2ldLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMsIGkpLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsaWNrTW92ZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFRlbXBEYXRhLmdldEluaXRBbGxIZXJvTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vSGVyb1RpcHMuYWN0aXZlID0gVGVtcERhdGEubG9jYWxIZXJvTGlzdC5sZW5ndGggPD0gMDtcclxuICAgICAgICAgICAgdGhpcy5iYXR0bGVCdG4uaW50ZXJhY3RhYmxlID0gVGVtcERhdGEubG9jYWxIZXJvTGlzdC5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3Q/LnNldERhdGEoVGVtcERhdGEubG9jYWxIZXJvTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGFuZWxVSSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJnVUlOb3JtYWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJnVUlNaUh1YW4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iZ1VJRG9uZ2t1LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmdcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1clR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5iZ1VJTm9ybWFsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJnVUlEb25na3UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1clR5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5iZ1VJTm9ybWFsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJnVUlNaUh1YW4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9tb3ZlX2l0ZW1faGlkZShuZXdUOiBjYy5WZWMyLCBldmVudE51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb1BhcmVuZE5vZGUuX2hpdFRlc3QobmV3VCkgJiYgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0X2JhdHRsZV9oZXJvX2lzX3NwYWNlKCkpIHsgLy8gPz8/XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgcm9sZUdvQmF0dGxlSXRlbVZPO1xyXG4gICAgICAgICAgICBpdGVtLmNlbGxJRCA9IGV2ZW50TnVtO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW2l0ZW0uY2VsbElEXS5pdGVtSUQpO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5pdGVtSUQgPSBoZXJvQ29uZmlnLmhlcm9pZDtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXRlbVR5cGUgPSBoZXJvQ29uZmlnLm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hTdGFydChudW1iZXI6IG51bWJlciwgZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xpY2tNb3ZlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tNb3ZlTm9kZS5wb3NpdGlvbiA9IHRoaXMuY2xpY2tNb3ZlTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5fY2xpY2tIZXJvRGF0YS5pdGVtSUQgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheVtudW1iZXJdLml0ZW1JRDtcclxuICAgICAgICB0aGlzLl9jbGlja0hlcm9EYXRhLmNlbGxJRCA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5W251bWJlcl0uY2VsbElEO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrSGVyb0RhdGEuaXRlbVR5cGUgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheVtudW1iZXJdLml0ZW1UeXBlO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrSGVyb0RhdGEuaHAgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheVtudW1iZXJdLmhwO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrSGVyb0RhdGEubWF4SHAgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheVtudW1iZXJdLm1heEhwO1xyXG4gICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5LnNwbGljZShudW1iZXIsIDEpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b3VjaE1vdmUoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xpY2tNb3ZlTm9kZS5wb3NpdGlvbiA9IHRoaXMuY2xpY2tNb3ZlTm9kZT8ucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2ZW50LmdldExvY2F0aW9uKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hFbmQobnVtYmVyOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXkubGVuZ3RoID4gbnVtYmVyICYmIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5W251bWJlcl0pIHtcclxuICAgICAgICAgICAgY29uc3QgY2VsbElEID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXlbbnVtYmVyXS5jZWxsSUQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JRCA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5W251bWJlcl0uaXRlbUlEO1xyXG4gICAgICAgICAgICBUZW1wRGF0YS5hZGRIZXJvQnlJRChpdGVtSUQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5LnNwbGljZShudW1iZXIsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hDYW5lbChudW06IG51bWJlciwgZXZlbnQ6IGNjLlRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb1BhcmVuZE5vZGUuX2hpdFRlc3QoZXZlbnQuZ2V0TG9jYXRpb24oKSkpIHsgLy8gPz8/XHJcbiAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5fY3VyVW5sb2NrTnVtOyBhKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlcm9Qb3NOb2RlW2FdLl9oaXRUZXN0KGV2ZW50LmdldExvY2F0aW9uKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXkuc3BsaWNlKGEsIDAsIHRoaXMuX2NsaWNrSGVyb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsaWNrSGVyb0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NsaWNrSGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5LnB1c2godGhpcy5fY2xpY2tIZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlja0hlcm9EYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NsaWNrSGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXkuc3BsaWNlKG51bSwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXTtcclxuICAgICAgICBsZXQgYnVpbGRDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZERhdGEuYnVpbGRJRCk7XHJcbiAgICAgICAgaWYgKGJ1aWxkQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clVubG9ja051bSA9IGJ1aWxkQ29uZmlnLmNhcGFjaXR5O1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvQXJyID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXk7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmd1aWRlSUQgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0ucG9zaXRpb24gPSBoZXJvQXJyLmxlbmd0aCA9PSAyID8gdGhpcy5iYXR0bGVCdG4/Lm5vZGUucG9zaXRpb24gOiBjYy52MygtMjM4LCAtNTU2KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jdXJVbmxvY2tOdW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlcm9BcnIubGVuZ3RoID4gaSAmJiBoZXJvQXJyW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaGVyb0FycltpXS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9Qb3NOb2RlW2ldLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvY29sb3JfXCIgKyBoZXJvQ29uZmlnLmx2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9Qb3NOb2RlW2ldLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBoZXJvQ29uZmlnLmhlcm9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL2hlcm8vaGVyb1Bob3RvXCIgKyBoZXJvQ29uZmlnLmx2KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrSGVyb1Bob3RvKHQ6IGFueSwga2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmdldE51bWJlck9mUnVubmluZ0FjdGlvbnMoKSA+IDApIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGtleSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1clVubG9ja051bSA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5ID0gW107XHJcbiAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEub3Blbl9iYXR0bGVfcGFuZWxfc3RhdGUgPSAwO1xyXG4gICAgICAgIGdtLmRhdGEubWFpbF90ZW1wX2RhdGEudGFyZ2V0X3VpZCA9IFwiXCI7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuR09CQVRUTEUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0ZpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSAmJiBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkjDo3kgxJHGsGEgMiBhbmggaMO5bmcgdsOgbyDEkeG7mWkgaMOsbmghISFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEVdLmJ1aWxkU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX2J1aWxkX2xvY2tfbnVtID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfc2hvd19zdGF0ZUljb25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9ndWlkZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlaWQ6IDEzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBndWlkZWRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIjEzLk5o4bqlbiB2w6BvIG7DunQgdOG6pW4gY8O0bmcgdHLDqm4gZ2lhbyBkaeG7h24hISFcIilcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheS5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJzZXRfaXRlbV9iYXR0bGVfaGVyb19vcGVydHlcIiwgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYmF0dGxlX2hlcm9fYXJyYXlbdF0uY2VsbElELCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5vcGVuX2JhdHRsZV9wYW5lbF9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5HT0JBVFRMRSk7XHJcbiAgICAgICAgICAgICAgICBUZW1wRGF0YS5tYXBfdHlwZSA9IHRoaXMuX2N1clR5cGU7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwic2hpcF9wbGF5X2FuaW1cIiwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkjDo3kgxJHGsGEgYW5oIGjDuW5nIHbDoG8gxJHhu5lpIGjDrG5oISEhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5oZXJvUG9zTm9kZS5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9Qb3NOb2RlW3RdLnRhcmdldE9mZih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ20udWkub2ZmKFwiaXRlbV9tb3ZlX2VuZFwiLCB0aGlzLm9uX21vdmVfaXRlbV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJyZWZyZXNoSGVyb0JhdHRsZVwiLCB0aGlzLnJlZnJlc2hQYW5lbCwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwicmVmcmVzaEJhdHRsZUhlcm9cIiwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdvQmF0dGxlT3A7Il19