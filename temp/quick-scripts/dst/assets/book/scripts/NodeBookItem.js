
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/book/scripts/NodeBookItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fa7e3d9JiRPVb5Q+PHAaEQS', 'NodeBookItem');
// book/scripts/NodeBookItem.ts

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
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var Utils_1 = require("../../start-scene/scripts/Utils");
var SceneBookLogic_1 = require("./SceneBookLogic");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NodeBookItem = /** @class */ (function (_super) {
    __extends(NodeBookItem, _super);
    function NodeBookItem() {
        var _this = _super.call(this) || this;
        _this.icon = null;
        _this.node_empty = null;
        _this.node_root = null;
        _this.icon_reward = null;
        _this.btn_click = null;
        _this.color_bgs = [];
        _this.iItemId = 0;
        _this.iScale = 0;
        return _this;
    }
    NodeBookItem.prototype.onLoad = function () { };
    NodeBookItem.prototype.onEnable = function () {
        this.setScale(this.iScale);
    };
    NodeBookItem.prototype.start = function () { };
    NodeBookItem.prototype.init = function (itemId, interactable) {
        this.btn_click.interactable = (interactable !== undefined) ? interactable : true;
        if (itemId <= 0)
            return;
        this.iItemId = itemId;
        var logic = GameManager_1.gm.ui.get_module(GameManager_1.gm.const.BOOK).getLogic();
        var delayCd = logic.getDelayCd(itemId);
        var configData = GameManager_1.gm.config.get_row_data("BookConfigData", itemId.toString());
        this.node_root.active = true;
        var isUnlock = logic.checkIsUnlock(itemId);
        var hasUnlockReward = GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward(itemId);
        var hasReward = configData.reward > 0 && isUnlock && hasUnlockReward;
        var isHeroType = false;
        if (!(isHeroType = [SceneBookLogic_1.default.SUB_TYPE_HERO, SceneBookLogic_1.default.SUB_TYPE_SUPER_HERO, SceneBookLogic_1.default.SUB_TYPE_HERO_WALL, SceneBookLogic_1.default.SUB_TYPE_DEFEND].includes(configData.sub_type)) && !hasReward) {
            var levelList = logic.getLvList(itemId);
            for (var _i = 0, levelList_1 = levelList; _i < levelList_1.length; _i++) {
                var level = levelList_1[_i];
                var bookconfig = GameManager_1.gm.config.get_row_data("BookConfigData", level.toString());
                hasReward = 0 < bookconfig.reward;
                if (hasReward && logic.checkIsUnlock(level) && GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward(level)) {
                    break;
                }
            }
        }
        var colorIndex = isUnlock ? configData.color : 0;
        this.color_bgs.forEach(function (bg, index) {
            bg.active = index == colorIndex;
        });
        Utils_1.Utils.async_set_sprite_frame(this.icon, Constants_1.BundleName.COMMON, "res/handbook/" + configData.icon);
        this.icon.node.opacity = isUnlock ? 255 : 171;
        this.icon.node.color = isUnlock ? cc.Color.WHITE : cc.Color.BLACK;
        this.icon_reward.node.parent.active = hasReward;
        this.icon_reward.node.scale = 0.6;
        if (hasReward) {
            this.icon_reward.node.active = isHeroType;
            if (this.icon_reward.node.active) {
                Utils_1.Utils.async_set_sprite_frame(this.icon_reward, Constants_1.BundleName.COMMON, "res/handbook/" + configData.reward);
            }
        }
        this.delayShow(delayCd);
    };
    NodeBookItem.prototype.delayShow = function (delay) {
        cc.Tween.stopAllByTarget(this.node_root);
        if (delay <= 0) {
            this.node_root.opacity = 255;
        }
        else {
            this.node_root.opacity = 0;
            cc.tween(this.node_root).delay(delay).to(0.42, { opacity: 255 }).start();
        }
    };
    NodeBookItem.prototype.setScale = function (scale) {
        this.iScale = scale;
        this.node.scale = this.iScale;
    };
    NodeBookItem.prototype.checkGainReward = function () {
        if (!this.icon_reward.node.active)
            return false;
        var configData = GameManager_1.gm.config.get_row_data("BookConfigData", this.iItemId.toString());
        if (GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward(this.iItemId)) {
            if (configData.reward == Constants_1.RewardIdEnum.DIAMOND) {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, configData.num);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (configData.reward == Constants_1.RewardIdEnum.GOLD) {
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, configData.num);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            GameManager_1.gm.data.mapCell_data.setBookItemGainUnlockReward(this.iItemId);
            this.icon_reward.node.parent.active = false;
            this.icon_reward.node.active = false;
            GameManager_1.gm.ui.get_module(GameManager_1.gm.const.BOOK).getLogic().refreshRed();
            return true;
        }
        return false;
    };
    NodeBookItem.prototype.editor_on_button_click_handler = function (event, customData) {
        if (customData === void 0) { customData = null; }
        console.log("NodeBookItem->editor_on_button_click_handler:", this.iItemId);
        if (!this.checkGainReward() && this.iItemId > 0) {
            var configData = GameManager_1.gm.config.get_row_data("BookConfigData", this.iItemId.toString());
            var logic = GameManager_1.gm.ui.get_module(GameManager_1.gm.const.BOOK).getLogic();
            if ([SceneBookLogic_1.default.SUB_TYPE_HERO, SceneBookLogic_1.default.SUB_TYPE_DEFEND, SceneBookLogic_1.default.SUB_TYPE_SUPER_HERO].includes(configData.sub_type)) {
                var levelList = logic.getLvList(this.iItemId);
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_HERO_DETAIL.key, levelList);
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_HERO_DETAIL);
            }
            else if (configData.sub_type == SceneBookLogic_1.default.SUB_TYPE_HERO_WALL) {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_HERO_DETAIL.key, [this.iItemId]);
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_HERO_DETAIL);
            }
            else {
                var levelList = logic.getLvList(this.iItemId);
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.BOOK_ITEM_DETAIL.key, levelList);
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK_ITEM_DETAIL);
            }
        }
    };
    NodeBookItem.prototype.reset = function () {
        cc.Tween.stopAllByTarget(this.node_root);
        this.iItemId = 0;
        this.node_root.opacity = 255;
        this.node_empty.active = true;
        this.node_root.active = false;
        this.setScale(1);
    };
    NodeBookItem.prototype.onDisable = function () { };
    __decorate([
        property(cc.Sprite)
    ], NodeBookItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], NodeBookItem.prototype, "node_empty", void 0);
    __decorate([
        property(cc.Node)
    ], NodeBookItem.prototype, "node_root", void 0);
    __decorate([
        property(cc.Sprite)
    ], NodeBookItem.prototype, "icon_reward", void 0);
    __decorate([
        property(cc.Button)
    ], NodeBookItem.prototype, "btn_click", void 0);
    __decorate([
        property({ type: [cc.Node] })
    ], NodeBookItem.prototype, "color_bgs", void 0);
    NodeBookItem = __decorate([
        ccclass
    ], NodeBookItem);
    return NodeBookItem;
}(NodePoolItem_1.NodePoolItem));
exports.default = NodeBookItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYm9va1xcc2NyaXB0c1xcTm9kZUJvb2tJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFzRTtBQUN0RSxxRUFBMkQ7QUFDM0QsaUVBQStGO0FBQy9GLHlEQUF3RDtBQUN4RCxtREFBOEM7QUFHeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkIsZ0NBQVk7SUFzQm5DO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBeEJPLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYyxFQUFFLENBQUM7UUFPOUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0lBQ3BCLENBQUM7SUFFUyw2QkFBTSxHQUFoQixjQUEyQixDQUFDO0lBRWxCLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVTLDRCQUFLLEdBQWYsY0FBMEIsQ0FBQztJQUVwQiwyQkFBSSxHQUFYLFVBQVksTUFBYyxFQUFFLFlBQXNCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRixJQUFJLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0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QixDQUFDO0lBakovQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ2dCO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2tCO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7bURBQ0k7SUFqQmhDLFlBQVk7UUFEakIsT0FBTztPQUNGLFlBQVksQ0FvSmpCO0lBQUQsbUJBQUM7Q0FwSkQsQUFvSkMsQ0FwSjBCLDJCQUFZLEdBb0p0QztBQUVELGtCQUFlLFlBQVksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgUmV3YXJkSWRFbnVtLCBTZXRJdGVtTnVtRW51bSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IFNjZW5lQm9va0xvZ2ljIGZyb20gJy4vU2NlbmVCb29rTG9naWMnO1xyXG5pbXBvcnQgeyBCb29rQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvYm9va3MnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIE5vZGVCb29rSXRlbSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub2RlX2VtcHR5OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbm9kZV9yb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBpY29uX3Jld2FyZDogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBidG5fY2xpY2s6IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdIH0pXHJcbiAgICBwcml2YXRlIGNvbG9yX2JnczogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBpSXRlbUlkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGlTY2FsZTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmlJdGVtSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaVNjYWxlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U2NhbGUodGhpcy5pU2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGl0ZW1JZDogbnVtYmVyLCBpbnRlcmFjdGFibGU/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idG5fY2xpY2suaW50ZXJhY3RhYmxlID0gKGludGVyYWN0YWJsZSAhPT0gdW5kZWZpbmVkKSA/IGludGVyYWN0YWJsZSA6IHRydWU7XHJcbiAgICAgICAgaWYgKGl0ZW1JZCA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pSXRlbUlkID0gaXRlbUlkO1xyXG4gICAgICAgIGNvbnN0IGxvZ2ljID0gZ20udWkuZ2V0X21vZHVsZShnbS5jb25zdC5CT09LKS5nZXRMb2dpYygpO1xyXG4gICAgICAgIGNvbnN0IGRlbGF5Q2QgPSBsb2dpYy5nZXREZWxheUNkKGl0ZW1JZCk7XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCBpdGVtSWQudG9TdHJpbmcoKSkgYXMgQm9va0NvbmZpZztcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlX3Jvb3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBpc1VubG9jayA9IGxvZ2ljLmNoZWNrSXNVbmxvY2soaXRlbUlkKTtcclxuICAgICAgICBjb25zdCBoYXNVbmxvY2tSZXdhcmQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5jaGVja0Jvb2tJdGVtSGF2ZVVubG9ja1Jld2FyZChpdGVtSWQpO1xyXG4gICAgICAgIGxldCBoYXNSZXdhcmQ6IGJvb2xlYW4gPSBjb25maWdEYXRhLnJld2FyZCA+IDAgJiYgaXNVbmxvY2sgJiYgaGFzVW5sb2NrUmV3YXJkO1xyXG5cclxuICAgICAgICBsZXQgaXNIZXJvVHlwZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghKGlzSGVyb1R5cGUgPSBbU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVSTywgU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfU1VQRVJfSEVSTywgU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfSEVST19XQUxMLCBTY2VuZUJvb2tMb2dpYy5TVUJfVFlQRV9ERUZFTkRdLmluY2x1ZGVzKGNvbmZpZ0RhdGEuc3ViX3R5cGUpKSAmJiAhaGFzUmV3YXJkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsTGlzdCA9IGxvZ2ljLmdldEx2TGlzdChpdGVtSWQpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxldmVsIG9mIGxldmVsTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9va2NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCBsZXZlbC50b1N0cmluZygpKSBhcyBCb29rQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgaGFzUmV3YXJkID0gMCA8IGJvb2tjb25maWcucmV3YXJkO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1Jld2FyZCAmJiBsb2dpYy5jaGVja0lzVW5sb2NrKGxldmVsKSAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5jaGVja0Jvb2tJdGVtSGF2ZVVubG9ja1Jld2FyZChsZXZlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29sb3JJbmRleCA9IGlzVW5sb2NrID8gY29uZmlnRGF0YS5jb2xvciA6IDA7XHJcbiAgICAgICAgdGhpcy5jb2xvcl9iZ3MuZm9yRWFjaCgoYmcsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJnLmFjdGl2ZSA9IGluZGV4ID09IGNvbG9ySW5kZXg7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5pY29uLCBCdW5kbGVOYW1lLkNPTU1PTiwgYHJlcy9oYW5kYm9vay8ke2NvbmZpZ0RhdGEuaWNvbn1gKTtcclxuICAgICAgICB0aGlzLmljb24ubm9kZS5vcGFjaXR5ID0gaXNVbmxvY2sgPyAyNTUgOiAxNzE7XHJcbiAgICAgICAgdGhpcy5pY29uLm5vZGUuY29sb3IgPSBpc1VubG9jayA/IGNjLkNvbG9yLldISVRFIDogY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgICAgdGhpcy5pY29uX3Jld2FyZC5ub2RlLnBhcmVudC5hY3RpdmUgPSBoYXNSZXdhcmQ7XHJcbiAgICAgICAgdGhpcy5pY29uX3Jld2FyZC5ub2RlLnNjYWxlID0gMC42O1xyXG5cclxuICAgICAgICBpZiAoaGFzUmV3YXJkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbl9yZXdhcmQubm9kZS5hY3RpdmUgPSBpc0hlcm9UeXBlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pY29uX3Jld2FyZC5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmljb25fcmV3YXJkLCBCdW5kbGVOYW1lLkNPTU1PTiwgYHJlcy9oYW5kYm9vay8ke2NvbmZpZ0RhdGEucmV3YXJkfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRlbGF5U2hvdyhkZWxheUNkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlbGF5U2hvdyhkZWxheTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMubm9kZV9yb290KTtcclxuICAgICAgICBpZiAoZGVsYXkgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfcm9vdC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9yb290Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGVfcm9vdCkuZGVsYXkoZGVsYXkpLnRvKDAuNDIsIHsgb3BhY2l0eTogMjU1IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2NhbGUoc2NhbGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaVNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5pU2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0dhaW5SZXdhcmQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmljb25fcmV3YXJkLm5vZGUuYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiQm9va0NvbmZpZ0RhdGFcIiwgdGhpcy5pSXRlbUlkLnRvU3RyaW5nKCkpIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmNoZWNrQm9va0l0ZW1IYXZlVW5sb2NrUmV3YXJkKHRoaXMuaUl0ZW1JZCkpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ0RhdGEucmV3YXJkID09IFJld2FyZElkRW51bS5ESUFNT05EKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCBjb25maWdEYXRhLm51bSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5ESUFNT05ELCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZ0RhdGEucmV3YXJkID09IFJld2FyZElkRW51bS5HT0xEKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCBjb25maWdEYXRhLm51bSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5HT0xELCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEJvb2tJdGVtR2FpblVubG9ja1Jld2FyZCh0aGlzLmlJdGVtSWQpO1xyXG4gICAgICAgICAgICB0aGlzLmljb25fcmV3YXJkLm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmljb25fcmV3YXJkLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdtLnVpLmdldF9tb2R1bGUoZ20uY29uc3QuQk9PSykuZ2V0TG9naWMoKS5yZWZyZXNoUmVkKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgY3VzdG9tRGF0YSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vZGVCb29rSXRlbS0+ZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyOlwiLCB0aGlzLmlJdGVtSWQpO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0dhaW5SZXdhcmQoKSAmJiB0aGlzLmlJdGVtSWQgPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZ0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiQm9va0NvbmZpZ0RhdGFcIiwgdGhpcy5pSXRlbUlkLnRvU3RyaW5nKCkpIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZ2ljID0gZ20udWkuZ2V0X21vZHVsZShnbS5jb25zdC5CT09LKS5nZXRMb2dpYygpO1xyXG4gICAgICAgICAgICBpZiAoW1NjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0hFUk8sIFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0RFRkVORCwgU2NlbmVCb29rTG9naWMuU1VCX1RZUEVfU1VQRVJfSEVST10uaW5jbHVkZXMoY29uZmlnRGF0YS5zdWJfdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxldmVsTGlzdCA9IGxvZ2ljLmdldEx2TGlzdCh0aGlzLmlJdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkJPT0tfSEVST19ERVRBSUwua2V5LCBsZXZlbExpc3QpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5CT09LX0hFUk9fREVUQUlMKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWdEYXRhLnN1Yl90eXBlID09IFNjZW5lQm9va0xvZ2ljLlNVQl9UWVBFX0hFUk9fV0FMTCkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkJPT0tfSEVST19ERVRBSUwua2V5LCBbdGhpcy5pSXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkJPT0tfSEVST19ERVRBSUwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxMaXN0ID0gbG9naWMuZ2V0THZMaXN0KHRoaXMuaUl0ZW1JZCk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuQk9PS19JVEVNX0RFVEFJTC5rZXksIGxldmVsTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkJPT0tfSVRFTV9ERVRBSUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlX3Jvb3QpO1xyXG4gICAgICAgIHRoaXMuaUl0ZW1JZCA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlX3Jvb3Qub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLm5vZGVfZW1wdHkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGVfcm9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldFNjYWxlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7IH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTm9kZUJvb2tJdGVtOyJdfQ==