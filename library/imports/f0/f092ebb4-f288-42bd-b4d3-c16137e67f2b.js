"use strict";
cc._RF.push(module, 'f092eu08ohCvbTTwWE35n8r', 'GetReel');
// start-scene/scripts/GetReel.ts

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
exports.GetReel = void 0;
// +-+
var GameModule_1 = require("./GameModule");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var MainMapItem_1 = require("./MainMapItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetReel = /** @class */ (function (_super) {
    __extends(GetReel, _super);
    function GetReel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reel_anim = null;
        _this.reel_node = null;
        _this.isShowBarrackList = true;
        return _this;
    }
    GetReel.prototype.onEnable = function () {
        this.isShowBarrackList = !!GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GetReel.key);
        this.reel_anim.on(cc.Animation.EventType.FINISHED, this.on_anim_finished, this);
        this.reel_anim.play();
    };
    GetReel.prototype.onDisable = function () { };
    GetReel.prototype.on_anim_finished = function () {
        var _a, _b;
        var self = this;
        (_a = this.reel_anim) === null || _a === void 0 ? void 0 : _a.off(cc.Animation.EventType.FINISHED, this.on_anim_finished, this);
        var reelInstance = cc.instantiate(this.reel_node);
        reelInstance.active = true;
        reelInstance.scale = 1;
        reelInstance.angle = 0;
        var isHidden = !(reelInstance.opacity = 255);
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.BARRACKS_TYPE);
        if (buildData) {
            var mapChild = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(buildData.cellID.toString());
            if (mapChild) {
                var mapBuildNode = (_b = mapChild.getComponent(MainMapItem_1.default)) === null || _b === void 0 ? void 0 : _b.mapBuildNode;
                if (mapBuildNode) {
                    var worldPosition = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    worldPosition = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(worldPosition);
                    reelInstance.position = cc.v3(worldPosition);
                    GameManager_1.gm.ui.mapMainUI.mapContent.addChild(reelInstance, 10000);
                    isHidden = true;
                    var buildWorldPosition = mapBuildNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    buildWorldPosition = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(buildWorldPosition);
                    cc.tween(reelInstance)
                        .bezierTo(1, worldPosition, cc.v2(worldPosition.x, worldPosition.y + 100), cc.v2(buildWorldPosition))
                        .call(function () {
                        reelInstance === null || reelInstance === void 0 ? void 0 : reelInstance.destroy();
                        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GetReel);
                        self.isShowBarrackList;
                    })
                        .start();
                }
            }
        }
        if (!isHidden) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GetReel);
        }
    };
    __decorate([
        property(cc.Animation)
    ], GetReel.prototype, "reel_anim", void 0);
    __decorate([
        property(cc.Node)
    ], GetReel.prototype, "reel_node", void 0);
    GetReel = __decorate([
        ccclass
    ], GetReel);
    return GetReel;
}(GameModule_1.GameModule));
exports.GetReel = GetReel;

cc._RF.pop();