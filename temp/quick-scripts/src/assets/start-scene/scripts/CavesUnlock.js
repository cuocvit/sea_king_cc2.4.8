"use strict";
cc._RF.push(module, 'b4c99SDt3VJRYAQ35zj7Jch', 'CavesUnlock');
// start-scene/scripts/CavesUnlock.ts

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
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var TaskData_1 = require("./TaskData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CavesUnlock = /** @class */ (function (_super) {
    __extends(CavesUnlock, _super);
    function CavesUnlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meterialNode = [];
        _this.lblCoin = {};
        _this.btnSprList = [];
        _this.btnSpr = null;
        _this._curSpecialCfg = null;
        _this._localdData = null;
        _this._curFunID = Constants_1.SpecialEnum.CAVES_TYPE;
        _this._matraEnough = true;
        _this._tempList = [];
        return _this;
    }
    CavesUnlock.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("coin_change", this.refreshCoin, this);
        this._curSpecialCfg = GameManager_1.gm.data.config_data.getSpecialByID(this._curFunID);
        this._localdData = GameManager_1.gm.data.mapCell_data.specialList[this._curFunID];
        this.refreshPanel();
    };
    CavesUnlock.prototype.refreshPanel = function () {
        this._matraEnough = true;
        this._tempList = [];
        if (this._curSpecialCfg && this._localdData) {
            for (var index = 0; index < this.meterialNode.length; index++) {
                this.meterialNode[index].active = true;
            }
            for (var index = 0; index < this._curSpecialCfg.prop.length; index++) {
                var prop = this._curSpecialCfg.prop[index];
                if (0 < prop) {
                    this._tempList.push(prop);
                    this.meterialNode[index].active = true;
                    this.meterialNode[index].children[1].getComponent(cc.Label).string = this._localdData.mertrail[prop] + "/" + this._curSpecialCfg.value[index];
                    var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(prop);
                    if (heroCfg) {
                        Utils_1.Utils.async_set_sprite_frame(this.meterialNode[index].children[0].getComponent(cc.Sprite), Constants_1.BundleName.COMMON, "res/heroCircleImg/" + heroCfg.icon);
                    }
                    if (this._localdData.mertrail[prop] < this._curSpecialCfg.value[index]) {
                        this._matraEnough = false;
                        this.meterialNode[index].color = cc.Color.WHITE;
                        this.meterialNode[index].children[2].active = true;
                        this.meterialNode[index].children[3].active = false;
                        this.meterialNode[index].children[2].children[0].width = this._localdData.mertrail[prop] / this._curSpecialCfg.value[index] * 80;
                        this.meterialNode[index].children[2].children[1].children[0].active = !GameManager_1.gm.data.mapCell_data.getHeroNum(heroCfg.occupation, heroCfg.heroid);
                    }
                    else {
                        this.meterialNode[index].children[2].active = false;
                        this.meterialNode[index].children[3].active = true;
                        this.meterialNode[index].color = cc.Color.BLACK.fromHEX("#86cbB4e");
                    }
                }
            }
            this.refreshCoin();
        }
    };
    CavesUnlock.prototype.onClickClose = function () {
        this.node.active = false;
    };
    CavesUnlock.prototype.onClickAddMetrail = function (event, index) {
        var idx = parseInt(index);
        GameManager_1.gm.data.mapCell_data.onekeyGetAllSpecialHeroMertrail(this._curFunID, this._tempList[idx]);
        this.refreshPanel();
    };
    CavesUnlock.prototype.onClickUpgrade = function () {
        if (this._matraEnough && GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this._curSpecialCfg.coin) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETCOINOP);
            return;
        }
        if (this._matraEnough) {
            GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.CAVES_TYPE].state = 2;
            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this._curSpecialCfg.coin);
            GameManager_1.gm.ui.emit("open_special_fun", 143);
            GameManager_1.gm.ui.mapMainUI.roleBuildAnimNode.active = false;
            GameManager_1.gm.data.mapCell_data.lockCaveAllInitCell(GameManager_1.gm.const.CAVESAREAID);
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.UNLOCK_CAVERN);
            GameManager_1.gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "洞窟")
            });
            NetUtils_1.ReportData.instance.report_once_point(10604);
            this.onClickClose();
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, 2);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
        }
    };
    CavesUnlock.prototype.refreshCoin = function () {
        this.lblCoin.string = this._curSpecialCfg.coin + "";
        this.lblCoin.node.color = cc.Color.RED;
        if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum >= this._curSpecialCfg.coin) {
            this.lblCoin.node.color = cc.Color.BLACK.fromHEX("#FFD53C");
        }
    };
    CavesUnlock.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("coin_change", this.refreshCoin, this);
    };
    __decorate([
        property([cc.Node])
    ], CavesUnlock.prototype, "meterialNode", void 0);
    __decorate([
        property(cc.Label)
    ], CavesUnlock.prototype, "lblCoin", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CavesUnlock.prototype, "btnSprList", void 0);
    __decorate([
        property(cc.Sprite)
    ], CavesUnlock.prototype, "btnSpr", void 0);
    CavesUnlock = __decorate([
        ccclass
    ], CavesUnlock);
    return CavesUnlock;
}(cc.Component));
// export default CavesUnlock;

cc._RF.pop();