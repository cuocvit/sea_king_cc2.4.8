
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/DefenseOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c17cfVaL3RPvIRcM/wz85Ba', 'DefenseOp');
// start-scene/scripts/DefenseOp.ts

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
var Constants_1 = require("./Constants");
var MapCellCfgData_1 = require("./MapCellCfgData");
var Utils_1 = require("./Utils");
var TempData_1 = require("./TempData");
var ListView_1 = require("./ListView");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DefenseOp = /** @class */ (function (_super) {
    __extends(DefenseOp, _super);
    function DefenseOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.heroPosNode = [];
        _this.hero_list = null;
        _this.noHeroTips = null;
        _this.lblLvl = null;
        _this._curUnlockNum = 0;
        _this._tempLockList = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8];
        _this._clickHeroData = null;
        _this._startPos = null;
        _this._heroList = [];
        return _this;
    }
    DefenseOp.prototype.onEnable = function () {
        TempData_1.TempData.setDefenseType(2);
        this._clickHeroData = new MapCellCfgData_1.roleGoBattleItemVO();
        GameManager_1.gm.ui.on("refreshHeroBattle", this.refreshPanel, this);
        GameManager_1.gm.ui.on("refreshBattleHero", this.update_view, this);
        var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.GARRISION_TYPE];
        var cfgByID = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
        if (cfgByID) {
            this.lblLvl.string = "Lv." + buildData.buildLvl;
            this._curUnlockNum = cfgByID.capacity;
            var color = cc.Color.BLACK.fromHEX("#FFF8E8");
            for (var i = 0; i < this.heroPosNode.length; i++) {
                this.heroPosNode[i].color = color;
                if (this._curUnlockNum < i + 1) {
                    this.heroPosNode[i].children[0].active = false;
                    this.heroPosNode[i].children[1].active = true;
                    var lockColor = cc.Color.BLACK.fromHEX("#BAAF93");
                    this.heroPosNode[i].children[1].children[0].color = lockColor;
                    this.heroPosNode[i].children[1].children[1].color = lockColor;
                    this.heroPosNode[i].children[1].children[1].getComponent(cc.Label).string = "level " + this._tempLockList[i];
                }
                else {
                    this.heroPosNode[i].children[0].active = true;
                    this.heroPosNode[i].children[1].active = false;
                }
                this.heroPosNode[i].on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this, i), this);
            }
            TempData_1.TempData.getInitAllHeroList(true);
            this.noHeroTips.active = TempData_1.TempData.localHeroList.length <= 0;
            this.refreshPanel();
            this.update_view();
        }
    };
    DefenseOp.prototype.update_view = function () {
        var _a;
        (_a = this.hero_list) === null || _a === void 0 ? void 0 : _a.setData(TempData_1.TempData.localHeroList);
    };
    DefenseOp.prototype.touchEnd = function (index) {
        if (this._curUnlockNum <= index || !(this._heroList.length > index))
            return;
        var heroData = GameManager_1.gm.data.mapCell_data.getHeroDefanseDataByHeroUID(this._heroList[index].heroUID);
        if (heroData) {
            var cellID = heroData.cellID;
            var heroid = heroData.heroid;
            var heroUID = heroData.heroUID;
            TempData_1.TempData.addHeroByID(heroid, cellID);
            GameManager_1.gm.data.mapCell_data.delDefenseDataByID(heroUID);
            this.refreshPanel();
            this.update_view();
            GameManager_1.gm.data.mapCell_data.async_write_data();
        }
    };
    DefenseOp.prototype.refreshPanel = function () {
        this._heroList = [];
        var heroData = GameManager_1.gm.data.mapCell_data.getDefanseHeroData();
        var a = 0;
        for (var key in heroData) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroData[key].heroid);
            if (heroConfig) {
                this.heroPosNode[a].children[0].children[1].active = true;
                Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
                Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + heroConfig.heroid);
                Utils_1.Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[2].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
                this._heroList.push(heroData[key]);
                a++;
            }
        }
        for (var o = a; o < this._curUnlockNum; o++) {
            this.heroPosNode[o].children[0].children[1].active = false;
        }
    };
    DefenseOp.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.DEFENSE);
    };
    DefenseOp.prototype.onDisable = function () {
        var _a;
        (_a = this.hero_list) === null || _a === void 0 ? void 0 : _a.reset();
        GameManager_1.gm.ui.off("refreshHeroBattle", this.refreshPanel, this);
        GameManager_1.gm.ui.off("refreshBattleHero", this.update_view, this);
    };
    __decorate([
        property([cc.Node])
    ], DefenseOp.prototype, "heroPosNode", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], DefenseOp.prototype, "hero_list", void 0);
    __decorate([
        property(cc.Node)
    ], DefenseOp.prototype, "noHeroTips", void 0);
    __decorate([
        property(cc.Label)
    ], DefenseOp.prototype, "lblLvl", void 0);
    DefenseOp = __decorate([
        ccclass
    ], DefenseOp);
    return DefenseOp;
}(GameModule_1.GameModule));
exports.default = DefenseOp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXERlZmVuc2VPcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLHlDQUF3RDtBQUN4RCxtREFBc0Q7QUFDdEQsaUNBQWdDO0FBQ2hDLHVDQUFzQztBQUN0Qyx1Q0FBc0M7QUFDdEMsMkNBQTBDO0FBRXBDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBUTVDO0lBQXdCLDZCQUFVO0lBQWxDO1FBQUEscUVBd0dDO1FBdEdXLGlCQUFXLEdBQWMsRUFBRSxDQUFDO1FBRzVCLGVBQVMsR0FBb0IsSUFBSSxDQUFDO1FBR2xDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxZQUFNLEdBQW9CLElBQUksQ0FBQztRQUUvQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixtQkFBYSxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekQsb0JBQWMsR0FBOEIsSUFBSSxDQUFDO1FBQ2pELGVBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsZUFBUyxHQUFtQixFQUFFLENBQUM7O0lBdUYzQyxDQUFDO0lBckZhLDRCQUFRLEdBQWxCO1FBQ0ksbUJBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1DQUFrQixFQUFFLENBQUM7UUFDL0MsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkQsZ0JBQUUsQ0FBQyxF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RzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ29CO0lBWHJDLFNBQVM7UUFEZCxPQUFPO09BQ0YsU0FBUyxDQXdHZDtJQUFELGdCQUFDO0NBeEdELEFBd0dDLENBeEd1Qix1QkFBVSxHQXdHakM7QUFFRCxrQkFBZSxTQUFTLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSwgQnVuZGxlTmFtZSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgcm9sZUdvQmF0dGxlSXRlbVZPIH0gZnJvbSAnLi9NYXBDZWxsQ2ZnRGF0YSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmludGVyZmFjZSBUeXBlSGVyb0xpc3Qge1xyXG4gICAgaGVyb2lkOiBudW1iZXI7XHJcbiAgICBoZXJvVUlEOiBudW1iZXI7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIERlZmVuc2VPcCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgaGVyb1Bvc05vZGU6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgaGVyb19saXN0OiBMaXN0VmlldyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub0hlcm9UaXBzOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxMdmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VyVW5sb2NrTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfdGVtcExvY2tMaXN0OiBudW1iZXJbXSA9IFsxLCAxLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4XTtcclxuICAgIHByaXZhdGUgX2NsaWNrSGVyb0RhdGE6IHJvbGVHb0JhdHRsZUl0ZW1WTyB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRQb3MgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfaGVyb0xpc3Q6IFR5cGVIZXJvTGlzdFtdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIFRlbXBEYXRhLnNldERlZmVuc2VUeXBlKDIpO1xyXG4gICAgICAgIHRoaXMuX2NsaWNrSGVyb0RhdGEgPSBuZXcgcm9sZUdvQmF0dGxlSXRlbVZPKCk7XHJcbiAgICAgICAgZ20udWkub24oXCJyZWZyZXNoSGVyb0JhdHRsZVwiLCB0aGlzLnJlZnJlc2hQYW5lbCwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub24oXCJyZWZyZXNoQmF0dGxlSGVyb1wiLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEVdO1xyXG4gICAgICAgIGNvbnN0IGNmZ0J5SUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZERhdGEuYnVpbGRJRCk7XHJcblxyXG4gICAgICAgIGlmIChjZmdCeUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsTHZsLnN0cmluZyA9IFwiTHYuXCIgKyBidWlsZERhdGEuYnVpbGRMdmw7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clVubG9ja051bSA9IGNmZ0J5SUQuY2FwYWNpdHk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiNGRkY4RThcIik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVyb1Bvc05vZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXJVbmxvY2tOdW0gPCBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2tDb2xvciA9IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjQkFBRjkzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uY29sb3IgPSBsb2NrQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXS5jb2xvciA9IGxvY2tDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9Qb3NOb2RlW2ldLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJsZXZlbCBcIiArIHRoaXMuX3RlbXBMb2NrTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvUG9zTm9kZVtpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbaV0uY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9Qb3NOb2RlW2ldLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMsIGkpLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBUZW1wRGF0YS5nZXRJbml0QWxsSGVyb0xpc3QodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9IZXJvVGlwcy5hY3RpdmUgPSBUZW1wRGF0YS5sb2NhbEhlcm9MaXN0Lmxlbmd0aCA8PSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3Q/LnNldERhdGEoVGVtcERhdGEubG9jYWxIZXJvTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b3VjaEVuZChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1clVubG9ja051bSA8PSBpbmRleCB8fCAhKHRoaXMuX2hlcm9MaXN0Lmxlbmd0aCA+IGluZGV4KSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGhlcm9EYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SGVyb0RlZmFuc2VEYXRhQnlIZXJvVUlEKHRoaXMuX2hlcm9MaXN0W2luZGV4XS5oZXJvVUlEKTtcclxuICAgICAgICBpZiAoaGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2VsbElEID0gaGVyb0RhdGEuY2VsbElEO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvaWQgPSBoZXJvRGF0YS5oZXJvaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9VSUQgPSBoZXJvRGF0YS5oZXJvVUlEO1xyXG4gICAgICAgICAgICBUZW1wRGF0YS5hZGRIZXJvQnlJRChoZXJvaWQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbERlZmVuc2VEYXRhQnlJRChoZXJvVUlEKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2hlcm9MaXN0ID0gW107XHJcbiAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXREZWZhbnNlSGVyb0RhdGEoKTtcclxuICAgICAgICBsZXQgYSA9IDA7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9EYXRhW2tleV0uaGVyb2lkKTtcclxuICAgICAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1Bvc05vZGVbYV0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvUG9zTm9kZVthXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2NvbG9yX1wiICsgaGVyb0NvbmZpZy5sdik7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb1Bvc05vZGVbYV0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIGhlcm9Db25maWcuaGVyb2lkKTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvUG9zTm9kZVthXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL2hlcm8vaGVyb1Bob3RvXCIgKyBoZXJvQ29uZmlnLmx2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hlcm9MaXN0LnB1c2goaGVyb0RhdGFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICBhKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgbyA9IGE7IG8gPCB0aGlzLl9jdXJVbmxvY2tOdW07IG8rKykge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9Qb3NOb2RlW29dLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5ERUZFTlNFKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb19saXN0Py5yZXNldCgpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcInJlZnJlc2hIZXJvQmF0dGxlXCIsIHRoaXMucmVmcmVzaFBhbmVsLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJyZWZyZXNoQmF0dGxlSGVyb1wiLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGVmZW5zZU9wOyJdfQ==