
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SuperHeroTimer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8e091fFhY5BDL0Clp0nWaA8', 'SuperHeroTimer');
// start-scene/scripts/SuperHeroTimer.ts

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
exports.SuperHeroTimer = void 0;
//
var GameManager_1 = require("./GameManager");
var Timer_1 = require("./Timer");
var ccclass = cc._decorator.ccclass;
// @
var SuperHeroTimer = /** @class */ (function (_super) {
    __extends(SuperHeroTimer, _super);
    function SuperHeroTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timer = null;
        _this._updataTimer = 0;
        return _this;
    }
    // @
    SuperHeroTimer.prototype.init = function () {
        var _this = this;
        this._updataTimer = 0;
        if (!this._timer)
            this._timer = new Timer_1.Timer();
        this.initBarrelData();
        this.initSuperHeroTime();
        if (!this._timer.is_running) {
            this._timer.start(function () {
                _this.refreshSuperHeroTime();
            }, 1000, 0);
        }
    };
    // @
    SuperHeroTimer.prototype.initSuperHeroTime = function () {
        var superHeroData = GameManager_1.gm.data.mapCell_data.getAllSuperHeroData();
        for (var i = 0; i < superHeroData.length; i++) {
            if (superHeroData[i].heroState === 1) {
                if (superHeroData[i].curReliveTime === 0) {
                    superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                    superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + GameManager_1.gm.const.SUPERHERORELIVETIME;
                }
                else if (superHeroData[i].curReliveTime >= superHeroData[i].nextReliveTime) {
                    superHeroData[i].heroState = 0;
                    superHeroData[i].hp = Math.floor(0.5 * superHeroData[i].maxHp);
                    superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                    superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + GameManager_1.gm.const.SUPERHERORECIVETIME;
                }
                else {
                    superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + (superHeroData[i].nextReliveTime - superHeroData[i].curReliveTime);
                    superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                }
            }
            else if (superHeroData[i].hp >= superHeroData[i].maxHp) {
                superHeroData[i].curReliveTime = 0;
                superHeroData[i].nextReliveTime = 0;
            }
            else if (superHeroData[i].curReliveTime >= superHeroData[i].nextReliveTime) {
                superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + GameManager_1.gm.const.SUPERHERORECIVETIME;
            }
            else {
                superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + (superHeroData[i].nextReliveTime - superHeroData[i].curReliveTime);
                superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
            }
        }
    };
    // @
    SuperHeroTimer.prototype.refreshSuperHeroTime = function () {
        this._updataTimer++;
        if (this._updataTimer >= 600) {
            this._updataTimer = 0;
            GameManager_1.gm.data.mapCell_data.checkLocalData();
        }
        var superHeroData = GameManager_1.gm.data.mapCell_data.getAllSuperHeroData();
        //
        for (var i = 0; i < superHeroData.length; i++) {
            if (superHeroData[i].nextReliveTime > 0) {
                superHeroData[i].curReliveTime++;
                if (superHeroData[i].curReliveTime >= superHeroData[i].nextReliveTime) {
                    if (superHeroData[i].heroState === 1) {
                        superHeroData[i].heroState = 0;
                        superHeroData[i].hp = Math.floor(0.5 * superHeroData[i].maxHp);
                        superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                        superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + GameManager_1.gm.const.SUPERHERORECIVETIME;
                        GameManager_1.gm.ui.emit("refresh_super_hero_color", superHeroData[i].cellID, superHeroData[i].heroid);
                    }
                    else {
                        superHeroData[i].hp = Math.min(superHeroData[i].maxHp, superHeroData[i].hp + GameManager_1.gm.const.SUPERHERORECIVEHP);
                        superHeroData[i].curReliveTime = superHeroData[i].maxHp <= superHeroData[i].hp ? 0 : Math.floor(Date.now() / 1000);
                        superHeroData[i].nextReliveTime = superHeroData[i].maxHp <= superHeroData[i].hp ? 0 : Math.floor(Date.now() / 1000) + GameManager_1.gm.const.SUPERHERORECIVETIME;
                    }
                }
            }
        }
        this.refreshBarrelTime();
    };
    // @
    SuperHeroTimer.prototype.initBarrelData = function () {
        GameManager_1.gm.data.mapCell_data.initBarrelTime();
    };
    // @
    SuperHeroTimer.prototype.refreshBarrelTime = function () {
        if (!GameManager_1.gm.data.mapCell_data.isGuide && GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime > 0) {
            GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime++;
            if (GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime >= GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
                GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum = Math.min(GameManager_1.gm.data.mapCell_data.roleBarrelData.maxBarrelNum, GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum + GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelNum);
                if (GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum >= GameManager_1.gm.data.mapCell_data.roleBarrelData.maxBarrelNum) {
                    GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime = 0;
                    GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime = 0;
                }
                else {
                    GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
                    GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + GameManager_1.gm.data.mapCell_data.roleBarrelData.freeBarrelCd;
                }
                GameManager_1.gm.data.mapCell_data.async_write_data();
            }
        }
    };
    SuperHeroTimer = __decorate([
        ccclass
    ], SuperHeroTimer);
    return SuperHeroTimer;
}(cc.Component));
exports.SuperHeroTimer = SuperHeroTimer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN1cGVySGVyb1RpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YsNkNBQW1DO0FBQ25DLGlDQUFnQztBQUV4QixJQUFBLE9BQU8sR0FBSyxFQUFFLENBQUMsVUFBVSxRQUFsQixDQUFtQjtBQUVsQyxJQUFJO0FBRUo7SUFBNkIsa0NBQVk7SUFBekM7UUFBQSxxRUFtR0M7UUFsR1csWUFBTSxHQUFpQixJQUFJLENBQUM7UUFDNUIsa0JBQVksR0FBVyxDQUFDLENBQUM7O0lBaUdyQyxDQUFDO0lBL0ZHLElBQUk7SUFDRyw2QkFBSSxHQUFYO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDZCxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQsSUFBSTtJQUNJLDBDQUFpQixHQUF6QjtRQUNJLElBQU0sYUFBYSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElB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QUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtvQkFDdEcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7b0JBQzNELGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO2lCQUM3RDtxQkFBTTtvQkFDSCxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN0RixnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO2lCQUM3STtnQkFDRCxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQztTQUNKO0lBQ0wsQ0FBQztJQWxHQyxjQUFjO1FBRG5CLE9BQU87T0FDRixjQUFjLENBbUduQjtJQUFELHFCQUFDO0NBbkdELEFBbUdDLENBbkc0QixFQUFFLENBQUMsU0FBUyxHQW1HeEM7QUFFUSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSAnLi9UaW1lcic7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vLyBAXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFN1cGVySGVyb1RpbWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgX3RpbWVyOiBUaW1lciB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRhVGltZXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRhVGltZXIgPSAwO1xyXG4gICAgICAgIGlmICghdGhpcy5fdGltZXIpIHRoaXMuX3RpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QmFycmVsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFN1cGVySGVyb1RpbWUoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX3RpbWVyLmlzX3J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXIuc3RhcnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoU3VwZXJIZXJvVGltZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBpbml0U3VwZXJIZXJvVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdXBlckhlcm9EYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QWxsU3VwZXJIZXJvRGF0YSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VwZXJIZXJvRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc3VwZXJIZXJvRGF0YVtpXS5oZXJvU3RhdGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdXBlckhlcm9EYXRhW2ldLmN1clJlbGl2ZVRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLmN1clJlbGl2ZVRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyBnbS5jb25zdC5TVVBFUkhFUk9SRUxJVkVUSU1FO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdXBlckhlcm9EYXRhW2ldLmN1clJlbGl2ZVRpbWUgPj0gc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uaGVyb1N0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLmhwID0gTWF0aC5mbG9vcigwLjUgKiBzdXBlckhlcm9EYXRhW2ldLm1heEhwKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLmN1clJlbGl2ZVRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyBnbS5jb25zdC5TVVBFUkhFUk9SRUNJVkVUSU1FO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyAoc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSAtIHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXJIZXJvRGF0YVtpXS5jdXJSZWxpdmVUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VwZXJIZXJvRGF0YVtpXS5ocCA+PSBzdXBlckhlcm9EYXRhW2ldLm1heEhwKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLmN1clJlbGl2ZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VwZXJIZXJvRGF0YVtpXS5jdXJSZWxpdmVUaW1lID49IHN1cGVySGVyb0RhdGFbaV0ubmV4dFJlbGl2ZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApICsgZ20uY29uc3QuU1VQRVJIRVJPUkVDSVZFVElNRTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0ubmV4dFJlbGl2ZVRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSArIChzdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lIC0gc3VwZXJIZXJvRGF0YVtpXS5jdXJSZWxpdmVUaW1lKTtcclxuICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgcmVmcmVzaFN1cGVySGVyb1RpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRhVGltZXIrKztcclxuICAgICAgICBpZiAodGhpcy5fdXBkYXRhVGltZXIgPj0gNjAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0YVRpbWVyID0gMDtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuY2hlY2tMb2NhbERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VwZXJIZXJvRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEFsbFN1cGVySGVyb0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VwZXJIZXJvRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSA+PSBzdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cGVySGVyb0RhdGFbaV0uaGVyb1N0YXRlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uaGVyb1N0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJIZXJvRGF0YVtpXS5ocCA9IE1hdGguZmxvb3IoMC41ICogc3VwZXJIZXJvRGF0YVtpXS5tYXhIcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyBnbS5jb25zdC5TVVBFUkhFUk9SRUNJVkVUSU1FO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9zdXBlcl9oZXJvX2NvbG9yXCIsIHN1cGVySGVyb0RhdGFbaV0uY2VsbElELCBzdXBlckhlcm9EYXRhW2ldLmhlcm9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJIZXJvRGF0YVtpXS5ocCA9IE1hdGgubWluKHN1cGVySGVyb0RhdGFbaV0ubWF4SHAsIHN1cGVySGVyb0RhdGFbaV0uaHAgKyBnbS5jb25zdC5TVVBFUkhFUk9SRUNJVkVIUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVySGVyb0RhdGFbaV0uY3VyUmVsaXZlVGltZSA9IHN1cGVySGVyb0RhdGFbaV0ubWF4SHAgPD0gc3VwZXJIZXJvRGF0YVtpXS5ocCA/IDAgOiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSA9IHN1cGVySGVyb0RhdGFbaV0ubWF4SHAgPD0gc3VwZXJIZXJvRGF0YVtpXS5ocCA/IDAgOiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSArIGdtLmNvbnN0LlNVUEVSSEVST1JFQ0lWRVRJTUU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEJhcnJlbFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGluaXRCYXJyZWxEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmluaXRCYXJyZWxUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSByZWZyZXNoQmFycmVsVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID4gMCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZSsrO1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyRnJlZUJhcnJlbFRpbWUgPj0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPSBNYXRoLm1pbihnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0sIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSArIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsTnVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPj0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5mcmVlQmFycmVsQ2Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IFxyXG59XHJcblxyXG5leHBvcnQgeyBTdXBlckhlcm9UaW1lciB9O1xyXG4iXX0=