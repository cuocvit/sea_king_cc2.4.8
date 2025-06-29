
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/CoinMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENvaW5NZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDQSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyw2Q0FBbUM7QUFHbkM7SUFBNkIsMkJBQVk7SUFBekM7UUFBQSxxRUFxQ0M7UUFuQ1csYUFBTyxHQUFvQixJQUFJLENBQUM7UUFHaEMsZ0JBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxhQUFPLEdBQW1CLElBQUksQ0FBQzs7SUEwQjNDLENBQUM7SUF4QmEsMEJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyw2QkFBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUNqRixDQUFDO0lBRU8saUNBQWUsR0FBdkI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLG9DQUFrQixHQUExQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BELGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsMkJBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQWxDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzRDQUNxQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUN3QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUN3QjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNxQjtJQVg5QixPQUFPO1FBRG5CLE9BQU87T0FDSyxPQUFPLENBcUNuQjtJQUFELGNBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQzRCLEVBQUUsQ0FBQyxTQUFTLEdBcUN4QztBQXJDWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgQ29pbk1nciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGNvaW5MYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBkaWFtb25kTGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBkaWFtb25kQWRkOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNvaW5BZGQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub24oXCJjb2luX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hDb2luLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hDb2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ29pbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvaW5MYmwuc3RyaW5nID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmNvaW5OdW0udG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmRpYW1vbmRMYmwuc3RyaW5nID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmRpYW1vbmROdW0udG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmRpYW1vbmRBZGQuYWN0aXZlID0gdGhpcy5jb2luQWRkLmFjdGl2ZSA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja09wZW5Db2luKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRDT0lOT1Aua2V5LCBmYWxzZSk7XHJcbiAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HRVRDT0lOT1ApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja09wZW5kaWFtb25kKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRDT0lOT1Aua2V5LCB0cnVlKTtcclxuICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkdFVENPSU5PUCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJjb2luX2NoYW5nZVwiLCB0aGlzLnJlZnJlc2hDb2luLCB0aGlzKTtcclxuICAgIH1cclxufVxyXG4iXX0=