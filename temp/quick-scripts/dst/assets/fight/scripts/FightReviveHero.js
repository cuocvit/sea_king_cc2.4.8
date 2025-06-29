
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightReviveHero.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f98d7cRL5JLVYhlelsIE3vg', 'FightReviveHero');
// fight/scripts/FightReviveHero.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightReviveHero = /** @class */ (function (_super) {
    __extends(FightReviveHero, _super);
    function FightReviveHero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.revive_btn = null;
        _this.close_btn = null;
        _this._args = null;
        return _this;
    }
    FightReviveHero.prototype.onEnable = function () {
        this._args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.FightReviveHero.key);
    };
    FightReviveHero.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b;
        var e = this;
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightReviveHero);
            (_b = (_a = this._args) === null || _a === void 0 ? void 0 : _a.callback) === null || _b === void 0 ? void 0 : _b.call(_a, 1);
        }
        else if (event.target == this.revive_btn.node) {
            GameManager_1.gm.channel.show_video_ad(function () {
                var _a, _b;
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightReviveHero);
                NetUtils_1.ReportData.instance.report_once_point(10827);
                NetUtils_1.ReportData.instance.report_point(10828);
                (_b = (_a = e._args) === null || _a === void 0 ? void 0 : _a.callback) === null || _b === void 0 ? void 0 : _b.call(_a, 0);
            }, this);
        }
    };
    __decorate([
        property(cc.Button)
    ], FightReviveHero.prototype, "revive_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReviveHero.prototype, "close_btn", void 0);
    FightReviveHero = __decorate([
        ccclass
    ], FightReviveHero);
    return FightReviveHero;
}(GameModule_1.GameModule));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0UmV2aXZlSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBa0U7QUFDbEUscUVBQTJEO0FBQzNELCtEQUFnRTtBQUUxRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE4QixtQ0FBVTtJQUF4QztRQUFBLHFFQTJCQztRQXpCUyxnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFFbkMsV0FBSyxHQUFtRCxJQUFJLENBQUM7O0lBb0J2RSxDQUFDO0lBbEJXLGtDQUFRLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBTyxDQUFDO0lBQ3pFLENBQUM7SUFFTyx3REFBOEIsR0FBdEMsVUFBdUMsS0FBZTs7UUFDcEQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3ZDLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELFlBQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsUUFBUSxtREFBRyxDQUFDLEVBQUU7U0FDM0I7YUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDL0MsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDOztnQkFDdkIsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2xELHFCQUFVLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLFlBQUEsQ0FBQyxDQUFDLEtBQUssMENBQUUsUUFBUSxtREFBRyxDQUFDLEVBQUU7WUFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1Y7SUFDSCxDQUFDO0lBeEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ3dCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ3VCO0lBTHZDLGVBQWU7UUFEcEIsT0FBTztPQUNGLGVBQWUsQ0EyQnBCO0lBQUQsc0JBQUM7Q0EzQkQsQUEyQkMsQ0EzQjZCLHVCQUFVLEdBMkJ2QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlscyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgRmlnaHRSZXZpdmVIZXJvIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIHJldml2ZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfYXJnczogeyBjYWxsYmFjaz86IChyZXN1bHQ6IG51bWJlcikgPT4gdm9pZCB9IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2FyZ3MgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuRmlnaHRSZXZpdmVIZXJvLmtleSkgYXMge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGUgPSB0aGlzO1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmNsb3NlX2J0bi5ub2RlKSB7XHJcbiAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkZpZ2h0UmV2aXZlSGVybyk7XHJcbiAgICAgIHRoaXMuX2FyZ3M/LmNhbGxiYWNrPy4oMSk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnJldml2ZV9idG4ubm9kZSkge1xyXG4gICAgICBnbS5jaGFubmVsLnNob3dfdmlkZW9fYWQoKCkgPT4ge1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkZpZ2h0UmV2aXZlSGVybyk7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgyNyk7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA4MjgpO1xyXG4gICAgICAgIGUuX2FyZ3M/LmNhbGxiYWNrPy4oMCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==