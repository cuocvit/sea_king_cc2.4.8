"use strict";
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