
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MainMapUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a3e73Yghy5H/abE1fyVeiNF', 'MainMapUI');
// start-scene/scripts/MainMapUI.ts

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
var GameManager_1 = require("./GameManager");
var GameModule_1 = require("./GameModule");
var MvcEventDispatcher_1 = require("./MvcEventDispatcher");
var Constants_1 = require("./Constants");
var TaskEntry_1 = require("./TaskEntry");
var TaskMainEntry_1 = require("./TaskMainEntry");
var DataEvent_1 = require("./DataEvent");
var AutoCompose_1 = require("./AutoCompose");
var TaskData_1 = require("./TaskData");
var NodePoolItem_1 = require("./NodePoolItem");
var LadderEntry_1 = require("./LadderEntry");
var TempData_1 = require("./TempData");
var SignEntry_1 = require("./SignEntry");
var MailEntry_1 = require("./MailEntry");
var GuideGiftEntry_1 = require("./GuideGiftEntry");
var AddDesktopEntry_1 = require("./AddDesktopEntry");
var MapCellCfgData_1 = require("./MapCellCfgData");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var WaterBarrelItem_1 = require("./WaterBarrelItem");
var HandAnim_1 = require("./HandAnim");
var MoreEntry_1 = require("./MoreEntry");
var MapBuildUpgrade_1 = require("./MapBuildUpgrade");
//
var SpecialGift_1 = require("./SpecialGift");
var ShowGift_1 = require("./ShowGift");
var ShipMgr_1 = require("./ShipMgr");
var LockCloudArea_1 = require("./LockCloudArea");
var BarrelMgr_1 = require("./BarrelMgr");
var MainMapItem_1 = require("./MainMapItem");
var BuildIconItem_1 = require("./BuildIconItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainMapUI = /** @class */ (function (_super) {
    __extends(MainMapUI, _super);
    function MainMapUI() {
        var _this = _super.call(this) || this;
        _this.mapContent = null;
        _this.mapItemPrefab = null;
        _this.task_node = null;
        _this.task_main_node = null;
        _this.ladder_node = null;
        _this.sign_node = null;
        _this.guide_gift_node = null;
        _this.vip_node = null;
        _this.super_recruit_node = null;
        _this.lucky_wheel_node = null;
        _this.record_node = null;
        _this.more_node = null;
        _this.shop_node = null;
        _this.mail_node = null;
        _this.add_desktop_node = null;
        _this.nextCompTimes = null;
        _this.propItemPrefab = null;
        _this.buildItemPrefab = null;
        _this.caseOceanNode = null;
        _this.moveItemNode = null;
        _this.roleBuildUpgrade = null;
        _this.barrelNode = null;
        _this.ship = null;
        _this.roleGuideBuildUpgrade = null;
        _this.roleGuideBuildUpgradeBg = null;
        _this.roleGuideUpgradeBtn = null;
        _this.barrelParentNode = null;
        _this.roleGuideBuildMertrailNode = null;
        _this.buildUpAnim = null;
        _this.mask = null;
        _this.composeAnim = null;
        _this.diamond_icon_node = null;
        _this.gold_icon_node = null;
        _this.handAnim = null;
        _this.roleBuildAnimNode = null;
        _this.mapUI = null;
        _this.treeLock = null;
        _this.cavesLock = null;
        _this.red_btn_book = null;
        _this.giftBar = null;
        _this.specialGiftBar = null;
        _this.lockAreaCloudList = null;
        _this.autoCompose = null;
        _this._mapCfgList = [];
        _this._row = 20;
        _this._col = 22;
        _this._mapDataList = [];
        _this._widthHalf = 60;
        _this._heightHalf = 95;
        _this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        _this._touch_position = cc.Vec2.ZERO;
        _this.isShowSign = false;
        _this.isfightEnd = false;
        _this.moveToPos = new cc.Vec2(0, 0);
        _this.isMoving = false;
        _this.followSpeed = 200;
        _this._map_size = new cc.Vec2(1500, 1500);
        _this.delayTime = 0;
        _this.curTimer = 0;
        _this.isBeginDelayTime = false;
        _this.guideID = 0;
        _this.guideScaleNode = null;
        _this._nextOpenCell = null;
        _this._buildID = 0;
        _this._buildMeatril = [];
        _this._isLockMoveMap = false;
        return _this;
    }
    MainMapUI.prototype.getBuildUpgradeCb = function (t) {
        var _a;
        var buildData = GameManager_1.gm.data.mapCell_data.buildData[t.data];
        MvcEventDispatcher_1.MvcEventDispatcher.dispatchEvent(DataEvent_1.DataEvent.GUIDENEWERGUIDE, new DataEvent_1.DataEvent(DataEvent_1.DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS_SUC, (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName(buildData.cellID.toString()).getComponent(MainMapItem_1.default).mapBuildNode.children[0].getComponent(BuildIconItem_1.default).buildStateIcon.node, this.showBuildUpgrade.bind(this, buildData.buildID, buildData.cellID)));
    };
    MainMapUI.prototype.getBarrelCb = function () {
        MvcEventDispatcher_1.MvcEventDispatcher.dispatchEvent(DataEvent_1.DataEvent.GUIDENEWERGUIDE, new DataEvent_1.DataEvent(DataEvent_1.DataEvent.GUIDE_CLICK_BARREL_POS_SUC, this.barrelNode.getComponent(BarrelMgr_1.default).guideNode, this.barrelNode
            .getComponent(BarrelMgr_1.default)
            .onClickBuy.bind(this.barrelNode.getComponent(BarrelMgr_1.default))));
    };
    MainMapUI.prototype.getBuildUpCb = function () {
        MvcEventDispatcher_1.MvcEventDispatcher.dispatchEvent(DataEvent_1.DataEvent.GUIDENEWERGUIDE, new DataEvent_1.DataEvent(DataEvent_1.DataEvent.GUIDE_CLICK_BUILD_UP_POS_SUC, this.roleGuideBuildUpgrade.children[1].children[2], this.onClickGuideUplvl.bind(this)));
    };
    MainMapUI.prototype.guideDelItem = function (num) {
        var _a;
        var itemNode = (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName(num.toString());
        if (itemNode) {
            itemNode.getComponent(MainMapItem_1.default).delItemNode();
        }
    };
    MainMapUI.prototype.getClickGoFightCb = function () {
        var _a, _b;
        MvcEventDispatcher_1.MvcEventDispatcher.dispatchEvent(DataEvent_1.DataEvent.GUIDENEWERGUIDE, new DataEvent_1.DataEvent(DataEvent_1.DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS_SUC, (_a = this.ship) === null || _a === void 0 ? void 0 : _a.children[0].children[0].getChildByName("fightBtn").children[1], (_b = this.ship) === null || _b === void 0 ? void 0 : _b.children[0].getComponent(ShipMgr_1.default).onClickShip.bind(this.ship.children[0].getComponent(ShipMgr_1.default), null, 1)));
    };
    MainMapUI.prototype.revenge = function (key) {
        var shipComponent = this.ship.children[0].getComponent(ShipMgr_1.default);
        if (shipComponent) {
            shipComponent.revenge(key);
        }
    };
    MainMapUI.prototype.putAllItemToMapAuto = function () {
        var itemsToPut = GameManager_1.gm.data.mapCell_data.putAllItemToMapCell();
        for (; 0 < GameManager_1.gm.data.mapCell_data._needRefreshCellList.length;) {
            var e = GameManager_1.gm.data.mapCell_data._needRefreshCellList.shift();
            GameManager_1.gm.ui.emit("item_children_refresh", e);
        }
        if (0 < this.ship.childrenCount &&
            this.ship.children[0].getComponent(ShipMgr_1.default)) {
            this.ship.children[0].getComponent(ShipMgr_1.default).refreshItem();
        }
        for (var a = 0; a < itemsToPut.length; a++) {
            GameManager_1.gm.ui.emit("set_new_item_alpha", itemsToPut[a]);
        }
    };
    MainMapUI.prototype.showGiftBar = function (itemId, cellId) {
        var _a, _b;
        var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemId);
        if (!itemConfig)
            return;
        if (itemConfig.type == 13 ||
            itemConfig.type == 14 ||
            itemConfig.type == 19) {
            this.specialGiftBar.scale = 1 - 0.5 * (this.mapContent.scale - 1);
            if ((_a = this.specialGiftBar) === null || _a === void 0 ? void 0 : _a.active) {
                this.specialGiftBar.active = false;
            }
            this.specialGiftBar
                .getComponent(SpecialGift_1.default)
                .initData(itemId, cellId);
            this.specialGiftBar.active = true;
        }
        else {
            this.giftBar.scale = 1 - 0.5 * (this.mapContent.scale - 1);
            if ((_b = this.giftBar) === null || _b === void 0 ? void 0 : _b.active) {
                this.giftBar.active = false;
            }
            this.giftBar.getComponent(ShowGift_1.default).initData(itemId, cellId);
            this.giftBar.active = true;
        }
    };
    MainMapUI.prototype.getCookie = function (name) {
        var cookies = document.cookie.split("; ");
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var cookie = cookies_1[_i];
            var _a = cookie.split("="), key = _a[0], value = _a[1];
            if (key === name)
                return value;
        }
        return null;
    };
    MainMapUI.prototype.deleteCookie = function (name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    };
    MainMapUI.prototype.checkPaymentStatus = function () {
        var storedPrice = localStorage.getItem("reward_price");
        var paymentStatus = this.getCookie("payment_status");
        if (paymentStatus === "success" && storedPrice) {
            console.log("Thanh toán thành công!!!!!");
            this.deleteCookie("payment_status");
            var parsedData = JSON.parse(storedPrice);
            localStorage.setItem("reward_price", null);
            console.log(parsedData);
            NetUtils_1.ReportData.instance.report_once_point(10833);
            var data = parsedData;
            var rewardIds = [];
            var rewardNums = [];
            var multiplier = 1;
            for (var i = 0; i < data.reward_array.length; i++) {
                var reward = data.reward_array[i];
                rewardIds.push(reward.reward_id);
                rewardNums.push(reward.reward_num * multiplier);
                if (reward.reward_id >= 23001 && reward.reward_id <= 23099) {
                    GameManager_1.gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
                }
                else if (reward.reward_id == Constants_1.RewardIdEnum.GOLD) {
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num * multiplier);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (reward.reward_id == Constants_1.RewardIdEnum.DIAMOND) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num * multiplier);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (reward.reward_id == Constants_1.RewardIdEnum.BARREL) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(reward.reward_num * multiplier);
                }
                else {
                    var itemIds = [];
                    for (var j = 0; j < reward.reward_num * multiplier; j++) {
                        itemIds.push(reward.reward_id);
                    }
                    GameManager_1.gm.data.mapCell_data.addWareHouseList(itemIds);
                }
            }
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                idList: rewardIds,
                numList: rewardNums,
            });
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            data.state = multiplier == 1 ? 2 : 3;
            GameManager_1.gm.data.sign_data.sign_state = data.state;
            GameManager_1.gm.data.sign_data.async_write_data();
        }
    };
    MainMapUI.prototype.onLoad = function () {
        var _this = this;
        this._mapCfgList = GameManager_1.gm.data.config_data.getMapCellCfg();
        this.initMap();
        this.checkPaymentStatus();
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            this.popup_offline_op(function () {
                _this.popup_sign(function () {
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Mail);
                });
            });
        }
    };
    MainMapUI.prototype.popup_sign = function (callback) {
        var _this = this;
        this.isShowSign = 0 == GameManager_1.gm.data.sign_data.sign_state;
        if (this.isShowSign) {
            this.isShowSign = false;
            var call_1 = function (param) {
                if (param == GameManager_1.gm.ui.sign) {
                    GameManager_1.gm.ui.off(GameManager_1.gm.ui.MODULE_HIDE, call_1, _this);
                    callback();
                }
            };
            GameManager_1.gm.ui.on(GameManager_1.gm.ui.MODULE_HIDE, call_1, this);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Sign);
        }
        else {
            callback();
        }
    };
    MainMapUI.prototype.popup_offline_op = function (callback) {
        var _this = this;
        if (TempData_1.TempData.isShowOffline) {
            TempData_1.TempData.isShowOffline = false;
            var call_2 = function (param) {
                if (param == GameManager_1.gm.ui.offline_op) {
                    GameManager_1.gm.ui.off(GameManager_1.gm.ui.MODULE_HIDE, call_2, _this);
                    callback();
                }
            };
            GameManager_1.gm.ui.on(GameManager_1.gm.ui.MODULE_HIDE, call_2, this);
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.OFFLINEOP);
        }
        else {
            callback();
        }
    };
    MainMapUI.prototype.addListener = function () {
        var _this = this;
        var _a;
        var self = this;
        GameManager_1.gm.ui.on("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.on("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.on("item_children_refresh", this.on_move_item_refresh, this);
        GameManager_1.gm.ui.on("item_unlock_refresh", this.on_item_unlock_refresh, this);
        GameManager_1.gm.ui.on("compostimeChange", this.showNextCellNode, this);
        GameManager_1.gm.ui.on("unLockNewArea", this.unLockNewArea, this);
        GameManager_1.gm.ui.on("build_upgrade", this.refreshBuildItem, this);
        GameManager_1.gm.ui.on("item_compose_time_change", this.composeTimesChange, this);
        GameManager_1.gm.ui.on("build_metarail_change", this.showBuildMertarilFull, this);
        GameManager_1.gm.ui.on("guide_del_item", this.guideDelItem, this);
        GameManager_1.gm.ui.on("bookRedStatus", this.refreshRedBtnBook, this);
        GameManager_1.gm.ui.on("ship_goods_change", this.putAllItemToMapAuto, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS, this.getBuildUpgradeCb, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BARREL_POS, this.getBarrelCb, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BUILD_UP_POS, this.getBuildUpCb, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).addEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS, this.getClickGoFightCb, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            self.roleBuildUpgrade.active = false;
            self.setMapUiShow(true);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var _a, _b;
            if (!GameManager_1.gm.data.mapCell_data.isGuide) {
                if (event.getTouches().length >= 2) {
                    var touch1 = event.getTouches()[0];
                    var touch2 = event.getTouches()[1];
                    var delta1 = touch1.getDelta();
                    var delta2 = touch2.getDelta();
                    var pos1 = touch1.getLocation();
                    var pos2 = touch2.getLocation();
                    var midPoint = cc.v3(pos1.add(pos2).multiplyScalar(0.5));
                    var mapPoint = (_a = self.mapContent) === null || _a === void 0 ? void 0 : _a.convertToNodeSpaceAR(midPoint);
                    var distance = pos1.sub(pos2);
                    var delta = delta1.sub(delta2);
                    var scale = 1;
                    if (Math.abs(distance.x) > Math.abs(distance.y)) {
                        scale =
                            ((distance.x + delta.x) / distance.x) *
                                self.mapContent.scale;
                    }
                    else {
                        scale =
                            ((distance.y + delta.y) / distance.y) *
                                self.mapContent.scale;
                    }
                    if (scale < 1) {
                        scale = 1;
                    }
                    else if (scale > 2) {
                        scale = 2;
                    }
                    var scaleDiff = scale - self.mapContent.scale;
                    self.mapContent.scale = scale;
                    var newPos = mapPoint.multiplyScalar(scaleDiff);
                    self.mapContent.position = (_b = self.mapContent) === null || _b === void 0 ? void 0 : _b.position.sub(newPos);
                    self.treeLock.scale =
                        1 - 0.5 * (self.mapContent.scale - 1);
                    self.cavesLock.scale =
                        1 - 0.5 * (self.mapContent.scale - 1);
                    return;
                }
                else {
                    if (!self._isLockMoveMap) {
                        self.mapContent.x += event.getDelta().x;
                        self.mapContent.y += event.getDelta().y;
                    }
                }
            }
        }, this);
        this.node._touchListener.setSwallowTouches(false);
        (_a = this.buildUpAnim) === null || _a === void 0 ? void 0 : _a.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
            var _a;
            GameManager_1.gm.ui.emit("build_upgrade");
            var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(_this._buildID);
            if (buildCfg) {
                var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildCfg.buildType);
                if (buildData) {
                    _this.buildUpAnim.active = false;
                    if (buildCfg.buildType ==
                        Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                        _this.ship.opacity = 255;
                    }
                    else {
                        (_a = _this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName(buildData.cellID.toString()).getComponent(MainMapItem_1.default).setBuildImgOpacity(255);
                    }
                    _this.lockSenceMoveMap(116, 1.5);
                }
            }
        }, this);
    };
    MainMapUI.prototype.initMapUI = function () {
        this.composeAnim.active = false;
        this.handAnim.active = false;
        this.moveItemNode.active = false;
        this.roleBuildUpgrade.active = false;
        this.roleGuideBuildUpgrade.active = false;
        this.buildUpAnim.active = false;
        this.mask.active = false;
        this.handAnim.active = false;
        this.mapContent.scale = 1;
        this.mapContent.position = cc.v3(-94, 490, 0);
    };
    MainMapUI.prototype.onEnable = function () {
        var _this = this;
        this.isfightEnd = false;
        this.addListener();
        this.initMapUI();
        this.showUnComposeCell();
        this.setBarrelNodeActive();
        this.initShip();
        this.lockMainUI();
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        if (fightTempData.fight_result_data &&
            fightTempData.fight_result_data.result > 0) {
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.ATTACK_ISLAND);
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_19_FIGHT_RETURN);
            GameManager_1.gm.audio.play_music(GameManager_1.gm.const.AUDIO_91_MAIN_MUSIC);
            for (var a = 0; a <
                fightTempData.fight_result_data.alive_hero_data_array.length; a++) {
                GameManager_1.gm.data.mapCell_data.checkIsPlayItemSound(fightTempData.fight_result_data.alive_hero_data_array[a].id);
            }
            this.isfightEnd = true;
        }
        this.lockAreaCloud();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            if (1 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID ||
                2 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID ||
                (6 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID &&
                    GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd)) {
                _this.randomShowCase();
            }
            if (_this.isfightEnd) {
                GameManager_1.gm.ui.emit("ship_play_anim", 2);
                if (13 != GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID ||
                    !GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd) {
                    TempData_1.TempData.setRoleGuideDataEnd();
                    GameManager_1.gm.data.mapCell_data.setRoleGuideData(15, 0);
                    GameManager_1.gm.ui.mapMainUI.checkGuideIsShow();
                }
            }
            if (15 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                GameManager_1.gm.ui.mapMainUI.checkGuideIsShow();
            }
            _this.lockSenceMoveMap(116, 1.5, _this.initMapPosSucc, _this);
        }, 2);
        this.show_task_entry();
        this.show_task_main_entry();
        this.show_ladder_entry();
        this.show_sign_entry();
        this.show_super_recruit_node_entry();
        this.show_lucky_wheel_node_entry();
        this.show_record_entry();
        this.show_more_entry();
        this.show_shop_entry();
        this.show_mail_entry();
        this.show_guide_gift_entry();
        this.add_desktop_node.active = false;
        GameManager_1.gm.channel.checkShortcut(function (num) {
            if (num >= 2) {
                _this.show_add_desktop_entry();
            }
        });
        this.refreshRedBtnBook();
        // this.autoCompose.autoAnim.node.active = !gm.data.mapCell_data.isGuide; // cũ là this.autoCompose.active
        this.autoCompose.node.active = !GameManager_1.gm.data.mapCell_data.isGuide;
        GameManager_1.gm.audio.play_music(GameManager_1.gm.const.AUDIO_91_MAIN_MUSIC);
    };
    MainMapUI.prototype.onDisable = function () {
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS, this.getBuildUpgradeCb, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BARREL_POS, this.getBarrelCb, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BUILD_UP_POS, this.getBuildUpCb, this);
        MvcEventDispatcher_1.MvcEventDispatcher.getInstance(DataEvent_1.DataEvent.GUIDENEWERGUIDE).removeEventListener(DataEvent_1.DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS, this.getClickGoFightCb, this);
        GameManager_1.gm.ui.off("item_move", this.on_move_item_move, this);
        GameManager_1.gm.ui.off("item_move_end", this.on_move_item_hide, this);
        GameManager_1.gm.ui.off("item_children_refresh", this.on_move_item_refresh, this);
        GameManager_1.gm.ui.off("item_unlock_refresh", this.on_item_unlock_refresh, this);
        GameManager_1.gm.ui.off("compostimeChange", this.showNextCellNode, this);
        GameManager_1.gm.ui.off("unLockNewArea", this.unLockNewArea, this);
        GameManager_1.gm.ui.off("build_upgrade", this.refreshBuildItem, this);
        GameManager_1.gm.ui.off("item_compose_time_change", this.composeTimesChange, this);
        GameManager_1.gm.ui.off("build_metarail_change", this.showBuildMertarilFull, this);
        GameManager_1.gm.ui.off("guide_del_item", this.guideDelItem, this);
        GameManager_1.gm.ui.off("bookRedStatus", this.refreshRedBtnBook, this);
        GameManager_1.gm.ui.off("ship_goods_change", this.putAllItemToMapAuto, this);
        this.node.targetOff(this);
    };
    MainMapUI.prototype.lockMainUI = function () {
        var _this = this;
        var _a;
        var type = [Constants_1.SpecialEnum.CAVES_TYPE];
        this.mapUI.active = !GameManager_1.gm.data.mapCell_data.isGuide;
        var position = [new cc.Vec3(-206, -900)];
        this.roleBuildAnimNode.active = !GameManager_1.gm.data.mapCell_data.isGuide;
        if (((_a = this.roleBuildAnimNode) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            if (this.roleBuildAnimNode.active) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/staticAnim4", NodePoolItem_1.NodePoolItem, function (data) {
                    var _a;
                    if (!data)
                        return;
                    if (((_a = _this.roleBuildAnimNode) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                        var e = GameManager_1.gm.data.config_data.getSpecialByID(type[0]);
                        if (e) {
                            _this.roleBuildAnimNode.addChild(data.node);
                            if (GameManager_1.gm.data.mapCell_data.role_map_data[e.unlock] &&
                                GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.CAVES_TYPE].state == 2) {
                                _this.roleBuildAnimNode.active = false;
                                GameManager_1.gm.pool.put(data.node);
                            }
                        }
                    }
                    else {
                        GameManager_1.gm.pool.put(data.node);
                    }
                });
            }
            this.roleBuildAnimNode.zIndex = GameManager_1.gm.const.MAX_CELL_NUM - 3;
            this.roleBuildAnimNode.position = position[0];
        }
    };
    MainMapUI.prototype.lockAreaCloud = function () {
        var _this = this;
        var isAreaLocked = false;
        for (var areaKey in GameManager_1.gm.const.localCloudAreaList) {
            (function (key) {
                if (GameManager_1.gm.data.mapCell_data.isGuide ||
                    2 == GameManager_1.gm.data.mapCell_data.lockArea[key] ||
                    GameManager_1.gm.data.mapCell_data.getAreaIDIsUnLock(parseInt(key))) {
                    GameManager_1.gm.pool.put_children(_this.lockAreaCloudList.children[GameManager_1.gm.const.localCloudAreaList[key].index]);
                }
                else {
                    isAreaLocked = true;
                    if (0 ==
                        _this.lockAreaCloudList.children[GameManager_1.gm.const.localCloudAreaList[key].index].childrenCount) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/lockCloud_" + key, LockCloudArea_1.default, function (LockCloud) {
                            if (0 ==
                                _this.lockAreaCloudList.children[GameManager_1.gm.const.localCloudAreaList[key].index].childrenCount) {
                                LockCloud.initType(parseInt(key));
                                _this.lockAreaCloudList.children[GameManager_1.gm.const.localCloudAreaList[key].index].addChild(LockCloud.node);
                            }
                            else {
                                GameManager_1.gm.pool.put(LockCloud.node);
                            }
                        });
                    }
                    else {
                        _this.lockAreaCloudList.children[GameManager_1.gm.const.localCloudAreaList[key].index].children[0]
                            .getComponent(LockCloudArea_1.default)
                            .refreshPanel();
                    }
                }
            })(areaKey);
        }
        this.lockAreaCloudList.zIndex = isAreaLocked
            ? GameManager_1.gm.const.MAX_CELL_NUM
            : 0;
    };
    MainMapUI.prototype.show_task_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.task_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.TASK, "prefabs/task_entry", TaskEntry_1.TaskEntry, function (data) {
                if (_this.task_node.childrenCount == 0 && data) {
                    _this.task_node.addChild(data.node);
                }
                else {
                    if (data)
                        GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.show_task_main_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.task_main_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.TASK, "prefabs/task_main_entry", TaskMainEntry_1.TaskMainEntry, function (data) {
                if (!data)
                    return;
                if (_this.task_main_node.childrenCount == 0) {
                    _this.task_main_node.addChild(data.node);
                }
                else {
                    GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.show_task_main_entry_guide = function () {
        var _a;
        var data = (_a = this.task_main_node) === null || _a === void 0 ? void 0 : _a.getComponentInChildren(TaskMainEntry_1.TaskMainEntry);
        if (data)
            data.show_weak_guide(0);
    };
    MainMapUI.prototype.show_ladder_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.ladder_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.LADDER, "prefabs/ladder_entry", LadderEntry_1.LadderEntry, function (data) {
                if (!data)
                    return;
                if (_this.ladder_node.childrenCount == 0) {
                    _this.ladder_node.addChild(data.node);
                }
                else {
                    GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.show_sign_entry = function () {
        var _this = this;
        var _a;
        if (TempData_1.TempData.mainFunShowSign) {
            this.sign_node.active = true;
            if (((_a = this.sign_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.SIGN, "prefabs/sign_entry", SignEntry_1.SignEntry, function (data) {
                    if (!data)
                        return;
                    if (_this.sign_node.childrenCount == 0) {
                        _this.sign_node.addChild(data.node);
                    }
                    else {
                        GameManager_1.gm.pool.put(data.node);
                    }
                });
            }
        }
        else {
            this.sign_node.active = false;
        }
    };
    MainMapUI.prototype.show_super_recruit_node_entry = function () {
        var _this = this;
        var _a;
        if (TempData_1.TempData.mainFunShowSuperHero) {
            this.super_recruit_node.active = true;
            if (((_a = this.super_recruit_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.SUPER_RECRUIT, "prefabs/super_recruit_entry", NodePoolItem_1.NodePoolItem, function (data) {
                    if (!data)
                        return;
                    if (_this.super_recruit_node.childrenCount == 0) {
                        _this.super_recruit_node.addChild(data.node);
                    }
                    else {
                        GameManager_1.gm.pool.put(data.node);
                    }
                });
            }
        }
        else {
            this.super_recruit_node.active = false;
        }
    };
    MainMapUI.prototype.show_lucky_wheel_node_entry = function () {
        var _this = this;
        var _a;
        if (TempData_1.TempData.mainFunShowLucky) {
            this.lucky_wheel_node.active = true;
            if (((_a = this.lucky_wheel_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.LUCKY_WHEEL, "prefabs/lucky_wheel_entry", NodePoolItem_1.NodePoolItem, function (data) {
                    if (!data)
                        return;
                    if (_this.lucky_wheel_node.childrenCount == 0) {
                        _this.lucky_wheel_node.addChild(data.node);
                    }
                    else {
                        GameManager_1.gm.pool.put(data.node);
                    }
                });
            }
        }
        else {
            this.lucky_wheel_node.active = false;
        }
    };
    MainMapUI.prototype.show_record_entry = function () {
        var _this = this;
        var _a;
        // this.record_node.active = true;
        this.record_node.active = GameManager_1.gm.channel.is_video_share;
        if (GameManager_1.gm.channel.is_video_share && ((_a = this.record_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.RECORD, "prefabs/record_entry", NodePoolItem_1.NodePoolItem, function (data) {
                if (!data)
                    return;
                if (_this.record_node.childrenCount == 0) {
                    _this.record_node.addChild(data.node);
                }
                else {
                    GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.show_more_entry = function () {
        var _this = this;
        this.more_node.active = true;
        if (this.more_node.childrenCount == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.LADDER, "prefabs/more_entry", MoreEntry_1.MoreEntry, function (data) {
                if (!data)
                    return;
                if (_this.more_node.childrenCount == 0) {
                    _this.more_node.addChild(data.node);
                }
                else {
                    GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.show_shop_entry = function () {
        this.shop_node.active = false;
        // this.shop_node.active = true;
    };
    MainMapUI.prototype.show_mail_entry = function () {
        var _this = this;
        if (0 == this.mail_node.childrenCount) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAIL, "prefabs/mail_entry", MailEntry_1.MailEntry, function (data) {
                if (0 == _this.mail_node.childrenCount) {
                    _this.mail_node.addChild(data.node);
                }
                else {
                    GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.show_guide_gift_entry = function () {
        var _this = this;
        var _a;
        if (TempData_1.TempData.mainFunShowGuide) {
            this.guide_gift_node.active = true;
            if (((_a = this.guide_gift_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.GUIDEGIFT, "prefabs/guide_gift_entry", GuideGiftEntry_1.GuideGiftEntry, function (data) {
                    if (!data)
                        return;
                    if (_this.guide_gift_node.childrenCount == 0) {
                        _this.guide_gift_node.addChild(data.node);
                    }
                    else {
                        GameManager_1.gm.pool.put(data.node);
                    }
                });
            }
        }
        else {
            this.guide_gift_node.active = false;
        }
    };
    MainMapUI.prototype.show_add_desktop_entry = function () {
        var _this = this;
        var _a;
        this.add_desktop_node.active = true;
        if (((_a = this.add_desktop_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.ADD_DESKTOP, "prefabs/add_desktop_entry", AddDesktopEntry_1.AddDesktopEntry, function (data) {
                if (!data)
                    return;
                if (_this.add_desktop_node.childrenCount == 0) {
                    _this.add_desktop_node.addChild(data.node);
                }
                else {
                    GameManager_1.gm.pool.put(data.node);
                }
            });
        }
    };
    MainMapUI.prototype.setBarrelNodeActive = function () {
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            this.barrelNode.y = -208;
            this.barrelNode.active =
                0 < GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum;
            if (this.barrelNode.active) {
                this.barrelNode.y = 105;
            }
        }
        else {
            this.barrelNode.active = true;
            this.barrelNode.y = 105;
            this.barrelNode.getComponent(BarrelMgr_1.default).refreshPanel();
        }
    };
    MainMapUI.prototype.initMapPosSucc = function () {
        if (!GameManager_1.gm.data.mapCell_data.isGuide)
            return;
        this.checkGuideIsShow();
    };
    MainMapUI.prototype.checkGuideIsShow = function () {
        var newE = (this.handAnim.active = !1);
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            var guildData = TempData_1.TempData.getRoleGuideData();
            if (0 < guildData.guideID && !guildData.isEnd) {
                newE = true;
                GameManager_1.gm.newerGuideMgr.initEventList();
            }
            if (!newE) {
                this.checkHandAnimDelay();
            }
        }
        else {
            this.isBeginDelayTime = false;
        }
    };
    MainMapUI.prototype.update = function (num) {
        var _a, _b;
        if (this.isBeginDelayTime) {
            this.curTimer += num;
            if (this.curTimer >= this.delayTime) {
                this.isBeginDelayTime = false;
                this.delayTime = 0;
                this.curTimer = 0;
                this.checkHandAnim();
            }
        }
        if (!this._isDragToBorderMoveSpeed.equals(cc.Vec2.ZERO) && ((_a = this.moveItemNode) === null || _a === void 0 ? void 0 : _a.activeInHierarchy)) {
            this.mapContent.x += this._isDragToBorderMoveSpeed.x * num;
            this.mapContent.y += this._isDragToBorderMoveSpeed.y * num;
            this.moveItemNode.position = cc.v3((_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.convertToNodeSpaceAR(this._touch_position));
        }
    };
    MainMapUI.prototype.checkHandAnimDelay = function (num01, num02) {
        if (num01 === void 0) { num01 = 0; }
        if (num02 === void 0) { num02 = 0; }
        this.delayTime = num01 == undefined ? 0.3 : num01;
        this.guideID = num02;
        this.isBeginDelayTime = true;
    };
    MainMapUI.prototype.goboundary = function () {
        var _a, _b, _c, _d;
        var num01 = 0;
        var num02 = 0;
        var visibleSize = cc.view.getVisibleSize();
        var i = Math.ceil(visibleSize.height / 1500);
        var mapScale = this.mapContent.scale;
        var point = this.mapContent.getAnchorPoint();
        if (visibleSize.width / 2 >
            this._map_size.x * point.x * mapScale -
                this.mapContent.getPosition().x) {
            num01 =
                this._map_size.x * point.x * mapScale - visibleSize.width / 2;
            (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.setPosition(num01, this.mapContent.y);
        }
        if (visibleSize.height / 2 >
            this._map_size.y * point.y * mapScale -
                this.mapContent.getPosition().y) {
            num02 =
                this._map_size.y * point.y * mapScale - visibleSize.height / 2;
            (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.setPosition(this.mapContent.x, num02);
        }
        if (visibleSize.width / 2 >
            this._map_size.x * (1 - point.x) * mapScale +
                this.mapContent.getPosition().x) {
            num01 =
                visibleSize.width / 2 -
                    this._map_size.x * (1 - point.x) * mapScale;
            (_c = this.mapContent) === null || _c === void 0 ? void 0 : _c.setPosition(num01, this.mapContent.y);
        }
        if (visibleSize.height / 2 >
            this._map_size.y * (1 - point.y) * mapScale +
                this.mapContent.getPosition().y) {
            num02 =
                visibleSize.height / 2 -
                    this._map_size.y * (1 - point.y) * mapScale;
            (_d = this.mapContent) === null || _d === void 0 ? void 0 : _d.setPosition(this.mapContent.x, num02);
        }
    };
    MainMapUI.prototype.initShip = function () {
        var _this = this;
        var _a;
        if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE]) {
            if (this.ship.childrenCount == 0) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/ship", ShipMgr_1.default, function (data) {
                    if (!data)
                        return;
                    if (_this.ship.childrenCount == 0) {
                        if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE]) {
                            var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE];
                            var mapItemDataVo = new MapCellCfgData_1.MapItemDataVO();
                            mapItemDataVo.cellID = buildData.cellID;
                            mapItemDataVo.cellState = 2;
                            mapItemDataVo.itemState = 2;
                            mapItemDataVo.itemType =
                                Constants_1.ItemTypeEnum.BUILD_TYPE;
                            mapItemDataVo.itemID = buildData.buildID;
                            mapItemDataVo.heroUID = 0;
                            data.node
                                .getComponent(BuildIconItem_1.default)
                                .initData(mapItemDataVo);
                            var newE = buildData.cellID % _this._row;
                            var newNum = Math.floor(buildData.cellID / _this._row);
                            _this.ship.y =
                                -_this._heightHalf - 51 * newNum - 20 * newE;
                            _this.ship.x =
                                _this._widthHalf - 31 * newNum + 75 * newE;
                            _this.ship.zIndex = GameManager_1.gm.const.MAX_CELL_NUM;
                            _this.ship.addChild(data.node);
                        }
                        else {
                            GameManager_1.gm.pool.put(data.node);
                        }
                    }
                });
            }
            else if (GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE]) {
                var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE];
                var mapItemDataVO = new MapCellCfgData_1.MapItemDataVO();
                mapItemDataVO.cellID = buildData.cellID;
                mapItemDataVO.cellState = 2;
                mapItemDataVO.itemState = 2;
                mapItemDataVO.itemType = Constants_1.ItemTypeEnum.BUILD_TYPE;
                mapItemDataVO.itemID = buildData.buildID;
                mapItemDataVO.heroUID = 0;
                (_a = this.ship) === null || _a === void 0 ? void 0 : _a.children[0].getComponent(BuildIconItem_1.default).initData(mapItemDataVO);
                var num = buildData.cellID % this._row;
                var newE = Math.floor(buildData.cellID / this._row);
                this.ship.y = -this._heightHalf - 51 * newE - 20 * num;
                this.ship.x = this._widthHalf - 31 * newE + 75 * num;
                this.ship.active = true;
            }
        }
    };
    MainMapUI.prototype.refreshBuildItem = function () {
        for (var key in (this.lockAreaCloud(),
            GameManager_1.gm.data.mapCell_data.buildData)) {
            if (parseInt(key) == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                this.initShip();
            }
            else {
                var itemNode = this.mapContent.getChildByName(GameManager_1.gm.data.mapCell_data.buildData[key].cellID.toString());
                if (itemNode) {
                    var itemComponent = itemNode.getComponent(MainMapItem_1.default);
                    if (itemComponent) {
                        itemComponent.showItemNode();
                    }
                }
            }
        }
        this.setBarrelNodeActive();
    };
    MainMapUI.prototype.on_item_unlock_refresh = function (name) {
        var _a, _b;
        if ((_a = this.ship) === null || _a === void 0 ? void 0 : _a.active)
            this.showUnComposeCell();
        var itemNode = (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.getChildByName(name.toString());
        if (itemNode) {
            var itemComponent = itemNode.getComponent(MainMapItem_1.default);
            if (itemComponent) {
                itemComponent.playUnlockUpAnim();
            }
        }
    };
    MainMapUI.prototype.on_move_item_refresh = function (num) {
        var _a;
        if (num != 395 && num != 313 && num != null) {
            var itemNode = (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName(num.toString());
            if (itemNode) {
                var itemComponent = itemNode.getComponent(MainMapItem_1.default);
                if (itemComponent) {
                    itemComponent.showItemNode();
                }
            }
        }
    };
    MainMapUI.prototype.on_move_item_move = function (position, type, number) {
        var _this = this;
        if (!this.moveItemNode.active) {
            if (this.roleBuildUpgrade.active) {
                this.roleBuildUpgrade.active = false;
                this.setMapUiShow(true);
            }
            this.moveItemNode.active = true;
            this.moveItemNode.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 2;
            if (type == Constants_1.ItemTypeEnum.HERO_TYPE) {
                this.moveItemNode.getComponent(cc.Sprite).enabled = false;
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + number, NodePoolItem_1.NodePoolItem, function (nodepool) {
                    if (0 == _this.moveItemNode.children[0].childrenCount) {
                        _this.moveItemNode.children[0].addChild(nodepool.node);
                        var skeletonComponent = nodepool.getComponent(sp.Skeleton);
                        if (skeletonComponent) {
                            skeletonComponent.setSkin("front");
                            skeletonComponent.setAnimation(0, "stay", true);
                        }
                    }
                    else {
                        GameManager_1.gm.pool.put(nodepool.node);
                    }
                });
            }
            else if (type == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                this.moveItemNode.getComponent(cc.Sprite).enabled = true;
                var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(number);
                if (buildConfig) {
                    Utils_1.Utils.async_set_sprite_frame(this.moveItemNode.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/build/" + buildConfig.model);
                    this.moveItemNode.scale = 0.6666667;
                }
            }
            else {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(number);
                if (itemConfig) {
                    this.moveItemNode.scale = 1;
                    this.moveItemNode.getComponent(cc.Sprite).enabled = true;
                    Utils_1.Utils.async_set_sprite_frame(this.moveItemNode.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemConfig.icon);
                    if (GameManager_1.gm.data.mapCell_data.isGuide &&
                        this.roleGuideBuildUpgrade.active) {
                        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(this._buildID);
                        if (buildConfig) {
                            var buildData = GameManager_1.gm.data.mapCell_data.buildData[buildConfig.buildType];
                            if (buildData) {
                                for (var materialType in buildData.metrailData) {
                                    if (itemConfig.type ==
                                        parseInt(materialType)) {
                                        if (itemConfig.type ==
                                            Constants_1.PropTypeEnum.WOOD_TYPE ||
                                            itemConfig.type ==
                                                Constants_1.PropTypeEnum.IRON_TYPE) {
                                            if (itemConfig.number ==
                                                buildData.metrailData[materialType].max) {
                                                if (buildConfig.buildType ==
                                                    Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                                    this.ship.children[0]
                                                        .getComponent(BuildIconItem_1.default)
                                                        .playScaleAnim();
                                                    this.guideScaleNode =
                                                        this.ship.children[0].getComponent(BuildIconItem_1.default);
                                                }
                                                else {
                                                    this.mapContent
                                                        .getChildByName(buildData.cellID.toString())
                                                        .getComponent(MainMapItem_1.default)
                                                        .playScaleAnim();
                                                    this.guideScaleNode =
                                                        this.mapContent
                                                            .getChildByName(buildData.cellID.toString())
                                                            .getComponent(MainMapItem_1.default)
                                                            .mapBuildNode.children[0].getComponent(BuildIconItem_1.default);
                                                }
                                            }
                                        }
                                        else if (itemConfig.id ==
                                            buildData.metrailData[materialType]
                                                .id) {
                                            if (buildConfig.buildType ==
                                                Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                                this.ship.children[0]
                                                    .getComponent(BuildIconItem_1.default)
                                                    .playScaleAnim();
                                                this.guideScaleNode =
                                                    this.ship.children[0].getComponent(BuildIconItem_1.default);
                                            }
                                            else {
                                                this.mapContent
                                                    .getChildByName(buildData.cellID.toString())
                                                    .getComponent(MainMapItem_1.default)
                                                    .playScaleAnim();
                                                this.guideScaleNode =
                                                    this.mapContent
                                                        .getChildByName(buildData.cellID.toString())
                                                        .getComponent(MainMapItem_1.default)
                                                        .mapBuildNode.children[0].getComponent(BuildIconItem_1.default);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.moveItemNode.children[1].getComponent(cc.Label).string = "";
            var posV2_1 = this.mapContent.convertToNodeSpaceAR(position);
            this.moveItemNode.position = new cc.Vec3(posV2_1.x, posV2_1.y, 0);
        }
        var posV2 = this.mapContent.convertToNodeSpaceAR(position);
        this.moveItemNode.position = new cc.Vec3(posV2.x, posV2.y, 0);
        if (!GameManager_1.gm.data.mapCell_data.isGuide) {
            if (this.moveItemNode.activeInHierarchy) {
                this._touch_position = new cc.Vec2(position.x, position.y);
                var nodeSize = this.node.getContentSize();
                var halfNodeSize = cc.size(0.5 * nodeSize.width, 0.5 * nodeSize.height);
                var localPosition = this.node.convertToNodeSpaceAR(position);
                var moveSpeed = 150 * this.mapContent.scale;
                if (localPosition.x < 50 - halfNodeSize.width) {
                    this._isDragToBorderMoveSpeed.x = moveSpeed;
                }
                else if (localPosition.x > halfNodeSize.width - 50) {
                    this._isDragToBorderMoveSpeed.x = -moveSpeed;
                }
                else {
                    this._isDragToBorderMoveSpeed.x = 0;
                }
                if (localPosition.y < 50 - halfNodeSize.height) {
                    this._isDragToBorderMoveSpeed.y = moveSpeed;
                }
                else if (localPosition.y > halfNodeSize.height - 50) {
                    this._isDragToBorderMoveSpeed.y = -moveSpeed;
                }
                else {
                    this._isDragToBorderMoveSpeed.y = 0;
                }
            }
            else {
                this._isDragToBorderMoveSpeed.x = 0;
                this._isDragToBorderMoveSpeed.y = 0;
            }
        }
    };
    MainMapUI.prototype.hideMoveItemNode = function () {
        var _a;
        this.moveItemNode.active = false;
        this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        GameManager_1.gm.pool.put_children(this.moveItemNode.children[0]);
        if (GameManager_1.gm.data.mapCell_data.isGuide && ((_a = this.roleGuideBuildUpgrade) === null || _a === void 0 ? void 0 : _a.active) &&
            this.guideScaleNode) {
            this.guideScaleNode.stopScaleAnim(); // TODO: ???
        }
    };
    MainMapUI.prototype.hideMoveBuildItemNode = function () {
        this.moveItemNode.active = false;
        this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        GameManager_1.gm.pool.put_children(this.moveItemNode.children[0]);
    };
    MainMapUI.prototype.on_move_item_hide = function (event, number) {
        var _a, _b;
        this.moveItemNode.active = false;
        this._isDragToBorderMoveSpeed = cc.Vec2.ZERO;
        GameManager_1.gm.pool.put_children(this.moveItemNode.children[0]);
        if (GameManager_1.gm.data.mapCell_data.isGuide && ((_a = this.roleGuideBuildUpgrade) === null || _a === void 0 ? void 0 : _a.active) &&
            this.guideScaleNode) {
            this.guideScaleNode.stopScaleAnim(); //
        }
        if (GameManager_1.gm.data.fight_temp_data.open_battle_panel_state == 0) {
            for (var a = 0; a < this.mapContent.childrenCount; a++) {
                var component = (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.children[a].getComponent(MainMapItem_1.default);
                if (component && component.playSameItemAnimEnd(event, number))
                    return;
            }
        }
    };
    MainMapUI.prototype.onClickCase = function () {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (GameManager_1.gm.data.mapCell_data.roleBarrelData.curBarrelNum > 0) {
                GameManager_1.gm.data.mapCell_data.addBarrelInMap();
            }
            else {
                GameManager_1.gm.channel.show_video_ad(function () {
                    GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times++;
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(40);
                    NetUtils_1.ReportData.instance.report_point(10301);
                    NetUtils_1.ReportData.instance.report_once_point(10302);
                    GameManager_1.gm.channel.report_event("video_buy_barrel", {
                        event_desc: "看视频购买木桶",
                        buy_count: GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times,
                        task_desc: cc.js.formatStr("购买木桶%d次", GameManager_1.gm.data.mapCell_data.watch_ad_buy_barrel_times),
                    });
                }, this);
            }
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    MainMapUI.prototype.randomShowCase = function () {
        var _this = this;
        var waterBarrelList = GameManager_1.gm.data.mapCell_data.waterBarrelList;
        if (waterBarrelList.length > 0) {
            this.barrelParentNode.zIndex = 400;
            var _loop_1 = function (t) {
                var e = t;
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/barrelItem", WaterBarrelItem_1.default, function (data) {
                    var _a;
                    if (!data)
                        return;
                    var barrelItem = data;
                    barrelItem.initData(waterBarrelList[e], e);
                    (_a = _this.barrelParentNode) === null || _a === void 0 ? void 0 : _a.addChild(data.node);
                });
            };
            for (var t = 0; t < waterBarrelList.length; t++) {
                _loop_1(t);
            }
        }
    };
    MainMapUI.prototype.initMapForTest = function () {
        var _this = this;
        this._mapCfgList = GameManager_1.gm.data.config_data.getMapCellCfg();
        var _loop_2 = function (i) {
            if (this_1._mapCfgList[i]) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item", MainMapItem_1.default, function (data) {
                    var _a;
                    if (!data)
                        return;
                    var num01 = _this._mapCfgList[i].mapIndex % _this._row;
                    var num02 = Math.floor(_this._mapCfgList[i].mapIndex / _this._row);
                    var mainMap = data;
                    mainMap.initData(_this._mapCfgList[i], 1, 0, false);
                    data.node.y =
                        -_this._heightHalf - 51 * num02 - 20 * num01;
                    data.node.x = _this._widthHalf - 31 * num02 + 75 * num01;
                    (_a = _this.mapContent) === null || _a === void 0 ? void 0 : _a.addChild(data.node);
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this._mapCfgList.length; i++) {
            _loop_2(i);
        }
    };
    MainMapUI.prototype.initMap = function () {
        var _this = this;
        var roleMapTotalData = GameManager_1.gm.data.mapCell_data.role_map_total_data;
        Utils_1.Utils.sort_by_props(roleMapTotalData, { itemID: "ascending" });
        var _loop_3 = function (e) {
            var roleMap = roleMapTotalData[e];
            if (this_2._mapCfgList[roleMap]) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item", MainMapItem_1.default, function (data) {
                    var _a;
                    if (!data)
                        return;
                    var num01 = _this._mapCfgList[roleMap].mapIndex % _this._row;
                    var num02 = Math.floor(_this._mapCfgList[roleMap].mapIndex / _this._row);
                    var mainMap = data;
                    mainMap.initData(_this._mapCfgList[roleMap], 1, 0);
                    data.node.y =
                        -_this._heightHalf - 51 * num02 - 20 * num01;
                    data.node.x = _this._widthHalf - 31 * num02 + 75 * num01;
                    (_a = _this.mapContent) === null || _a === void 0 ? void 0 : _a.addChild(data.node);
                });
            }
        };
        var this_2 = this;
        for (var e = 0; e < roleMapTotalData.length; e++) {
            _loop_3(e);
        }
    };
    MainMapUI.prototype.unLockNewArea = function () {
        var _this = this;
        if (this.roleBuildUpgrade.active) {
            this.roleBuildUpgrade.active = false;
            this.setMapUiShow(true);
        }
        this._mapCfgList = GameManager_1.gm.data.config_data.getMapCellCfg();
        var areaUnlock = GameManager_1.gm.data.mapCell_data.areaUnlockCellIDList;
        var count = 0;
        var _loop_4 = function () {
            var newUnlock = GameManager_1.gm.data.mapCell_data._curNewUnlockCellList.shift();
            if (this_3._mapCfgList[newUnlock]) {
                if (this_3.mapContent.getChildByName(this_3._mapCfgList[newUnlock].cellID.toString())) {
                    GameManager_1.gm.pool.put(this_3.mapContent.getChildByName(this_3._mapCfgList[newUnlock].cellID.toString()));
                }
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item", MainMapItem_1.default, function (mapItem) {
                    var mapIndex = _this._mapCfgList[newUnlock].mapIndex % _this._row;
                    var mapFloor = Math.floor(_this._mapCfgList[newUnlock].mapIndex / _this._row);
                    mapItem.initData(_this._mapCfgList[newUnlock], 3, count);
                    mapItem.node.y =
                        -_this._heightHalf - 51 * mapFloor - 20 * mapIndex;
                    mapItem.node.x =
                        _this._widthHalf - 31 * mapFloor + 75 * mapIndex;
                    _this.mapContent.addChild(mapItem.node);
                    count++;
                });
            }
            if (0 == GameManager_1.gm.data.mapCell_data._curNewUnlockCellList.length) {
                GameManager_1.gm.data.mapCell_data.async_write_data();
            }
        };
        var this_3 = this;
        for (; 0 < GameManager_1.gm.data.mapCell_data._curNewUnlockCellList.length;) {
            _loop_4();
        }
        var num = 0;
        if (0 < areaUnlock.length) {
            var _loop_5 = function () {
                var areaUnlock0 = areaUnlock.shift();
                if (this_4._mapCfgList[areaUnlock0]) {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item", MainMapItem_1.default, function (mapItem) {
                        var mapIndex = _this._mapCfgList[areaUnlock0].mapIndex %
                            _this._row;
                        var mapfloor = Math.floor(_this._mapCfgList[areaUnlock0].mapIndex /
                            _this._row);
                        mapItem.initData(_this._mapCfgList[areaUnlock0], 2, num);
                        mapItem.node.y =
                            -_this._heightHalf -
                                51 * mapfloor -
                                20 * mapIndex;
                        mapItem.node.x =
                            _this._widthHalf - 31 * mapfloor + 75 * mapIndex;
                        _this.mapContent.addChild(mapItem.node);
                        num++;
                        if (0 == areaUnlock.length) {
                            GameManager_1.gm.data.mapCell_data.async_write_data();
                            _this.showUnComposeCell();
                            var roleGuide = TempData_1.TempData.getRoleGuideData();
                            if (roleGuide &&
                                6 == roleGuide.guideID &&
                                !roleGuide.isEnd) {
                                _this.scheduleOnce(_this.checkGuideIsShow, 0.5 * num);
                            }
                        }
                    });
                }
            };
            var this_4 = this;
            for (; 0 < areaUnlock.length;) {
                _loop_5();
            }
        }
        else {
            this.showUnComposeCell();
        }
        GameManager_1.gm.ui.emit("build_show_stateIcon", true);
        this.scheduleOnce(this.checkGuideIsShow, Math.max(0.5 * num, 1.5));
    };
    MainMapUI.prototype.showUnComposeCell = function () {
        var _this = this;
        var count = 0;
        var areaUnlockCellIDs = GameManager_1.gm.data.mapCell_data.areaUnlockCellIDList;
        if (0 < areaUnlockCellIDs.length) {
            var _loop_6 = function () {
                var cellID = areaUnlockCellIDs.shift();
                if (this_5._mapCfgList[cellID]) {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item", MainMapItem_1.default, function (mapItem) {
                        var columnIndex = _this._mapCfgList[cellID].mapIndex % _this._row;
                        var rowIndex = Math.floor(_this._mapCfgList[cellID].mapIndex / _this._row);
                        mapItem.initData(_this._mapCfgList[cellID], 4, count);
                        mapItem.node.y =
                            -_this._heightHalf -
                                51 * rowIndex -
                                20 * columnIndex;
                        mapItem.node.x =
                            _this._widthHalf -
                                31 * rowIndex +
                                75 * columnIndex;
                        _this.mapContent.addChild(mapItem.node);
                        count++;
                        if (0 == areaUnlockCellIDs.length) {
                            _this.showNextCellNode();
                        }
                    });
                }
            };
            var this_5 = this;
            for (; 0 < areaUnlockCellIDs.length;) {
                _loop_6();
            }
        }
        else {
            this.showNextCellNode();
        }
    };
    MainMapUI.prototype.onHideOneHeroByCellID = function () { };
    MainMapUI.prototype.onHidShowHeroByCellID = function () { };
    MainMapUI.prototype.onHideGoBattle = function () { };
    MainMapUI.prototype.showNextCellNode = function () {
        this.nextCompTimes.active = false;
        var nextLockedCell = GameManager_1.gm.data.mapCell_data.getNextLockCell();
        if (nextLockedCell) {
            if (this.mapContent.getChildByName(nextLockedCell.cellID.toString())) {
                this.nextCompTimes.active = true;
                this.nextCompTimes.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 1;
                this.nextCompTimes.y =
                    this.mapContent.getChildByName(nextLockedCell.cellID.toString()).y + 90;
                this.nextCompTimes.x =
                    this.mapContent.getChildByName(nextLockedCell.cellID.toString()).x + 30;
                this.nextCompTimes.children[2].children[0].width = Math.min((Math.floor(GameManager_1.gm.data.mapCell_data.role_compose_times) /
                    nextLockedCell.comTimes) *
                    48, 48);
                this.nextCompTimes.children[2].children[0].width = Math.max(this.nextCompTimes.children[2].children[0].width, 20);
                this.nextCompTimes.children[1].getComponent(cc.Label).string =
                    "";
            }
        }
        else {
            this._nextOpenCell = null;
        }
    };
    MainMapUI.prototype.showBuildMertarilFull = function (buildID) {
        if (GameManager_1.gm.data.mapCell_data.isGuide &&
            this.roleGuideBuildUpgrade.active &&
            buildID == this._buildID) {
            this.mask.active = false;
            this.roleGuideUpgradeBtn.getComponent(cc.Button).interactable =
                false;
            var keys = 0;
            for (var index = 0; index < this.roleGuideBuildMertrailNode.childrenCount; index++) {
                var materialNode = this.roleGuideBuildMertrailNode.children[index];
                if (materialNode.active) {
                    var materialProgress = Math.min(this._buildMeatril[index].max, TempData_1.TempData.getBuildGuideMertarilNumByID(buildID, this._buildMeatril[index].id)) / this._buildMeatril[index].max;
                    materialNode.children[2].getComponent(cc.Label).string =
                        TempData_1.TempData.getBuildGuideMertarilNumByID(buildID, this._buildMeatril[index].id) +
                            "/" +
                            this._buildMeatril[index].max;
                    if (materialProgress >
                        materialNode.children[1].children[0].scaleX) {
                        materialNode.children[1].children[0].runAction(cc.scaleTo(0.2, materialProgress, 1));
                    }
                    if (TempData_1.TempData.getBuildGuideMertarilNumByID(buildID, this._buildMeatril[index].id) >= this._buildMeatril[index].max) {
                        materialNode.children[4].active = false;
                        keys++;
                    }
                }
            }
            var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildID);
            if (buildConfig) {
                var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildConfig.buildType);
                if (buildData &&
                    keys == Object.keys(buildData.metrailData).length) {
                    this.roleGuideUpgradeBtn.getComponent(cc.Button).interactable = true;
                }
            }
            this.checkHandAnimDelay();
        }
        var n, r;
        if (!GameManager_1.gm.data.mapCell_data.isGuide && !this.roleBuildUpgrade.active) {
            var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildID);
            if (buildConfig) {
                var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildConfig.buildType);
                if (buildData) {
                    for (var metrail in buildData.metrailData) {
                        if (buildData.metrailData[metrail].cur <
                            buildData.metrailData[metrail].max) {
                            return;
                        }
                    }
                    this.showBuildUpgrade(buildID, buildData.cellID);
                }
            }
        }
    };
    MainMapUI.prototype.playGuideBarrelFly = function (num) {
        var _a;
        GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.BARREL, (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName("186").convertToWorldSpaceAR(cc.Vec3.ZERO), num, this.barrelNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
    };
    MainMapUI.prototype.onClickGuideUplvl = function () {
        this.roleGuideBuildUpgrade.active = false;
        var cfgByID = GameManager_1.gm.data.config_data.getBuildCfgByID(this._buildID);
        if (!cfgByID)
            return;
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_6_JIANZUSHEGNJI);
        this.playBuildUpgradeAnim(this._buildID);
        GameManager_1.gm.data.mapCell_data.upgradeBuild(cfgByID.buildID);
        this.handAnim.active = false;
    };
    MainMapUI.prototype.playBuildUpgradeAnim = function (buildID) {
        var _this = this;
        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildID);
        if (buildConfig) {
            Utils_1.Utils.async_set_sprite_frame(this.buildUpAnim.children[1].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/build/" + buildConfig.buildID, function () {
                Utils_1.Utils.async_set_sprite_frame(_this.buildUpAnim.children[2].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/build/" + buildConfig.nextBuildID, function () {
                    _this.buildUpAnim.active = true;
                    if (buildConfig.buildType !=
                        Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildConfig.buildType);
                        if (!buildData) {
                            return;
                        }
                        Utils_1.Utils.async_set_sprite_frame(_this.buildUpAnim.children[1].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/build/" + buildConfig.buildID);
                        Utils_1.Utils.async_set_sprite_frame(_this.buildUpAnim.children[2].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/build/" + buildConfig.nextBuildID);
                        var worldPosition = _this.mapContent
                            .getChildByName(buildData.cellID.toString())
                            .getComponent(MainMapItem_1.default)
                            .mapBuildNode.children[0].convertToWorldSpaceAR(_this.mapContent
                            .getChildByName(buildData.cellID.toString())
                            .getComponent(MainMapItem_1.default)
                            .mapBuildNode.children[0].getComponent(BuildIconItem_1.default).itemImg.node.position);
                        var localPosition = _this.node.convertToNodeSpaceAR(worldPosition);
                        _this.buildUpAnim.position = localPosition;
                        _this.mapContent
                            .getChildByName(buildData.cellID.toString())
                            .getComponent(MainMapItem_1.default)
                            .setBuildImgOpacity(0);
                    }
                    else {
                        var worldPosition = _this.ship.children[0].convertToWorldSpaceAR(_this.ship.children[0].getComponent(BuildIconItem_1.default).itemImg.node.position);
                        var localPosition = _this.node.convertToNodeSpaceAR(worldPosition);
                        _this.buildUpAnim.position = localPosition;
                        _this.ship.opacity = 0;
                    }
                    _this.buildUpAnim.getComponent(cc.Animation).play();
                    _this.buildUpAnim.scale = _this.mapContent.scale;
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.FIREWORKS);
                    _this._buildID = buildConfig.nextBuildID;
                }, _this);
            }, this);
        }
    };
    MainMapUI.prototype.showBuildUpgrade = function (buildID, cellID) {
        GameManager_1.gm.ui.emit("build_show_stateIcon", false);
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            this.roleGuideBuildUpgrade.zIndex = 400;
            this.roleGuideBuildUpgrade.active = true;
            this.roleGuideUpgradeBtn.getComponent(cc.Button).interactable =
                false;
            this.roleGuideBuildUpgrade.scale =
                1 - 0.5 * (this.mapContent.scale - 1);
            this._buildMeatril = [];
            for (var index = 0; index < this.roleGuideBuildMertrailNode.childrenCount; index++) {
                this.roleGuideBuildMertrailNode.children[index].active = false;
            }
            var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(buildID);
            if (buildConfig) {
                this._buildID = buildID;
                var height = 0;
                var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildConfig.buildType);
                for (var metrail in buildData.metrailData) {
                    var metrailNode = this.roleGuideBuildMertrailNode.children[height];
                    metrailNode.active = true;
                    var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(buildData.metrailData[metrail].id);
                    if (itemConfig) {
                        Utils_1.Utils.async_set_sprite_frame(metrailNode.children[0].getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemConfig.id);
                        metrailNode.children[4].active = true;
                        metrailNode.children[2].getComponent(cc.Label).string =
                            buildData.metrailData[metrail].cur +
                                "/" +
                                buildData.metrailData[metrail].max;
                        metrailNode.children[1].children[0].scaleX =
                            buildData.metrailData[metrail].cur /
                                buildData.metrailData[metrail].max;
                    }
                    this._buildMeatril.push(buildData.metrailData[metrail]);
                    height++;
                }
                this.roleGuideBuildUpgradeBg.height = 88 + 54 * height;
                this.roleGuideBuildUpgrade.children[3].x = 0;
                if (buildConfig.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                    this.roleGuideBuildUpgrade.y = this.ship.y + 10;
                    this.roleGuideBuildUpgrade.x = this.ship.x - 20;
                }
                else if (buildConfig.buildType == Constants_1.BuildTypeEnum.WHARFTAX_TYPE) {
                    this.roleGuideBuildUpgrade.y =
                        this.mapContent.getChildByName(cellID.toString()).y +
                            10;
                    this.roleGuideBuildUpgrade.x =
                        this.mapContent.getChildByName(cellID.toString()).x +
                            70;
                    this.roleGuideBuildUpgrade.children[3].x = -80;
                }
                else {
                    this.roleGuideBuildUpgrade.y =
                        this.mapContent.getChildByName(cellID.toString()).y +
                            20;
                    this.roleGuideBuildUpgrade.x =
                        this.mapContent.getChildByName(cellID.toString()).x;
                }
                if (buildConfig.buildType == Constants_1.BuildTypeEnum.TOWER_TYPE &&
                    15 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                    this.checkHandAnimDelay();
                }
                if (buildConfig.buildType == Constants_1.BuildTypeEnum.TOWER_TYPE &&
                    0 == buildConfig.buildLv) {
                    GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 21,
                        guidedesc: cc.js.formatStr("%d.点击%s升级标志", 21, buildConfig.buildName),
                    });
                }
                var targetID = 116;
                if (!(buildConfig.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE &&
                    buildConfig.buildType !=
                        Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE &&
                    buildConfig.buildType != Constants_1.BuildTypeEnum.TOWER_TYPE)) {
                    targetID = 117;
                }
                this.lockSenceMoveMap(targetID, 1.5);
            }
        }
        else {
            this.roleBuildUpgrade.scale = 1 - 0.5 * (this.mapContent.scale - 1);
            this.roleBuildUpgrade
                .getComponent(MapBuildUpgrade_1.MapBuildUpgrade)
                .initData(buildID, cellID);
            this.roleBuildUpgrade.active = !this.roleBuildUpgrade.active;
            if (this.roleBuildUpgrade.active) {
                this.setMapUiShow(false);
                var buildType = 395 == cellID || 313 == cellID ? "ship" : cellID.toString();
                this.roleBuildUpgrade.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 3;
                var targetPosition = this.mapContent.getChildByName(buildType).position;
                var adjustedPosition = cc.v3(360 + -Math.abs(targetPosition.x) * this.mapContent.scale, Math.abs(targetPosition.y) * this.mapContent.scale - 300);
                this.mapContent.position = adjustedPosition;
                this.roleBuildUpgrade.y =
                    this.mapContent.getChildByName(buildType).y + 88;
                this.roleBuildUpgrade.x =
                    this.mapContent.getChildByName(buildType).x + 5;
            }
        }
    };
    MainMapUI.prototype.setMapUiShow = function (active) {
        if (active)
            this.mapUI.active = !GameManager_1.gm.data.mapCell_data.isGuide;
    };
    MainMapUI.prototype.lockMap = function () { };
    MainMapUI.prototype.showBattleEndCoin = function (num) {
        var _a;
        if (num > 0) {
            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, (_a = this.ship) === null || _a === void 0 ? void 0 : _a.position);
        }
    };
    MainMapUI.prototype.onClickLockBtn = function (data) {
        data.target.children[0].active = !data.target.children[0].active;
        this._isLockMoveMap = data.target.children[0].active;
    };
    MainMapUI.prototype.onClickShop = function () {
        if (!GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE] ||
            GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE].buildLvl <
                1) {
            GameManager_1.gm.ui.show_notice("Gian hàng vẫn chưa được mở khóa!!!!");
        }
        else {
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Store);
        }
    };
    MainMapUI.prototype.composeTimesChange = function () {
        this.showNextCellNode();
    };
    MainMapUI.prototype.lockSenceMoveMap = function (targetID, scale, callback, context) {
        var _this = this;
        var _a, _b, _c, _d;
        if (scale === void 0) { scale = 1; }
        if (callback === void 0) { callback = null; }
        if (context === void 0) { context = null; }
        this.mask.active = true;
        if (scale === undefined)
            scale = 1;
        if (callback === undefined)
            callback = null;
        if (context === undefined)
            context = null;
        var childName = "";
        if (targetID == 395 || targetID == 313) {
            childName = "ship";
        }
        else {
            childName = targetID.toString();
        }
        var position = this.mapContent.getChildByName(childName).position;
        var targetPosition = new cc.Vec2(410 + -Math.abs(position.x) * scale, Math.abs(position.y) * scale + 100);
        (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.stopAllActions();
        (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.runAction(cc.sequence(cc.spawn(cc.scaleTo(1, scale), cc.moveTo(1, targetPosition)), cc.callFunc(function () {
            _this.mask.active = false;
            if (callback)
                callback.apply(context);
        })));
        if ((_c = this.roleGuideBuildUpgrade) === null || _c === void 0 ? void 0 : _c.active) {
            this.roleGuideBuildUpgrade.runAction(cc.scaleTo(1, 1 - 0.5 * (scale - 1)));
        }
        if ((_d = this.roleBuildUpgrade) === null || _d === void 0 ? void 0 : _d.active) {
            this.roleBuildUpgrade.runAction(cc.scaleTo(1, 1 - 0.5 * (scale - 1)));
        }
    };
    MainMapUI.prototype.onClickBook = function () {
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.BOOK);
    };
    MainMapUI.prototype.onClickTestMove = function () {
        this.playGuideBarrelFly(5);
    };
    MainMapUI.prototype.playComposeAnim = function (number) {
        var _a, _b, _c, _d, _e;
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_161_COMPOSE);
        var position = (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName(number.toString()).convertToWorldSpaceAR((_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.getChildByName(number.toString()).getComponent(MainMapItem_1.default).touchNode.position);
        this.composeAnim.position = (_c = this.mapContent) === null || _c === void 0 ? void 0 : _c.convertToNodeSpaceAR(position);
        this.composeAnim.active = true;
        this.composeAnim.zIndex = 400;
        this.composeAnim.y =
            ((_d = this.mapContent) === null || _d === void 0 ? void 0 : _d.convertToNodeSpaceAR(position).y) + 28;
        (_e = this.composeAnim) === null || _e === void 0 ? void 0 : _e.getComponent(cc.Animation).play();
    };
    MainMapUI.prototype.moveMapPosForGuide = function (actionType, moveDistance, duration, callback, context) {
        var _this = this;
        var _a, _b;
        if (actionType == 0) {
            if (GameManager_1.gm.data.mapCell_data.getBuildDataByType(moveDistance)) {
                this.lockSenceMoveMap(116, 0.1 * duration, callback, context);
            }
        }
        else if (actionType == 2) {
            this.mask.active = true;
            (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, moveDistance)), cc.callFunc(function () {
                _this.mask.active = false;
                if (callback)
                    callback.apply(context);
            })));
        }
        else if (actionType == 3) {
            this.barrelNode.active = true;
            this.barrelNode.y = moveDistance == 105 ? -208 : 105;
            this.mask.active = true;
            (_b = this.barrelNode) === null || _b === void 0 ? void 0 : _b.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, moveDistance)), cc.callFunc(function () {
                _this.mask.active = false;
                if (callback)
                    callback.apply(context);
            })));
        }
    };
    MainMapUI.prototype.guideItemToBuild = function (itemID, targetCellID) {
        var cellID = 0;
        var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
        if (itemConfig) {
            var itemDataArray = GameManager_1.gm.data.mapCell_data.itemData[itemConfig.type];
            if (itemDataArray) {
                var s = !1;
                for (var index = 0; index < itemDataArray.length; index++) {
                    if (itemDataArray[index].itemID == itemID && 0 == cellID) {
                        cellID = itemDataArray[index].cellID;
                        s = !0;
                        break;
                    }
                }
                if (12002 == itemID && !s)
                    for (var index = 0; index < itemDataArray.length; index++) {
                        if (12003 == itemDataArray[index].itemID &&
                            0 == cellID) {
                            cellID = itemDataArray[index].cellID;
                            s = !0;
                            break;
                        }
                    }
            }
            if (cellID) {
                this.handAnim.active = true;
                this.handAnim.zIndex = 401;
                var worldPosition = this.mapContent
                    .getChildByName(a.toString())
                    .convertToWorldSpaceAR(this.mapContent
                    .getChildByName(a.toString())
                    .getComponent(MainMapItem_1.default).touchNode.position);
                var localPosition = this.mapContent.convertToNodeSpaceAR(worldPosition);
                var targetWorldPos = void 0;
                if (395 == targetCellID || 313 == targetCellID) {
                    targetWorldPos =
                        this.ship.children[0].convertToWorldSpaceAR(this.ship.children[0].getComponent(BuildIconItem_1.default)
                            .itemImg.node.position);
                }
                else {
                    targetWorldPos = this.mapContent
                        .getChildByName(targetCellID.toString())
                        .getComponent(MainMapItem_1.default)
                        .mapBuildNode.children[0].convertToWorldSpaceAR(this.mapContent
                        .getChildByName(targetCellID.toString())
                        .getComponent(MainMapItem_1.default)
                        .mapBuildNode.children[0].getComponent(BuildIconItem_1.default).itemImg.node.position);
                }
                var targetLocalPos = this.mapContent.convertToNodeSpaceAR(targetWorldPos);
                this.handAnim.position = localPosition;
                this.handAnim.stopAllActions();
                this.handAnim.getComponent(HandAnim_1.default).onStop();
                var moveDuration = Math.floor(targetLocalPos.sub(localPosition).mag() / 60);
                this.handAnim.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.7 + 0.1 * moveDuration, cc.v2(targetLocalPos)), cc.moveTo(0.3 + 0.05 * moveDuration, cc.v2(localPosition)))));
            }
        }
    };
    MainMapUI.prototype.guideWaterBarrel = function () {
        this.handAnim.active = true;
        this.handAnim.zIndex = 401;
        var position = this.barrelParentNode.children[this.barrelParentNode.childrenCount - 1].convertToWorldSpaceAR(this.barrelParentNode.children[this.barrelParentNode.childrenCount - 1].children[2].position);
        var localPosition = this.mapContent.convertToNodeSpaceAR(position);
        this.handAnim.position = cc.v3(localPosition.x + 30, localPosition.y);
    };
    MainMapUI.prototype.guideLandBarrel = function () {
        var roleMapData = GameManager_1.gm.data.mapCell_data.role_map_data;
        for (var item in roleMapData) {
            if (11006 == roleMapData[item].itemID) {
                this.handAnim.active = true;
                this.handAnim.zIndex = 401;
                this.handAnim.position = cc.v3(this.mapContent.getChildByName(item).x + 25, this.mapContent.getChildByName(item).y + 88);
                break;
            }
        }
    };
    MainMapUI.prototype.guideHeroToCompse = function (heroID, itemID) {
        this.handAnim.active = true;
        var heroCellID = 0;
        var heroCell = 0;
        if (0 != heroID) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
            if (heroConfig) {
                var heroListForRole = GameManager_1.gm.data.mapCell_data.heroData[heroConfig.occupation];
                for (var heroKey in heroListForRole) {
                    if (heroListForRole[heroKey].itemID == heroID) {
                        heroCellID = heroListForRole[heroKey].cellID;
                        break;
                    }
                }
                if (3e4 <= itemID) {
                    for (var heroKey in heroListForRole) {
                        if (heroListForRole[heroKey].itemID == itemID &&
                            heroListForRole[heroKey].cellID != heroCellID) {
                            heroCell = heroListForRole[heroKey].cellID;
                            break;
                        }
                    }
                }
                else {
                    var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                    var itemListByType = GameManager_1.gm.data.mapCell_data.itemData[itemConfig.type];
                    for (var itemKey in itemListByType) {
                        if (itemListByType[itemKey].itemID == itemID) {
                            heroCell = itemListByType[itemKey].cellID;
                            break;
                        }
                    }
                }
                if (0 != heroCell) {
                    this.handAnim.active = true;
                    this.handAnim.zIndex = 401;
                    var worldStartPos = this.mapContent
                        .getChildByName(heroCellID.toString())
                        .convertToWorldSpaceAR(this.mapContent
                        .getChildByName(heroCellID.toString())
                        .getComponent(MainMapItem_1.default).touchNode.position);
                    var localTargetPos = this.mapContent.convertToNodeSpaceAR(worldStartPos);
                    var targetWorldPos = this.mapContent
                        .getChildByName(heroCell.toString())
                        .convertToWorldSpaceAR(this.mapContent
                        .getChildByName(heroCell.toString())
                        .getComponent(MainMapItem_1.default).touchNode.position);
                    var TargetPos = this.mapContent.convertToNodeSpaceAR(targetWorldPos);
                    this.handAnim.position = localTargetPos;
                    this.handAnim.stopAllActions();
                    this.handAnim.getComponent(HandAnim_1.default).onStop();
                    var distanceFrames = Math.floor(TargetPos.sub(localTargetPos).mag() / 60);
                    this.handAnim.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.7 + 0.1 * distanceFrames, cc.v2(TargetPos)), cc.moveTo(0.3 + 0.05 * distanceFrames, cc.v2(localTargetPos)))));
                }
            }
        }
    };
    MainMapUI.prototype.checkHandAnim = function () {
        var guideID = this.guideID;
        this.handAnim.active = false;
        this.handAnim.stopAllActions();
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            if (0 < guideID && 1 == guideID) {
                var buildeData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(1);
                if (0 == buildeData.buildLvl) {
                    this.guideItemToBuild((a = 16005), buildeData.cellID);
                }
            }
            else if (1 != GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                if (2 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID ||
                    3 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                    var a = 30001, i = 18001;
                    if (1 == GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                        a = 30001;
                        i = 18001;
                    }
                    else if (2 == GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                        i = a = 31001;
                    }
                    this.guideHeroToCompse(a, i);
                    return;
                }
                if (4 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                    if (GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd) {
                        this.guideNewBuildUpSort(Constants_1.BuildTypeEnum.TOWER_TYPE);
                    }
                }
                else if (6 != GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                    if (8 != GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                        if (9 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                            if (GameManager_1.gm.data.mapCell_data.isFirstGetCoin) {
                                this.handAnim.active = true;
                                this.handAnim.zIndex = 401;
                                var cellID = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE].cellID;
                                var position = this.mapContent
                                    .getChildByName(cellID.toString())
                                    .getComponent(MainMapItem_1.default)
                                    .mapBuildNode.children[0].convertToWorldSpaceAR(this.mapContent
                                    .getChildByName(cellID.toString())
                                    .getComponent(MainMapItem_1.default)
                                    .mapBuildNode.children[0].getComponent(BuildIconItem_1.default).productNode.position);
                                var nodeSpace = this.mapContent.convertToNodeSpaceAR(position);
                                this.handAnim.position = cc.v3(nodeSpace.x + 40, nodeSpace.y);
                            }
                            else if (GameManager_1.gm.data.mapCell_data.role_openBarrel_Times < 14) {
                                if (GameManager_1.gm.data.mapCell_data.roleBarrelData
                                    .curBarrelNum <= 0) {
                                    this.guideLandBarrel();
                                }
                            }
                            else if (GameManager_1.gm.data.mapCell_data.role_compose_total_times <
                                9) {
                                a = 16002;
                                if (7 ==
                                    GameManager_1.gm.data.mapCell_data
                                        .role_compose_total_times) {
                                    a = 16003;
                                }
                                else if (8 ==
                                    GameManager_1.gm.data.mapCell_data
                                        .role_compose_total_times) {
                                    a = 13001;
                                }
                                this.guideItemToCompse(a);
                            }
                            else if (9 ==
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                                this.guideNewBuildUpSort(Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE);
                            }
                        }
                        else if (10 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                            if (GameManager_1.gm.data.mapCell_data.role_openBarrel_Times < 20) {
                                if (GameManager_1.gm.data.mapCell_data.roleBarrelData
                                    .curBarrelNum <= 0) {
                                    this.guideLandBarrel();
                                }
                            }
                            else if (GameManager_1.gm.data.mapCell_data.role_compose_total_times <
                                12) {
                                this.guideHeroToCompse((a = 30001), (i = 18001));
                            }
                            else if (12 ==
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                                this.guideNewBuildUpSort(Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE);
                            }
                        }
                        else if (11 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                            if (GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd &&
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times <
                                    12) {
                                this.guideHeroToCompse((a = 30001), (i = 18001));
                            }
                        }
                        else if (12 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID) {
                            if (GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd &&
                                12 ==
                                    GameManager_1.gm.data.mapCell_data
                                        .role_compose_total_times) {
                                this.guideHeroToCompse((a = 31001), (i = 31001));
                            }
                        }
                        else if (15 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID &&
                            GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd) {
                            if (GameManager_1.gm.data.mapCell_data.role_compose_total_times <
                                5) {
                                var o = [16004, 17002];
                                for (var n = 0; n < o.length; n++) {
                                    var r = o[n], s = GameManager_1.gm.data.config_data.getItemCfgByID(r);
                                    if (s &&
                                        GameManager_1.gm.data.mapCell_data.itemData[s.type]) {
                                        for (var c = !1, l = 0; l <
                                            GameManager_1.gm.data.mapCell_data.itemData[s.type].length; l++)
                                            if (GameManager_1.gm.data.mapCell_data.itemData[s.type][l].itemID >= r) {
                                                c = !0;
                                                break;
                                            }
                                        if (!c) {
                                            this.guideItemToCompse(r - 1);
                                            break;
                                        }
                                    }
                                }
                            }
                            else if (5 ==
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                                this.guideNewBuildUpSort(Constants_1.BuildTypeEnum.TOWER_TYPE);
                            }
                        }
                    }
                    else {
                        if (GameManager_1.gm.data.mapCell_data.role_openBarrel_Times < 10) {
                            if (GameManager_1.gm.data.mapCell_data.roleBarrelData
                                .curBarrelNum <= 0) {
                                this.guideLandBarrel();
                            }
                        }
                        else if (GameManager_1.gm.data.mapCell_data.role_compose_total_times < 6) {
                            a = 16002;
                            if (4 ==
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                                a = 16003;
                            }
                            else if (5 ==
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                                a = 15001;
                            }
                            this.guideItemToCompse(a);
                        }
                        else if (6 == GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                            this.guideNewBuildUpSort(Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE);
                        }
                    }
                }
                else {
                    if (GameManager_1.gm.data.mapCell_data.role_openBarrel_Times < 6) {
                        if (0 < this.barrelParentNode.childrenCount) {
                            this.guideWaterBarrel();
                        }
                        else {
                            this.guideLandBarrel();
                        }
                    }
                    else if (6 == GameManager_1.gm.data.mapCell_data.role_openBarrel_Times) {
                        if (3 == GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                            this.guideNewBuildUpSort(Constants_1.BuildTypeEnum.WHARFTAX_TYPE);
                        }
                        else {
                            a = 16003;
                            if (2 ==
                                GameManager_1.gm.data.mapCell_data.role_compose_total_times) {
                                this.guideItemToCompse(a);
                            }
                        }
                    }
                }
            }
            else {
                if (GameManager_1.gm.data.mapCell_data.role_openBarrel_Times < 3) {
                    if (0 < this.barrelParentNode.childrenCount) {
                        GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                            guideid: 2,
                            guidedesc: "2.点击水上木桶",
                        });
                        this.guideWaterBarrel();
                    }
                    else {
                        GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                            guideid: 3,
                            guidedesc: "3.打开木桶",
                        });
                        this.guideLandBarrel();
                    }
                }
            }
        }
    };
    MainMapUI.prototype.guideItemToCompse = function (itemID) {
        var _a, _b, _c, _d, _e;
        this.handAnim.active = true;
        var firstCellID = 0;
        var secondCellID = 0;
        if (itemID === 0)
            return;
        var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
        if (!itemConfig)
            return;
        var itemType = itemConfig.type;
        var itemList = GameManager_1.gm.data.mapCell_data.itemData[itemType];
        for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
            var item = itemList_1[_i];
            if (item.itemID == itemID) {
                firstCellID == 0
                    ? (firstCellID = item.cellID)
                    : secondCellID === 0 && (secondCellID = item.cellID);
            }
        }
        this.handAnim.active = true;
        this.handAnim.zIndex = 401;
        var firstNode = this.mapContent.getChildByName(firstCellID.toString());
        var secondNode = this.mapContent.getChildByName(secondCellID.toString());
        if (firstNode && secondNode) {
            var firstNodePosition = firstNode.convertToWorldSpaceAR(firstNode.getComponent(MainMapItem_1.default).touchNode.position);
            var firstNode2 = (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.convertToNodeSpaceAR(firstNodePosition);
            var secondNodePosition = secondNode.convertToWorldSpaceAR(secondNode.getComponent(MainMapItem_1.default).touchNode.position);
            var secondNode2 = (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.convertToNodeSpaceAR(secondNodePosition);
            this.handAnim.position = new cc.Vec3(firstNode2.x, firstNode2.y);
            (_c = this.handAnim) === null || _c === void 0 ? void 0 : _c.stopAllActions();
            (_d = this.handAnim) === null || _d === void 0 ? void 0 : _d.getComponent(HandAnim_1.default).onStop();
            var distance = Math.floor(secondNode2.sub(firstNode2).mag() / 60);
            (_e = this.handAnim) === null || _e === void 0 ? void 0 : _e.runAction(cc.repeatForever(cc.sequence(cc.moveTo(0.7 + 0.1 * distance, cc.v2(secondNode2)), cc.moveTo(0.3 + 0.05 * distance, cc.v2(firstNode2)))));
        }
    };
    MainMapUI.prototype.guideBuildUpBtn = function (buildID) {
        var _a, _b, _c, _d;
        this.handAnim.active = true;
        this.handAnim.zIndex = 401;
        var position;
        var buildIdentifier = "";
        if (buildID === 395 || buildID === 313) {
            buildIdentifier = "ship";
        }
        else {
            buildIdentifier = buildID.toString();
        }
        if (buildIdentifier === "ship") {
            position = (_a = this.ship) === null || _a === void 0 ? void 0 : _a.children[0].convertToWorldSpaceAR(this.ship.children[0].getComponent(BuildIconItem_1.default).buildStateIcon
                .node.position);
        }
        else {
            position = (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.getChildByName(buildIdentifier).getComponent(MainMapItem_1.default).mapBuildNode.children[0].convertToWorldSpaceAR((_c = this.mapContent) === null || _c === void 0 ? void 0 : _c.getChildByName(buildIdentifier).getComponent(MainMapItem_1.default).mapBuildNode.children[0].getComponent(BuildIconItem_1.default).buildStateIcon.node.position);
        }
        position = (_d = this.mapContent) === null || _d === void 0 ? void 0 : _d.convertToNodeSpaceAR(position);
        this.handAnim.position = position;
    };
    MainMapUI.prototype.guideBuildUpSort = function (buildType) {
        var _a;
        if ((_a = this.roleGuideBuildUpgrade) === null || _a === void 0 ? void 0 : _a.active) {
            if (this.roleGuideBuildUpgrade.children[1].active) {
                this.handAnim.active = true;
                this.handAnim.stopAllActions();
                this.handAnim.zIndex = 401;
                var worldPosition = this.roleGuideBuildUpgrade.children[1].children[2].convertToWorldSpaceAR(cc.Vec3.ZERO);
                worldPosition =
                    this.mapContent.convertToNodeSpaceAR(worldPosition);
                this.handAnim.position = cc.v3(worldPosition.x + 40, worldPosition.y);
            }
            else {
                var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType);
                if (buildData) {
                    this.handAnim.active = true;
                    this.handAnim.zIndex = 401;
                    var materialData = TempData_1.TempData.getBuildGuideMertarilData();
                    for (var materialKey in buildData.metrailData) {
                        var materialExists = false;
                        if (materialData) {
                            for (var r = 0; r < materialData.metrailList.length; r++) {
                                if (parseInt(materialKey) ===
                                    materialData.metrailList[r].itemType) {
                                    materialExists = true;
                                    break;
                                }
                            }
                        }
                        if (!materialExists) {
                            var itemID = parseInt(materialKey) === Constants_1.PropTypeEnum.WOOD_TYPE
                                ? 16004
                                : buildData.metrailData[materialKey].id;
                            itemID =
                                parseInt(materialKey) === Constants_1.PropTypeEnum.IRON_TYPE
                                    ? 17002
                                    : itemID;
                            this.guideItemToBuild(itemID, buildData.cellID);
                            break;
                        }
                    }
                }
            }
        }
        else {
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType);
            if (buildData)
                this.guideBuildUpBtn(buildData.cellID);
        }
    };
    MainMapUI.prototype.guideNewBuildUpSort = function (buildType) {
        var _a;
        if ((_a = this.roleGuideBuildUpgrade) === null || _a === void 0 ? void 0 : _a.active) {
            if (this.roleGuideBuildUpgrade.children[1].active) {
                var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType);
                this.handAnim.active = true;
                this.handAnim.zIndex = 401;
                var materialData = TempData_1.TempData.getBuildGuideMertarilData();
                var materialIndex = 0;
                for (var materialKey in buildData.metrailData) {
                    if (!materialData) {
                        var worldPosition = this.roleGuideBuildMertrailNode.children[materialIndex].children[4].convertToWorldSpaceAR(cc.Vec3.ZERO);
                        var localPosition = this.mapContent.convertToNodeSpaceAR(worldPosition);
                        this.handAnim.position = cc.v3(localPosition.x + 30, localPosition.y);
                        return;
                    }
                    var materialExceeded = false;
                    for (var c = 0; c < materialData.metrailList.length; c++) {
                        if (this._buildMeatril[c].id ===
                            buildData.metrailData[materialKey].id &&
                            TempData_1.TempData.getBuildGuideMertarilNumByID(buildData.buildID, this._buildMeatril[c].id) >= this._buildMeatril[c].max) {
                            materialExceeded = true;
                            break;
                        }
                    }
                    if (!materialExceeded) {
                        var worldPosition = this.roleGuideBuildMertrailNode.children[materialIndex].children[4].convertToWorldSpaceAR(cc.Vec3.ZERO);
                        var localPosition = this.mapContent.convertToNodeSpaceAR(worldPosition);
                        this.handAnim.position = cc.v3(localPosition.x + 30, localPosition.y);
                        return;
                    }
                    materialIndex++;
                }
                this.handAnim.active = true;
                this.handAnim.stopAllActions();
                this.handAnim.zIndex = 401;
                var upgradeButtonWorldPosition = this.roleGuideUpgradeBtn.convertToWorldSpaceAR(cc.Vec3.ZERO);
                var upgradeButtonLocalPosition = this.mapContent.convertToNodeSpaceAR(upgradeButtonWorldPosition);
                this.handAnim.position = cc.v3(upgradeButtonLocalPosition.x + 40, upgradeButtonLocalPosition.y);
            }
        }
        else if (GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType)) {
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType);
            this.guideBuildUpBtn(buildData.cellID);
        }
    };
    MainMapUI.prototype.onClickGuideOneKeyAddItem = function (event, index) {
        var targetIndex = parseInt(index);
        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(this._buildID);
        if (!buildConfig)
            return;
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildConfig.buildType);
        var currentIndex = 0;
        for (var materialKey in buildData.metrailData) {
            if (currentIndex === targetIndex) {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(buildData.metrailData[materialKey].id);
                if (itemConfig) {
                    GameManager_1.gm.data.mapCell_data.onekeyGetGuideAllMertrail(buildConfig.buildType, itemConfig.type);
                }
                break;
            }
            currentIndex++;
        }
    };
    MainMapUI.prototype.showSpiritLock = function () {
        this.treeLock.active = true;
        this.treeLock.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 3;
        var cell = this.mapContent.getChildByName("223");
        this.treeLock.y = cell.y + 188;
        this.treeLock.x = cell.x + 5;
        this.treeLock.scale = 1 - 0.5 * (this.mapContent.scale - 1);
    };
    MainMapUI.prototype.showHeroUnlockAni = function (num) {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.NEWHEROANIM.key, num);
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.NEWHEROANIM);
    };
    MainMapUI.prototype.showCavesLock = function () {
        this.cavesLock.active = true;
        this.cavesLock.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 3;
        var node = this.mapContent.getChildByName("143");
        this.cavesLock.y = node.y + 188;
        this.cavesLock.x = node.x + 5;
        this.cavesLock.scale = 1 - 0.5 * (this.mapContent.scale - 1);
    };
    MainMapUI.prototype.playUnLockMainTowerMoveMap = function (towerName) {
        var _this = this;
        var _a, _b, _c;
        this.mask.active = true;
        var targetNode = (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.getChildByName(towerName);
        if (!targetNode)
            return;
        var targetPosition = targetNode.position;
        (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.stopAllActions();
        (_c = this.mapContent) === null || _c === void 0 ? void 0 : _c.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1.2), cc.moveTo(2, cc.v2(360 - targetPosition.x, -targetPosition.y))), cc.delayTime(1), cc.callFunc(function () {
            _this.mask.active = false;
        })));
    };
    MainMapUI.prototype.playLockSenseMoveMapToFun = function () {
        var _this = this;
        var _a, _b;
        this.mask.active = true;
        var positions = [
            this.mapContent.getChildByName("223").position,
            this.mapContent.getChildByName("215").position,
            this.mapContent.getChildByName("9").position,
            this.mapContent.getChildByName("1").position,
            this.mapContent.getChildByName("116").position,
        ];
        (_a = this.mapContent) === null || _a === void 0 ? void 0 : _a.stopAllActions();
        (_b = this.mapContent) === null || _b === void 0 ? void 0 : _b.runAction(cc.sequence(cc.spawn(cc.scaleTo(2, 1.2), cc.moveTo(2, cc.v2(360 - positions[0].x, -positions[0].y))), cc.delayTime(2), cc.moveTo(2, cc.v2(360 - positions[1].x, -positions[1].y)), cc.delayTime(2), cc.moveTo(2, cc.v2(360 - positions[2].x, -positions[2].y)), cc.delayTime(2), cc.moveTo(2, cc.v2(360 - positions[3].x, -positions[3].y)), cc.delayTime(2), cc.moveTo(2, cc.v2(360 - positions[4].x, -positions[4].y)), cc.callFunc(function () {
            _this.mask.active = false;
        })));
    };
    MainMapUI.prototype.setLockSenceMoveMap = function (elementName, duration) {
        var _this = this;
        if (duration === void 0) { duration = 1.5; }
        this.mask.active = true;
        var targetPosition = this.mapContent.getChildByName(elementName).position;
        this.mapContent.stopAllActions();
        this.mapContent.runAction(cc.sequence(cc.spawn(cc.scaleTo(1, duration), cc.moveTo(1, cc.v2(-targetPosition.x * duration + 360, -targetPosition.y * duration))), cc.callFunc(function () {
            _this.mask.active = false;
            _this.handAnim.active = true;
            _this.handAnim.zIndex = 401;
            var nodePosition = _this.mapContent
                .getChildByName(elementName)
                .getComponent(MainMapItem_1.default)
                .touchNode.parent.convertToWorldSpaceAR(_this.mapContent
                .getChildByName(elementName)
                .getComponent(MainMapItem_1.default).touchNode.position);
            var position = _this.mapContent.convertToNodeSpaceAR(nodePosition);
            _this.handAnim.position = position;
            GameManager_1.gm.ui.emit("open_special_fun", parseInt(elementName));
            if (42 == parseInt(elementName)) {
                GameManager_1.gm.ui.mapMainUI.roleBuildAnimNode[0].active = false;
            }
            else if (27 == parseInt(elementName)) {
                GameManager_1.gm.ui.mapMainUI.roleBuildAnimNode[1].active = false;
            }
        })));
        if (this.roleGuideBuildUpgrade.active) {
            this.roleGuideBuildUpgrade.runAction(cc.scaleTo(1, 1 - 0.5 * (duration - 1)));
        }
        if (this.roleBuildUpgrade.active) {
            this.roleBuildUpgrade.runAction(cc.scaleTo(1, 1 - 0.5 * (duration - 1)));
        }
    };
    MainMapUI.prototype.refreshRedBtnBook = function (active) {
        if (active === void 0) { active = null; }
        var newT = active === undefined ? null : active;
        if (newT === null) {
            newT = GameManager_1.gm.data.mapCell_data.checkBookItemHaveUnlockReward();
        }
        this.red_btn_book.active = newT;
    };
    MainMapUI.prototype.test = function () {
        var mapCellCfg = GameManager_1.gm.data.config_data.getMapCellCfg();
        var quyu = "let quyu = [";
        var plantID = "let plantID = [";
        var landImgID = "let landImgID = [";
        var landYOffset = "let landYOffset = [";
        var plantXOffset = "let plantXOffset = [";
        var plantYOffset = "let plantYOffset = [";
        for (var s = 0; s < mapCellCfg.length; s++) {
            quyu += mapCellCfg[s].areaID + ",";
            plantID += mapCellCfg[s].plantID + ",";
            landImgID += mapCellCfg[s].landImgID + ",";
            landYOffset += mapCellCfg[s].landYOffset + ",";
            plantXOffset += mapCellCfg[s].plantXOffset + ",";
            plantYOffset += mapCellCfg[s].plantYOffset + ",";
        }
        quyu += "];";
        plantID += "];";
        landImgID += "];";
        landYOffset += "];";
        plantXOffset += "];";
        plantYOffset += "];";
        console.log(quyu);
        console.log(plantID);
        console.log(landImgID);
        console.log(landYOffset);
        console.log(plantXOffset);
        console.log(plantYOffset);
    };
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "mapContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainMapUI.prototype, "mapItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "task_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "task_main_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "ladder_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "sign_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "guide_gift_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "vip_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "super_recruit_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "lucky_wheel_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "record_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "more_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "shop_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "mail_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "add_desktop_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "nextCompTimes", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainMapUI.prototype, "propItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainMapUI.prototype, "buildItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "caseOceanNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "moveItemNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "roleBuildUpgrade", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "barrelNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "ship", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "roleGuideBuildUpgrade", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "roleGuideBuildUpgradeBg", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "roleGuideUpgradeBtn", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "barrelParentNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "roleGuideBuildMertrailNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "buildUpAnim", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "mask", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "composeAnim", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "diamond_icon_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "gold_icon_node", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "handAnim", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "roleBuildAnimNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "mapUI", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "treeLock", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "cavesLock", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "red_btn_book", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "giftBar", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "specialGiftBar", void 0);
    __decorate([
        property(cc.Node)
    ], MainMapUI.prototype, "lockAreaCloudList", void 0);
    __decorate([
        property(AutoCompose_1.default)
    ], MainMapUI.prototype, "autoCompose", void 0);
    MainMapUI = __decorate([
        ccclass
    ], MainMapUI);
    return MainMapUI;
}(GameModule_1.GameModule));
exports.default = MainMapUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1haW5NYXBVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBbUM7QUFDbkMsMkNBQTBDO0FBQzFDLDJEQUEwRDtBQUUxRCx5Q0FRcUI7QUFDckIseUNBQXdDO0FBQ3hDLGlEQUFnRDtBQUNoRCx5Q0FBd0M7QUFDeEMsNkNBQXdDO0FBQ3hDLHVDQUErQztBQUMvQywrQ0FBOEM7QUFDOUMsNkNBQTRDO0FBQzVDLHVDQUFzQztBQUN0Qyx5Q0FBd0M7QUFDeEMseUNBQXdDO0FBQ3hDLG1EQUFrRDtBQUNsRCxxREFBb0Q7QUFDcEQsbURBQWlEO0FBQ2pELGlDQUFnQztBQUNoQyx1Q0FBd0M7QUFDeEMscURBQWdEO0FBQ2hELHVDQUFrQztBQUNsQyx5Q0FBd0M7QUFDeEMscURBQW9EO0FBQ3BELEVBQUU7QUFDRiw2Q0FBd0M7QUFDeEMsdUNBQWtDO0FBQ2xDLHFDQUFnQztBQUNoQyxpREFBNEM7QUFDNUMseUNBQW9DO0FBQ3BDLDZDQUF3QztBQUN4QyxpREFBNEM7QUFVdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVU7SUEySjdDO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBM0pNLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxtQkFBYSxHQUFxQixJQUFJLENBQUM7UUFHdEMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFHakMsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBR3ZDLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUdsQyxlQUFTLEdBQW1CLElBQUksQ0FBQztRQUdqQyxxQkFBZSxHQUFtQixJQUFJLENBQUM7UUFHdkMsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFHaEMsd0JBQWtCLEdBQW1CLElBQUksQ0FBQztRQUcxQyxz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RUFBRSxDQUFDLElBQUksQ0FBQztnREFDdUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDOEI7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDMkI7SUFHN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDMkI7SUFHL0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDNEI7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDMkI7SUFHN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDMEI7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDOEI7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDdUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDaUI7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDa0M7SUFHcEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDcUM7SUFHdkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDaUM7SUFHbkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDOEI7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpRUFDd0M7SUFHMUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDeUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDa0I7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDeUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDOEI7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDMkI7SUFHN0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDcUI7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDOEI7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDbUI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDc0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDdUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDMEI7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDcUI7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDNEI7SUFHOUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDK0I7SUFHakQ7UUFEQyxRQUFRLENBQUMscUJBQVcsQ0FBQztrREFDd0I7SUFoSTdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0Ftb0c3QjtJQUFELGdCQUFDO0NBbm9HRCxBQW1vR0MsQ0Fub0dzQyx1QkFBVSxHQW1vR2hEO2tCQW5vR29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnbSB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCB7IE12Y0V2ZW50RGlzcGF0Y2hlciB9IGZyb20gXCIuL012Y0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uLy4uL2J1eS9zY3JpcHRzL0l0ZW1cIjtcclxuaW1wb3J0IHtcclxuICAgIEJ1aWxkVHlwZUVudW0sXHJcbiAgICBTcGVjaWFsRW51bSxcclxuICAgIEJ1bmRsZU5hbWUsXHJcbiAgICBJdGVtVHlwZUVudW0sXHJcbiAgICBQcm9wVHlwZUVudW0sXHJcbiAgICBSZXdhcmRJZEVudW0sXHJcbiAgICBTZXRJdGVtTnVtRW51bSxcclxufSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVGFza0VudHJ5IH0gZnJvbSBcIi4vVGFza0VudHJ5XCI7XHJcbmltcG9ydCB7IFRhc2tNYWluRW50cnkgfSBmcm9tIFwiLi9UYXNrTWFpbkVudHJ5XCI7XHJcbmltcG9ydCB7IERhdGFFdmVudCB9IGZyb20gXCIuL0RhdGFFdmVudFwiO1xyXG5pbXBvcnQgQXV0b0NvbXBvc2UgZnJvbSBcIi4vQXV0b0NvbXBvc2VcIjtcclxuaW1wb3J0IHsgVGFza0NvbmRpdGlvblR5cGUgfSBmcm9tIFwiLi9UYXNrRGF0YVwiO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tIFwiLi9Ob2RlUG9vbEl0ZW1cIjtcclxuaW1wb3J0IHsgTGFkZGVyRW50cnkgfSBmcm9tIFwiLi9MYWRkZXJFbnRyeVwiO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gXCIuL1RlbXBEYXRhXCI7XHJcbmltcG9ydCB7IFNpZ25FbnRyeSB9IGZyb20gXCIuL1NpZ25FbnRyeVwiO1xyXG5pbXBvcnQgeyBNYWlsRW50cnkgfSBmcm9tIFwiLi9NYWlsRW50cnlcIjtcclxuaW1wb3J0IHsgR3VpZGVHaWZ0RW50cnkgfSBmcm9tIFwiLi9HdWlkZUdpZnRFbnRyeVwiO1xyXG5pbXBvcnQgeyBBZGREZXNrdG9wRW50cnkgfSBmcm9tIFwiLi9BZGREZXNrdG9wRW50cnlcIjtcclxuaW1wb3J0IHsgTWFwSXRlbURhdGFWTyB9IGZyb20gXCIuL01hcENlbGxDZmdEYXRhXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gXCIuL05ldFV0aWxzXCI7XHJcbmltcG9ydCBXYXRlckJhcnJlbEl0ZW0gZnJvbSBcIi4vV2F0ZXJCYXJyZWxJdGVtXCI7XHJcbmltcG9ydCBIYW5kQW5pbSBmcm9tIFwiLi9IYW5kQW5pbVwiO1xyXG5pbXBvcnQgeyBNb3JlRW50cnkgfSBmcm9tIFwiLi9Nb3JlRW50cnlcIjtcclxuaW1wb3J0IHsgTWFwQnVpbGRVcGdyYWRlIH0gZnJvbSBcIi4vTWFwQnVpbGRVcGdyYWRlXCI7XHJcbi8vXHJcbmltcG9ydCBTcGVjaWFsR2lmdCBmcm9tIFwiLi9TcGVjaWFsR2lmdFwiO1xyXG5pbXBvcnQgU2hvd0dpZnQgZnJvbSBcIi4vU2hvd0dpZnRcIjtcclxuaW1wb3J0IFNoaXBNZ3IgZnJvbSBcIi4vU2hpcE1nclwiO1xyXG5pbXBvcnQgTG9ja0Nsb3VkQXJlYSBmcm9tIFwiLi9Mb2NrQ2xvdWRBcmVhXCI7XHJcbmltcG9ydCBCYXJyZWxNZ3IgZnJvbSBcIi4vQmFycmVsTWdyXCI7XHJcbmltcG9ydCBNYWluTWFwSXRlbSBmcm9tIFwiLi9NYWluTWFwSXRlbVwiO1xyXG5pbXBvcnQgQnVpbGRJY29uSXRlbSBmcm9tIFwiLi9CdWlsZEljb25JdGVtXCI7XHJcbmltcG9ydCB7IE1hcENlbGwgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbWFwY2VsbFwiO1xyXG5pbXBvcnQgU2lnbiBmcm9tIFwiLi4vLi4vc2lnbi9zY3JpcHRzL1NpZ25cIjtcclxuaW1wb3J0IHsgRXZlbnRTY3JpcHRNYW5hZ2VyIH0gZnJvbSBcIi4vRXZlbnRTY3JpcHRNYW5hZ2VyXCI7XHJcblxyXG5pbnRlcmZhY2UgVHlwZUJ1aWxkTWVhdHJpbCB7XHJcbiAgICBtYXg6IG51bWJlcjtcclxuICAgIGlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWFwVUkgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIG1hcENvbnRlbnQ6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHVibGljIG1hcEl0ZW1QcmVmYWI6IGNjLlByZWZhYiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB0YXNrX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdGFza19tYWluX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsYWRkZXJfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzaWduX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZ3VpZGVfZ2lmdF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHZpcF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHN1cGVyX3JlY3J1aXRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsdWNreV93aGVlbF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJlY29yZF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1vcmVfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzaG9wX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFpbF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGFkZF9kZXNrdG9wX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbmV4dENvbXBUaW1lczogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgcHJvcEl0ZW1QcmVmYWI6IGNjLlByZWZhYiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwdWJsaWMgYnVpbGRJdGVtUHJlZmFiOiBjYy5QcmVmYWIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2FzZU9jZWFuTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBtb3ZlSXRlbU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcm9sZUJ1aWxkVXBncmFkZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIGJhcnJlbE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBzaGlwOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgcm9sZUd1aWRlQnVpbGRVcGdyYWRlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJvbGVHdWlkZUJ1aWxkVXBncmFkZUJnOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJvbGVHdWlkZVVwZ3JhZGVCdG46IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFycmVsUGFyZW50Tm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByb2xlR3VpZGVCdWlsZE1lcnRyYWlsTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBidWlsZFVwQW5pbTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBtYXNrOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNvbXBvc2VBbmltOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgZGlhbW9uZF9pY29uX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBnb2xkX2ljb25fbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIGhhbmRBbmltOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwdWJsaWMgcm9sZUJ1aWxkQW5pbU5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFwVUk6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdHJlZUxvY2s6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgY2F2ZXNMb2NrOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJlZF9idG5fYm9vazogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBnaWZ0QmFyOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNwZWNpYWxHaWZ0QmFyOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGxvY2tBcmVhQ2xvdWRMaXN0OiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KEF1dG9Db21wb3NlKVxyXG4gICAgcHVibGljIGF1dG9Db21wb3NlOiBBdXRvQ29tcG9zZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX21hcENmZ0xpc3Q6IE1hcENlbGxbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfcm93OiBudW1iZXIgPSAyMDtcclxuICAgIHByaXZhdGUgX2NvbDogbnVtYmVyID0gMjI7XHJcbiAgICBwcml2YXRlIF9tYXBEYXRhTGlzdDogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX3dpZHRoSGFsZjogbnVtYmVyID0gNjA7XHJcbiAgICBwcml2YXRlIF9oZWlnaHRIYWxmOiBudW1iZXIgPSA5NTtcclxuICAgIHByaXZhdGUgX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkOiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgcHJpdmF0ZSBfdG91Y2hfcG9zaXRpb246IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk87XHJcbiAgICBwcml2YXRlIGlzU2hvd1NpZ246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNmaWdodEVuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBtb3ZlVG9Qb3M6IGNjLlZlYzIgPSBuZXcgY2MuVmVjMigwLCAwKTtcclxuICAgIHByaXZhdGUgaXNNb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZm9sbG93U3BlZWQ6IG51bWJlciA9IDIwMDtcclxuICAgIHByaXZhdGUgX21hcF9zaXplOiBjYy5WZWMyID0gbmV3IGNjLlZlYzIoMTUwMCwgMTUwMCk7XHJcbiAgICBwcml2YXRlIGRlbGF5VGltZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgY3VyVGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGlzQmVnaW5EZWxheVRpbWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZ3VpZGVJRDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgZ3VpZGVTY2FsZU5vZGU6IC8qIGNjLkNvbXBvbmVudCB8IG51bGwgPSBudWxsOyAqLyBCdWlsZEljb25JdGVtIHwgbnVsbCA9XHJcbiAgICAgICAgbnVsbDtcclxuICAgIHByaXZhdGUgX25leHRPcGVuQ2VsbDogYW55IHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9idWlsZElEOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfYnVpbGRNZWF0cmlsOiBUeXBlQnVpbGRNZWF0cmlsW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2lzTG9ja01vdmVNYXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QnVpbGRVcGdyYWRlQ2IodDogeyBkYXRhOiBudW1iZXIgfSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVt0LmRhdGFdO1xyXG4gICAgICAgIE12Y0V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgICAgICBEYXRhRXZlbnQuR1VJREVORVdFUkdVSURFLFxyXG4gICAgICAgICAgICBuZXcgRGF0YUV2ZW50KFxyXG4gICAgICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFX0NMSUNLX0JVSUxEX1VQR1JBRV9QT1NfU1VDLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPy5nZXRDaGlsZEJ5TmFtZShidWlsZERhdGEuY2VsbElELnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChNYWluTWFwSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAubWFwQnVpbGROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRJY29uSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICkuYnVpbGRTdGF0ZUljb24ubm9kZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J1aWxkVXBncmFkZS5iaW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLmJ1aWxkSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLmNlbGxJRFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJhcnJlbENiKCk6IHZvaWQge1xyXG4gICAgICAgIE12Y0V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgICAgICBEYXRhRXZlbnQuR1VJREVORVdFUkdVSURFLFxyXG4gICAgICAgICAgICBuZXcgRGF0YUV2ZW50KFxyXG4gICAgICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFX0NMSUNLX0JBUlJFTF9QT1NfU1VDLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJyZWxOb2RlLmdldENvbXBvbmVudChCYXJyZWxNZ3IpLmd1aWRlTm9kZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFycmVsTm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoQmFycmVsTWdyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrQnV5LmJpbmQodGhpcy5iYXJyZWxOb2RlLmdldENvbXBvbmVudChCYXJyZWxNZ3IpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJ1aWxkVXBDYigpOiB2b2lkIHtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERSxcclxuICAgICAgICAgICAgbmV3IERhdGFFdmVudChcclxuICAgICAgICAgICAgICAgIERhdGFFdmVudC5HVUlERV9DTElDS19CVUlMRF9VUF9QT1NfU1VDLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHdWlkZVVwbHZsLmJpbmQodGhpcylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBndWlkZURlbEl0ZW0obnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtTm9kZSA9IHRoaXMubWFwQ29udGVudD8uZ2V0Q2hpbGRCeU5hbWUobnVtLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGlmIChpdGVtTm9kZSkge1xyXG4gICAgICAgICAgICBpdGVtTm9kZS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLmRlbEl0ZW1Ob2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2xpY2tHb0ZpZ2h0Q2IoKTogdm9pZCB7XHJcbiAgICAgICAgTXZjRXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERU5FV0VSR1VJREUsXHJcbiAgICAgICAgICAgIG5ldyBEYXRhRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBEYXRhRXZlbnQuR1VJREVfQ0xJQ0tfQkVHSU5fRklHSFRfUE9TX1NVQyxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcD8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmaWdodEJ0blwiXHJcbiAgICAgICAgICAgICAgICApLmNoaWxkcmVuWzFdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwPy5jaGlsZHJlblswXVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoU2hpcE1ncilcclxuICAgICAgICAgICAgICAgICAgICAub25DbGlja1NoaXAuYmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChTaGlwTWdyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJldmVuZ2Uoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzaGlwQ29tcG9uZW50ID0gdGhpcy5zaGlwLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChTaGlwTWdyKTtcclxuICAgICAgICBpZiAoc2hpcENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBzaGlwQ29tcG9uZW50LnJldmVuZ2Uoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwdXRBbGxJdGVtVG9NYXBBdXRvKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zVG9QdXQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5wdXRBbGxJdGVtVG9NYXBDZWxsKCk7XHJcbiAgICAgICAgZm9yICg7IDAgPCBnbS5kYXRhLm1hcENlbGxfZGF0YS5fbmVlZFJlZnJlc2hDZWxsTGlzdC5sZW5ndGg7ICkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLl9uZWVkUmVmcmVzaENlbGxMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIDAgPCB0aGlzLnNoaXAuY2hpbGRyZW5Db3VudCAmJlxyXG4gICAgICAgICAgICB0aGlzLnNoaXAuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFNoaXBNZ3IpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpcC5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoU2hpcE1ncikucmVmcmVzaEl0ZW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgaXRlbXNUb1B1dC5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwic2V0X25ld19pdGVtX2FscGhhXCIsIGl0ZW1zVG9QdXRbYV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0dpZnRCYXIoaXRlbUlkOiBudW1iZXIsIGNlbGxJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoaXRlbUlkKTtcclxuICAgICAgICBpZiAoIWl0ZW1Db25maWcpIHJldHVybjtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGl0ZW1Db25maWcudHlwZSA9PSAxMyB8fFxyXG4gICAgICAgICAgICBpdGVtQ29uZmlnLnR5cGUgPT0gMTQgfHxcclxuICAgICAgICAgICAgaXRlbUNvbmZpZy50eXBlID09IDE5XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbEdpZnRCYXIuc2NhbGUgPSAxIC0gMC41ICogKHRoaXMubWFwQ29udGVudC5zY2FsZSAtIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zcGVjaWFsR2lmdEJhcj8uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxHaWZ0QmFyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxHaWZ0QmFyXHJcbiAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFNwZWNpYWxHaWZ0KVxyXG4gICAgICAgICAgICAgICAgLmluaXREYXRhKGl0ZW1JZCwgY2VsbElkKTtcclxuICAgICAgICAgICAgdGhpcy5zcGVjaWFsR2lmdEJhci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdEJhci5zY2FsZSA9IDEgLSAwLjUgKiAodGhpcy5tYXBDb250ZW50LnNjYWxlIC0gMSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdpZnRCYXI/LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0QmFyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdpZnRCYXIuZ2V0Q29tcG9uZW50KFNob3dHaWZ0KS5pbml0RGF0YShpdGVtSWQsIGNlbGxJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdEJhci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvb2tpZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIik7XHJcbiAgICAgICAgZm9yIChsZXQgY29va2llIG9mIGNvb2tpZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY29va2llLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gbmFtZSkgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlbGV0ZUNvb2tpZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT07IGV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBVVEM7IHBhdGg9L2A7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1BheW1lbnRTdGF0dXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmVkUHJpY2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJld2FyZF9wcmljZVwiKTtcclxuICAgICAgICBjb25zdCBwYXltZW50U3RhdHVzID0gdGhpcy5nZXRDb29raWUoXCJwYXltZW50X3N0YXR1c1wiKTtcclxuICAgICAgICBpZiAocGF5bWVudFN0YXR1cyA9PT0gXCJzdWNjZXNzXCIgJiYgc3RvcmVkUHJpY2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGFuaCB0b8OhbiB0aMOgbmggY8O0bmchISEhIVwiKTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVDb29raWUoXCJwYXltZW50X3N0YXR1c1wiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKHN0b3JlZFByaWNlKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJyZXdhcmRfcHJpY2VcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZERhdGEpO1xyXG5cclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgzMyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBwYXJzZWREYXRhO1xyXG4gICAgICAgICAgICBjb25zdCByZXdhcmRJZHM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IHJld2FyZE51bXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnJld2FyZF9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gZGF0YS5yZXdhcmRfYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJZHMucHVzaChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZE51bXMucHVzaChyZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmQucmV3YXJkX2lkID49IDIzMDAxICYmIHJld2FyZC5yZXdhcmRfaWQgPD0gMjMwOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yZWVsVW5sY29rSGVybyhyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkLnJld2FyZF9pZCA9PSBSZXdhcmRJZEVudW0uR09MRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmQucmV3YXJkX251bSAqIG11bHRpcGxpZXJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJld2FyZElkRW51bS5HT0xELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTylcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmQucmV3YXJkX2lkID09IFJld2FyZElkRW51bS5ESUFNT05EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZURpYW1vbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZC5yZXdhcmRfbnVtICogbXVsdGlwbGllclxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV3YXJkSWRFbnVtLkRJQU1PTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC5yZXdhcmRfaWQgPT0gUmV3YXJkSWRFbnVtLkJBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkLnJld2FyZF9udW0gKiBtdWx0aXBsaWVyXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUlkczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJld2FyZC5yZXdhcmRfbnVtICogbXVsdGlwbGllcjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JZHMucHVzaChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkV2FyZUhvdXNlTGlzdChpdGVtSWRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwge1xyXG4gICAgICAgICAgICAgICAgaWRMaXN0OiByZXdhcmRJZHMsXHJcbiAgICAgICAgICAgICAgICBudW1MaXN0OiByZXdhcmROdW1zLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICBkYXRhLnN0YXRlID0gbXVsdGlwbGllciA9PSAxID8gMiA6IDM7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuc2lnbl9kYXRhLnNpZ25fc3RhdGUgPSBkYXRhLnN0YXRlO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnNpZ25fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBDZmdMaXN0ID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRNYXBDZWxsQ2ZnKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TWFwKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1BheW1lbnRTdGF0dXMoKTtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3B1cF9vZmZsaW5lX29wKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBfc2lnbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5NYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3B1cF9zaWduKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dTaWduID0gMCA9PSBnbS5kYXRhLnNpZ25fZGF0YS5zaWduX3N0YXRlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvd1NpZ24pIHtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dTaWduID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGwgPSAocGFyYW06IFNpZ24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbSA9PSBnbS51aS5zaWduKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkub2ZmKGdtLnVpLk1PRFVMRV9ISURFLCBjYWxsLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnbS51aS5vbihnbS51aS5NT0RVTEVfSElERSwgY2FsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LlNpZ24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9wdXBfb2ZmbGluZV9vcChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChUZW1wRGF0YS5pc1Nob3dPZmZsaW5lKSB7XHJcbiAgICAgICAgICAgIFRlbXBEYXRhLmlzU2hvd09mZmxpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgY2FsbCA9IChwYXJhbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtID09IGdtLnVpLm9mZmxpbmVfb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5vZmYoZ20udWkuTU9EVUxFX0hJREUsIGNhbGwsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGdtLnVpLm9uKGdtLnVpLk1PRFVMRV9ISURFLCBjYWxsLCB0aGlzKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuT0ZGTElORU9QKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZExpc3RlbmVyKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaXRlbV9tb3ZlXCIsIHRoaXMub25fbW92ZV9pdGVtX21vdmUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiaXRlbV9tb3ZlX2VuZFwiLCB0aGlzLm9uX21vdmVfaXRlbV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCB0aGlzLm9uX21vdmVfaXRlbV9yZWZyZXNoLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcIml0ZW1fdW5sb2NrX3JlZnJlc2hcIiwgdGhpcy5vbl9pdGVtX3VubG9ja19yZWZyZXNoLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcImNvbXBvc3RpbWVDaGFuZ2VcIiwgdGhpcy5zaG93TmV4dENlbGxOb2RlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInVuTG9ja05ld0FyZWFcIiwgdGhpcy51bkxvY2tOZXdBcmVhLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcImJ1aWxkX3VwZ3JhZGVcIiwgdGhpcy5yZWZyZXNoQnVpbGRJdGVtLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcIml0ZW1fY29tcG9zZV90aW1lX2NoYW5nZVwiLCB0aGlzLmNvbXBvc2VUaW1lc0NoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub24oXCJidWlsZF9tZXRhcmFpbF9jaGFuZ2VcIiwgdGhpcy5zaG93QnVpbGRNZXJ0YXJpbEZ1bGwsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiZ3VpZGVfZGVsX2l0ZW1cIiwgdGhpcy5ndWlkZURlbEl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9uKFwiYm9va1JlZFN0YXR1c1wiLCB0aGlzLnJlZnJlc2hSZWRCdG5Cb29rLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vbihcInNoaXBfZ29vZHNfY2hhbmdlXCIsIHRoaXMucHV0QWxsSXRlbVRvTWFwQXV0bywgdGhpcyk7XHJcblxyXG4gICAgICAgIE12Y0V2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZShcclxuICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERVxyXG4gICAgICAgICkuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFX0NMSUNLX0JVSUxEX1VQR1JBRV9QT1MsXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QnVpbGRVcGdyYWRlQ2IsXHJcbiAgICAgICAgICAgIHRoaXNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERU5FV0VSR1VJREVcclxuICAgICAgICApLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERV9DTElDS19CQVJSRUxfUE9TLFxyXG4gICAgICAgICAgICB0aGlzLmdldEJhcnJlbENiLFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgTXZjRXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKFxyXG4gICAgICAgICAgICBEYXRhRXZlbnQuR1VJREVORVdFUkdVSURFXHJcbiAgICAgICAgKS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICBEYXRhRXZlbnQuR1VJREVfQ0xJQ0tfQlVJTERfVVBfUE9TLFxyXG4gICAgICAgICAgICB0aGlzLmdldEJ1aWxkVXBDYixcclxuICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIE12Y0V2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZShcclxuICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFTkVXRVJHVUlERVxyXG4gICAgICAgICkuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgRGF0YUV2ZW50LkdVSURFX0NMSUNLX0JFR0lOX0ZJR0hUX1BPUyxcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGlja0dvRmlnaHRDYixcclxuICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5vbihcclxuICAgICAgICAgICAgY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYucm9sZUJ1aWxkVXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0TWFwVWlTaG93KHRydWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFxyXG4gICAgICAgICAgICBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLFxyXG4gICAgICAgICAgICAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5nZXRUb3VjaGVzKCkubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG91Y2gxID0gZXZlbnQuZ2V0VG91Y2hlcygpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3VjaDIgPSBldmVudC5nZXRUb3VjaGVzKClbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YTEgPSB0b3VjaDEuZ2V0RGVsdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGEyID0gdG91Y2gyLmdldERlbHRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvczEgPSB0b3VjaDEuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zMiA9IHRvdWNoMi5nZXRMb2NhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlkUG9pbnQgPSBjYy52MyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvczEuYWRkKHBvczIpLm11bHRpcGx5U2NhbGFyKDAuNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwUG9pbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXBDb250ZW50Py5jb252ZXJ0VG9Ob2RlU3BhY2VBUihtaWRQb2ludCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHBvczEuc3ViKHBvczIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IGRlbHRhMS5zdWIoZGVsdGEyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZS54KSA+IE1hdGguYWJzKGRpc3RhbmNlLnkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChkaXN0YW5jZS54ICsgZGVsdGEueCkgLyBkaXN0YW5jZS54KSAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXBDb250ZW50LnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZGlzdGFuY2UueSArIGRlbHRhLnkpIC8gZGlzdGFuY2UueSkgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWFwQ29udGVudC5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2FsZURpZmYgPSBzY2FsZSAtIHNlbGYubWFwQ29udGVudC5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXBDb250ZW50LnNjYWxlID0gc2NhbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3MgPSBtYXBQb2ludC5tdWx0aXBseVNjYWxhcihzY2FsZURpZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1hcENvbnRlbnQucG9zaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXBDb250ZW50Py5wb3NpdGlvbi5zdWIobmV3UG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZUxvY2suc2NhbGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMSAtIDAuNSAqIChzZWxmLm1hcENvbnRlbnQuc2NhbGUgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYXZlc0xvY2suc2NhbGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMSAtIDAuNSAqIChzZWxmLm1hcENvbnRlbnQuc2NhbGUgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5faXNMb2NrTW92ZU1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXBDb250ZW50LnggKz0gZXZlbnQuZ2V0RGVsdGEoKS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tYXBDb250ZW50LnkgKz0gZXZlbnQuZ2V0RGVsdGEoKS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZFVwQW5pbT8uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oXHJcbiAgICAgICAgICAgIGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJidWlsZF91cGdyYWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVpbGRDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZElEXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZENmZy5idWlsZFR5cGVcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWlsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFVwQW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRDZmcuYnVpbGRUeXBlID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LmdldENoaWxkQnlOYW1lKGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRCdWlsZEltZ09wYWNpdHkoMjU1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tTZW5jZU1vdmVNYXAoMTE2LCAxLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWFwVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb21wb3NlQW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm9sZUJ1aWxkVXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkVXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFwQ29udGVudC5zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXBDb250ZW50LnBvc2l0aW9uID0gY2MudjMoLTk0LCA0OTAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzZmlnaHRFbmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TWFwVUkoKTtcclxuICAgICAgICB0aGlzLnNob3dVbkNvbXBvc2VDZWxsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRCYXJyZWxOb2RlQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0U2hpcCgpO1xyXG4gICAgICAgIHRoaXMubG9ja01haW5VSSgpO1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuZmlnaHRfcmVzdWx0X2RhdGEgJiZcclxuICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5maWdodF9yZXN1bHRfZGF0YS5yZXN1bHQgPiAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEudGFza19kYXRhLnVwZGF0ZV90YXNrX3Byb2dyZXNzKFxyXG4gICAgICAgICAgICAgICAgVGFza0NvbmRpdGlvblR5cGUuQVRUQUNLX0lTTEFORFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xOV9GSUdIVF9SRVRVUk4pO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X211c2ljKGdtLmNvbnN0LkFVRElPXzkxX01BSU5fTVVTSUMpO1xyXG4gICAgICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICAgICAgbGV0IGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgYSA8XHJcbiAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLmZpZ2h0X3Jlc3VsdF9kYXRhLmFsaXZlX2hlcm9fZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBhKytcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5jaGVja0lzUGxheUl0ZW1Tb3VuZChcclxuICAgICAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLmZpZ2h0X3Jlc3VsdF9kYXRhLmFsaXZlX2hlcm9fZGF0YV9hcnJheVthXS5pZFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzZmlnaHRFbmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvY2tBcmVhQ2xvdWQoKTtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIDEgPT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCB8fFxyXG4gICAgICAgICAgICAgICAgMiA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEIHx8XHJcbiAgICAgICAgICAgICAgICAoNiA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uaXNFbmQpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5kb21TaG93Q2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzZmlnaHRFbmQpIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJzaGlwX3BsYXlfYW5pbVwiLCAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAxMyAhPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIWdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmlzRW5kXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBUZW1wRGF0YS5zZXRSb2xlR3VpZGVEYXRhRW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0Um9sZUd1aWRlRGF0YSgxNSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrR3VpZGVJc1Nob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoMTUgPT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrR3VpZGVJc1Nob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvY2tTZW5jZU1vdmVNYXAoMTE2LCAxLjUsIHRoaXMuaW5pdE1hcFBvc1N1Y2MsIHRoaXMpO1xyXG4gICAgICAgIH0sIDIpO1xyXG4gICAgICAgIHRoaXMuc2hvd190YXNrX2VudHJ5KCk7XHJcbiAgICAgICAgdGhpcy5zaG93X3Rhc2tfbWFpbl9lbnRyeSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd19sYWRkZXJfZW50cnkoKTtcclxuICAgICAgICB0aGlzLnNob3dfc2lnbl9lbnRyeSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd19zdXBlcl9yZWNydWl0X25vZGVfZW50cnkoKTtcclxuICAgICAgICB0aGlzLnNob3dfbHVja3lfd2hlZWxfbm9kZV9lbnRyeSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd19yZWNvcmRfZW50cnkoKTtcclxuICAgICAgICB0aGlzLnNob3dfbW9yZV9lbnRyeSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd19zaG9wX2VudHJ5KCk7XHJcbiAgICAgICAgdGhpcy5zaG93X21haWxfZW50cnkoKTtcclxuICAgICAgICB0aGlzLnNob3dfZ3VpZGVfZ2lmdF9lbnRyeSgpO1xyXG4gICAgICAgIHRoaXMuYWRkX2Rlc2t0b3Bfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBnbS5jaGFubmVsLmNoZWNrU2hvcnRjdXQoKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChudW0gPj0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93X2FkZF9kZXNrdG9wX2VudHJ5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hSZWRCdG5Cb29rKCk7XHJcbiAgICAgICAgLy8gdGhpcy5hdXRvQ29tcG9zZS5hdXRvQW5pbS5ub2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlOyAvLyBjxakgbMOgIHRoaXMuYXV0b0NvbXBvc2UuYWN0aXZlXHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcG9zZS5ub2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlO1xyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfbXVzaWMoZ20uY29uc3QuQVVESU9fOTFfTUFJTl9NVVNJQyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERU5FV0VSR1VJREVcclxuICAgICAgICApLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERV9DTElDS19CVUlMRF9VUEdSQUVfUE9TLFxyXG4gICAgICAgICAgICB0aGlzLmdldEJ1aWxkVXBncmFkZUNiLFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERU5FV0VSR1VJREVcclxuICAgICAgICApLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERV9DTElDS19CQVJSRUxfUE9TLFxyXG4gICAgICAgICAgICB0aGlzLmdldEJhcnJlbENiLFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERU5FV0VSR1VJREVcclxuICAgICAgICApLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERV9DTElDS19CVUlMRF9VUF9QT1MsXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QnVpbGRVcENiLFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBNdmNFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERU5FV0VSR1VJREVcclxuICAgICAgICApLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIERhdGFFdmVudC5HVUlERV9DTElDS19CRUdJTl9GSUdIVF9QT1MsXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpY2tHb0ZpZ2h0Q2IsXHJcbiAgICAgICAgICAgIHRoaXNcclxuICAgICAgICApO1xyXG4gICAgICAgIGdtLnVpLm9mZihcIml0ZW1fbW92ZVwiLCB0aGlzLm9uX21vdmVfaXRlbV9tb3ZlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJpdGVtX21vdmVfZW5kXCIsIHRoaXMub25fbW92ZV9pdGVtX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCB0aGlzLm9uX21vdmVfaXRlbV9yZWZyZXNoLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJpdGVtX3VubG9ja19yZWZyZXNoXCIsIHRoaXMub25faXRlbV91bmxvY2tfcmVmcmVzaCwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiY29tcG9zdGltZUNoYW5nZVwiLCB0aGlzLnNob3dOZXh0Q2VsbE5vZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcInVuTG9ja05ld0FyZWFcIiwgdGhpcy51bkxvY2tOZXdBcmVhLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJidWlsZF91cGdyYWRlXCIsIHRoaXMucmVmcmVzaEJ1aWxkSXRlbSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwiaXRlbV9jb21wb3NlX3RpbWVfY2hhbmdlXCIsIHRoaXMuY29tcG9zZVRpbWVzQ2hhbmdlLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJidWlsZF9tZXRhcmFpbF9jaGFuZ2VcIiwgdGhpcy5zaG93QnVpbGRNZXJ0YXJpbEZ1bGwsIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcImd1aWRlX2RlbF9pdGVtXCIsIHRoaXMuZ3VpZGVEZWxJdGVtLCB0aGlzKTtcclxuICAgICAgICBnbS51aS5vZmYoXCJib29rUmVkU3RhdHVzXCIsIHRoaXMucmVmcmVzaFJlZEJ0bkJvb2ssIHRoaXMpO1xyXG4gICAgICAgIGdtLnVpLm9mZihcInNoaXBfZ29vZHNfY2hhbmdlXCIsIHRoaXMucHV0QWxsSXRlbVRvTWFwQXV0bywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9ja01haW5VSSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0eXBlOiBTcGVjaWFsRW51bVtdID0gW1NwZWNpYWxFbnVtLkNBVkVTX1RZUEVdO1xyXG4gICAgICAgIHRoaXMubWFwVUkuYWN0aXZlID0gIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGU7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb246IGNjLlZlYzNbXSA9IFtuZXcgY2MuVmVjMygtMjA2LCAtOTAwKV07XHJcbiAgICAgICAgdGhpcy5yb2xlQnVpbGRBbmltTm9kZS5hY3RpdmUgPSAhZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZTtcclxuICAgICAgICBpZiAodGhpcy5yb2xlQnVpbGRBbmltTm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvbGVCdWlsZEFuaW1Ob2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVmYWJzL3N0YXRpY0FuaW00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgTm9kZVBvb2xJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlQnVpbGRBbmltTm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsQnlJRChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVCdWlsZEFuaW1Ob2RlLmFkZENoaWxkKGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS51bmxvY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zcGVjaWFsTGlzdFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNwZWNpYWxFbnVtLkNBVkVTX1RZUEVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5zdGF0ZSA9PSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUJ1aWxkQW5pbU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yb2xlQnVpbGRBbmltTm9kZS56SW5kZXggPSBnbS5jb25zdC5NQVhfQ0VMTF9OVU0gLSAzO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVCdWlsZEFuaW1Ob2RlLnBvc2l0aW9uID0gcG9zaXRpb25bMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9ja0FyZWFDbG91ZCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXNBcmVhTG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChjb25zdCBhcmVhS2V5IGluIGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdCkge1xyXG4gICAgICAgICAgICAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgfHxcclxuICAgICAgICAgICAgICAgICAgICAyID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmxvY2tBcmVhW2tleV0gfHxcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRBcmVhSURJc1VuTG9jayhwYXJzZUludChrZXkpKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0FyZWFDbG91ZExpc3QuY2hpbGRyZW5bXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3Rba2V5XS5pbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBcmVhTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrQXJlYUNsb3VkTGlzdC5jaGlsZHJlbltcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFtrZXldLmluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0uY2hpbGRyZW5Db3VudFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmVmYWJzL2xvY2tDbG91ZF9cIiArIGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvY2tDbG91ZEFyZWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoTG9ja0Nsb3VkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0FyZWFDbG91ZExpc3QuY2hpbGRyZW5bXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3Rba2V5XS5pbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmNoaWxkcmVuQ291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9ja0Nsb3VkLmluaXRUeXBlKHBhcnNlSW50KGtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tBcmVhQ2xvdWRMaXN0LmNoaWxkcmVuW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uY29uc3QubG9jYWxDbG91ZEFyZWFMaXN0W2tleV0uaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5hZGRDaGlsZChMb2NrQ2xvdWQubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoTG9ja0Nsb3VkLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tBcmVhQ2xvdWRMaXN0LmNoaWxkcmVuW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uY29uc3QubG9jYWxDbG91ZEFyZWFMaXN0W2tleV0uaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgXS5jaGlsZHJlblswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChMb2NrQ2xvdWRBcmVhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoYXJlYUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9ja0FyZWFDbG91ZExpc3QuekluZGV4ID0gaXNBcmVhTG9ja2VkXHJcbiAgICAgICAgICAgID8gZ20uY29uc3QuTUFYX0NFTExfTlVNXHJcbiAgICAgICAgICAgIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfdGFza19lbnRyeSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50YXNrX25vZGU/LmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuVEFTSyxcclxuICAgICAgICAgICAgICAgIFwicHJlZmFicy90YXNrX2VudHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBUYXNrRW50cnksXHJcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhc2tfbm9kZS5jaGlsZHJlbkNvdW50ID09IDAgJiYgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tfbm9kZS5hZGRDaGlsZChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSBnbS5wb29sLnB1dChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93X3Rhc2tfbWFpbl9lbnRyeSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50YXNrX21haW5fbm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5UQVNLLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVmYWJzL3Rhc2tfbWFpbl9lbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgVGFza01haW5FbnRyeSxcclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGFza19tYWluX25vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFza19tYWluX25vZGUuYWRkQ2hpbGQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfdGFza19tYWluX2VudHJ5X2d1aWRlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnRhc2tfbWFpbl9ub2RlPy5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRhc2tNYWluRW50cnkpO1xyXG4gICAgICAgIGlmIChkYXRhKSBkYXRhLnNob3dfd2Vha19ndWlkZSgwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfbGFkZGVyX2VudHJ5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxhZGRlcl9ub2RlPy5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLkxBRERFUixcclxuICAgICAgICAgICAgICAgIFwicHJlZmFicy9sYWRkZXJfZW50cnlcIixcclxuICAgICAgICAgICAgICAgIExhZGRlckVudHJ5LFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYWRkZXJfbm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWRkZXJfbm9kZS5hZGRDaGlsZChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd19zaWduX2VudHJ5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChUZW1wRGF0YS5tYWluRnVuU2hvd1NpZ24pIHtcclxuICAgICAgICAgICAgdGhpcy5zaWduX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2lnbl9ub2RlPy5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuU0lHTixcclxuICAgICAgICAgICAgICAgICAgICBcInByZWZhYnMvc2lnbl9lbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFNpZ25FbnRyeSxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2lnbl9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduX25vZGUuYWRkQ2hpbGQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaWduX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X3N1cGVyX3JlY3J1aXRfbm9kZV9lbnRyeSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoVGVtcERhdGEubWFpbkZ1blNob3dTdXBlckhlcm8pIHtcclxuICAgICAgICAgICAgdGhpcy5zdXBlcl9yZWNydWl0X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJfcmVjcnVpdF9ub2RlPy5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuU1VQRVJfUkVDUlVJVCxcclxuICAgICAgICAgICAgICAgICAgICBcInByZWZhYnMvc3VwZXJfcmVjcnVpdF9lbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIE5vZGVQb29sSXRlbSxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJfcmVjcnVpdF9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXBlcl9yZWNydWl0X25vZGUuYWRkQ2hpbGQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdXBlcl9yZWNydWl0X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2x1Y2t5X3doZWVsX25vZGVfZW50cnkoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFRlbXBEYXRhLm1haW5GdW5TaG93THVja3kpIHtcclxuICAgICAgICAgICAgdGhpcy5sdWNreV93aGVlbF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmx1Y2t5X3doZWVsX25vZGU/LmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5MVUNLWV9XSEVFTCxcclxuICAgICAgICAgICAgICAgICAgICBcInByZWZhYnMvbHVja3lfd2hlZWxfZW50cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBOb2RlUG9vbEl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmx1Y2t5X3doZWVsX25vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmx1Y2t5X3doZWVsX25vZGUuYWRkQ2hpbGQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sdWNreV93aGVlbF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfcmVjb3JkX2VudHJ5KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMucmVjb3JkX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlY29yZF9ub2RlLmFjdGl2ZSA9IGdtLmNoYW5uZWwuaXNfdmlkZW9fc2hhcmU7XHJcbiAgICAgICAgaWYgKGdtLmNoYW5uZWwuaXNfdmlkZW9fc2hhcmUgJiYgdGhpcy5yZWNvcmRfbm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5SRUNPUkQsXHJcbiAgICAgICAgICAgICAgICBcInByZWZhYnMvcmVjb3JkX2VudHJ5XCIsXHJcbiAgICAgICAgICAgICAgICBOb2RlUG9vbEl0ZW0sXHJcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlY29yZF9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29yZF9ub2RlLmFkZENoaWxkKGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd19tb3JlX2VudHJ5KCkge1xyXG4gICAgICAgIHRoaXMubW9yZV9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMubW9yZV9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTEFEREVSLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVmYWJzL21vcmVfZW50cnlcIixcclxuICAgICAgICAgICAgICAgIE1vcmVFbnRyeSxcclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9yZV9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmVfbm9kZS5hZGRDaGlsZChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfc2hvcF9lbnRyeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNob3Bfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnNob3Bfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd19tYWlsX2VudHJ5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgwID09IHRoaXMubWFpbF9ub2RlLmNoaWxkcmVuQ291bnQpIHtcclxuICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BSUwsXHJcbiAgICAgICAgICAgICAgICBcInByZWZhYnMvbWFpbF9lbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgTWFpbEVudHJ5LFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLm1haWxfbm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbF9ub2RlLmFkZENoaWxkKGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93X2d1aWRlX2dpZnRfZW50cnkoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFRlbXBEYXRhLm1haW5GdW5TaG93R3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ndWlkZV9naWZ0X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ3VpZGVfZ2lmdF9ub2RlPy5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuR1VJREVHSUZULFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJlZmFicy9ndWlkZV9naWZ0X2VudHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR3VpZGVHaWZ0RW50cnksXHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmd1aWRlX2dpZnRfbm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVfZ2lmdF9ub2RlLmFkZENoaWxkKGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVfZ2lmdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfYWRkX2Rlc2t0b3BfZW50cnkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRfZGVza3RvcF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2Rlc2t0b3Bfbm9kZT8uY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5BRERfREVTS1RPUCxcclxuICAgICAgICAgICAgICAgIFwicHJlZmFicy9hZGRfZGVza3RvcF9lbnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgQWRkRGVza3RvcEVudHJ5LFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRfZGVza3RvcF9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9kZXNrdG9wX25vZGUuYWRkQ2hpbGQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJhcnJlbE5vZGVBY3RpdmUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJyZWxOb2RlLnkgPSAtMjA4O1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJlbE5vZGUuYWN0aXZlID1cclxuICAgICAgICAgICAgICAgIDAgPCBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJhcnJlbE5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhcnJlbE5vZGUueSA9IDEwNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFycmVsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJlbE5vZGUueSA9IDEwNTtcclxuICAgICAgICAgICAgdGhpcy5iYXJyZWxOb2RlLmdldENvbXBvbmVudChCYXJyZWxNZ3IpLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNYXBQb3NTdWNjKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hlY2tHdWlkZUlzU2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0d1aWRlSXNTaG93KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBuZXdFID0gKHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gITEpO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGd1aWxkRGF0YSA9IFRlbXBEYXRhLmdldFJvbGVHdWlkZURhdGEoKTtcclxuICAgICAgICAgICAgaWYgKDAgPCBndWlsZERhdGEuZ3VpZGVJRCAmJiAhZ3VpbGREYXRhLmlzRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdFID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdtLm5ld2VyR3VpZGVNZ3IuaW5pdEV2ZW50TGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIW5ld0UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tIYW5kQW5pbURlbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzQmVnaW5EZWxheVRpbWUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShudW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQmVnaW5EZWxheVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJUaW1lciArPSBudW07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clRpbWVyID49IHRoaXMuZGVsYXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzQmVnaW5EZWxheVRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyVGltZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0hhbmRBbmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAhdGhpcy5faXNEcmFnVG9Cb3JkZXJNb3ZlU3BlZWQuZXF1YWxzKGNjLlZlYzIuWkVSTykgJiZcclxuICAgICAgICAgICAgdGhpcy5tb3ZlSXRlbU5vZGU/LmFjdGl2ZUluSGllcmFyY2h5XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC54ICs9IHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkLnggKiBudW07XHJcbiAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC55ICs9IHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkLnkgKiBudW07XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLnBvc2l0aW9uID0gY2MudjMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQ/LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuX3RvdWNoX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tIYW5kQW5pbURlbGF5KG51bTAxOiBudW1iZXIgPSAwLCBudW0wMjogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVsYXlUaW1lID0gbnVtMDEgPT0gdW5kZWZpbmVkID8gMC4zIDogbnVtMDE7XHJcbiAgICAgICAgdGhpcy5ndWlkZUlEID0gbnVtMDI7XHJcbiAgICAgICAgdGhpcy5pc0JlZ2luRGVsYXlUaW1lID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdvYm91bmRhcnkoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG51bTAxOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBudW0wMjogbnVtYmVyID0gMDtcclxuICAgICAgICBjb25zdCB2aXNpYmxlU2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcclxuICAgICAgICBjb25zdCBpID0gTWF0aC5jZWlsKHZpc2libGVTaXplLmhlaWdodCAvIDE1MDApO1xyXG4gICAgICAgIGNvbnN0IG1hcFNjYWxlID0gdGhpcy5tYXBDb250ZW50LnNjYWxlO1xyXG4gICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5tYXBDb250ZW50LmdldEFuY2hvclBvaW50KCk7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB2aXNpYmxlU2l6ZS53aWR0aCAvIDIgPlxyXG4gICAgICAgICAgICB0aGlzLl9tYXBfc2l6ZS54ICogcG9pbnQueCAqIG1hcFNjYWxlIC1cclxuICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRQb3NpdGlvbigpLnhcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbnVtMDEgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwX3NpemUueCAqIHBvaW50LnggKiBtYXBTY2FsZSAtIHZpc2libGVTaXplLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5zZXRQb3NpdGlvbihudW0wMSwgdGhpcy5tYXBDb250ZW50LnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHZpc2libGVTaXplLmhlaWdodCAvIDIgPlxyXG4gICAgICAgICAgICB0aGlzLl9tYXBfc2l6ZS55ICogcG9pbnQueSAqIG1hcFNjYWxlIC1cclxuICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRQb3NpdGlvbigpLnlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbnVtMDIgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwX3NpemUueSAqIHBvaW50LnkgKiBtYXBTY2FsZSAtIHZpc2libGVTaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQ29udGVudD8uc2V0UG9zaXRpb24odGhpcy5tYXBDb250ZW50LngsIG51bTAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB2aXNpYmxlU2l6ZS53aWR0aCAvIDIgPlxyXG4gICAgICAgICAgICB0aGlzLl9tYXBfc2l6ZS54ICogKDEgLSBwb2ludC54KSAqIG1hcFNjYWxlICtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRQb3NpdGlvbigpLnhcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbnVtMDEgPVxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZVNpemUud2lkdGggLyAyIC1cclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcF9zaXplLnggKiAoMSAtIHBvaW50LngpICogbWFwU2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQ29udGVudD8uc2V0UG9zaXRpb24obnVtMDEsIHRoaXMubWFwQ29udGVudC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB2aXNpYmxlU2l6ZS5oZWlnaHQgLyAyID5cclxuICAgICAgICAgICAgdGhpcy5fbWFwX3NpemUueSAqICgxIC0gcG9pbnQueSkgKiBtYXBTY2FsZSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0UG9zaXRpb24oKS55XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIG51bTAyID1cclxuICAgICAgICAgICAgICAgIHZpc2libGVTaXplLmhlaWdodCAvIDIgLVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwX3NpemUueSAqICgxIC0gcG9pbnQueSkgKiBtYXBTY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5zZXRQb3NpdGlvbih0aGlzLm1hcENvbnRlbnQueCwgbnVtMDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRTaGlwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFXSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVmYWJzL3NoaXBcIixcclxuICAgICAgICAgICAgICAgICAgICBTaGlwTWdyLFxyXG4gICAgICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcEl0ZW1EYXRhVm8gPSBuZXcgTWFwSXRlbURhdGFWTygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVm8uY2VsbElEID0gYnVpbGREYXRhLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YVZvLmNlbGxTdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWby5pdGVtU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVm8uaXRlbVR5cGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJdGVtVHlwZUVudW0uQlVJTERfVFlQRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YVZvLml0ZW1JRCA9IGJ1aWxkRGF0YS5idWlsZElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVm8uaGVyb1VJRCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoQnVpbGRJY29uSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluaXREYXRhKG1hcEl0ZW1EYXRhVm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0UgPSBidWlsZERhdGEuY2VsbElEICUgdGhpcy5fcm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld051bSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5jZWxsSUQgLyB0aGlzLl9yb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcC55ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuX2hlaWdodEhhbGYgLSA1MSAqIG5ld051bSAtIDIwICogbmV3RTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXAueCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoSGFsZiAtIDMxICogbmV3TnVtICsgNzUgKiBuZXdFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcC56SW5kZXggPSBnbS5jb25zdC5NQVhfQ0VMTF9OVU07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwLmFkZENoaWxkKGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGRhdGEubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRV1cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtRGF0YVZPID0gbmV3IE1hcEl0ZW1EYXRhVk8oKTtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uY2VsbElEID0gYnVpbGREYXRhLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uY2VsbFN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uaXRlbVN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uaXRlbVR5cGUgPSBJdGVtVHlwZUVudW0uQlVJTERfVFlQRTtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uaXRlbUlEID0gYnVpbGREYXRhLmJ1aWxkSUQ7XHJcbiAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YVZPLmhlcm9VSUQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwPy5jaGlsZHJlblswXVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoQnVpbGRJY29uSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAuaW5pdERhdGEobWFwSXRlbURhdGFWTyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBudW0gPSBidWlsZERhdGEuY2VsbElEICUgdGhpcy5fcm93O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RSA9IE1hdGguZmxvb3IoYnVpbGREYXRhLmNlbGxJRCAvIHRoaXMuX3Jvdyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXAueSA9IC10aGlzLl9oZWlnaHRIYWxmIC0gNTEgKiBuZXdFIC0gMjAgKiBudW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXAueCA9IHRoaXMuX3dpZHRoSGFsZiAtIDMxICogbmV3RSArIDc1ICogbnVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoQnVpbGRJdGVtKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiAodGhpcy5sb2NrQXJlYUNsb3VkKCksXHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoa2V5KSA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTaGlwKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtTm9kZSA9IHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFba2V5XS5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Db21wb25lbnQgPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db21wb25lbnQuc2hvd0l0ZW1Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QmFycmVsTm9kZUFjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25faXRlbV91bmxvY2tfcmVmcmVzaChuYW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaGlwPy5hY3RpdmUpIHRoaXMuc2hvd1VuQ29tcG9zZUNlbGwoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaXRlbU5vZGUgPSB0aGlzLm1hcENvbnRlbnQ/LmdldENoaWxkQnlOYW1lKG5hbWUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgaWYgKGl0ZW1Ob2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db21wb25lbnQgPSBpdGVtTm9kZS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbUNvbXBvbmVudC5wbGF5VW5sb2NrVXBBbmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9tb3ZlX2l0ZW1fcmVmcmVzaChudW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChudW0gIT0gMzk1ICYmIG51bSAhPSAzMTMgJiYgbnVtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbU5vZGUgPSB0aGlzLm1hcENvbnRlbnQ/LmdldENoaWxkQnlOYW1lKG51bS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29tcG9uZW50ID0gaXRlbU5vZGUuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNvbXBvbmVudC5zaG93SXRlbU5vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX21vdmVfaXRlbV9tb3ZlKHBvc2l0aW9uOiBjYy5WZWMyLCB0eXBlOiBudW1iZXIsIG51bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vdmVJdGVtTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZUJ1aWxkVXBncmFkZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUJ1aWxkVXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFwVWlTaG93KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLnpJbmRleCA9IGdtLmNvbnN0Lk1BWF9DRUxMX05VTSArIDI7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBJdGVtVHlwZUVudW0uSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVJdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLkNPTU1PTixcclxuICAgICAgICAgICAgICAgICAgICBcInByZWZhYnMvbW9kZWwvXCIgKyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgTm9kZVBvb2xJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIChub2RlcG9vbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLm1vdmVJdGVtTm9kZS5jaGlsZHJlblswXS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVJdGVtTm9kZS5jaGlsZHJlblswXS5hZGRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlcG9vbC5ub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2tlbGV0b25Db21wb25lbnQgPSBub2RlcG9vbC5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AuU2tlbGV0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b25Db21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2VsZXRvbkNvbXBvbmVudC5zZXRTa2luKFwiZnJvbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tlbGV0b25Db21wb25lbnQuc2V0QW5pbWF0aW9uKDAsIFwic3RheVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KG5vZGVwb29sLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IEl0ZW1UeXBlRW51bS5CVUlMRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVJdGVtTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQobnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWlsZENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXMvYnVpbGQvXCIgKyBidWlsZENvbmZpZy5tb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlSXRlbU5vZGUuc2NhbGUgPSAwLjY2NjY2Njc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChudW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVJdGVtTm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlSXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlSXRlbU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcy9cIiArIGl0ZW1Db25maWcuaWNvblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZENvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZFR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWF0ZXJpYWxUeXBlIGluIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLnR5cGUgPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGVyaWFsVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUNvbmZpZy50eXBlID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3BUeXBlRW51bS5XT09EX1RZUEUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLnR5cGUgPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvcFR5cGVFbnVtLklST05fVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLm51bWJlciA9PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZERhdGEubWV0cmFpbERhdGFbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbFR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5tYXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRDb25maWcuYnVpbGRUeXBlID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwLmNoaWxkcmVuWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRJY29uSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGxheVNjYWxlQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZVNjYWxlTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRJY29uSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYWluTWFwSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGxheVNjYWxlQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZVNjYWxlTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYWluTWFwSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBCdWlsZE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRJY29uSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLmlkID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLm1ldHJhaWxEYXRhW21hdGVyaWFsVHlwZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcC5jaGlsZHJlblswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChCdWlsZEljb25JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBsYXlTY2FsZUFuaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZVNjYWxlTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXAuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1aWxkSWNvbkl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLmNlbGxJRC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBsYXlTY2FsZUFuaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZVNjYWxlTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYWluTWFwSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwQnVpbGROb2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRJY29uSXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgY29uc3QgcG9zVjIgPSB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVJdGVtTm9kZS5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKHBvc1YyLngsIHBvc1YyLnksIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwb3NWMiA9IHRoaXMubWFwQ29udGVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5tb3ZlSXRlbU5vZGUucG9zaXRpb24gPSBuZXcgY2MuVmVjMyhwb3NWMi54LCBwb3NWMi55LCAwKTtcclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZUl0ZW1Ob2RlLmFjdGl2ZUluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaF9wb3NpdGlvbiA9IG5ldyBjYy5WZWMyKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZVNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZOb2RlU2l6ZSA9IGNjLnNpemUoXHJcbiAgICAgICAgICAgICAgICAgICAgMC41ICogbm9kZVNpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgMC41ICogbm9kZVNpemUuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxQb3NpdGlvbiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlU3BlZWQgPSAxNTAgKiB0aGlzLm1hcENvbnRlbnQuc2NhbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsUG9zaXRpb24ueCA8IDUwIC0gaGFsZk5vZGVTaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnVG9Cb3JkZXJNb3ZlU3BlZWQueCA9IG1vdmVTcGVlZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxQb3NpdGlvbi54ID4gaGFsZk5vZGVTaXplLndpZHRoIC0gNTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdUb0JvcmRlck1vdmVTcGVlZC54ID0gLW1vdmVTcGVlZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnVG9Cb3JkZXJNb3ZlU3BlZWQueCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsUG9zaXRpb24ueSA8IDUwIC0gaGFsZk5vZGVTaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkLnkgPSBtb3ZlU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsUG9zaXRpb24ueSA+IGhhbGZOb2RlU2l6ZS5oZWlnaHQgLSA1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkLnkgPSAtbW92ZVNwZWVkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0RyYWdUb0JvcmRlck1vdmVTcGVlZC55ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNEcmFnVG9Cb3JkZXJNb3ZlU3BlZWQueSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVNb3ZlSXRlbU5vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb3ZlSXRlbU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNEcmFnVG9Cb3JkZXJNb3ZlU3BlZWQgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5tb3ZlSXRlbU5vZGUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSAmJlxyXG4gICAgICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkVXBncmFkZT8uYWN0aXZlICYmXHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVTY2FsZU5vZGVcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5ndWlkZVNjYWxlTm9kZS5zdG9wU2NhbGVBbmltKCk7IC8vIFRPRE86ID8/P1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZU1vdmVCdWlsZEl0ZW1Ob2RlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMubW92ZUl0ZW1Ob2RlLmNoaWxkcmVuWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX21vdmVfaXRlbV9oaWRlKGV2ZW50OiBjYy5WZWMyLCBudW1iZXI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZUl0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzRHJhZ1RvQm9yZGVyTW92ZVNwZWVkID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMubW92ZUl0ZW1Ob2RlLmNoaWxkcmVuWzBdKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgJiZcclxuICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGU/LmFjdGl2ZSAmJlxyXG4gICAgICAgICAgICB0aGlzLmd1aWRlU2NhbGVOb2RlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpZGVTY2FsZU5vZGUuc3RvcFNjYWxlQW5pbSgpOyAvL1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEub3Blbl9iYXR0bGVfcGFuZWxfc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMubWFwQ29udGVudC5jaGlsZHJlbkNvdW50OyBhKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5jaGlsZHJlblthXS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnQucGxheVNhbWVJdGVtQW5pbUVuZChldmVudCwgbnVtYmVyKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ2xpY2tDYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc0hhdmVTcGVjZUNlbGxJRCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRCYXJyZWxJbk1hcCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS53YXRjaF9hZF9idXlfYmFycmVsX3RpbWVzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkQmFycmVsTnVtKDQwKTtcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDMwMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDMwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJ2aWRlb19idXlfYmFycmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRfZGVzYzogXCLnnIvop4bpopHotK3kubDmnKjmobZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV5X2NvdW50OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0Y2hfYWRfYnV5X2JhcnJlbF90aW1lcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza19kZXNjOiBjYy5qcy5mb3JtYXRTdHIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIui0reS5sOacqOahtiVk5qyhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS53YXRjaF9hZF9idXlfYmFycmVsX3RpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfYXV0b19tZXJnZV9tZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmFuZG9tU2hvd0Nhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgd2F0ZXJCYXJyZWxMaXN0ID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEud2F0ZXJCYXJyZWxMaXN0O1xyXG4gICAgICAgIGlmICh3YXRlckJhcnJlbExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJlbFBhcmVudE5vZGUuekluZGV4ID0gNDAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHdhdGVyQmFycmVsTGlzdC5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZSA9IHQ7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgICAgICBcInByZWZhYnMvYmFycmVsSXRlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFdhdGVyQmFycmVsSXRlbSxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFycmVsSXRlbSA9IGRhdGEgYXMgV2F0ZXJCYXJyZWxJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJyZWxJdGVtLmluaXREYXRhKHdhdGVyQmFycmVsTGlzdFtlXSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycmVsUGFyZW50Tm9kZT8uYWRkQ2hpbGQoZGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE1hcEZvclRlc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0TWFwQ2VsbENmZygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbWFwQ2ZnTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwQ2ZnTGlzdFtpXSkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVmYWJzL2l0ZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBNYWluTWFwSXRlbSxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtMDEgPSB0aGlzLl9tYXBDZmdMaXN0W2ldLm1hcEluZGV4ICUgdGhpcy5fcm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBudW0wMiA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBDZmdMaXN0W2ldLm1hcEluZGV4IC8gdGhpcy5fcm93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1haW5NYXAgPSBkYXRhIGFzIE1haW5NYXBJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluTWFwLmluaXREYXRhKHRoaXMuX21hcENmZ0xpc3RbaV0sIDEsIDAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuX2hlaWdodEhhbGYgLSA1MSAqIG51bTAyIC0gMjAgKiBudW0wMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlLnggPSB0aGlzLl93aWR0aEhhbGYgLSAzMSAqIG51bTAyICsgNzUgKiBudW0wMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5hZGRDaGlsZChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWFwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJvbGVNYXBUb3RhbERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF90b3RhbF9kYXRhO1xyXG4gICAgICAgIFV0aWxzLnNvcnRfYnlfcHJvcHMocm9sZU1hcFRvdGFsRGF0YSwgeyBpdGVtSUQ6IFwiYXNjZW5kaW5nXCIgfSk7XHJcbiAgICAgICAgZm9yIChsZXQgZSA9IDA7IGUgPCByb2xlTWFwVG90YWxEYXRhLmxlbmd0aDsgZSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVNYXAgPSByb2xlTWFwVG90YWxEYXRhW2VdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwQ2ZnTGlzdFtyb2xlTWFwXSkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmVmYWJzL2l0ZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBNYWluTWFwSXRlbSxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtMDEgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdFtyb2xlTWFwXS5tYXBJbmRleCAlIHRoaXMuX3JvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtMDIgPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdFtyb2xlTWFwXS5tYXBJbmRleCAvIHRoaXMuX3Jvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYWluTWFwID0gZGF0YSBhcyBNYWluTWFwSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbk1hcC5pbml0RGF0YSh0aGlzLl9tYXBDZmdMaXN0W3JvbGVNYXBdLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMuX2hlaWdodEhhbGYgLSA1MSAqIG51bTAyIC0gMjAgKiBudW0wMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlLnggPSB0aGlzLl93aWR0aEhhbGYgLSAzMSAqIG51bTAyICsgNzUgKiBudW0wMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5hZGRDaGlsZChkYXRhLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bkxvY2tOZXdBcmVhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVCdWlsZFVwZ3JhZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUJ1aWxkVXBncmFkZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNYXBVaVNob3codHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tYXBDZmdMaXN0ID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRNYXBDZWxsQ2ZnKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFyZWFVbmxvY2sgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5hcmVhVW5sb2NrQ2VsbElETGlzdDtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAoOyAwIDwgZ20uZGF0YS5tYXBDZWxsX2RhdGEuX2N1ck5ld1VubG9ja0NlbGxMaXN0Lmxlbmd0aDsgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1VubG9jayA9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5fY3VyTmV3VW5sb2NrQ2VsbExpc3Quc2hpZnQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hcENmZ0xpc3RbbmV3VW5sb2NrXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdFtuZXdVbmxvY2tdLmNlbGxJRC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENmZ0xpc3RbbmV3VW5sb2NrXS5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIEJ1bmRsZU5hbWUuTUFQLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJlZmFicy9pdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgTWFpbk1hcEl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgKG1hcEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwSW5kZXggPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdFtuZXdVbmxvY2tdLm1hcEluZGV4ICUgdGhpcy5fcm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBGbG9vciA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBDZmdMaXN0W25ld1VubG9ja10ubWFwSW5kZXggLyB0aGlzLl9yb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0uaW5pdERhdGEodGhpcy5fbWFwQ2ZnTGlzdFtuZXdVbmxvY2tdLCAzLCBjb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0ubm9kZS55ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLl9oZWlnaHRIYWxmIC0gNTEgKiBtYXBGbG9vciAtIDIwICogbWFwSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0ubm9kZS54ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoSGFsZiAtIDMxICogbWFwRmxvb3IgKyA3NSAqIG1hcEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuYWRkQ2hpbGQobWFwSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgwID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLl9jdXJOZXdVbmxvY2tDZWxsTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBpZiAoMCA8IGFyZWFVbmxvY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoOyAwIDwgYXJlYVVubG9jay5sZW5ndGg7ICkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJlYVVubG9jazAgPSBhcmVhVW5sb2NrLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwQ2ZnTGlzdFthcmVhVW5sb2NrMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlZmFicy9pdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1haW5NYXBJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobWFwSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwSW5kZXggPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENmZ0xpc3RbYXJlYVVubG9jazBdLm1hcEluZGV4ICVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBmbG9vciA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdFthcmVhVW5sb2NrMF0ubWFwSW5kZXggL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtLmluaXREYXRhKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENmZ0xpc3RbYXJlYVVubG9jazBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbS5ub2RlLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC10aGlzLl9oZWlnaHRIYWxmIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA1MSAqIG1hcGZsb29yIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyMCAqIG1hcEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbS5ub2RlLnggPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoSGFsZiAtIDMxICogbWFwZmxvb3IgKyA3NSAqIG1hcEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmFkZENoaWxkKG1hcEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IGFyZWFVbmxvY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VuQ29tcG9zZUNlbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb2xlR3VpZGUgPSBUZW1wRGF0YS5nZXRSb2xlR3VpZGVEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlR3VpZGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNiA9PSByb2xlR3VpZGUuZ3VpZGVJRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhcm9sZUd1aWRlLmlzRW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0d1aWRlSXNTaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMC41ICogbnVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1VuQ29tcG9zZUNlbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLnVpLmVtaXQoXCJidWlsZF9zaG93X3N0YXRlSWNvblwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmNoZWNrR3VpZGVJc1Nob3csIE1hdGgubWF4KDAuNSAqIG51bSwgMS41KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93VW5Db21wb3NlQ2VsbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IGFyZWFVbmxvY2tDZWxsSURzID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXJlYVVubG9ja0NlbGxJRExpc3Q7XHJcbiAgICAgICAgaWYgKDAgPCBhcmVhVW5sb2NrQ2VsbElEcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yICg7IDAgPCBhcmVhVW5sb2NrQ2VsbElEcy5sZW5ndGg7ICkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbElEID0gYXJlYVVubG9ja0NlbGxJRHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXBDZmdMaXN0W2NlbGxJRF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChcclxuICAgICAgICAgICAgICAgICAgICAgICAgQnVuZGxlTmFtZS5NQVAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJlZmFicy9pdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1haW5NYXBJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobWFwSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENmZ0xpc3RbY2VsbElEXS5tYXBJbmRleCAlIHRoaXMuX3JvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gTWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBDZmdMaXN0W2NlbGxJRF0ubWFwSW5kZXggLyB0aGlzLl9yb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbS5pbml0RGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBDZmdMaXN0W2NlbGxJRF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0ubm9kZS55ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5faGVpZ2h0SGFsZiAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNTEgKiByb3dJbmRleCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjAgKiBjb2x1bW5JbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0ubm9kZS54ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWR0aEhhbGYgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMxICogcm93SW5kZXggK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDc1ICogY29sdW1uSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuYWRkQ2hpbGQobWFwSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBhcmVhVW5sb2NrQ2VsbElEcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0Q2VsbE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOZXh0Q2VsbE5vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkhpZGVPbmVIZXJvQnlDZWxsSUQoKTogdm9pZCB7fVxyXG5cclxuICAgIHByaXZhdGUgb25IaWRTaG93SGVyb0J5Q2VsbElEKCk6IHZvaWQge31cclxuXHJcbiAgICBwcml2YXRlIG9uSGlkZUdvQmF0dGxlKCk6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgc2hvd05leHRDZWxsTm9kZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5leHRDb21wVGltZXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgbmV4dExvY2tlZENlbGwgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXROZXh0TG9ja0NlbGwoKTtcclxuICAgICAgICBpZiAobmV4dExvY2tlZENlbGwpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKG5leHRMb2NrZWRDZWxsLmNlbGxJRC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dENvbXBUaW1lcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Q29tcFRpbWVzLnpJbmRleCA9IGdtLmNvbnN0Lk1BWF9DRUxMX05VTSArIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRDb21wVGltZXMueSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0TG9ja2VkQ2VsbC5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICkueSArIDkwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Q29tcFRpbWVzLnggPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dExvY2tlZENlbGwuY2VsbElELnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICApLnggKyAzMDtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dENvbXBUaW1lcy5jaGlsZHJlblsyXS5jaGlsZHJlblswXS53aWR0aCA9IE1hdGgubWluKFxyXG4gICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90aW1lcykgL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0TG9ja2VkQ2VsbC5jb21UaW1lcykgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0OCxcclxuICAgICAgICAgICAgICAgICAgICA0OFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dENvbXBUaW1lcy5jaGlsZHJlblsyXS5jaGlsZHJlblswXS53aWR0aCA9IE1hdGgubWF4KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dENvbXBUaW1lcy5jaGlsZHJlblsyXS5jaGlsZHJlblswXS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAyMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dENvbXBUaW1lcy5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25leHRPcGVuQ2VsbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0J1aWxkTWVydGFyaWxGdWxsKGJ1aWxkSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSAmJlxyXG4gICAgICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkVXBncmFkZS5hY3RpdmUgJiZcclxuICAgICAgICAgICAgYnVpbGRJRCA9PSB0aGlzLl9idWlsZElEXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVVcGdyYWRlQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9XHJcbiAgICAgICAgICAgICAgICBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gMDtcclxuICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA8IHRoaXMucm9sZUd1aWRlQnVpbGRNZXJ0cmFpbE5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbE5vZGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRNZXJ0cmFpbE5vZGUuY2hpbGRyZW5baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbFByb2dyZXNzID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZE1lYXRyaWxbaW5kZXhdLm1heCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLmdldEJ1aWxkR3VpZGVNZXJ0YXJpbE51bUJ5SUQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZE1lYXRyaWxbaW5kZXhdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgLyB0aGlzLl9idWlsZE1lYXRyaWxbaW5kZXhdLm1heDtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbE5vZGUuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZW1wRGF0YS5nZXRCdWlsZEd1aWRlTWVydGFyaWxOdW1CeUlEKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkTWVhdHJpbFtpbmRleF0uaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRNZWF0cmlsW2luZGV4XS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbFByb2dyZXNzID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxOb2RlLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLnNjYWxlWFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbE5vZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0ucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc2NhbGVUbygwLjIsIG1hdGVyaWFsUHJvZ3Jlc3MsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLmdldEJ1aWxkR3VpZGVNZXJ0YXJpbE51bUJ5SUQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZElELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRNZWF0cmlsW2luZGV4XS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApID49IHRoaXMuX2J1aWxkTWVhdHJpbFtpbmRleF0ubWF4XHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTm9kZS5jaGlsZHJlbls0XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBidWlsZENvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKGJ1aWxkSUQpO1xyXG4gICAgICAgICAgICBpZiAoYnVpbGRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShcclxuICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZFR5cGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhICYmXHJcbiAgICAgICAgICAgICAgICAgICAga2V5cyA9PSBPYmplY3Qua2V5cyhidWlsZERhdGEubWV0cmFpbERhdGEpLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVVcGdyYWRlQnRuLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tIYW5kQW5pbURlbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuLCByO1xyXG5cclxuICAgICAgICBpZiAoIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGUgJiYgIXRoaXMucm9sZUJ1aWxkVXBncmFkZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGRDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZElEKTtcclxuICAgICAgICAgICAgaWYgKGJ1aWxkQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRDb25maWcuYnVpbGRUeXBlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWV0cmFpbCBpbiBidWlsZERhdGEubWV0cmFpbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLm1ldHJhaWxEYXRhW21ldHJhaWxdLmN1ciA8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZERhdGEubWV0cmFpbERhdGFbbWV0cmFpbF0ubWF4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J1aWxkVXBncmFkZShidWlsZElELCBidWlsZERhdGEuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheUd1aWRlQmFycmVsRmx5KG51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShcclxuICAgICAgICAgICAgUmV3YXJkSWRFbnVtLkJBUlJFTCxcclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICA/LmdldENoaWxkQnlOYW1lKFwiMTg2XCIpXHJcbiAgICAgICAgICAgICAgICAuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgIG51bSxcclxuICAgICAgICAgICAgdGhpcy5iYXJyZWxOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tHdWlkZVVwbHZsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGNmZ0J5SUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRCh0aGlzLl9idWlsZElEKTtcclxuICAgICAgICBpZiAoIWNmZ0J5SUQpIHJldHVybjtcclxuICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT182X0pJQU5aVVNIRUdOSkkpO1xyXG4gICAgICAgIHRoaXMucGxheUJ1aWxkVXBncmFkZUFuaW0odGhpcy5fYnVpbGRJRCk7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEudXBncmFkZUJ1aWxkKGNmZ0J5SUQuYnVpbGRJRCk7XHJcbiAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheUJ1aWxkVXBncmFkZUFuaW0oYnVpbGRJRDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYnVpbGRDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZElEKTtcclxuICAgICAgICBpZiAoYnVpbGRDb25maWcpIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRVcEFuaW0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksXHJcbiAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgIFwicmVzL2J1aWxkL1wiICsgYnVpbGRDb25maWcuYnVpbGRJRCxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXMvYnVpbGQvXCIgKyBidWlsZENvbmZpZy5uZXh0QnVpbGRJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFVwQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZFR5cGUgIT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZFR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFidWlsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLlNwcml0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXMvYnVpbGQvXCIgKyBidWlsZENvbmZpZy5idWlsZElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLlNwcml0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXMvYnVpbGQvXCIgKyBidWlsZENvbmZpZy5uZXh0QnVpbGRJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmxkUG9zaXRpb24gPSB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChNYWluTWFwSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcEJ1aWxkTm9kZS5jaGlsZHJlblswXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBCdWlsZE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZEljb25JdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5pdGVtSW1nLm5vZGUucG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRQb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLnBvc2l0aW9uID0gbG9jYWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKGJ1aWxkRGF0YS5jZWxsSUQudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChNYWluTWFwSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldEJ1aWxkSW1nT3BhY2l0eSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29ybGRQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcC5jaGlsZHJlblswXS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXAuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1aWxkSWNvbkl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuaXRlbUltZy5ub2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkUG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLnBvc2l0aW9uID0gbG9jYWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXAub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFVwQW5pbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVXBBbmltLnNjYWxlID0gdGhpcy5tYXBDb250ZW50LnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuRklSRVdPUktTKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkSUQgPSBidWlsZENvbmZpZy5uZXh0QnVpbGRJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0J1aWxkVXBncmFkZShidWlsZElEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX3Nob3dfc3RhdGVJY29uXCIsIGZhbHNlKTtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkVXBncmFkZS56SW5kZXggPSA0MDA7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlVXBncmFkZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPVxyXG4gICAgICAgICAgICAgICAgZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLnNjYWxlID1cclxuICAgICAgICAgICAgICAgIDEgLSAwLjUgKiAodGhpcy5tYXBDb250ZW50LnNjYWxlIC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkTWVhdHJpbCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA8IHRoaXMucm9sZUd1aWRlQnVpbGRNZXJ0cmFpbE5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkTWVydHJhaWxOb2RlLmNoaWxkcmVuW2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYnVpbGRDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZElEKTtcclxuICAgICAgICAgICAgaWYgKGJ1aWxkQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZElEID0gYnVpbGRJRDtcclxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWV0cmFpbCBpbiBidWlsZERhdGEubWV0cmFpbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRyYWlsTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRNZXJ0cmFpbE5vZGUuY2hpbGRyZW5baGVpZ2h0XTtcclxuICAgICAgICAgICAgICAgICAgICBtZXRyYWlsTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLm1ldHJhaWxEYXRhW21ldHJhaWxdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0cmFpbE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLk1BUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzL1wiICsgaXRlbUNvbmZpZy5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyYWlsTm9kZS5jaGlsZHJlbls0XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRyYWlsTm9kZS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZERhdGEubWV0cmFpbERhdGFbbWV0cmFpbF0uY3VyICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVttZXRyYWlsXS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJhaWxOb2RlLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzBdLnNjYWxlWCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZERhdGEubWV0cmFpbERhdGFbbWV0cmFpbF0uY3VyIC9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVttZXRyYWlsXS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkTWVhdHJpbC5wdXNoKGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVttZXRyYWlsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGVCZy5oZWlnaHQgPSA4OCArIDU0ICogaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUuY2hpbGRyZW5bM10ueCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUueSA9IHRoaXMuc2hpcC55ICsgMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUueCA9IHRoaXMuc2hpcC54IC0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEVcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoY2VsbElELnRvU3RyaW5nKCkpLnkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAxMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkVXBncmFkZS54ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKS54ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUuY2hpbGRyZW5bM10ueCA9IC04MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUueSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSkueSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDIwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLnggPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoY2VsbElELnRvU3RyaW5nKCkpLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUgJiZcclxuICAgICAgICAgICAgICAgICAgICAxNSA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSGFuZEFuaW1EZWxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFICYmXHJcbiAgICAgICAgICAgICAgICAgICAgMCA9PSBidWlsZENvbmZpZy5idWlsZEx2XHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZGVpZDogMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogY2MuanMuZm9ybWF0U3RyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIlZC7ngrnlh7slc+WNh+e6p+agh+W/l1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZE5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0SUQgPSAxMTY7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgIShcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRDb25maWcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZENvbmZpZy5idWlsZFR5cGUgIT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRDb25maWcuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldElEID0gMTE3O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja1NlbmNlTW92ZU1hcCh0YXJnZXRJRCwgMS41KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUJ1aWxkVXBncmFkZS5zY2FsZSA9IDEgLSAwLjUgKiAodGhpcy5tYXBDb250ZW50LnNjYWxlIC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUJ1aWxkVXBncmFkZVxyXG4gICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChNYXBCdWlsZFVwZ3JhZGUpXHJcbiAgICAgICAgICAgICAgICAuaW5pdERhdGEoYnVpbGRJRCwgY2VsbElEKTtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQnVpbGRVcGdyYWRlLmFjdGl2ZSA9ICF0aGlzLnJvbGVCdWlsZFVwZ3JhZGUuYWN0aXZlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb2xlQnVpbGRVcGdyYWRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXBVaVNob3coZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVpbGRUeXBlID1cclxuICAgICAgICAgICAgICAgICAgICAzOTUgPT0gY2VsbElEIHx8IDMxMyA9PSBjZWxsSUQgPyBcInNoaXBcIiA6IGNlbGxJRC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQnVpbGRVcGdyYWRlLnpJbmRleCA9IGdtLmNvbnN0Lk1BWF9DRUxMX05VTSArIDM7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShidWlsZFR5cGUpLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRqdXN0ZWRQb3NpdGlvbiA9IGNjLnYzKFxyXG4gICAgICAgICAgICAgICAgICAgIDM2MCArIC1NYXRoLmFicyh0YXJnZXRQb3NpdGlvbi54KSAqIHRoaXMubWFwQ29udGVudC5zY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyh0YXJnZXRQb3NpdGlvbi55KSAqIHRoaXMubWFwQ29udGVudC5zY2FsZSAtIDMwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQucG9zaXRpb24gPSBhZGp1c3RlZFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQnVpbGRVcGdyYWRlLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShidWlsZFR5cGUpLnkgKyA4ODtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUJ1aWxkVXBncmFkZS54ID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoYnVpbGRUeXBlKS54ICsgNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWFwVWlTaG93KGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChhY3RpdmUpIHRoaXMubWFwVUkuYWN0aXZlID0gIWdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzR3VpZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2NrTWFwKCk6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgc2hvd0JhdHRsZUVuZENvaW4obnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVtID4gMCkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5HT0xELCB0aGlzLnNoaXA/LnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrTG9ja0J0bihkYXRhOiBjYy5CdXR0b24pOiB2b2lkIHtcclxuICAgICAgICBkYXRhLnRhcmdldC5jaGlsZHJlblswXS5hY3RpdmUgPSAhZGF0YS50YXJnZXQuY2hpbGRyZW5bMF0uYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuX2lzTG9ja01vdmVNYXAgPSBkYXRhLnRhcmdldC5jaGlsZHJlblswXS5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hvcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICFnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TVEFMTF9UWVBFXSB8fFxyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TVEFMTF9UWVBFXS5idWlsZEx2bCA8XHJcbiAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiR2lhbiBow6BuZyB24bqrbiBjaMawYSDEkcaw4bujYyBt4bufIGtow7NhISEhIVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5TdG9yZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tcG9zZVRpbWVzQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd05leHRDZWxsTm9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2NrU2VuY2VNb3ZlTWFwKFxyXG4gICAgICAgIHRhcmdldElEOiBudW1iZXIsXHJcbiAgICAgICAgc2NhbGU6IG51bWJlciA9IDEsXHJcbiAgICAgICAgY2FsbGJhY2s6IEZ1bmN0aW9uIHwgbnVsbCA9IG51bGwsXHJcbiAgICAgICAgY29udGV4dDogVGFza01haW5FbnRyeSB8IEV2ZW50U2NyaXB0TWFuYWdlciB8IE1haW5NYXBVSSA9IG51bGxcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFzay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmIChzY2FsZSA9PT0gdW5kZWZpbmVkKSBzY2FsZSA9IDE7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQpIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkKSBjb250ZXh0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IGNoaWxkTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRhcmdldElEID09IDM5NSB8fCB0YXJnZXRJRCA9PSAzMTMpIHtcclxuICAgICAgICAgICAgY2hpbGROYW1lID0gXCJzaGlwXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hpbGROYW1lID0gdGFyZ2V0SUQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoY2hpbGROYW1lKS5wb3NpdGlvbjtcclxuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IG5ldyBjYy5WZWMyKFxyXG4gICAgICAgICAgICA0MTAgKyAtTWF0aC5hYnMocG9zaXRpb24ueCkgKiBzY2FsZSxcclxuICAgICAgICAgICAgTWF0aC5hYnMocG9zaXRpb24ueSkgKiBzY2FsZSArIDEwMFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5tYXBDb250ZW50Py5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubWFwQ29udGVudD8ucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMSwgc2NhbGUpLCBjYy5tb3ZlVG8oMSwgdGFyZ2V0UG9zaXRpb24pKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5hcHBseShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVHdWlkZUJ1aWxkVXBncmFkZT8uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMSwgMSAtIDAuNSAqIChzY2FsZSAtIDEpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yb2xlQnVpbGRVcGdyYWRlPy5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQnVpbGRVcGdyYWRlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMSwgMSAtIDAuNSAqIChzY2FsZSAtIDEpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tCb29rKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQk9PSyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrVGVzdE1vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wbGF5R3VpZGVCYXJyZWxGbHkoNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlDb21wb3NlQW5pbShudW1iZXI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzE2MV9DT01QT1NFKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMubWFwQ29udGVudFxyXG4gICAgICAgICAgICA/LmdldENoaWxkQnlOYW1lKG51bWJlci50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAuY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgPy5nZXRDaGlsZEJ5TmFtZShudW1iZXIudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKS50b3VjaE5vZGUucG9zaXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmNvbXBvc2VBbmltLnBvc2l0aW9uID1cclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5jb21wb3NlQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tcG9zZUFuaW0uekluZGV4ID0gNDAwO1xyXG4gICAgICAgIHRoaXMuY29tcG9zZUFuaW0ueSA9XHJcbiAgICAgICAgICAgIHRoaXMubWFwQ29udGVudD8uY29udmVydFRvTm9kZVNwYWNlQVIocG9zaXRpb24pLnkgKyAyODtcclxuICAgICAgICB0aGlzLmNvbXBvc2VBbmltPy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVNYXBQb3NGb3JHdWlkZShcclxuICAgICAgICBhY3Rpb25UeXBlOiBudW1iZXIsXHJcbiAgICAgICAgbW92ZURpc3RhbmNlOiBudW1iZXIsXHJcbiAgICAgICAgZHVyYXRpb246IG51bWJlcixcclxuICAgICAgICBjYWxsYmFjazogRnVuY3Rpb24gfCBudWxsLFxyXG4gICAgICAgIGNvbnRleHQ6IEV2ZW50U2NyaXB0TWFuYWdlclxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFjdGlvblR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKG1vdmVEaXN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja1NlbmNlTW92ZU1hcCgxMTYsIDAuMSAqIGR1cmF0aW9uLCBjYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50Py5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMSwgY2MudjIoMCwgbW92ZURpc3RhbmNlKSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suYXBwbHkoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvblR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJlbE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iYXJyZWxOb2RlLnkgPSBtb3ZlRGlzdGFuY2UgPT0gMTA1ID8gLTIwOCA6IDEwNTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmFycmVsTm9kZT8ucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKDEsIGNjLnYyKDAsIG1vdmVEaXN0YW5jZSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmFwcGx5KGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ3VpZGVJdGVtVG9CdWlsZChpdGVtSUQ6IG51bWJlciwgdGFyZ2V0Q2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2VsbElEID0gMDtcclxuICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EYXRhQXJyYXkgPVxyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXRlbURhdGFbaXRlbUNvbmZpZy50eXBlXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1EYXRhQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzID0gITE7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaXRlbURhdGFBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGFBcnJheVtpbmRleF0uaXRlbUlEID09IGl0ZW1JRCAmJiAwID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsSUQgPSBpdGVtRGF0YUFycmF5W2luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSAhMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgxMjAwMiA9PSBpdGVtSUQgJiYgIXMpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGl0ZW1EYXRhQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEyMDAzID09IGl0ZW1EYXRhQXJyYXlbaW5kZXhdLml0ZW1JRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSBjZWxsSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsSUQgPSBpdGVtRGF0YUFycmF5W2luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gITA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLnpJbmRleCA9IDQwMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmxkUG9zaXRpb24gPSB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoYS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKGEudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLnRvdWNoTm9kZS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0V29ybGRQb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoMzk1ID09IHRhcmdldENlbGxJRCB8fCAzMTMgPT0gdGFyZ2V0Q2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0V29ybGRQb3MgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXAuY2hpbGRyZW5bMF0uY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChCdWlsZEljb25JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pdGVtSW1nLm5vZGUucG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0V29ybGRQb3MgPSB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKHRhcmdldENlbGxJRC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwQnVpbGROb2RlLmNoaWxkcmVuWzBdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZSh0YXJnZXRDZWxsSUQudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBCdWlsZE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZEljb25JdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5pdGVtSW1nLm5vZGUucG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldExvY2FsUG9zID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0V29ybGRQb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5wb3NpdGlvbiA9IGxvY2FsUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmdldENvbXBvbmVudChIYW5kQW5pbSkub25TdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZUR1cmF0aW9uID0gTWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMb2NhbFBvcy5zdWIobG9jYWxQb3NpdGlvbikubWFnKCkgLyA2MFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0ucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAuNyArIDAuMSAqIG1vdmVEdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy52Mih0YXJnZXRMb2NhbFBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMC4zICsgMC4wNSAqIG1vdmVEdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy52Mihsb2NhbFBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGd1aWRlV2F0ZXJCYXJyZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5iYXJyZWxQYXJlbnROb2RlLmNoaWxkcmVuW1xyXG4gICAgICAgICAgICB0aGlzLmJhcnJlbFBhcmVudE5vZGUuY2hpbGRyZW5Db3VudCAtIDFcclxuICAgICAgICBdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihcclxuICAgICAgICAgICAgdGhpcy5iYXJyZWxQYXJlbnROb2RlLmNoaWxkcmVuW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJyZWxQYXJlbnROb2RlLmNoaWxkcmVuQ291bnQgLSAxXHJcbiAgICAgICAgICAgIF0uY2hpbGRyZW5bMl0ucG9zaXRpb25cclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0ucG9zaXRpb24gPSBjYy52Myhsb2NhbFBvc2l0aW9uLnggKyAzMCwgbG9jYWxQb3NpdGlvbi55KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGd1aWRlTGFuZEJhcnJlbCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByb2xlTWFwRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGE7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbSBpbiByb2xlTWFwRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoMTEwMDYgPT0gcm9sZU1hcERhdGFbaXRlbV0uaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLnpJbmRleCA9IDQwMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0ucG9zaXRpb24gPSBjYy52MyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoaXRlbSkueCArIDI1LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShpdGVtKS55ICsgODhcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGd1aWRlSGVyb1RvQ29tcHNlKGhlcm9JRDogbnVtYmVyLCBpdGVtSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaGVyb0NlbGxJRCA9IDA7XHJcbiAgICAgICAgbGV0IGhlcm9DZWxsID0gMDtcclxuXHJcbiAgICAgICAgaWYgKDAgIT0gaGVyb0lEKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9JRCk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvTGlzdEZvclJvbGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmhlcm9EYXRhW2hlcm9Db25maWcub2NjdXBhdGlvbl07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhlcm9LZXkgaW4gaGVyb0xpc3RGb3JSb2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9MaXN0Rm9yUm9sZVtoZXJvS2V5XS5pdGVtSUQgPT0gaGVyb0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9DZWxsSUQgPSBoZXJvTGlzdEZvclJvbGVbaGVyb0tleV0uY2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKDNlNCA8PSBpdGVtSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhlcm9LZXkgaW4gaGVyb0xpc3RGb3JSb2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9MaXN0Rm9yUm9sZVtoZXJvS2V5XS5pdGVtSUQgPT0gaXRlbUlEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvTGlzdEZvclJvbGVbaGVyb0tleV0uY2VsbElEICE9IGhlcm9DZWxsSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvQ2VsbCA9IGhlcm9MaXN0Rm9yUm9sZVtoZXJvS2V5XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTGlzdEJ5VHlwZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLml0ZW1EYXRhW2l0ZW1Db25maWcudHlwZV07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtS2V5IGluIGl0ZW1MaXN0QnlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtTGlzdEJ5VHlwZVtpdGVtS2V5XS5pdGVtSUQgPT0gaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvQ2VsbCA9IGl0ZW1MaXN0QnlUeXBlW2l0ZW1LZXldLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgwICE9IGhlcm9DZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JsZFN0YXJ0UG9zID0gdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZShoZXJvQ2VsbElELnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoaGVyb0NlbGxJRC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLnRvdWNoTm9kZS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsVGFyZ2V0UG9zID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkU3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFdvcmxkUG9zID0gdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDaGlsZEJ5TmFtZShoZXJvQ2VsbC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKGhlcm9DZWxsLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChNYWluTWFwSXRlbSkudG91Y2hOb2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgVGFyZ2V0UG9zID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFdvcmxkUG9zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5wb3NpdGlvbiA9IGxvY2FsVGFyZ2V0UG9zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLmdldENvbXBvbmVudChIYW5kQW5pbSkub25TdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VGcmFtZXMgPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYXJnZXRQb3Muc3ViKGxvY2FsVGFyZ2V0UG9zKS5tYWcoKSAvIDYwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MucmVwZWF0Rm9yZXZlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMC43ICsgMC4xICogZGlzdGFuY2VGcmFtZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnYyKFRhcmdldFBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMC4zICsgMC4wNSAqIGRpc3RhbmNlRnJhbWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy52Mihsb2NhbFRhcmdldFBvcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tIYW5kQW5pbSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBndWlkZUlEID0gdGhpcy5ndWlkZUlEO1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oYW5kQW5pbS5zdG9wQWxsQWN0aW9ucygpO1xyXG5cclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IGd1aWRlSUQgJiYgMSA9PSBndWlkZUlEKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWlsZGVEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKDAgPT0gYnVpbGRlRGF0YS5idWlsZEx2bCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVJdGVtVG9CdWlsZCgoYSA9IDE2MDA1KSwgYnVpbGRlRGF0YS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKDEgIT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDIgPT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIDMgPT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSAzMDAwMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDE4MDAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gMzAwMDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAxODAwMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAyID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gYSA9IDMxMDAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUhlcm9Ub0NvbXBzZShhLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKDQgPT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5pc0VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlTmV3QnVpbGRVcFNvcnQoQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDYgIT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICg4ICE9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmd1aWRlSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDkgPT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzRmlyc3RHZXRDb2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxJRCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1aWxkVHlwZUVudW0uUFJJVkFURUhPVVNJTkdfVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMubWFwQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoY2VsbElELnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBCdWlsZE5vZGUuY2hpbGRyZW5bMF0uY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcEJ1aWxkTm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1aWxkSWNvbkl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnByb2R1Y3ROb2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZVNwYWNlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLnBvc2l0aW9uID0gY2MudjMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVTcGFjZS54ICsgNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVTcGFjZS55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9vcGVuQmFycmVsX1RpbWVzIDwgMTRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jdXJCYXJyZWxOdW0gPD0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlTGFuZEJhcnJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gMTYwMDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA3ID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAxNjAwMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAxMzAwMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUl0ZW1Ub0NvbXBzZShhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOSA9PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZU5ld0J1aWxkVXBTb3J0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmd1aWRlSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9vcGVuQmFycmVsX1RpbWVzIDwgMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUJhcnJlbERhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jdXJCYXJyZWxOdW0gPD0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlTGFuZEJhcnJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUhlcm9Ub0NvbXBzZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGEgPSAzMDAwMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpID0gMTgwMDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTIgPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX2NvbXBvc2VfdG90YWxfdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVOZXdCdWlsZFVwU29ydChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMSA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmlzRW5kICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVIZXJvVG9Db21wc2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhID0gMzAwMDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSA9IDE4MDAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMiA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmlzRW5kICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTIgPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yb2xlX2NvbXBvc2VfdG90YWxfdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVIZXJvVG9Db21wc2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhID0gMzEwMDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSA9IDMxMDAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxNSA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5ndWlkZUlEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5pc0VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX2NvbXBvc2VfdG90YWxfdGltZXMgPFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvID0gWzE2MDA0LCAxNzAwMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBvLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gb1tuXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5pdGVtRGF0YVtzLnR5cGVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9ICExLCBsID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5pdGVtRGF0YVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy50eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5pdGVtRGF0YVtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdW2xdLml0ZW1JRCA+PSByXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSAhMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUl0ZW1Ub0NvbXBzZShyIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUgPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX2NvbXBvc2VfdG90YWxfdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVOZXdCdWlsZFVwU29ydChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX29wZW5CYXJyZWxfVGltZXMgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVCYXJyZWxEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jdXJCYXJyZWxOdW0gPD0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUxhbmRCYXJyZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lcyA8IDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gMTYwMDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCA9PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA9IDE2MDAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA1ID09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gMTUwMDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlSXRlbVRvQ29tcHNlKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNiA9PSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX2NvbXBvc2VfdG90YWxfdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlTmV3QnVpbGRVcFNvcnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVpbGRUeXBlRW51bS5QUklWQVRFSE9VU0lOR19UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9vcGVuQmFycmVsX1RpbWVzIDwgNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IHRoaXMuYmFycmVsUGFyZW50Tm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlV2F0ZXJCYXJyZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVMYW5kQmFycmVsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA2ID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfb3BlbkJhcnJlbF9UaW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAzID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVOZXdCdWlsZFVwU29ydChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gMTYwMDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMiA9PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfY29tcG9zZV90b3RhbF90aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUl0ZW1Ub0NvbXBzZShhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX29wZW5CYXJyZWxfVGltZXMgPCAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCB0aGlzLmJhcnJlbFBhcmVudE5vZGUuY2hpbGRyZW5Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlaWQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlkZWRlc2M6IFwiMi7ngrnlh7vmsLTkuIrmnKjmobZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVXYXRlckJhcnJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZGVpZDogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogXCIzLuaJk+W8gOacqOahtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWlkZUxhbmRCYXJyZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBndWlkZUl0ZW1Ub0NvbXBzZShpdGVtSUQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZmlyc3RDZWxsSUQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IHNlY29uZENlbGxJRDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW1JRCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgIGlmICghaXRlbUNvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgIGxldCBpdGVtVHlwZSA9IGl0ZW1Db25maWcudHlwZTtcclxuICAgICAgICBsZXQgaXRlbUxpc3QgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5pdGVtRGF0YVtpdGVtVHlwZV07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbUxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaXRlbUlEID09IGl0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RDZWxsSUQgPT0gMFxyXG4gICAgICAgICAgICAgICAgICAgID8gKGZpcnN0Q2VsbElEID0gaXRlbS5jZWxsSUQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzZWNvbmRDZWxsSUQgPT09IDAgJiYgKHNlY29uZENlbGxJRCA9IGl0ZW0uY2VsbElEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG4gICAgICAgIGxldCBmaXJzdE5vZGU6IGNjLk5vZGUgPSB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXHJcbiAgICAgICAgICAgIGZpcnN0Q2VsbElELnRvU3RyaW5nKClcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBzZWNvbmROb2RlOiBjYy5Ob2RlID0gdGhpcy5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKFxyXG4gICAgICAgICAgICBzZWNvbmRDZWxsSUQudG9TdHJpbmcoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChmaXJzdE5vZGUgJiYgc2Vjb25kTm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdE5vZGVQb3NpdGlvbiA9IGZpcnN0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICBmaXJzdE5vZGUuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKS50b3VjaE5vZGUucG9zaXRpb25cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROb2RlMiA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQ/LmNvbnZlcnRUb05vZGVTcGFjZUFSKGZpcnN0Tm9kZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kTm9kZVBvc2l0aW9uID0gc2Vjb25kTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICBzZWNvbmROb2RlLmdldENvbXBvbmVudChNYWluTWFwSXRlbSkudG91Y2hOb2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZE5vZGUyID1cclxuICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudD8uY29udmVydFRvTm9kZVNwYWNlQVIoc2Vjb25kTm9kZVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0ucG9zaXRpb24gPSBuZXcgY2MuVmVjMyhmaXJzdE5vZGUyLngsIGZpcnN0Tm9kZTIueSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0/LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0/LmdldENvbXBvbmVudChIYW5kQW5pbSkub25TdG9wKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguZmxvb3Ioc2Vjb25kTm9kZTIuc3ViKGZpcnN0Tm9kZTIpLm1hZygpIC8gNjApO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRBbmltPy5ydW5BY3Rpb24oXHJcbiAgICAgICAgICAgICAgICBjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMC43ICsgMC4xICogZGlzdGFuY2UsIGNjLnYyKHNlY29uZE5vZGUyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjMgKyAwLjA1ICogZGlzdGFuY2UsIGNjLnYyKGZpcnN0Tm9kZTIpKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBndWlkZUJ1aWxkVXBCdG4oYnVpbGRJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG4gICAgICAgIGxldCBwb3NpdGlvbjtcclxuICAgICAgICBsZXQgYnVpbGRJZGVudGlmaWVyID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKGJ1aWxkSUQgPT09IDM5NSB8fCBidWlsZElEID09PSAzMTMpIHtcclxuICAgICAgICAgICAgYnVpbGRJZGVudGlmaWVyID0gXCJzaGlwXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVpbGRJZGVudGlmaWVyID0gYnVpbGRJRC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJ1aWxkSWRlbnRpZmllciA9PT0gXCJzaGlwXCIpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnNoaXA/LmNoaWxkcmVuWzBdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcC5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoQnVpbGRJY29uSXRlbSkuYnVpbGRTdGF0ZUljb25cclxuICAgICAgICAgICAgICAgICAgICAubm9kZS5wb3NpdGlvblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5tYXBDb250ZW50XHJcbiAgICAgICAgICAgICAgICA/LmdldENoaWxkQnlOYW1lKGJ1aWxkSWRlbnRpZmllcilcclxuICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pXHJcbiAgICAgICAgICAgICAgICAubWFwQnVpbGROb2RlLmNoaWxkcmVuWzBdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPy5nZXRDaGlsZEJ5TmFtZShidWlsZElkZW50aWZpZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBCdWlsZE5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KEJ1aWxkSWNvbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5idWlsZFN0YXRlSWNvbi5ub2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLm1hcENvbnRlbnQ/LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmhhbmRBbmltLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBndWlkZUJ1aWxkVXBTb3J0KGJ1aWxkVHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlPy5hY3RpdmUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmNoaWxkcmVuWzFdLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS56SW5kZXggPSA0MDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgd29ybGRQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMl0uY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5WZWMzLlpFUk9cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgd29ybGRQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5wb3NpdGlvbiA9IGNjLnYzKFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkUG9zaXRpb24ueCArIDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkUG9zaXRpb24ueVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWlsZERhdGEgPVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShidWlsZFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRBbmltLnpJbmRleCA9IDQwMTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWxEYXRhID0gVGVtcERhdGEuZ2V0QnVpbGRHdWlkZU1lcnRhcmlsRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG1hdGVyaWFsS2V5IGluIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWxFeGlzdHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgciA8IG1hdGVyaWFsRGF0YS5tZXRyYWlsTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGVyaWFsS2V5KSA9PT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxEYXRhLm1ldHJhaWxMaXN0W3JdLml0ZW1UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsRXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0ZXJpYWxFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSUQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSW50KG1hdGVyaWFsS2V5KSA9PT0gUHJvcFR5cGVFbnVtLldPT0RfVFlQRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDE2MDA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYnVpbGREYXRhLm1ldHJhaWxEYXRhW21hdGVyaWFsS2V5XS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1JRCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQobWF0ZXJpYWxLZXkpID09PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMTcwMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlSXRlbVRvQnVpbGQoaXRlbUlELCBidWlsZERhdGEuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID1cclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShidWlsZFR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoYnVpbGREYXRhKSB0aGlzLmd1aWRlQnVpbGRVcEJ0bihidWlsZERhdGEuY2VsbElEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBndWlkZU5ld0J1aWxkVXBTb3J0KGJ1aWxkVHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlPy5hY3RpdmUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmNoaWxkcmVuWzFdLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID1cclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoYnVpbGRUeXBlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtYXRlcmlhbERhdGEgPSBUZW1wRGF0YS5nZXRCdWlsZEd1aWRlTWVydGFyaWxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWxJbmRleCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbWF0ZXJpYWxLZXkgaW4gYnVpbGREYXRhLm1ldHJhaWxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRlcmlhbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdvcmxkUG9zaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVCdWlsZE1lcnRyYWlsTm9kZS5jaGlsZHJlbltcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmNoaWxkcmVuWzRdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0ucG9zaXRpb24gPSBjYy52MyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsUG9zaXRpb24ueCArIDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRlcmlhbEV4Y2VlZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBtYXRlcmlhbERhdGEubWV0cmFpbExpc3QubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRNZWF0cmlsW2NdLmlkID09PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVttYXRlcmlhbEtleV0uaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLmdldEJ1aWxkR3VpZGVNZXJ0YXJpbE51bUJ5SUQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLmJ1aWxkSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRNZWF0cmlsW2NdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApID49IHRoaXMuX2J1aWxkTWVhdHJpbFtjXS5tYXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEV4Y2VlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0ZXJpYWxFeGNlZWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd29ybGRQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZUJ1aWxkTWVydHJhaWxOb2RlLmNoaWxkcmVuW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsSW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uY2hpbGRyZW5bNF0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5wb3NpdGlvbiA9IGNjLnYzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi54ICsgMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFBvc2l0aW9uLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS56SW5kZXggPSA0MDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHVwZ3JhZGVCdXR0b25Xb3JsZFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZVVwZ3JhZGVCdG4uY29udmVydFRvV29ybGRTcGFjZUFSKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5WZWMzLlpFUk9cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVwZ3JhZGVCdXR0b25Mb2NhbFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZ3JhZGVCdXR0b25Xb3JsZFBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0ucG9zaXRpb24gPSBjYy52MyhcclxuICAgICAgICAgICAgICAgICAgICB1cGdyYWRlQnV0dG9uTG9jYWxQb3NpdGlvbi54ICsgNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBncmFkZUJ1dHRvbkxvY2FsUG9zaXRpb24ueVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKGJ1aWxkVHlwZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhID1cclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShidWlsZFR5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLmd1aWRlQnVpbGRVcEJ0bihidWlsZERhdGEuY2VsbElEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrR3VpZGVPbmVLZXlBZGRJdGVtKGV2ZW50OiBjYy5FdmVudCwgaW5kZXg6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldEluZGV4ID0gcGFyc2VJbnQoaW5kZXgpO1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5fYnVpbGRJRCk7XHJcbiAgICAgICAgaWYgKCFidWlsZENvbmZpZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBidWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoXHJcbiAgICAgICAgICAgIGJ1aWxkQ29uZmlnLmJ1aWxkVHlwZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IG1hdGVyaWFsS2V5IGluIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEluZGV4ID09PSB0YXJnZXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLm1ldHJhaWxEYXRhW21hdGVyaWFsS2V5XS5pZFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEub25la2V5R2V0R3VpZGVBbGxNZXJ0cmFpbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRDb25maWcuYnVpbGRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U3Bpcml0TG9jaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRyZWVMb2NrLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlTG9jay56SW5kZXggPSBnbS5jb25zdC5NQVhfQ0VMTF9OVU0gKyAzO1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCIyMjNcIik7XHJcbiAgICAgICAgdGhpcy50cmVlTG9jay55ID0gY2VsbC55ICsgMTg4O1xyXG4gICAgICAgIHRoaXMudHJlZUxvY2sueCA9IGNlbGwueCArIDU7XHJcbiAgICAgICAgdGhpcy50cmVlTG9jay5zY2FsZSA9IDEgLSAwLjUgKiAodGhpcy5tYXBDb250ZW50LnNjYWxlIC0gMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dIZXJvVW5sb2NrQW5pKG51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0Lk5FV0hFUk9BTklNLmtleSwgbnVtKTtcclxuICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0Lk5FV0hFUk9BTklNKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NhdmVzTG9jaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhdmVzTG9jay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2F2ZXNMb2NrLnpJbmRleCA9IGdtLmNvbnN0Lk1BWF9DRUxMX05VTSArIDM7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShcIjE0M1wiKTtcclxuICAgICAgICB0aGlzLmNhdmVzTG9jay55ID0gbm9kZS55ICsgMTg4O1xyXG4gICAgICAgIHRoaXMuY2F2ZXNMb2NrLnggPSBub2RlLnggKyA1O1xyXG4gICAgICAgIHRoaXMuY2F2ZXNMb2NrLnNjYWxlID0gMSAtIDAuNSAqICh0aGlzLm1hcENvbnRlbnQuc2NhbGUgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheVVuTG9ja01haW5Ub3dlck1vdmVNYXAodG93ZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy5tYXBDb250ZW50Py5nZXRDaGlsZEJ5TmFtZSh0b3dlck5hbWUpO1xyXG4gICAgICAgIGlmICghdGFyZ2V0Tm9kZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldE5vZGUucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5tYXBDb250ZW50Py5zdG9wQWxsQWN0aW9ucygpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcENvbnRlbnQ/LnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKDIsIDEuMiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy52MigzNjAgLSB0YXJnZXRQb3NpdGlvbi54LCAtdGFyZ2V0UG9zaXRpb24ueSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFzay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheUxvY2tTZW5zZU1vdmVNYXBUb0Z1bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShcIjIyM1wiKS5wb3NpdGlvbixcclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKFwiMjE1XCIpLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCI5XCIpLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCIxXCIpLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCIxMTZcIikucG9zaXRpb24sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXBDb250ZW50Py5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubWFwQ29udGVudD8ucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMiwgMS4yKSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMiwgY2MudjIoMzYwIC0gcG9zaXRpb25zWzBdLngsIC1wb3NpdGlvbnNbMF0ueSkpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDIsIGNjLnYyKDM2MCAtIHBvc2l0aW9uc1sxXS54LCAtcG9zaXRpb25zWzFdLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgyKSxcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygyLCBjYy52MigzNjAgLSBwb3NpdGlvbnNbMl0ueCwgLXBvc2l0aW9uc1syXS55KSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMiksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlVG8oMiwgY2MudjIoMzYwIC0gcG9zaXRpb25zWzNdLngsIC1wb3NpdGlvbnNbM10ueSkpLFxyXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDIpLFxyXG4gICAgICAgICAgICAgICAgY2MubW92ZVRvKDIsIGNjLnYyKDM2MCAtIHBvc2l0aW9uc1s0XS54LCAtcG9zaXRpb25zWzRdLnkpKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TG9ja1NlbmNlTW92ZU1hcChcclxuICAgICAgICBlbGVtZW50TmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGR1cmF0aW9uOiBudW1iZXIgPSAxLjVcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFzay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID1cclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGVsZW1lbnROYW1lKS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1hcENvbnRlbnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm1hcENvbnRlbnQucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNwYXduKFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMSwgZHVyYXRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVUbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudjIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtdGFyZ2V0UG9zaXRpb24ueCAqIGR1cmF0aW9uICsgMzYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLXRhcmdldFBvc2l0aW9uLnkgKiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZEFuaW0uekluZGV4ID0gNDAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlUG9zaXRpb24gPSB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENoaWxkQnlOYW1lKGVsZW1lbnROYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG91Y2hOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q2hpbGRCeU5hbWUoZWxlbWVudE5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbXBvbmVudChNYWluTWFwSXRlbSkudG91Y2hOb2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIobm9kZVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kQW5pbS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJvcGVuX3NwZWNpYWxfZnVuXCIsIHBhcnNlSW50KGVsZW1lbnROYW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDQyID09IHBhcnNlSW50KGVsZW1lbnROYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkucm9sZUJ1aWxkQW5pbU5vZGVbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgyNyA9PSBwYXJzZUludChlbGVtZW50TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnJvbGVCdWlsZEFuaW1Ob2RlWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yb2xlR3VpZGVCdWlsZFVwZ3JhZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlQnVpbGRVcGdyYWRlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMSwgMSAtIDAuNSAqIChkdXJhdGlvbiAtIDEpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yb2xlQnVpbGRVcGdyYWRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVCdWlsZFVwZ3JhZGUucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgY2Muc2NhbGVUbygxLCAxIC0gMC41ICogKGR1cmF0aW9uIC0gMSkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFJlZEJ0bkJvb2soYWN0aXZlOiBib29sZWFuIHwgbnVsbCA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbmV3VCA9IGFjdGl2ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFjdGl2ZTtcclxuICAgICAgICBpZiAobmV3VCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBuZXdUID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuY2hlY2tCb29rSXRlbUhhdmVVbmxvY2tSZXdhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWRfYnRuX2Jvb2suYWN0aXZlID0gbmV3VDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRlc3QoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWFwQ2VsbENmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0TWFwQ2VsbENmZygpO1xyXG4gICAgICAgIGxldCBxdXl1ID0gXCJsZXQgcXV5dSA9IFtcIjtcclxuICAgICAgICBsZXQgcGxhbnRJRCA9IFwibGV0IHBsYW50SUQgPSBbXCI7XHJcbiAgICAgICAgbGV0IGxhbmRJbWdJRCA9IFwibGV0IGxhbmRJbWdJRCA9IFtcIjtcclxuICAgICAgICBsZXQgbGFuZFlPZmZzZXQgPSBcImxldCBsYW5kWU9mZnNldCA9IFtcIjtcclxuICAgICAgICBsZXQgcGxhbnRYT2Zmc2V0ID0gXCJsZXQgcGxhbnRYT2Zmc2V0ID0gW1wiO1xyXG4gICAgICAgIGxldCBwbGFudFlPZmZzZXQgPSBcImxldCBwbGFudFlPZmZzZXQgPSBbXCI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgbWFwQ2VsbENmZy5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICBxdXl1ICs9IGAke21hcENlbGxDZmdbc10uYXJlYUlEfSxgO1xyXG4gICAgICAgICAgICBwbGFudElEICs9IGAke21hcENlbGxDZmdbc10ucGxhbnRJRH0sYDtcclxuICAgICAgICAgICAgbGFuZEltZ0lEICs9IGAke21hcENlbGxDZmdbc10ubGFuZEltZ0lEfSxgO1xyXG4gICAgICAgICAgICBsYW5kWU9mZnNldCArPSBgJHttYXBDZWxsQ2ZnW3NdLmxhbmRZT2Zmc2V0fSxgO1xyXG4gICAgICAgICAgICBwbGFudFhPZmZzZXQgKz0gYCR7bWFwQ2VsbENmZ1tzXS5wbGFudFhPZmZzZXR9LGA7XHJcbiAgICAgICAgICAgIHBsYW50WU9mZnNldCArPSBgJHttYXBDZWxsQ2ZnW3NdLnBsYW50WU9mZnNldH0sYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHF1eXUgKz0gXCJdO1wiO1xyXG4gICAgICAgIHBsYW50SUQgKz0gXCJdO1wiO1xyXG4gICAgICAgIGxhbmRJbWdJRCArPSBcIl07XCI7XHJcbiAgICAgICAgbGFuZFlPZmZzZXQgKz0gXCJdO1wiO1xyXG4gICAgICAgIHBsYW50WE9mZnNldCArPSBcIl07XCI7XHJcbiAgICAgICAgcGxhbnRZT2Zmc2V0ICs9IFwiXTtcIjtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cocXV5dSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGxhbnRJRCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cobGFuZEltZ0lEKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhsYW5kWU9mZnNldCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGxhbnRYT2Zmc2V0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwbGFudFlPZmZzZXQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==