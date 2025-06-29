"use strict";
cc._RF.push(module, 'a2177Ee+P9GPYDbQK1oLkxM', 'TurtleExchangeRedTips');
// start-scene/scripts/TurtleExchangeRedTips.ts

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
exports.TurtleExchangeRedTips = void 0;
// *-*
var GameManager_1 = require("./GameManager");
var GameModule_1 = require("./GameModule");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TurtleExchangeRedTips = /** @class */ (function (_super) {
    __extends(TurtleExchangeRedTips, _super);
    function TurtleExchangeRedTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redTipsNode = null;
        return _this;
    }
    TurtleExchangeRedTips.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("refresh_red_tips_stall", this.setStallRed, this);
        this.setStallRed();
    };
    TurtleExchangeRedTips.prototype.setStallRed = function () {
        this.redTipsNode.active = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE] &&
            GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE].buildLvl > 0 &&
            GameManager_1.gm.data.store_data.isFree;
    };
    TurtleExchangeRedTips.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("refresh_red_tips_stall", this.setStallRed, this);
    };
    __decorate([
        property(cc.Node)
    ], TurtleExchangeRedTips.prototype, "redTipsNode", void 0);
    TurtleExchangeRedTips = __decorate([
        ccclass
    ], TurtleExchangeRedTips);
    return TurtleExchangeRedTips;
}(GameModule_1.GameModule));
exports.TurtleExchangeRedTips = TurtleExchangeRedTips;

cc._RF.pop();