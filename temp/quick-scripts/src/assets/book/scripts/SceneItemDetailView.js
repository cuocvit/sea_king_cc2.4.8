"use strict";
cc._RF.push(module, '440ef76ndtIwpMf6dpQJuLA', 'SceneItemDetailView');
// book/scripts/SceneItemDetailView.ts

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
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var SceneBookLogic_1 = require("./SceneBookLogic");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SceneItemDetailView = /** @class */ (function (_super) {
    __extends(SceneItemDetailView, _super);
    function SceneItemDetailView() {
        var _this = _super.call(this) || this;
        _this.btn_left = null;
        _this.btn_right = null;
        _this.big_icon = null;
        _this.list_lvs = null;
        _this.lab_name = null;
        _this.tItemId = null;
        _this.bIsSwitching = false;
        _this.iCurIndex = 0;
        _this.tLvNums = [1, 3, 7, 15, 31, 63, 128, 260];
        return _this;
    }
    SceneItemDetailView.prototype.onLoad = function () { };
    SceneItemDetailView.prototype.onEnable = function () {
        this.iCurIndex = 0;
        this.tItemId = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.BOOK_ITEM_DETAIL.key);
        this.refreshBtnArrow();
        var bookConfig = GameManager_1.gm.config.get_row_data("BookConfigData", this.tItemId[0].toString());
        var iconData = this.getIconData(bookConfig);
        if (this.big_icon) {
            this.big_icon.node.scale = iconData.iScale;
            Utils_1.Utils.async_set_sprite_frame(this.big_icon, Constants_1.BundleName.COMMON, iconData.sIconPath);
        }
        var isUnlocked = this.checkIsUnlock(this.tItemId[0]);
        if (this.lab_name) {
            this.lab_name.string = isUnlocked ? bookConfig.name : "";
        }
        if (this.big_icon) {
            this.big_icon.node.opacity = isUnlocked ? 255 : 171;
            this.big_icon.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
        }
        this.refreshLvList();
    };
    SceneItemDetailView.prototype.switchIndex = function (direction) {
        var _this = this;
        if (direction !== 0) {
            this.iCurIndex += direction;
            var bookConfig_1 = GameManager_1.gm.config.get_row_data("BookConfigData", this.tItemId[this.iCurIndex].toString());
            var targetX = direction > 0 ? 0 : 720;
            var resetX_1 = direction > 0 ? 720 : 0;
            this.bIsSwitching = true;
            var isUnlocked_1 = this.checkIsUnlock(this.tItemId[this.iCurIndex]);
            if (this.lab_name) {
                this.lab_name.string = isUnlocked_1 ? bookConfig_1.name : "";
            }
            cc.tween(this.big_icon.node).to(0.1, { x: targetX }).call(function () {
                if (_this.big_icon) {
                    _this.big_icon.node.opacity = 0;
                    _this.big_icon.node.x = resetX_1;
                    var iconData_1 = _this.getIconData(bookConfig_1);
                    Utils_1.Utils.async_set_sprite_frame(_this.big_icon, Constants_1.BundleName.COMMON, iconData_1.sIconPath, function () {
                        if (_this.big_icon) {
                            _this.big_icon.node.scale = iconData_1.iScale;
                            _this.big_icon.node.opacity = isUnlocked_1 ? 255 : 171;
                            _this.big_icon.node.color = isUnlocked_1 ? cc.Color.WHITE : cc.Color.BLACK;
                        }
                    }, _this);
                    cc.tween(_this.big_icon.node).to(0.1, { x: 0 }).call(function () {
                        _this.refreshLvList();
                        _this.refreshBtnArrow();
                        _this.bIsSwitching = false;
                    }).start();
                }
            }).start();
        }
        else {
            this.refreshLvList();
        }
    };
    SceneItemDetailView.prototype.getIconData = function (bookConfig) {
        var iconPath = "res/handbook/" + bookConfig.icon;
        var scale = 2;
        if (bookConfig.is_big_icon == 1) {
            iconPath = "res/handbookBig/" + bookConfig.icon;
            scale = 1;
        }
        return { sIconPath: iconPath, iScale: scale };
    };
    SceneItemDetailView.prototype.refreshLvList = function () {
        var _a, _b;
        var levelCount = ((_a = this.list_lvs) === null || _a === void 0 ? void 0 : _a.childrenCount) || 0;
        for (var index = 0; index < levelCount; index++) {
            var levelCell = (_b = this.list_lvs) === null || _b === void 0 ? void 0 : _b.children[index];
            if (levelCell) {
                this.refreshOneLvCell(levelCell, index);
            }
        }
    };
    SceneItemDetailView.prototype.refreshOneLvCell = function (cellNode, index) {
        var itemId = this.tItemId[index];
        cellNode.active = itemId != null;
        if (itemId != null) {
            var bookConfig = GameManager_1.gm.config.get_row_data("BookConfigData", itemId.toString());
            var arrowIcon = this.getChild(cellNode, "icon_arrow_min");
            var selectionIndicator = this.getChild(cellNode, "select");
            var newIndicator = this.getChild(cellNode, "new");
            var numLabel = this.getChildComp(cellNode, "lab_num", cc.Label);
            var nameLabel = this.getChildComp(cellNode, "lab_name", cc.Label);
            var iconSprite = this.getChildComp(cellNode, "icon", cc.Sprite);
            if (iconSprite) {
                iconSprite.node.scale = 0.75;
                Utils_1.Utils.async_set_sprite_frame(iconSprite, Constants_1.BundleName.COMMON, "res/handbook/" + bookConfig.icon);
            }
            if (selectionIndicator) {
                selectionIndicator.active = this.iCurIndex == index;
            }
            if (arrowIcon) {
                arrowIcon.active = index > 0 && index !== 4;
            }
            if (numLabel) {
                numLabel.node.active = false;
            }
            if (nameLabel) {
                nameLabel.string = "";
            }
            var isUnlocked = this.checkIsUnlock(itemId);
            if (iconSprite) {
                iconSprite.node.opacity = isUnlocked ? 255 : 171;
                iconSprite.node.color = isUnlocked ? cc.Color.WHITE : cc.Color.BLACK;
            }
            var hasReward = isUnlocked && GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward(itemId);
            if (newIndicator) {
                newIndicator.active = hasReward;
            }
            if (isUnlocked) {
                if (numLabel && bookConfig.sub_type == SceneBookLogic_1.default.SUB_TYPE_MATERIAL_NORMAL) {
                    numLabel.node.active = true;
                    numLabel.string = "X" + this.tLvNums[index];
                }
                if (nameLabel) {
                    nameLabel.string = bookConfig.name;
                }
            }
            if (hasReward) {
                var rewardIcon = this.getChildComp(newIndicator, "reward_icon", cc.Sprite);
                if (rewardIcon) {
                    rewardIcon.node.scale = 0.45;
                    Utils_1.Utils.async_set_sprite_frame(rewardIcon, Constants_1.BundleName.COMMON, "res/handbook/" + bookConfig.reward);
                }
            }
        }
    };
    SceneItemDetailView.prototype.checkIsUnlock = function (key) {
        return GameManager_1.gm.data.mapCell_data.checkBookItemIsUnlock(key);
    };
    SceneItemDetailView.prototype.gainReward = function (index) {
        var itemId = this.tItemId[index];
        if (GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward(itemId)) {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemId);
            if (itemConfig) {
                GameManager_1.gm.channel.report_event("receive_handbook_reward", {
                    event_desc: "领取图鉴奖励",
                    desc: "领取图鉴奖励" + itemConfig.name
                });
                NetUtils_1.ReportData.instance.report_once_point(10831);
                NetUtils_1.ReportData.instance.report_point(10832);
            }
            var rewardData = GameManager_1.gm.config.get_row_data("BookConfigData", itemId.toString());
            if (rewardData.reward == 11003) {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, rewardData.num);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            else if (rewardData.reward == 11002) {
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, rewardData.num);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
            GameManager_1.gm.data.mapCell_data.setBookItemGainUnlockReward(itemId);
            GameManager_1.gm.ui.get_module(GameManager_1.gm.const.BOOK).getLogic().refreshRed();
        }
    };
    SceneItemDetailView.prototype.refreshBtnArrow = function () {
        this.btn_left.active = this.tItemId[this.iCurIndex - 1] != null;
        this.btn_right.active = this.tItemId[this.iCurIndex + 1] != null;
    };
    SceneItemDetailView.prototype.editor_on_button_click_handler = function (button, event) {
        var _a, _b;
        if (event === void 0) { event = null; }
        switch (button.target.name) {
            case "btn_close":
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BOOK_ITEM_DETAIL);
                break;
            case "btn_arrow_L":
                if (this.bIsSwitching)
                    return;
                this.switchIndex(-1);
                break;
            case "btn_arrow_R":
                if (this.bIsSwitching)
                    return;
                this.switchIndex(1);
                break;
            case "btn_lv":
                var levelIndex = 0;
                var totalLevels = ((_a = this.list_lvs) === null || _a === void 0 ? void 0 : _a.childrenCount) || 0;
                for (var i = 0; i < totalLevels; i++) {
                    if (((_b = this.list_lvs) === null || _b === void 0 ? void 0 : _b.children[i].uuid) == button.target.parent.uuid) {
                        levelIndex = i;
                    }
                }
                var levelDifference = levelIndex - this.iCurIndex;
                this.gainReward(levelIndex);
                this.switchIndex(levelDifference);
                console.log("btn_lv iLvIndex:" + levelIndex);
                var bookModule = GameManager_1.gm.ui.get_module(GameManager_1.gm.const.BOOK);
                if (bookModule) {
                    bookModule.getLogic().refreshCurTab();
                }
                break;
        }
    };
    SceneItemDetailView.prototype.onDisable = function () {
        this.tItemId = null;
    };
    SceneItemDetailView.prototype.getChildComp = function (parentNode, childName, componentType) {
        var childNode = this.getChild(parentNode, childName);
        return childNode ? childNode.getComponent(componentType) : null;
    };
    SceneItemDetailView.prototype.getChild = function (parentNode, childPath) {
        var names = childPath.split("/");
        var currentNode = parentNode;
        for (var i = 0; i < names.length; i++) {
            if (currentNode == null) {
                cc.error("Utils getChild childPath: " + childPath + " index: " + (i - 1) + " name: " + names[i - 1]);
                return null;
            }
            currentNode = currentNode.getChildByName(names[i]);
        }
        return currentNode;
    };
    __decorate([
        property(cc.Node)
    ], SceneItemDetailView.prototype, "btn_left", void 0);
    __decorate([
        property(cc.Node)
    ], SceneItemDetailView.prototype, "btn_right", void 0);
    __decorate([
        property(cc.Sprite)
    ], SceneItemDetailView.prototype, "big_icon", void 0);
    __decorate([
        property(cc.Node)
    ], SceneItemDetailView.prototype, "list_lvs", void 0);
    __decorate([
        property(cc.Label)
    ], SceneItemDetailView.prototype, "lab_name", void 0);
    SceneItemDetailView = __decorate([
        ccclass
    ], SceneItemDetailView);
    return SceneItemDetailView;
}(GameModule_1.GameModule));

cc._RF.pop();