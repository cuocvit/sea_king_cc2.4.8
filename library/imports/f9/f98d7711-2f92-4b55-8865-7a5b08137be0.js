"use strict";
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