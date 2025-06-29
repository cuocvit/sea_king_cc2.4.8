"use strict";
cc._RF.push(module, '2d4d7l0Yt1AwYZInJYfyDeL', 'Poseidon');
// start-scene/scripts/Poseidon.ts

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
//
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var ChannelManager_1 = require("./ChannelManager");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Poseidon = /** @class */ (function (_super) {
    __extends(Poseidon, _super);
    function Poseidon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.roleNode = null;
        _this.skillNode = null;
        _this.lblHeroName = null;
        _this.lblSkillName = null;
        _this.lblDesc = null;
        _this.lblNeedNum = null;
        _this.lblOwnNum = null;
        _this.bar = null;
        _this.btnUpgradeLvl = null;
        _this.btnUpgrade = null;
        _this.lockIcon = null;
        _this.maxNode = null;
        _this.handAnim = null;
        _this.upLvHandAnim = null;
        _this._skillCfg = null;
        _this.skillIDList = [];
        _this.heroIDList = [];
        _this._curIndex = 0;
        _this.lastHeroID = 0;
        _this.needNum = 0;
        _this.POSEIDONNUM = 15;
        _this.POSEIDONID = 22001;
        _this.YELLOWCOLOR = cc.Color.BLACK.fromHEX("#FED025");
        return _this;
    }
    Poseidon.prototype.onEnable = function () {
        this.handAnim.active = GameManager_1.gm.data.mapCell_data.is_upgrade_skill == 0;
        this.upLvHandAnim.node.active = false;
        GameManager_1.gm.data.mapCell_data.is_upgrade_skill = 1;
        GameManager_1.gm.data.mapCell_data.async_write_data();
        this.skillIDList = [];
        this._curIndex = 0;
        GameManager_1.gm.ui.on("update_soul_num", this.updateSoulNum, this);
        this._SkillListCfg = GameManager_1.gm.data.config_data.getSkillList();
        for (var t in this._SkillListCfg) {
            if (GameManager_1.gm.data.mapCell_data.getReelUnlcokHeroID(this._SkillListCfg[t][0].heroid)) {
                this.skillIDList.push(parseInt(t));
                this.heroIDList.push(this._SkillListCfg[t][0].heroid);
            }
        }
        this.refreshPanel();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Poseidon.prototype.updateSoulNum = function () {
        var getMySoulNum = GameManager_1.gm.data.mapCell_data.getMySoulNum();
        this.lblOwnNum.string = "Linh hồn hiện có: " + getMySoulNum;
    };
    Poseidon.prototype.refreshPanel = function () {
        var _this = this;
        var _a, _b;
        var skillID = this.skillIDList[this._curIndex];
        var skillData = GameManager_1.gm.data.mapCell_data.getRoleSkillData(skillID);
        this._skillCfg = this._SkillListCfg[skillID][skillData.lvl];
        if (this._skillCfg) {
            if (this.lastHeroID != this._skillCfg.heroid) {
                this.lastHeroID = this._skillCfg.heroid;
                if (this.roleNode.childrenCount >= 0) {
                    GameManager_1.gm.pool.put_children(this.roleNode);
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + this._skillCfg.heroid, NodePoolItem_1.NodePoolItem, function (component) {
                        var _a, _b;
                        if (component) {
                            if (((_a = _this.roleNode) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                                (_b = _this.roleNode) === null || _b === void 0 ? void 0 : _b.addChild(component.node);
                                component.node.setPosition(0, -69, 0);
                                component.node.scale = 1.5;
                                var skeleton = component.getComponent(sp.Skeleton);
                                if (skeleton) {
                                    skeleton.setSkin("front");
                                    skeleton.setAnimation(0, "stay", true);
                                }
                            }
                            else {
                                GameManager_1.gm.pool.put(component.node);
                            }
                        }
                    });
                }
            }
            this.lblHeroName.string = this._skillCfg.name;
            this.lblSkillName.string = "lv." + skillData.lvl;
            this.lblDesc.string = this._skillCfg.desc;
            this.lockIcon.active = skillData.lvl <= 0;
            this.lblDesc.node.color = skillData.lvl <= 0 ? cc.Color.GRAY : this.YELLOWCOLOR;
            this.lblSkillName.node.color = skillData.lvl <= 0 ? cc.Color.GRAY : this.YELLOWCOLOR;
            if (skillData.lvl <= 0) {
                Utils_1.Utils.set_sprite_state(this.skillNode, cc.Sprite.State.GRAY);
            }
            else {
                Utils_1.Utils.set_sprite_state(this.skillNode, cc.Sprite.State.NORMAL);
            }
            Utils_1.Utils.async_set_sprite_frame((_a = this.skillNode) === null || _a === void 0 ? void 0 : _a.getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/heroSkill/" + this._skillCfg.icon);
            this.maxNode.active = this._skillCfg.sea_soul > 0;
            this.needNum = 0;
            if ((_b = this.maxNode) === null || _b === void 0 ? void 0 : _b.active) {
                var mySoulNum = GameManager_1.gm.data.mapCell_data.getMySoulNum();
                this.lblNeedNum.string = "Linh hồn: " + skillData.num + "/" + this._skillCfg.sea_soul;
                this.bar.progress = skillData.num / this._skillCfg.sea_soul;
                this.lblOwnNum.string = "Linh hồn hiện có: " + mySoulNum;
                this.needNum = this._skillCfg.sea_soul - skillData.num;
                this.btnUpgrade.active = false;
                this.btnUpgradeLvl.active = false;
                if (skillData.num >= this._skillCfg.sea_soul) {
                    this.btnUpgradeLvl.active = true;
                }
                else {
                    this.btnUpgrade.active = true;
                }
            }
        }
    };
    Poseidon.prototype.onClickUpgradeLvl = function () {
        var _a;
        var skillID = this.skillIDList[this._curIndex];
        GameManager_1.gm.data.mapCell_data.upgradeRoleSkillData(skillID);
        var heroID = this.heroIDList[this._curIndex];
        var skillData = GameManager_1.gm.data.mapCell_data.getRoleSkillData(skillID);
        if ([31001, 32001, 33001, 34001, 35001, 37001, 38001].includes(heroID)) {
            NetUtils_1.ReportData.instance.report_once_point(heroID + skillData.lvl - 1);
        }
        this.upLvHandAnim.node.active = true;
        (_a = this.upLvHandAnim) === null || _a === void 0 ? void 0 : _a.play();
        this.refreshPanel();
    };
    Poseidon.prototype.onClickAddSoul = function () {
        var _a, _b;
        if (((_a = this.maxNode) === null || _a === void 0 ? void 0 : _a.active) && GameManager_1.gm.data.mapCell_data.getMySoulNum() <= 0) {
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETPOSEIDONOP);
        }
        else {
            this.upLvHandAnim.node.active = true;
            (_b = this.upLvHandAnim) === null || _b === void 0 ? void 0 : _b.play();
            GameManager_1.gm.data.mapCell_data.addRoleSkillItemData(this.skillIDList[this._curIndex], this.needNum);
            this.handAnim.active = false;
            this.refreshPanel();
        }
    };
    Poseidon.prototype.onClickLeft = function () {
        this._curIndex = this._curIndex == 0 ? this.skillIDList.length - 1 : this._curIndex - 1;
        this.refreshPanel();
    };
    Poseidon.prototype.onClickRight = function () {
        this._curIndex = this._curIndex == this.skillIDList.length - 1 ? 0 : this._curIndex + 1;
        this.refreshPanel();
    };
    Poseidon.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.POSEIDON);
    };
    Poseidon.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("update_soul_num", this.updateSoulNum, this);
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "roleNode", void 0);
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "skillNode", void 0);
    __decorate([
        property(cc.Label)
    ], Poseidon.prototype, "lblHeroName", void 0);
    __decorate([
        property(cc.Label)
    ], Poseidon.prototype, "lblSkillName", void 0);
    __decorate([
        property(cc.Label)
    ], Poseidon.prototype, "lblDesc", void 0);
    __decorate([
        property(cc.Label)
    ], Poseidon.prototype, "lblNeedNum", void 0);
    __decorate([
        property(cc.Label)
    ], Poseidon.prototype, "lblOwnNum", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Poseidon.prototype, "bar", void 0);
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "btnUpgradeLvl", void 0);
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "btnUpgrade", void 0);
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "lockIcon", void 0);
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "maxNode", void 0);
    __decorate([
        property(cc.Node)
    ], Poseidon.prototype, "handAnim", void 0);
    __decorate([
        property(cc.Animation)
    ], Poseidon.prototype, "upLvHandAnim", void 0);
    Poseidon = __decorate([
        ccclass
    ], Poseidon);
    return Poseidon;
}(cc.Component));
exports.default = Poseidon;

cc._RF.pop();