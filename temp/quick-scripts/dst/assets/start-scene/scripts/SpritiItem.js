
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SpritiItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82e2aAQAZRMKZsY4BvU5fua', 'SpritiItem');
// start-scene/scripts/SpritiItem.ts

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
//
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpritiItem = /** @class */ (function (_super) {
    __extends(SpritiItem, _super);
    function SpritiItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTips = null;
        _this.lockNode = null;
        _this.funCellID = 223;
        return _this;
    }
    SpritiItem.prototype.onLoad = function () {
        var _this = this;
        this.node.getComponent(sp.Skeleton).setCompleteListener(function () {
            if ("tree unlocking" == _this.node.getComponent(sp.Skeleton).animation) {
                _this.node.getComponent(sp.Skeleton).clearTracks();
                _this.node.getComponent(sp.Skeleton).animation = null;
                _this.node.getComponent(sp.Skeleton).setAnimation(0, "tree fly long", true);
            }
        });
    };
    SpritiItem.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("play_spriti_fly", this.playFly, this);
        GameManager_1.gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.initSpiritNode();
    };
    SpritiItem.prototype.openSpecialFun = function (num) {
        if (num == this.funCellID) {
            this.initSpiritNode();
        }
    };
    SpritiItem.prototype.initSpiritNode = function () {
        var _this = this;
        var specialConfig = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.SPIRIT_TYPE);
        if (specialConfig) {
            if (GameManager_1.gm.data.mapCell_data.role_map_data[specialConfig.unlock]) {
                var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE];
                if (1 == special.state) {
                    this.lblTips.string = "Rơi vào bẫy của con rồng lửa độc ác, bạn cần có sức mạnh của linh hồn biển để mở khóa!";
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "tree binding", true);
                    this.lockNode.active = true;
                }
                else if (2 == special.state) {
                    this.lockNode.active = false;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "tree fly long", true);
                    this.node.stopAllActions();
                    var tips_1 = ["Tôi cũng có thể truyền sức mạnh của Poseidon để giúp bạn!",
                        "Càng nhiều linh hồn biển, sức mạnh của Poseidon càng mạnh!",
                        "Linh hồn biển có thể được lấy từ Bàn thờ Poseidon và khi anh hùng chết!"];
                    this.node.stopAllActions();
                    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
                        var randomTipIndex = Math.floor(Math.random() * tips_1.length);
                        _this.lblTips.string = tips_1[randomTipIndex];
                    }))));
                }
            }
            else {
                this.lblTips.string = "Để mở khóa, bạn cần kết nối hòn đảo với đất liền!";
                this.node.getComponent(sp.Skeleton).setAnimation(0, "tree binding", true);
                this.lockNode.active = true;
            }
        }
    };
    SpritiItem.prototype.playFly = function () {
        this.node.getComponent(sp.Skeleton).setAnimation(0, "tree unlocking", false);
    };
    SpritiItem.prototype.onDisable = function () {
        this.node.stopAllActions();
        GameManager_1.gm.ui.off("play_spriti_fly", this.playFly, this);
        GameManager_1.gm.ui.off("open_special_fun", this.openSpecialFun, this);
    };
    SpritiItem.prototype.onClick = function () {
        var specialConfig = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.SPIRIT_TYPE);
        if (!(specialConfig && !GameManager_1.gm.data.mapCell_data.role_map_data[specialConfig.unlock])) {
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false;
            var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE];
            if (1 == special.state) {
                GameManager_1.gm.ui.mapMainUI.showSpiritLock();
            }
            else if (2 == special.state) {
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.POSEIDON);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], SpritiItem.prototype, "lblTips", void 0);
    __decorate([
        property(cc.Node)
    ], SpritiItem.prototype, "lockNode", void 0);
    SpritiItem = __decorate([
        ccclass
    ], SpritiItem);
    return SpritiItem;
}(cc.Component));
exports.default = SpritiItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNwcml0aUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsRUFBRTtBQUNGLHlDQUEwQztBQUMxQyw2Q0FBbUM7QUFFN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUIsOEJBQVk7SUFBckM7UUFBQSxxRUFvRkM7UUFsRlcsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFFaEMsZUFBUyxHQUFXLEdBQUcsQ0FBQzs7SUE2RXBDLENBQUM7SUEzRWEsMkJBQU0sR0FBaEI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztZQUNwRCxJQUFJLGdCQUFnQixJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ25FLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbEQsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JELEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM5RTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVTLDZCQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFFTyxtQ0FBYyxHQUF0QixVQUF1QixHQUFXO1FBQzlCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVPLG1DQUFjLEdBQXRCO1FBQUEsaUJBNkJDO1FBNUJHLElBQUksYUFBYSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsdUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRixJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFELElBQU0sT0FBTyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsdUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsd0ZBQXdGLENBQUM7b0JBQy9HLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUMvQjtxQkFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDM0IsSUFBTSxNQUFJLEdBQUcsQ0FBQywyREFBMkQ7d0JBQ3JFLDREQUE0RDt3QkFDNUQseUVBQXlFLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQzVELEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQ1IsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMvRCxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7b0JBQzlDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNaO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsbURBQW1ELENBQUM7Z0JBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQy9CO1NBQ0o7SUFDTCxDQUFDO0lBRU8sNEJBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFUyw4QkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0IsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVPLDRCQUFPLEdBQWY7UUFDSSxJQUFJLGFBQWEsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLHVCQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtZQUMvRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEMsSUFBTSxPQUFPLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyx1QkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3BCLGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNwQztpQkFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUMzQixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QztTQUNKO0lBQ0wsQ0FBQztJQWpGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNxQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNzQjtJQUx0QyxVQUFVO1FBRGYsT0FBTztPQUNGLFVBQVUsQ0FvRmY7SUFBRCxpQkFBQztDQXBGRCxBQW9GQyxDQXBGd0IsRUFBRSxDQUFDLFNBQVMsR0FvRnBDO0FBRUQsa0JBQWUsVUFBVSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuaW1wb3J0IHsgU3BlY2lhbEVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgU3ByaXRpSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFRpcHM6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGxvY2tOb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBmdW5DZWxsSUQ6IG51bWJlciA9IDIyMztcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoXCJ0cmVlIHVubG9ja2luZ1wiID09IHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuY2xlYXJUcmFja3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJ0cmVlIGZseSBsb25nXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub24oXCJwbGF5X3Nwcml0aV9mbHlcIiwgdGhpcy5wbGF5Rmx5LCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcIm9wZW5fc3BlY2lhbF9mdW5cIiwgdGhpcy5vcGVuU3BlY2lhbEZ1biwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pbml0U3Bpcml0Tm9kZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuU3BlY2lhbEZ1bihudW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChudW0gPT0gdGhpcy5mdW5DZWxsSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0U3Bpcml0Tm9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRTcGlyaXROb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzcGVjaWFsQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsQnlJRChTcGVjaWFsRW51bS5TUElSSVRfVFlQRSk7XHJcbiAgICAgICAgaWYgKHNwZWNpYWxDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbc3BlY2lhbENvbmZpZy51bmxvY2tdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVjaWFsID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BlY2lhbExpc3RbU3BlY2lhbEVudW0uU1BJUklUX1RZUEVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKDEgPT0gc3BlY2lhbC5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVGlwcy5zdHJpbmcgPSBcIlLGoWkgdsOgbyBi4bqreSBj4bunYSBjb24gcuG7k25nIGzhu61hIMSR4buZYyDDoWMsIGLhuqFuIGPhuqduIGPDsyBz4bupYyBt4bqhbmggY+G7p2EgbGluaCBo4buTbiBiaeG7g24gxJHhu4MgbeG7nyBraMOzYSFcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCwgXCJ0cmVlIGJpbmRpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IHNwZWNpYWwuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcInRyZWUgZmx5IGxvbmdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlwcyA9IFtcIlTDtGkgY8WpbmcgY8OzIHRo4buDIHRydXnhu4FuIHPhu6ljIG3huqFuaCBj4bunYSBQb3NlaWRvbiDEkeG7gyBnacO6cCBi4bqhbiFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDw6BuZyBuaGnhu4F1IGxpbmggaOG7k24gYmnhu4NuLCBz4bupYyBt4bqhbmggY+G7p2EgUG9zZWlkb24gY8OgbmcgbeG6oW5oIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkxpbmggaOG7k24gYmnhu4NuIGPDsyB0aOG7gyDEkcaw4bujYyBs4bqleSB04burIELDoG4gdGjhu50gUG9zZWlkb24gdsOgIGtoaSBhbmggaMO5bmcgY2jhur90IVwiXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kb21UaXBJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRpcHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVGlwcy5zdHJpbmcgPSB0aXBzW3JhbmRvbVRpcEluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYmxUaXBzLnN0cmluZyA9IFwixJDhu4MgbeG7nyBraMOzYSwgYuG6oW4gY+G6p24ga+G6v3QgbuG7kWkgaMOybiDEkeG6o28gduG7m2kgxJHhuqV0IGxp4buBbiFcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcInRyZWUgYmluZGluZ1wiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlGbHkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwidHJlZSB1bmxvY2tpbmdcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwicGxheV9zcHJpdGlfZmx5XCIsIHRoaXMucGxheUZseSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwib3Blbl9zcGVjaWFsX2Z1blwiLCB0aGlzLm9wZW5TcGVjaWFsRnVuLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHNwZWNpYWxDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFNwZWNpYWxCeUlEKFNwZWNpYWxFbnVtLlNQSVJJVF9UWVBFKTtcclxuICAgICAgICBpZiAoIShzcGVjaWFsQ29uZmlnICYmICFnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW3NwZWNpYWxDb25maWcudW5sb2NrXSkpIHtcclxuICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmhhbmRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVjaWFsID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BlY2lhbExpc3RbU3BlY2lhbEVudW0uU1BJUklUX1RZUEVdO1xyXG4gICAgICAgICAgICBpZiAoMSA9PSBzcGVjaWFsLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuc2hvd1NwaXJpdExvY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IHNwZWNpYWwuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LlBPU0VJRE9OKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3ByaXRpSXRlbTsiXX0=