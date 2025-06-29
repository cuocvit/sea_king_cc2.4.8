"use strict";
cc._RF.push(module, '30621wb8kVJjqVpAw6btQzV', 'NewHeroAnim');
// start-scene/scripts/NewHeroAnim.ts

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
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewHeroAnim = /** @class */ (function (_super) {
    __extends(NewHeroAnim, _super);
    function NewHeroAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_sprite = null;
        _this.hero_color_sprite = null;
        _this.hero_profession_sprite = null;
        _this.hero_profession2_sprite = null;
        _this.left_item_sprite = null;
        _this.right_item_sprite = null;
        _this.hero_name_lbl = null;
        _this.roleNode = null;
        _this._heroID = 0;
        return _this;
    }
    NewHeroAnim.prototype.onEnable = function () {
        var _this = this;
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        if (0 < this.roleNode.childrenCount) {
            GameManager_1.gm.pool.put_children(this.roleNode);
        }
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_163_UNLOCK_NEW_HERO_ANIM);
        this._heroID = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.NEWHEROANIM.key);
        this.hero_color_sprite.node.active = this.hero_profession_sprite.node.active = this.hero_profession2_sprite.node.active = this.hero_name_lbl.node.active = true;
        var heroData = GameManager_1.gm.config.get_row_data("HeroConfigData", this._heroID.toString());
        if (!heroData) {
            GameManager_1.gm.pool.put_children(this.roleNode);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.NEWHEROANIM);
            return;
        }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroData.heroid, NodePoolItem_1.NodePoolItem, function (nodePoolItem) {
            if (0 == _this.roleNode.childrenCount) {
                _this.roleNode.addChild(nodePoolItem.node);
                nodePoolItem.node.x = 0;
                nodePoolItem.node.y = -69;
                nodePoolItem.node.scale = 2.5;
                if (nodePoolItem.getComponent(sp.Skeleton)) {
                    nodePoolItem.getComponent(sp.Skeleton).setSkin("front");
                    nodePoolItem.getComponent(sp.Skeleton).setAnimation(0, "stay", true);
                }
            }
            else {
                GameManager_1.gm.pool.put(nodePoolItem.node);
            }
        });
        Utils_1.Utils.async_set_sprite_frame(this.hero_color_sprite, Constants_1.BundleName.COMMON, "res/circleColor_" + heroData.color);
        Utils_1.Utils.async_set_sprite_frame(this.hero_sprite, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + heroData.heroid);
        this.hero_name_lbl.string = heroData.name;
        if (heroData.occupation <= 6) {
            this.hero_profession_sprite.node.active = true;
            if (3 < heroData.occupation) {
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
            this.hero_profession_sprite.node.active = this.hero_profession2_sprite.node.active = !1;
        }
        Utils_1.Utils.async_set_sprite_frame(this.left_item_sprite, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + heroData.itemType[0]);
        Utils_1.Utils.async_set_sprite_frame(this.right_item_sprite, Constants_1.BundleName.MAP, "res/" + heroData.itemType[1]);
        this.node.getComponent(cc.Animation).play();
    };
    NewHeroAnim.prototype.playAnimEnd = function (event, animationName) {
        if ("newHero" == animationName.name) {
            GameManager_1.gm.pool.put_children(this.roleNode);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.NEWHEROANIM);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], NewHeroAnim.prototype, "hero_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewHeroAnim.prototype, "hero_color_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewHeroAnim.prototype, "hero_profession_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewHeroAnim.prototype, "hero_profession2_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewHeroAnim.prototype, "left_item_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewHeroAnim.prototype, "right_item_sprite", void 0);
    __decorate([
        property(cc.Label)
    ], NewHeroAnim.prototype, "hero_name_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], NewHeroAnim.prototype, "roleNode", void 0);
    NewHeroAnim = __decorate([
        ccclass
    ], NewHeroAnim);
    return NewHeroAnim;
}(cc.Component));
exports.default = NewHeroAnim;

cc._RF.pop();