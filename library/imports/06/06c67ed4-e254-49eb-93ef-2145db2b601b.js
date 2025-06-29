"use strict";
cc._RF.push(module, '06c677U4lRJ65PvIUXbK2Ab', 'CoinMgr');
// start-scene/scripts/CoinMgr.ts

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
exports.CoinMgr = void 0;
// +-+
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager_1 = require("./GameManager");
var CoinMgr = /** @class */ (function (_super) {
    __extends(CoinMgr, _super);
    function CoinMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinLbl = null;
        _this.diamondLbl = null;
        _this.diamondAdd = null;
        _this.coinAdd = null;
        return _this;
    }
    CoinMgr.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("coin_change", this.refreshCoin, this);
        this.refreshCoin();
    };
    CoinMgr.prototype.refreshCoin = function () {
        this.coinLbl.string = GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum.toString();
        this.diamondLbl.string = GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum.toString();
        this.diamondAdd.active = this.coinAdd.active = !GameManager_1.gm.data.mapCell_data.isGuide;
    };
    CoinMgr.prototype.onClickOpenCoin = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
    };
    CoinMgr.prototype.onClickOpendiamond = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
    };
    CoinMgr.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("coin_change", this.refreshCoin, this);
    };
    __decorate([
        property(cc.Label)
    ], CoinMgr.prototype, "coinLbl", void 0);
    __decorate([
        property(cc.Label)
    ], CoinMgr.prototype, "diamondLbl", void 0);
    __decorate([
        property(cc.Node)
    ], CoinMgr.prototype, "diamondAdd", void 0);
    __decorate([
        property(cc.Node)
    ], CoinMgr.prototype, "coinAdd", void 0);
    CoinMgr = __decorate([
        ccclass
    ], CoinMgr);
    return CoinMgr;
}(cc.Component));
exports.CoinMgr = CoinMgr;

cc._RF.pop();