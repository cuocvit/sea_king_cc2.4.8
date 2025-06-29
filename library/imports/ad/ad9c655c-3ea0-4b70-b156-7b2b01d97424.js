"use strict";
cc._RF.push(module, 'ad9c6VcPqBLcLFWeysB2XQk', 'WaterBarrelItem');
// start-scene/scripts/WaterBarrelItem.ts

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
// *-*
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WaterBarrelItem = /** @class */ (function (_super) {
    __extends(WaterBarrelItem, _super);
    function WaterBarrelItem() {
        var _this = _super.call(this) || this;
        _this.barrelSpr = null;
        _this._curIndex = 0;
        _this._curBarrelData = {};
        return _this;
    }
    WaterBarrelItem.prototype.initData = function (curBarrelData, curIndex) {
        this._curBarrelData = curBarrelData;
        this.node.position = this._curBarrelData.itemPos;
        this._curIndex = curIndex;
    };
    WaterBarrelItem.prototype.onEnable = function () {
        var _this = this;
        Utils_1.Utils.async_set_sprite_frame(this.barrelSpr, Constants_1.BundleName.MAP, "res/barrel/" + this._curBarrelData.itemID),
            this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function (t, e) {
                if ("case_open" == e.name) {
                    _this.node.getComponent(cc.Button).interactable = true;
                    _this.node.getComponent(cc.Animation).play("case_normal");
                }
                else if ("case_close" == e.name) {
                    GameManager_1.gm.data.mapCell_data.addBarrelInMap(_this._curBarrelData.itemID);
                    GameManager_1.gm.pool.put(_this.node);
                    if (GameManager_1.gm.data.mapCell_data.isGuide) {
                        GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
                    }
                }
            }, this);
        for (var index = 0; index < this.node.childrenCount; index++) {
            this.node.children[index].opacity = 0;
        }
        this.scheduleOnce(function () {
            _this.node.getComponent(cc.Animation).play("case_open");
        }, .3 * this._curIndex);
    };
    WaterBarrelItem.prototype.onClickOpen = function () {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_10_JIANMUTONG);
            for (var index = 0; index < GameManager_1.gm.data.mapCell_data.waterBarrelList.length; index++) {
                if (GameManager_1.gm.data.mapCell_data.waterBarrelList[index].itemIndex == this._curBarrelData.itemIndex) {
                    GameManager_1.gm.data.mapCell_data.waterBarrelList.splice(index, 1);
                    GameManager_1.gm.data.mapCell_data.async_write_data();
                }
            }
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false,
                this.node.getComponent(cc.Button).interactable = false,
                this.node.getComponent(cc.Animation).play("case_close");
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    WaterBarrelItem.prototype.onDisable = function () {
        this.node.getComponent(cc.Animation).targetOff(this);
    };
    __decorate([
        property(cc.Sprite)
    ], WaterBarrelItem.prototype, "barrelSpr", void 0);
    WaterBarrelItem = __decorate([
        ccclass
    ], WaterBarrelItem);
    return WaterBarrelItem;
}(NodePoolItem_1.NodePoolItem));
exports.default = WaterBarrelItem;

cc._RF.pop();