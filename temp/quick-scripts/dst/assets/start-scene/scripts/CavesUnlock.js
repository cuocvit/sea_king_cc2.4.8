
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/CavesUnlock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4c99SDt3VJRYAQ35zj7Jch', 'CavesUnlock');
// start-scene/scripts/CavesUnlock.ts

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
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var TaskData_1 = require("./TaskData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CavesUnlock = /** @class */ (function (_super) {
    __extends(CavesUnlock, _super);
    function CavesUnlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meterialNode = [];
        _this.lblCoin = {};
        _this.btnSprList = [];
        _this.btnSpr = null;
        _this._curSpecialCfg = null;
        _this._localdData = null;
        _this._curFunID = Constants_1.SpecialEnum.CAVES_TYPE;
        _this._matraEnough = true;
        _this._tempList = [];
        return _this;
    }
    CavesUnlock.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("coin_change", this.refreshCoin, this);
        this._curSpecialCfg = GameManager_1.gm.data.config_data.getSpecialByID(this._curFunID);
        this._localdData = GameManager_1.gm.data.mapCell_data.specialList[this._curFunID];
        this.refreshPanel();
    };
    CavesUnlock.prototype.refreshPanel = function () {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curSpecialCfg && this._localdData) {
            for (var index = 0; index < this.meterialNode.length; index++) {
                this.meterialNode[index].active = true;
            }
            for (var index = 0; index < this._curSpecialCfg.prop.length; index++) {
                var prop = this._curSpecialCfg.prop[index];
                if (0 < prop) {
                    this._tempList.push(prop);
                    this.meterialNode[index].active = true;
                    this.meterialNode[index].children[1].getComponent(cc.Label).string = this._localdData.mertrail[prop] + "/" + this._curSpecialCfg.value[index];
                    var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(prop);
                    if (heroCfg) {
                        Utils_1.Utils.async_set_sprite_frame(this.meterialNode[index].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/heroCircleImg/" + heroCfg.icon);
                    }
                    if (this._localdData.mertrail[prop] < this._curSpecialCfg.value[index]) {
                        this._matraEnough = false;
                        this.meterialNode[index].color = cc.Color.WHITE;
                        this.meterialNode[index].children[2].active = true;
                        this.meterialNode[index].children[3].active = false;
                        this.meterialNode[index].children[2].children[0].width = this._localdData.mertrail[prop] / this._curSpecialCfg.value[index] * 80;
                        this.meterialNode[index].children[2].children[1].children[0].active = !GameManager_1.gm.data.mapCell_data.getHeroNum(heroCfg.occupation, heroCfg.heroid);
                    }
                    else {
                        this.meterialNode[index].children[2].active = false;
                        this.meterialNode[index].children[3].active = true;
                        this.meterialNode[index].color = cc.Color.BLACK.fromHEX("#86cbB4e");
                    }
                }
            }
            this.refreshCoin();
        }
    };
    CavesUnlock.prototype.onClickClose = function () {
        this.node.active = false;
    };
    CavesUnlock.prototype.onClickAddMetrail = function (event, index) {
        var idx = parseInt(index);
        GameManager_1.gm.data.mapCell_data.onekeyGetAllSpecialHeroMertrail(this._curFunID, this._tempList[idx]);
        this.refreshPanel();
    };
    CavesUnlock.prototype.onClickUpgrade = function () {
        if (this._matraEnough && GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this._curSpecialCfg.coin) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
            return;
        }
        if (this._matraEnough) {
            GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.CAVES_TYPE].state = 2;
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this._curSpecialCfg.coin);
            GameManager_1.gm.ui.emit("open_special_fun", 143);
            GameManager_1.gm.ui.mapMainUI.roleBuildAnimNode.active = false;
            GameManager_1.gm.data.mapCell_data.lockCaveAllInitCell(GameManager_1.gm.const.CAVESAREAID);
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.UNLOCK_CAVERN);
            GameManager_1.gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "洞窟")
            });
            NetUtils_1.ReportData.instance.report_once_point(10604);
            this.onClickClose();
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, 2);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
        }
    };
    CavesUnlock.prototype.refreshCoin = function () {
        this.lblCoin.string = this._curSpecialCfg.coin + "";
        this.lblCoin.node.color = cc.Color.RED;
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum >= this._curSpecialCfg.coin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    };
    CavesUnlock.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("coin_change", this.refreshCoin, this);
    };
    __decorate([
        property([cc.Node])
    ], CavesUnlock.prototype, "meterialNode", void 0);
    __decorate([
        property(cc.Label)
    ], CavesUnlock.prototype, "lblCoin", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CavesUnlock.prototype, "btnSprList", void 0);
    __decorate([
        property(cc.Sprite)
    ], CavesUnlock.prototype, "btnSpr", void 0);
    CavesUnlock = __decorate([
        ccclass
    ], CavesUnlock);
    return CavesUnlock;
}(cc.Component));
// export default CavesUnlock;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENhdmVzVW5sb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTixpQ0FBZ0M7QUFDaEMseUNBQXNFO0FBQ3RFLDZDQUFtQztBQUNuQyx1Q0FBK0M7QUFDL0MsdUNBQXdDO0FBSWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBTzVDO0lBQTBCLCtCQUFZO0lBQXRDO1FBQUEscUVBOEdDO1FBNUdXLGtCQUFZLEdBQWMsRUFBRSxDQUFDO1FBRzdCLGFBQU8sR0FBb0IsRUFBYyxDQUFDO1FBRzFDLGdCQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUdsQyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUVoQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFDdEMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGVBQVMsR0FBZ0IsdUJBQVcsQ0FBQyxVQUFVLENBQUM7UUFDaEQsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsZUFBUyxHQUFhLEVBQUUsQ0FBQzs7SUE2RnJDLENBQUM7SUEzRmEsOEJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixD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MUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDb0I7SUFYdEMsV0FBVztRQURoQixPQUFPO09BQ0YsV0FBVyxDQThHaEI7SUFBRCxrQkFBQztDQTlHRCxBQThHQyxDQTlHeUIsRUFBRSxDQUFDLFNBQVMsR0E4R3JDO0FBRUQsOEJBQThCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IFNwZWNpYWxFbnVtLCBTZXRJdGVtTnVtRW51bSwgQnVuZGxlTmFtZSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgVGFza0NvbmRpdGlvblR5cGUgfSBmcm9tICcuL1Rhc2tEYXRhJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBTcGVjaWFsIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3NwZWNpYWxcIjtcclxuaW1wb3J0IHsgc3BlY2lhbCB9IGZyb20gJy4vTWFwQ2VsbENmZ0RhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxEYXRhIHtcclxuICAgIG1lcnRyYWlsOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9O1xyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBDYXZlc1VubG9jayBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgcHJpdmF0ZSBtZXRlcmlhbE5vZGU6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGJsQ29pbjogY2MuTGFiZWwgfCBudWxsID0ge30gYXMgY2MuTGFiZWw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBwcml2YXRlIGJ0blNwckxpc3Q6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBidG5TcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2N1clNwZWNpYWxDZmc6IFNwZWNpYWwgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2xvY2FsZERhdGE6IHNwZWNpYWwgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2N1ckZ1bklEOiBTcGVjaWFsRW51bSA9IFNwZWNpYWxFbnVtLkNBVkVTX1RZUEU7XHJcbiAgICBwcml2YXRlIF9tYXRyYUVub3VnaDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIF90ZW1wTGlzdDogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub24oXCJjb2luX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hDb2luLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9jdXJTcGVjaWFsQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsQnlJRCh0aGlzLl9jdXJGdW5JRCk7XHJcbiAgICAgICAgdGhpcy5fbG9jYWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNwZWNpYWxMaXN0W3RoaXMuX2N1ckZ1bklEXTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hdHJhRW5vdWdoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90ZW1wTGlzdCA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJTcGVjaWFsQ2ZnICYmIHRoaXMuX2xvY2FsZERhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubWV0ZXJpYWxOb2RlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9jdXJTcGVjaWFsQ2ZnLnByb3AubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5fY3VyU3BlY2lhbENmZy5wcm9wW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmICgwIDwgcHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBMaXN0LnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5fbG9jYWxkRGF0YS5tZXJ0cmFpbFtwcm9wXSArIFwiL1wiICsgdGhpcy5fY3VyU3BlY2lhbENmZy52YWx1ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQocHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9DZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm1ldGVyaWFsTm9kZVtpbmRleF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oZXJvQ2lyY2xlSW1nL1wiICsgaGVyb0NmZy5pY29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb2NhbGREYXRhLm1lcnRyYWlsW3Byb3BdIDwgdGhpcy5fY3VyU3BlY2lhbENmZy52YWx1ZVtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0cmFFbm91Z2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVtpbmRleF0uY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblsyXS5jaGlsZHJlblswXS53aWR0aCA9IHRoaXMuX2xvY2FsZERhdGEubWVydHJhaWxbcHJvcF0gLyB0aGlzLl9jdXJTcGVjaWFsQ2ZnLnZhbHVlW2luZGV4XSAqIDgwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGVyaWFsTm9kZVtpbmRleF0uY2hpbGRyZW5bMl0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEhlcm9OdW0oaGVyb0NmZy5vY2N1cGF0aW9uLCBoZXJvQ2ZnLmhlcm9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRlcmlhbE5vZGVbaW5kZXhdLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWV0ZXJpYWxOb2RlW2luZGV4XS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjODZjYkI0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29pbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQWRkTWV0cmFpbChldmVudDogY2MuRXZlbnQsIGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpZHggPSBwYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub25la2V5R2V0QWxsU3BlY2lhbEhlcm9NZXJ0cmFpbCh0aGlzLl9jdXJGdW5JRCwgdGhpcy5fdGVtcExpc3RbaWR4XSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tVcGdyYWRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXRyYUVub3VnaCAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuY29pbk51bSA8IHRoaXMuX2N1clNwZWNpYWxDZmcuY29pbikge1xyXG4gICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUQ09JTk9QLmtleSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRDT0lOT1ApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWF0cmFFbm91Z2gpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BlY2lhbExpc3RbU3BlY2lhbEVudW0uQ0FWRVNfVFlQRV0uc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5SRURVQ0VfSVRFTV9UWVBFLCB0aGlzLl9jdXJTcGVjaWFsQ2ZnLmNvaW4pO1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwib3Blbl9zcGVjaWFsX2Z1blwiLCAxNDMpO1xyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkucm9sZUJ1aWxkQW5pbU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmxvY2tDYXZlQWxsSW5pdENlbGwoZ20uY29uc3QuQ0FWRVNBUkVBSUQpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5VTkxPQ0tfQ0FWRVJOKTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJ1bmxvY2tfcGxheVwiLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuino+mUgeeOqeazlVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwi6Kej6ZSB546p5rOVJXNcIiwgXCLmtJ7nqp9cIilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2MDQpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tDbG9zZSgpO1xyXG4gICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR09CQVRUTEUua2V5LCAyKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR09CQVRUTEUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hDb2luKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGJsQ29pbi5zdHJpbmcgPSB0aGlzLl9jdXJTcGVjaWFsQ2ZnLmNvaW4gKyBcIlwiO1xyXG4gICAgICAgIHRoaXMubGJsQ29pbi5ub2RlLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuY29pbk51bSA+PSB0aGlzLl9jdXJTcGVjaWFsQ2ZnLmNvaW4pIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxDb2luLm5vZGUuY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiI0ZGRDUzQ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJjb2luX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hDb2luLCB0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgQ2F2ZXNVbmxvY2s7Il19