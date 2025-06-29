
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SpecialGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNwZWNpYWxHaWZ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTix5Q0FBMkQ7QUFDM0QsNkNBQW1DO0FBRTdCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLCtCQUFZO0lBQXRDO1FBQUEscUVBK0VDO1FBN0VXLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGNBQVEsR0FBYyxFQUFFLENBQUM7UUFHekIsa0JBQVksR0FBbUIsSUFBSSxDQUFDO1FBR3BDLGVBQVMsR0FBcUIsRUFBRSxDQUFDO1FBRWpDLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBVyxHQUE4QjtZQUM3QyxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7U0FDUixDQUFDOztJQXlETixDQUFDO0lBdkRhLDhCQUFRLEdBQWxCO1FBQUEsaUJBNENDO1FBM0NHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFeEYsSUFBTSxZQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEUsSUFBSSxZQUFVLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRO29CQUNsRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUU1RSxJQUFNLFFBQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsSUFBSSxRQUFNLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLElBQUksWUFBVSxDQUFDLElBQUksRUFBRTt3QkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDckY7eUJBQU0sSUFBSSxFQUFFLElBQUksWUFBVSxDQUFDLElBQUksRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDckY7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDckY7b0JBRUQsSUFBTSxRQUFRLEdBQUcsRUFBRSxJQUFJLFlBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFlBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUN6RixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO29CQUV2QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLFFBQU0sQ0FBQztxQkFDN0Q7b0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQzFELEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNuRCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQy9CLElBQUksWUFBVSxDQUFDLEVBQUUsSUFBSSxRQUFNLEVBQUU7NEJBQ3pCLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsMEJBQWMsQ0FBQyxhQUFhLEVBQUUsWUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNyRixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsd0JBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDL0c7d0JBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ1A7YUFDSjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFnQixNQUFjLEVBQUUsTUFBYztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFUywrQkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQTVFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNzQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNxQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpREFDYTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUMwQjtJQUc1QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztrREFDYztJQWR2QyxXQUFXO1FBRGhCLE9BQU87T0FDRixXQUFXLENBK0VoQjtJQUFELGtCQUFDO0NBL0VELEFBK0VDLENBL0V5QixFQUFFLENBQUMsU0FBUyxHQStFckM7QUFFRCxrQkFBZSxXQUFXLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgU2V0SXRlbU51bUVudW0sIFJld2FyZElkRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTcGVjaWFsR2lmdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2FzZU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFRpcHM6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgZ2lmdEl0ZW06IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBnaWZ0Um9kZU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHByaXZhdGUgZ2lmdEZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaXRlbUlEOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfY2VsbElEOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWF4TnVtTGlzdDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSA9IHtcclxuICAgICAgICAxMzogOCxcclxuICAgICAgICAxNDogNSxcclxuICAgICAgICAxOTogN1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IGdtLmNvbnN0Lk1BWF9DRUxMX05VTSArIDM7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbGxJRCAmJiB0aGlzLl9pdGVtSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZSh0aGlzLl9jZWxsSUQudG9TdHJpbmcoKSkueSArIDkwO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuX2NlbGxJRC50b1N0cmluZygpKS54ICsgMzA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLl9pdGVtSUQpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXNlTm9kZS5wb3NpdGlvbiA9IHRoaXMuZ2lmdEl0ZW1bdGhpcy5fbWF4TnVtTGlzdFtpdGVtQ29uZmlnLnR5cGVdIC0gMV0ucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNlTm9kZS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pLnJlc2V0U3lzdGVtKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4TnVtID0gdGhpcy5fbWF4TnVtTGlzdFtpdGVtQ29uZmlnLnR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1heE51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxMyA9PSBpdGVtQ29uZmlnLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNlTm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZ2lmdEZyYW1lWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMTQgPT0gaXRlbUNvbmZpZy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzZU5vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmdpZnRGcmFtZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhc2VOb2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5naWZ0RnJhbWVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTmFtZSA9IDEzID09IGl0ZW1Db25maWcudHlwZSA/IFwi6LaF57qn6Iux6ZuEXCIgOiAxNCA9PSBpdGVtQ29uZmlnLnR5cGUgPyBcIui2hee6p+eCruWhlFwiIDogXCLmsLTnsr7ngbVcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFRpcHMuc3RyaW5nID0gXCLlj6/lkIjmiJBcIiArIGl0ZW1OYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5naWZ0SXRlbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0SXRlbVtpbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdEl0ZW1baW5kZXhdLmFjdGl2ZSA9IGl0ZW1Db25maWcubHYgLSAyID49IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRSb2RlTm9kZS5jaGlsZHJlbltpbmRleF0uYWN0aXZlID0gaW5kZXggPCBtYXhOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSguNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0SXRlbVtpdGVtQ29uZmlnLmx2IC0gMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDEuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcubHYgPT0gbWF4TnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCBpdGVtQ29uZmlnLm51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5ESUFNT05ELCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksIGl0ZW1Db25maWcubnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoaXRlbUlEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5faXRlbUlEID0gaXRlbUlEO1xyXG4gICAgICAgIHRoaXMuX2NlbGxJRCA9IGNlbGxJRDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGVjaWFsR2lmdDsiXX0=