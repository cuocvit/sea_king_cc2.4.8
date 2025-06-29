"use strict";
cc._RF.push(module, '82e2aAQAZRMKZsY4BvU5fua', 'SpritiItem');
// start-scene/scripts/SpritiItem.ts

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
//
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpritiItem = /** @class */ (function (_super) {
    __extends(SpritiItem, _super);
    function SpritiItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTips = null;
        _this.lockNode = null;
        _this.funCellID = 223;
        return _this;
    }
    SpritiItem.prototype.onLoad = function () {
        var _this = this;
        this.node.getComponent(sp.Skeleton).setCompleteListener(function () {
            if ("tree unlocking" == _this.node.getComponent(sp.Skeleton).animation) {
                _this.node.getComponent(sp.Skeleton).clearTracks();
                _this.node.getComponent(sp.Skeleton).animation = null;
                _this.node.getComponent(sp.Skeleton).setAnimation(0, "tree fly long", true);
            }
        });
    };
    SpritiItem.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("play_spriti_fly", this.playFly, this);
        GameManager_1.gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.initSpiritNode();
    };
    SpritiItem.prototype.openSpecialFun = function (num) {
        if (num == this.funCellID) {
            this.initSpiritNode();
        }
    };
    SpritiItem.prototype.initSpiritNode = function () {
        var _this = this;
        var specialConfig = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.SPIRIT_TYPE);
        if (specialConfig) {
            if (GameManager_1.gm.data.mapCell_data.role_map_data[specialConfig.unlock]) {
                var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE];
                if (1 == special.state) {
                    this.lblTips.string = "Rơi vào bẫy của con rồng lửa độc ác, bạn cần có sức mạnh của linh hồn biển để mở khóa!";
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "tree binding", true);
                    this.lockNode.active = true;
                }
                else if (2 == special.state) {
                    this.lockNode.active = false;
                    this.node.getComponent(sp.Skeleton).setAnimation(0, "tree fly long", true);
                    this.node.stopAllActions();
                    var tips_1 = ["Tôi cũng có thể truyền sức mạnh của Poseidon để giúp bạn!",
                        "Càng nhiều linh hồn biển, sức mạnh của Poseidon càng mạnh!",
                        "Linh hồn biển có thể được lấy từ Bàn thờ Poseidon và khi anh hùng chết!"];
                    this.node.stopAllActions();
                    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
                        var randomTipIndex = Math.floor(Math.random() * tips_1.length);
                        _this.lblTips.string = tips_1[randomTipIndex];
                    }))));
                }
            }
            else {
                this.lblTips.string = "Để mở khóa, bạn cần kết nối hòn đảo với đất liền!";
                this.node.getComponent(sp.Skeleton).setAnimation(0, "tree binding", true);
                this.lockNode.active = true;
            }
        }
    };
    SpritiItem.prototype.playFly = function () {
        this.node.getComponent(sp.Skeleton).setAnimation(0, "tree unlocking", false);
    };
    SpritiItem.prototype.onDisable = function () {
        this.node.stopAllActions();
        GameManager_1.gm.ui.off("play_spriti_fly", this.playFly, this);
        GameManager_1.gm.ui.off("open_special_fun", this.openSpecialFun, this);
    };
    SpritiItem.prototype.onClick = function () {
        var specialConfig = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.SPIRIT_TYPE);
        if (!(specialConfig && !GameManager_1.gm.data.mapCell_data.role_map_data[specialConfig.unlock])) {
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false;
            var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE];
            if (1 == special.state) {
                GameManager_1.gm.ui.mapMainUI.showSpiritLock();
            }
            else if (2 == special.state) {
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.POSEIDON);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], SpritiItem.prototype, "lblTips", void 0);
    __decorate([
        property(cc.Node)
    ], SpritiItem.prototype, "lockNode", void 0);
    SpritiItem = __decorate([
        ccclass
    ], SpritiItem);
    return SpritiItem;
}(cc.Component));
exports.default = SpritiItem;

cc._RF.pop();