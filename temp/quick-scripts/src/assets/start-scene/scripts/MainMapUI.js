"use strict";
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