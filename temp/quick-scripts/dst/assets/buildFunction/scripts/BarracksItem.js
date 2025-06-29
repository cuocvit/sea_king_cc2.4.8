
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/buildFunction/scripts/BarracksItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYnVpbGRGdW5jdGlvblxcc2NyaXB0c1xcQmFycmFja3NJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpRUFBaUU7QUFDakUscUVBQTJEO0FBQzNELHlEQUF3RDtBQUVsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrQyxnQ0FBWTtJQThEMUM7UUFBQSxZQUNJLGlCQUFPLFNBSVY7UUFqRU8sZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixzQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFHbEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBR25DLHVCQUFpQixHQUFjLElBQUksQ0FBQztRQUdwQyx1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsNEJBQXNCLEdBQWMsSUFBSSxDQUFDO1FBR3pDLDZCQUF1QixHQUFjLElBQUksQ0FBQztRQUcxQyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixvQkFBYyxHQUFjLElBQUksQ0FBQztRQUdqQyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGFBQU8sR0FBcUIsRUFBRSxDQUFDO1FBUW5DLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRU0sa0NBQVcsR0FBbEIsVUFBbUIsTUFBYyxFQUFFLFFBQWlCLEVBQUUsUUFBZ0I7UUFDbEUsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUM7WUFDbkUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQ2pFO1lBQ0UsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBTSxRQUFRLEdBQUcsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBZSxDQUFDO1FBQzNGLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUN0QixhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwSCxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHNCQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMxQyxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RyxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBRWxDLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQy9DLElBQUksUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDaEQsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxzQkFBVSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDOUYsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxzQkFBVSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNsRztpQkFBTTtnQkFDSCxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLHNCQUFVLENBQUMsY0FBYyxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25ILElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNwRDtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDaEQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3BEO1FBRUQsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0UsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUUsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUM1RCxhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRSxhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RSxhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0gsYUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBTSxZQUFZLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0UsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixJQUFNLFlBQVksR0FBRyxnQkFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBZSxDQUFDO2dCQUNsSCxJQUFJLFlBQVksRUFBRTtvQkFDZCxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlHLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEg7Z0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakk7Z0JBQ0QsSUFBTSxXQUFXLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFFbEcsSUFBTSxhQUFhLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNqRixJQUFNLGNBQWMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RSxJQUFNLGlCQUFpQixHQUFHO29CQUN0QixHQUFHLEdBQUcsWUFBWSxDQUFDLEVBQUU7b0JBQ3JCLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTTtvQkFDekIsWUFBWSxDQUFDLE9BQU87b0JBQ3BCLFlBQVksQ0FBQyxLQUFLO2lCQUNyQixDQUFDO2dCQUVGLElBQUksa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7Z0JBRTNDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO29CQUMzQixJQUFNLFlBQVksR0FBRyxnQkFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQWUsQ0FBQztvQkFDOUksSUFBSSxZQUFZLEVBQUU7d0JBQ2Qsa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckg7aUJBQ0o7Z0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNSLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQ2pGLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5RTt5QkFBTTt3QkFDSCxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztxQkFDM0I7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHFDQUFjLEdBQXRCO1FBQ0ksSUFBTSxZQUFZLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUMxQixJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRTtZQUMvRixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUM3QzthQUFNO1lBQ0gsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdGLGdCQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0wsQ0FBQztJQUVPLGtDQUFXLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBckxEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ2dCO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ3VCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ2tCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2tCO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQ3dCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQ3dCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0VBQzZCO0lBR2pEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUVBQzhCO0lBR2xEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ29CO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ21CO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ21CO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ29CO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ21CO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ3FCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2M7SUFHakM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7aURBQ1k7SUF4RDlCLFlBQVk7UUFEeEIsT0FBTztPQUNLLFlBQVksQ0F3THhCO0lBQUQsbUJBQUM7Q0F4TEQsQUF3TEMsQ0F4TGlDLEVBQUUsQ0FBQyxTQUFTLEdBd0w3QztBQXhMWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlcm9Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9oZXJvJztcclxuaW1wb3J0IHsgU3RhckNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL3N0YXInO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBCYXJyYWNrc0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNoYWRlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsb2NrX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdW5sb2NrX2xldmVsX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB1bmxvY2tfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb19zcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgbGVmdF9pdGVtX3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSByaWdodF9pdGVtX3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX2NvbG9yX3Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX3Byb2Zlc3Npb25fc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGhlcm9fcHJvZmVzc2lvbjJfc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgaGVyb19uYW1lX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBoZXJvU3Rhck5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBoZXJvQXRyck5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB1cHN0YXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuVXBzdGFyTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgbmVlZEhlcm9JY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIG5lZWRIZXJvSWNvbkJnOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbmVlZExibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBzcHJMaXN0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTogSGVyb0NvbmZpZztcclxuICAgIHByaXZhdGUgX2lzQ2VudGVyOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfY3VySW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faXNDZW50ZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jdXJJbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KGhlcm9JZDogbnVtYmVyLCBpc0NlbnRlcjogYm9vbGVhbiwgY3VySW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5iYXJyYWNrc191bmxvY2tfZGF0YVtjdXJJbmRleF0uYW5pX3N0YXRlID09PSAwICYmXHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJhcnJhY2tzX3VubG9ja19kYXRhW2N1ckluZGV4XS5zdGF0ZSA9PT0gMVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5iYXJyYWNrc191bmxvY2tfZGF0YVtjdXJJbmRleF0uYW5pX3N0YXRlID0gMTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc0NlbnRlciA9IGlzQ2VudGVyO1xyXG4gICAgICAgIHRoaXMuX2N1ckluZGV4ID0gY3VySW5kZXg7XHJcbiAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgaGVyb0lkLnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgaWYgKCFoZXJvRGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBoZXJvRGF0YTtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubGVmdF9pdGVtX3Nwcml0ZSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hlcm9DaXJjbGVJbWcvXCIgKyBoZXJvRGF0YS5pdGVtVHlwZVswXSk7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnJpZ2h0X2l0ZW1fc3ByaXRlLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvXCIgKyBoZXJvRGF0YS5pdGVtVHlwZVsxXSk7XHJcbiAgICAgICAgdGhpcy5oZXJvX25hbWVfbGJsLnN0cmluZyA9IGhlcm9EYXRhLm5hbWU7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9fY29sb3Jfc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvY2lyY2xlQ29sb3JfXCIgKyBoZXJvRGF0YS5jb2xvcik7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9fc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGVyb0NpcmNsZUltZy9cIiArIGhlcm9EYXRhLmhlcm9pZCk7XHJcbiAgICAgICAgdGhpcy5zaGFkZV9ub2RlLmFjdGl2ZSA9IGlzQ2VudGVyO1xyXG5cclxuICAgICAgICBpZiAoaGVyb0RhdGEub2NjdXBhdGlvbiA8PSA2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19wcm9mZXNzaW9uX3Nwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChoZXJvRGF0YS5vY2N1cGF0aW9uID4gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3Byb2Zlc3Npb24yX3Nwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb19wcm9mZXNzaW9uX3Nwcml0ZSwgQnVuZGxlTmFtZS5CVUlMRF9GVU5DVElPTiwgXCJyZXMvMVwiKTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvX3Byb2Zlc3Npb24yX3Nwcml0ZSwgQnVuZGxlTmFtZS5CVUlMRF9GVU5DVElPTiwgXCJyZXMvMlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvX3Byb2Zlc3Npb25fc3ByaXRlLCBCdW5kbGVOYW1lLkJVSUxEX0ZVTkNUSU9OLCBcInJlcy9cIiArIGhlcm9EYXRhLm9jY3VwYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3Byb2Zlc3Npb24yX3Nwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3Byb2Zlc3Npb25fc3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19wcm9mZXNzaW9uMl9zcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5sZWZ0X2l0ZW1fc3ByaXRlLm5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5OT1JNQUwpO1xyXG4gICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5yaWdodF9pdGVtX3Nwcml0ZS5ub2RlLCBjYy5TcHJpdGUuU3RhdGUuTk9STUFMKTtcclxuXHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJhcnJhY2tzX3VubG9ja19kYXRhW3RoaXMuX2N1ckluZGV4XS5zdGF0ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrX2xldmVsX2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudW5sb2NrX2xldmVsX2xibC5zdHJpbmcgPSBcIkxFVkVMIFwiICsgaGVyb0RhdGEuYmFycmFja3M7XHJcbiAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5oZXJvX2NvbG9yX3Nwcml0ZS5ub2RlLCBjYy5TcHJpdGUuU3RhdGUuR1JBWSk7XHJcbiAgICAgICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5sZWZ0X2l0ZW1fc3ByaXRlLm5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICAgICAgVXRpbHMuc2V0X3Nwcml0ZV9zdGF0ZSh0aGlzLnJpZ2h0X2l0ZW1fc3ByaXRlLm5vZGUsIGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBVdGlscy5zZXRfc3ByaXRlX3N0YXRlKHRoaXMuaGVyb19jb2xvcl9zcHJpdGUubm9kZSwgY2MuU3ByaXRlLlN0YXRlLk5PUk1BTCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBzdGFyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgaGVyb1N0YXJEYXRhID0gZ20uZGF0YS5oZXJvX3N0YXJfZGF0YS5nZXRIZXJvU3RhckRhdGEoaGVyb0RhdGEuYXJtcyk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvU3RhckRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dEhlcm9EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGhlcm9TdGFyRGF0YS5uZXh0TmVlZEl0ZW0udG9TdHJpbmcoKSkgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0SGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubmVlZEhlcm9JY29uQmcsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9jaXJjbGVDb2xvcl9cIiArIG5leHRIZXJvRGF0YS5jb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm5lZWRIZXJvSWNvbiwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hlcm9DaXJjbGVJbWcvXCIgKyBuZXh0SGVyb0RhdGEuaWNvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMuaGVyb1N0YXJOb2RlLmNoaWxkcmVuQ291bnQ7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1N0YXJOb2RlLmNoaWxkcmVuW3JdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gaGVyb1N0YXJEYXRhLnN0YXIgPiByID8gdGhpcy5zcHJMaXN0WzBdIDogdGhpcy5zcHJMaXN0WzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3Rhckhlcm9OdW0gPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRTdGFySGVyb051bUJ5SUQoaGVyb1N0YXJEYXRhLm5leHROZWVkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lZWRMYmwuc3RyaW5nID0gc3Rhckhlcm9OdW0gKyBcIi9cIiArIGhlcm9TdGFyRGF0YS5uZXh0TmVlZE51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVlZExibC5ub2RlLmNvbG9yID0gc3Rhckhlcm9OdW0gPj0gaGVyb1N0YXJEYXRhLm5leHROZWVkTnVtID8gY2MuQ29sb3IuR1JFRU4gOiBjYy5Db2xvci5SRUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlS2V5cyA9IFtcIlBlcmtfSFBcIiwgXCJQZXJrX0F0dGFja2Vyc1wiLCBcIlBlcmtfRGVmZW5zZVwiLCBcIlBlcmtfVGltZVwiXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gW1wiU2luaCBt4bqhbmdcIiwgXCJU4bqlbiBjw7RuZ1wiLCBcIlBow7JuZyB0aOG7p1wiLCBcIlThu5FjIMSR4buZXCJdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgMTAwICogaGVyb1N0YXJEYXRhLmhwLFxyXG4gICAgICAgICAgICAgICAgICAgIDEwMCAqIGhlcm9TdGFyRGF0YS5hdHRhY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb1N0YXJEYXRhLmRlZmVuc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb1N0YXJEYXRhLnNwZWVkXHJcbiAgICAgICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB1cGdyYWRlZEF0dHJpYnV0ZXMgPSBjdXJyZW50QXR0cmlidXRlcztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blVwc3Rhck5vZGUuYWN0aXZlID0gaGVyb1N0YXJEYXRhLm5leHROZWVkSXRlbSA+IDAgJiYgaGVyb1N0YXJEYXRhLm5leHROZWVkTnVtID4gMDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ0blVwc3Rhck5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFN0YXJEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlN0YXJDb25maWdEYXRhXCIsIGhlcm9TdGFyRGF0YS5hcm1zLnRvU3RyaW5nKCksIChoZXJvU3RhckRhdGEuc3RhciArIDEpLnRvU3RyaW5nKCkpIGFzIFN0YXJDb25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTdGFyRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGdyYWRlZEF0dHJpYnV0ZXMgPSBbMTAwICogbmV4dFN0YXJEYXRhLmhwLCAxMDAgKiBuZXh0U3RhckRhdGEuYXR0YWNrLCBuZXh0U3RhckRhdGEuZGVmZW5zZSwgbmV4dFN0YXJEYXRhLnNwZWVkXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMuaGVyb0F0cnJOb2RlLmNoaWxkcmVuQ291bnQ7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJOb2RlID0gdGhpcy5oZXJvQXRyck5vZGUuY2hpbGRyZW5bcl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIgIT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKGF0dHJOb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvYXR0ckljb24vXCIgKyBhdHRyaWJ1dGVLZXlzW3JdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck5vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBhdHRyaWJ1dGVOYW1lc1tyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck5vZGUuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB1cGdyYWRlZEF0dHJpYnV0ZXNbcl0gKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck5vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gY3VycmVudEF0dHJpYnV0ZXNbcl0gPCB1cGdyYWRlZEF0dHJpYnV0ZXNbcl07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1VwZ3JhZGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGVyb1N0YXJEYXRhID0gZ20uZGF0YS5oZXJvX3N0YXJfZGF0YS5nZXRIZXJvU3RhckRhdGEodGhpcy5fZGF0YS5hcm1zKTtcclxuICAgICAgICBpZiAoIWhlcm9TdGFyRGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRTdGFySGVyb051bUJ5SUQoaGVyb1N0YXJEYXRhLm5leHROZWVkSXRlbSkgPCBoZXJvU3RhckRhdGEubmV4dE5lZWROdW0pIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJLaMO0bmcgxJHhu6cgYW5oIGjDuW5nISEhXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbFN0YXJIZXJvTnVtQnlJRChoZXJvU3RhckRhdGEubmV4dE5lZWRJdGVtLCBoZXJvU3RhckRhdGEubmV4dE5lZWROdW0pO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmhlcm9fc3Rhcl9kYXRhLnVwZ3JhZGVIZXJvU3Rhcih0aGlzLl9kYXRhLmFybXMpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KHRoaXMuX2RhdGEuaGVyb2lkLCB0aGlzLl9pc0NlbnRlciwgdGhpcy5fY3VySW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tCb29rKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5CT09LX0hFUk9fREVUQUlMLmtleSwgW3RoaXMuX2RhdGEuaGVyb2lkXSk7XHJcbiAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5CT09LX0hFUk9fREVUQUlMKTtcclxuICAgIH1cclxufSJdfQ==