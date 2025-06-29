"use strict";
cc._RF.push(module, '32871enyTNAcZIRUqHT2OCN', 'GetPoseidonOp');
// start-scene/scripts/GetPoseidonOp.ts

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
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var NodePoolItem_1 = require("./NodePoolItem");
var ChannelManager_1 = require("./ChannelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemComponent = /** @class */ (function (_super) {
    __extends(ItemComponent, _super);
    function ItemComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblNum = null;
        _this.itemImg = null;
        _this.itemID = 22001;
        _this.itemNum = 15;
        return _this;
    }
    ItemComponent.prototype.onEnable = function () {
        var _this = this;
        var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.itemID);
        if (itemConfig) {
            this.itemImg.node.active = true;
            if (itemConfig.anim_name == "") {
                Utils_1.Utils.async_set_sprite_frame(this.itemImg, Constants_1.BundleName.MAP, "res/" + itemConfig.icon);
                GameManager_1.gm.pool.put_children(this.itemImg.node);
            }
            else {
                this.itemImg.spriteFrame = null;
                GameManager_1.gm.pool.put_children(this.itemImg.node);
                (Constants_1.BundleName.MAP, "prefabs/item/" + itemConfig.anim_name, NodePoolItem_1.NodePoolItem, function (nodePoolItem) {
                    var _a;
                    if (!nodePoolItem)
                        return;
                    if (((_a = _this.itemImg) === null || _a === void 0 ? void 0 : _a.node.childrenCount) == 0) {
                        nodePoolItem.node.scale = 3;
                        _this.itemImg.node.addChild(nodePoolItem.node);
                        var animation = nodePoolItem.getComponent(cc.Animation);
                        if (animation) {
                            animation.play();
                        }
                    }
                });
            }
            this.lblNum.string = "x" + this.itemNum;
            GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        }
    };
    ItemComponent.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    ItemComponent.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETPOSEIDONOP);
    };
    ItemComponent.prototype.onClickDoubleItem = function () {
        GameManager_1.gm.channel.show_video_ad(this.getDoubleCb, this);
    };
    ItemComponent.prototype.getDoubleCb = function () {
        GameManager_1.gm.data.mapCell_data.splitItemNum(this.itemNum, 22008, 1);
        GameManager_1.gm.data.mapCell_data.async_write_data();
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETPOSEIDONOP);
        GameManager_1.gm.ui.emit("update_soul_num");
    };
    __decorate([
        property(cc.Label)
    ], ItemComponent.prototype, "lblNum", void 0);
    __decorate([
        property(cc.Sprite)
    ], ItemComponent.prototype, "itemImg", void 0);
    ItemComponent = __decorate([
        ccclass
    ], ItemComponent);
    return ItemComponent;
}(cc.Component));
exports.default = ItemComponent;

cc._RF.pop();