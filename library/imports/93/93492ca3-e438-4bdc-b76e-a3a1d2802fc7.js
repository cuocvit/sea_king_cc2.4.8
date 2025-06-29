"use strict";
cc._RF.push(module, '93492yj5DhL3Lduo6HSgC/H', 'ShowGift');
// start-scene/scripts/ShowGift.ts

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
var ShowGift = /** @class */ (function (_super) {
    __extends(ShowGift, _super);
    function ShowGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bar1 = null;
        _this.bar2 = null;
        _this.widthBg = null;
        _this.widthBg1 = null;
        _this.giftItem = [];
        _this._itemID = null;
        _this._cellID = null;
        _this._maxNumList = {
            12: 8,
            13: 8,
            14: 5
        };
        return _this;
    }
    ShowGift.prototype.onEnable = function () {
        var _this = this;
        this.bar2.stopAllActions();
        this.node.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 3;
        if (this._cellID && this._itemID) {
            this.node.y = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).y + 90;
            this.node.x = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this._cellID.toString()).x + 30;
            var itemConfig_1 = GameManager_1.gm.data.config_data.getItemCfgByID(this._itemID);
            if (itemConfig_1) {
                var maxNum_1 = this._maxNumList[itemConfig_1.type];
                if (maxNum_1) {
                    this.bar1.width = 30 * maxNum_1 - 10;
                    this.bar2.width = 30 * maxNum_1 - 10;
                    this.bar1.x = .5 * -this.bar1.width;
                    this.bar2.x = .5 * -this.bar2.width;
                    this.widthBg.width = 30 * maxNum_1 + 15;
                    this.widthBg1.width = 30 * maxNum_1 + 15;
                    for (var index = 0; index < this.giftItem.length; index++) {
                        this.giftItem[index].active = index < maxNum_1;
                        this.giftItem[index].color = itemConfig_1.lv - 2 >= maxNum_1 - 1 - index ? cc.Color.GREEN : cc.Color.WHITE;
                    }
                    this.bar1.scaleX = 1;
                    this.bar2.scaleX = (itemConfig_1.lv - 2) / (maxNum_1 - 1);
                    this.bar2.runAction(cc.sequence(cc.delayTime(.2), cc.scaleTo(.4, (itemConfig_1.lv - 1) / (maxNum_1 - 1), 1), cc.callFunc(function () {
                        _this.giftItem[maxNum_1 - 1 - (itemConfig_1.lv - 1)].color = cc.Color.GREEN;
                    }), cc.delayTime(2), cc.callFunc(function () {
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
    ShowGift.prototype.initData = function (itemID, cellID) {
        var _a;
        (_a = this.bar2) === null || _a === void 0 ? void 0 : _a.stopAllActions();
        this._itemID = itemID;
        this._cellID = cellID;
    };
    ShowGift.prototype.onDisable = function () {
        this.bar2.stopAllActions();
    };
    __decorate([
        property(cc.Node)
    ], ShowGift.prototype, "bar1", void 0);
    __decorate([
        property(cc.Node)
    ], ShowGift.prototype, "bar2", void 0);
    __decorate([
        property(cc.Node)
    ], ShowGift.prototype, "widthBg", void 0);
    __decorate([
        property(cc.Node)
    ], ShowGift.prototype, "widthBg1", void 0);
    __decorate([
        property([cc.Node])
    ], ShowGift.prototype, "giftItem", void 0);
    ShowGift = __decorate([
        ccclass
    ], ShowGift);
    return ShowGift;
}(cc.Component));
exports.default = ShowGift;

cc._RF.pop();