
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SuperHero.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN1cGVySGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLHlDQUF1RDtBQUN2RCxpQ0FBZ0M7QUFDaEMsK0NBQThDO0FBS3hDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZCLGtDQUFZO0lBQXpDO1FBQUEscUVBNk1DO1FBM01XLFlBQU0sR0FBb0IsSUFBSSxDQUFDO1FBRy9CLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBR2pDLGdCQUFVLEdBQW9CLElBQUksQ0FBQztRQUduQyxrQkFBWSxHQUFtQixJQUFJLENBQUM7UUFHcEMsZ0JBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxpQkFBVyxHQUFxQixJQUFJLENBQUM7UUFFckMsY0FBUSxHQUFzQixJQUFJLENBQUM7UUFDbkMsb0JBQWMsR0FBdUIsSUFBSSxDQUFDO1FBQzFDLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixzQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIscUJBQWUsR0FBVyxDQUFDLENBQUM7O0lBcUt4QyxDQUFDO0lBbktZLGlDQUFRLEdBQWxCO1FBQ0ssSUFBTSxJQUFJLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxH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QUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRSxjQUFjLEdBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQzFFLGFBQUssQ0FBQyxzQkFBc0IsT0FBQyxJQUFJLENBQUMsU0FBUywwQ0FBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVLLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBRTdELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO29CQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLFFB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UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDc0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDdUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDd0I7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDMEI7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDd0I7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDc0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDeUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDeUI7SUFoQzNDLGNBQWM7UUFEbkIsT0FBTztPQUNGLGNBQWMsQ0E2TW5CO0lBQUQscUJBQUM7Q0E3TUQsQUE2TUMsQ0E3TTRCLEVBQUUsQ0FBQyxTQUFTLEdBNk14QztBQUVELGtCQUFlLGNBQWMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBIZXJvVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgU2tpbGxDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9za2lsbCc7XHJcbmltcG9ydCB7IFN1cGVySGVyb1ZPIH0gZnJvbSAnLi9NYXBDZWxsQ2ZnRGF0YSc7XHJcbmltcG9ydCB7IEhlcm9Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9oZXJvJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTdXBlckhlcm9QYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibEx2bDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibE5hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxEZXNjOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBhdHRyTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBza2lsbE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHJlbGl2ZVRpbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0blNraWxsTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgYm90dG9tVGlwczogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaGVyb05vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc3VwZXJIZXJvSHA6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSByZWNlaXZlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfaGVyb0NmZzogSGVyb0NvbmZpZyB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3VwZXJIZXJvRGF0YTogU3VwZXJIZXJvVk8gfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2hlcm9JZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2NlbGxJZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2lzX3Nob3dfcmVjZWl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcmVjaXZlVGltZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3RpbWVyQ29udGFpbmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuU1VQRVJIRVJPT1Aua2V5KTtcclxuICAgICAgICB0aGlzLl9oZXJvSWQgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuX2NlbGxJZCA9IGFyZ3NbMV07XHJcbiAgICAgICAgdGhpcy5faXNfc2hvd19yZWNlaXZlID0gISFhcmdzWzJdO1xyXG4gICAgICAgIHRoaXMuc3VwZXJIZXJvSHAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5oZXJvTm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSAgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMuaGVyb05vZGUpO1xyXG4gICAgICAgIHRoaXMuX2hlcm9DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMuX2hlcm9JZCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9oZXJvQ2ZnKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IDA7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIHRoaXMuX2hlcm9JZCwgTm9kZVBvb2xJdGVtLCAobm9kZVBvb2xJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhlcm9Ob2RlPy5jaGlsZHJlbkNvdW50ID09PSAwICYmIG5vZGVQb29sSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvTm9kZS5hZGRDaGlsZChub2RlUG9vbEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlUG9vbEl0ZW0ubm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5ub2RlLnNjYWxlID0gMS41O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tlbGV0b24gPSBub2RlUG9vbEl0ZW0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChza2VsZXRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrZWxldG9uLnNldFNraW4oXCJmcm9udFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5zZXRBbmltYXRpb24oMCwgXCJzdGF5XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGVQb29sSXRlbSkgZ20ucG9vbC5wdXQobm9kZVBvb2xJdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9oZXJvQ2ZnLmhlcm9fdHlwZSA9PT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbVRpcHMuc3RyaW5nID0gXCJDw7MgdGjhu4Mgc+G7nyBo4buvdSBuaGnhu4F1IGFuaCBow7luZyBjw7luZyBsw7pjLiBDw6FjIGFuaCBow7luZyBnaeG7kW5nIG5oYXUgY8OzIHRo4buDIGjhu6NwIG5o4bqldCAsIMSR4buZdCBwaMOhIGzDqm4gY+G6pXAgY2FvIGjGoW4hXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cGVySGVyb0RhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRTdXBlckhlcm9EYXRhKHRoaXMuX2hlcm9JZCwgdGhpcy5fY2VsbElkKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N1cGVySGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSB0aGlzLl9zdXBlckhlcm9EYXRhLm5leHRSZWxpdmVUaW1lIC0gdGhpcy5fc3VwZXJIZXJvRGF0YS5jdXJSZWxpdmVUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvSHAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbVRpcHMuc3RyaW5nID0gdGhpcy5faGVyb0NmZy5vY2N1cGF0aW9uID09PSAxMiA/IFwiSOG7o3AgbmjhuqV0IMSR4buDIHThuqFvIHJhIG5oaeG7gXUgdGjDoXAgcGjDsm5nIHRo4bunIG3huqFuaCBoxqFuLCBuw6JuZyBjYW8ga2jhuqMgbsSDbmcgYuG6o28gduG7hyFcIiA6IFwiSOG7o3AgbmjhuqV0IMSR4buDIHRyaeG7h3UgaOG7k2kgbmhp4buBdSBUaOG7p3kgVGluaCBMaW5oIGPhuqVwIGNhbyBoxqFuLCBnaWEgY+G7kSBsw6EgY2jhuq9uIGLhuqNvIHbhu4cgdGjDoG5oIHRyw6whXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1cGVySGVyb0RhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRTdXBlckhlcm9EYXRhQnlJRCh0aGlzLl9oZXJvSWQsIHRoaXMuX2NlbGxJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU2tpbGxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzX3Nob3dfcmVjZWl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlX2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYmxMdmwuc3RyaW5nID0gXCJMdi5cIiArIHRoaXMuX2hlcm9DZmcubHY7XHJcbiAgICAgICAgdGhpcy5sYmxOYW1lLnN0cmluZyA9IHRoaXMuX2hlcm9DZmcubmFtZTtcclxuICAgICAgICB0aGlzLmxibERlc2Muc3RyaW5nID0gXCJcIiArIHRoaXMuX2hlcm9DZmcuZGVjO1xyXG5cclxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzOiBudW1iZXJbXSA9IFt0aGlzLl9oZXJvQ2ZnLmhwLCB0aGlzLl9oZXJvQ2ZnLmF0dGFjaywgdGhpcy5faGVyb0NmZy5kZWZlbnNlLCB0aGlzLl9oZXJvQ2ZnLnNwZWVkXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0ck5vZGUuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ck5vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gYXR0cmlidXRlc1tpXSA+IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJOb2RlPy5jaGlsZHJlbltpXS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0ck5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNraWxsTm9kZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbE5vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHNraWxsRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJTa2lsbENvbmZpZ0RhdGFcIiwgdGhpcy5faGVyb0NmZy5za2lsbF9pZCArIFwiXCIsIChpICsgMSkgKyBcIlwiKSBhcyBTa2lsbENvbmZpZztcclxuICAgICAgICAgICAgaWYgKHNraWxsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbE5vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxOb2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsTm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XCJN4bufIGtow7NhIGPhuqVwIFwiKyAoaSArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbE5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnNraWxsTm9kZT8uY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oZXJvU2tpbGwvXCIgKyB0aGlzLl9oZXJvQ2ZnLnNraWxsX2lkICsgXCJfXCIgKyAoaSArIDEpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxOb2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzJdLmNvbG9yID0gY2MuQ29sb3IuR1JBWTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGVyb0NmZy5sdiA+IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsTm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsTm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBza2lsbERhdGEuZGVzYztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsTm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsyXS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuRGVzYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQnRuRGVzYygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5idG5Ta2lsbE5vZGU/LmFjdGl2ZSAmJiB0aGlzLl9zdXBlckhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU2tpbGxOb2RlLmNoaWxkcmVuWzNdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIoSOG7k2kgcGjhu6VjIFwiICsgZ20uY29uc3QuU1VQRVJIRVJPUkVDSVZFSFAgKyBcIiBtw6F1IG3hu5dpIHBow7p0KVwiO1xyXG4gICAgICAgICAgICB0aGlzLnN1cGVySGVyb0hwLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnNjYWxlWCA9IE1hdGgubWluKHRoaXMuX3N1cGVySGVyb0RhdGEuaHAgLyB0aGlzLl9zdXBlckhlcm9EYXRhLm1heEhwLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9IcC5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuX3N1cGVySGVyb0RhdGEuaHAgKyBcIi8gXCIgKyB0aGlzLl9zdXBlckhlcm9EYXRhLm1heEhwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N1cGVySGVyb0RhdGEuaGVyb1N0YXRlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0hwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0hwLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnNjYWxlWCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNraWxsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkjhu5NpIHNpbmggbmdheVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBVdGlscy5mb3JtYXRfdGltZV9taXVudGUodGhpcy5fcmVjaXZlVGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc3VwZXJIZXJvRGF0YS5ocCA8IHRoaXMuX3N1cGVySGVyb0RhdGEubWF4SHApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvSHAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2tpbGxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNraWxsTm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiS2jDtGkgcGjhu6VjIG3DoXVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2tpbGxOb2RlLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXRpbHMuZm9ybWF0X3RpbWVfbWl1bnRlKHRoaXMuX3JlY2l2ZVRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0hwLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNpdmVUaW1lID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lckNvbnRhaW5lciArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aW1lckNvbnRhaW5lciA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lckNvbnRhaW5lci0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZS0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93cmVMaXZlVGltZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd3JlTGl2ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBVdGlscy5mb3JtYXRfdGltZV9taXVudGUodGhpcy5fcmVjaXZlVGltZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1cGVySGVyb0RhdGE/Lmhlcm9TdGF0ZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjaXZlVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBlckhlcm9EYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0U3VwZXJIZXJvRGF0YSh0aGlzLl9oZXJvSWQsIHRoaXMuX2NlbGxJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gdGhpcy5fc3VwZXJIZXJvRGF0YS5uZXh0UmVsaXZlVGltZSAtIHRoaXMuX3N1cGVySGVyb0RhdGEuY3VyUmVsaXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2tpbGxOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blNraWxsTm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi56uL5Y2z5ruh6KGAXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBVdGlscy5mb3JtYXRfdGltZV9taXVudGUodGhpcy5fcmVjaXZlVGltZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdXBlckhlcm9EYXRhPy5oZXJvU3RhdGUgPT0gMCAmJiB0aGlzLl9yZWNpdmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N1cGVySGVyb0RhdGEuaHAgPCB0aGlzLl9zdXBlckhlcm9EYXRhLm1heEhwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBlckhlcm9EYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0U3VwZXJIZXJvRGF0YSh0aGlzLl9oZXJvSWQsIHRoaXMuX2NlbGxJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gdGhpcy5fc3VwZXJIZXJvRGF0YS5uZXh0UmVsaXZlVGltZSAtIHRoaXMuX3N1cGVySGVyb0RhdGEuY3VyUmVsaXZlVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuU2tpbGxOb2RlLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gVXRpbHMuZm9ybWF0X3RpbWVfbWl1bnRlKHRoaXMuX3JlY2l2ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9IcC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5zY2FsZSA9IE1hdGgubWluKHRoaXMuX3N1cGVySGVyb0RhdGEuaHAgLyB0aGlzLl9zdXBlckhlcm9EYXRhLm1heEhwLCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5Ta2lsbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0hwLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN1cGVySGVyb0hwLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fc3VwZXJIZXJvRGF0YS5ocCArIFwiLyBcIiArIHRoaXMuX3N1cGVySGVyb0RhdGEubWF4SHA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25XYXRjaEFkKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLndhdGNoQWRDRCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3YXRjaEFkQ0QoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1cGVySGVyb0RhdGEgJiYgdGhpcy5fc3VwZXJIZXJvRGF0YS5oZXJvU3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRTdXBlckhlcm9GdWxsSHBCeUlEKHRoaXMuX2hlcm9JZCwgdGhpcy5fY2VsbElkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRTdXBlckhlcm9SZWxpdmVCeUlEKHRoaXMuX2hlcm9JZCwgdGhpcy5fY2VsbElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5TVVBFUkhFUk9PUCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN1cGVySGVyb1BhbmVsOyJdfQ==