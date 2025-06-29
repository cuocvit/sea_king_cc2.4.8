
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BarrelMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJhcnJlbE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YsNkNBQW1DO0FBQ25DLDJDQUEwQztBQUMxQyxpQ0FBZ0M7QUFDaEMseUNBQXVGO0FBQ3ZGLHVDQUF3QztBQUN4Qyx1Q0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVU7SUFBakQ7UUFBQSxxRUFpWUM7UUEvWFcsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsZ0JBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxrQkFBWSxHQUFtQixJQUFJLENBQUM7UUFHcEMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLGlCQUFXLEdBQW9CLElBQUksQ0FBQztRQUdwQyxjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxZQUFNLEdBQW9CLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFHaEMsYUFBTyxHQUFvQixJQUFJLENBQUM7UUFFaEMsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixVQUFJLEdBQVksS0FBSyxDQUFDOztJQXlWbEMsQ0FBQztJQXRWYSw0QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElB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cmNlc0NvbnRlbnQiOlsiLy9cclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gJy4vR2FtZU1vZHVsZSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEl0ZW1UeXBlRW51bSwgU2V0SXRlbU51bUVudW0sIFJld2FyZElkRW51bSwgUHJvcFR5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi9OZXRVdGlscyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFycmVsTWdyIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc2FsZU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFNhbGVOdW06IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG5vU3BhY2VOb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG5vQmFycmVsTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub0JhcnJlbDJOb2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxGcmVlVGltZTogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFyV2lkdGg6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibE51bTogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFySW5mb05vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaGFuZEFuaW06IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBndWlkZU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFRpcHM6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZUNvbnRhaW5lcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3JlY2l2ZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9zb3VsSUQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGlzQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCB0aGlzLnBsYXlBbmltRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJ0bkJ1eV9vcGVuXCIpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaXRlbV9tb3ZlXCIsIHRoaXMub25fbW92ZV9pdGVtX21vdmUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaXRlbV9tb3ZlX2VuZFwiLCB0aGlzLm9uX21vdmVfaXRlbV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInJlZnJlc2hfYmFycmVsX251bVwiLCB0aGlzLnJlZnJlc2hCYXJyZWxOdW0sIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaGlkZV9iYXJyZWxfdWlcIiwgdGhpcy5vbl9pdGVtX25vdF9tb3ZlX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwic2hvd19oYW5kX2FuaW1cIiwgdGhpcy5zaG93SGFuZEFuaW0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gMDtcclxuICAgICAgICBjb25zdCBuZXh0RnJlZUJhcnJlbFRpbWUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlY2l2ZVRpbWUgPCBuZXh0RnJlZUJhcnJlbFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSAtIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm1heEJhcnJlbE51bSAtIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bTtcclxuICAgICAgICAgICAgY29uc3QgbmV3VmFsID0gTWF0aC5jZWlsKHZhbHVlIC8gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxOdW0pICogZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuZnJlZUJhcnJlbENkO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjaXZlVGltZSA+IG5ld1ZhbCkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyRnJlZUJhcnJlbFRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApICsgbmV3VmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYmxOdW0uc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLm5vU3BhY2VOb2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRNYXBIYXZlU3BlY2UoKTtcclxuICAgICAgICB0aGlzLm5vQmFycmVsTm9kZS5hY3RpdmUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPD0gMCAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlO1xyXG4gICAgICAgIHRoaXMubm9CYXJyZWwyTm9kZS5hY3RpdmUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPD0gMCAmJiAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hCYXJyZWxOdW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlBbmltRW5kKHR5cGU6IHN0cmluZywgc3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFwiYnRuQnV5U3VvbF9vcGVuXCIgPT0gc3RhdGUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJ0bkJ1eVN1b2xfbm9ybWFsXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXCJidG5CdXlTdW9sX2Nsb3NlXCIgPT0gc3RhdGUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VsSUQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm9mZihcIml0ZW1fbW92ZVwiLCB0aGlzLm9uX21vdmVfaXRlbV9tb3ZlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJpdGVtX21vdmVfZW5kXCIsIHRoaXMub25fbW92ZV9pdGVtX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcInJlZnJlc2hfYmFycmVsX251bVwiLCB0aGlzLnJlZnJlc2hCYXJyZWxOdW0sIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcImhpZGVfYmFycmVsX3VpXCIsIHRoaXMub25faXRlbV9ub3RfbW92ZV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJzaG93X2hhbmRfYW5pbVwiLCB0aGlzLnNob3dIYW5kQW5pbSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gMDtcclxuICAgICAgICBpZiAodGhpcy5fcmVjaXZlVGltZSA8IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgLSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGJsTnVtLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ub1NwYWNlTm9kZS5hY3RpdmUgPSAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TWFwSGF2ZVNwZWNlKCk7XHJcbiAgICAgICAgdGhpcy5ub0JhcnJlbE5vZGUuYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDw9IDAgJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZTtcclxuICAgICAgICB0aGlzLm5vQmFycmVsMk5vZGUuYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDw9IDAgJiYgIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGU7XHJcbiAgICAgICAgdGhpcy5zaG93QmFycmVsSW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUodGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKDAgPCB0aGlzLl9yZWNpdmVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDb250YWluZXIgKz0gdGltZTtcclxuICAgICAgICAgICAgaWYgKDEgPD0gdGhpcy5fdGltZUNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl90aW1lQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVjaXZlVGltZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1JlY2l2ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcmVjaXZlVGltZS0tO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZWNpdmVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY2l2ZVRpbWUgPCBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgLSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKDAgPCBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhbGVOb2RlPy5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibE51bS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibE51bS5zdHJpbmcgPSBgJHtnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW19LyR7TWF0aC5tYXgoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtLCA0MCl9YDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFyV2lkdGgud2lkdGggPSBNYXRoLm1pbihnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gLyBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0gKiAxMjUsIDEyNSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibE51bS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJJbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsRnJlZVRpbWUuc3RyaW5nID0gVXRpbHMuZm9ybWF0X3RpbWVfbWl1bnRlKHRoaXMuX3JlY2l2ZVRpbWUpICsgXCLlkI7ojrflvpdcIiArIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsTnVtICsgXCLkuKrmobZcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9tb3ZlX2l0ZW1fbW92ZShldmVudDogY2MuVmVjMiwgX2l0ZW06IEl0ZW1UeXBlRW51bSwgX2lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgbGV0IGNmZ0J5SUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKF9pZCk7XHJcbiAgICAgICAgICAgIGlmIChfaXRlbSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmIGNmZ0J5SUQgJiYgY2ZnQnlJRC50eXBlID09IFByb3BUeXBlRW51bS5TT1VMX1RZUEUgJiYgIXRoaXMuc2FsZU5vZGU/LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYWxlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bElEID0gY2ZnQnlJRC5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFySW5mb05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibEZyZWVUaW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibFRpcHMuc3RyaW5nID0gY2ZnQnlJRC5sdiA8IDMgPyBcIue7v+mtguS7peS4ilxcbuWPr+WPrOWUpFwiIDogXCLlj6zllKToi7Hpm4RcXG7pm5Xlg49cIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiYnRuQnV5U3VvbF9vcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2FsZU5vZGU/LmFjdGl2ZSB8fCBfaXRlbSA9PSBJdGVtVHlwZUVudW0uQlVJTERfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYWxlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJJbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGJsRnJlZVRpbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2l0ZW0gPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNmZ0J5SUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNmZ0J5SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxTYWxlTnVtLnN0cmluZyA9IGNmZ0J5SUQucHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9pdGVtID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZmdCeUlEID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZmdCeUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGJsU2FsZU51bS5zdHJpbmcgPSBjZmdCeUlELnByaWNlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fbW92ZV9pdGVtX2hpZGUoZXZlbnQ6IGNjLlZlYzIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7IC8vIHQ6IGFueSwgZTogbnVtYmVyXHJcbiAgICAgICAgaWYgKCFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2FsZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmFySW5mb05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLl9oaXRUZXN0KGV2ZW50KSkgeyAvLyA/Pz8/Pz8/XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA8IHRoaXMuX3NvdWxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNmZ0J5SUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuX3NvdWxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNmZ0J5SUQgJiYgMCA8IGNmZ0J5SUQucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucmFuZG9tU3RvbmVIZXJvKGNlbGxJRCwgY2ZnQnlJRC5wcmljZSwgZ20uY29uc3QuaGVyb1JhbmRvbUxpc3RbY2ZnQnlJRC5sdl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5CVUlMRF9UWVBFKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuZGVsU2luZ2xlU3VwZXJIZXJvQ2VsbElEKGl0ZW1JZCwgY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5kZWxDZWxsSXRlbUJ5Q2VsbElEKGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgcGFyc2VJbnQodGhpcy5sYmxTYWxlTnVtLnN0cmluZykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoUmV3YXJkSWRFbnVtLkdPTEQsIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSwgcGFyc2VJbnQodGhpcy5sYmxTYWxlTnVtLnN0cmluZykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoMzAwMDAgPCBpdGVtSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaXRlbUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9Db25maWcgJiYgMTEgPT0gaGVyb0NvbmZpZy5vY2N1cGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfc2hvd190b3dlckJ1ZmZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub1NwYWNlTm9kZS5hY3RpdmUgPSAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TWFwSGF2ZVNwZWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKDAgPCB0aGlzLl9zb3VsSUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiYnRuQnV5U3VvbF9jbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFySW5mb05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGJsRnJlZVRpbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bElEID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2l0ZW1fbm90X21vdmVfaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zYWxlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iYXJJbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxibEZyZWVUaW1lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICgwIDwgdGhpcy5fc291bElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJ0bkJ1eVN1b2xfY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxibEZyZWVUaW1lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvdWxJRCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93SGFuZEFuaW0oYWN0aXZlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIFRlbXBEYXRhLm1hcF9oYXZlX2hhbmQgPSBhY3RpdmU7XHJcbiAgICAgICAgaWYgKCFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hCYXJyZWxOdW0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub1NwYWNlTm9kZS5hY3RpdmUgPSAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0TWFwSGF2ZVNwZWNlKCk7XHJcbiAgICAgICAgdGhpcy5ub0JhcnJlbE5vZGUuYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDw9IDAgJiYgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZTtcclxuICAgICAgICB0aGlzLm5vQmFycmVsMk5vZGUuYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDw9IDAgJiYgIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhcnJlbERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJJbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxibE51bS5zdHJpbmcgPSBiYXJyZWxEYXRhLmN1ckJhcnJlbE51bS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmxibEZyZWVUaW1lLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdtLnVpLm5ld2VyR3VpZGVPcCB8fCAhZ20udWkubmV3ZXJHdWlkZU9wLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXJyZWxEYXRhLmN1ckJhcnJlbE51bSA8PSAzICYmIGJhcnJlbERhdGEuY3VyQmFycmVsTnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IGJhcnJlbERhdGEuY3VyQmFycmVsTnVtID4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPj0gYmFycmVsRGF0YS5tYXhCYXJyZWxOdW0pIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY2l2ZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjaXZlVGltZSA8IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjaXZlVGltZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSAtIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJhcldpZHRoLndpZHRoID0gTWF0aC5taW4oYmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gLyBiYXJyZWxEYXRhLm1heEJhcnJlbE51bSAqIDEyNSwgMTI1KTtcclxuXHJcbiAgICAgICAgaWYgKDAgPCBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0pIHtcclxuICAgICAgICAgICAgdGhpcy5zYWxlTm9kZS5hY3RpdmUgPyB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IGZhbHNlIDogdGhpcy5iYXJJbmZvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxibE51bS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGJsTnVtLnN0cmluZyA9IGAke2JhcnJlbERhdGEuY3VyQmFycmVsTnVtfS8ke01hdGgubWF4KGJhcnJlbERhdGEubWF4QmFycmVsTnVtLCA0MCl9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxibE51bS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dCYXJyZWxJbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgYmFycmVsRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhO1xyXG5cclxuICAgICAgICB0aGlzLm5vQmFycmVsTm9kZS5hY3RpdmUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPD0gMCAmJiBnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlO1xyXG4gICAgICAgIHRoaXMubm9CYXJyZWwyTm9kZS5hY3RpdmUgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPD0gMCAmJiAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZTtcclxuXHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJJbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxibE51bS5zdHJpbmcgPSBiYXJyZWxEYXRhLmN1ckJhcnJlbE51bS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmxibEZyZWVUaW1lLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdtLnVpLm5ld2VyR3VpZGVPcCB8fCAhZ20udWkubmV3ZXJHdWlkZU9wLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXJyZWxEYXRhLmN1ckJhcnJlbE51bSA8PSAzICYmIGJhcnJlbERhdGEuY3VyQmFycmVsTnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IGJhcnJlbERhdGEuY3VyQmFycmVsTnVtID4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZWNpdmVUaW1lID0gYmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgLSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLm5vU3BhY2VOb2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRNYXBIYXZlU3BlY2UoKTtcclxuICAgICAgICB0aGlzLmJhcldpZHRoLndpZHRoID0gTWF0aC5taW4oYmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gLyBiYXJyZWxEYXRhLm1heEJhcnJlbE51bSAqIDEyNSwgMTI1KTtcclxuXHJcbiAgICAgICAgaWYgKDAgPCBiYXJyZWxEYXRhLmN1ckJhcnJlbE51bSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhbGVOb2RlLmFjdGl2ZSA/IHRoaXMuYmFySW5mb05vZGUuYWN0aXZlID0gZmFsc2UgOiB0aGlzLmJhckluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGJsTnVtLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYmxOdW0uc3RyaW5nID0gYCR7YmFycmVsRGF0YS5jdXJCYXJyZWxOdW19LyR7TWF0aC5tYXgoYmFycmVsRGF0YS5tYXhCYXJyZWxOdW0sIDQwKX1gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGJsTnVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmFySW5mb05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPj0gYmFycmVsRGF0YS5tYXhCYXJyZWxOdW0pIHtcclxuICAgICAgICAgICAgdGhpcy5sYmxGcmVlVGltZS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DbGlja0J1eSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRUVFRcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJidG5CdXlfYnV0dG9uXCIpO1xyXG5cclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SXNIYXZlU3BlY2VDZWxsSUQoKSkge1xyXG4gICAgICAgICAgICBpZiAoZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTU5X01VVE9OR0xVT0RJKSwgMCA8IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnV5QmFycmVsTnVtVGltZXMrKztcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJlZHVjZUJhcnJlbE51bSgpO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkQmFycmVsSW5NYXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1eUJhcnJlbE51bVRpbWVzIDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDIwMCArIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1eUJhcnJlbE51bVRpbWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcImJ1eV9iYXJyZWxcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi6LSt5Lmw5pyo5qG2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYnV5X2NvdW50OiBnbS5kYXRhLm1hcENlbGxfZGF0YS5idXlCYXJyZWxOdW1UaW1lcyxcclxuICAgICAgICAgICAgICAgICAgICB0YXNrX2Rlc2M6IGNjLmpzLmZvcm1hdFN0cihcIui0reS5sOacqOahtiVk5qyhXCIsIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1eUJhcnJlbE51bVRpbWVzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiQuG6oW4gY8OzIHRo4buDIHhlbSB2aWRlbyB2w6AgbXVhIHRow7luZyBraGkgaMaw4bubbmcgZOG6q24gaG/DoG4gdOG6pXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIktow7RuZyDEkeG7pyB0aMO5bmchISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0Y2hfYWRfYnV5X2JhcnJlbF90aW1lcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bSg0MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTAzMDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTAzMDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwidmlkZW9fYnV5X2JhcnJlbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi55yL6KeG6aKR6LSt5Lmw5pyo5qG2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1eV9jb3VudDogZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0Y2hfYWRfYnV5X2JhcnJlbF90aW1lcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza19kZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCLotK3kubDmnKjmobYlZOasoVwiLCBnbS5kYXRhLm1hcENlbGxfZGF0YS53YXRjaF9hZF9idXlfYmFycmVsX3RpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X2F1dG9fbWVyZ2VfbWVzc2FnZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93QmFycmVsSW5mbygpO1xyXG4gICAgfVxyXG59Il19