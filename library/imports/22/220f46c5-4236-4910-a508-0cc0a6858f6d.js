"use strict";
cc._RF.push(module, '220f4bFQjZJEKUIDMCmhY9t', 'SpecialGift');
// start-scene/scripts/SpecialGift.ts

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
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpecialGift = /** @class */ (function (_super) {
    __extends(SpecialGift, _super);
    function SpecialGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.caseNode = null;
        _this.lblTips = null;
        _this.giftItem = [];
        _this.giftRodeNode = null;
        _this.giftFrame = [];
        _this._itemID = 0;
        _this._cellID = 0;
        _this._maxNumList = {
            13: 8,
            14: 5,
            19: 7
        };
        return _this;
    }
    SpecialGift.prototype.onEnable = function () {
        var _this = this;
        this.node.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 3;
        if (this._cellID && this._itemID) {
            this.node.y = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).y + 90;
            this.node.x = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).x + 30;
            var itemConfig_1 = GameManager_1.gm.data.config_data.getItemCfgByID(this._itemID);
            if (itemConfig_1) {
                this.caseNode.position = this.giftItem[this._maxNumList[itemConfig_1.type] - 1].position,
                    this.caseNode.children[2].getComponent(cc.ParticleSystem).resetSystem();
                var maxNum_1 = this._maxNumList[itemConfig_1.type];
                if (maxNum_1) {
                    if (13 == itemConfig_1.type) {
                        this.caseNode.children[1].getComponent(cc.Sprite).spriteFrame = this.giftFrame[0];
                    }
                    else if (14 == itemConfig_1.type) {
                        this.caseNode.children[1].getComponent(cc.Sprite).spriteFrame = this.giftFrame[1];
                    }
                    else {
                        this.caseNode.children[1].getComponent(cc.Sprite).spriteFrame = this.giftFrame[2];
                    }
                    var itemName = 13 == itemConfig_1.type ? "超级英雄" : 14 == itemConfig_1.type ? "超级炮塔" : "水精灵";
                    this.lblTips.string = "可合成" + itemName;
                    for (var index = 0; index < this.giftItem.length; index++) {
                        this.giftItem[index].active = false;
                        this.giftItem[index].active = itemConfig_1.lv - 2 >= index;
                        this.giftRodeNode.children[index].active = index < maxNum_1;
                    }
                    this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function () {
                        _this.giftItem[itemConfig_1.lv - 1].active = true;
                    }), cc.delayTime(1.5), cc.callFunc(function () {
                        if (itemConfig_1.lv == maxNum_1) {
                            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, itemConfig_1.number);
                            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), itemConfig_1.number);
                        }
                        _this.node.active = false;
                    })));
                }
            }
        }
        else {
            this.node.active = false;
        }
    };
    SpecialGift.prototype.initData = function (itemID, cellID) {
        this.node.stopAllActions();
        this._itemID = itemID;
        this._cellID = cellID;
    };
    SpecialGift.prototype.onDisable = function () {
        this.node.stopAllActions();
    };
    __decorate([
        property(cc.Node)
    ], SpecialGift.prototype, "caseNode", void 0);
    __decorate([
        property(cc.Label)
    ], SpecialGift.prototype, "lblTips", void 0);
    __decorate([
        property([cc.Node])
    ], SpecialGift.prototype, "giftItem", void 0);
    __decorate([
        property(cc.Node)
    ], SpecialGift.prototype, "giftRodeNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], SpecialGift.prototype, "giftFrame", void 0);
    SpecialGift = __decorate([
        ccclass
    ], SpecialGift);
    return SpecialGift;
}(cc.Component));
exports.default = SpecialGift;

cc._RF.pop();