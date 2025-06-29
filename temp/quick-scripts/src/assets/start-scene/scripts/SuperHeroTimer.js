"use strict";
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