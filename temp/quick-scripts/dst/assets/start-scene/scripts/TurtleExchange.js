
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TurtleExchange.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '350e5ylqXZEGLKSlG5ax+QT', 'TurtleExchange');
// start-scene/scripts/TurtleExchange.ts

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
exports.TurtleExchange = void 0;
//
var GameModule_1 = require("./GameModule");
var TurtleExchangeData_1 = require("./TurtleExchangeData");
var GameManager_1 = require("./GameManager");
var ListView_1 = require("./ListView");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TurtleExchange = /** @class */ (function (_super) {
    __extends(TurtleExchange, _super);
    function TurtleExchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask_node = null;
        _this.window_node = null;
        _this.close_btn = null;
        _this.exchange_list = null;
        _this.refresh_count_lbl = null;
        _this.refresh_btn = null;
        _this.refresh_diamond_lbl = null;
        return _this;
    }
    TurtleExchange.prototype.onEnable = function () {
        var _a;
        this._args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.Task.key);
        GameManager_1.gm.data.event_emitter.on(TurtleExchangeData_1.TurtleExchangeData.EVENT_DATA_CHANGE, this.update_view, this);
        (_a = this.mask_node) === null || _a === void 0 ? void 0 : _a.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.update_view();
    };
    TurtleExchange.prototype.onDisable = function () {
        var _a, _b;
        GameManager_1.gm.data.event_emitter.off(TurtleExchangeData_1.TurtleExchangeData.EVENT_DATA_CHANGE, this.update_view, this);
        (_a = this.mask_node) === null || _a === void 0 ? void 0 : _a.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        (_b = this.exchange_list) === null || _b === void 0 ? void 0 : _b.reset();
    };
    TurtleExchange.prototype.update_view = function () {
        var turtleExchangeData = GameManager_1.gm.data.turtle_exchange_data;
        this.refresh_count_lbl.string = cc.js.formatStr("Số lần：%d/%d", turtleExchangeData.left_refresh_count, GameManager_1.gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT);
        this.refresh_diamond_lbl.string = GameManager_1.gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND.toString();
        this.exchange_list.setData(turtleExchangeData.get_turtle_exchange_data_array());
    };
    TurtleExchange.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b;
        if (event.target === ((_a = this.close_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.TurtleExchange);
        }
        else if (event.target === ((_b = this.refresh_btn) === null || _b === void 0 ? void 0 : _b.node)) {
            var mapCellData = GameManager_1.gm.data.mapCell_data;
            if (mapCellData.roleCoinData.diamondNum < GameManager_1.gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND) {
                GameManager_1.gm.ui.show_notice("Không đủ kim cương");
            }
            else {
                mapCellData.delCellItem(Constants_1.RewardIdEnum.DIAMOND, GameManager_1.gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND);
                var turtleExchangeData = GameManager_1.gm.data.turtle_exchange_data;
                turtleExchangeData.left_refresh_count += GameManager_1.gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT;
                turtleExchangeData.async_write_data();
            }
        }
    };
    TurtleExchange.prototype.on_touch_end_handler = function (event) {
        if (event.target === this.mask_node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.TurtleExchange);
        }
    };
    __decorate([
        property(cc.Node)
    ], TurtleExchange.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], TurtleExchange.prototype, "window_node", void 0);
    __decorate([
        property(cc.Button)
    ], TurtleExchange.prototype, "close_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], TurtleExchange.prototype, "exchange_list", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchange.prototype, "refresh_count_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], TurtleExchange.prototype, "refresh_btn", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchange.prototype, "refresh_diamond_lbl", void 0);
    TurtleExchange = __decorate([
        ccclass
    ], TurtleExchange);
    return TurtleExchange;
}(GameModule_1.GameModule));
exports.TurtleExchange = TurtleExchange;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFR1cnRsZUV4Y2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YsMkNBQTBDO0FBQzFDLDJEQUEwRDtBQUMxRCw2Q0FBbUM7QUFDbkMsdUNBQXNDO0FBQ3RDLHlDQUEyQztBQUVyQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQyxrQ0FBVTtJQUE5QztRQUFBLHFFQWlFQztRQS9EVyxlQUFTLEdBQW1CLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsbUJBQWEsR0FBb0IsSUFBSSxDQUFDO1FBR3RDLHVCQUFpQixHQUFvQixJQUFJLENBQUM7UUFHMUMsaUJBQVcsR0FBcUIsSUFBSSxDQUFDO1FBR3JDLHlCQUFtQixHQUFvQixJQUFJLENBQUM7O0lBNkN4RCxDQUFDO0lBekNhLGlDQUFRLEdBQWxCOztRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RCxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLHVDQUFrQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkYsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUU7UUFDakYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZC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QUUsQ0FBQyxNQUFNLENBQUM7dURBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0RBQ2lDO0lBcEIzQyxjQUFjO1FBRDFCLE9BQU87T0FDSyxjQUFjLENBaUUxQjtJQUFELHFCQUFDO0NBakVELEFBaUVDLENBakVtQyx1QkFBVSxHQWlFN0M7QUFqRVksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgVHVydGxlRXhjaGFuZ2VEYXRhIH0gZnJvbSAnLi9UdXJ0bGVFeGNoYW5nZURhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4vTGlzdFZpZXcnO1xyXG5pbXBvcnQgeyBSZXdhcmRJZEVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IE11ZHVsZSB9IGZyb20gXCIuL1VJTWFuYWdlclwiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgVHVydGxlRXhjaGFuZ2UgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBtYXNrX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgd2luZG93X25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgZXhjaGFuZ2VfbGlzdDogTGlzdFZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHJlZnJlc2hfY291bnRfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHJlZnJlc2hfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHJlZnJlc2hfZGlhbW9uZF9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXJnczogTXVkdWxlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hcmdzID0gZ20udWkuZ2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LlRhc2sua2V5KTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oVHVydGxlRXhjaGFuZ2VEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1hc2tfbm9kZT8ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX3RvdWNoX2VuZF9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFR1cnRsZUV4Y2hhbmdlRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5tYXNrX25vZGU/Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZXhjaGFuZ2VfbGlzdD8ucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHR1cnRsZUV4Y2hhbmdlRGF0YSA9IGdtLmRhdGEudHVydGxlX2V4Y2hhbmdlX2RhdGE7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoX2NvdW50X2xibC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCJT4buRIGzhuqdu77yaJWQvJWRcIiwgdHVydGxlRXhjaGFuZ2VEYXRhLmxlZnRfcmVmcmVzaF9jb3VudCwgZ20uY29uc3QuVFVSVExFX0VYQ0hBTkdFX01BWF9SRUZSRVNIX0NPVU5UKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hfZGlhbW9uZF9sYmwuc3RyaW5nID0gZ20uY29uc3QuVFVSVExFX0VYQ0hBTkdFX1JFRlJFU0hfRElBTU9ORC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuZXhjaGFuZ2VfbGlzdC5zZXREYXRhKHR1cnRsZUV4Y2hhbmdlRGF0YS5nZXRfdHVydGxlX2V4Y2hhbmdlX2RhdGFfYXJyYXkoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5jbG9zZV9idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuVHVydGxlRXhjaGFuZ2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLnJlZnJlc2hfYnRuPy5ub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcENlbGxEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGE7XHJcbiAgICAgICAgICAgIGlmIChtYXBDZWxsRGF0YS5yb2xlQ29pbkRhdGEuZGlhbW9uZE51bSA8IGdtLmNvbnN0LlRVUlRMRV9FWENIQU5HRV9SRUZSRVNIX0RJQU1PTkQpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiS2jDtG5nIMSR4bunIGtpbSBjxrDGoW5nXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFwQ2VsbERhdGEuZGVsQ2VsbEl0ZW0oUmV3YXJkSWRFbnVtLkRJQU1PTkQsIGdtLmNvbnN0LlRVUlRMRV9FWENIQU5HRV9SRUZSRVNIX0RJQU1PTkQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHVydGxlRXhjaGFuZ2VEYXRhID0gZ20uZGF0YS50dXJ0bGVfZXhjaGFuZ2VfZGF0YTtcclxuICAgICAgICAgICAgICAgIHR1cnRsZUV4Y2hhbmdlRGF0YS5sZWZ0X3JlZnJlc2hfY291bnQgKz0gZ20uY29uc3QuVFVSVExFX0VYQ0hBTkdFX01BWF9SRUZSRVNIX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgdHVydGxlRXhjaGFuZ2VEYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX3RvdWNoX2VuZF9oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMubWFza19ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LlR1cnRsZUV4Y2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=