"use strict";
cc._RF.push(module, '6ec58GxN+JN+q/v8qV5uu2B', 'RMBStoreItem');
// store/scripts/RMBStoreItem.ts

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
// file này không duodcj import ở đâu
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RMBStoreItem = /** @class */ (function (_super) {
    __extends(RMBStoreItem, _super);
    function RMBStoreItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rewardSpr = null;
        _this.rewardNode1 = null;
        _this.rewardNode2 = null;
        _this.btnDiam = null;
        _this.btnAd = null;
        _this.btnRMB = null;
        return _this;
    }
    Object.defineProperty(RMBStoreItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    RMBStoreItem.prototype.update_view = function () {
        var itemData = this._data;
        Utils_1.Utils.async_set_sprite_frame(this.rewardSpr, Constants_1.BundleName.STORE, "res/" + itemData.show_img);
        this.rewardSpr.node.x = -16;
        Utils_1.Utils.async_set_sprite_frame(this.rewardNode1.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemData.item_id);
        this.rewardNode1.children[0].getComponent(cc.Label).string = itemData.item_num + "";
        this.rewardNode2.active = 0 < itemData.item_id1;
        if (this.rewardNode2.active) {
            Utils_1.Utils.async_set_sprite_frame(this.rewardNode2.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemData.item_id1);
            this.rewardNode1.children[0].getComponent(cc.Label).string = itemData.item_num1 + "";
            this.rewardSpr.node.x = 73;
        }
        this.btnRMB.active = 1 == this.data.money_type;
        this.btnRMB.children[0].getComponent(cc.Label).string = "￥" + itemData.price;
        this.btnDiam.active = 1 != this.data.money_type && 2 != this.data.money_type;
        this.btnDiam.children[0].getComponent(cc.Label).string = "" + itemData.price;
        this.btnAd.active = 2 == this.data.money_type;
    };
    RMBStoreItem.prototype.onClickRmb = function () {
        this.get_reward();
    };
    RMBStoreItem.prototype.get_reward = function () {
        var itemIds = [this.data.item_id, this.data.item_id1];
        var itemNums = [this.data.item_num, this.data.item_num1];
        for (var index = 0; index < itemIds.length; index++) {
            if (!(itemIds[index] <= 0)) {
                if (11006 == itemIds[index]) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(itemNums[index]);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.BARREL, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (11003 == itemIds[index]) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, itemNums[index]);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
            }
        }
    };
    RMBStoreItem.prototype.onClickAd = function () {
        GameManager_1.gm.channel.show_video_ad(this.get_reward.bind(this));
    };
    RMBStoreItem.prototype.onClickDiam = function () {
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < this.data.price) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
            return;
        }
        GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this.data.price);
        this.get_reward();
    };
    __decorate([
        property(cc.Sprite)
    ], RMBStoreItem.prototype, "rewardSpr", void 0);
    __decorate([
        property(cc.Node)
    ], RMBStoreItem.prototype, "rewardNode1", void 0);
    __decorate([
        property(cc.Node)
    ], RMBStoreItem.prototype, "rewardNode2", void 0);
    __decorate([
        property(cc.Node)
    ], RMBStoreItem.prototype, "btnDiam", void 0);
    __decorate([
        property(cc.Node)
    ], RMBStoreItem.prototype, "btnAd", void 0);
    __decorate([
        property(cc.Node)
    ], RMBStoreItem.prototype, "btnRMB", void 0);
    RMBStoreItem = __decorate([
        ccclass
    ], RMBStoreItem);
    return RMBStoreItem;
}(NodePoolItem_1.NodePoolItem));
exports.default = RMBStoreItem;

cc._RF.pop();