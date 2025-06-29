"use strict";
cc._RF.push(module, '5e626J4BaZAhLVz0ZpaT9nn', 'FightOfflineOp');
// start-scene/scripts/FightOfflineOp.ts

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
var TempData_1 = require("./TempData");
var ListView_1 = require("./ListView");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightOfflineOp = /** @class */ (function (_super) {
    __extends(FightOfflineOp, _super);
    function FightOfflineOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblCoin = null;
        _this.itemList = null;
        _this.heroList = null;
        return _this;
    }
    FightOfflineOp.prototype.onEnable = function () {
        this.lblCoin.string = "-0";
        this.update_view();
    };
    FightOfflineOp.prototype.update_view = function () {
        this.heroList.setData(TempData_1.TempData.localHeroList);
        this.itemList.setData(TempData_1.TempData.localHeroList);
    };
    FightOfflineOp.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FIGHTOFFLINEOP);
    };
    FightOfflineOp.prototype.onDisable = function () {
        this.heroList.reset();
        this.itemList.reset();
    };
    __decorate([
        property(cc.Label)
    ], FightOfflineOp.prototype, "lblCoin", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightOfflineOp.prototype, "itemList", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightOfflineOp.prototype, "heroList", void 0);
    FightOfflineOp = __decorate([
        ccclass
    ], FightOfflineOp);
    return FightOfflineOp;
}(GameModule_1.GameModule));
exports.default = FightOfflineOp;

cc._RF.pop();