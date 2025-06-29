
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/NewHeroAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5ld0hlcm9BbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTixpQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ3pDLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFHeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEIsK0JBQVk7SUFBdEM7UUFBQSxxRUF5RkM7UUF2RlcsaUJBQVcsR0FBcUIsSUFBSSxDQUFDO1FBR3JDLHVCQUFpQixHQUFxQixJQUFJLENBQUM7UUFHM0MsNEJBQXNCLEdBQXFCLElBQUksQ0FBQztRQUdoRCw2QkFBdUIsR0FBcUIsSUFBSSxDQUFDO1FBR2pELHNCQUFnQixHQUFxQixJQUFJLENBQUM7UUFHMUMsdUJBQWlCLEdBQXFCLElBQUksQ0FBQztRQUczQyxtQkFBYSxHQUFvQixJQUFJLENBQUM7UUFHdEMsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFFaEMsYUFBTyxHQUFXLENBQUMsQ0FBQzs7SUFnRWhDLENBQUM7SUE5RGEsOEJBQVEsR0FBbEI7UUFBQSxpQkFzREM7UUFyREcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUNqQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFF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QUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBdEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQytCO0lBR25EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0RBQ29DO0lBR3hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0VBQ3FDO0lBR3pEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQzhCO0lBR2xEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQytCO0lBR25EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQzJCO0lBRzlDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ3NCO0lBdkJ0QyxXQUFXO1FBRGhCLE9BQU87T0FDRixXQUFXLENBeUZoQjtJQUFELGtCQUFDO0NBekZELEFBeUZDLENBekZ5QixFQUFFLENBQUMsU0FBUyxHQXlGckM7QUFFRCxrQkFBZSxXQUFXLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBIZXJvQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaGVybyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTmV3SGVyb0FuaW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb19zcHJpdGU6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGhlcm9fY29sb3Jfc3ByaXRlOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX3Byb2Zlc3Npb25fc3ByaXRlOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX3Byb2Zlc3Npb24yX3Nwcml0ZTogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgbGVmdF9pdGVtX3Nwcml0ZTogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgcmlnaHRfaXRlbV9zcHJpdGU6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgaGVyb19uYW1lX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcm9sZU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9oZXJvSUQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCB0aGlzLnBsYXlBbmltRW5kLCB0aGlzKTtcclxuICAgICAgICBpZiAoMCA8IHRoaXMucm9sZU5vZGUuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLnJvbGVOb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzE2M19VTkxPQ0tfTkVXX0hFUk9fQU5JTSk7XHJcbiAgICAgICAgdGhpcy5faGVyb0lEID0gZ20udWkuZ2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0Lk5FV0hFUk9BTklNLmtleSkgYXMgbnVtYmVyO1xyXG4gICAgICAgIHRoaXMuaGVyb19jb2xvcl9zcHJpdGUubm9kZS5hY3RpdmUgPSB0aGlzLmhlcm9fcHJvZmVzc2lvbl9zcHJpdGUubm9kZS5hY3RpdmUgPSB0aGlzLmhlcm9fcHJvZmVzc2lvbjJfc3ByaXRlLm5vZGUuYWN0aXZlID0gdGhpcy5oZXJvX25hbWVfbGJsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgdGhpcy5faGVyb0lELnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgaWYgKCFoZXJvRGF0YSkge1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLnJvbGVOb2RlKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuTkVXSEVST0FOSU0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgaGVyb0RhdGEuaGVyb2lkLCBOb2RlUG9vbEl0ZW0sIChub2RlUG9vbEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy5yb2xlTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVOb2RlLmFkZENoaWxkKG5vZGVQb29sSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5ub2RlLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgbm9kZVBvb2xJdGVtLm5vZGUueSA9IC02OTtcclxuICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5ub2RlLnNjYWxlID0gMi41O1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZVBvb2xJdGVtLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihcImZyb250XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcInN0YXlcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChub2RlUG9vbEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9fY29sb3Jfc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvY2lyY2xlQ29sb3JfXCIgKyBoZXJvRGF0YS5jb2xvcik7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9fc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGVyb0NpcmNsZUltZy9cIiArIGhlcm9EYXRhLmhlcm9pZCk7XHJcbiAgICAgICAgdGhpcy5oZXJvX25hbWVfbGJsLnN0cmluZyA9IGhlcm9EYXRhLm5hbWU7XHJcblxyXG4gICAgICAgIGlmIChoZXJvRGF0YS5vY2N1cGF0aW9uIDw9IDYpIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3Byb2Zlc3Npb25fc3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKDMgPCBoZXJvRGF0YS5vY2N1cGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fcHJvZmVzc2lvbjJfc3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvX3Byb2Zlc3Npb25fc3ByaXRlLCBCdW5kbGVOYW1lLkJVSUxEX0ZVTkNUSU9OLCBcInJlcy8xXCIpO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9fcHJvZmVzc2lvbjJfc3ByaXRlLCBCdW5kbGVOYW1lLkJVSUxEX0ZVTkNUSU9OLCBcInJlcy8yXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmhlcm9fcHJvZmVzc2lvbl9zcHJpdGUsIEJ1bmRsZU5hbWUuQlVJTERfRlVOQ1RJT04sIFwicmVzL1wiICsgaGVyb0RhdGEub2NjdXBhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fcHJvZmVzc2lvbjJfc3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3Byb2Zlc3Npb25fc3ByaXRlLm5vZGUuYWN0aXZlID0gdGhpcy5oZXJvX3Byb2Zlc3Npb24yX3Nwcml0ZS5ub2RlLmFjdGl2ZSA9ICExO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmxlZnRfaXRlbV9zcHJpdGUsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oZXJvQ2lyY2xlSW1nL1wiICsgaGVyb0RhdGEuaXRlbVR5cGVbMF0pO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5yaWdodF9pdGVtX3Nwcml0ZSwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL1wiICsgaGVyb0RhdGEuaXRlbVR5cGVbMV0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QW5pbUVuZChldmVudDogY2MuQW5pbWF0aW9uLkV2ZW50VHlwZSwgYW5pbWF0aW9uTmFtZTogeyBuYW1lOiBzdHJpbmcgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChcIm5ld0hlcm9cIiA9PSBhbmltYXRpb25OYW1lLm5hbWUpIHtcclxuICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5yb2xlTm9kZSk7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0Lk5FV0hFUk9BTklNKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld0hlcm9BbmltOyJdfQ==