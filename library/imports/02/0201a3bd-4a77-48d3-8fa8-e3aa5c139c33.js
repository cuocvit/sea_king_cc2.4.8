"use strict";
cc._RF.push(module, '0201aO9SndI04+o46pcE5wz', 'SuperHero');
// start-scene/scripts/SuperHero.ts

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
var Utils_1 = require("./Utils");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SuperHeroPanel = /** @class */ (function (_super) {
    __extends(SuperHeroPanel, _super);
    function SuperHeroPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblLvl = null;
        _this.lblName = null;
        _this.lblDesc = null;
        _this.attrNode = null;
        _this.skillNode = null;
        _this.reliveTime = null;
        _this.btnSkillNode = null;
        _this.bottomTips = null;
        _this.heroNode = null;
        _this.superHeroHp = null;
        _this.receive_btn = null;
        _this._heroCfg = null;
        _this._superHeroData = null;
        _this._heroId = 0;
        _this._cellId = 0;
        _this._is_show_receive = false;
        _this._reciveTime = 0;
        _this._timerContainer = 0;
        return _this;
    }
    SuperHeroPanel.prototype.onEnable = function () {
        var args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.SUPERHEROOP.key);
        this._heroId = args[0];
        this._cellId = args[1];
        this._is_show_receive = !!args[2];
        this.superHeroHp.active = false;
        this.refreshPanel();
    };
    SuperHeroPanel.prototype.onDisable = function () {
        GameManager_1.gm.pool.put_children(this.heroNode);
    };
    SuperHeroPanel.prototype.refreshPanel = function () {
        var _this = this;
        var _a, _b;
        GameManager_1.gm.pool.put_children(this.heroNode);
        this._heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this._heroId);
        if (!this._heroCfg)
            return;
        this._reciveTime = 0;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + this._heroId, NodePoolItem_1.NodePoolItem, function (nodePoolItem) {
            var _a;
            if (((_a = _this.heroNode) === null || _a === void 0 ? void 0 : _a.childrenCount) === 0 && nodePoolItem) {
                _this.heroNode.addChild(nodePoolItem.node);
                nodePoolItem.node.setPosition(0, 0);
                nodePoolItem.node.scale = 1.5;
                var skeleton = nodePoolItem.getComponent(sp.Skeleton);
                if (skeleton) {
                    skeleton.setSkin("front");
                    skeleton.setAnimation(0, "stay", true);
                }
            }
            else {
                if (nodePoolItem)
                    GameManager_1.gm.pool.put(nodePoolItem.node);
            }
        });
        if (this._heroCfg.hero_type === Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
            this.bottomTips.string = "Có thể sở hữu nhiều anh hùng cùng lúc. Các anh hùng giống nhau có thể hợp nhất , đột phá lên cấp cao hơn!";
            this._superHeroData = GameManager_1.gm.data.mapCell_data.getSuperHeroData(this._heroId, this._cellId);
            if (this._superHeroData) {
                this._reciveTime = this._superHeroData.nextReliveTime - this._superHeroData.curReliveTime;
            }
            this.superHeroHp.active = true;
            this.btnSkillNode.active = true;
        }
        else {
            this.bottomTips.string = this._heroCfg.occupation === 12 ? "Hợp nhất để tạo ra nhiều tháp phòng thủ mạnh hơn, nâng cao khả năng bảo vệ!" : "Hợp nhất để triệu hồi nhiều Thủy Tinh Linh cấp cao hơn, gia cố lá chắn bảo vệ thành trì!";
            this._superHeroData = GameManager_1.gm.data.mapCell_data.getSuperHeroDataByID(this._heroId, this._cellId);
            this.btnSkillNode.active = false;
        }
        if (this._is_show_receive) {
            this.receive_btn.node.active = true;
            this.btnSkillNode.active = false;
        }
        else {
            this.receive_btn.node.active = false;
        }
        this.lblLvl.string = "Lv." + this._heroCfg.lv;
        this.lblName.string = this._heroCfg.name;
        this.lblDesc.string = "" + this._heroCfg.dec;
        var attributes = [this._heroCfg.hp, this._heroCfg.attack, this._heroCfg.defense, this._heroCfg.speed];
        for (var i = 0; i < this.attrNode.childrenCount; i++) {
            this.attrNode.children[i].active = attributes[i] > 0;
            if ((_a = this.attrNode) === null || _a === void 0 ? void 0 : _a.children[i].active) {
                this.attrNode.children[i].children[1].getComponent(cc.Label).string = "" + attributes[i];
            }
        }
        for (var i = 0; i < this.skillNode.childrenCount; i++) {
            this.skillNode.children[i].active = false;
            var skillData = GameManager_1.gm.config.get_row_data("SkillConfigData", this._heroCfg.skill_id + "", (i + 1) + "");
            if (skillData) {
                this.skillNode.children[i].active = true;
                this.skillNode.children[i].children[0].active = true;
                this.skillNode.children[i].children[0].children[0].getComponent(cc.Label).string = "Mở khóa cấp " + (i + 1);
                this.skillNode.children[i].children[1].getComponent(cc.Label).string = "";
                Utils_1.Utils.async_set_sprite_frame((_b = this.skillNode) === null || _b === void 0 ? void 0 : _b.children[i].children[2].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/heroSkill/" + this._heroCfg.skill_id + "_" + (i + 1));
                this.skillNode.children[i].children[2].color = cc.Color.GRAY;
                if (this._heroCfg.lv > i) {
                    this.skillNode.children[i].children[0].active = false;
                    this.skillNode.children[i].children[1].getComponent(cc.Label).string = "" + skillData.desc;
                    this.skillNode.children[i].children[2].color = cc.Color.WHITE;
                }
            }
        }
        this.updateBtnDesc();
    };
    SuperHeroPanel.prototype.updateBtnDesc = function () {
        var _a;
        if (((_a = this.btnSkillNode) === null || _a === void 0 ? void 0 : _a.active) && this._superHeroData) {
            this.btnSkillNode.children[3].getComponent(cc.Label).string = "(Hồi phục " + GameManager_1.gm.const.SUPERHERORECIVEHP + " máu mỗi phút)";
            this.superHeroHp.children[0].children[0].scaleX = Math.min(this._superHeroData.hp / this._superHeroData.maxHp, 1);
            this.superHeroHp.children[1].getComponent(cc.Label).string = this._superHeroData.hp + "/ " + this._superHeroData.maxHp;
            if (this._superHeroData.heroState === 1) {
                this.superHeroHp.active = true;
                this.superHeroHp.children[0].children[0].scaleX = 0;
                this.btnSkillNode.active = true;
                this.btnSkillNode.children[1].getComponent(cc.Label).string = "Hồi sinh ngay";
                this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils_1.Utils.format_time_miunte(this._reciveTime);
            }
            else if (this._superHeroData.hp < this._superHeroData.maxHp) {
                this.superHeroHp.active = true;
                this.btnSkillNode.active = true;
                this.btnSkillNode.children[1].getComponent(cc.Label).string = "Khôi phục máu";
                this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils_1.Utils.format_time_miunte(this._reciveTime);
            }
            else {
                this.btnSkillNode.active = false;
                this.superHeroHp.children[0].children[0].scaleX = 1;
            }
        }
    };
    SuperHeroPanel.prototype.update = function (deltaTime) {
        if (this._reciveTime > 0) {
            this._timerContainer += deltaTime;
            if (this._timerContainer >= 1) {
                this._timerContainer--;
                this._reciveTime--;
                this.showreLiveTime();
            }
        }
    };
    SuperHeroPanel.prototype.showreLiveTime = function () {
        var _a, _b;
        this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils_1.Utils.format_time_miunte(this._reciveTime);
        if (((_a = this._superHeroData) === null || _a === void 0 ? void 0 : _a.heroState) === 1) {
            if (this._reciveTime <= 0) {
                this._superHeroData = GameManager_1.gm.data.mapCell_data.getSuperHeroData(this._heroId, this._cellId);
                this._reciveTime = this._superHeroData.nextReliveTime - this._superHeroData.curReliveTime;
                this.btnSkillNode.active = true;
                this.btnSkillNode.children[1].getComponent(cc.Label).string = "立即满血";
            }
            this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils_1.Utils.format_time_miunte(this._reciveTime);
        }
        else if (((_b = this._superHeroData) === null || _b === void 0 ? void 0 : _b.heroState) == 0 && this._reciveTime <= 0) {
            if (this._superHeroData.hp < this._superHeroData.maxHp) {
                this._superHeroData = GameManager_1.gm.data.mapCell_data.getSuperHeroData(this._heroId, this._cellId);
                this._reciveTime = this._superHeroData.nextReliveTime - this._superHeroData.curReliveTime;
                this.btnSkillNode.children[2].getComponent(cc.Label).string = Utils_1.Utils.format_time_miunte(this._reciveTime);
                this.superHeroHp.children[0].children[0].scale = Math.min(this._superHeroData.hp / this._superHeroData.maxHp, 1);
            }
            else {
                this._reciveTime = 0;
                this.btnSkillNode.active = false;
                this.superHeroHp.children[0].children[0].scale = 1;
            }
            this.superHeroHp.children[1].getComponent(cc.Label).string = this._superHeroData.hp + "/ " + this._superHeroData.maxHp;
        }
    };
    SuperHeroPanel.prototype.onWatchAd = function () {
        GameManager_1.gm.channel.show_video_ad(this.watchAdCD, this);
    };
    SuperHeroPanel.prototype.watchAdCD = function () {
        if (this._superHeroData && this._superHeroData.heroState == 0) {
            GameManager_1.gm.data.mapCell_data.setSuperHeroFullHpByID(this._heroId, this._cellId);
        }
        else {
            GameManager_1.gm.data.mapCell_data.setSuperHeroReliveByID(this._heroId, this._cellId);
        }
        this.refreshPanel();
    };
    SuperHeroPanel.prototype.onClosePanel = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.SUPERHEROOP);
    };
    __decorate([
        property(cc.Label)
    ], SuperHeroPanel.prototype, "lblLvl", void 0);
    __decorate([
        property(cc.Label)
    ], SuperHeroPanel.prototype, "lblName", void 0);
    __decorate([
        property(cc.Label)
    ], SuperHeroPanel.prototype, "lblDesc", void 0);
    __decorate([
        property(cc.Node)
    ], SuperHeroPanel.prototype, "attrNode", void 0);
    __decorate([
        property(cc.Node)
    ], SuperHeroPanel.prototype, "skillNode", void 0);
    __decorate([
        property(cc.Label)
    ], SuperHeroPanel.prototype, "reliveTime", void 0);
    __decorate([
        property(cc.Node)
    ], SuperHeroPanel.prototype, "btnSkillNode", void 0);
    __decorate([
        property(cc.Label)
    ], SuperHeroPanel.prototype, "bottomTips", void 0);
    __decorate([
        property(cc.Node)
    ], SuperHeroPanel.prototype, "heroNode", void 0);
    __decorate([
        property(cc.Node)
    ], SuperHeroPanel.prototype, "superHeroHp", void 0);
    __decorate([
        property(cc.Button)
    ], SuperHeroPanel.prototype, "receive_btn", void 0);
    SuperHeroPanel = __decorate([
        ccclass
    ], SuperHeroPanel);
    return SuperHeroPanel;
}(cc.Component));
exports.default = SuperHeroPanel;

cc._RF.pop();