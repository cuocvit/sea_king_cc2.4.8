
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/book/scripts/SceneHeroDetailView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYm9va1xcc2NyaXB0c1xcU2NlbmVIZXJvRGV0YWlsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBa0U7QUFDbEUsaUVBQTRFO0FBQzVFLHFFQUEyRDtBQUMzRCx1RUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELG1EQUE4QztBQUd4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrQyx1Q0FBVTtJQStEeEM7UUFBQSxZQUNJLGlCQUFPLFNBV1Y7UUF6RU8sY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFjLEVBQUUsQ0FBQztRQUcxQixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLFVBQUksR0FBYyxFQUFFLENBQUM7UUFHckIsU0FBRyxHQUFjLEVBQUUsQ0FBQztRQUdwQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLHNCQUFnQixHQUFnQixJQUFJLENBQUM7UUFHckMscUJBQWUsR0FBZ0IsSUFBSSxDQUFDO1FBR3BDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUdoQyxzQkFBZ0IsR0FBZ0IsRUFBRSxDQUFDO1FBZXZDLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxD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QUMsTUFBTSxDQUFDO3FEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cURBQ0Q7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvREFDRjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNlO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NERBQ2tCO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ2lCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztpRUFDdUI7SUFHN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnRUFDc0I7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0REFDa0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztpRUFDVztJQWxEekMsbUJBQW1CO1FBRHhCLE9BQU87T0FDRixtQkFBbUIsQ0FxVHhCO0lBQUQsMEJBQUM7Q0FyVEQsQUFxVEMsQ0FyVGlDLHVCQUFVLEdBcVQzQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMsIEJ1bmRsZU5hbWUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IFNjZW5lQm9va0xvZ2ljIGZyb20gJy4vU2NlbmVCb29rTG9naWMnO1xyXG5pbXBvcnQgeyBCb29rQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvYm9va3MnO1xyXG5pbXBvcnQgeyBIZXJvQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaGVybyc7XHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTY2VuZUhlcm9EZXRhaWxWaWV3IGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX2xlZnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5fcmlnaHQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub2RlX3Jvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5Ob2RlXSB9KVxyXG4gICAgcHJpdmF0ZSBwb3NfaGVyb3M6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdIH0pXHJcbiAgICBwcml2YXRlIGRvdHM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5Ob2RlXSB9KVxyXG4gICAgcHJpdmF0ZSBsdnM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGFiX25hbWU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxhYl9kZWZlbnNlOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYWJfYXR0YWNrOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYWJfaHA6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxhYl9yYW5nZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGFiX3NwZWVkOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgcHJpdmF0ZSBsYWJfZGVmZW5zZV9zdGFyOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgcHJpdmF0ZSBsYWJfYXR0YWNrX3N0YXI6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwcml2YXRlIGxhYl9ocF9zdGFyOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLlNwcml0ZV0gfSlcclxuICAgIHByaXZhdGUgaWNvbl9vY2N1cGF0aW9uczogY2MuU3ByaXRlW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIEJHX0NPTE9SOiBjYy5Db2xvcltdO1xyXG4gICAgcHJpdmF0ZSB0SXRlbUlkOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgdEhlcm9zOiBOb2RlUG9vbEl0ZW1bXTtcclxuICAgIHByaXZhdGUgYklzU3dpdGNoaW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpQ3VySW5kZXg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29sb3JEb3RCbGFjazogY2MuQ29sb3I7XHJcbiAgICBwcml2YXRlIHRPY2N1cGF0aW9uSWRzOiB7IFtrZXk6IG51bWJlcl06IG51bWJlcltdIH0gfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBiSXNJY29uOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBzU2tpbjogc3RyaW5nIHwgbnVsbDtcclxuICAgIHByaXZhdGUgc0FuaTogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5CR19DT0xPUiA9IFtuZXcgY2MuQ29sb3IoOTEsIDIwOSwgOTcsIDI1NSksIG5ldyBjYy5Db2xvcigyMywgMjAzLCAyNTQsIDI1NSksIG5ldyBjYy5Db2xvcigyNTEsIDE5MiwgMCwgMjU1KSwgbmV3IGNjLkNvbG9yKDE5NSwgOTAsIDI1MiwgMjUyKV1cclxuICAgICAgICB0aGlzLnRJdGVtSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudEhlcm9zID0gW107XHJcbiAgICAgICAgdGhpcy5iSXNTd2l0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlDdXJJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb2xvckRvdEJsYWNrID0gbmV3IGNjLkNvbG9yKDksIDY2LCA4NSwgMjU1KTtcclxuICAgICAgICB0aGlzLnRPY2N1cGF0aW9uSWRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJJc0ljb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNTa2luID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNBbmkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWN5bGVIZXJvcygpO1xyXG4gICAgICAgIGlmICh0aGlzLnRPY2N1cGF0aW9uSWRzID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50T2NjdXBhdGlvbklkcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLnRPY2N1cGF0aW9uSWRzWzFdID0gWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnRPY2N1cGF0aW9uSWRzWzJdID0gWzJdO1xyXG4gICAgICAgICAgICB0aGlzLnRPY2N1cGF0aW9uSWRzWzNdID0gWzNdO1xyXG4gICAgICAgICAgICB0aGlzLnRPY2N1cGF0aW9uSWRzWzRdID0gWzEsIDNdO1xyXG4gICAgICAgICAgICB0aGlzLnRPY2N1cGF0aW9uSWRzWzVdID0gWzIsIDNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlDdXJJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pY29uLm5vZGUueCA9IDA7XHJcbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRJdGVtSWQgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoQ29uc3RhbnRzLl9pbnN0YW5jZS5CT09LX0hFUk9fREVUQUlMLmtleSkgYXMgbnVtYmVyW107XHJcbiAgICAgICAgdGhpcy5sb2FkSGVybygpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEJ0bkFycm93KCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQXR0cigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEhlcm8oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYm9va0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCB0aGlzLnRJdGVtSWRbMF0udG9TdHJpbmcoKSkgYXMgQm9va0NvbmZpZztcclxuXHJcbiAgICAgICAgdGhpcy5zQW5pID0gYm9va0NvbmZpZy5hbmltYXRpb247XHJcbiAgICAgICAgdGhpcy5zU2tpbiA9IGJvb2tDb25maWcuc2tpbiA9PSBcImRlZmF1bHRcIiA/IG51bGwgOiBib29rQ29uZmlnLnNraW47XHJcblxyXG4gICAgICAgIHRoaXMubm9kZV9yb290LmNvbG9yID0gdGhpcy5CR19DT0xPUltib29rQ29uZmlnLmNvbG9yIC0gMV07XHJcbiAgICAgICAgdGhpcy5iSXNJY29uID0gYm9va0NvbmZpZy5pc19tb2RlbCAhPT0gMTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYklzSWNvbikge1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaWNvbiwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgYm9va0NvbmZpZy5pY29uKTtcclxuICAgICAgICAgICAgY29uc3QgaXNVbmxvY2tlZCA9IHRoaXMuY2hlY2tJc1VubG9jayhib29rQ29uZmlnLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5pY29uLm5vZGUuY29sb3IgPSBpc1VubG9ja2VkID8gY2MuQ29sb3IuV0hJVEUgOiBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICAgICAgdGhpcy5pY29uLm5vZGUub3BhY2l0eSA9IGlzVW5sb2NrZWQgPyAyNTUgOiAxNzE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudEl0ZW1JZC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEl0ZW1JZCA9IHNlbGYudEl0ZW1JZFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGN1cnJlbnRJdGVtSWQudG9TdHJpbmcoKSkgYXMgSGVyb0NvbmZpZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIGhlcm9Db25maWcuaGVyb2lkLCBOb2RlUG9vbEl0ZW0sIChub2RlSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRIZXJvcy5wdXNoKG5vZGVJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUl0ZW0ubm9kZS5zY2FsZSA9IGJvb2tDb25maWcubW9kZWxfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJdGVtLm5vZGUueSA9IGJvb2tDb25maWcub2Zmc2V0X3k7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1VubG9ja2VkID0gc2VsZi5jaGVja0lzVW5sb2NrKGN1cnJlbnRJdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGluZSA9IHNlbGYuZ2V0U3BpbmUobm9kZUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BpbmUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BpbmUubm9kZS5jb2xvciA9IGlzVW5sb2NrZWQgPyBjYy5Db2xvci5XSElURSA6IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc19oZXJvc1tpXS5hZGRDaGlsZChub2RlSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWZyZXNoSGVyb0FuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucG9zX2hlcm9zWzBdLnBhcmVudC54ID0gLTMzOS4xMjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc1VubG9jayhudW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBnbS5kYXRhLm1hcENlbGxfZGF0YS5jaGVja0Jvb2tJdGVtSXNVbmxvY2sobnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hBdHRyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJdGVtSWQgPSB0aGlzLnRJdGVtSWRbdGhpcy5pQ3VySW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgY3VycmVudEl0ZW1JZC50b1N0cmluZygpKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgIGNvbnN0IGJvb2tDb25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiQm9va0NvbmZpZ0RhdGFcIiwgY3VycmVudEl0ZW1JZC50b1N0cmluZygpKSBhcyBCb29rQ29uZmlnO1xyXG4gICAgICAgIGNvbnN0IGlzVW5sb2NrZWQgPSB0aGlzLmNoZWNrSXNVbmxvY2soY3VycmVudEl0ZW1JZCk7XHJcblxyXG4gICAgICAgIHRoaXMubGFiX3NwZWVkLm5vZGUucGFyZW50LmFjdGl2ZSA9IGJvb2tDb25maWcuc3ViX3R5cGUgPT0gU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVSTyB8fCBib29rQ29uZmlnLnN1Yl90eXBlID09IFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX1NVUEVSX0hFUk87XHJcblxyXG4gICAgICAgIHRoaXMubGFiX2F0dGFjay5zdHJpbmcgPSBoZXJvQ29uZmlnLmF0dGFjay50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMubGFiX2RlZmVuc2Uuc3RyaW5nID0gaGVyb0NvbmZpZy5kZWZlbnNlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5sYWJfaHAuc3RyaW5nID0gaGVyb0NvbmZpZy5ocC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMubGFiX3JhbmdlLnN0cmluZyA9IGhlcm9Db25maWcucmFuZ2UudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmxhYl9zcGVlZC5zdHJpbmcgPSBoZXJvQ29uZmlnLnNwZWVkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5sYWJfbmFtZS5zdHJpbmcgPSBpc1VubG9ja2VkID8gaGVyb0NvbmZpZy5uYW1lIDogXCJcIjtcclxuICAgICAgICB0aGlzLmxhYl9kZWZlbnNlX3N0YXIuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLmxhYl9hdHRhY2tfc3Rhci5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubGFiX2hwX3N0YXIuc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhckRhdGEgPSBnbS5kYXRhLmhlcm9fc3Rhcl9kYXRhLmdldEhlcm9TdGFyRGF0YShoZXJvQ29uZmlnLmFybXMpO1xyXG4gICAgICAgIGlmIChzdGFyRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9kZWZlbnNlX3N0YXIuc3RyaW5nID0gYDxiPjxjb2xvcj0jMDAwMDAwPu+8iFBow7JuZyB0aOG7pyArPC9jb2xvcj48Y29sb3I9IzEyODQwMD4ke01hdGguZmxvb3IoaGVyb0NvbmZpZy5kZWZlbnNlICogc3RhckRhdGEuZGVmZW5zZSl977yJPC9jb2xvcj5gO1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9hdHRhY2tfc3Rhci5zdHJpbmcgPSBgPGI+PGNvbG9yPSMwMDAwMDA+KFThuqVuIGPDtG5nICs8L2NvbG9yPjxjb2xvcj0jMTI4NDAwPiR7TWF0aC5mbG9vcihoZXJvQ29uZmlnLmF0dGFjayAqIHN0YXJEYXRhLmF0dGFjayl977yJPC9jb2xvcj5gO1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9ocF9zdGFyLnN0cmluZyA9IGA8Yj48Y29sb3I9IzAwMDAwMD7vvIhTaW5oIG3huqFuZyArPC9jb2xvcj48Y29sb3I9IzEyODQwMD4ke3N0YXJEYXRhLmhwfe+8iTwvY29sb3I+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubHZzWzBdLnBhcmVudC5hY3RpdmUgPSB0aGlzLnRJdGVtSWQubGVuZ3RoID4gMTtcclxuICAgICAgICB0aGlzLmRvdHNbMF0ucGFyZW50LmFjdGl2ZSA9IHRoaXMudEl0ZW1JZC5sZW5ndGggPiAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50SXRlbUlkLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmx2cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sdnNbaV0uYWN0aXZlID0gaSA9PSB0aGlzLmlDdXJJbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZG90cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3RzW2ldLmFjdGl2ZSA9IGkgPCB0aGlzLnRJdGVtSWQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3RzW2ldLmNvbG9yID0gaSA9PSB0aGlzLmlDdXJJbmRleCA/IGNjLkNvbG9yLldISVRFIDogdGhpcy5jb2xvckRvdEJsYWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvY2N1cGF0aW9uSWRzID0gdGhpcy50T2NjdXBhdGlvbklkc1toZXJvQ29uZmlnLm9jY3VwYXRpb25dO1xyXG4gICAgICAgIGlmICh0aGlzLmljb25fb2NjdXBhdGlvbnNbMF0ubm9kZS5wYXJlbnQucGFyZW50LmFjdGl2ZSA9IG9jY3VwYXRpb25JZHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAob2NjdXBhdGlvbklkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9jY3VwYXRpb25JY29uID0gdGhpcy5pY29uX29jY3VwYXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIG9jY3VwYXRpb25JY29uLm5vZGUuYWN0aXZlID0gb2NjdXBhdGlvbklkc1tpXSAhPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvY2N1cGF0aW9uSWRzW2ldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShvY2N1cGF0aW9uSWNvbiwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL29jY3VwYXRpb24vXCIgKyBvY2N1cGF0aW9uSWRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTcGluZShub2RlUG9vbEl0ZW06IE5vZGVQb29sSXRlbSk6IHNwLlNrZWxldG9uIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3Qgc2tlbGV0b25Db21wb25lbnQgPSBub2RlUG9vbEl0ZW0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICByZXR1cm4gc2tlbGV0b25Db21wb25lbnQgPT0gbnVsbCA/IG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKHNwLlNrZWxldG9uKSA6IHNrZWxldG9uQ29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjeWxlSGVyb3MoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaGVyb0luZGV4ID0gMDsgaGVyb0luZGV4IDwgdGhpcy50SGVyb3MubGVuZ3RoOyBoZXJvSW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvSUQgPSB0aGlzLnRIZXJvc1toZXJvSW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBzcGluZUluc3RhbmNlID0gdGhpcy5nZXRTcGluZShoZXJvSUQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNwaW5lSW5zdGFuY2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3BpbmVJbnN0YW5jZS5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdtLnBvb2wucHV0KGhlcm9JRC5ub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudEhlcm9zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoSGVyb0FuaSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBoZXJvSW5kZXggPSAwOyBoZXJvSW5kZXggPCB0aGlzLnRIZXJvcy5sZW5ndGg7IGhlcm9JbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9JRCA9IHRoaXMudEhlcm9zW2hlcm9JbmRleF07XHJcbiAgICAgICAgICAgIGNvbnN0IHNwaW5lSW5zdGFuY2UgPSB0aGlzLmdldFNwaW5lKGhlcm9JRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc3BpbmVJbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzcGluZUluc3RhbmNlLnNldFRvU2V0dXBQb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbk5hbWUgPSBcInN0YXlcIjtcclxuICAgICAgICAgICAgICAgIGxldCBza2luTmFtZSA9IFwiZnJvbnRcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zQW5pICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uTmFtZSA9IHRoaXMuc0FuaTtcclxuICAgICAgICAgICAgICAgICAgICBza2luTmFtZSA9IHRoaXMuc1NraW47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNraW5OYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGluZUluc3RhbmNlLnNldFNraW4oc2tpbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3BpbmVJbnN0YW5jZS5zZXRBbmltYXRpb24oMCwgYW5pbWF0aW9uTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzcGluZUluc3RhbmNlLmFuaW1hdGlvbiA9IGFuaW1hdGlvbk5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzY3JvbGxUbyhpc05leHQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGFyZ2V0WDogbnVtYmVyLCByZXNldFg6IG51bWJlcjtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYklzSWNvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50SXRlbUlkW3RoaXMuaUN1ckluZGV4XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJJc1N3aXRjaGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRYID0gaXNOZXh0ID8gdGhpcy5ub2RlX3Jvb3Qud2lkdGggOiAtMSAqIHRoaXMubm9kZV9yb290LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgcmVzZXRYID0gaXNOZXh0ID8gLTEgKiB0aGlzLm5vZGVfcm9vdC53aWR0aCA6IHRoaXMubm9kZV9yb290LndpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuaWNvbi5ub2RlKS50bygwLjA4LCB7IHg6IHRhcmdldFggfSkuY2FsbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pY29uLm5vZGUueCA9IHJlc2V0WDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBib29rRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCBzZWxmLnRJdGVtSWRbc2VsZi5pQ3VySW5kZXhdLnRvU3RyaW5nKCkpIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShzZWxmLmljb24sIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGJvb2tEYXRhLmljb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1VubG9ja2VkID0gc2VsZi5jaGVja0lzVW5sb2NrKGJvb2tEYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmljb24ubm9kZS5jb2xvciA9IGlzVW5sb2NrZWQgPyBjYy5Db2xvci5XSElURSA6IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaWNvbi5ub2RlLm9wYWNpdHkgPSBpc1VubG9ja2VkID8gMjU1IDogMTcxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihzZWxmLmljb24ubm9kZSkudG8oMC4wOCwgeyB4OiAwIH0pLmNhbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJJc1N3aXRjaGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb1BhcmVudE5vZGUgPSB0aGlzLnBvc19oZXJvc1swXS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIHRhcmdldFggPSBpc05leHQgPyB0aGlzLm5vZGVfcm9vdC53aWR0aCA6IC0xICogdGhpcy5ub2RlX3Jvb3Qud2lkdGg7XHJcbiAgICAgICAgICAgIHRhcmdldFggKz0gaGVyb1BhcmVudE5vZGUueDtcclxuICAgICAgICAgICAgdGhpcy5iSXNTd2l0Y2hpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSGVyb0FuaSgpO1xyXG5cclxuICAgICAgICAgICAgY2MudHdlZW4oaGVyb1BhcmVudE5vZGUpLnRvKDAuMSwgeyB4OiB0YXJnZXRYIH0pLmNhbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5iSXNTd2l0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoQnRuQXJyb3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idG5fbGVmdC5hY3RpdmUgPSB0aGlzLnRJdGVtSWRbdGhpcy5pQ3VySW5kZXggLSAxXSAhPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYnRuX3JpZ2h0LmFjdGl2ZSA9IHRoaXMudEl0ZW1JZFt0aGlzLmlDdXJJbmRleCArIDFdICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoYnV0dG9uTm9kZTogY2MuRXZlbnQsIGFkZGl0aW9uYWxEYXRhOiBzdHJpbmcgfCBudWxsID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoYnV0dG9uTm9kZS50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShDb25zdGFudHMuX2luc3RhbmNlLkJPT0tfSEVST19ERVRBSUwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fYXJyb3dfTFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYklzU3dpdGNoaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlDdXJJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUbyh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEJ0bkFycm93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdHRyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hcnJvd19SXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iSXNTd2l0Y2hpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaUN1ckluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEJ0bkFycm93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdHRyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRJdGVtSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmVjeWxlSGVyb3MoKTtcclxuICAgIH1cclxufVxyXG4iXX0=