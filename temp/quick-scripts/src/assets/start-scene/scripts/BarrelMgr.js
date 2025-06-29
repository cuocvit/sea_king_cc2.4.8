"use strict";
cc._RF.push(module, '894533C8dZPRqzBZdC+7uA4', 'BarrelMgr');
// start-scene/scripts/BarrelMgr.ts

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
var GameManager_1 = require("./GameManager");
var GameModule_1 = require("./GameModule");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var NetUtils_1 = require("./NetUtils");
var TempData_1 = require("./TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BarrelMgr = /** @class */ (function (_super) {
    __extends(BarrelMgr, _super);
    function BarrelMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saleNode = null;
        _this.lblSaleNum = null;
        _this.noSpaceNode = null;
        _this.noBarrelNode = null;
        _this.noBarrel2Node = null;
        _this.lblFreeTime = null;
        _this.barWidth = null;
        _this.lblNum = null;
        _this.barInfoNode = null;
        _this.handAnim = null;
        _this.guideNode = null;
        _this.lblTips = null;
        _this._timeContainer = 0;
        _this._reciveTime = 0;
        _this._soulID = 0;
        _this.isCd = false;
        return _this;
    }
    BarrelMgr.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.getComponent(cc.Animation).play("btnBuy_open");
        GameManager_1.gm.ui.on("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.on("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.on("refresh_barrel_num", this.refreshBarrelNum, this);
        GameManager_1.gm.ui.on("hide_barrel_ui", this.on_item_not_move_hide, this);
        GameManager_1.gm.ui.on("show_hand_anim", this.showHandAnim, this);
        this._reciveTime = 0;
        var nextFreeBarrelTime = GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime;
        if (this._reciveTime < nextFreeBarrelTime) {
            this._reciveTime = GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
            var value = GameManager_1.gm.data.mapCell_data.roleBarrelData.maxBarrelNum - GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum;
            var newVal = Math.ceil(value / GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelNum) * GameManager_1.gm.data.mapCell_data.roleBarrelData.freeBarrelCd;
            if (this._reciveTime > newVal) {
                GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
                GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + newVal;
            }
        }
        this.barInfoNode.active = true;
        this.lblFreeTime.node.active = true;
        this.lblNum.string = "";
        this.noSpaceNode.active = !GameManager_1.gm.data.mapCell_data.getMapHaveSpece();
        this.noBarrelNode.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && GameManager_1.gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !GameManager_1.gm.data.mapCell_data.isGuide;
        this.refreshBarrelNum();
    };
    BarrelMgr.prototype.playAnimEnd = function (type, state) {
        if ("btnBuySuol_open" == state.name) {
            this.node.getComponent(cc.Animation).play("btnBuySuol_normal");
        }
        else if ("btnBuySuol_close" == state.name) {
            this._soulID = 0;
        }
    };
    BarrelMgr.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.off("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.off("refresh_barrel_num", this.refreshBarrelNum, this);
        GameManager_1.gm.ui.off("hide_barrel_ui", this.on_item_not_move_hide, this);
        GameManager_1.gm.ui.off("show_hand_anim", this.showHandAnim, this);
    };
    BarrelMgr.prototype.refreshPanel = function () {
        this._reciveTime = 0;
        if (this._reciveTime < GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
            GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
        }
        this.lblNum.string = "";
        this.noSpaceNode.active = !GameManager_1.gm.data.mapCell_data.getMapHaveSpece();
        this.noBarrelNode.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && GameManager_1.gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !GameManager_1.gm.data.mapCell_data.isGuide;
        this.showBarrelInfo();
    };
    BarrelMgr.prototype.update = function (time) {
        if (0 < this._reciveTime) {
            this._timeContainer += time;
            if (1 <= this._timeContainer) {
                --this._timeContainer;
                this.showReciveTime();
            }
        }
    };
    BarrelMgr.prototype.showReciveTime = function () {
        var _a;
        this._reciveTime--;
        if (this._reciveTime <= 0) {
            this.lblFreeTime.string = "";
            this._reciveTime = 0;
            if (this._reciveTime < GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
                this._reciveTime = GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
            }
            if (0 < GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum) {
                if ((_a = this.saleNode) === null || _a === void 0 ? void 0 : _a.active) {
                    this.barInfoNode.active = false;
                }
                else {
                    this.barInfoNode.active = true;
                }
                this.lblNum.node.active = true;
                this.lblNum.string = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum + "/" + Math.max(GameManager_1.gm.data.mapCell_data.roleBarrelData.maxBarrelNum, 40);
                this.barWidth.width = Math.min(GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum / GameManager_1.gm.data.mapCell_data.roleBarrelData.maxBarrelNum * 125, 125);
            }
            else {
                this.lblNum.node.active = false;
                this.barInfoNode.active = false;
            }
        }
        else {
            this.lblFreeTime.string = Utils_1.Utils.format_time_miunte(this._reciveTime) + "后获得" + GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelNum + "个桶";
        }
    };
    BarrelMgr.prototype.on_move_item_move = function (event, _item, _id) {
        var _a, _b;
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            var cfgByID = GameManager_1.gm.data.config_data.getItemCfgByID(_id);
            if (_item == Constants_1.ItemTypeEnum.ITEM_TYPE && cfgByID && cfgByID.type == Constants_1.PropTypeEnum.SOUL_TYPE && !((_a = this.saleNode) === null || _a === void 0 ? void 0 : _a.active)) {
                this.saleNode.active = true;
                this._soulID = cfgByID.id;
                this.barInfoNode.active = false;
                this.lblFreeTime.node.active = false;
                this.lblTips.string = cfgByID.lv < 3 ? "绿魂以上\n可召唤" : "召唤英雄\n雕像";
                this.node.getComponent(cc.Animation).play("btnBuySuol_open");
                return;
            }
            if (!((_b = this.saleNode) === null || _b === void 0 ? void 0 : _b.active) || _item == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                this.saleNode.active = true;
                this.barInfoNode.active = false;
                this.lblFreeTime.node.active = false;
                if (_item == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                    var cfgByID_1 = GameManager_1.gm.data.config_data.getItemCfgByID(_id);
                    if (cfgByID_1) {
                        this.lblSaleNum.string = cfgByID_1.price.toString();
                    }
                }
                else if (_item == Constants_1.ItemTypeEnum.HERO_TYPE) {
                    var cfgByID_2 = GameManager_1.gm.data.config_data.getHeroCfgByID(_id);
                    if (cfgByID_2) {
                        this.lblSaleNum.string = cfgByID_2.price.toString();
                    }
                }
            }
        }
    };
    BarrelMgr.prototype.on_move_item_hide = function (event, cellID) {
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            this.saleNode.active = false;
            this.barInfoNode.active = true;
            this.lblFreeTime.node.active = true;
            if (this.node._hitTest(event)) { // ???????
                if (0 < this._soulID) {
                    var cfgByID = GameManager_1.gm.data.config_data.getItemCfgByID(this._soulID);
                    if (cfgByID && 0 < cfgByID.price) {
                        GameManager_1.gm.data.mapCell_data.randomStoneHero(cellID, cfgByID.price, GameManager_1.gm.const.heroRandomList[cfgByID.lv]);
                        GameManager_1.gm.ui.emit("item_children_refresh", cellID);
                    }
                }
                else {
                    if (GameManager_1.gm.data.mapCell_data.role_map_data[cellID].itemType == Constants_1.ItemTypeEnum.BUILD_TYPE)
                        return;
                    var itemId = GameManager_1.gm.data.mapCell_data.role_map_data[cellID].itemID;
                    GameManager_1.gm.data.mapCell_data.delSingleSuperHeroCellID(itemId, cellID);
                    GameManager_1.gm.data.mapCell_data.delCellItemByCellID(cellID);
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, parseInt(this.lblSaleNum.string));
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO), parseInt(this.lblSaleNum.string));
                    if (30000 < itemId) {
                        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(itemId);
                        if (heroConfig && 11 == heroConfig.occupation) {
                            GameManager_1.gm.ui.emit("build_show_towerBuff");
                        }
                    }
                    GameManager_1.gm.ui.emit("item_children_refresh", cellID);
                }
                this.noSpaceNode.active = !GameManager_1.gm.data.mapCell_data.getMapHaveSpece();
            }
            if (0 < this._soulID) {
                this.node.getComponent(cc.Animation).play("btnBuySuol_close");
                this.barInfoNode.active = true;
                this.lblFreeTime.node.active = true;
                this._soulID = 0;
            }
        }
    };
    BarrelMgr.prototype.on_item_not_move_hide = function () {
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            this.saleNode.active = false;
            this.barInfoNode.active = true;
            this.lblFreeTime.node.active = true;
            if (0 < this._soulID) {
                this.node.getComponent(cc.Animation).play("btnBuySuol_close");
                this.barInfoNode.active = true;
                this.lblFreeTime.node.active = true;
                this._soulID = 0;
            }
        }
    };
    BarrelMgr.prototype.showHandAnim = function (active) {
        if (active === void 0) { active = true; }
        TempData_1.TempData.map_have_hand = active;
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            this.handAnim.active = active;
        }
    };
    BarrelMgr.prototype.refreshBarrelNum = function () {
        this.noSpaceNode.active = !GameManager_1.gm.data.mapCell_data.getMapHaveSpece();
        this.noBarrelNode.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && GameManager_1.gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !GameManager_1.gm.data.mapCell_data.isGuide;
        var barrelData = GameManager_1.gm.data.mapCell_data.roleBarrelData;
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            this.barInfoNode.active = false;
            this.lblFreeTime.node.active = false;
            this.lblNum.string = barrelData.curBarrelNum.toString();
            this.lblFreeTime.string = "";
            this.handAnim.active = false;
            if (!GameManager_1.gm.ui.newerGuideOp || !GameManager_1.gm.ui.newerGuideOp.node.active) {
                if (GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID === 8) {
                    if (barrelData.curBarrelNum <= 3 && barrelData.curBarrelNum > 0) {
                        this.handAnim.active = true;
                    }
                }
                else {
                    this.handAnim.active = barrelData.curBarrelNum > 0;
                }
            }
            return;
        }
        if (barrelData.curBarrelNum >= barrelData.maxBarrelNum) {
            this.lblFreeTime.string = "";
        }
        else {
            this._reciveTime = 0;
            if (this._reciveTime < GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
                this._reciveTime = GameManager_1.gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime - GameManager_1.gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime;
            }
        }
        this.barWidth.width = Math.min(barrelData.curBarrelNum / barrelData.maxBarrelNum * 125, 125);
        if (0 < GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum) {
            this.saleNode.active ? this.barInfoNode.active = false : this.barInfoNode.active = true;
            this.lblNum.node.active = true;
            this.lblNum.string = barrelData.curBarrelNum + "/" + Math.max(barrelData.maxBarrelNum, 40);
        }
        else {
            this.lblNum.node.active = false;
            this.barInfoNode.active = false;
        }
    };
    BarrelMgr.prototype.showBarrelInfo = function () {
        this.handAnim.active = false;
        var barrelData = GameManager_1.gm.data.mapCell_data.roleBarrelData;
        this.noBarrelNode.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && GameManager_1.gm.data.mapCell_data.isGuide;
        this.noBarrel2Node.active = GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0 && !GameManager_1.gm.data.mapCell_data.isGuide;
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            this.barInfoNode.active = false;
            this.lblFreeTime.node.active = false;
            this.lblNum.string = barrelData.curBarrelNum.toString();
            this.lblFreeTime.string = "";
            this.handAnim.active = false;
            if (!GameManager_1.gm.ui.newerGuideOp || !GameManager_1.gm.ui.newerGuideOp.node.active) {
                if (GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID === 8) {
                    if (barrelData.curBarrelNum <= 3 && barrelData.curBarrelNum > 0) {
                        this.handAnim.active = true;
                    }
                }
                else {
                    this.handAnim.active = barrelData.curBarrelNum > 0;
                }
            }
            return;
        }
        this._reciveTime = barrelData.nextFreeBarrelTime - Math.floor(Date.now() / 1000);
        this.noSpaceNode.active = !GameManager_1.gm.data.mapCell_data.getMapHaveSpece();
        this.barWidth.width = Math.min(barrelData.curBarrelNum / barrelData.maxBarrelNum * 125, 125);
        if (0 < barrelData.curBarrelNum) {
            this.saleNode.active ? this.barInfoNode.active = false : this.barInfoNode.active = true;
            this.lblNum.node.active = true;
            this.lblNum.string = barrelData.curBarrelNum + "/" + Math.max(barrelData.maxBarrelNum, 40);
        }
        else {
            this.lblNum.node.active = false;
            this.barInfoNode.active = false;
        }
        if (barrelData.curBarrelNum >= barrelData.maxBarrelNum) {
            this.lblFreeTime.string = "";
        }
    };
    BarrelMgr.prototype.onClickBuy = function () {
        var _this = this;
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            this.handAnim.active = false;
        }
        console.log("TTTT");
        this.node.getComponent(cc.Animation).play("btnBuy_button");
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_159_MUTONGLUODI), 0 < GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum) {
                GameManager_1.gm.data.mapCell_data.buyBarrelNumTimes++;
                GameManager_1.gm.data.mapCell_data.reduceBarrelNum();
                GameManager_1.gm.data.mapCell_data.addBarrelInMap();
                if (GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum <= 0) {
                    this.isCd = true;
                    this.unscheduleAllCallbacks();
                    this.scheduleOnce(function () {
                        _this.isCd = false;
                    }, 1);
                }
                if (GameManager_1.gm.data.mapCell_data.buyBarrelNumTimes <= 50) {
                    NetUtils_1.ReportData.instance.report_once_point(10200 + GameManager_1.gm.data.mapCell_data.buyBarrelNumTimes);
                }
                GameManager_1.gm.channel.report_event("buy_barrel", {
                    event_desc: "购买木桶",
                    buy_count: GameManager_1.gm.data.mapCell_data.buyBarrelNumTimes,
                    task_desc: cc.js.formatStr("购买木桶%d次", GameManager_1.gm.data.mapCell_data.buyBarrelNumTimes)
                });
            }
            else {
                if (GameManager_1.gm.data.mapCell_data.isGuide) {
                    GameManager_1.gm.ui.show_notice("Bạn có thể xem video và mua thùng khi hướng dẫn hoàn tất");
                    return;
                }
                if (this.isCd) {
                    GameManager_1.gm.ui.show_notice("Không đủ thùng!!!");
                    return;
                }
                GameManager_1.gm.channel.show_video_ad(function () {
                    GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times++;
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(40);
                    NetUtils_1.ReportData.instance.report_point(10301);
                    NetUtils_1.ReportData.instance.report_once_point(10302);
                    GameManager_1.gm.channel.report_event("video_buy_barrel", {
                        event_desc: "看视频购买木桶",
                        buy_count: GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times,
                        task_desc: cc.js.formatStr("购买木桶%d次", GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times)
                    });
                }, this);
            }
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
        this.showBarrelInfo();
    };
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "saleNode", void 0);
    __decorate([
        property(cc.Label)
    ], BarrelMgr.prototype, "lblSaleNum", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "noSpaceNode", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "noBarrelNode", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "noBarrel2Node", void 0);
    __decorate([
        property(cc.Label)
    ], BarrelMgr.prototype, "lblFreeTime", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "barWidth", void 0);
    __decorate([
        property(cc.Label)
    ], BarrelMgr.prototype, "lblNum", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "barInfoNode", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "handAnim", void 0);
    __decorate([
        property(cc.Node)
    ], BarrelMgr.prototype, "guideNode", void 0);
    __decorate([
        property(cc.Label)
    ], BarrelMgr.prototype, "lblTips", void 0);
    BarrelMgr = __decorate([
        ccclass
    ], BarrelMgr);
    return BarrelMgr;
}(GameModule_1.GameModule));
exports.default = BarrelMgr;

cc._RF.pop();