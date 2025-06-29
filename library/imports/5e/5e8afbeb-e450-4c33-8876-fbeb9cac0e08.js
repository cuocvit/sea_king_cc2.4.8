"use strict";
cc._RF.push(module, '5e8afvr5FBMM4h2++ucrA4I', 'UnlockTree');
// start-scene/scripts/UnlockTree.ts

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
var TaskData_1 = require("./TaskData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UnlockTree = /** @class */ (function (_super) {
    __extends(UnlockTree, _super);
    function UnlockTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meterialNode = [];
        _this.lblCoin = null;
        _this.btnSprList = [];
        _this.btnSpr = null;
        _this._curSpecialCfg = null;
        _this._localdData = null;
        _this._curFunID = Constants_1.SpecialEnum.SPIRIT_TYPE;
        _this._clickIndex = 0;
        _this._matraEnough = true;
        _this._tempList = [];
        return _this;
    }
    UnlockTree.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).play();
        this._curSpecialCfg = GameManager_1.gm.data.config_data.getSpecialByID(this._curFunID);
        this._localdData = GameManager_1.gm.data.mapCell_data.specialList[this._curFunID];
        this.refreshPanel();
    };
    UnlockTree.prototype.refreshPanel = function () {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curSpecialCfg && this._localdData) {
            for (var t = 0; t < this.meterialNode.length; t++) {
                this.meterialNode[t].active = false;
            }
            for (var t = 0; t < this._curSpecialCfg.prop.length; t++) {
                var prop = this._curSpecialCfg.prop[t];
                if (0 < prop) {
                    this._tempList.push(prop);
                    this.meterialNode[t].active = true;
                    this.meterialNode[t].children[1].getComponent(cc.Label).string = this._localdData.mertrail[prop] + "/" + this._curSpecialCfg.value[t];
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(prop);
                    if (itemCfg) {
                        Utils_1.Utils.async_set_sprite_frame(this.meterialNode[t].children[0].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemCfg.icon);
                    }
                    if (this._localdData.mertrail[prop] < this._curSpecialCfg.value[t]) {
                        this._matraEnough = false;
                        this.meterialNode[t].color = cc.Color.WHITE;
                        this.meterialNode[t].children[2].active = true;
                        this.meterialNode[t].children[3].active = false;
                        this.meterialNode[t].children[2].children[0].width = this._localdData.mertrail[prop] / this._curSpecialCfg.value[t] * 80;
                        this.meterialNode[t].children[2].children[1].children[0].active = !GameManager_1.gm.data.mapCell_data.getCoinNum(itemCfg.type, prop);
                    }
                    else {
                        this.meterialNode[t].children[2].active = false;
                        this.meterialNode[t].children[3].active = true;
                        this.meterialNode[t].color = cc.Color.BLACK.fromHEX("#86cbB4e");
                    }
                }
            }
            this.refreshCoin();
        }
    };
    UnlockTree.prototype.onClickClose = function () {
        this.node.active = false;
    };
    UnlockTree.prototype.onClickAddMetrail = function (event, index) {
        var idx = parseInt(index);
        GameManager_1.gm.data.mapCell_data.onekeyGetAllSpecialMertrail(this._curFunID, this._tempList[idx]);
        this.refreshPanel();
    };
    UnlockTree.prototype.onClickWatchAd = function (event, index) {
        this._clickIndex = parseInt(index);
        GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
    };
    UnlockTree.prototype.watchAdCb = function () {
        GameManager_1.gm.data.mapCell_data.onekeyWatchAdGetSoul(this._curFunID, this._tempList[this._clickIndex]);
        this.refreshPanel();
    };
    UnlockTree.prototype.onClickUpgrade = function () {
        if (this._matraEnough && GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this._curSpecialCfg.coin) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
            return;
        }
        if (this._matraEnough) {
            GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE].state = 2;
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this._curSpecialCfg.coin);
            GameManager_1.gm.ui.emit("open_special_fun", 223);
            GameManager_1.gm.ui.emit("play_spriti_fly");
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.UNLOCK_ELF);
            GameManager_1.gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "精灵树")
            });
            NetUtils_1.ReportData.instance.report_once_point(10603);
            this.onClickClose();
            GameManager_1.gm.data.mapCell_data.splitItemNum(31, 22008, 1);
            GameManager_1.gm.data.mapCell_data.async_write_data();
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.POSEIDON);
        }
    };
    UnlockTree.prototype.refreshCoin = function () {
        this.lblCoin.string = this._curSpecialCfg.coin + "";
        this.lblCoin.node.color = cc.Color.RED;
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum >= this._curSpecialCfg.coin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    };
    UnlockTree.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("coin_change", this.refreshCoin, this);
    };
    __decorate([
        property([cc.Node])
    ], UnlockTree.prototype, "meterialNode", void 0);
    __decorate([
        property(cc.Label)
    ], UnlockTree.prototype, "lblCoin", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], UnlockTree.prototype, "btnSprList", void 0);
    __decorate([
        property(cc.Sprite)
    ], UnlockTree.prototype, "btnSpr", void 0);
    UnlockTree = __decorate([
        ccclass
    ], UnlockTree);
    return UnlockTree;
}(cc.Component));
exports.default = UnlockTree;

cc._RF.pop();