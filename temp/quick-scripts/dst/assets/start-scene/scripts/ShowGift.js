
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ShowGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNob3dHaWZ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTix5Q0FBMkQ7QUFDM0QsNkNBQW1DO0FBRTdCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVCLDRCQUFZO0lBQW5DO1FBQUEscUVBNkVDO1FBM0VXLFVBQUksR0FBbUIsSUFBSSxDQUFDO1FBRzVCLFVBQUksR0FBbUIsSUFBSSxDQUFDO1FBRzVCLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGNBQVEsR0FBYyxFQUFFLENBQUM7UUFFekIsYUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsYUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBOEI7WUFDN0MsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1NBQ1IsQ0FBQzs7SUF1RE4sQ0FBQztJQXJEYSwyQkFBUSxHQUFsQjtRQUFBLGlCQTBDQztRQXpDRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENB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SUFBRCxlQUFDO0NBN0VELEFBNkVDLENBN0VzQixFQUFFLENBQUMsU0FBUyxHQTZFbEM7QUFFRCxrQkFBZSxRQUFRLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgU2V0SXRlbU51bUVudW0sIFJld2FyZElkRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTaG93R2lmdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFyMTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBiYXIyOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHdpZHRoQmc6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgd2lkdGhCZzE6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgcHJpdmF0ZSBnaWZ0SXRlbTogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaXRlbUlEOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2NlbGxJRDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9tYXhOdW1MaXN0OiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9ID0ge1xyXG4gICAgICAgIDEyOiA4LFxyXG4gICAgICAgIDEzOiA4LFxyXG4gICAgICAgIDE0OiA1XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJhcjIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gZ20uY29uc3QuTUFYX0NFTExfTlVNICsgMztcclxuICAgICAgICBpZiAodGhpcy5fY2VsbElEICYmIHRoaXMuX2l0ZW1JRCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuX2NlbGxJRC50b1N0cmluZygpKS55ICsgOTA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUodGhpcy5fY2VsbElELnRvU3RyaW5nKCkpLnggKyAzMDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuX2l0ZW1JRCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhOdW0gPSB0aGlzLl9tYXhOdW1MaXN0W2l0ZW1Db25maWcudHlwZV07XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4TnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXIxLndpZHRoID0gMzAgKiBtYXhOdW0gLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcjIud2lkdGggPSAzMCAqIG1heE51bSAtIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFyMS54ID0gLjUgKiAtdGhpcy5iYXIxLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFyMi54ID0gLjUgKiAtdGhpcy5iYXIyLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGhCZy53aWR0aCA9IDMwICogbWF4TnVtICsgMTU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aEJnMS53aWR0aCA9IDMwICogbWF4TnVtICsgMTU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdpZnRJdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnRJdGVtW2luZGV4XS5hY3RpdmUgPSBpbmRleCA8IG1heE51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5naWZ0SXRlbVtpbmRleF0uY29sb3IgPSBpdGVtQ29uZmlnLmx2IC0gMiA+PSBtYXhOdW0gLSAxIC0gaW5kZXggPyBjYy5Db2xvci5HUkVFTiA6IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXIxLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXIyLnNjYWxlWCA9IChpdGVtQ29uZmlnLmx2IC0gMikgLyAobWF4TnVtIC0gMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFyMi5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKC4yKSwgY2Muc2NhbGVUbyguNCwgKGl0ZW1Db25maWcubHYgLSAxKSAvIChtYXhOdW0gLSAxKSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2lmdEl0ZW1bbWF4TnVtIC0gMSAtIChpdGVtQ29uZmlnLmx2IC0gMSldLmNvbG9yID0gY2MuQ29sb3IuR1JFRU5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGNjLmRlbGF5VGltZSgyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcubHYgPT0gbWF4TnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgaXRlbUNvbmZpZy5udW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoUmV3YXJkSWRFbnVtLkRJQU1PTkQsIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSwgaXRlbUNvbmZpZy5udW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoaXRlbUlEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iYXIyPy5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1JRCA9IGl0ZW1JRDtcclxuICAgICAgICB0aGlzLl9jZWxsSUQgPSBjZWxsSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJhcjIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hvd0dpZnQ7Il19