"use strict";
cc._RF.push(module, '4018bDdWGVKSLtNU0llnQ4B', 'LockCloudArea');
// start-scene/scripts/LockCloudArea.ts

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
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LockCloudArea = /** @class */ (function (_super) {
    __extends(LockCloudArea, _super);
    function LockCloudArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barNode = null;
        _this.buildTipsLbl = null;
        _this.lockNode = null;
        _this.rightNode = null;
        _this.curType = 0;
        _this.buildLvl = 0;
        return _this;
    }
    LockCloudArea.prototype.initType = function (type) {
        this.curType = type;
    };
    LockCloudArea.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("unlock_cloud_refresh", this.playAnim, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.position = GameManager_1.gm.const.localCloudAreaList[this.curType].pos;
        this.refreshPanel();
    };
    LockCloudArea.prototype.playAnim = function (type) {
        if (type == this.curType) {
            this.node.getComponent(cc.Animation).play();
        }
    };
    LockCloudArea.prototype.playAnimEnd = function () {
        GameManager_1.gm.pool.put(this.node);
    };
    LockCloudArea.prototype.refreshPanel = function () {
        this.buildLvl = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE).buildLvl;
        this.barNode.width = Math.min(this.buildLvl / GameManager_1.gm.const.localCloudAreaList[this.curType].lvl * 130, 130);
        this.lockNode.active = true;
        this.rightNode.active = false;
        if (this.buildLvl >= GameManager_1.gm.const.localCloudAreaList[this.curType].lvl) {
            this.lockNode.active = false;
            this.rightNode.active = true;
        }
        this.buildTipsLbl.string = "L\u00E2u \u0111\u00E0i c\u1EA5p (" + this.buildLvl + "/" + GameManager_1.gm.const.localCloudAreaList[this.curType].lvl + ")";
    };
    LockCloudArea.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("unlock_cloud_refresh", this.playAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
    };
    LockCloudArea.prototype.onClickBuild = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.UNLOCKAREACLOUDOP.key, this.curType);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.UNLOCKAREACLOUDOP);
    };
    __decorate([
        property(cc.Node)
    ], LockCloudArea.prototype, "barNode", void 0);
    __decorate([
        property(cc.Label)
    ], LockCloudArea.prototype, "buildTipsLbl", void 0);
    __decorate([
        property(cc.Node)
    ], LockCloudArea.prototype, "lockNode", void 0);
    __decorate([
        property(cc.Node)
    ], LockCloudArea.prototype, "rightNode", void 0);
    LockCloudArea = __decorate([
        ccclass
    ], LockCloudArea);
    return LockCloudArea;
}(NodePoolItem_1.NodePoolItem));
exports.default = LockCloudArea;

cc._RF.pop();