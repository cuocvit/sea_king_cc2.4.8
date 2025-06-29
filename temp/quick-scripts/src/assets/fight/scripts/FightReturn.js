"use strict";
cc._RF.push(module, 'f3f0azDNItBBZYW9BhYu80n', 'FightReturn');
// fight/scripts/FightReturn.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightReturn = /** @class */ (function (_super) {
    __extends(FightReturn, _super);
    function FightReturn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.cancel_btn = null;
        _this.ok_btn = null;
        return _this;
    }
    FightReturn.prototype.editor_on_button_click_handler = function (event) {
        var target = event.target;
        if (target == this.close_btn.node || target == this.anywhere_close_btn.node || target == this.cancel_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightReturn);
        }
        else if (target == this.ok_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightReturn);
            GameManager_1.gm.ui.fight.fight_return();
        }
    };
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "cancel_btn", void 0);
    __decorate([
        property(cc.Button)
    ], FightReturn.prototype, "ok_btn", void 0);
    FightReturn = __decorate([
        ccclass
    ], FightReturn);
    return FightReturn;
}(GameModule_1.GameModule));

cc._RF.pop();