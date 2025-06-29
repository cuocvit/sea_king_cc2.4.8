"use strict";
cc._RF.push(module, 'b0b275QOKJJgLbgFw+6KLqf', 'GetRewardOp');
// start-scene/scripts/GetRewardOp.ts

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
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetRewardOp = /** @class */ (function (_super) {
    __extends(GetRewardOp, _super);
    function GetRewardOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.photoList = [];
        _this.idList = [];
        _this.numList = [];
        return _this;
    }
    GetRewardOp.prototype.onEnable = function () {
        var _this = this;
        var moduleArgs = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GETREWARDOP.key);
        this.idList = moduleArgs.idList;
        this.numList = moduleArgs.numList;
        this.node.opacity = 255;
        for (var i = 0; i < this.photoList.length; i++) {
            this.photoList[i].active = false;
            if (this.idList.length > i) {
                this.photoList[i].active = true;
                var config = void 0;
                if (this.idList[i] > 30000) {
                    config = GameManager_1.gm.data.config_data.getHeroCfgByID(this.idList[i]);
                    if (config) {
                        Utils_1.Utils.async_set_sprite_frame(this.photoList[i].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + config.lv);
                        Utils_1.Utils.async_set_sprite_frame(this.photoList[i].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + config.icon);
                    }
                }
                else {
                    config = GameManager_1.gm.data.config_data.getItemCfgByID(this.idList[i]);
                    if (config) {
                        Utils_1.Utils.async_set_sprite_frame(this.photoList[i].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/color_" + (config.lv === 0 ? 1 : config.lv));
                        if ([11002, 11003, 11006].includes(config.id)) {
                            Utils_1.Utils.async_set_sprite_frame(this.photoList[i].children[1].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/rewardIcon/" + config.icon);
                        }
                        else {
                            Utils_1.Utils.async_set_sprite_frame(this.photoList[i].children[1].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/handbook/" + config.icon);
                        }
                    }
                }
                this.photoList[i].children[2].getComponent(cc.Label).string = "x" + this.numList[i];
            }
        }
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            _this.node.stopAllActions();
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETREWARDOP);
        })));
    };
    GetRewardOp.prototype.onClosePanel = function () {
        this.node.stopAllActions();
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GETREWARDOP);
    };
    __decorate([
        property([cc.Node])
    ], GetRewardOp.prototype, "photoList", void 0);
    GetRewardOp = __decorate([
        ccclass
    ], GetRewardOp);
    return GetRewardOp;
}(cc.Component));
exports.default = GetRewardOp;

cc._RF.pop();