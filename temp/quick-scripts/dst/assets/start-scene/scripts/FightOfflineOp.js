
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FightOfflineOp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZpZ2h0T2ZmbGluZU9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiw2Q0FBbUM7QUFDbkMsdUNBQXNDO0FBQ3RDLHVDQUFzQztBQUN0QywyQ0FBMEM7QUFFcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkIsa0NBQVU7SUFBdkM7UUFBQSxxRUE0QkM7UUExQlcsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFHakMsY0FBUSxHQUFvQixJQUFJLENBQUM7O0lBb0I3QyxDQUFDO0lBbEJhLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sb0NBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLG1CQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVPLHFDQUFZLEdBQXBCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVTLGtDQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUF6QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQztvREFDc0I7SUFHekM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQztvREFDc0I7SUFSdkMsY0FBYztRQURuQixPQUFPO09BQ0YsY0FBYyxDQTRCbkI7SUFBRCxxQkFBQztDQTVCRCxBQTRCQyxDQTVCNEIsdUJBQVUsR0E0QnRDO0FBRUQsa0JBQWUsY0FBYyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZpZ2h0T2ZmbGluZU9wIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibENvaW46IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSBpdGVtTGlzdDogTGlzdFZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIGhlcm9MaXN0OiBMaXN0VmlldyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxibENvaW4uc3RyaW5nID0gXCItMFwiO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb0xpc3Quc2V0RGF0YShUZW1wRGF0YS5sb2NhbEhlcm9MaXN0KTtcclxuICAgICAgICB0aGlzLml0ZW1MaXN0LnNldERhdGEoVGVtcERhdGEubG9jYWxIZXJvTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuRklHSFRPRkZMSU5FT1ApO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvTGlzdC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QucmVzZXQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlnaHRPZmZsaW5lT3A7Il19