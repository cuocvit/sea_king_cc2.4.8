
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/store/scripts/RMBStoreItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RvcmVcXHNjcmlwdHNcXFJNQlN0b3JlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCxpRUFBK0Y7QUFDL0YscUVBQTJEO0FBR3JELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJCLGdDQUFZO0lBQXZDO1FBQUEscUVBc0ZDO1FBcEZVLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHM0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHM0IsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3ZCLFlBQU0sR0FBWSxJQUFJLENBQUM7O0lBcUVuQyxDQUFDO0lBakVDLHNCQUFZLDhCQUFJO2FBQWhCO1lBQ00sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFSCxVQUFpQixLQUFpQjtZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTyxrQ0FBVyxHQUFuQjtRQUNJLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsc0JBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUIsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxXQUFXLENB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QUFDO0lBbkZGO1FBREUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDa0I7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDa0I7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNhO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ2E7SUFqQjdCLFlBQVk7UUFEakIsT0FBTztPQUNGLFlBQVksQ0FzRmpCO0lBQUQsbUJBQUM7Q0F0RkQsQUFzRkMsQ0F0RjBCLDJCQUFZLEdBc0Z0QztBQUVELGtCQUFlLFlBQVksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGZpbGUgbsOgeSBraMO0bmcgZHVvZGNqIGltcG9ydCDhu58gxJHDonVcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBSZXdhcmRJZEVudW0sIFNldEl0ZW1OdW1FbnVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBNYWxsQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvbWFsbCc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgUk1CU3RvcmVJdGVtIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgIHByaXZhdGUgcmV3YXJkU3ByOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZXdhcmROb2RlMTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJld2FyZE5vZGUyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgIGJ0bkRpYW06IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSAgYnRuQWQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidG5STUI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IE1hbGxDb25maWc7XHJcblxyXG4gIHB1YmxpYyAgZ2V0IGRhdGEoKTogTWFsbENvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gIHB1YmxpYyAgc2V0IGRhdGEodmFsdWU6IE1hbGxDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbURhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5yZXdhcmRTcHIsIEJ1bmRsZU5hbWUuU1RPUkUsIFwicmVzL1wiICsgaXRlbURhdGEuc2hvd19pbWcpO1xyXG4gICAgICAgIHRoaXMucmV3YXJkU3ByLm5vZGUueCA9IC0xNjtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucmV3YXJkTm9kZTEuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuTUFQLCBcInJlcy9cIiArIGl0ZW1EYXRhLml0ZW1faWQpO1xyXG4gICAgICAgIHRoaXMucmV3YXJkTm9kZTEuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpdGVtRGF0YS5pdGVtX251bSArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5yZXdhcmROb2RlMi5hY3RpdmUgPSAwIDwgaXRlbURhdGEuaXRlbV9pZDE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJld2FyZE5vZGUyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucmV3YXJkTm9kZTIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuTUFQLCBcInJlcy9cIiArIGl0ZW1EYXRhLml0ZW1faWQxKTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmROb2RlMS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGl0ZW1EYXRhLml0ZW1fbnVtMSArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkU3ByLm5vZGUueCA9IDczO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idG5STUIuYWN0aXZlID0gMSA9PSB0aGlzLmRhdGEubW9uZXlfdHlwZTtcclxuICAgICAgICB0aGlzLmJ0blJNQi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi77+lXCIgKyBpdGVtRGF0YS5wcmljZTtcclxuICAgICAgICB0aGlzLmJ0bkRpYW0uYWN0aXZlID0gMSAhPSB0aGlzLmRhdGEubW9uZXlfdHlwZSAmJiAyICE9IHRoaXMuZGF0YS5tb25leV90eXBlO1xyXG4gICAgICAgIHRoaXMuYnRuRGlhbS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBpdGVtRGF0YS5wcmljZTtcclxuICAgICAgICB0aGlzLmJ0bkFkLmFjdGl2ZSA9IDIgPT0gdGhpcy5kYXRhLm1vbmV5X3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrUm1iKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0X3Jld2FyZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X3Jld2FyZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtSWRzID0gW3RoaXMuZGF0YS5pdGVtX2lkLCB0aGlzLmRhdGEuaXRlbV9pZDFdO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1OdW1zID0gW3RoaXMuZGF0YS5pdGVtX251bSwgdGhpcy5kYXRhLml0ZW1fbnVtMV07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpdGVtSWRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoIShpdGVtSWRzW2luZGV4XSA8PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKDExMDA2ID09IGl0ZW1JZHNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkQmFycmVsTnVtKGl0ZW1OdW1zW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uQkFSUkVMLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgxMTAwMyA9PSBpdGVtSWRzW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIGl0ZW1OdW1zW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uRElBTU9ORCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0FkKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLmdldF9yZXdhcmQuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrRGlhbSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmRpYW1vbmROdW0gPCB0aGlzLmRhdGEucHJpY2UpIHtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIHRydWUpO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRDT0lOT1ApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5SRURVQ0VfSVRFTV9UWVBFLCB0aGlzLmRhdGEucHJpY2UpO1xyXG4gICAgICAgIHRoaXMuZ2V0X3Jld2FyZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSTUJTdG9yZUl0ZW07Il19