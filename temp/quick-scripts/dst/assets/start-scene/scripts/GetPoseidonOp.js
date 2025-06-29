
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GetPoseidonOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdldFBvc2VpZG9uT3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQyxpQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ3pDLCtDQUE4QztBQUM5QyxtREFBa0Q7QUFFNUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEIsaUNBQVk7SUFBeEM7UUFBQSxxRUF1REM7UUFyRFcsWUFBTSxHQUFvQixJQUFJLENBQUM7UUFHL0IsYUFBTyxHQUFxQixJQUFJLENBQUM7UUFFakMsWUFBTSxHQUFXLEtBQUssQ0FBQztRQUN2QixhQUFPLEdBQVcsRUFBRSxDQUFDOztJQStDakMsQ0FBQztJQTdDYSxnQ0FBUSxHQUFsQjtRQUFBLGlCQXlCQztRQXhCRyxJQUFNLFVBQVUsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsc0JBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckYsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxzQkFBVSxDQUFDLEdBQUcsRUFBRSxlQUFlLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSwyQkFBWSxFQUFFLFVBQUMsWUFBaUM7O29CQUNyRyxJQUFJLENBQUMsWUFBWTt3QkFBRSxPQUFPO29CQUMxQixJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSSxDQUFDLEVBQUU7d0JBQ3ZDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUMsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzFELElBQUksU0FBUyxFQUFFOzRCQUNYLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDcEI7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hDLGdCQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztJQUVTLGlDQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVPLG9DQUFZLEdBQXBCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLHlDQUFpQixHQUF6QjtRQUNJLGdCQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTyxtQ0FBVyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbEMsQ0FBQztJQXBERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNvQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNxQjtJQUx2QyxhQUFhO1FBRGxCLE9BQU87T0FDRixhQUFhLENBdURsQjtJQUFELG9CQUFDO0NBdkRELEFBdURDLENBdkQyQixFQUFFLENBQUMsU0FBUyxHQXVEdkM7QUFFRCxrQkFBZSxhQUFhLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBCQU5ORVJfQURfVFlQRSB9IGZyb20gJy4vQ2hhbm5lbE1hbmFnZXInO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEl0ZW1Db21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxOdW06IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaXRlbUltZzogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBpdGVtSUQ6IG51bWJlciA9IDIyMDAxO1xyXG4gICAgcHJpdmF0ZSBpdGVtTnVtOiBudW1iZXIgPSAxNTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5pdGVtSUQpO1xyXG4gICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUltZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnLmFuaW1fbmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaXRlbUltZywgQnVuZGxlTmFtZS5NQVAsIFwicmVzL1wiICsgaXRlbUNvbmZpZy5pY29uKTtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMuaXRlbUltZy5ub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUltZy5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLml0ZW1JbWcubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAoQnVuZGxlTmFtZS5NQVAsIFwicHJlZmFicy9pdGVtL1wiICsgaXRlbUNvbmZpZy5hbmltX25hbWUsIE5vZGVQb29sSXRlbSwgKG5vZGVQb29sSXRlbTogY2MuQ29tcG9uZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZVBvb2xJdGVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbUltZz8ubm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVBvb2xJdGVtLm5vZGUuc2NhbGUgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1JbWcubm9kZS5hZGRDaGlsZChub2RlUG9vbEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5vZGVQb29sSXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGJsTnVtLnN0cmluZyA9IFwieFwiICsgdGhpcy5pdGVtTnVtO1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnNob3dfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdFVFBPU0VJRE9OT1ApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0RvdWJsZUl0ZW0oKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKHRoaXMuZ2V0RG91YmxlQ2IsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RG91YmxlQ2IoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BsaXRJdGVtTnVtKHRoaXMuaXRlbU51bSwgMjIwMDgsIDEpO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5HRVRQT1NFSURPTk9QKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwidXBkYXRlX3NvdWxfbnVtXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJdGVtQ29tcG9uZW50OyJdfQ==