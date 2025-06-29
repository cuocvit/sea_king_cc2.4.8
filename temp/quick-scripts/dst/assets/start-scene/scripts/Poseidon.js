
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Poseidon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFBvc2VpZG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEVBQUU7QUFDRixpQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ3pDLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFDOUMsbURBQWtEO0FBQ2xELHVDQUF3QztBQUdsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qiw0QkFBWTtJQUFuQztRQUFBLHFFQStMQztRQTdMVyxjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQW1CLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFvQixJQUFJLENBQUM7UUFHcEMsa0JBQVksR0FBb0IsSUFBSSxDQUFDO1FBR3JDLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGdCQUFVLEdBQW9CLElBQUksQ0FBQztRQUduQyxlQUFTLEdBQW9CLElBQUksQ0FBQztRQUdsQyxTQUFHLEdBQTBCLElBQUksQ0FBQztRQUdsQyxtQkFBYSxHQUFtQixJQUFJLENBQUM7UUFHckMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBR2xDLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQXdCLElBQUksQ0FBQztRQUd6QyxlQUFTLEdBQXVCLElBQUksQ0FBQztRQUNyQyxpQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUMzQixnQkFBVSxHQUFhLEVBQUUsQ0FBQztRQUMxQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsaUJBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsZ0JB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Q3FCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ3dCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ3VCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7eUNBQ2lCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQzJCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ3dCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ3NCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ3FCO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ3NCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7a0RBQzBCO0lBekMvQyxRQUFRO1FBRGIsT0FBTztPQUNGLFFBQVEsQ0ErTGI7SUFBRCxlQUFDO0NBL0xELEFBK0xDLENBL0xzQixFQUFFLENBQUMsU0FBUyxHQStMbEM7QUFFRCxrQkFBZSxRQUFRLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IEJBTk5FUl9BRF9UWVBFIH0gZnJvbSAnLi9DaGFubmVsTWFuYWdlcic7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgU2tpbGxDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9za2lsbCc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgUG9zZWlkb24gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJvbGVOb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNraWxsTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsSGVyb05hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxTa2lsbE5hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxEZXNjOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsTmVlZE51bTogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibE93bk51bTogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcml2YXRlIGJhcjogY2MuUHJvZ3Jlc3NCYXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuVXBncmFkZUx2bDogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5VcGdyYWRlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGxvY2tJY29uOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1heE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaGFuZEFuaW06IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQW5pbWF0aW9uKVxyXG4gICAgcHJpdmF0ZSB1cEx2SGFuZEFuaW06IGNjLkFuaW1hdGlvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX1NraWxsTGlzdENmZzogUmVjb3JkPHN0cmluZywgU2tpbGxDb25maWdbXT47XHJcbiAgICBwcml2YXRlIF9za2lsbENmZzogU2tpbGxDb25maWcgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgc2tpbGxJRExpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIGhlcm9JRExpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIF9jdXJJbmRleDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgbGFzdEhlcm9JRDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgbmVlZE51bTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgUE9TRUlET05OVU06IG51bWJlciA9IDE1O1xyXG4gICAgcHJpdmF0ZSBQT1NFSURPTklEOiBudW1iZXIgPSAyMjAwMTtcclxuICAgIHByaXZhdGUgWUVMTE9XQ09MT1I6IGNjLkNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiNGRUQwMjVcIik7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNfdXBncmFkZV9za2lsbCA9PSAwO1xyXG4gICAgICAgIHRoaXMudXBMdkhhbmRBbmltLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNfdXBncmFkZV9za2lsbCA9IDE7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxJRExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9jdXJJbmRleCA9IDA7XHJcbiAgICAgICAgZ20udWkub24oXCJ1cGRhdGVfc291bF9udW1cIiwgdGhpcy51cGRhdGVTb3VsTnVtLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9Ta2lsbExpc3RDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFNraWxsTGlzdCgpO1xyXG4gICAgICAgIGZvciAobGV0IHQgaW4gdGhpcy5fU2tpbGxMaXN0Q2ZnKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRSZWVsVW5sY29rSGVyb0lEKHRoaXMuX1NraWxsTGlzdENmZ1t0XVswXS5oZXJvaWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsSURMaXN0LnB1c2gocGFyc2VJbnQodCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvSURMaXN0LnB1c2godGhpcy5fU2tpbGxMaXN0Q2ZnW3RdWzBdLmhlcm9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnNob3dfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTb3VsTnVtKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGdldE15U291bE51bTogbnVtYmVyID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TXlTb3VsTnVtKCk7XHJcbiAgICAgICAgdGhpcy5sYmxPd25OdW0uc3RyaW5nID0gXCJMaW5oIGjhu5NuIGhp4buHbiBjw7M6IFwiICsgZ2V0TXlTb3VsTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNraWxsSUQ6IG51bWJlciA9IHRoaXMuc2tpbGxJRExpc3RbdGhpcy5fY3VySW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IHNraWxsRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFJvbGVTa2lsbERhdGEoc2tpbGxJRCk7XHJcbiAgICAgICAgdGhpcy5fc2tpbGxDZmcgPSB0aGlzLl9Ta2lsbExpc3RDZmdbc2tpbGxJRF1bc2tpbGxEYXRhLmx2bF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9za2lsbENmZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYXN0SGVyb0lEICE9IHRoaXMuX3NraWxsQ2ZnLmhlcm9pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0SGVyb0lEID0gdGhpcy5fc2tpbGxDZmcuaGVyb2lkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVOb2RlLmNoaWxkcmVuQ291bnQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMucm9sZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyB0aGlzLl9za2lsbENmZy5oZXJvaWQsIE5vZGVQb29sSXRlbSwgKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlTm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlTm9kZT8uYWRkQ2hpbGQoY29tcG9uZW50Lm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5ub2RlLnNldFBvc2l0aW9uKDAsIC02OSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lm5vZGUuc2NhbGUgPSAxLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2tlbGV0b24gPSBjb21wb25lbnQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tlbGV0b24uc2V0U2tpbihcImZyb250XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5zZXRBbmltYXRpb24oMCwgXCJzdGF5XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoY29tcG9uZW50Lm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubGJsSGVyb05hbWUuc3RyaW5nID0gdGhpcy5fc2tpbGxDZmcubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5sYmxTa2lsbE5hbWUuc3RyaW5nID0gXCJsdi5cIiArIHNraWxsRGF0YS5sdmw7XHJcbiAgICAgICAgICAgIHRoaXMubGJsRGVzYy5zdHJpbmcgPSB0aGlzLl9za2lsbENmZy5kZXNjO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tJY29uLmFjdGl2ZSA9IHNraWxsRGF0YS5sdmwgPD0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGJsRGVzYy5ub2RlLmNvbG9yID0gc2tpbGxEYXRhLmx2bCA8PSAwID8gY2MuQ29sb3IuR1JBWSA6IHRoaXMuWUVMTE9XQ09MT1I7XHJcbiAgICAgICAgICAgIHRoaXMubGJsU2tpbGxOYW1lLm5vZGUuY29sb3IgPSBza2lsbERhdGEubHZsIDw9IDAgPyBjYy5Db2xvci5HUkFZIDogdGhpcy5ZRUxMT1dDT0xPUjtcclxuXHJcbiAgICAgICAgICAgIGlmIChza2lsbERhdGEubHZsIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5za2lsbE5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5za2lsbE5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5OT1JNQUwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuc2tpbGxOb2RlPy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hlcm9Ta2lsbC9cIiArIHRoaXMuX3NraWxsQ2ZnLmljb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tYXhOb2RlLmFjdGl2ZSA9IHRoaXMuX3NraWxsQ2ZnLnNlYV9zb3VsID4gMDtcclxuICAgICAgICAgICAgdGhpcy5uZWVkTnVtID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1heE5vZGU/LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXlTb3VsTnVtOiBudW1iZXIgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRNeVNvdWxOdW0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGJsTmVlZE51bS5zdHJpbmcgPSBcIkxpbmggaOG7k246IFwiICsgc2tpbGxEYXRhLm51bSArIFwiL1wiICsgdGhpcy5fc2tpbGxDZmcuc2VhX3NvdWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhci5wcm9ncmVzcyA9IHNraWxsRGF0YS5udW0gLyB0aGlzLl9za2lsbENmZy5zZWFfc291bDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGJsT3duTnVtLnN0cmluZyA9IFwiTGluaCBo4buTbiBoaeG7h24gY8OzOiBcIiArIG15U291bE51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVlZE51bSA9IHRoaXMuX3NraWxsQ2ZnLnNlYV9zb3VsIC0gc2tpbGxEYXRhLm51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuVXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuVXBncmFkZUx2bC5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxEYXRhLm51bSA+PSB0aGlzLl9za2lsbENmZy5zZWFfc291bCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuVXBncmFkZUx2bC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0blVwZ3JhZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tVcGdyYWRlTHZsKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNraWxsSUQ6IG51bWJlciA9IHRoaXMuc2tpbGxJRExpc3RbdGhpcy5fY3VySW5kZXhdO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnVwZ3JhZGVSb2xlU2tpbGxEYXRhKHNraWxsSUQpO1xyXG5cclxuICAgICAgICBjb25zdCBoZXJvSUQ6IG51bWJlciA9IHRoaXMuaGVyb0lETGlzdFt0aGlzLl9jdXJJbmRleF07XHJcbiAgICAgICAgY29uc3Qgc2tpbGxEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0Um9sZVNraWxsRGF0YShza2lsbElEKTtcclxuXHJcbiAgICAgICAgaWYgKFszMTAwMSwgMzIwMDEsIDMzMDAxLCAzNDAwMSwgMzUwMDEsIDM3MDAxLCAzODAwMV0uaW5jbHVkZXMoaGVyb0lEKSkge1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KGhlcm9JRCArIHNraWxsRGF0YS5sdmwgLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBMdkhhbmRBbmltLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwTHZIYW5kQW5pbT8ucGxheSgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQWRkU291bCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5tYXhOb2RlPy5hY3RpdmUgJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TXlTb3VsTnVtKCkgPD0gMCkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRQT1NFSURPTk9QKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwTHZIYW5kQW5pbS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBMdkhhbmRBbmltPy5wbGF5KCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFJvbGVTa2lsbEl0ZW1EYXRhKHRoaXMuc2tpbGxJRExpc3RbdGhpcy5fY3VySW5kZXhdLCB0aGlzLm5lZWROdW0pO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tMZWZ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2N1ckluZGV4ID0gdGhpcy5fY3VySW5kZXggPT0gMCA/IHRoaXMuc2tpbGxJRExpc3QubGVuZ3RoIC0gMSA6IHRoaXMuX2N1ckluZGV4IC0gMTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1JpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2N1ckluZGV4ID0gdGhpcy5fY3VySW5kZXggPT0gdGhpcy5za2lsbElETGlzdC5sZW5ndGggLSAxID8gMCA6IHRoaXMuX2N1ckluZGV4ICsgMTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LlBPU0VJRE9OKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm9mZihcInVwZGF0ZV9zb3VsX251bVwiLCB0aGlzLnVwZGF0ZVNvdWxOdW0sIHRoaXMpO1xyXG4gICAgICAgIGdtLmNoYW5uZWwuaGlkZV9iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUG9zZWlkb247Il19