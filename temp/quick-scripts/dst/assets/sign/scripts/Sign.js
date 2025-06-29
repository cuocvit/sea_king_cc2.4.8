
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/sign/scripts/Sign.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dfe79Og9y9GKq7s6+VaazWt', 'Sign');
// sign/scripts/Sign.ts

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
var SignBuyItem_1 = require("./SignBuyItem");
var TempData_1 = require("../../start-scene/scripts/TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Sign = /** @class */ (function (_super) {
    __extends(Sign, _super);
    function Sign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.sign_list = null;
        _this.sign_buy_item_array = [];
        return _this;
    }
    Sign.prototype.onEnable = function () {
        TempData_1.TempData.mainFunShowSign = true;
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Sign.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.sign_list.reset();
        for (var i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].reset();
        }
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        GameManager_1.gm.ui.mapMainUI.show_sign_entry();
    };
    Sign.prototype.update_view = function () {
        this.sign_list.setData(GameManager_1.gm.data.sign_data.sign_data_array);
        for (var i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].data = GameManager_1.gm.data.sign_data.sign_buy_data_array[i];
        }
    };
    Sign.prototype.editor_on_button_click_handler = function (event) {
        if (event.target !== this.close_btn.node && event.target !== this.anywhere_close_btn.node)
            return;
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Sign);
    };
    __decorate([
        property(cc.Button)
    ], Sign.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Sign.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Sign.prototype, "sign_list", void 0);
    __decorate([
        property(SignBuyItem_1.SignBuyItem)
    ], Sign.prototype, "sign_buy_item_array", void 0);
    Sign = __decorate([
        ccclass
    ], Sign);
    return Sign;
}(GameModule_1.GameModule));
exports.default = Sign;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2lnblxcc2NyaXB0c1xcU2lnbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBMEU7QUFDMUUsK0RBQThEO0FBQzlELHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFDbEUsK0RBQThEO0FBQzlELDZDQUE0QztBQUM1QywrREFBOEQ7QUFFeEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBbUIsd0JBQVU7SUFBN0I7UUFBQSxxRUF5Q0M7UUF2Q1csZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1Qix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFHckMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQix5QkFBbUIsR0FBa0IsRUFBRSxDQUFDOztJQThCcEQsQ0FBQztJQTVCYSx1QkFBUSxHQUFsQjtRQUNJLG1CQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNoQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVTLHdCQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkM7UUFDRCxnQkFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsK0JBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVNLDBCQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9FO0lBQ0wsQ0FBQztJQUVPLDZDQUE4QixHQUF0QyxVQUF1QyxLQUFlO1FBQ2xELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUNsRyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBdENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLG1CQUFRLENBQUM7MkNBQ2dCO0lBR25DO1FBREMsUUFBUSxDQUFDLHlCQUFXLENBQUM7cURBQzBCO0lBWDlDLElBQUk7UUFEVCxPQUFPO09BQ0YsSUFBSSxDQXlDVDtJQUFELFdBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q2tCLHVCQUFVLEdBeUM1QjtBQUVELGtCQUFlLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJBTk5FUl9BRF9UWVBFIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9DaGFubmVsTWFuYWdlcic7XHJcbmltcG9ydCB7IFNpZ25EYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9TaWduRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXcnO1xyXG5pbXBvcnQgeyBTaWduQnV5SXRlbSB9IGZyb20gJy4vU2lnbkJ1eUl0ZW0nO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFNpZ24gZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGNsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBhbnl3aGVyZV9jbG9zZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSBzaWduX2xpc3Q6IExpc3RWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoU2lnbkJ1eUl0ZW0pXHJcbiAgICBwcml2YXRlIHNpZ25fYnV5X2l0ZW1fYXJyYXk6IFNpZ25CdXlJdGVtW10gPSBbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgVGVtcERhdGEubWFpbkZ1blNob3dTaWduID0gdHJ1ZTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oU2lnbkRhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnNob3dfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFNpZ25EYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNpZ25fbGlzdC5yZXNldCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaWduX2J1eV9pdGVtX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2lnbl9idXlfaXRlbV9hcnJheVtpXS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dfc2lnbl9lbnRyeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNpZ25fbGlzdC5zZXREYXRhKGdtLmRhdGEuc2lnbl9kYXRhLnNpZ25fZGF0YV9hcnJheSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpZ25fYnV5X2l0ZW1fYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zaWduX2J1eV9pdGVtX2FycmF5W2ldLmRhdGEgPSBnbS5kYXRhLnNpZ25fZGF0YS5zaWduX2J1eV9kYXRhX2FycmF5W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLmNsb3NlX2J0bi5ub2RlICYmIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5hbnl3aGVyZV9jbG9zZV9idG4ubm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LlNpZ24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWduOyJdfQ==