"use strict";
cc._RF.push(module, '51e03C8t21FFKdn5x35vdGp', 'BarracksItem');
// buildFunction/scripts/BarracksItem.ts

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
exports.BarracksItem = void 0;
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BarracksItem = /** @class */ (function (_super) {
    __extends(BarracksItem, _super);
    function BarracksItem() {
        var _this = _super.call(this) || this;
        _this.shade_node = null;
        _this.lock_node = null;
        _this.unlock_level_lbl = null;
        _this.unlock_node = null;
        _this.hero_sprite = null;
        _this.left_item_sprite = null;
        _this.right_item_sprite = null;
        _this.hero_color_sprite = null;
        _this.hero_profession_sprite = null;
        _this.hero_profession2_sprite = null;
        _this.hero_name_lbl = null;
        _this.heroStarNode = null;
        _this.heroAtrrNode = null;
        _this.upstarNode = null;
        _this.btnUpstarNode = null;
        _this.needHeroIcon = null;
        _this.needHeroIconBg = null;
        _this.needLbl = null;
        _this.sprList = [];
        _this._data = null;
        _this._isCenter = false;
        _this._curIndex = 0;
        return _this;
    }
    BarracksItem.prototype.update_view = function (heroId, isCenter, curIndex) {
        if (GameManager_1.gm.data.mapCell_data.barracks_unlock_data[curIndex].ani_state === 0 &&
            GameManager_1.gm.data.mapCell_data.barracks_unlock_data[curIndex].state === 1) {
            GameManager_1.gm.data.mapCell_data.barracks_unlock_data[curIndex].ani_state = 1;
            GameManager_1.gm.data.mapCell_data.async_write_data();
            this.node.getComponent(cc.Animation).play();
        }
        this._isCenter = isCenter;
        this._curIndex = curIndex;
        var heroData = GameManager_1.gm.config.get_row_data("HeroConfigData", heroId.toString());
        if (!heroData)
            return;
        this._data = heroData;
        Utils_1.Utils.async_set_sprite_frame(this.left_item_sprite, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + heroData.itemType[0]);
        Utils_1.Utils.async_set_sprite_frame(this.right_item_sprite, Constants_1.BundleName.MAP, "res/" + heroData.itemType[1]);
        this.hero_name_lbl.string = heroData.name;
        Utils_1.Utils.async_set_sprite_frame(this.hero_color_sprite, Constants_1.BundleName.COMMON, "res/circleColor_" + heroData.color);
        Utils_1.Utils.async_set_sprite_frame(this.hero_sprite, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + heroData.heroid);
        this.shade_node.active = isCenter;
        if (heroData.occupation <= 6) {
            this.hero_profession_sprite.node.active = true;
            if (heroData.occupation > 3) {
                this.hero_profession2_sprite.node.active = true;
                Utils_1.Utils.async_set_sprite_frame(this.hero_profession_sprite, Constants_1.BundleName.BUILD_FUNCTION, "res/1");
                Utils_1.Utils.async_set_sprite_frame(this.hero_profession2_sprite, Constants_1.BundleName.BUILD_FUNCTION, "res/2");
            }
            else {
                Utils_1.Utils.async_set_sprite_frame(this.hero_profession_sprite, Constants_1.BundleName.BUILD_FUNCTION, "res/" + heroData.occupation);
                this.hero_profession2_sprite.node.active = false;
            }
        }
        else {
            this.hero_profession_sprite.node.active = false;
            this.hero_profession2_sprite.node.active = false;
        }
        Utils_1.Utils.set_sprite_state(this.left_item_sprite.node, cc.Sprite.State.NORMAL);
        Utils_1.Utils.set_sprite_state(this.right_item_sprite.node, cc.Sprite.State.NORMAL);
        if (GameManager_1.gm.data.mapCell_data.barracks_unlock_data[this._curIndex].state <= 0) {
            this.lock_node.active = true;
            this.unlock_node.active = false;
            this.unlock_level_lbl.node.active = true;
            this.unlock_level_lbl.string = "LEVEL " + heroData.barracks;
            Utils_1.Utils.set_sprite_state(this.hero_color_sprite.node, cc.Sprite.State.GRAY);
            Utils_1.Utils.set_sprite_state(this.left_item_sprite.node, cc.Sprite.State.GRAY);
            Utils_1.Utils.set_sprite_state(this.right_item_sprite.node, cc.Sprite.State.GRAY);
        }
        else {
            Utils_1.Utils.set_sprite_state(this.hero_color_sprite.node, cc.Sprite.State.NORMAL);
            this.lock_node.active = false;
            this.unlock_node.active = true;
            this.upstarNode.active = false;
            var heroStarData = GameManager_1.gm.data.hero_star_data.getHeroStarData(heroData.arms);
            if (heroStarData) {
                this.upstarNode.active = true;
                var nextHeroData = GameManager_1.gm.config.get_row_data("HeroConfigData", heroStarData.nextNeedItem.toString());
                if (nextHeroData) {
                    Utils_1.Utils.async_set_sprite_frame(this.needHeroIconBg, Constants_1.BundleName.COMMON, "res/circleColor_" + nextHeroData.color);
                    Utils_1.Utils.async_set_sprite_frame(this.needHeroIcon, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + nextHeroData.icon);
                }
                for (var r = 0; r < this.heroStarNode.childrenCount; r++) {
                    this.heroStarNode.children[r].getComponent(cc.Sprite).spriteFrame = heroStarData.star > r ? this.sprList[0] : this.sprList[1];
                }
                var starHeroNum = GameManager_1.gm.data.mapCell_data.getStarHeroNumByID(heroStarData.nextNeedItem);
                this.needLbl.string = starHeroNum + "/" + heroStarData.nextNeedNum;
                this.needLbl.node.color = starHeroNum >= heroStarData.nextNeedNum ? cc.Color.GREEN : cc.Color.RED;
                var attributeKeys = ["Perk_HP", "Perk_Attackers", "Perk_Defense", "Perk_Time"];
                var attributeNames = ["Sinh mạng", "Tấn công", "Phòng thủ", "Tốc độ"];
                var currentAttributes = [
                    100 * heroStarData.hp,
                    100 * heroStarData.attack,
                    heroStarData.defense,
                    heroStarData.speed
                ];
                var upgradedAttributes = currentAttributes;
                this.btnUpstarNode.active = heroStarData.nextNeedItem > 0 && heroStarData.nextNeedNum > 0;
                if (this.btnUpstarNode.active) {
                    var nextStarData = GameManager_1.gm.config.get_row_data("StarConfigData", heroStarData.arms.toString(), (heroStarData.star + 1).toString());
                    if (nextStarData) {
                        upgradedAttributes = [100 * nextStarData.hp, 100 * nextStarData.attack, nextStarData.defense, nextStarData.speed];
                    }
                }
                for (var r = 0; r < this.heroAtrrNode.childrenCount; r++) {
                    var attrNode = this.heroAtrrNode.children[r];
                    if (r != 3) {
                        Utils_1.Utils.async_set_sprite_frame(attrNode.children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/attrIcon/" + attributeKeys[r]);
                        attrNode.children[1].getComponent(cc.Label).string = attributeNames[r];
                        attrNode.children[2].getComponent(cc.Label).string = upgradedAttributes[r] + "%";
                        attrNode.children[3].active = currentAttributes[r] < upgradedAttributes[r];
                    }
                    else {
                        attrNode.active = false;
                    }
                }
            }
        }
    };
    BarracksItem.prototype.onClickUpgrade = function () {
        var heroStarData = GameManager_1.gm.data.hero_star_data.getHeroStarData(this._data.arms);
        if (!heroStarData)
            return;
        if (GameManager_1.gm.data.mapCell_data.getStarHeroNumByID(heroStarData.nextNeedItem) < heroStarData.nextNeedNum) {
            GameManager_1.gm.ui.show_notice("Không đủ anh hùng!!!");
        }
        else {
            GameManager_1.gm.data.mapCell_data.delStarHeroNumByID(heroStarData.nextNeedItem, heroStarData.nextNeedNum);
            GameManager_1.gm.data.hero_star_data.upgradeHeroStar(this._data.arms);
            this.update_view(this._data.heroid, this._isCenter, this._curIndex);
        }
    };
    BarracksItem.prototype.onClickBook = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_HERO_DETAIL.key, [this._data.heroid]);
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_HERO_DETAIL);
    };
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "shade_node", void 0);
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "lock_node", void 0);
    __decorate([
        property(cc.Label)
    ], BarracksItem.prototype, "unlock_level_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "unlock_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "hero_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "left_item_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "right_item_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "hero_color_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "hero_profession_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "hero_profession2_sprite", void 0);
    __decorate([
        property(cc.Label)
    ], BarracksItem.prototype, "hero_name_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "heroStarNode", void 0);
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "heroAtrrNode", void 0);
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "upstarNode", void 0);
    __decorate([
        property(cc.Node)
    ], BarracksItem.prototype, "btnUpstarNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "needHeroIcon", void 0);
    __decorate([
        property(cc.Sprite)
    ], BarracksItem.prototype, "needHeroIconBg", void 0);
    __decorate([
        property(cc.Label)
    ], BarracksItem.prototype, "needLbl", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BarracksItem.prototype, "sprList", void 0);
    BarracksItem = __decorate([
        ccclass
    ], BarracksItem);
    return BarracksItem;
}(cc.Component));
exports.BarracksItem = BarracksItem;

cc._RF.pop();