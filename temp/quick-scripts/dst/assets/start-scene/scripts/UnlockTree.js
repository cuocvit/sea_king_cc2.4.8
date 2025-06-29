
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/UnlockTree.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e8afvr5FBMM4h2++ucrA4I', 'UnlockTree');
// start-scene/scripts/UnlockTree.ts

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
var TaskData_1 = require("./TaskData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UnlockTree = /** @class */ (function (_super) {
    __extends(UnlockTree, _super);
    function UnlockTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meterialNode = [];
        _this.lblCoin = null;
        _this.btnSprList = [];
        _this.btnSpr = null;
        _this._curSpecialCfg = null;
        _this._localdData = null;
        _this._curFunID = Constants_1.SpecialEnum.SPIRIT_TYPE;
        _this._clickIndex = 0;
        _this._matraEnough = true;
        _this._tempList = [];
        return _this;
    }
    UnlockTree.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).play();
        this._curSpecialCfg = GameManager_1.gm.data.config_data.getSpecialByID(this._curFunID);
        this._localdData = GameManager_1.gm.data.mapCell_data.specialList[this._curFunID];
        this.refreshPanel();
    };
    UnlockTree.prototype.refreshPanel = function () {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curSpecialCfg && this._localdData) {
            for (var t = 0; t < this.meterialNode.length; t++) {
                this.meterialNode[t].active = false;
            }
            for (var t = 0; t < this._curSpecialCfg.prop.length; t++) {
                var prop = this._curSpecialCfg.prop[t];
                if (0 < prop) {
                    this._tempList.push(prop);
                    this.meterialNode[t].active = true;
                    this.meterialNode[t].children[1].getComponent(cc.Label).string = this._localdData.mertrail[prop] + "/" + this._curSpecialCfg.value[t];
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(prop);
                    if (itemCfg) {
                        Utils_1.Utils.async_set_sprite_frame(this.meterialNode[t].children[0].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemCfg.icon);
                    }
                    if (this._localdData.mertrail[prop] < this._curSpecialCfg.value[t]) {
                        this._matraEnough = false;
                        this.meterialNode[t].color = cc.Color.WHITE;
                        this.meterialNode[t].children[2].active = true;
                        this.meterialNode[t].children[3].active = false;
                        this.meterialNode[t].children[2].children[0].width = this._localdData.mertrail[prop] / this._curSpecialCfg.value[t] * 80;
                        this.meterialNode[t].children[2].children[1].children[0].active = !GameManager_1.gm.data.mapCell_data.getCoinNum(itemCfg.type, prop);
                    }
                    else {
                        this.meterialNode[t].children[2].active = false;
                        this.meterialNode[t].children[3].active = true;
                        this.meterialNode[t].color = cc.Color.BLACK.fromHEX("#86cbB4e");
                    }
                }
            }
            this.refreshCoin();
        }
    };
    UnlockTree.prototype.onClickClose = function () {
        this.node.active = false;
    };
    UnlockTree.prototype.onClickAddMetrail = function (event, index) {
        var idx = parseInt(index);
        GameManager_1.gm.data.mapCell_data.onekeyGetAllSpecialMertrail(this._curFunID, this._tempList[idx]);
        this.refreshPanel();
    };
    UnlockTree.prototype.onClickWatchAd = function (event, index) {
        this._clickIndex = parseInt(index);
        GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
    };
    UnlockTree.prototype.watchAdCb = function () {
        GameManager_1.gm.data.mapCell_data.onekeyWatchAdGetSoul(this._curFunID, this._tempList[this._clickIndex]);
        this.refreshPanel();
    };
    UnlockTree.prototype.onClickUpgrade = function () {
        if (this._matraEnough && GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this._curSpecialCfg.coin) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
            return;
        }
        if (this._matraEnough) {
            GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE].state = 2;
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this._curSpecialCfg.coin);
            GameManager_1.gm.ui.emit("open_special_fun", 223);
            GameManager_1.gm.ui.emit("play_spriti_fly");
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.UNLOCK_ELF);
            GameManager_1.gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "精灵树")
            });
            NetUtils_1.ReportData.instance.report_once_point(10603);
            this.onClickClose();
            GameManager_1.gm.data.mapCell_data.splitItemNum(31, 22008, 1);
            GameManager_1.gm.data.mapCell_data.async_write_data();
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.POSEIDON);
        }
    };
    UnlockTree.prototype.refreshCoin = function () {
        this.lblCoin.string = this._curSpecialCfg.coin + "";
        this.lblCoin.node.color = cc.Color.RED;
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum >= this._curSpecialCfg.coin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    };
    UnlockTree.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("coin_change", this.refreshCoin, this);
    };
    __decorate([
        property([cc.Node])
    ], UnlockTree.prototype, "meterialNode", void 0);
    __decorate([
        property(cc.Label)
    ], UnlockTree.prototype, "lblCoin", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], UnlockTree.prototype, "btnSprList", void 0);
    __decorate([
        property(cc.Sprite)
    ], UnlockTree.prototype, "btnSpr", void 0);
    UnlockTree = __decorate([
        ccclass
    ], UnlockTree);
    return UnlockTree;
}(cc.Component));
exports.default = UnlockTree;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFVubG9ja1RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLGlDQUFnQztBQUNoQyx5Q0FBc0U7QUFDdEUsNkNBQW1DO0FBQ25DLHVDQUErQztBQUMvQyx1Q0FBd0M7QUFJbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUIsOEJBQVk7SUFBckM7UUFBQSxxRUFzSEM7UUFwSFcsa0JBQVksR0FBYyxFQUFFLENBQUM7UUFHN0IsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFHaEMsZ0JBQVUsR0FBcUIsRUFBRSxDQUFDO1FBR2xDLFlBQU0sR0FBcUIsSUFBSSxDQUFDO1FBRWhDLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUN0QyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFDbkMsZUFBUyxHQUFXLHVCQUFXLENBQUMsV0FBVyxDQUFDO1FBQzVDLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGVBQVMsR0FBYSxFQUFFLENBQUM7O0lBb0dyQyxDQUFDO0lBbEdhLDZCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFdBQVcsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFB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QUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7SUFFUyw4QkFBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBbkhEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29EQUNpQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNxQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztrREFDZTtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNvQjtJQVh0QyxVQUFVO1FBRGYsT0FBTztPQUNGLFVBQVUsQ0FzSGY7SUFBRCxpQkFBQztDQXRIRCxBQXNIQyxDQXRId0IsRUFBRSxDQUFDLFNBQVMsR0FzSHBDO0FBRUQsa0JBQWUsVUFBVSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKi0qXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IFNwZWNpYWxFbnVtLCBCdW5kbGVOYW1lLCBTZXRJdGVtTnVtRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgVGFza0NvbmRpdGlvblR5cGUgfSBmcm9tICcuL1Rhc2tEYXRhJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBzcGVjaWFsIH0gZnJvbSAnLi9NYXBDZWxsQ2ZnRGF0YSc7XHJcbmltcG9ydCB7IFNwZWNpYWwgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9zcGVjaWFsJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBVbmxvY2tUcmVlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBwcml2YXRlIG1ldGVyaWFsTm9kZTogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxDb2luOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBidG5TcHJMaXN0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgYnRuU3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9jdXJTcGVjaWFsQ2ZnOiBTcGVjaWFsIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9sb2NhbGREYXRhOiBzcGVjaWFsIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9jdXJGdW5JRDogbnVtYmVyID0gU3BlY2lhbEVudW0uU1BJUklUX1RZUEU7XHJcbiAgICBwcml2YXRlIF9jbGlja0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWF0cmFFbm91Z2g6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfdGVtcExpc3Q6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5fY3VyU3BlY2lhbENmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0U3BlY2lhbEJ5SUQodGhpcy5fY3VyRnVuSUQpO1xyXG4gICAgICAgIHRoaXMuX2xvY2FsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5zcGVjaWFsTGlzdFt0aGlzLl9jdXJGdW5JRF07XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXRyYUVub3VnaCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdGVtcExpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5fY3VyU3BlY2lhbENmZyAmJiB0aGlzLl9sb2NhbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5tZXRlcmlhbE5vZGUubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW3RdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5fY3VyU3BlY2lhbENmZy5wcm9wLmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5fY3VyU3BlY2lhbENmZy5wcm9wW3RdO1xyXG4gICAgICAgICAgICAgICAgaWYgKDAgPCBwcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGVtcExpc3QucHVzaChwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVt0XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW3RdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fbG9jYWxkRGF0YS5tZXJ0cmFpbFtwcm9wXSArIFwiL1wiICsgdGhpcy5fY3VyU3BlY2lhbENmZy52YWx1ZVt0XTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubWV0ZXJpYWxOb2RlW3RdLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvXCIgKyBpdGVtQ2ZnLmljb24pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9jYWxkRGF0YS5tZXJ0cmFpbFtwcm9wXSA8IHRoaXMuX2N1clNwZWNpYWxDZmcudmFsdWVbdF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0cmFFbm91Z2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbdF0uY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbdF0uY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbdF0uY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW3RdLmNoaWxkcmVuWzJdLmNoaWxkcmVuWzBdLndpZHRoID0gdGhpcy5fbG9jYWxkRGF0YS5tZXJ0cmFpbFtwcm9wXSAvIHRoaXMuX2N1clNwZWNpYWxDZmcudmFsdWVbdF0gKiA4MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbdF0uY2hpbGRyZW5bMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldENvaW5OdW0oaXRlbUNmZy50eXBlLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVt0XS5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbdF0uY2hpbGRyZW5bM10uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbdF0uY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiIzg2Y2JCNGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaENvaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0FkZE1ldHJhaWwoZXZlbnQ6IGNjLkV2ZW50LCBpbmRleDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaWR4ID0gcGFyc2VJbnQoaW5kZXgpO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLm9uZWtleUdldEFsbFNwZWNpYWxNZXJ0cmFpbCh0aGlzLl9jdXJGdW5JRCwgdGhpcy5fdGVtcExpc3RbaWR4XSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tXYXRjaEFkKGV2ZW50OiBjYy5FdmVudCwgaW5kZXg6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NsaWNrSW5kZXggPSBwYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKHRoaXMud2F0Y2hBZENiLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhdGNoQWRDYigpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5vbmVrZXlXYXRjaEFkR2V0U291bCh0aGlzLl9jdXJGdW5JRCwgdGhpcy5fdGVtcExpc3RbdGhpcy5fY2xpY2tJbmRleF0pO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrVXBncmFkZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbWF0cmFFbm91Z2ggJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmNvaW5OdW0gPCB0aGlzLl9jdXJTcGVjaWFsQ2ZnLmNvaW4pIHtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIGZhbHNlKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWF0cmFFbm91Z2gpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BlY2lhbExpc3RbU3BlY2lhbEVudW0uU1BJUklUX1RZUEVdLnN0YXRlID0gMjtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uUkVEVUNFX0lURU1fVFlQRSwgdGhpcy5fY3VyU3BlY2lhbENmZy5jb2luKTtcclxuICAgICAgICAgICAgZ20udWkuZW1pdChcIm9wZW5fc3BlY2lhbF9mdW5cIiwgMjIzKTtcclxuICAgICAgICAgICAgZ20udWkuZW1pdChcInBsYXlfc3ByaXRpX2ZseVwiKTtcclxuICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX3Rhc2tfcHJvZ3Jlc3MoVGFza0NvbmRpdGlvblR5cGUuVU5MT0NLX0VMRik7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwidW5sb2NrX3BsYXlcIiwge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRfZGVzYzogXCLop6PplIHnjqnms5VcIixcclxuICAgICAgICAgICAgICAgIGRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIuino+mUgeeOqeazlSVzXCIsIFwi57K+54G15qCRXCIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjAzKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrQ2xvc2UoKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BsaXRJdGVtTnVtKDMxLCAyMjAwOCwgMSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuUE9TRUlET04pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDb2luKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGJsQ29pbi5zdHJpbmcgPSB0aGlzLl9jdXJTcGVjaWFsQ2ZnLmNvaW4gKyBcIlwiO1xyXG4gICAgICAgIHRoaXMubGJsQ29pbi5ub2RlLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuY29pbk51bSA+PSB0aGlzLl9jdXJTcGVjaWFsQ2ZnLmNvaW4pIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luLm5vZGUuY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiI0ZGRDUzQ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJjb2luX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hDb2luLCB0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVW5sb2NrVHJlZTsiXX0=