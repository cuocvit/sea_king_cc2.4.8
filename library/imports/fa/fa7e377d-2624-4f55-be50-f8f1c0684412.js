"use strict";
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