
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/WaterBarrelItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ad9c6VcPqBLcLFWeysB2XQk', 'WaterBarrelItem');
// start-scene/scripts/WaterBarrelItem.ts

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
// *-*
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WaterBarrelItem = /** @class */ (function (_super) {
    __extends(WaterBarrelItem, _super);
    function WaterBarrelItem() {
        var _this = _super.call(this) || this;
        _this.barrelSpr = null;
        _this._curIndex = 0;
        _this._curBarrelData = {};
        return _this;
    }
    WaterBarrelItem.prototype.initData = function (curBarrelData, curIndex) {
        this._curBarrelData = curBarrelData;
        this.node.position = this._curBarrelData.itemPos;
        this._curIndex = curIndex;
    };
    WaterBarrelItem.prototype.onEnable = function () {
        var _this = this;
        Utils_1.Utils.async_set_sprite_frame(this.barrelSpr, Constants_1.BundleName.MAP, "res/barrel/" + this._curBarrelData.itemID),
            this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function (t, e) {
                if ("case_open" == e.name) {
                    _this.node.getComponent(cc.Button).interactable = true;
                    _this.node.getComponent(cc.Animation).play("case_normal");
                }
                else if ("case_close" == e.name) {
                    GameManager_1.gm.data.mapCell_data.addBarrelInMap(_this._curBarrelData.itemID);
                    GameManager_1.gm.pool.put(_this.node);
                    if (GameManager_1.gm.data.mapCell_data.isGuide) {
                        GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
                    }
                }
            }, this);
        for (var index = 0; index < this.node.childrenCount; index++) {
            this.node.children[index].opacity = 0;
        }
        this.scheduleOnce(function () {
            _this.node.getComponent(cc.Animation).play("case_open");
        }, .3 * this._curIndex);
    };
    WaterBarrelItem.prototype.onClickOpen = function () {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_10_JIANMUTONG);
            for (var index = 0; index < GameManager_1.gm.data.mapCell_data.waterBarrelList.length; index++) {
                if (GameManager_1.gm.data.mapCell_data.waterBarrelList[index].itemIndex == this._curBarrelData.itemIndex) {
                    GameManager_1.gm.data.mapCell_data.waterBarrelList.splice(index, 1);
                    GameManager_1.gm.data.mapCell_data.async_write_data();
                }
            }
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false,
                this.node.getComponent(cc.Button).interactable = false,
                this.node.getComponent(cc.Animation).play("case_close");
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    WaterBarrelItem.prototype.onDisable = function () {
        this.node.getComponent(cc.Animation).targetOff(this);
    };
    __decorate([
        property(cc.Sprite)
    ], WaterBarrelItem.prototype, "barrelSpr", void 0);
    WaterBarrelItem = __decorate([
        ccclass
    ], WaterBarrelItem);
    return WaterBarrelItem;
}(NodePoolItem_1.NodePoolItem));
exports.default = WaterBarrelItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFdhdGVyQmFycmVsSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04saUNBQWdDO0FBQ2hDLHlDQUF5QztBQUN6Qyw2Q0FBbUM7QUFDbkMsK0NBQThDO0FBR3hDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFZO0lBT3ZEO1FBQUEsWUFDRSxpQkFBTyxTQUdSO1FBVE8sZUFBUyxHQUFxQixJQUFJLENBQUM7UUFPekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFzQixDQUFDOztJQUMvQyxDQUFDO0lBRU0sa0NBQVEsR0FBZixVQUFnQixhQUErQixFQUFFLFFBQWdCO1FBQy9ELElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFUyxrQ0FBUSxHQUFsQjtRQUFBLGlCQXVCQztRQXRCQyxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQkFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDdEcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUUsSUFBSSxXQUFXLElBQUks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QztJQTdERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUN1QjtJQUZ4QixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBZ0VuQztJQUFELHNCQUFDO0NBaEVELEFBZ0VDLENBaEU0QywyQkFBWSxHQWdFeEQ7a0JBaEVvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKi0qXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgcm9sZUJhcnJlbEl0ZW1WTyB9IGZyb20gJy4vTWFwQ2VsbENmZ0RhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyQmFycmVsSXRlbSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICBwcml2YXRlIGJhcnJlbFNwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgX2N1ckJhcnJlbERhdGE6IHJvbGVCYXJyZWxJdGVtVk87XHJcbiAgcHJpdmF0ZSBfY3VySW5kZXg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fY3VySW5kZXggPSAwO1xyXG4gICAgdGhpcy5fY3VyQmFycmVsRGF0YSA9IHt9IGFzIHJvbGVCYXJyZWxJdGVtVk87XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdERhdGEoY3VyQmFycmVsRGF0YTogcm9sZUJhcnJlbEl0ZW1WTywgY3VySW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5fY3VyQmFycmVsRGF0YSA9IGN1ckJhcnJlbERhdGE7XHJcbiAgICB0aGlzLm5vZGUucG9zaXRpb24gPSB0aGlzLl9jdXJCYXJyZWxEYXRhLml0ZW1Qb3M7XHJcbiAgICB0aGlzLl9jdXJJbmRleCA9IGN1ckluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmJhcnJlbFNwciwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL2JhcnJlbC9cIiArIHRoaXMuX2N1ckJhcnJlbERhdGEuaXRlbUlEKSxcclxuICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICh0LCBlKSA9PiB7XHJcbiAgICAgICAgaWYgKFwiY2FzZV9vcGVuXCIgPT0gZS5uYW1lKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiY2FzZV9ub3JtYWxcIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoXCJjYXNlX2Nsb3NlXCIgPT0gZS5uYW1lKSB7XHJcbiAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRCYXJyZWxJbk1hcCh0aGlzLl9jdXJCYXJyZWxEYXRhLml0ZW1JRCk7XHJcbiAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrSGFuZEFuaW1EZWxheSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpbmRleF0ub3BhY2l0eSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImNhc2Vfb3BlblwiKTtcclxuICAgIH0sIC4zICogdGhpcy5fY3VySW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNsaWNrT3BlbigpOiB2b2lkIHtcclxuICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc0hhdmVTcGVjZUNlbGxJRCgpKSB7XHJcbiAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzEwX0pJQU5NVVRPTkcpO1xyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0ZXJCYXJyZWxMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS53YXRlckJhcnJlbExpc3RbaW5kZXhdLml0ZW1JbmRleCA9PSB0aGlzLl9jdXJCYXJyZWxEYXRhLml0ZW1JbmRleCkge1xyXG4gICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0ZXJCYXJyZWxMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGdtLnVpLm1hcE1haW5VSS5oYW5kQW5pbS5hY3RpdmUgPSBmYWxzZSxcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2UsXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJjYXNlX2Nsb3NlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnbS51aS5zaG93X2F1dG9fbWVyZ2VfbWVzc2FnZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS50YXJnZXRPZmYodGhpcyk7XHJcbiAgfVxyXG59Il19