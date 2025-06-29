
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/buy/scripts/Buy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '225589Y3PFJN4pSp443cc0M', 'Buy');
// buy/scripts/Buy.ts

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
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var SignData_1 = require("../../start-scene/scripts/SignData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var buyItem_1 = require("./buyItem");
var TempData_1 = require("../../start-scene/scripts/TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Buy = /** @class */ (function (_super) {
    __extends(Buy, _super);
    function Buy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.sign_list = null;
        _this.sign_buy_item_array = [];
        return _this;
    }
    Buy.prototype.onEnable = function () {
        TempData_1.TempData.mainFunShowSign = true;
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Buy.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.sign_list.reset();
        for (var i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].reset();
        }
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        GameManager_1.gm.ui.mapMainUI.show_sign_entry();
    };
    Buy.prototype.update_view = function () {
        var data = [];
        this.sign_list.setData(GameManager_1.gm.const.BuyData);
        for (var i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].data =
                GameManager_1.gm.data.sign_data.sign_buy_data_array[i];
        }
    };
    Buy.prototype.editor_on_button_click_handler = function (event) {
        if (event.target !== this.close_btn.node &&
            event.target !== this.anywhere_close_btn.node)
            return;
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Buy);
    };
    __decorate([
        property(cc.Button)
    ], Buy.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Buy.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Buy.prototype, "sign_list", void 0);
    __decorate([
        property(buyItem_1.BuyItem)
    ], Buy.prototype, "sign_buy_item_array", void 0);
    Buy = __decorate([
        ccclass
    ], Buy);
    return Buy;
}(GameModule_1.GameModule));
exports.default = Buy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYnV5XFxzY3JpcHRzXFxCdXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQTBFO0FBQzFFLCtEQUE4RDtBQUM5RCxxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBQ2xFLCtEQUE4RDtBQUM5RCxxQ0FBb0M7QUFDcEMsK0RBQThEO0FBR3hELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtCLHVCQUFVO0lBQTVCO1FBQUEscUVBdURDO1FBckRXLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBR3JDLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IseUJBQW1CLEdBQWMsRUFBRSxDQUFDOztJQTRDaEQsQ0FBQztJQTFDYSxzQkFBUSxHQUFsQjtRQUNJLG1CQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNoQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUNwQixtQkFBUSxDQUFDLGlCQUFpQixFQUMxQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixnQkFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsK0JBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRVMsdUJBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNyQixtQkFBUSxDQUFDLGlCQUFpQixFQUMxQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSx5QkFBVyxHQUFsQjtRQUNJLElBQU0sSUFBSSxHQUFrQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQzVCLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFTyw0Q0FBOEIsR0FBdEMsVUFBdUMsS0FBZTtRQUNsRCxJQUNJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1lBQ3BDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUk7WUFFN0MsT0FBTztRQUNYLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFwREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswQ0FDZ0I7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDeUI7SUFHN0M7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzswQ0FDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsaUJBQU8sQ0FBQztvREFDMEI7SUFYMUMsR0FBRztRQURSLE9BQU87T0FDRixHQUFHLENBdURSO0lBQUQsVUFBQztDQXZERCxBQXVEQyxDQXZEaUIsdUJBQVUsR0F1RDNCO0FBRUQsa0JBQWUsR0FBRyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tIFwiLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9DaGFubmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTaWduRGF0YSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1NpZ25EYXRhXCI7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGVcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwiLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlld1wiO1xyXG5pbXBvcnQgeyBCdXlJdGVtIH0gZnJvbSBcIi4vYnV5SXRlbVwiO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1RlbXBEYXRhXCI7XHJcbmltcG9ydCB7IEJ1eUl0ZW1EYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEJ1eSBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGFueXdoZXJlX2Nsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIHNpZ25fbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShCdXlJdGVtKVxyXG4gICAgcHJpdmF0ZSBzaWduX2J1eV9pdGVtX2FycmF5OiBCdXlJdGVtW10gPSBbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgVGVtcERhdGEubWFpbkZ1blNob3dTaWduID0gdHJ1ZTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oXHJcbiAgICAgICAgICAgIFNpZ25EYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTsgXHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd19iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoXHJcbiAgICAgICAgICAgIFNpZ25EYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLFxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNpZ25fbGlzdC5yZXNldCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaWduX2J1eV9pdGVtX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbl9idXlfaXRlbV9hcnJheVtpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dfc2lnbl9lbnRyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhOiBCdXlJdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgdGhpcy5zaWduX2xpc3Quc2V0RGF0YShnbS5jb25zdC5CdXlEYXRhKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2lnbl9idXlfaXRlbV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNpZ25fYnV5X2l0ZW1fYXJyYXlbaV0uZGF0YSA9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5zaWduX2J1eV9kYXRhX2FycmF5W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5jbG9zZV9idG4ubm9kZSAmJlxyXG4gICAgICAgICAgICBldmVudC50YXJnZXQgIT09IHRoaXMuYW55d2hlcmVfY2xvc2VfYnRuLm5vZGVcclxuICAgICAgICApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5CdXkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXk7XHJcbiJdfQ==