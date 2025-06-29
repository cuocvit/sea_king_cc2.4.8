
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/book/scripts/SceneItemDetailView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYm9va1xcc2NyaXB0c1xcU2NlbmVJdGVtRGV0YWlsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBK0Y7QUFDL0YscUVBQTJEO0FBQzNELG1FQUFrRTtBQUNsRSx5REFBd0Q7QUFDeEQsK0RBQWdFO0FBQ2hFLG1EQUE4QztBQUd4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQVE1QztJQUFrQyx1Q0FBVTtJQXFCeEM7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUF6Qk8sY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFTckMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUFDbkQsQ0FBQztJQUVTLG9DQUFNLEdBQWhCLGNBQTJCLENBQUM7SUFFbEIsc0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQWEsQ0FBQztRQUVoRixJQUFJLENBQUMsZUFB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QyxDQUFDLENBQUMsQ0FBQztnQkFDckcsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELFdBQVcsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQXZSRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNzQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUN1QjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3lEQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNzQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNzQjtJQWR2QyxtQkFBbUI7UUFEeEIsT0FBTztPQUNGLG1CQUFtQixDQTBSeEI7SUFBRCwwQkFBQztDQTFSRCxBQTBSQyxDQTFSaUMsdUJBQVUsR0EwUjNDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVuZGxlTmFtZSwgUmV3YXJkSWRFbnVtLCBTZXRJdGVtTnVtRW51bSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1vZHVsZSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05ldFV0aWxzJztcclxuaW1wb3J0IFNjZW5lQm9va0xvZ2ljIGZyb20gJy4vU2NlbmVCb29rTG9naWMnO1xyXG5pbXBvcnQgeyBCb29rQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvYm9va3MnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmludGVyZmFjZSBJY29uRGF0YSB7XHJcbiAgICBzSWNvblBhdGg6IHN0cmluZztcclxuICAgIGlTY2FsZTogbnVtYmVyO1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTY2VuZUl0ZW1EZXRhaWxWaWV3IGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX2xlZnQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnRuX3JpZ2h0OiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgYmlnX2ljb246IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsaXN0X2x2czogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGFiX25hbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB0SXRlbUlkOiBudW1iZXJbXSB8IG51bGw7XHJcbiAgICBwcml2YXRlIGJJc1N3aXRjaGluZzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgaUN1ckluZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRMdk51bXM6IG51bWJlcltdO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRJdGVtSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYklzU3dpdGNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pQ3VySW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMudEx2TnVtcyA9IFsxLCAzLCA3LCAxNSwgMzEsIDYzLCAxMjgsIDI2MF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlDdXJJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy50SXRlbUlkID0gZ20udWkuZ2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkJPT0tfSVRFTV9ERVRBSUwua2V5KSBhcyBudW1iZXJbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQnRuQXJyb3coKTtcclxuICAgICAgICBjb25zdCBib29rQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJvb2tDb25maWdEYXRhXCIsIHRoaXMudEl0ZW1JZFswXS50b1N0cmluZygpKSBhcyBCb29rQ29uZmlnO1xyXG4gICAgICAgIGNvbnN0IGljb25EYXRhID0gdGhpcy5nZXRJY29uRGF0YShib29rQ29uZmlnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYmlnX2ljb24pIHtcclxuICAgICAgICAgICAgdGhpcy5iaWdfaWNvbi5ub2RlLnNjYWxlID0gaWNvbkRhdGEuaVNjYWxlO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuYmlnX2ljb24sIEJ1bmRsZU5hbWUuQ09NTU9OLCBpY29uRGF0YS5zSWNvblBhdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNVbmxvY2tlZCA9IHRoaXMuY2hlY2tJc1VubG9jayh0aGlzLnRJdGVtSWRbMF0pO1xyXG4gICAgICAgIGlmICh0aGlzLmxhYl9uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX25hbWUuc3RyaW5nID0gaXNVbmxvY2tlZCA/IGJvb2tDb25maWcubmFtZSA6IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5iaWdfaWNvbikge1xyXG4gICAgICAgICAgICB0aGlzLmJpZ19pY29uLm5vZGUub3BhY2l0eSA9IGlzVW5sb2NrZWQgPyAyNTUgOiAxNzE7XHJcbiAgICAgICAgICAgIHRoaXMuYmlnX2ljb24ubm9kZS5jb2xvciA9IGlzVW5sb2NrZWQgPyBjYy5Db2xvci5XSElURSA6IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTHZMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzd2l0Y2hJbmRleChkaXJlY3Rpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pQ3VySW5kZXggKz0gZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBib29rQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJvb2tDb25maWdEYXRhXCIsIHRoaXMudEl0ZW1JZFt0aGlzLmlDdXJJbmRleF0udG9TdHJpbmcoKSkgYXMgQm9va0NvbmZpZztcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0WCA9IGRpcmVjdGlvbiA+IDAgPyAwIDogNzIwO1xyXG4gICAgICAgICAgICBjb25zdCByZXNldFggPSBkaXJlY3Rpb24gPiAwID8gNzIwIDogMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYklzU3dpdGNoaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzVW5sb2NrZWQgPSB0aGlzLmNoZWNrSXNVbmxvY2sodGhpcy50SXRlbUlkW3RoaXMuaUN1ckluZGV4XSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhYl9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYl9uYW1lLnN0cmluZyA9IGlzVW5sb2NrZWQgPyBib29rQ29uZmlnLm5hbWUgOiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJpZ19pY29uLm5vZGUpLnRvKDAuMSwgeyB4OiB0YXJnZXRYIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmlnX2ljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ19pY29uLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaWdfaWNvbi5ub2RlLnggPSByZXNldFg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGljb25EYXRhID0gdGhpcy5nZXRJY29uRGF0YShib29rQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmJpZ19pY29uLCBCdW5kbGVOYW1lLkNPTU1PTiwgaWNvbkRhdGEuc0ljb25QYXRoLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpZ19pY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ19pY29uLm5vZGUuc2NhbGUgPSBpY29uRGF0YS5pU2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ19pY29uLm5vZGUub3BhY2l0eSA9IGlzVW5sb2NrZWQgPyAyNTUgOiAxNzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpZ19pY29uLm5vZGUuY29sb3IgPSBpc1VubG9ja2VkID8gY2MuQ29sb3IuV0hJVEUgOiBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJpZ19pY29uLm5vZGUpLnRvKDAuMSwgeyB4OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hMdkxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnRuQXJyb3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iSXNTd2l0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEx2TGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEljb25EYXRhKGJvb2tDb25maWc6IEJvb2tDb25maWcpOiBJY29uRGF0YSB7XHJcbiAgICAgICAgbGV0IGljb25QYXRoID0gXCJyZXMvaGFuZGJvb2svXCIgKyBib29rQ29uZmlnLmljb247XHJcbiAgICAgICAgbGV0IHNjYWxlID0gMjtcclxuXHJcbiAgICAgICAgaWYgKGJvb2tDb25maWcuaXNfYmlnX2ljb24gPT0gMSkge1xyXG4gICAgICAgICAgICBpY29uUGF0aCA9IFwicmVzL2hhbmRib29rQmlnL1wiICsgYm9va0NvbmZpZy5pY29uO1xyXG4gICAgICAgICAgICBzY2FsZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBzSWNvblBhdGg6IGljb25QYXRoLCBpU2NhbGU6IHNjYWxlIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoTHZMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxldmVsQ291bnQgPSB0aGlzLmxpc3RfbHZzPy5jaGlsZHJlbkNvdW50IHx8IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxldmVsQ291bnQ7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGV2ZWxDZWxsID0gdGhpcy5saXN0X2x2cz8uY2hpbGRyZW5baW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAobGV2ZWxDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hPbmVMdkNlbGwobGV2ZWxDZWxsLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoT25lTHZDZWxsKGNlbGxOb2RlOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbUlkID0gdGhpcy50SXRlbUlkW2luZGV4XTtcclxuICAgICAgICBjZWxsTm9kZS5hY3RpdmUgPSBpdGVtSWQgIT0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1JZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvb2tDb25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiQm9va0NvbmZpZ0RhdGFcIiwgaXRlbUlkLnRvU3RyaW5nKCkpIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFycm93SWNvbiA9IHRoaXMuZ2V0Q2hpbGQoY2VsbE5vZGUsIFwiaWNvbl9hcnJvd19taW5cIilcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uSW5kaWNhdG9yID0gdGhpcy5nZXRDaGlsZChjZWxsTm9kZSwgXCJzZWxlY3RcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0luZGljYXRvciA9IHRoaXMuZ2V0Q2hpbGQoY2VsbE5vZGUsIFwibmV3XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBudW1MYWJlbCA9IHRoaXMuZ2V0Q2hpbGRDb21wKGNlbGxOb2RlLCBcImxhYl9udW1cIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lTGFiZWwgPSB0aGlzLmdldENoaWxkQ29tcChjZWxsTm9kZSwgXCJsYWJfbmFtZVwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25TcHJpdGUgPSB0aGlzLmdldENoaWxkQ29tcChjZWxsTm9kZSwgXCJpY29uXCIsIGNjLlNwcml0ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaWNvblNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWNvblNwcml0ZS5ub2RlLnNjYWxlID0gMC43NTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUoaWNvblNwcml0ZSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgYm9va0NvbmZpZy5pY29uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkluZGljYXRvcikge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uSW5kaWNhdG9yLmFjdGl2ZSA9IHRoaXMuaUN1ckluZGV4ID09IGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyb3dJY29uKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJvd0ljb24uYWN0aXZlID0gaW5kZXggPiAwICYmIGluZGV4ICE9PSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobnVtTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIG51bUxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5hbWVMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgbmFtZUxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzVW5sb2NrZWQgPSB0aGlzLmNoZWNrSXNVbmxvY2soaXRlbUlkKTtcclxuICAgICAgICAgICAgaWYgKGljb25TcHJpdGUpIHtcclxuICAgICAgICAgICAgICAgIGljb25TcHJpdGUubm9kZS5vcGFjaXR5ID0gaXNVbmxvY2tlZCA/IDI1NSA6IDE3MTtcclxuICAgICAgICAgICAgICAgIGljb25TcHJpdGUubm9kZS5jb2xvciA9IGlzVW5sb2NrZWQgPyBjYy5Db2xvci5XSElURSA6IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBoYXNSZXdhcmQgPSBpc1VubG9ja2VkICYmIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmNoZWNrQm9va0l0ZW1IYXZlVW5sb2NrUmV3YXJkKGl0ZW1JZCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdJbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgICAgIG5ld0luZGljYXRvci5hY3RpdmUgPSBoYXNSZXdhcmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc1VubG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtTGFiZWwgJiYgYm9va0NvbmZpZy5zdWJfdHlwZSA9PSBTY2VuZUJvb2tMb2dpYy5TVUJfVFlQRV9NQVRFUklBTF9OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgICAgICBudW1MYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtTGFiZWwuc3RyaW5nID0gXCJYXCIgKyB0aGlzLnRMdk51bXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWVMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVMYWJlbC5zdHJpbmcgPSBib29rQ29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNSZXdhcmQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZEljb24gPSB0aGlzLmdldENoaWxkQ29tcChuZXdJbmRpY2F0b3IsIFwicmV3YXJkX2ljb25cIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmRJY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkSWNvbi5ub2RlLnNjYWxlID0gMC40NTtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHJld2FyZEljb24sIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGJvb2tDb25maWcucmV3YXJkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSXNVbmxvY2soa2V5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZ20uZGF0YS5tYXBDZWxsX2RhdGEuY2hlY2tCb29rSXRlbUlzVW5sb2NrKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYWluUmV3YXJkKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtSWQgPSB0aGlzLnRJdGVtSWRbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuY2hlY2tCb29rSXRlbUhhdmVVbmxvY2tSZXdhcmQoaXRlbUlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwicmVjZWl2ZV9oYW5kYm9va19yZXdhcmRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi6aKG5Y+W5Zu+6Ym05aWW5YqxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLpooblj5blm77pibTlpZblirFcIiArIGl0ZW1Db25maWcubmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODMxKTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwODMyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCBpdGVtSWQudG9TdHJpbmcoKSkgYXMgQm9va0NvbmZpZztcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXdhcmREYXRhLnJld2FyZCA9PSAxMTAwMykge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgcmV3YXJkRGF0YS5udW0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uRElBTU9ORCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmREYXRhLnJld2FyZCA9PSAxMTAwMikge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgcmV3YXJkRGF0YS5udW0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uR09MRCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0Qm9va0l0ZW1HYWluVW5sb2NrUmV3YXJkKGl0ZW1JZCk7XHJcbiAgICAgICAgICAgIGdtLnVpLmdldF9tb2R1bGUoZ20uY29uc3QuQk9PSykuZ2V0TG9naWMoKS5yZWZyZXNoUmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaEJ0bkFycm93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnRuX2xlZnQuYWN0aXZlID0gdGhpcy50SXRlbUlkW3RoaXMuaUN1ckluZGV4IC0gMV0gIT0gbnVsbDtcclxuICAgICAgICB0aGlzLmJ0bl9yaWdodC5hY3RpdmUgPSB0aGlzLnRJdGVtSWRbdGhpcy5pQ3VySW5kZXggKyAxXSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihidXR0b246IGNjLkV2ZW50LCBldmVudDogc3RyaW5nIHwgbnVsbCA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGJ1dHRvbi50YXJnZXQubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Nsb3NlXCI6XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5CT09LX0lURU1fREVUQUlMKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Fycm93X0xcIjpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJJc1N3aXRjaGluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hJbmRleCgtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9hcnJvd19SXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iSXNTd2l0Y2hpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoSW5kZXgoMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ0bl9sdlwiOlxyXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWxMZXZlbHMgPSB0aGlzLmxpc3RfbHZzPy5jaGlsZHJlbkNvdW50IHx8IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbExldmVsczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdF9sdnM/LmNoaWxkcmVuW2ldLnV1aWQgPT0gYnV0dG9uLnRhcmdldC5wYXJlbnQudXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbEluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGV2ZWxEaWZmZXJlbmNlID0gbGV2ZWxJbmRleCAtIHRoaXMuaUN1ckluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYWluUmV3YXJkKGxldmVsSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hJbmRleChsZXZlbERpZmZlcmVuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnRuX2x2IGlMdkluZGV4OlwiICsgbGV2ZWxJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9va01vZHVsZSA9IGdtLnVpLmdldF9tb2R1bGUoZ20uY29uc3QuQk9PSyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9va01vZHVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2tNb2R1bGUuZ2V0TG9naWMoKS5yZWZyZXNoQ3VyVGFiKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRJdGVtSWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2hpbGRDb21wPFQ+KHBhcmVudE5vZGU6IGNjLk5vZGUsIGNoaWxkTmFtZTogc3RyaW5nLCBjb21wb25lbnRUeXBlOiB7IG5ldygpOiBUIH0pOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgY2hpbGROb2RlID0gdGhpcy5nZXRDaGlsZChwYXJlbnROb2RlLCBjaGlsZE5hbWUpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZE5vZGUgPyBjaGlsZE5vZGUuZ2V0Q29tcG9uZW50KGNvbXBvbmVudFR5cGUpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENoaWxkKHBhcmVudE5vZGU6IGNjLk5vZGUsIGNoaWxkUGF0aDogc3RyaW5nKTogY2MuTm9kZSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gY2hpbGRQYXRoLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICBsZXQgY3VycmVudE5vZGU6IGNjLk5vZGUgfCBudWxsID0gcGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJVdGlscyBnZXRDaGlsZCBjaGlsZFBhdGg6IFwiICsgY2hpbGRQYXRoICsgXCIgaW5kZXg6IFwiICsgKGkgLSAxKSArIFwiIG5hbWU6IFwiICsgbmFtZXNbaSAtIDFdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUuZ2V0Q2hpbGRCeU5hbWUobmFtZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3VycmVudE5vZGU7XHJcbiAgICB9XHJcbn1cclxuIl19