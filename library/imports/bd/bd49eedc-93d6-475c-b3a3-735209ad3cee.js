"use strict";
cc._RF.push(module, 'bd49e7ck9ZHXLOjc1IJrTzu', 'SceneHeroDetailView');
// book/scripts/SceneHeroDetailView.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var SceneBookLogic_1 = require("./SceneBookLogic");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SceneHeroDetailView = /** @class */ (function (_super) {
    __extends(SceneHeroDetailView, _super);
    function SceneHeroDetailView() {
        var _this = _super.call(this) || this;
        _this.btn_left = null;
        _this.btn_right = null;
        _this.node_root = null;
        _this.pos_heros = [];
        _this.icon = null;
        _this.dots = [];
        _this.lvs = [];
        _this.lab_name = null;
        _this.lab_defense = null;
        _this.lab_attack = null;
        _this.lab_hp = null;
        _this.lab_range = null;
        _this.lab_speed = null;
        _this.lab_defense_star = null;
        _this.lab_attack_star = null;
        _this.lab_hp_star = null;
        _this.icon_occupations = [];
        _this.BG_COLOR = [new cc.Color(91, 209, 97, 255), new cc.Color(23, 203, 254, 255), new cc.Color(251, 192, 0, 255), new cc.Color(195, 90, 252, 252)];
        _this.tItemId = null;
        _this.tHeros = [];
        _this.bIsSwitching = false;
        _this.iCurIndex = 0;
        _this.colorDotBlack = new cc.Color(9, 66, 85, 255);
        _this.tOccupationIds = null;
        _this.bIsIcon = false;
        _this.sSkin = null;
        _this.sAni = null;
        return _this;
    }
    SceneHeroDetailView.prototype.onLoad = function () { };
    SceneHeroDetailView.prototype.onEnable = function () {
        this.recyleHeros();
        if (this.tOccupationIds == null) {
            this.tOccupationIds = {};
            this.tOccupationIds[1] = [1];
            this.tOccupationIds[2] = [2];
            this.tOccupationIds[3] = [3];
            this.tOccupationIds[4] = [1, 3];
            this.tOccupationIds[5] = [2, 3];
        }
        this.iCurIndex = 0;
        this.icon.node.x = 0;
        this.icon.spriteFrame = null;
        this.tItemId = GameManager_1.gm.ui.get_module_args(Constants_1.Constants._instance.BOOK_HERO_DETAIL.key);
        this.loadHero();
        this.refreshBtnArrow();
        this.refreshAttr();
    };
    SceneHeroDetailView.prototype.loadHero = function () {
        var self = this;
        var bookConfig = GameManager_1.gm.config.get_row_data("BookConfigData", this.tItemId[0].toString());
        this.sAni = bookConfig.animation;
        this.sSkin = bookConfig.skin == "default" ? null : bookConfig.skin;
        this.node_root.color = this.BG_COLOR[bookConfig.color - 1];
        this.bIsIcon = bookConfig.is_model !== 1;
        if (this.bIsIcon) {
            Utils_1.Utils.async_set_sprite_frame(this.icon, Constants_1.BundleName.COMMON, "res/handbook/" + bookConfig.icon);
            var isUnlocked = this.checkIsUnlock(bookConfig.id);
            this.icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
            this.icon.node.opacity = isUnlocked ? 255 : 171;
        }
        else {
            for (var index = 0; index < this.tItemId.length; index++) {
                (function (i) {
                    var currentItemId = self.tItemId[i];
                    var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", currentItemId.toString());
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroConfig.heroid, NodePoolItem_1.NodePoolItem, function (nodeItem) {
                        self.tHeros.push(nodeItem);
                        nodeItem.node.scale = bookConfig.model_scale;
                        nodeItem.node.y = bookConfig.offset_y;
                        var isUnlocked = self.checkIsUnlock(currentItemId);
                        var spine = self.getSpine(nodeItem);
                        if (spine != null) {
                            spine.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
                        }
                        self.pos_heros[i].addChild(nodeItem.node);
                        self.refreshHeroAni();
                    });
                })(index);
            }
            this.pos_heros[0].parent.x = -339.121;
        }
    };
    SceneHeroDetailView.prototype.checkIsUnlock = function (num) {
        return GameManager_1.gm.data.mapCell_data.checkBookItemIsUnlock(num);
    };
    SceneHeroDetailView.prototype.refreshAttr = function () {
        var currentItemId = this.tItemId[this.iCurIndex];
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", currentItemId.toString());
        var bookConfig = GameManager_1.gm.config.get_row_data("BookConfigData", currentItemId.toString());
        var isUnlocked = this.checkIsUnlock(currentItemId);
        this.lab_speed.node.parent.active = bookConfig.sub_type == SceneBookLogic_1.default.SUB_TYPE_HERO || bookConfig.sub_type == SceneBookLogic_1.default.SUB_TYPE_SUPER_HERO;
        this.lab_attack.string = heroConfig.attack.toString();
        this.lab_defense.string = heroConfig.defense.toString();
        this.lab_hp.string = heroConfig.hp.toString();
        this.lab_range.string = heroConfig.range.toString();
        this.lab_speed.string = heroConfig.speed.toString();
        this.lab_name.string = isUnlocked ? heroConfig.name : "";
        this.lab_defense_star.string = "";
        this.lab_attack_star.string = "";
        this.lab_hp_star.string = "";
        var starData = GameManager_1.gm.data.hero_star_data.getHeroStarData(heroConfig.arms);
        if (starData) {
            this.lab_defense_star.string = "<b><color=#000000>\uFF08Ph\u00F2ng th\u1EE7 +</color><color=#128400>" + Math.floor(heroConfig.defense * starData.defense) + "\uFF09</color>";
            this.lab_attack_star.string = "<b><color=#000000>(T\u1EA5n c\u00F4ng +</color><color=#128400>" + Math.floor(heroConfig.attack * starData.attack) + "\uFF09</color>";
            this.lab_hp_star.string = "<b><color=#000000>\uFF08Sinh m\u1EA1ng +</color><color=#128400>" + starData.hp + "\uFF09</color>";
        }
        this.lvs[0].parent.active = this.tItemId.length > 1;
        this.dots[0].parent.active = this.tItemId.length > 1;
        if (this.tItemId.length > 1) {
            for (var i = 0; i < this.lvs.length; i++) {
                this.lvs[i].active = i == this.iCurIndex;
            }
            for (var i = 0; i < this.dots.length; i++) {
                this.dots[i].active = i < this.tItemId.length;
                this.dots[i].color = i == this.iCurIndex ? cc.Color.WHITE : this.colorDotBlack;
            }
        }
        var occupationIds = this.tOccupationIds[heroConfig.occupation];
        if (this.icon_occupations[0].node.parent.parent.active = occupationIds != null) {
            if (occupationIds != null) {
                for (var i = 0; i < 2; i++) {
                    var occupationIcon = this.icon_occupations[i];
                    occupationIcon.node.active = occupationIds[i] != null;
                    if (occupationIds[i] != null) {
                        Utils_1.Utils.async_set_sprite_frame(occupationIcon, Constants_1.BundleName.COMMON, "res/occupation/" + occupationIds[i]);
                    }
                }
            }
        }
    };
    SceneHeroDetailView.prototype.getSpine = function (nodePoolItem) {
        var skeletonComponent = nodePoolItem.getComponent(sp.Skeleton);
        return skeletonComponent == null ? nodePoolItem.getComponentInChildren(sp.Skeleton) : skeletonComponent;
    };
    SceneHeroDetailView.prototype.recyleHeros = function () {
        for (var heroIndex = 0; heroIndex < this.tHeros.length; heroIndex++) {
            var heroID = this.tHeros[heroIndex];
            var spineInstance = this.getSpine(heroID);
            if (spineInstance != null) {
                spineInstance.node.color = cc.Color.WHITE;
            }
            GameManager_1.gm.pool.put(heroID.node);
        }
        this.tHeros = [];
    };
    SceneHeroDetailView.prototype.refreshHeroAni = function () {
        for (var heroIndex = 0; heroIndex < this.tHeros.length; heroIndex++) {
            var heroID = this.tHeros[heroIndex];
            var spineInstance = this.getSpine(heroID);
            if (spineInstance != null) {
                spineInstance.setToSetupPose();
                var animationName = "stay";
                var skinName = "front";
                if (this.sAni !== "") {
                    animationName = this.sAni;
                    skinName = this.sSkin;
                }
                if (skinName != null) {
                    spineInstance.setSkin(skinName);
                }
                spineInstance.setAnimation(0, animationName, true);
                spineInstance.animation = animationName;
            }
        }
    };
    SceneHeroDetailView.prototype.scrollTo = function (isNext) {
        var targetX, resetX;
        var self = this;
        if (this.bIsIcon) {
            if (this.tItemId[this.iCurIndex] != null) {
                this.bIsSwitching = true;
                targetX = isNext ? this.node_root.width : -1 * this.node_root.width;
                resetX = isNext ? -1 * this.node_root.width : this.node_root.width;
                cc.tween(this.icon.node).to(0.08, { x: targetX }).call(function () {
                    self.icon.node.x = resetX;
                    var bookData = GameManager_1.gm.config.get_row_data("BookConfigData", self.tItemId[self.iCurIndex].toString());
                    Utils_1.Utils.async_set_sprite_frame(self.icon, Constants_1.BundleName.COMMON, "res/handbook/" + bookData.icon);
                    var isUnlocked = self.checkIsUnlock(bookData.id);
                    self.icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
                    self.icon.node.opacity = isUnlocked ? 255 : 171;
                    cc.tween(self.icon.node).to(0.08, { x: 0 }).call(function () {
                        self.bIsSwitching = false;
                    }).start();
                }).start();
            }
        }
        else {
            var heroParentNode = this.pos_heros[0].parent;
            targetX = isNext ? this.node_root.width : -1 * this.node_root.width;
            targetX += heroParentNode.x;
            this.bIsSwitching = true;
            this.refreshHeroAni();
            cc.tween(heroParentNode).to(0.1, { x: targetX }).call(function () {
                self.bIsSwitching = false;
            }).start();
        }
    };
    SceneHeroDetailView.prototype.refreshBtnArrow = function () {
        this.btn_left.active = this.tItemId[this.iCurIndex - 1] != null;
        this.btn_right.active = this.tItemId[this.iCurIndex + 1] != null;
    };
    SceneHeroDetailView.prototype.editor_on_button_click_handler = function (buttonNode, additionalData) {
        if (additionalData === void 0) { additionalData = null; }
        switch (buttonNode.target.name) {
            case "btn_close":
                GameManager_1.gm.ui.async_hide_module(Constants_1.Constants._instance.BOOK_HERO_DETAIL);
                break;
            case "btn_arrow_L":
                if (this.bIsSwitching)
                    return;
                this.iCurIndex--;
                this.scrollTo(true);
                this.refreshBtnArrow();
                this.refreshAttr();
                break;
            case "btn_arrow_R":
                if (this.bIsSwitching)
                    return;
                this.iCurIndex++;
                this.scrollTo(false);
                this.refreshBtnArrow();
                this.refreshAttr();
                break;
        }
    };
    SceneHeroDetailView.prototype.onDisable = function () {
        this.tItemId = null;
        this.recyleHeros();
    };
    __decorate([
        property(cc.Node)
    ], SceneHeroDetailView.prototype, "btn_left", void 0);
    __decorate([
        property(cc.Node)
    ], SceneHeroDetailView.prototype, "btn_right", void 0);
    __decorate([
        property(cc.Node)
    ], SceneHeroDetailView.prototype, "node_root", void 0);
    __decorate([
        property({ type: [cc.Node] })
    ], SceneHeroDetailView.prototype, "pos_heros", void 0);
    __decorate([
        property(cc.Sprite)
    ], SceneHeroDetailView.prototype, "icon", void 0);
    __decorate([
        property({ type: [cc.Node] })
    ], SceneHeroDetailView.prototype, "dots", void 0);
    __decorate([
        property({ type: [cc.Node] })
    ], SceneHeroDetailView.prototype, "lvs", void 0);
    __decorate([
        property(cc.Label)
    ], SceneHeroDetailView.prototype, "lab_name", void 0);
    __decorate([
        property(cc.Label)
    ], SceneHeroDetailView.prototype, "lab_defense", void 0);
    __decorate([
        property(cc.Label)
    ], SceneHeroDetailView.prototype, "lab_attack", void 0);
    __decorate([
        property(cc.Label)
    ], SceneHeroDetailView.prototype, "lab_hp", void 0);
    __decorate([
        property(cc.Label)
    ], SceneHeroDetailView.prototype, "lab_range", void 0);
    __decorate([
        property(cc.Label)
    ], SceneHeroDetailView.prototype, "lab_speed", void 0);
    __decorate([
        property(cc.RichText)
    ], SceneHeroDetailView.prototype, "lab_defense_star", void 0);
    __decorate([
        property(cc.RichText)
    ], SceneHeroDetailView.prototype, "lab_attack_star", void 0);
    __decorate([
        property(cc.RichText)
    ], SceneHeroDetailView.prototype, "lab_hp_star", void 0);
    __decorate([
        property({ type: [cc.Sprite] })
    ], SceneHeroDetailView.prototype, "icon_occupations", void 0);
    SceneHeroDetailView = __decorate([
        ccclass
    ], SceneHeroDetailView);
    return SceneHeroDetailView;
}(GameModule_1.GameModule));

cc._RF.pop();