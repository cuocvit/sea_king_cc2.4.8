
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MapCellCfgData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '972a4kT7SFM1bLrlsMH6fzI', 'MapCellCfgData');
// start-scene/scripts/MapCellCfgData.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefenseHeroItemVO = exports.SuperHeroVO = exports.GuideGiftVO = exports.GuideVO = exports.heroUnloockData = exports.roleBarrelItemVO = exports.RoleBarrelDataVO = exports.RoleProductDataVO = exports.RoleItemDataVO = exports.roleGoBattleItemVO = exports.RoleBuildDataVO = exports.MapItemDataVO = exports.roleMapItemVO = exports.roleCoinDataVO = exports.MapCellCfgData = void 0;
//
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
var Utils_1 = require("./Utils");
var TempData_1 = require("./TempData");
var TaskData_1 = require("./TaskData");
var MainMapItem_1 = require("./MainMapItem");
var PropItem_1 = require("./PropItem"); // js
var NetUtils_1 = require("./NetUtils");
var listTypeEnum;
(function (listTypeEnum) {
    listTypeEnum[listTypeEnum["SHOW_AREA_TYPE"] = 1] = "SHOW_AREA_TYPE";
    listTypeEnum[listTypeEnum["MAP_TOTAL_TYPE"] = 2] = "MAP_TOTAL_TYPE";
    listTypeEnum[listTypeEnum["NEW_UNLOCK_CELL_TYPE"] = 3] = "NEW_UNLOCK_CELL_TYPE";
    listTypeEnum[listTypeEnum["NEW_UNLOCK_AREA_TYPE"] = 4] = "NEW_UNLOCK_AREA_TYPE";
    listTypeEnum[listTypeEnum["AREA_LOCK_CELL_TYPE"] = 5] = "AREA_LOCK_CELL_TYPE";
    listTypeEnum[listTypeEnum["REPORT_CELL_TYPE"] = 6] = "REPORT_CELL_TYPE";
    listTypeEnum[listTypeEnum["SPACE_TYPE"] = 7] = "SPACE_TYPE";
})(listTypeEnum || (listTypeEnum = {}));
;
var MapCellCfgData = /** @class */ (function (_super) {
    __extends(MapCellCfgData, _super);
    function MapCellCfgData() {
        var _this = _super.call(this) || this;
        _this.getBuildProduct = function (t) {
            if (this.buildData[t].productData && t != Constants_1.BuildTypeEnum.WHARFTAX_TYPE) {
                var productData = this.buildData[t].productData;
                var coin = void 0;
                if (0 == productData.fullTime) {
                    coin = productData.curNum;
                }
                else if (productData.fullTime > Math.floor(Date.now() / 1e3)) {
                    if (productData.beginTime + productData.productCd > Math.floor(Date.now() / 1e3)) {
                        coin = productData.curNum;
                    }
                    else {
                        coin = Math.floor((Math.floor(Date.now() / 1e3) - productData.beginTime) / productData.productCd * productData.productNum);
                    }
                }
                else {
                    coin = productData.maxNum;
                }
                if (0 < coin) {
                    var i = GameManager_1.gm.data.config_data.getItemCfgByID(this.buildData[t].productData.productID);
                    if (i) {
                        if (i.type == Constants_1.PropTypeEnum.COIN_TYPE) {
                            this.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, coin);
                        }
                        else {
                            for (var o = 0; o < coin; o++) {
                                this.addWareHouseItem(productData.productID, 1);
                            }
                            GameManager_1.gm.ui.emit("ship_goods_change");
                        }
                        this.buildData[t].productData.curNum = 0;
                        this.buildData[t].productData.beginTime = Math.floor(Date.now() / 1e3);
                        this.buildData[t].productData.fullTime = Math.floor(Date.now() / 1e3) + Math.round((productData.maxNum - productData.curNum) / productData.productNum) * productData.productCd;
                        this.async_write_data();
                    }
                }
            }
        };
        _this.STORAGE_KEY = "MapCellConfigData";
        _this.is_first_auto_compose = 0;
        _this.role_compose_total_times = 0;
        _this.role_compose_times = 0;
        _this.role_map_data = {};
        _this.role_map_total_data = [];
        _this.role_map_report_data = [];
        _this.role_cur_unlock_area_ID = 1;
        _this.role_cur_unlock_area_sort = 0;
        _this.roleShowAreaIDList = [];
        _this.roleUnlockAreaIDList = [];
        _this.areaUnlockCellIDList = [];
        _this._curNewUnlockCellList = [];
        _this.role_item_array = 0;
        _this.role_openBarrel_Times = 0;
        _this.roleBarrelData = null;
        _this.roleCoinData = null;
        _this.heroData = {};
        _this.buildData = {};
        _this.itemData = {};
        _this.role_build_lock_num = 0;
        _this.barracks_unlock_data = [];
        _this.waterBarrelList = [];
        _this._warehouseList = [];
        _this._warehouseIsNewList = [];
        _this._needRefreshCellList = [];
        _this.roleSpaceList = [];
        _this.tUnlockData = {};
        _this.roleGuideVO = null;
        _this.isGuide = true;
        _this.isFirstGetCoin = true;
        _this.nextDayTime = 0;
        _this.isFirstBattle = true;
        _this.specialList = {};
        _this.heroSkillList = {};
        _this.diamond_buy_barrel_times = 0;
        _this.watch_ad_buy_barrel_times = 0;
        _this.buyBarrelNumTimes = 0;
        _this.guideGift = null;
        _this.lockArea = {};
        _this.last_timestamp = 0;
        _this.barracks_unlock_id_list = {};
        _this.defense_List = {};
        _this._defenseList = {};
        _this.heroTotalNum = 1;
        _this.is_upgrade_skill = 0;
        _this.superHeroData = [];
        _this.initOpenBarrelData = 37;
        return _this;
    }
    MapCellCfgData.prototype.setAutoComposeUsed = function () {
        this.is_first_auto_compose = 1;
        this.async_write_data();
    };
    MapCellCfgData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (t) {
            if (_this.is_init) {
                TempData_1.TempData.isShowOffline = 600 < Math.floor(Date.now() / 1e3) - GameManager_1.gm.data.mapCell_data.last_timestamp;
                if (TempData_1.TempData.isShowOffline) {
                    TempData_1.TempData.offline_time = Math.floor(Date.now() / 1e3) - GameManager_1.gm.data.mapCell_data.last_timestamp;
                }
                _this.checkLocalData();
                if (_this._warehouseList.length != _this._warehouseIsNewList.length) {
                    _this._warehouseIsNewList = [];
                    for (var index = 0; index < _this._warehouseList.length; index++) {
                        _this._warehouseIsNewList.push(1);
                    }
                }
                if (2 <= _this.buildData[Constants_1.BuildTypeEnum.TOWER_TYPE].buildLvl &&
                    _this.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE] &&
                    395 != _this.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].cellID) {
                    _this.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].cellID = 395;
                }
                if (0 == Object.keys(_this.lockArea).length) {
                    _this.initLockArea();
                }
                _this.barracks_unlock_id_list = {};
                for (var index = 0; index < _this.barracks_unlock_data.length; index++) {
                    if (0 < _this.barracks_unlock_data[index].state) {
                        (_this.barracks_unlock_id_list[_this.barracks_unlock_data[index].unlockId] = 2);
                    }
                }
                for (var index = 0; index < _this.roleUnlockAreaIDList.length; index++) {
                    if (_this.roleUnlockAreaIDList[index] >= _this.role_cur_unlock_area_ID) {
                        var areaIDs = GameManager_1.gm.data.config_data.getAreaIDList(_this.roleUnlockAreaIDList[index]);
                        if (areaIDs) {
                            if (_this.roleUnlockAreaIDList[index] > _this.role_cur_unlock_area_ID) {
                                for (var key in areaIDs) {
                                    if (10000 != areaIDs[key].comTimes) {
                                        _this.addIndexToList(listTypeEnum.AREA_LOCK_CELL_TYPE, areaIDs[key].cellID);
                                    }
                                }
                            }
                            else {
                                for (var key in areaIDs) {
                                    if (parseInt(key) >= _this.role_cur_unlock_area_sort) {
                                        _this.addIndexToList(listTypeEnum.AREA_LOCK_CELL_TYPE, areaIDs[key].cellID);
                                    }
                                }
                            }
                        }
                    }
                }
                TempData_1.TempData.initGuideTempData();
                var time = new Date;
                var timestamp = Math.floor(time.getTime() / 1000);
                var adjustedTimestamp = timestamp - (timestamp - 60 * time.getTimezoneOffset()) % 86400;
                if (adjustedTimestamp >= _this.nextDayTime) {
                    _this.nextDayTime = 86400 + adjustedTimestamp;
                    _this.isFirstBattle = true;
                }
                _this.sortTask(_this.barracks_unlock_data);
                if (!_this.guideGift) {
                    _this.guideGift = new GuideGiftVO;
                    _this.guideGift.guideBeginTime = Math.floor(Date.now() / 1e3);
                    _this.guideGift.guideIsGet = false;
                }
            }
            else {
                _this.roleBarrelData = new RoleBarrelDataVO;
                _this.roleBarrelData.curBarrelNum = 0;
                _this.roleBarrelData.maxBarrelNum = 0;
                _this.roleBarrelData.freeBarrelCd = 0;
                _this.roleBarrelData.nextFreeBarrelNum = 0;
                _this.roleBarrelData.nextFreeBarrelTime = 0;
                _this.roleBarrelData.curFreeBarrelTime = 0;
                _this.role_build_lock_num = 0;
                _this.roleCoinData = new roleCoinDataVO;
                _this.roleCoinData.coinNum = 80;
                _this.roleCoinData.diamondNum = 10;
                _this.roleShowAreaIDList = [_this.role_cur_unlock_area_ID];
                _this.openNewAreaByID(_this.role_cur_unlock_area_ID);
                _this.unlockNewAreaID(_this.role_cur_unlock_area_ID);
                _this.waterBarrelList = [];
                var vec3 = [cc.v3(221, -1003), cc.v3(281, -1025), cc.v3(377, -1e3)];
                for (var index = 0; index < vec3.length; index++) {
                    var barrelIte = new roleBarrelItemVO;
                    barrelIte.itemID = 11006;
                    barrelIte.itemIndex = index;
                    barrelIte.itemPos = vec3[index];
                    _this.waterBarrelList.push(barrelIte);
                }
                _this.guideGift = new GuideGiftVO;
                _this.guideGift.guideBeginTime = Math.floor(Date.now() / 1e3);
                _this.guideGift.guideIsGet = false;
                var heroCfg = GameManager_1.gm.config.get_config_data("HeroConfigData");
                for (var key in heroCfg.data) {
                    var data = heroCfg.data[key];
                    if (0 < data.unlock) {
                        var heroUnloock = new heroUnloockData;
                        heroUnloock.heroId = data.heroid;
                        heroUnloock.unlockId = data.unlock;
                        heroUnloock.state = 0;
                        heroUnloock.ani_state = 0;
                        _this.barracks_unlock_data.push(heroUnloock);
                    }
                }
                _this.sortTask(_this.barracks_unlock_data);
                var date = new Date;
                var timestamp = Math.floor(date.getTime() / 1e3);
                _this.nextDayTime = timestamp - (timestamp - 60 * date.getTimezoneOffset()) % 86400 + 86400;
                _this.isFirstBattle = true;
                _this.is_init = true;
                _this.initSpecialData();
                _this.heroSkillList = {};
                _this.initGuideData();
                _this.initLockArea();
                _this.reelUnlcokHero(23001);
                _this.async_write_data();
            }
            if (callback) {
                callback(t);
            }
        });
    };
    MapCellCfgData.prototype.checkLocalData = function () {
        if (!this.isGuide) {
            var newArr = [];
            for (var buildKey in this.buildData) {
                var cellID = this.buildData[buildKey].cellID;
                if (395 != cellID &&
                    313 != cellID &&
                    null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != this.buildData[buildKey].buildID) {
                    newArr.push(cellID);
                    this.role_map_data[cellID].itemID = this.buildData[buildKey].buildID;
                    this.role_map_data[cellID].itemType = Constants_1.ItemTypeEnum.BUILD_TYPE;
                    this.role_map_data[cellID].heroUID = 0;
                }
            }
            if (this.role_map_data[999]) {
                delete this.role_map_data[999];
            }
            for (var heroKey in this.heroData) {
                for (var heroIndex = this.heroData[heroKey].length - 1; 0 <= heroIndex; heroIndex--) {
                    var cellID = this.heroData[heroKey][heroIndex].cellID;
                    var itemID = this.heroData[heroKey][heroIndex].itemID;
                    if (999 != cellID) {
                        if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != itemID) {
                            var isCheck = false;
                            for (var index = 0; index < newArr.length; index++) {
                                if (newArr[index] == cellID) {
                                    this.heroData[heroKey].splice(index, 1);
                                    isCheck = true;
                                    break;
                                }
                            }
                            if (!isCheck) {
                                newArr.push(cellID);
                                this.role_map_data[cellID].itemID = itemID;
                                this.role_map_data[cellID].itemType = Constants_1.ItemTypeEnum.HERO_TYPE;
                                this.role_map_data[cellID].heroUID = this.heroTotalNum;
                                this.heroTotalNum++;
                            }
                        }
                    }
                    else {
                        this.heroData[heroKey].splice(heroIndex, 1);
                    }
                }
            }
            for (var itemKey in this.itemData) {
                for (var itemIndex = this.itemData[itemKey].length - 1; 0 <= itemIndex; itemIndex--) {
                    var cellID = this.itemData[itemKey][itemIndex].cellID;
                    var itemID = this.itemData[itemKey][itemIndex].itemID;
                    if (999 != cellID) {
                        if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != itemID) {
                            var isCheck = false;
                            for (var index = 0; index < newArr.length; index++)
                                if (newArr[index] == cellID) {
                                    this.itemData[itemKey].splice(index, 1);
                                    isCheck = true;
                                    break;
                                }
                            if (!isCheck) {
                                newArr.push(cellID);
                                this.role_map_data[cellID].itemID = itemID;
                                this.role_map_data[cellID].itemType = Constants_1.ItemTypeEnum.ITEM_TYPE;
                                this.role_map_data[cellID].heroUID = 0;
                            }
                        }
                    }
                    else {
                        this.itemData[itemKey].splice(itemIndex, 1);
                    }
                }
            }
            for (var defense in this._defenseList) {
                var cellID = this._defenseList[defense].cellID;
                if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != this._defenseList[defense].heroid) {
                    newArr.push(cellID);
                    delete this._defenseList[defense];
                }
            }
            for (var heroData = this.superHeroData.length - 1; 0 <= heroData; heroData--) {
                var cellID = this.superHeroData[heroData].cellID;
                if (null != this.role_map_data[cellID] && this.role_map_data[cellID].itemID != this.superHeroData[heroData].heroid) {
                    newArr.push(cellID);
                    this.superHeroData.splice(heroData, 1);
                }
            }
            console.log("需要校正的格子" + newArr);
            if (0 < newArr.length) {
                newArr.sort();
                var uniqueCellIDs = [newArr[0]];
                for (var index = 1; index < newArr.length; index++) {
                    if (newArr[index] !== newArr[index - 1]) {
                        uniqueCellIDs.push(newArr[index]);
                    }
                }
                for (var index = 0; index < newArr.length; index++) {
                    GameManager_1.gm.ui.emit("item_children_refresh", newArr[index]);
                }
            }
        }
    };
    MapCellCfgData.prototype.sortTask = function (tasks) {
        tasks.sort(function (t, e) {
            var rowA = GameManager_1.gm.config.get_row_data("HeroConfigData", t.heroId.toString());
            var rowB = GameManager_1.gm.config.get_row_data("HeroConfigData", e.heroId.toString());
            return t.state > e.state || !(t.state < e.state || rowA.sort > rowB.sort) ? -1 : 1;
        });
    };
    MapCellCfgData.prototype.reelUnlcokHero = function (heroId) {
        this.addBarracksIDToList(heroId);
        for (var i = 0; i < this.barracks_unlock_data.length; i++) {
            if (heroId === this.barracks_unlock_data[i].unlockId && this.barracks_unlock_data[i].state === 0) {
                this.barracks_unlock_data[i].state = 1;
                this.barracks_unlock_data[i].ani_state = 0;
                break;
            }
        }
    };
    MapCellCfgData.prototype.getReelUnlcokHeroID = function (heroId) {
        for (var i = 0; i < this.barracks_unlock_data.length; ++i) {
            if (heroId == this.barracks_unlock_data[i].heroId && this.barracks_unlock_data[i].state > 0) {
                return true;
            }
        }
        return false;
    };
    MapCellCfgData.prototype.compositeUnlockHero = function (heroId) {
        for (var i = 0; i < this.barracks_unlock_data.length; ++i) {
            if (heroId === this.barracks_unlock_data[i].heroId && this.barracks_unlock_data[i].state == 1) {
                this.barracks_unlock_data[i].state = 2;
                this.barracks_unlock_data[i].ani_state = 0;
                break;
            }
        }
    };
    MapCellCfgData.prototype.initLockArea = function () {
        for (var key in GameManager_1.gm.const.localCloudAreaList) {
            this.lockArea[key] = 1;
        }
    };
    MapCellCfgData.prototype.getCellIsWall = function (cellID) {
        var heroCfg;
        return (!(!this.role_map_data[cellID] || this.role_map_data[cellID].itemType != Constants_1.ItemTypeEnum.HERO_TYPE)) &&
            !(!(heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[cellID].itemID)) || 10 != heroCfg.occupation);
    };
    MapCellCfgData.prototype.getMapdataByCellID = function (cellID) {
        return this.role_map_data[cellID] && this.role_map_data[cellID].heroUID && this.role_map_data[cellID].heroUID > 0
            ? this.role_map_data[cellID].heroUID
            : 0;
    };
    MapCellCfgData.prototype.unlockSpecialArea = function (areaID) {
        this.lockArea[areaID] = 2;
        this.async_write_data();
    };
    MapCellCfgData.prototype.getIsUnlock = function (areaID) {
        for (var i = 0; i < this.role_map_total_data.length; i++) {
            if (areaID == this.role_map_total_data[i])
                return true;
        }
        return false;
    };
    MapCellCfgData.prototype.initSpecialData = function () {
        this.specialList = {};
        var specialListConfig = GameManager_1.gm.data.config_data.getSpecialList();
        for (var key in specialListConfig) {
            var areaID = parseInt(key);
            if (!this.specialList[areaID]) {
                this.specialList[areaID] = {};
            }
            this.specialList[areaID].state = 1;
            for (var index = 0; index < specialListConfig[key].prop.length; index++) {
                if (0 < specialListConfig[key].prop[index]) {
                    if (!this.specialList[areaID].mertrail) {
                        this.specialList[areaID].mertrail = {};
                    }
                    this.specialList[areaID].mertrail[specialListConfig[key].prop[index]] = 0;
                }
            }
        }
    };
    MapCellCfgData.prototype.openNewAreaByID = function (areaID) {
        this.addIndexToList(listTypeEnum.SHOW_AREA_TYPE, areaID);
        var areaConfig = GameManager_1.gm.data.config_data.getAreaIDList(areaID);
        if (areaConfig) {
            for (var key in areaConfig) {
                if (areaConfig[key].comTimes === 10000) {
                    if (areaID > 1) {
                        this.addIndexToList(listTypeEnum.NEW_UNLOCK_CELL_TYPE, areaConfig[key].cellID);
                    }
                    this.addIndexToList(listTypeEnum.MAP_TOTAL_TYPE, areaConfig[key].cellID);
                }
            }
        }
    };
    MapCellCfgData.prototype.getAreaIDIsUnLock = function (areaID) {
        for (var index = 0; index < this.roleUnlockAreaIDList.length; index++) {
            if (areaID === this.roleUnlockAreaIDList[index])
                return true;
        }
        return false;
    };
    MapCellCfgData.prototype.unlockNewAreaID = function (areaID, isSpecial) {
        if (isSpecial === void 0) { isSpecial = false; }
        this.addIndexToList(listTypeEnum.SHOW_AREA_TYPE, areaID);
        var areaConfig = GameManager_1.gm.data.config_data.getAreaIDList(areaID);
        if (areaConfig) {
            var isCheck = false;
            this.addIndexToList(listTypeEnum.NEW_UNLOCK_AREA_TYPE, areaID);
            if (!this.getNextLockCell()) {
                var nextAreaID = this.role_cur_unlock_area_ID + 1;
                if (this.getAreaIDIsUnLock(nextAreaID)) {
                    this.role_cur_unlock_area_ID = nextAreaID;
                    this.role_cur_unlock_area_sort = 0;
                    isCheck = !(this.role_compose_times = 0);
                }
            }
            for (var key in areaConfig) {
                if (10000 == areaConfig[key].comTimes) {
                    if (1 < areaID && areaID != GameManager_1.gm.const.CAVESAREAID) {
                        this.addIndexToList(listTypeEnum.NEW_UNLOCK_CELL_TYPE, areaConfig[key].cellID);
                        if (!(isSpecial && (areaID == GameManager_1.gm.const.ICEAREAID || areaID == GameManager_1.gm.const.FIREREAID))) {
                            this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, areaConfig[key].cellID);
                        }
                    }
                    if (1 == areaID) {
                        this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, areaConfig[key].cellID);
                    }
                    if (0 == areaConfig[key].isObstruct && areaID != GameManager_1.gm.const.CAVESAREAID) {
                        var mapItemDataVO = new MapItemDataVO;
                        mapItemDataVO.cellState = 2;
                        mapItemDataVO.itemState = 2;
                        mapItemDataVO.itemID = areaConfig[key].itemID;
                        mapItemDataVO.cellID = areaConfig[key].cellID;
                        mapItemDataVO.heroUID = 0;
                        mapItemDataVO.itemType = areaConfig[key].itemType;
                        this.role_map_data[areaConfig[key].cellID] = mapItemDataVO;
                        if (0 < areaConfig[key].itemID) {
                            if (areaConfig[key].itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                                this.addBuild(areaConfig[key].itemID, areaConfig[key].cellID);
                            }
                            else {
                                this.addRoleItem(areaConfig[key].itemID, areaConfig[key].cellID);
                                if (30000 < areaConfig[key].itemID) {
                                    this.role_map_data[areaConfig[key].cellID].heroUID = this.heroTotalNum;
                                    this.heroTotalNum++;
                                }
                            }
                        }
                        else {
                            this.addRoleSpaceCellByID(areaConfig[key].cellID);
                        }
                        this.checkBuildIsActive(areaConfig[key].cellID);
                        if (1 < areaID) {
                            NetUtils_1.ReportData.instance.report_once_point(50000 + areaConfig[key].cellID);
                            GameManager_1.gm.channel.report_event("unlock_map_cell", {
                                event_desc: "解锁地图格子",
                                cell_count: areaConfig[key].cellID,
                                desc: cc.js.formatStr("解锁地图格子%d", areaConfig[key].cellID)
                            });
                        }
                    }
                    if (!(!isCheck && 1 != areaID)) {
                        this.role_cur_unlock_area_sort++;
                    }
                }
                else {
                    this.addIndexToList(listTypeEnum.AREA_LOCK_CELL_TYPE, areaConfig[key].cellID);
                }
            }
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.lockCaveAllInitCell = function (areaID) {
        var areaConfig = GameManager_1.gm.data.config_data.getAreaIDList(areaID);
        if (areaConfig) {
            for (var key in areaConfig) {
                if (10000 == areaConfig[key].comTimes) {
                    this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, areaConfig[key].cellID);
                    if (0 == areaConfig[key].isObstruct) {
                        var mapItemDataVO = new MapItemDataVO;
                        mapItemDataVO.cellState = 2;
                        mapItemDataVO.itemState = 2;
                        mapItemDataVO.itemID = areaConfig[key].itemID;
                        mapItemDataVO.cellID = areaConfig[key].cellID;
                        mapItemDataVO.heroUID = 0;
                        mapItemDataVO.itemType = areaConfig[key].itemType;
                        this.role_map_data[areaConfig[key].cellID] = mapItemDataVO;
                        if (0 < areaConfig[key].itemID) {
                            if (areaConfig[key].itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                                this.addBuild(areaConfig[key].itemID, areaConfig[key].cellID);
                            }
                            else {
                                this.addRoleItem(areaConfig[key].itemID, areaConfig[key].cellID);
                            }
                        }
                        else {
                            this.addRoleSpaceCellByID(areaConfig[key].cellID);
                        }
                        NetUtils_1.ReportData.instance.report_once_point(5e4 + areaConfig[key].cellID);
                        GameManager_1.gm.channel.report_event("unlock_map_cell", {
                            event_desc: "解锁地图格子",
                            cell_count: areaConfig[key].cellID,
                            desc: cc.js.formatStr("解锁地图格子%d", areaConfig[key].cellID)
                        });
                    }
                }
            }
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.addRoleSpaceCellByID = function (cellID) {
        this.addIndexToList(listTypeEnum.SPACE_TYPE, cellID);
    };
    MapCellCfgData.prototype.getRoleSkillData = function (skillID) {
        return this.heroSkillList[skillID] || { lvl: 0, num: 0 };
    };
    MapCellCfgData.prototype.upgradeRoleSkillData = function (skillID) {
        if (this.heroSkillList[skillID]) {
            this.heroSkillList[skillID].lvl += 1;
            this.heroSkillList[skillID].num = 0;
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.getMySoulNum = function () {
        var soulData = this.itemData[Constants_1.PropTypeEnum.SOUL_TYPE];
        var totalSoulNum = 0;
        if (soulData) {
            for (var index = 0; index < soulData.length; index++) {
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(soulData[index].itemID);
                if (itemConfig) {
                    totalSoulNum += itemConfig.number;
                }
            }
        }
        return totalSoulNum;
    };
    MapCellCfgData.prototype.addRoleSkillItemData = function (skillID, requiredNum) {
        if (!this.heroSkillList[skillID]) {
            this.heroSkillList[skillID] = {
                lvl: 0,
                num: 0
            };
        }
        for (var index = this.itemData[Constants_1.PropTypeEnum.SOUL_TYPE].length - 1; 0 <= index; index--) {
            var itemID = this.itemData[Constants_1.PropTypeEnum.SOUL_TYPE][index].itemID;
            if (this.role_map_data[this.itemData[Constants_1.PropTypeEnum.SOUL_TYPE][index].cellID].itemID != itemID) {
                this.itemData[Constants_1.PropTypeEnum.SOUL_TYPE].splice(index, 1);
            }
        }
        var totalAdded = 0;
        var soulData = this.itemData[Constants_1.PropTypeEnum.SOUL_TYPE];
        for (var index = soulData.length - 1; 0 <= index; index--) {
            var itemID = soulData[index].itemID;
            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
            var itemNum = itemCfg.number;
            if (!(totalAdded + itemNum <= requiredNum)) {
                this._needRefreshCellList.push(soulData[index].cellID);
                var remaining = requiredNum - totalAdded;
                this.heroSkillList[skillID].num += remaining;
                this.delCellItemByCellID(soulData[index].cellID);
                GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.POSEIDON, remaining);
                this.splitItemNum(itemCfg.number - remaining, itemID);
                break;
            }
            this._needRefreshCellList.push(soulData[index].cellID);
            this.delCellItemByCellID(soulData[index].cellID);
            totalAdded += itemNum;
            this.heroSkillList[skillID].num += itemNum;
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.POSEIDON, itemNum);
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.addIndexToList = function (type, id) {
        var areaList = this.roleShowAreaIDList;
        if (type == listTypeEnum.SHOW_AREA_TYPE) {
            areaList = this.roleShowAreaIDList;
        }
        else if (type == listTypeEnum.MAP_TOTAL_TYPE) {
            areaList = this.role_map_total_data;
        }
        else if (type == listTypeEnum.NEW_UNLOCK_CELL_TYPE) {
            areaList = this._curNewUnlockCellList;
        }
        else if (type == listTypeEnum.NEW_UNLOCK_AREA_TYPE) {
            areaList = this.roleUnlockAreaIDList;
        }
        else if (type == listTypeEnum.AREA_LOCK_CELL_TYPE) {
            areaList = this.areaUnlockCellIDList;
        }
        else if (type == listTypeEnum.REPORT_CELL_TYPE) {
            areaList = this.role_map_report_data;
        }
        else if (type == listTypeEnum.SPACE_TYPE) {
            areaList = this.roleSpaceList;
        }
        for (var index = 0; index < areaList.length; index++) {
            if (id == areaList[index]) {
                return;
            }
        }
        areaList.push(id);
        if (type == listTypeEnum.SPACE_TYPE) {
            GameManager_1.gm.ui.emit("refresh_barrel_num");
            GameManager_1.gm.ui.emit("ship_goods_change");
        }
    };
    // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
    MapCellCfgData.prototype.clearWareHouseList = function () {
        this._warehouseList = [];
        GameManager_1.gm.ui.emit("ship_goods_change");
    };
    MapCellCfgData.prototype.addWareHouseItem = function (item, isNew) {
        if (this._warehouseList.length < 100) {
            this._warehouseList.push(item);
            this._warehouseIsNewList.push(isNew);
        }
    };
    MapCellCfgData.prototype.addWareHouseList = function (items, isNew) {
        if (isNew === void 0) { isNew = 1; }
        for (var i = 0; i < Math.min(100, items.length); i++) {
            this.addWareHouseItem(items[i], isNew);
        }
        GameManager_1.gm.ui.emit("ship_goods_change");
    };
    MapCellCfgData.prototype.putAllItemToMapCell = function () {
        var result = [];
        while (this.roleSpaceList.length > 0 && this._warehouseList.length > 0) {
            var spaceID = this.getRoleSpceListShift();
            var item = this._warehouseList.shift();
            if (this._warehouseIsNewList.shift() == 1) {
                result.push(spaceID);
            }
            var itemType = item >= 30000 ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
            this.changeMapItemDataByID(spaceID, itemType, item);
            this.addRoleItem(item, spaceID);
            this._needRefreshCellList.push(spaceID);
            GameManager_1.gm.ui.show_item_fly(item, GameManager_1.gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO), GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(spaceID.toString()).getComponent(MainMapItem_1.default).itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
        }
        this.async_write_data();
        return result;
    };
    MapCellCfgData.prototype.getIsHaveSpeceCellID = function () {
        return this.roleSpaceList.length > 0;
    };
    MapCellCfgData.prototype.getRoleSpceListShift = function () {
        if (0 < this.roleSpaceList.length) {
            if (this.isGuide) {
                for (var index = 0; index < this.roleSpaceList.length; index++) {
                    var spaceID = this.roleSpaceList[index];
                    if (![118, 134, 152, 149, 167, 183, 130, 148, 135, 153, 196, 205].includes(spaceID)) {
                        this.roleSpaceList.splice(index, 1);
                        GameManager_1.gm.ui.emit("refresh_barrel_num");
                        return spaceID;
                    }
                }
                var roleSpaceList_1 = this.roleSpaceList.shift();
                GameManager_1.gm.ui.emit("refresh_barrel_num");
                return roleSpaceList_1;
            }
            var roleSpaceList = this.roleSpaceList.shift();
            GameManager_1.gm.ui.emit("refresh_barrel_num");
            return roleSpaceList;
        }
    };
    MapCellCfgData.prototype.initGuideData = function () {
        this.roleGuideVO = new GuideVO();
        this.roleGuideVO.guideID = 1;
        this.roleGuideVO.runningIndex = 0;
        this.roleGuideVO.isFinishAllGuide = 0;
        this.roleGuideVO.step = 0;
        this.roleGuideVO.isEnd = false;
        TempData_1.TempData.initGuideTempData();
    };
    MapCellCfgData.prototype.setRoleGuideData = function (guideID, runningIndex) {
        if (this.roleGuideVO) {
            if (guideID == 0) {
                this.roleGuideVO.guideID = 0;
                this.roleGuideVO.isFinishAllGuide = 1;
            }
            else {
                if (runningIndex == 0) {
                    this.roleGuideVO.isEnd = false;
                }
                this.roleGuideVO.guideID = guideID;
                this.roleGuideVO.runningIndex = runningIndex;
                this.roleGuideVO.isFinishAllGuide = 0;
            }
            TempData_1.TempData.initGuideTempData();
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.setRoleGuideDataEnd = function (guideID, runningIndex) {
        if (this.roleGuideVO) {
            this.roleGuideVO.guideID = guideID;
            this.roleGuideVO.runningIndex = runningIndex;
            this.roleGuideVO.isEnd = true;
            if (guideID == 15 && this.roleGuideVO.isEnd) {
                GameManager_1.gm.ui.emit("build_show_stateIcon", true);
            }
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.addSuperRecruitItem = function (item, id) {
        this.changeMapItemDataByID(id, Constants_1.ItemTypeEnum.ITEM_TYPE, item);
        this.addRoleItem(item, id);
        GameManager_1.gm.ui.emit("item_children_refresh", id);
        this.async_write_data();
    };
    MapCellCfgData.prototype.getStarHeroNumByID = function (heroID) {
        var count = 0;
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", heroID.toString());
        if (heroConfig) {
            var heroes = this.heroData[heroConfig.occupation];
            if (heroes && heroes.length > 0) {
                for (var _i = 0, heroes_1 = heroes; _i < heroes_1.length; _i++) {
                    var hero = heroes_1[_i];
                    if (hero.itemID === heroID) {
                        count++;
                    }
                }
            }
        }
        return count;
    };
    MapCellCfgData.prototype.delStarHeroNumByID = function (heroID, count) {
        var deletedCount = 0;
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", heroID.toString());
        if (heroConfig) {
            var heroes = this.heroData[heroConfig.occupation];
            if (heroes && heroes.length >= count) {
                for (var index = heroes.length - 1; 0 <= index; index--) {
                    if (deletedCount == count)
                        return;
                    if (heroes[index].itemID == heroID) {
                        var cellID = heroes[index].cellID;
                        this.delCellItemByCellID(heroes[index].cellID);
                        GameManager_1.gm.ui.emit("item_children_refresh", cellID);
                        deletedCount++;
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.addItem = function (itemID, quantity, cellID) {
        if (cellID === void 0) { cellID = -1; }
        if (30000 < itemID) {
            var index = -1 == cellID ? this.getRoleSpceListShift() : cellID;
            this.changeMapItemDataByID(index, Constants_1.ItemTypeEnum.HERO_TYPE, itemID);
            this.addRoleItem(itemID, index);
            GameManager_1.gm.ui.emit("item_children_refresh", index);
        }
        else {
            var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", itemID.toString());
            if (itemConfig.type == Constants_1.PropTypeEnum.COIN_TYPE) {
                this.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, quantity);
            }
            else if (itemConfig.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE) {
                this.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, quantity);
            }
            else if (itemConfig.type == Constants_1.PropTypeEnum.WOOD_TYPE || itemConfig.type == Constants_1.PropTypeEnum.IRON_TYPE || itemConfig.type == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                var index = itemConfig.type == Constants_1.PropTypeEnum.WOOD_TYPE ? 16008 : itemConfig.type == Constants_1.PropTypeEnum.IRON_TYPE ? 17008 : 25008;
                GameManager_1.gm.data.mapCell_data.splitItemNum(quantity, index, 1);
            }
            else {
                this.addWareHouseItem(itemID, 1);
                GameManager_1.gm.ui.emit("ship_goods_change");
            }
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.addBarrelInMap = function (barrelID) {
        var itemID;
        if (barrelID && 0 < barrelID) {
            itemID = barrelID;
        }
        else if (this.role_openBarrel_Times > this.initOpenBarrelData) {
            var rewardPool = GameManager_1.gm.config.get_row_data_array("PoolConfigData", "1101");
            var randomRewards = [];
            GameManager_1.gm.data.setRandomReward(rewardPool, randomRewards, 1);
            itemID = randomRewards[0].itemID;
        }
        else {
            itemID = Constants_1.RewardIdEnum.BARREL;
        }
        var RoleSpceList = this.getRoleSpceListShift();
        console.log(this.roleSpaceList);
        this.changeMapItemDataByID(RoleSpceList, Constants_1.ItemTypeEnum.ITEM_TYPE, itemID);
        GameManager_1.gm.ui.emit("item_children_refresh", RoleSpceList);
        GameManager_1.gm.ui.emit("compose_anim", RoleSpceList);
        this.async_write_data();
    };
    MapCellCfgData.prototype.openWaterGirlCase = function (poolID, cellID) {
        var poolData = GameManager_1.gm.config.get_row_data_array("PoolConfigData", poolID + "");
        var rewards = [];
        GameManager_1.gm.data.setRandomReward(poolData, rewards, 1);
        this.delCellItemByCellID(cellID);
        this.addItem(rewards[0].itemID, 1, cellID);
        this.async_write_data();
        return rewards[0].itemID;
    };
    MapCellCfgData.prototype.openHeroGiftCase = function (poolID, cellID) {
        var poolData = GameManager_1.gm.config.get_row_data_array("PoolConfigData", poolID + "");
        var rewards = [];
        GameManager_1.gm.data.setRandomReward(poolData, rewards, 1);
        this.delCellItemByCellID(cellID);
        this.addSuperHeroData(rewards[0].itemID, cellID);
        this.async_write_data();
        return rewards[0].itemID;
    };
    MapCellCfgData.prototype.addSuperHeroData = function (heroID, cellID, hp) {
        if (hp === void 0) { hp = -1; }
        for (var i = 0; i < this.superHeroData.length; i++)
            if (this.superHeroData[i].cellID == cellID && this.superHeroData[i].heroid == heroID) {
                this.superHeroData[i].hp = Math.max(0, hp);
                if (0 == hp) {
                    this.superHeroData[i].heroState = 1;
                    this.superHeroData[i].curReliveTime = Math.floor(Date.now() / 1e3);
                    this.superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1e3) + GameManager_1.gm.const.SUPERHERORELIVETIME;
                }
                else if (!(0 != this.superHeroData[i].curReliveTime && 0 != this.superHeroData[i].nextReliveTime)) {
                    this.superHeroData[i].curReliveTime = Math.floor(Date.now() / 1e3);
                    this.superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1e3) + GameManager_1.gm.const.SUPERHERORECIVETIME;
                }
                this.async_write_data();
                return;
            }
        var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
        if (heroCfg) {
            var superHeroVO = new SuperHeroVO;
            superHeroVO.heroid = heroID;
            superHeroVO.hp = heroCfg.hp;
            superHeroVO.heroState = 0;
            superHeroVO.curReliveTime = 0;
            superHeroVO.nextReliveTime = 0;
            superHeroVO.maxHp = heroCfg.hp;
            superHeroVO.cellID = cellID;
            this.superHeroData.push(superHeroVO);
            this.changeMapItemDataByID(cellID, Constants_1.ItemTypeEnum.HERO_TYPE, heroID);
            this.addRoleItem(heroID, cellID);
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.setSuperHeroFullHpByID = function (heroID, cellID) {
        for (var index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid == heroID && this.superHeroData[index].cellID == cellID) {
                this.superHeroData[index].curReliveTime = 0;
                this.superHeroData[index].nextReliveTime = 0;
                this.superHeroData[index].hp = this.superHeroData[index].maxHp;
                this.async_write_data();
                break;
            }
        }
    };
    MapCellCfgData.prototype.setSuperHeroReliveByID = function (heroID, cellID) {
        for (var index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid == heroID && this.superHeroData[index].cellID == cellID) {
                this.superHeroData[index].heroState = 0;
                this.superHeroData[index].hp = this.superHeroData[index].maxHp;
                this.superHeroData[index].curReliveTime = 0;
                this.superHeroData[index].nextReliveTime = 0;
                GameManager_1.gm.ui.emit("refresh_super_hero_color", cellID, heroID);
                this.async_write_data();
                break;
            }
        }
    };
    MapCellCfgData.prototype.getSuperHeroData = function (heroID, cellID) {
        for (var index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid == heroID && this.superHeroData[index].cellID == cellID) {
                return this.superHeroData[index];
            }
        }
    };
    MapCellCfgData.prototype.removeSuperHeroData = function (heroID, cellID) {
        for (var index = 0; index < this.superHeroData.length; index++) {
            if (this.superHeroData[index].heroid === heroID && this.superHeroData[index].cellID == cellID) {
                this.superHeroData.splice(index, 1);
                this.async_write_data();
                break;
            }
        }
    };
    MapCellCfgData.prototype.getAllSuperHeroData = function () {
        return this.superHeroData;
    };
    MapCellCfgData.prototype.addRoleItem = function (itemID, cellID) {
        if (cellID === void 0) { cellID = -1; }
        var itemType = 3e4 < itemID ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
        var newItem = new roleMapItemVO;
        newItem.heroUID = 0;
        newItem.itemID = itemID;
        newItem.cellID = cellID;
        if (itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
            if (!itemCfg)
                return;
            if (!this.itemData[itemCfg.type]) {
                this.itemData[itemCfg.type] = [];
            }
            newItem.itemType = itemCfg.type;
            this.itemData[itemCfg.type].push(newItem);
        }
        else if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var herofg = GameManager_1.gm.data.config_data.getHeroCfgByID(itemID);
            if (!herofg)
                return;
            if (!this.heroData[herofg.occupation]) {
                this.heroData[herofg.occupation] = [];
            }
            newItem.itemType = herofg.occupation;
            this.heroData[herofg.occupation].push(newItem);
            if (11 == herofg.occupation) {
                GameManager_1.gm.ui.emit("build_show_towerBuff");
            }
        }
        for (var index = 0; index < this.roleSpaceList.length; index++) {
            if (this.roleSpaceList[index] == cellID) {
                this.roleSpaceList.splice(index, 1);
                break;
            }
        }
        this.unlockBookItem(itemType, itemID);
    };
    MapCellCfgData.prototype.getHeroDataByID = function (heroID, cellID) {
        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
        if (heroConfig) {
            if (!this.heroData[heroConfig.occupation] || Object.keys(this.heroData[heroConfig.occupation]).length <= 0)
                return null;
            for (var index = 0; index < this.heroData[heroConfig.occupation].length; index++) {
                if (this.heroData[heroConfig.occupation][index].cellID == cellID) {
                    return this.heroData[heroConfig.occupation];
                }
            }
        }
        return null;
    };
    MapCellCfgData.prototype.getSuperHeroDataByID = function (heroID, cellID) {
        for (var a = 0; a < this.superHeroData.length; a++) {
            if (this.superHeroData[a].cellID == cellID && this.superHeroData[a].heroid === heroID) {
                return this.superHeroData[a];
            }
        }
        return null;
    };
    MapCellCfgData.prototype.delete_hero = function (heroUID, heroID) {
        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
        if (heroConfig) {
            var occupationData = this.heroData[heroConfig.occupation];
            if (occupationData && Object.keys(occupationData).length > 0) {
                for (var i = 0; i < occupationData.length; i++) {
                    if (occupationData[i].heroUID === heroUID) {
                        this.delCellItemByCellID(occupationData[i].cellID);
                        GameManager_1.gm.ui.emit("item_children_refresh", occupationData[i].cellID);
                        break;
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.getIsHeroTowerBuff = function () {
        return this.heroData[11] && this.heroData[11].length > 0;
    };
    MapCellCfgData.prototype.delRoleItem = function (itemID, cellID) {
        this.changeMapItemDataByID(cellID, 0, 0);
        var itemType = 3e4 < itemID ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
        if (itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
            if (!itemConfig)
                return;
            if (!this.itemData[itemConfig.type])
                return;
            for (var index = 0; index < this.itemData[itemConfig.type].length; index++) {
                if (this.itemData[itemConfig.type][index].cellID == cellID) {
                    this.itemData[itemConfig.type].splice(index, 1);
                    this.addRoleSpaceCellByID(cellID);
                    break;
                }
            }
        }
        else if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(itemID);
            if (heroCfg) {
                if (!this.heroData[heroCfg.occupation])
                    return;
                for (var index = 0; index < this.heroData[heroCfg.occupation].length; index++) {
                    if (this.heroData[heroCfg.occupation][index].cellID == cellID) {
                        this.heroData[heroCfg.occupation].splice(index, 1);
                        this.addRoleSpaceCellByID(cellID);
                        heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE && this.removeSuperHeroData(itemID, cellID);
                        break;
                    }
                }
            }
        }
        GameManager_1.gm.ui.emit("refresh_barrel_num");
    };
    MapCellCfgData.prototype.getMertrailIDCount = function (itemID) {
        var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
        if (itemConfig) {
            if (itemConfig.type == Constants_1.PropTypeEnum.COIN_TYPE)
                return this.roleCoinData.coinNum;
            if (itemConfig.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE)
                return this.roleCoinData.diamondNum;
            var count = 0;
            if (!this.itemData[itemConfig.type])
                return 0;
            for (var index = 0; index < this.itemData[itemConfig.type].length; index++) {
                count += GameManager_1.gm.data.config_data.getItemCfgByID(this.itemData[itemConfig.type][index].itemID).number;
            }
            return count;
        }
        return 0;
    };
    MapCellCfgData.prototype.splitItemNum = function (itemID, itemCount, startID) {
        if (startID === void 0) { startID = 0; }
        var i = 10 * Math.floor(.1 * itemCount) + 1;
        for (var o = itemCount; i <= o; o--) {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(o);
            if (itemConfig)
                for (; itemID >= itemConfig.number;) {
                    1 == itemID ? itemID = 0 : itemID -= itemConfig.number;
                    this.addWareHouseItem(o, startID);
                }
        }
        GameManager_1.gm.ui.emit("ship_goods_change");
    };
    MapCellCfgData.prototype.onekeyGetGuideAllMertrail = function (t, e) {
        var count = 0;
        var tempDataBuild = TempData_1.TempData.getBuildGuideMertarilData();
        for (var key in this.buildData[t].metrailData) {
            if (tempDataBuild) {
                for (var index = 0; index < tempDataBuild.metrailList.length; index++) {
                    if (GameManager_1.gm.data.config_data.getItemCfgByID(tempDataBuild.metrailList[index].itemID).type == parseInt(key) && TempData_1.TempData.getBuildGuideMertarilNumByID(this.buildData[t].buildID, tempDataBuild.metrailList[index].itemID) >= tempDataBuild.metrailList[index].needNum) {
                        count++;
                        break;
                    }
                }
            }
        }
        var buildDataII = this.buildData[t].metrailData[e];
        if (buildDataII && !(buildDataII.cur >= buildDataII.max)) {
            var minus = buildDataII.max - buildDataII.cur;
            Utils_1.Utils.sort_by_props(this.itemData[e], {
                itemID: "ascending"
            });
            if (e == Constants_1.PropTypeEnum.WOOD_TYPE || e == Constants_1.PropTypeEnum.IRON_TYPE || e == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                for (var index = this.itemData[e].length - 1; 0 <= index; index--) {
                    var itemID = this.itemData[e][index].itemID;
                    var cellID = this.itemData[e][index].cellID;
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                    if (0 + itemCfg.number == minus) {
                        var newP = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                        var newH = newP.getComponent(MainMapItem_1.default);
                        if (newP && newH && newH.itemNode) {
                            if (t == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                GameManager_1.gm.ui.show_item_fly(itemCfg.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), GameManager_1.gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            }
                            else {
                                var newU = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                                var newM = newU.getComponent(MainMapItem_1.default);
                                if (newU && newM && newM.itemNode) {
                                    GameManager_1.gm.ui.show_item_fly(itemCfg.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), newM.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                }
                            }
                            this.reportOnekeyAddMertrail(t, itemCfg.id, count);
                            TempData_1.TempData.setBuildGuideMertaril(this.buildData[t].buildID, itemCfg.id, itemCfg.type, cellID, itemCfg.number, this.buildData[t].metrailData[itemCfg.type].max - this.buildData[t].metrailData[itemCfg.type].cur);
                            GameManager_1.gm.ui.emit("build_metarail_change", this.buildData[t].buildID);
                            GameManager_1.gm.ui.emit("guide_del_item", cellID);
                            GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
                        }
                    }
                }
            }
            else {
                for (var index = 0; index < this.itemData[e].length; index++) {
                    var itemID = this.itemData[e][index].itemID;
                    var cellID = this.itemData[e][index].cellID;
                    if (itemID == buildDataII.id) {
                        var newD = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                        if (newD) {
                            var newP = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                            var newH = newP.getComponent(MainMapItem_1.default);
                            if (newP && newH && newH.itemNode) {
                                if (t == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                    GameManager_1.gm.ui.show_item_fly(newD.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), GameManager_1.gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                }
                                else {
                                    var newU = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                                    var newM = newU.getComponent(MainMapItem_1.default);
                                    if (newU && newM && newM.itemNode) {
                                        GameManager_1.gm.ui.show_item_fly(newD.id, newH.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), newM.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                    }
                                }
                            }
                            this.reportOnekeyAddMertrail(t, newD.id, count);
                            TempData_1.TempData.setBuildGuideMertaril(this.buildData[t].buildID, itemID, newD.type, cellID, 1, this.buildData[t].metrailData[newD.type].max - this.buildData[t].metrailData[newD.type].cur);
                            GameManager_1.gm.ui.emit("build_metarail_change", this.buildData[t].buildID);
                            GameManager_1.gm.ui.emit("guide_del_item", cellID);
                            GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
                        }
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.reportOnekeyAddMertrail = function (t, e, a) {
        var i = 0;
        if (0 == this.buildData[t].buildLvl && t == Constants_1.BuildTypeEnum.TOWER_TYPE) {
            i = 22;
        }
        var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(e);
        if (itemCfg) {
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: i += a,
                guidedesc: cc.js.formatStr("%d.一键添加材料%s", i, itemCfg.name)
            });
        }
    };
    MapCellCfgData.prototype.onekeyGetAllMertrail = function (t, e) {
        var cellID = 0;
        var metrailData = this.buildData[t].metrailData[e];
        if (metrailData && !(metrailData.cur >= metrailData.max)) {
            var minus = metrailData.max - metrailData.cur;
            Utils_1.Utils.sort_by_props(this.itemData[e], {
                itemID: "descending"
            });
            if (e == Constants_1.PropTypeEnum.WOOD_TYPE || e == Constants_1.PropTypeEnum.IRON_TYPE || e == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                var count = 0;
                for (var index = this.itemData[e].length - 1; 0 <= index; index--) {
                    var itemID = this.itemData[e][index].itemID;
                    cellID = this.itemData[e][index].cellID;
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                    if (!(count + itemCfg.number <= minus)) {
                        this._needRefreshCellList.push(cellID);
                        var newH = minus - count;
                        this.addBuildMetrail(t, itemCfg.type, newH);
                        var childName_1 = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                        var mainMap_1 = childName_1.getComponent(MainMapItem_1.default);
                        if (childName_1 && mainMap_1 && mainMap_1.itemNode) {
                            if (t == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                                GameManager_1.gm.ui.show_item_fly(itemCfg.id, mainMap_1.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), GameManager_1.gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            }
                            else {
                                var newD = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                                var newP = newD.getComponent(MainMapItem_1.default);
                                if (newD && newP && newP.itemNode) {
                                    GameManager_1.gm.ui.show_item_fly(itemCfg.id, mainMap_1.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), newP.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                                }
                            }
                        }
                        this.itemData[e].splice(index, 1);
                        this.changeMapItemDataByID(cellID, 0, 0);
                        this.addRoleSpaceCellByID(cellID);
                        this.splitItemNum(itemCfg.number - newH, itemID);
                        break;
                    }
                    var childName = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString());
                    var mainMap = childName.getComponent(MainMapItem_1.default);
                    if (childName && mainMap && mainMap.itemNode) {
                        if (t == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                            GameManager_1.gm.ui.show_item_fly(itemCfg.id, mainMap.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), GameManager_1.gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
                        }
                        else {
                            var newD = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[t].cellID.toString());
                            var newP = newD.getComponent(MainMapItem_1.default);
                            if (newD && newP && newP.itemNode) {
                                GameManager_1.gm.ui.show_item_fly(itemCfg.id, mainMap.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO), newP.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            }
                        }
                    }
                    this.itemData[e].splice(index, 1);
                    this.changeMapItemDataByID(cellID, 0, 0);
                    count += itemCfg.number;
                    this.addBuildMetrail(t, e, itemCfg.number);
                    this._needRefreshCellList.push(cellID);
                    this.addRoleSpaceCellByID(cellID);
                }
                this.async_write_data();
            }
            else {
                for (var index = 0; index < this.itemData[e].length; index++) {
                    var itemID = this.itemData[e][index].itemID;
                    var cellID_1 = this.itemData[e][index].cellID;
                    if (itemID == metrailData.id) {
                        this._needRefreshCellList.push(itemID);
                        this.delRoleItem(itemID, cellID_1);
                        this.addBuildMetrail(t, e, 1);
                        this.async_write_data();
                        break;
                    }
                    if (itemID >= metrailData.id) {
                        this._needRefreshCellList.push(cellID_1);
                        this.delRoleItem(itemID, cellID_1);
                        var arr = [];
                        for (var f = itemID - 1; f >= metrailData.id; f--) {
                            arr.push(f);
                            if (f == metrailData.id) {
                                this.addBuildMetrail(t, e, 1);
                            }
                        }
                        this.addWareHouseList(arr, 0);
                        this.async_write_data();
                        break;
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.onekeyGetAllSpecialMertrail = function (t, e) {
        var speciafID = GameManager_1.gm.data.config_data.getSpecialByID(t);
        if (speciafID) {
            var value = 0;
            for (var index = 0; index < speciafID.prop.length; index++) {
                if (speciafID.prop[index] == e) {
                    value = speciafID.value[index];
                    break;
                }
            }
            if (0 != value) {
                var special = this.specialList[t];
                if (special && !(special.mertrail[e] >= value)) {
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(e);
                    if (itemCfg) {
                        var type = itemCfg.type;
                        var newC = value - special.mertrail[e];
                        Utils_1.Utils.sort_by_props(this.itemData[type], {
                            itemID: "descending"
                        });
                        if (type == Constants_1.PropTypeEnum.WOOD_TYPE || type == Constants_1.PropTypeEnum.IRON_TYPE || type == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                            var count = 0;
                            for (var index = this.itemData[type].length - 1; 0 <= index; index--) {
                                var itemID = this.itemData[type][index].itemID;
                                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                                if (!(count + itemConfig.number <= newC)) {
                                    this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                    var num = newC - count;
                                    this.specialList[t].mertrail[e] += count;
                                    this.delCellItemByCellID(this.itemData[type][index].cellID);
                                    this.splitItemNum(itemConfig.number - num, itemID);
                                    break;
                                }
                                this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                this.delCellItemByCellID(this.itemData[type][index].cellID);
                                count += itemConfig.number;
                                this.specialList[t].mertrail[e] += count;
                            }
                            this.async_write_data();
                        }
                        else {
                            for (var index = 0; index < this.itemData[type].length; index++) {
                                if (this.itemData[type][index].itemID == e) {
                                    this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                    this.delRoleItem(e, this.itemData[type][index].cellID);
                                    this.specialList[t].mertrail[e] += 1;
                                    this.async_write_data();
                                    break;
                                }
                                if (this.itemData[type][index].itemID >= e) {
                                    var itemID = this.itemData[type][index].itemID;
                                    this._needRefreshCellList.push(this.itemData[type][index].cellID);
                                    this.delRoleItem(this.itemData[type][index].itemID, this.itemData[type][index].cellID);
                                    var arr = [];
                                    for (var o = itemID - 1; e <= o; o--) {
                                        arr.push(o);
                                        if (o == e) {
                                            (this.specialList[t].mertrail[e] += 1);
                                        }
                                    }
                                    this.addWareHouseList(arr, 0);
                                    this.async_write_data();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.onekeyWatchAdGetSoul = function (t, e) {
        if (GameManager_1.gm.data.config_data.getSpecialByID(t)) {
            this.specialList[t].mertrail[e] += 1;
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.onekeyGetAllSpecialHeroMertrail = function (t, e) {
        var newA = GameManager_1.gm.data.config_data.getSpecialByID(t);
        if (newA) {
            var value = 0;
            for (var index = 0; index < newA.prop.length; index++) {
                if (newA.prop[index] == e) {
                    value = newA.value[index];
                    break;
                }
            }
            if (0 != value) {
                var special = this.specialList[t];
                if (special && !(special.mertrail[e].cur >= value)) {
                    var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(e);
                    if (heroConfig) {
                        var occupation = heroConfig.occupation;
                        var heroData = this.heroData[occupation];
                        if (heroData)
                            for (var index = heroData.length - 1; 0 <= index; index--)
                                if (heroData[index].itemID == e) {
                                    if (value == special.mertrail[e])
                                        break;
                                    this._needRefreshCellList.push(heroData[index].cellID);
                                    this.delRoleItem(e, heroData[index].cellID);
                                    this.specialList[t].mertrail[e] += 1;
                                }
                        this.async_write_data();
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.addBuild = function (t, e) {
        var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(t);
        if (buildCfg && !this.getBuildDataByType(buildCfg.buildType)) {
            var roleBuildData = new RoleBuildDataVO;
            roleBuildData.buildState = 1;
            roleBuildData.buildID = buildCfg.buildID;
            roleBuildData.buildType = buildCfg.buildType;
            roleBuildData.buildLvl = buildCfg.buildLv;
            roleBuildData.cellID = e;
            roleBuildData.isCanMove = 0 < buildCfg.cellID ? 0 : 1;
            roleBuildData.productData = null;
            roleBuildData.metrailData = {};
            for (var n = roleBuildData.upNeedCoin = 0; n < buildCfg.consume.length; n++) {
                if (buildCfg.consume[n] == Constants_1.RewardIdEnum.GOLD) {
                    roleBuildData.upNeedCoin = buildCfg.num[n];
                }
                else {
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(buildCfg.consume[n]);
                    if (itemCfg) {
                        if (!roleBuildData.metrailData[itemCfg.type]) {
                            roleBuildData.metrailData[itemCfg.type] = {};
                        }
                        roleBuildData.metrailData[itemCfg.type].id = buildCfg.consume[n];
                        roleBuildData.metrailData[itemCfg.type].max = buildCfg.num[n];
                        roleBuildData.metrailData[itemCfg.type].cur = 0;
                    }
                }
            }
            this.buildData[roleBuildData.buildType] = roleBuildData;
            if (59e3 == t) {
                this.addBuild(60001, GameManager_1.gm.const.shipID);
            }
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.getBuildDataByType = function (t) {
        return this.buildData[t];
    };
    MapCellCfgData.prototype.upgradeBuild = function (t) {
        var newE = GameManager_1.gm.data.config_data.getBuildCfgByID(t);
        if (newE) {
            var newA = GameManager_1.gm.data.config_data.getBuildCfgByID(newE.nextBuildID);
            if (newA) {
                var num = 0;
                var newO = this.buildData[newE.buildType];
                if (newO) {
                    GameManager_1.gm.channel.report_event("building_upgrade", {
                        event_desc: "建筑升级",
                        building_name: newA.buildName,
                        level: newA.buildLv,
                        desc: cc.js.formatStr("%s%d级", newA.buildName, newA.buildLv)
                    });
                    GameManager_1.gm.data.get_player_score_data_request(function () {
                        GameManager_1.gm.data.update_player_score_data_request(GameManager_1.gm.data.ladder_temp_data.total_star);
                    });
                    var newN = GameManager_1.gm.const.REPORT_BUILDING_UPGRADE_MAP[newE.buildType];
                    if (0 < newA.buildLv && newA.buildLv < newN.length) {
                        var newS = newN[newA.buildLv - 1];
                        NetUtils_1.ReportData.instance.report_once_point(newS);
                    }
                    if (1 == newA.buildLv && newE.buildType == Constants_1.BuildTypeEnum.GARRISION_TYPE) {
                        cc.Canvas.instance.scheduleOnce(function () {
                            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Ladder);
                        }, 2);
                    }
                    else if (!(GameManager_1.gm.data.mapCell_data.isGuide || newE.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE)) {
                        (newE.buildType, Constants_1.BuildTypeEnum.WHARFTAX_TYPE);
                    }
                    if (!GameManager_1.gm.data.mapCell_data.isGuide && 3 <= this.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE).buildLvl && newE.buildType != Constants_1.BuildTypeEnum.TOWER_TYPE) {
                        cc.Canvas.instance.scheduleOnce(function () {
                            GameManager_1.gm.channel.checkShortcut(function (result) {
                                if (2 <= result) {
                                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.AddDesktop);
                                }
                            });
                        }, 2);
                    }
                    if (newE.buildType != Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE) {
                        this.role_map_data[newO.cellID].itemID = newA.buildID;
                    }
                    newO.buildID = newA.buildID;
                    newO.buildLvl = newA.buildLv;
                    if (0 < newA.currency && 2 <= newA.rate.length) {
                        if (!newO.productData) {
                            newO.productData = new RoleProductDataVO;
                            newO.productData.productCd = 0;
                            newO.productData.productNum = 0;
                            newO.productData.maxNum = 0;
                            newO.productData.fullTime = 0;
                            newO.productData.productID = 0;
                            newO.productData.beginTime = 0;
                            newO.productData.curNum = 0;
                        }
                        newO.productData.productID = newA.currency;
                        newO.productData.productCd = newA.rate[1];
                        newO.productData.productNum = newA.rate[0];
                        newO.productData.maxNum = newA.capacity;
                        if (newE.buildType == Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE && 0 == newE.buildLv) {
                            newO.productData.curNum = 2;
                        }
                        newO.productData.beginTime = Math.floor(Date.now() / 1000);
                        if (0 == newO.productData.fullTime) {
                            newO.productData.fullTime = Math.floor(Date.now() / 1e3) + Math.round((newO.productData.maxNum - newO.productData.curNum) / newO.productData.productNum) * newO.productData.productCd;
                        }
                    }
                    newO.metrailData = {};
                    for (var index = newO.upNeedCoin = 0; index < newA.consume.length; index++) {
                        if (newA.consume[index] == Constants_1.RewardIdEnum.GOLD) {
                            newO.upNeedCoin = newA.num[index];
                        }
                        else {
                            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(newA.consume[index]);
                            if (itemCfg) {
                                if (!newO.metrailData[itemCfg.type]) {
                                    newO.metrailData[itemCfg.type] = {};
                                }
                                newO.metrailData[itemCfg.type].id = newA.consume[index];
                                newO.metrailData[itemCfg.type].max = newA.num[index];
                                newO.metrailData[itemCfg.type].cur = 0;
                            }
                        }
                    }
                    if (this.isGuide || newA.buildType != Constants_1.BuildTypeEnum.WHARFTAX_TYPE || this.resetBarrelTime(newO.productData), 0 < newA.lockAreaID) {
                        var isCheck = false;
                        for (var index = 0; index < this.roleShowAreaIDList.length; index++) {
                            if (this.roleShowAreaIDList[index] == newA.lockAreaID) {
                                isCheck = true;
                                break;
                            }
                        }
                        if (!isCheck) {
                            this.openNewAreaByID(newA.lockAreaID);
                        }
                        if (!GameManager_1.gm.const.localCloudAreaList[newA.lockAreaID]) {
                            this.unlockNewAreaID(newA.lockAreaID);
                        }
                    }
                    if (51001 == newA.buildID) {
                        GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].cellID = 395;
                        var showAreaID = newA.showAreaID;
                        for (var index = 0; index < showAreaID.length; index++) {
                            this.openNewAreaByID(showAreaID[index]);
                        }
                        this.isGuide = false;
                        GameManager_1.gm.ui.mapMainUI.lockMainUI();
                        GameManager_1.gm.ui.mapMainUI.show_task_main_entry_guide();
                        GameManager_1.gm.data.mapCell_data.addBarrelNum(5);
                        GameManager_1.gm.ui.mapMainUI.setBarrelNodeActive();
                        GameManager_1.gm.ui.mapMainUI.playGuideBarrelFly(5);
                        num = 23;
                        GameManager_1.gm.ui.mapMainUI.autoCompose.node.active = !GameManager_1.gm.data.mapCell_data.isGuide;
                        GameManager_1.gm.ui.emit("coin_change");
                    }
                    else {
                        newA.buildID;
                    }
                    if (newE.buildType == Constants_1.BuildTypeEnum.WHARFTAX_TYPE && 0 == newE.buildLv) {
                        var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE].buildID);
                        if (buildCfg && 2 <= buildCfg.rate.length && 2 <= buildCfg.rate.length) {
                            var roleProductData = new RoleProductDataVO;
                            roleProductData.productID = buildCfg.currency;
                            roleProductData.productCd = buildCfg.rate[1];
                            roleProductData.productNum = buildCfg.rate[0];
                            roleProductData.maxNum = buildCfg.capacity;
                            roleProductData.beginTime = Math.floor(Date.now() / 1e3);
                            roleProductData.fullTime = 0;
                            this.resetBarrelTime(roleProductData);
                            this.roleBarrelData.curBarrelNum += 10;
                            roleProductData.fullTime = 0;
                        }
                    }
                    else if (newE.buildType == Constants_1.BuildTypeEnum.STALL_TYPE && 0 == newE.buildLv) {
                        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_15_UNLOCK_STORE);
                    }
                    else if (newE.buildType == Constants_1.BuildTypeEnum.GARRISION_TYPE) {
                        if (0 == newE.buildLv) {
                            this.initDefanseData();
                            GameManager_1.gm.data.ladder_temp_data.total_star = GameManager_1.gm.data.ladder_data.ladder_star;
                            var newCc_1 = GameManager_1.gm.data.ladder_temp_data.total_star;
                            GameManager_1.gm.data.update_player_data_request(function () {
                                GameManager_1.gm.data.get_player_score_data_request(function () {
                                    console.log("1.update before:" + newCc_1 + " update after:" + GameManager_1.gm.data.ladder_temp_data.total_star);
                                });
                            });
                        }
                        else {
                            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.DEFENSE);
                        }
                    }
                    if (this.isGuide) {
                        GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                            guideid: num,
                            guidedesc: cc.js.formatStr("%d.点击%s升级", num, newE.buildName)
                        });
                    }
                    this.role_build_lock_num++, GameManager_1.gm.ui.emit("unLockNewArea");
                    var newHh = TempData_1.TempData.getBuildGuideMertarilData();
                    if (newHh && newHh.buildID == t && 0 < newHh.metrailList.length) {
                        for (var index = newHh.metrailList.length - 1; 0 <= index; index--) {
                            if (newHh.metrailList[index].itemNum > newHh.metrailList[index].needNum) {
                                this.splitItemNum(newHh.metrailList[index].itemNum - newHh.metrailList[index].needNum, newHh.metrailList[index].itemID);
                            }
                            this.delCellItemByCellID(newHh.metrailList[index].cellID);
                            GameManager_1.gm.ui.emit("item_children_refresh", newHh.metrailList[index].cellID), newHh.metrailList.splice(index, 1);
                        }
                    }
                    if (newE.buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE && 0 <= newA.rate.length) {
                        for (var index = 0; index < newA.rate.length; index++) {
                            this.reelUnlcokHero(newA.rate[index]);
                        }
                    }
                    GameManager_1.gm.data.task_data.update_build_task_progress(newA.buildType);
                    this.async_write_data();
                }
            }
        }
    };
    MapCellCfgData.prototype.changeBuildCellPos = function (t, e) {
        if (this.buildData[t]) {
            this.buildData[t].cellID = e;
        }
    };
    MapCellCfgData.prototype.addBuildMetrail = function (t, e, a) {
        var buildData = this.buildData[t];
        if (buildData) {
            buildData.metrailData[e].cur += a;
        }
    };
    MapCellCfgData.prototype.addWaterBarrel = function () {
        this.waterBarrelList = [];
        var positions = [cc.v3(257, -1087), cc.v3(295, -1145), cc.v3(377, -1083)];
        for (var e = 0; e < positions.length; e++) {
            var a = new roleBarrelItemVO();
            a.itemID = 11006;
            a.itemIndex = e;
            a.itemPos = positions[e];
            this.waterBarrelList.push(a);
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.initBarrelTime = function () {
        if (!this.isGuide && this.roleBarrelData.curBarrelNum < this.roleBarrelData.maxBarrelNum) {
            if (this.roleBarrelData.nextFreeBarrelTime > this.roleBarrelData.curFreeBarrelTime) {
                this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1e3) + (this.roleBarrelData.nextFreeBarrelTime - this.roleBarrelData.curFreeBarrelTime);
                this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1e3);
            }
            else {
                this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1e3);
                this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1e3) + this.roleBarrelData.freeBarrelCd;
            }
        }
        else {
            this.roleBarrelData.nextFreeBarrelTime = 0;
            this.roleBarrelData.curFreeBarrelTime = 0;
        }
    };
    MapCellCfgData.prototype.resetBarrelTime = function (t) {
        this.roleBarrelData.maxBarrelNum = t.maxNum;
        this.roleBarrelData.nextFreeBarrelNum = t.productNum;
        this.roleBarrelData.freeBarrelCd = t.productCd;
    };
    MapCellCfgData.prototype.addBarrelNum = function (t) {
        this.roleBarrelData.curBarrelNum += t;
        if (this.isGuide || this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
            this.roleBarrelData.nextFreeBarrelTime = 0;
        }
        else {
            this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1e3) + this.roleBarrelData.freeBarrelCd;
        }
        this.async_write_data();
        GameManager_1.gm.ui.emit("refresh_barrel_num");
    };
    MapCellCfgData.prototype.addFreeBarrel = function () {
        if (this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
            this.roleBarrelData.nextFreeBarrelTime = 0;
            this.roleBarrelData.curBarrelNum = 0;
            return;
        }
        this.roleBarrelData.curBarrelNum = Math.min(this.roleBarrelData.curBarrelNum + this.roleBarrelData.nextFreeBarrelNum, this.roleBarrelData.maxBarrelNum);
        if (this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
            this.roleBarrelData.nextFreeBarrelTime = 0;
            this.roleBarrelData.curFreeBarrelTime = 0;
        }
        else {
            this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + this.roleBarrelData.freeBarrelCd;
            this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.reduceBarrelNum = function () {
        this.roleBarrelData.curBarrelNum--;
        if (!this.isGuide) {
            if (this.roleBarrelData.curBarrelNum < this.roleBarrelData.maxBarrelNum && 0 == this.roleBarrelData.nextFreeBarrelTime) {
                this.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + this.roleBarrelData.freeBarrelCd;
                this.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
            }
            else if (this.roleBarrelData.curBarrelNum >= this.roleBarrelData.maxBarrelNum) {
                this.roleBarrelData.nextFreeBarrelTime = 0;
                this.roleBarrelData.curFreeBarrelTime = 0;
            }
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.getMapHaveSpece = function () {
        return this.roleSpaceList.length > 0;
    };
    MapCellCfgData.prototype.changeMapItemDataByID = function (t, e, a, i, o) {
        if (i === void 0) { i = 0; }
        if (o === void 0) { o = true; }
        if (this.role_map_data[t]) {
            if (0 == e && 0 == a && o) {
                this.delDefenseDataByID(this.role_map_data[t].heroUID);
            }
            this.role_map_data[t].itemID = a;
            this.role_map_data[t].itemType = e;
            this.role_map_data[t].heroUID = i;
            if (o && 0 < a && e == Constants_1.ItemTypeEnum.HERO_TYPE) {
                var n = GameManager_1.gm.data.config_data.getHeroCfgByID(a);
                if (n && 0 < n.occupation && 10 != n.occupation && 11 != n.occupation && 12 != n.occupation) {
                    this.role_map_data[t].heroUID = this.heroTotalNum;
                    this.heroTotalNum++;
                }
            }
        }
    };
    MapCellCfgData.prototype.openCase = function (t, e) {
        if (this.role_openBarrel_Times > this.initOpenBarrelData) {
            var a = 0;
            if (e == Constants_1.RewardIdEnum.BARREL) {
                var random = GameManager_1.gm.data.config_data.getRandomID();
                var row = GameManager_1.gm.config.get_row_data_array("PoolConfigData", random + "");
                a = GameManager_1.gm.config.get_random_case(row);
            }
            else if (e == Constants_1.RewardIdEnum.SILVER_BARREL) {
                a = 3101;
            }
            else if (e == Constants_1.RewardIdEnum.GOLD_BARREL) {
                a = 3001;
            }
            var rowData = GameManager_1.gm.config.get_row_data_array("PoolConfigData", a + "");
            if (e == Constants_1.RewardIdEnum.GOLD_BARREL) {
                var unlock = this.get_unlock_hero_array();
                for (var n = rowData.length - 1; 0 <= n; n--) {
                    if (unlock.indexOf(rowData[n].prop) <= -1) {
                        rowData.splice(n, 1);
                    }
                }
            }
            var arr = [];
            GameManager_1.gm.data.setRandomReward(rowData, arr, 1);
            var itemID = arr[0].itemID;
            var itemType = arr[0].itemType;
            this.changeMapItemDataByID(t, itemType, itemID);
            this.checkIsPlayItemSound(itemID);
            this.addRoleItem(itemID, t);
        }
        else {
            var caskID = GameManager_1.gm.data.config_data.getCaskIDBySortId(this.role_openBarrel_Times);
            this.changeMapItemDataByID(t, caskID[0], caskID[1]);
            this.checkIsPlayItemSound(caskID[1]);
            this.addRoleItem(caskID[1], t);
            if (e != Constants_1.RewardIdEnum.BARREL) {
                cc.log("引导阶段，打开桶的奖励走配置");
            }
        }
        NetUtils_1.ReportData.instance.report_point(30101);
        this.role_openBarrel_Times += 1;
        GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.BREAK_BARREL);
        this.async_write_data();
    };
    MapCellCfgData.prototype.openStoneHero = function (t, e) {
        var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(e);
        if (itemCfg) {
            this.delCellItemByCellID(t);
            this.addRoleItem(itemCfg.next, t);
            this.changeMapItemDataByID(t, Constants_1.ItemTypeEnum.HERO_TYPE, itemCfg.next);
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.randomStoneHero = function (t, e, a) {
        var eData = GameManager_1.gm.config.get_row_data_array("PoolConfigData", e + "");
        var arr = [];
        GameManager_1.gm.data.setRandomReward(eData, arr, a);
        for (var o = 0; o < arr.length; o++) {
            this.addWareHouseItem(arr[o].itemID, 1);
        }
        this.delCellItemByCellID(t);
    };
    MapCellCfgData.prototype.checkIsPlayItemSound = function (t) {
        if (30000 <= t) {
            var row = GameManager_1.gm.config.get_row_data("HeroConfigData", t + "");
            if (row && row.get_merge_audio) {
                GameManager_1.gm.audio.play_effect(row.get_merge_audio.toString());
            }
            else {
                GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_161_COMPOSE);
            }
        }
        else {
            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(t);
            if (itemCfg) {
                if (itemCfg.soundID) {
                    GameManager_1.gm.audio.play_effect(itemCfg.soundID);
                }
                else {
                    GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_161_COMPOSE);
                }
            }
        }
    };
    MapCellCfgData.prototype.checkBuildState = function (t) {
        var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(t);
        return buildCfg && this.role_map_data[buildCfg.cellID] ? 2 : 1;
    };
    MapCellCfgData.prototype.changeCellID = function (t, e, a) {
        if (t == Constants_1.ItemTypeEnum.ITEM_TYPE) {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[e].itemID);
            if (itemConfig) {
                var itemData = this.itemData[itemConfig.type];
                if (itemData) {
                    for (var o = 0; o < itemData.length; o++)
                        if (itemData[o].cellID == e) {
                            itemData[o].cellID = a;
                            break;
                        }
                }
            }
        }
        else if (t == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID);
            if (heroConfig) {
                var heroData = this.heroData[heroConfig.occupation];
                if (heroData) {
                    for (var o = 0; o < heroData.length; o++) {
                        if (heroData[o].cellID == e) {
                            heroData[o].cellID = a;
                            break;
                        }
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.setItemCellIDAndItemID = function (itemType, cellID, newCellID, itemID, optionalParam) {
        if (optionalParam === void 0) { optionalParam = 0; }
        if (itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
            var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(itemID);
            if (buildCfg) {
                this.buildData[buildCfg.buildType].cellID = newCellID;
                return;
            }
        }
        if (0 != itemID) {
            var configID = 999 == cellID ? optionalParam : cellID;
            var type = 30000 < itemID ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
            if (itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                if (type == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                    var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[configID].itemID);
                    if (itemConfig) {
                        var itemData = this.itemData[itemConfig.type];
                        if (itemData) {
                            for (var index = 0; index < itemData.length; index++) {
                                if (itemData[index].cellID == cellID) {
                                    if (GameManager_1.gm.data.config_data.getItemCfgByID(itemID).type == itemConfig.type) {
                                        itemData[index].cellID = newCellID;
                                        itemData[index].itemID = itemID;
                                    }
                                    else {
                                        itemData.splice(index, 1);
                                        this.addRoleItem(itemID, newCellID);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == Constants_1.ItemTypeEnum.HERO_TYPE) {
                    var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[configID].itemID);
                    if (itemConfig) {
                        var itemData = this.itemData[itemConfig.type];
                        if (itemData) {
                            for (var index = 0; index < itemData.length; index++) {
                                if (itemData[index].cellID == cellID) {
                                    itemData.splice(index, 1);
                                    this.addRoleItem(itemID, newCellID);
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                    var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[configID].itemID);
                    if (itemConfig) {
                        var itemData = this.itemData[itemConfig.type];
                        if (itemData) {
                            for (var index = 0; index < itemData.length; index++) {
                                if (itemData[index].cellID == cellID) {
                                    itemData[index].cellID = newCellID;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
                if (type == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                    var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[configID].itemID);
                    if (heroConfig) {
                        var heroData = this.heroData[heroConfig.occupation];
                        if (heroData) {
                            for (var index = 0; index < heroData.length; index++) {
                                if (heroData[index].cellID == cellID) {
                                    heroData.splice(index, 1), this.addRoleItem(itemID, newCellID);
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == Constants_1.ItemTypeEnum.HERO_TYPE) {
                    var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[configID].itemID);
                    if (heroConfig) {
                        var heroData = this.heroData[heroConfig.occupation];
                        if (heroData) {
                            for (var index = 0; index < heroData.length; index++) {
                                if (heroData[index].cellID == cellID) {
                                    if (GameManager_1.gm.data.config_data.getHeroCfgByID(itemID).occupation == heroConfig.occupation) {
                                        heroData[index].cellID = newCellID;
                                        heroData[index].itemID = itemID;
                                    }
                                    else {
                                        heroData.splice(index, 1);
                                        this.addRoleItem(itemID, newCellID);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                    var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[configID].itemID);
                    if (heroConfig) {
                        var heroData = this.heroData[heroConfig.occupation];
                        if (heroData) {
                            for (var index = 0; index < heroData.length; index++) {
                                if (heroData[index].cellID == cellID) {
                                    heroData[index].cellID = newCellID;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.addBarracksIDToList = function (t) {
        this.barracks_unlock_id_list[t] = 2;
    };
    MapCellCfgData.prototype.checkHeroIDIsUnLock = function (t) {
        for (var e = 0; e < this.barracks_unlock_data.length; e++) {
            if (this.barracks_unlock_data[e].heroId == t) {
                return GameManager_1.gm.data.mapCell_data.barracks_unlock_data[e].state;
            }
        }
        return 2;
    };
    MapCellCfgData.prototype.changeSingleSuperHeroCellID = function (t, e, a) {
        if (30000 < t) {
            var i = GameManager_1.gm.data.config_data.getHeroCfgByID(t);
            if (i && i.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                for (var o = 0; o < this.superHeroData.length; o++) {
                    if (this.superHeroData[o].heroid == t && this.superHeroData[o].cellID == e) {
                        this.superHeroData[o].cellID = a;
                        break;
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.delSingleSuperHeroCellID = function (t, e) {
        if (30000 < t) {
            var a = GameManager_1.gm.data.config_data.getHeroCfgByID(t);
            if (a && a.hero_type === Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                for (var i = 0; i < this.superHeroData.length; i++) {
                    if (this.superHeroData[i].heroid === t && this.superHeroData[i].cellID === e) {
                        this.superHeroData.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.changeCellData = function (t, e) {
        if (0 != this.role_map_data[t].itemID && 186 != e) {
            if (395 != e && 313 != e) {
                if (0 == this.role_map_data[e].itemID) {
                    if (this.role_map_data[t].itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                        var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.role_map_data[t].itemID);
                        if (buildCfg) {
                            this.buildData[buildCfg.buildType].cellID = e;
                        }
                    }
                    else {
                        this.changeCellID(this.role_map_data[t].itemType, t, e);
                    }
                    this.changeSingleSuperHeroCellID(this.role_map_data[t].itemID, t, e);
                    this.changeDefenseHeroUIDCell(this.role_map_data[t].heroUID, e);
                    this.changeMapItemDataByID(e, this.role_map_data[t].itemType, this.role_map_data[t].itemID, this.role_map_data[t].heroUID, false);
                    this.changeMapItemDataByID(t, 0, 0, 0, false);
                    for (var index = 0; index < this.roleSpaceList.length; index++) {
                        if (e == this.roleSpaceList[index]) {
                            this.roleSpaceList.splice(index, 1);
                            break;
                        }
                    }
                    this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                    this.addRoleSpaceCellByID(t);
                    GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_160_CHANGEPOS);
                    this.async_write_data();
                    return;
                }
                if (this.role_map_data[e].itemType != Constants_1.ItemTypeEnum.BUILD_TYPE || this.role_map_data[t].itemType != Constants_1.ItemTypeEnum.HERO_TYPE) {
                    if (this.role_map_data[e].itemType != Constants_1.ItemTypeEnum.BUILD_TYPE || this.role_map_data[t].itemType != Constants_1.ItemTypeEnum.ITEM_TYPE) {
                        if (this.role_map_data[e].itemType == Constants_1.ItemTypeEnum.HERO_TYPE && this.role_map_data[t].itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID);
                            if (!heroCfg)
                                return;
                            for (var index = 0; index < heroCfg.nextNeedItem.length; index++) {
                                if (0 < heroCfg.nextNeedItem[index] && heroCfg.nextNeedItem[index] == this.role_map_data[t].itemID) {
                                    var heroID = this.checkHeroIDIsUnLock(heroCfg.nextLv[index]);
                                    if (this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]] <= 0 || !this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]]) {
                                        GameManager_1.gm.ui.show_notice("Nâng cấp doanh trại và kích hoạt cuộn giấy để tổng hợp anh hùng");
                                        return;
                                    }
                                    this.checkIsPlayItemSound(heroID);
                                    for (var i = 0; i < this.heroData[heroCfg.occupation].length; i++) {
                                        if (this.heroData[heroCfg.occupation][i].cellID == e) {
                                            this.heroData[heroCfg.occupation].splice(i, 1);
                                            this.addRoleItem(heroCfg.nextLv[index], e);
                                            break;
                                        }
                                    }
                                    var heroIS = this.getHeroIsDefanseByCellID(this.role_map_data[e].cellID);
                                    this.delDefenseDataByID(this.role_map_data[e].heroUID);
                                    this.delRoleItem(this.role_map_data[t].itemID, t);
                                    this.changeMapItemDataByID(e, Constants_1.ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                    if (heroIS) {
                                        var defenseHeroItemVO = new DefenseHeroItemVO;
                                        defenseHeroItemVO.cellID = e;
                                        defenseHeroItemVO.heroUID = this.role_map_data[e].heroUID;
                                        defenseHeroItemVO.heroid = this.role_map_data[e].itemID;
                                        this.addDefenseDataByID(defenseHeroItemVO);
                                    }
                                    this.unlockBookItem(Constants_1.ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                    GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE_HERO);
                                    GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE);
                                    this.saveAddCompseTimes();
                                    if (1 == heroID) {
                                        this.compositeUnlockHero(heroCfg.nextLv[index]);
                                        GameManager_1.gm.ui.mapMainUI.showHeroUnlockAni(heroCfg.nextLv[index]);
                                    }
                                    this.async_write_data();
                                    this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                                    void GameManager_1.gm.ui.mapMainUI.playComposeAnim(e);
                                    return;
                                }
                            }
                        }
                        if (this.role_map_data[t].itemType == Constants_1.ItemTypeEnum.HERO_TYPE && this.role_map_data[e].itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[t].itemID);
                            if (!heroCfg)
                                return;
                            for (var index = 0; index < heroCfg.nextNeedItem.length; index++) {
                                if (0 < heroCfg.nextNeedItem[index] && heroCfg.nextNeedItem[index] == this.role_map_data[e].itemID) {
                                    var heroIS = this.checkHeroIDIsUnLock(heroCfg.nextLv[index]);
                                    if (this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]] <= 0 || !this.barracks_unlock_id_list[heroCfg.nextNeedSort[index]]) {
                                        GameManager_1.gm.ui.show_notice("Cần nâng cấp cấp doanh trại và kích hoạt cuộn giấy để tổng hợp");
                                        return;
                                    }
                                    else {
                                        this.checkIsPlayItemSound(heroIS);
                                        var HeroIsDefanseByCellID = this.getHeroIsDefanseByCellID(this.role_map_data[t].cellID);
                                        this.delRoleItem(this.role_map_data[t].itemID, t);
                                        this.delRoleItem(this.role_map_data[e].itemID, e);
                                        this.delDefenseDataByID(this.role_map_data[t].heroUID);
                                        this.changeMapItemDataByID(e, Constants_1.ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                        this.changeMapItemDataByID(t, 0, 0);
                                        this.addRoleItem(heroCfg.nextLv[index], e);
                                        if (HeroIsDefanseByCellID) {
                                            var defenseHeroItemVO = new DefenseHeroItemVO;
                                            defenseHeroItemVO.cellID = e;
                                            defenseHeroItemVO.heroUID = this.role_map_data[e].heroUID;
                                            defenseHeroItemVO.heroid = this.role_map_data[e].itemID;
                                            this.addDefenseDataByID(defenseHeroItemVO);
                                        }
                                        this.saveAddCompseTimes();
                                        if (1 == heroIS) {
                                            this.compositeUnlockHero(heroCfg.nextLv[index]);
                                        }
                                        this.unlockBookItem(Constants_1.ItemTypeEnum.HERO_TYPE, heroCfg.nextLv[index]);
                                        GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE_HERO);
                                        GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE);
                                        this.async_write_data();
                                        this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                                        GameManager_1.gm.ui.mapMainUI.playComposeAnim(e);
                                        if (1 == heroIS) {
                                            this.compositeUnlockHero(heroCfg.nextLv[index]);
                                            GameManager_1.gm.ui.mapMainUI.showHeroUnlockAni(heroCfg.nextLv[index]);
                                        }
                                        return;
                                    }
                                }
                            }
                        }
                        if (this.role_map_data[e].itemType == Constants_1.ItemTypeEnum.HERO_TYPE && Constants_1.ItemTypeEnum.HERO_TYPE == this.role_map_data[t].itemType) {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[t].itemID);
                            if (!heroCfg)
                                return;
                            var HeroCfgByID = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID);
                            if (!HeroCfgByID)
                                return;
                            if (1 == this.role_compose_total_times) {
                                GameManager_1.gm.ui.show_notice("Bạn cần hoàn thành phần vũ khí và hướng dẫn dân làng!");
                                return;
                            }
                            if (heroCfg.heroid == HeroCfgByID.heroid) {
                                if (0 == heroCfg.occupation) {
                                    GameManager_1.gm.ui.show_notice("Dân làng cần tổng hợp vũ khí!!!");
                                    return;
                                }
                                if (11 == heroCfg.occupation || 12 == heroCfg.occupation || 1 == heroCfg.hero_type) {
                                    if (0 == heroCfg.nextLv[0]) {
                                        GameManager_1.gm.ui.show_notice("Đã đạt đến cấp độ cao nhất!!!");
                                        return;
                                    }
                                }
                                else if (3 == heroCfg.lv) {
                                    GameManager_1.gm.ui.show_notice("Đã đạt đến cấp độ cao nhất!!!");
                                    return;
                                }
                                if (HeroCfgByID.occupation == heroCfg.occupation && 0 < heroCfg.nextNeedItem[0]) {
                                    for (var y = 0; y < heroCfg.nextNeedItem.length; y++) {
                                        if (heroCfg.nextNeedItem[y] == HeroCfgByID.heroid && this.checkHeroIDIsUnLock(HeroCfgByID.nextLv[y])) {
                                            if (HeroCfgByID.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                                                var n = 0;
                                                for (var r = 0; r < this.superHeroData.length; r++) {
                                                    if (this.superHeroData[r].heroid == heroCfg.heroid &&
                                                        this.superHeroData[r].cellID == t &&
                                                        0 == this.superHeroData[r].heroState ||
                                                        this.superHeroData[r].heroid == heroCfg.heroid &&
                                                            this.superHeroData[r].cellID == e &&
                                                            0 == this.superHeroData[r].heroState) {
                                                        n++;
                                                    }
                                                }
                                                if (n < 2) {
                                                    GameManager_1.gm.ui.show_notice("Siêu anh hùng không thể tổng hợp trong quá trình hồi sinh");
                                                    return;
                                                }
                                                for (var r = 0; r < this.superHeroData.length; r++) {
                                                    if (this.superHeroData[r].heroid == heroCfg.heroid && this.superHeroData[r].cellID == e) {
                                                        this.superHeroData[r].heroid = HeroCfgByID.nextLv[y];
                                                        var heroCfg_1 = GameManager_1.gm.data.config_data.getHeroCfgByID(HeroCfgByID.nextLv[y]);
                                                        if (heroCfg_1) {
                                                            this.superHeroData[r].hp = heroCfg_1.hp;
                                                            this.superHeroData[r].maxHp = heroCfg_1.hp;
                                                            this.superHeroData[r].curReliveTime = 0;
                                                            this.superHeroData[r].nextReliveTime = 0;
                                                        }
                                                        break;
                                                    }
                                                }
                                                for (var r = 0; r < this.superHeroData.length; r++) {
                                                    if (this.superHeroData[r].heroid == heroCfg.heroid && this.superHeroData[r].cellID == t) {
                                                        this.superHeroData.splice(r, 1);
                                                        break;
                                                    }
                                                }
                                            }
                                            var heroIDI = this.checkHeroIDIsUnLock(HeroCfgByID.nextLv[y]);
                                            this.checkIsPlayItemSound(heroIDI);
                                            var heroIS = this.getHeroIsDefanseByCellID(this.role_map_data[t].cellID);
                                            if (!heroIS) {
                                                this.getHeroIsDefanseByCellID(this.role_map_data[e].cellID);
                                            }
                                            for (i = 0; i < this.heroData[heroCfg.occupation].length; i++) {
                                                if (this.heroData[heroCfg.occupation][i].cellID == e) {
                                                    this.heroData[heroCfg.occupation][i].itemID = HeroCfgByID.nextLv[y];
                                                    break;
                                                }
                                            }
                                            this.delRoleItem(this.role_map_data[t].itemID, t);
                                            this.delDefenseDataByID(this.role_map_data[e].heroUID);
                                            this.changeMapItemDataByID(e, Constants_1.ItemTypeEnum.HERO_TYPE, HeroCfgByID.nextLv[y]);
                                            if (heroIS) {
                                                var defenseHeroItemVO = new DefenseHeroItemVO;
                                                defenseHeroItemVO.cellID = e;
                                                defenseHeroItemVO.heroUID = this.role_map_data[e].heroUID;
                                                defenseHeroItemVO.heroid = this.role_map_data[e].itemID;
                                                this.addDefenseDataByID(defenseHeroItemVO);
                                            }
                                            this.saveAddCompseTimes();
                                            if (1 == heroIDI) {
                                                this.compositeUnlockHero(HeroCfgByID.nextLv[y]);
                                                GameManager_1.gm.ui.mapMainUI.showHeroUnlockAni(HeroCfgByID.nextLv[y]);
                                            }
                                            this.unlockBookItem(Constants_1.ItemTypeEnum.HERO_TYPE, HeroCfgByID.nextLv[y]);
                                            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE_HERO);
                                            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE);
                                            this.async_write_data();
                                            GameManager_1.gm.ui.mapMainUI.playComposeAnim(e);
                                            if (!(heroCfg.hero_type != Constants_1.HeroTypeEnum.SUPER_HERO_TYPE && 11 != heroCfg.occupation && 12 != heroCfg.occupation)) {
                                                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [HeroCfgByID.nextLv[y], e]);
                                                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
                                            }
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        if (this.role_map_data[e].itemType == Constants_1.ItemTypeEnum.ITEM_TYPE && Constants_1.ItemTypeEnum.ITEM_TYPE == this.role_map_data[t].itemType) {
                            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[t].itemID);
                            if (!itemCfg)
                                return;
                            var itemCfgID = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[e].itemID);
                            if (!itemCfgID)
                                return;
                            if (itemCfgID.type == Constants_1.PropTypeEnum.WEAPON_TYPE && itemCfg.id == itemCfgID.id) {
                                GameManager_1.gm.ui.show_notice("Vũ khí cần phải kết hợp với dân làng để trở thành anh hùng");
                                return;
                            }
                            if (0 == itemCfg.next && itemCfg.id == itemCfgID.id) {
                                GameManager_1.gm.ui.show_notice("Đã đạt đến cấp độ cao nhất!");
                                return;
                            }
                            if (itemCfgID.type == itemCfg.type && 0 < itemCfg.next && itemCfg.id == itemCfgID.id) {
                                for (i = 0; i < this.itemData[itemCfg.type].length; i++) {
                                    if (this.itemData[itemCfg.type][i].cellID == e) {
                                        this.itemData[itemCfg.type][i].itemID = itemCfgID.next;
                                        break;
                                    }
                                }
                                this.delRoleItem(this.role_map_data[t].itemID, t);
                                this.changeMapItemDataByID(e, Constants_1.ItemTypeEnum.ITEM_TYPE, itemCfgID.next);
                                if (itemCfgID.next == GameManager_1.gm.const.HEROGIFTID) {
                                    GameManager_1.gm.channel.report_event("merge_box", {
                                        event_desc: "合成盲盒",
                                        desc: "合成盲盒超级英雄",
                                        item_id: itemCfgID.next
                                    });
                                    NetUtils_1.ReportData.instance.report_once_point(10871);
                                    NetUtils_1.ReportData.instance.report_point(10872);
                                }
                                else if (itemCfgID.next == GameManager_1.gm.const.GIFTID) {
                                    GameManager_1.gm.channel.report_event("merge_box", {
                                        event_desc: "合成盲盒",
                                        desc: "合成盲盒水精灵",
                                        item_id: itemCfgID.next
                                    });
                                    NetUtils_1.ReportData.instance.report_once_point(10875);
                                    NetUtils_1.ReportData.instance.report_point(10876);
                                }
                                else if (itemCfgID.next == GameManager_1.gm.const.PAGODAGIFTID) {
                                    GameManager_1.gm.channel.report_event("merge_box", {
                                        event_desc: "合成盲盒",
                                        desc: "合成盲盒炮塔",
                                        item_id: itemCfgID.next
                                    });
                                    NetUtils_1.ReportData.instance.report_once_point(10873);
                                    NetUtils_1.ReportData.instance.report_point(10874);
                                }
                                this.saveAddCompseTimes();
                                this.unlockBookItem(Constants_1.ItemTypeEnum.ITEM_TYPE, itemCfgID.next);
                                GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.MERGE);
                                this.async_write_data();
                                if (12 <= itemCfgID.type && itemCfgID.type <= 14 || 19 == itemCfgID.type) {
                                    GameManager_1.gm.ui.mapMainUI.showGiftBar(itemCfgID.next, e);
                                }
                                GameManager_1.gm.ui.mapMainUI.playComposeAnim(e);
                                return;
                            }
                        }
                        var itemID = this.role_map_data[e].itemID;
                        var itemType = this.role_map_data[e].itemType;
                        var heroUID = this.role_map_data[e].heroUID;
                        if (this.role_map_data[t].itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                            if (this.role_map_data[e].itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                                var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.role_map_data[t].itemID);
                                if (!buildCfg)
                                    return;
                                var buildCfg1 = GameManager_1.gm.data.config_data.getBuildCfgByID(this.role_map_data[e].itemID);
                                if (!buildCfg1)
                                    return;
                                if (buildCfg.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE || buildCfg.buildType == Constants_1.BuildTypeEnum.WHARFTAX_TYPE)
                                    return;
                                if (buildCfg1.buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE || buildCfg1.buildType == Constants_1.BuildTypeEnum.WHARFTAX_TYPE)
                                    return;
                                if (this.buildData[buildCfg.buildType].buildLvl <= 0)
                                    return;
                                if (this.buildData[buildCfg1.buildType].buildLvl <= 0)
                                    return;
                                this.buildData[buildCfg.buildType].cellID = e;
                                this.buildData[buildCfg1.buildType].cellID = t;
                            }
                            else {
                                var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.role_map_data[t].itemID);
                                if (!buildCfg)
                                    return;
                                if (this.buildData[buildCfg.buildType].buildLvl <= 0)
                                    return;
                                this.buildData[buildCfg.buildType].cellID = e;
                                this.changeCellID(this.role_map_data[e].itemType, e, t);
                                this.changeDefenseHeroUIDCell(this.role_map_data[e].heroUID, t);
                                this.setSuperHeroNewCellID(this.role_map_data[t].itemID, this.role_map_data[t].heroUID, e);
                            }
                        }
                        else {
                            this.changeDefenseHeroUIDCell(this.role_map_data[t].heroUID, e);
                            this.changeDefenseHeroUIDCell(this.role_map_data[e].heroUID, t);
                            this.setItemCellIDAndItemID(this.role_map_data[t].itemType, t, 999, this.role_map_data[t].itemID);
                            this.setItemCellIDAndItemID(this.role_map_data[e].itemType, e, e, this.role_map_data[t].itemID);
                            this.setItemCellIDAndItemID(this.role_map_data[t].itemType, 999, t, this.role_map_data[e].itemID, t);
                            this.changeSuperHeroCellID(this.role_map_data[t].itemType, this.role_map_data[t].itemID, t, itemType, itemID, e);
                        }
                        this.changeMapItemDataByID(e, this.role_map_data[t].itemType, this.role_map_data[t].itemID, this.role_map_data[t].heroUID, false);
                        this.changeMapItemDataByID(t, itemType, itemID, heroUID, false);
                        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_160_CHANGEPOS);
                        this.async_write_data();
                        if (this.role_map_data[t].itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[t].itemID);
                            if (heroCfg && 10 == heroCfg.occupation) {
                                this.checkEmitWallEvent(this.role_map_data[t].itemID, t, e);
                            }
                            else {
                                this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                            }
                        }
                        else if (this.role_map_data[e].itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[e].itemID);
                            if (heroCfg && 10 == heroCfg.occupation) {
                                this.checkEmitWallEvent(this.role_map_data[e].itemID, t, e);
                            }
                            else {
                                this.checkEmitWallEvent(this.role_map_data[t].itemID, t, e);
                            }
                        }
                    }
                    else {
                        var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[t].itemID);
                        var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.role_map_data[e].itemID);
                        if (itemCfg && buildCfg) {
                            if (buildCfg.lock == this.role_build_lock_num) {
                                var buildData = this.buildData[buildCfg.buildType];
                                if (buildData.metrailData[itemCfg.type] && buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                                    if (itemCfg.type == Constants_1.PropTypeEnum.WOOD_TYPE || itemCfg.type == Constants_1.PropTypeEnum.IRON_TYPE || itemCfg.type == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                                        if (buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                                            if (this.isGuide) {
                                                if (!GameManager_1.gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                                    GameManager_1.gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                                }
                                                if (itemCfg.number >= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                                    TempData_1.TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, itemCfg.number, buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur);
                                                    GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                                    GameManager_1.gm.ui.emit("guide_del_item", t);
                                                }
                                                return;
                                            }
                                            if (itemCfg.number <= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                                buildData.metrailData[itemCfg.type].cur += itemCfg.number;
                                            }
                                            else {
                                                var metrailData = buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur;
                                                this.splitItemNum(metrailData, itemCfg.id);
                                                buildData.metrailData[itemCfg.type].cur = buildData.metrailData[itemCfg.type].max;
                                            }
                                            this.delRoleItem(itemCfg.id, t);
                                            GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        }
                                    }
                                    else {
                                        if (this.isGuide) {
                                            if (!GameManager_1.gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                                GameManager_1.gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                            }
                                            if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                                TempData_1.TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, 1, 1);
                                                GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                                GameManager_1.gm.ui.emit("guide_del_item", t);
                                            }
                                            return;
                                        }
                                        if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                            buildData.metrailData[itemCfg.type].cur = 1;
                                            this.delRoleItem(itemCfg.id, t);
                                            this._needRefreshCellList.push(t);
                                            GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        }
                                        else if (itemCfg.id > buildData.metrailData[itemCfg.type].id) {
                                            this.delRoleItem(itemCfg.id, t);
                                            this._needRefreshCellList.push(t);
                                            var Num = [];
                                            for (var y = itemCfg.id - 1; y >= buildData.metrailData[itemCfg.type].id; y--) {
                                                Num.push(y);
                                                if (y == buildData.metrailData[itemCfg.type].id) {
                                                    buildData.metrailData[itemCfg.type].cur += 1;
                                                    break;
                                                }
                                            }
                                            this.addWareHouseList(Num, 0);
                                            GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        }
                                    }
                                }
                                this.async_write_data();
                            }
                            else {
                                GameManager_1.gm.ui.show_notice("Hãy nâng cấp tòa nhà " + GameManager_1.gm.data.config_data.getSortBuildName() + "trước!!!");
                            }
                        }
                    }
                }
            }
            else {
                if (this.role_map_data[t].itemType == Constants_1.ItemTypeEnum.ITEM_TYPE) {
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this.role_map_data[t].itemID);
                    if (!itemCfg)
                        return;
                    var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE].buildID);
                    if (!buildCfg)
                        return;
                    if (buildCfg.lock != this.role_build_lock_num) {
                        GameManager_1.gm.ui.show_notice("Hãy nâng cấp tòa nhà " + GameManager_1.gm.data.config_data.getSortBuildName() + "trước!!!");
                        return;
                    }
                    var buildData = this.buildData[buildCfg.buildType];
                    if (buildData.metrailData[itemCfg.type] && buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                        if (itemCfg.type == Constants_1.PropTypeEnum.WOOD_TYPE || itemCfg.type == Constants_1.PropTypeEnum.IRON_TYPE || itemCfg.type == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                            if (buildData.metrailData[itemCfg.type].cur < buildData.metrailData[itemCfg.type].max) {
                                if (this.isGuide) {
                                    if (itemCfg.number >= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                        if (!GameManager_1.gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                            GameManager_1.gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                        }
                                        TempData_1.TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, itemCfg.number, buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur);
                                        GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                        GameManager_1.gm.ui.emit("guide_del_item", t);
                                    }
                                    return;
                                }
                                if (itemCfg.number <= buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur) {
                                    buildData.metrailData[itemCfg.type].cur += itemCfg.number, this.delRoleItem(itemCfg.id, t);
                                    GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                    return;
                                }
                                var metrailData = buildData.metrailData[itemCfg.type].max - buildData.metrailData[itemCfg.type].cur;
                                this.splitItemNum(metrailData, itemCfg.id);
                                buildData.metrailData[itemCfg.type].cur = buildData.metrailData[itemCfg.type].max;
                                this.delRoleItem(itemCfg.id, t);
                                GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                return;
                            }
                        }
                        else {
                            if (this.isGuide) {
                                if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                    if (!GameManager_1.gm.ui.mapMainUI.roleGuideBuildUpgrade.active) {
                                        GameManager_1.gm.ui.mapMainUI.showBuildUpgrade(buildCfg.buildID, e);
                                    }
                                    TempData_1.TempData.setBuildGuideMertaril(buildCfg.buildID, itemCfg.id, itemCfg.type, t, 1, 1);
                                    GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                    GameManager_1.gm.ui.emit("guide_del_item", t);
                                }
                                return;
                            }
                            if (itemCfg.id == buildData.metrailData[itemCfg.type].id) {
                                buildData.metrailData[itemCfg.type].cur = 1;
                                this.delRoleItem(itemCfg.id, t);
                                this._needRefreshCellList.push(t);
                                void GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                return;
                            }
                            if (itemCfg.id > buildData.metrailData[itemCfg.type].id) {
                                this.delRoleItem(itemCfg.id, t), this._needRefreshCellList.push(t);
                                var Num = [];
                                for (var y = itemCfg.id - 1; y >= buildData.metrailData[itemCfg.type].id; y--) {
                                    Num.push(y);
                                    if (y == buildData.metrailData[itemCfg.type].id) {
                                        (buildData.metrailData[itemCfg.type].cur += 1);
                                    }
                                }
                                this.addWareHouseList(Num, 0);
                                GameManager_1.gm.ui.emit("build_metarail_change", buildCfg.buildID);
                                return;
                            }
                        }
                    }
                }
                this.async_write_data();
            }
        }
    };
    MapCellCfgData.prototype.changeSuperHeroCellID = function (t, e, a, i, o, n) {
        if (t == Constants_1.ItemTypeEnum.HERO_TYPE && i != Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(e);
            if (heroConfig && heroConfig.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                this.setSuperHeroNewCellID(e, a, n);
            }
        }
        else if (t != Constants_1.ItemTypeEnum.HERO_TYPE && i == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(o);
            if (heroConfig && heroConfig.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                this.setSuperHeroNewCellID(o, n, a);
            }
        }
        else if (t == Constants_1.ItemTypeEnum.HERO_TYPE && i == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroConfig1 = GameManager_1.gm.data.config_data.getHeroCfgByID(e);
            var heroConfig2 = GameManager_1.gm.data.config_data.getHeroCfgByID(o);
            if (heroConfig1 && heroConfig2) {
                if (heroConfig1.hero_type != Constants_1.HeroTypeEnum.SUPER_HERO_TYPE || heroConfig2.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                    if (heroConfig1.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE || heroConfig2.hero_type != Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                        if (heroConfig1.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE && heroConfig2.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                            this.setSuperHeroNewCellID(e, a, 999);
                            this.setSuperHeroNewCellID(o, n, a);
                            this.setSuperHeroNewCellID(e, 999, n);
                        }
                        return;
                    }
                    this.setSuperHeroNewCellID(o, n, a);
                }
                else {
                    this.setSuperHeroNewCellID(e, a, n);
                }
            }
        }
    };
    MapCellCfgData.prototype.setSuperHeroNewCellID = function (t, e, a) {
        for (var i = 0; i < this.superHeroData.length; i++) {
            if (this.superHeroData[i].cellID == e && this.superHeroData[i].heroid == t) {
                this.superHeroData[i].cellID = a;
                break;
            }
        }
    };
    MapCellCfgData.prototype.checkEmitWallEvent = function (t, e, a) {
        if (30000 < t) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(t);
            if (heroConfig && 10 == heroConfig.occupation) {
                var calldire = GameManager_1.gm.data.config_data.getCallDireCellID(e);
                for (var o = 0; o < calldire.length; o++) {
                    if (0 <= calldire[o] && this.getCellIsWall(calldire[o])) {
                        GameManager_1.gm.ui.emit("updateWall", calldire[o]);
                    }
                }
                if (e != a) {
                    var calldire_1 = GameManager_1.gm.data.config_data.getCallDireCellID(a);
                    for (var o = 0; o < calldire_1.length; o++) {
                        if (0 <= calldire_1[o] && this.getCellIsWall(calldire_1[o])) {
                            GameManager_1.gm.ui.emit("updateWall", calldire_1[o]);
                        }
                    }
                }
            }
        }
    };
    MapCellCfgData.prototype.setAddGameCoin = function (t, e) {
        if (t == Constants_1.SetItemNumEnum.ADD_ITEM_TYPE) {
            this.roleCoinData.coinNum += e;
        }
        else if (t == Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE) {
            this.roleCoinData.coinNum -= e;
            this.roleCoinData.coinNum = Math.max(0, this.roleCoinData.coinNum);
        }
        GameManager_1.gm.ui.emit("coin_change");
        this.async_write_data();
    };
    MapCellCfgData.prototype.setAddGameDiamond = function (t, e) {
        if (t == Constants_1.SetItemNumEnum.ADD_ITEM_TYPE) {
            this.roleCoinData.diamondNum += e;
        }
        else if (t == Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE) {
            this.roleCoinData.diamondNum -= e;
            this.roleCoinData.diamondNum = Math.max(0, this.roleCoinData.diamondNum);
        }
        GameManager_1.gm.ui.emit("coin_change");
        this.async_write_data();
    };
    MapCellCfgData.prototype.delCellItemByCellID = function (t) {
        if (this.role_map_data[t]) {
            this.delRoleItem(this.role_map_data[t].itemID, t);
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.delCellItem = function (t, e) {
        var rowData = GameManager_1.gm.config.get_row_data("ItemConfigData", t.toString());
        if (rowData.type == Constants_1.PropTypeEnum.COIN_TYPE) {
            this.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, e);
        }
        else if (rowData.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE) {
            this.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, e);
        }
        else if (rowData.type == Constants_1.PropTypeEnum.WOOD_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.IRON_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.KEY_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.SHIPANCHORL_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.HORN_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.JAR_TYPE ||
            rowData.type == Constants_1.PropTypeEnum.SOUL_TYPE) {
            Utils_1.Utils.sort_by_props(this.itemData[rowData.type], {
                itemID: "descending"
            });
            var count = 0;
            for (var index = this.itemData[rowData.type].length - 1; 0 <= index; index--) {
                var itemID = this.itemData[rowData.type][index].itemID;
                var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemID);
                if (!(count + itemConfig.number <= e)) {
                    this._needRefreshCellList.push(this.itemData[rowData.type][index].cellID);
                    itemID = e - count;
                    if (GameManager_1.gm.ui.mapMainUI) {
                        var newR = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.itemData[rowData.type][index].cellID.toString());
                        var newS = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[Constants_1.BuildTypeEnum.STALL_TYPE].cellID.toString());
                        if (newR && newS) {
                            var newN = newS.getComponent(MainMapItem_1.default);
                            if (newN && newN.itemNode) {
                                GameManager_1.gm.ui.show_item_fly(itemConfig.id, newR.convertToWorldSpaceAR(cc.Vec3.ZERO), newN.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            }
                        }
                    }
                    this.delCellItemByCellID(this.itemData[rowData.type][index].cellID);
                    this.splitItemNum(itemConfig.number - itemID, itemConfig.id);
                    break;
                }
                this._needRefreshCellList.push(this.itemData[rowData.type][index].cellID);
                if (GameManager_1.gm.ui.mapMainUI) {
                    var newR = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.itemData[rowData.type][index].cellID.toString());
                    var newS = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.buildData[Constants_1.BuildTypeEnum.STALL_TYPE].cellID.toString());
                    if (newR && newS) {
                        var newN = newS.getComponent(MainMapItem_1.default);
                        if (newN && newN.itemNode) {
                            GameManager_1.gm.ui.show_item_fly(itemConfig.id, newR.convertToWorldSpaceAR(cc.Vec3.ZERO), newN.itemNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                        }
                    }
                }
                this.delCellItemByCellID(this.itemData[rowData.type][index].cellID);
                count += itemConfig.number;
            }
            this.async_write_data();
        }
        else if (rowData.type == Constants_1.PropTypeEnum.WEAPON_TYPE) {
            var itemData = this.itemData[rowData.type];
            Utils_1.Utils.sort_by_props(itemData, {
                itemID: "descending"
            });
            var d = void 0, p = 0;
            for (var o = itemData.length - 1; 0 <= o && !((d = itemData[o]).itemID == t && (this._needRefreshCellList.push(d.cellID), this.delCellItemByCellID(d.cellID), ++p >= e)); o--)
                ;
            this.async_write_data();
        }
    };
    MapCellCfgData.prototype.getCoinNum = function (t, e) {
        if (t == Constants_1.PropTypeEnum.WOOD_TYPE || t == Constants_1.PropTypeEnum.IRON_TYPE || t == Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
            return !!(this.itemData[t] && 0 < this.itemData[t].length);
        }
        if (this.itemData[t]) {
            for (var a = 0; a < this.itemData[t].length; a++) {
                if (this.itemData[t][a].itemID >= e)
                    return true;
            }
        }
        return false;
    };
    MapCellCfgData.prototype.getHeroNum = function (t, e) {
        if (this.heroData[t]) {
            for (var a = 0; a < this.heroData[t].length; a++) {
                if (this.heroData[t][a].itemID == e) {
                    return true;
                }
            }
        }
        return false;
    };
    MapCellCfgData.prototype.async_write_data = function () {
        var argArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArray[_i] = arguments[_i];
        }
        this.last_timestamp = Math.floor(Date.now() / 1e3);
        GameManager_1.gm.data.event_emitter.emit(MapCellCfgData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, argArray);
    };
    MapCellCfgData.prototype.getNextLockCell = function () {
        return GameManager_1.gm.data.config_data.getAreaNextOpenCellID(this.role_cur_unlock_area_ID, this.role_cur_unlock_area_sort) || null;
    };
    MapCellCfgData.prototype.checkBuildIsActive = function (t) {
        for (var key in this.buildData) {
            if (0 == this.buildData[key].buildLvl && 1 == this.buildData[key].buildState) {
                var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(this.buildData[key].buildID);
                if (buildCfg && buildCfg.activeCellID == t) {
                    if (buildCfg.buildType == Constants_1.BuildTypeEnum.TOWER_TYPE)
                        return;
                    this.buildData[key].buildState = 2;
                    GameManager_1.gm.ui.emit("item_children_refresh", this.buildData[key].cellID);
                    break;
                }
            }
        }
    };
    MapCellCfgData.prototype.saveAddCompseTimes = function () {
        this.role_compose_times++;
        this.role_compose_total_times++;
        GameManager_1.gm.ui.emit("item_compose_time_change", this.role_compose_total_times);
        var lockCell = this.getNextLockCell();
        if (lockCell) {
            if (this.role_compose_times >= lockCell.comTimes) {
                this.role_compose_times = 0;
                var mapCell = GameManager_1.gm.data.config_data.getMapCellCfgByID(lockCell.cellID);
                if (this.role_compose_times == mapCell.isObstruct) {
                    var mapItemData = new MapItemDataVO;
                    mapItemData.cellID = lockCell.cellID;
                    mapItemData.cellState = 2;
                    mapItemData.itemState = 2;
                    mapItemData.itemID = mapCell.itemID;
                    mapItemData.heroUID = 0;
                    mapItemData.itemType = mapCell.itemType;
                    this.role_map_data[mapItemData.cellID] = mapItemData;
                    if (0 < this.role_map_data[mapItemData.cellID].itemID) {
                        if (mapItemData.itemType == Constants_1.ItemTypeEnum.BUILD_TYPE) {
                            this.addBuild(mapItemData.itemID, mapItemData.cellID);
                        }
                        else {
                            this.addRoleItem(mapItemData.itemID, mapItemData.cellID);
                        }
                    }
                    else {
                        this.addRoleSpaceCellByID(mapItemData.cellID);
                    }
                }
                this.addIndexToList(listTypeEnum.MAP_TOTAL_TYPE, lockCell.cellID);
                this.addIndexToList(listTypeEnum.REPORT_CELL_TYPE, lockCell.cellID);
                this.checkBuildIsActive(lockCell.cellID);
                GameManager_1.gm.ui.emit("item_unlock_refresh", lockCell.cellID);
                this.role_cur_unlock_area_sort += 1;
                this.checkEmitWallEvent(mapCell.itemID, lockCell.cellID, lockCell.cellID);
                this.async_write_data();
                if (GameManager_1.gm.const.funPosList[lockCell.cellID]) {
                    GameManager_1.gm.ui.mapMainUI.setLockSenceMoveMap(GameManager_1.gm.const.funPosList[lockCell.cellID].toString());
                }
                NetUtils_1.ReportData.instance.report_once_point(5e4 + lockCell.cellID);
                GameManager_1.gm.channel.report_event("unlock_map_cell", {
                    event_desc: "解锁地图格子",
                    cell_count: lockCell.cellID,
                    desc: cc.js.formatStr("解锁地图格子%d", lockCell.cellID)
                });
                GameManager_1.gm.ui.emit("compostimeChange");
                GameManager_1.gm.ui.emit("build_show_stateIcon", true);
            }
        }
        else {
            var unlockArea = this.role_cur_unlock_area_ID + 1;
            for (var o = 0; o < this.roleUnlockAreaIDList.length; o++) {
                if (unlockArea == this.roleUnlockAreaIDList[o]) {
                    this.role_cur_unlock_area_ID = unlockArea;
                    var areaID = GameManager_1.gm.data.config_data.getAreaIDList(unlockArea);
                    if (areaID) {
                        for (var key in this.role_cur_unlock_area_sort = 0, areaID) {
                            if (10000 == areaID[key].comTimes) {
                                this.role_cur_unlock_area_sort++;
                            }
                        }
                        this.role_compose_times = 0;
                        this.async_write_data();
                        GameManager_1.gm.ui.mapMainUI.showNextCellNode();
                        break;
                    }
                }
            }
        }
        GameManager_1.gm.ui.emit("show_hand_anim", false);
        if (1 == this.role_compose_total_times) {
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: 5,
                guidedesc: "5.第1次合成1级鱼叉兵"
            });
            GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
        }
        else if (2 == this.role_compose_total_times) {
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: 6,
                guidedesc: "6.第2次合成1级鱼叉兵"
            });
            GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
        }
        else if (3 == this.role_compose_total_times) {
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: 7,
                guidedesc: "7.第1次合成2级鱼叉兵"
            });
            GameManager_1.gm.data.mapCell_data.setRoleGuideData(13, 0);
            GameManager_1.gm.ui.mapMainUI.checkGuideIsShow();
        }
        else if (4 == this.role_compose_total_times) {
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: 19,
                guidedesc: "19.第1次合成4级木头"
            });
            GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
        }
        else if (5 == this.role_compose_total_times) {
            GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                guideid: 20,
                guidedesc: "20.第1次合成2级铁矿"
            });
            GameManager_1.gm.ui.mapMainUI.checkHandAnimDelay();
        }
    };
    MapCellCfgData.prototype.unlockBookItem = function (t, e) {
        if (null != GameManager_1.gm.config.get_config_data("BookConfigData").data[e]) {
            if (null == this.tUnlockData[t]) {
                this.tUnlockData[t] = {};
            }
            if (null == this.tUnlockData[t][e]) {
                var row = GameManager_1.gm.config.get_row_data("BookConfigData", e.toString());
                this.tUnlockData[t][e] = row.reward <= 0 ? 1 : 0;
                GameManager_1.gm.ui.emit("bookRedStatus", true);
            }
        }
    };
    MapCellCfgData.prototype.checkBookItemIsUnlock = function (t) {
        for (var key in this.tUnlockData) {
            var unlock = this.tUnlockData[key];
            if (null != unlock && null != unlock[t])
                return true;
        }
        return false;
    };
    MapCellCfgData.prototype.checkBookItemHaveUnlockReward = function (t) {
        if (t === void 0) { t = null; }
        for (var key in this.tUnlockData) {
            var unlock = this.tUnlockData[key];
            if (null != unlock)
                if (null != t) {
                    if (null != unlock[t])
                        return 0 == unlock[t];
                }
                else {
                    for (var i in unlock) {
                        if (0 == unlock[i])
                            return true;
                    }
                }
        }
        return false;
    };
    MapCellCfgData.prototype.setBookItemGainUnlockReward = function (t) {
        for (var key in this.tUnlockData) {
            var unlock = this.tUnlockData[key];
            if (null != unlock && null != unlock[t]) {
                unlock[t] = 1;
                break;
            }
        }
        this.async_write_data();
    };
    MapCellCfgData.prototype.get_unlock_hero_array = function () {
        var t = this.tUnlockData[Constants_1.ItemTypeEnum.HERO_TYPE];
        var e = [];
        if (t) {
            for (var a in t) {
                e.push(parseInt(a));
            }
        }
        return e;
    };
    MapCellCfgData.prototype.changeDefenseHeroUIDCell = function (t, e) {
        if (Object.keys(this._defenseList).length < 0 || this._defenseList[t]) {
            this._defenseList[t].cellID = e;
        }
    };
    MapCellCfgData.prototype.delDefenseDataByID = function (t) {
        if (!(Object.keys(this._defenseList).length < 0 || !this._defenseList[t])) {
            var defense = this._defenseList[t].cellID;
            delete this._defenseList[t];
            GameManager_1.gm.ui.emit("updateDefenseHero", defense, false);
            GameManager_1.gm.data.update_player_data_request();
        }
    };
    MapCellCfgData.prototype.addDefenseDataByID = function (t) {
        var buildData = this.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (!(!buildData || buildData.buildLvl < 1)) {
            this._defenseList[t.heroUID] = t;
            GameManager_1.gm.ui.emit("updateDefenseHero", t.cellID, true);
            GameManager_1.gm.data.update_player_data_request();
        }
    };
    MapCellCfgData.prototype.initDefanseData = function () {
        var buildData = this.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (buildData && !(buildData.buildLvl < 1)) {
            TempData_1.TempData.getInitAllHeroList(true);
            this.defense_List = {};
            var heroList = TempData_1.TempData.getHeroList();
            var buildCfg = GameManager_1.gm.data.config_data.getBuildCfgByID(buildData.buildID);
            if (buildCfg) {
                var o = 0;
                var count = 0;
                for (var r = 0; r < buildCfg.capacity; r++) {
                    if (o == buildCfg.capacity)
                        return;
                    if (heroList.length > r) {
                        for (var s = 0; s < heroList[r].cellID.length; s++) {
                            if (o == buildCfg.capacity)
                                return;
                            if (GameManager_1.gm.data.config_data.getHeroCfgByID(heroList[r].heroID).hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                                if (1 == this.getDefenseSuperNum())
                                    continue;
                                0 == count && count++;
                            }
                            var defenseHeroItem = new DefenseHeroItemVO;
                            defenseHeroItem.cellID = heroList[r].cellID[s];
                            defenseHeroItem.heroid = heroList[r].heroID;
                            defenseHeroItem.heroUID = heroList[r].heroUID[s];
                            this._defenseList[heroList[r].heroUID[s]] = defenseHeroItem;
                            o++;
                        }
                    }
                }
                for (var i in this._defenseList) {
                    GameManager_1.gm.ui.emit("updateDefenseHero", this._defenseList[i].cellID, true);
                }
            }
        }
    };
    MapCellCfgData.prototype.getDefanseHeroData = function () {
        return this._defenseList;
    };
    MapCellCfgData.prototype.getDefenseSuperNum = function () {
        var count = 0;
        for (var ket in this._defenseList) {
            if (GameManager_1.gm.data.config_data.getHeroCfgByID(this._defenseList[ket].heroid).hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                count++;
            }
        }
        return count;
    };
    MapCellCfgData.prototype.getHeroIsDefanseByCellID = function (t) {
        return !(this.role_map_data[t] && 0 == this.role_map_data[t].heroUID || !(0 < Object.keys(this._defenseList).length && this.role_map_data[t] && this._defenseList[this.role_map_data[t].heroUID]));
    };
    MapCellCfgData.prototype.getHeroDefanseDataByHeroUID = function (t) {
        return Object.keys(this._defenseList).length <= 0 ? null : this._defenseList[t];
    };
    MapCellCfgData.prototype.autoOpenCase = function () {
        for (var t in this.role_map_data) {
            if (this.role_map_data[t].itemID == Constants_1.RewardIdEnum.BARREL ||
                this.role_map_data[t].itemID == Constants_1.RewardIdEnum.SILVER_BARREL ||
                this.role_map_data[t].itemID == Constants_1.RewardIdEnum.GOLD_BARREL) {
                GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(this.role_map_data[t].cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default).onOpenBarrel();
                return true;
            }
        }
        return false;
    };
    MapCellCfgData.prototype.autoCompose = function () {
        for (var key in this.itemData) {
            var propTypeID = parseInt(key);
            if (propTypeID == Constants_1.PropTypeEnum.STONE_HERO_TYPE) {
                for (var index = 0; index < this.itemData[key].length; index++) {
                    var cellID = this.itemData[key][index].cellID;
                    if (this.role_map_data[cellID].itemID == this.itemData[key][index].itemID) {
                        if (!GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()) ||
                            !GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default) ||
                            0 == GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.childrenCount ||
                            !GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default))
                            continue;
                        GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default).onClickOpenHero();
                        return true;
                    }
                }
            }
            else {
                if (propTypeID == Constants_1.PropTypeEnum.STATUE_TYPE || propTypeID == Constants_1.PropTypeEnum.SHELL_TYPE || propTypeID == Constants_1.PropTypeEnum.FOUNTAIN_TYPE) {
                    for (var index = 0; index < this.itemData[key].length; index++) {
                        var cellID = this.itemData[key][index].cellID;
                        var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this.itemData[key][index].itemID);
                        if (itemCfg && itemCfg.next <= 0 && this.role_map_data[cellID].itemID == this.itemData[key][index].itemID) {
                            if (itemCfg.id == GameManager_1.gm.const.HEROGIFTID) {
                                if (!GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()) ||
                                    !GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default) ||
                                    0 == GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.childrenCount ||
                                    !GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default))
                                    continue;
                                GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default).onOpenSuperHeroCase();
                                return true;
                            }
                            if (itemCfg.id == GameManager_1.gm.const.GIFTID || itemCfg.id == GameManager_1.gm.const.PAGODAGIFTID) {
                                if (!GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()) ||
                                    !GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default) ||
                                    0 == GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.childrenCount ||
                                    !GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default))
                                    continue;
                                GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(cellID.toString()).getComponent(MainMapItem_1.default).itemNode.children[0].getComponent(PropItem_1.default).onOpenGiftCase();
                                return true;
                            }
                        }
                    }
                }
                for (var index = 0; index < this.itemData[key].length; index++) {
                    var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(this.itemData[key][index].itemID);
                    if (itemCfg && 0 < itemCfg.next) {
                        for (var intemIndex = 0; intemIndex < this.itemData[key].length; intemIndex++) {
                            if (this.itemData[key][intemIndex].itemID == itemCfg.id && this.itemData[key][intemIndex].cellID != this.itemData[key][index].cellID) {
                                var aa = this.itemData[key][index].cellID;
                                var ii = this.itemData[key][intemIndex].cellID;
                                if (this.role_map_data[aa].itemID == itemCfg.id && this.role_map_data[ii].itemID == this.itemData[key][intemIndex].itemID) {
                                    GameManager_1.gm.ui.emit("close_new_anim", ii);
                                    this.changeCellData(aa, ii);
                                    GameManager_1.gm.ui.emit("item_children_refresh", ii);
                                    GameManager_1.gm.ui.emit("item_children_refresh", aa);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var key in this.heroData) {
            var propTypeID = parseInt(key);
            for (var heroIndex = 0; heroIndex < this.heroData[propTypeID].length; heroIndex++) {
                var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(this.heroData[propTypeID][heroIndex].itemID);
                if (heroCfg) {
                    for (var lvIndex = 0; lvIndex < heroCfg.nextLv.length; lvIndex++) {
                        if (0 < heroCfg.nextLv[lvIndex]) {
                            if (heroCfg.nextNeedItem[lvIndex] <= 30000 && 0 < this.barracks_unlock_id_list[heroCfg.nextNeedSort[lvIndex]]) {
                                if (0 == this.itemData[Constants_1.PropTypeEnum.WEAPON_TYPE].length)
                                    continue;
                                for (var intemIndex = 0; intemIndex < this.itemData[Constants_1.PropTypeEnum.WEAPON_TYPE].length; intemIndex++) {
                                    if (this.itemData[Constants_1.PropTypeEnum.WEAPON_TYPE][intemIndex].itemID == heroCfg.nextNeedItem[lvIndex]) {
                                        var aa = this.heroData[propTypeID][heroIndex].cellID;
                                        var ii = this.itemData[Constants_1.PropTypeEnum.WEAPON_TYPE][intemIndex].cellID;
                                        if (this.role_map_data[aa].itemID == heroCfg.heroid && this.role_map_data[ii].itemID == this.itemData[Constants_1.PropTypeEnum.WEAPON_TYPE][intemIndex].itemID) {
                                            GameManager_1.gm.ui.emit("close_new_anim", ii);
                                            this.changeCellData(aa, ii);
                                            GameManager_1.gm.ui.emit("item_children_refresh", ii);
                                            GameManager_1.gm.ui.emit("item_children_refresh", aa);
                                            return true;
                                        }
                                    }
                                }
                            }
                            else if (heroCfg.nextNeedItem[lvIndex] == heroCfg.heroid && 0 < heroCfg.occupation) {
                                if (0 == this.heroData[heroCfg.occupation].length)
                                    continue;
                                var surperHero = this.getSuperHeroData(heroCfg.heroid, this.heroData[propTypeID][heroIndex].cellID);
                                if (heroCfg.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE && surperHero && 1 == surperHero.heroState)
                                    continue;
                                for (var s = 0; s < this.heroData[propTypeID].length; s++) {
                                    if (this.heroData[propTypeID][s].itemID == heroCfg.heroid && this.heroData[propTypeID][s].cellID != this.heroData[propTypeID][heroIndex].cellID) {
                                        var aa = this.heroData[propTypeID][heroIndex].cellID;
                                        var ii = this.heroData[propTypeID][s].cellID;
                                        if (this.role_map_data[aa].itemID == heroCfg.heroid && this.role_map_data[ii].itemID == this.heroData[propTypeID][s].itemID) {
                                            var heroCfgID = GameManager_1.gm.data.config_data.getHeroCfgByID(this.role_map_data[ii].itemID);
                                            var superHeroData = this.getSuperHeroData(heroCfg.heroid, this.heroData[propTypeID][s].cellID);
                                            if (heroCfgID.hero_type == Constants_1.HeroTypeEnum.SUPER_HERO_TYPE && superHeroData && 1 == superHeroData.heroState)
                                                continue;
                                            GameManager_1.gm.ui.emit("close_new_anim", ii);
                                            this.changeCellData(aa, ii);
                                            GameManager_1.gm.ui.emit("item_children_refresh", ii);
                                            GameManager_1.gm.ui.emit("item_children_refresh", aa);
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    MapCellCfgData.EVENT_DATA_CHANGE = "mapcell_data_change";
    return MapCellCfgData;
}(StorageBase_1.StorageBase));
exports.MapCellCfgData = MapCellCfgData;
var roleCoinDataVO = /** @class */ (function () {
    function roleCoinDataVO() {
        this.coinNum = 1000;
        this.diamondNum = 100;
    }
    return roleCoinDataVO;
}());
exports.roleCoinDataVO = roleCoinDataVO;
var roleMapItemVO = /** @class */ (function () {
    function roleMapItemVO() {
    }
    return roleMapItemVO;
}());
exports.roleMapItemVO = roleMapItemVO;
var MapItemDataVO = /** @class */ (function () {
    function MapItemDataVO() {
    }
    return MapItemDataVO;
}());
exports.MapItemDataVO = MapItemDataVO;
var RoleBuildDataVO = /** @class */ (function () {
    function RoleBuildDataVO() {
    }
    return RoleBuildDataVO;
}());
exports.RoleBuildDataVO = RoleBuildDataVO;
var roleGoBattleItemVO = /** @class */ (function () {
    function roleGoBattleItemVO() {
    }
    return roleGoBattleItemVO;
}());
exports.roleGoBattleItemVO = roleGoBattleItemVO;
var RoleItemDataVO = /** @class */ (function () {
    function RoleItemDataVO() {
    }
    return RoleItemDataVO;
}());
exports.RoleItemDataVO = RoleItemDataVO;
var RoleProductDataVO = /** @class */ (function () {
    function RoleProductDataVO() {
    }
    return RoleProductDataVO;
}());
exports.RoleProductDataVO = RoleProductDataVO;
var RoleBarrelDataVO = /** @class */ (function () {
    function RoleBarrelDataVO() {
    }
    return RoleBarrelDataVO;
}());
exports.RoleBarrelDataVO = RoleBarrelDataVO;
var roleBarrelItemVO = /** @class */ (function () {
    function roleBarrelItemVO() {
    }
    return roleBarrelItemVO;
}());
exports.roleBarrelItemVO = roleBarrelItemVO;
var heroUnloockData = /** @class */ (function () {
    function heroUnloockData() {
    }
    return heroUnloockData;
}());
exports.heroUnloockData = heroUnloockData;
var GuideVO = /** @class */ (function () {
    function GuideVO() {
    }
    return GuideVO;
}());
exports.GuideVO = GuideVO;
var GuideGiftVO = /** @class */ (function () {
    function GuideGiftVO() {
    }
    return GuideGiftVO;
}());
exports.GuideGiftVO = GuideGiftVO;
var SuperHeroVO = /** @class */ (function () {
    function SuperHeroVO() {
    }
    return SuperHeroVO;
}());
exports.SuperHeroVO = SuperHeroVO;
var DefenseHeroItemVO = /** @class */ (function () {
    function DefenseHeroItemVO() {
    }
    return DefenseHeroItemVO;
}());
exports.DefenseHeroItemVO = DefenseHeroItemVO;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1hcENlbGxDZmdEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YseUNBQW9IO0FBQ3BILDZDQUFtQztBQUNuQyw2Q0FBNEM7QUFDNUMsaUNBQWdDO0FBQ2hDLHVDQUFzQztBQUN0Qyx1Q0FBK0M7QUFDL0MsNkNBQXdDO0FBQ3hDLHVDQUFrQyxDQUFDLEtBQUs7QUFDeEMsdUNBQXdDO0FBT3hDLElBQUssWUFRSjtBQVJELFdBQUssWUFBWTtJQUNiLG1FQUFrQixDQUFBO0lBQ2xCLG1FQUFrQixDQUFBO0lBQ2xCLCtFQUF3QixDQUFBO0lBQ3hCLCtFQUF3QixDQUFBO0lBQ3hCLDZFQUF1QixDQUFBO0lBQ3ZCLHVFQUFvQixDQUFBO0lBQ3BCLDJEQUFjLENBQUE7QUFDbEIsQ0FBQyxFQVJJLFlBQVksS0FBWixZQUFZLFFBUWhCO0FBa0JBLENBQUM7QUFzQkY7SUFBb0Msa0NBQVc7SUFxRDNDO1FBQUEsWUFDSSxpQkFBTyxTQWlEVjtRQTBpRE0scUJBQWUsR0FBRyxVQUFVLENBQVM7WUFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUkseUJBQWEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ25FLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUNsRCxJQUFJLElBQUksU0FBUSxDQUFBO2dCQUNoQixJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO29CQUMzQixJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDN0I7cUJBQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFF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QkFDaEUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNoRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNsRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNoRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDckcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNwSDt3QkFFRCxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNsSSxJQUFJ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SUFBQTtBQUxZLHNDQUFhO0FBTzFCO0lBQUE7SUFPQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLHNDQUFhO0FBUzFCO0lBQUE7SUFVQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQTtBQVZZLDBDQUFlO0FBWTVCO0lBQUE7SUFNQSxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLGdEQUFrQjtBQVEvQjtJQUFBO0lBR0EsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FIQSxBQUdDLElBQUE7QUFIWSx3Q0FBYztBQUszQjtJQUFBO0lBUUEsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSw4Q0FBaUI7QUFVOUI7SUFBQTtJQU9BLENBQUM7SUFBRCx1QkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksNENBQWdCO0FBUzdCO0lBQUE7SUFJQSxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLDRDQUFnQjtBQU03QjtJQUFBO0lBS0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSwwQ0FBZTtBQU81QjtJQUFBO0lBTUEsQ0FBQztJQUFELGNBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLDBCQUFPO0FBUXBCO0lBQUE7SUFHQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQTtBQUhZLGtDQUFXO0FBS3hCO0lBQUE7SUFRQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLGtDQUFXO0FBVXhCO0lBQUE7SUFJQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLDhDQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbmltcG9ydCB7IEl0ZW1UeXBlRW51bSwgU2V0SXRlbU51bUVudW0sIFByb3BUeXBlRW51bSwgUmV3YXJkSWRFbnVtLCBIZXJvVHlwZUVudW0sIEJ1aWxkVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFN0b3JhZ2VCYXNlIH0gZnJvbSAnLi9TdG9yYWdlQmFzZSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IFRhc2tDb25kaXRpb25UeXBlIH0gZnJvbSAnLi9UYXNrRGF0YSc7XHJcbmltcG9ydCBNYWluTWFwSXRlbSBmcm9tICcuL01haW5NYXBJdGVtJztcclxuaW1wb3J0IFByb3BJdGVtIGZyb20gJy4vUHJvcEl0ZW0nOyAvLyBqc1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi9OZXRVdGlscyc7XHJcbmltcG9ydCB7IFBvb2xDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9wb29sJztcclxuaW1wb3J0IHsgSGVyb0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2hlcm8nO1xyXG5pbXBvcnQgeyBJdGVtQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbSc7XHJcbmltcG9ydCB7IEJvb2tDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9ib29rcyc7XHJcbmltcG9ydCB7IE1hcENlbGwgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9tYXBjZWxsJztcclxuXHJcbmVudW0gbGlzdFR5cGVFbnVtIHtcclxuICAgIFNIT1dfQVJFQV9UWVBFID0gMSxcclxuICAgIE1BUF9UT1RBTF9UWVBFID0gMixcclxuICAgIE5FV19VTkxPQ0tfQ0VMTF9UWVBFID0gMyxcclxuICAgIE5FV19VTkxPQ0tfQVJFQV9UWVBFID0gNCxcclxuICAgIEFSRUFfTE9DS19DRUxMX1RZUEUgPSA1LFxyXG4gICAgUkVQT1JUX0NFTExfVFlQRSA9IDYsXHJcbiAgICBTUEFDRV9UWVBFID0gN1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJ1aWxkRGF0YSB7XHJcbiAgICBidWlsZFN0YXRlOiBudW1iZXI7XHJcbiAgICBidWlsZElEOiBudW1iZXI7XHJcbiAgICBidWlsZFR5cGU6IG51bWJlcjtcclxuICAgIGJ1aWxkTHZsOiBudW1iZXI7XHJcbiAgICBjZWxsSUQ6IG51bWJlcjtcclxuICAgIGlzQ2FuTW92ZTogbnVtYmVyO1xyXG4gICAgcHJvZHVjdERhdGE6IFJvbGVQcm9kdWN0RGF0YVZPO1xyXG4gICAgbWV0cmFpbERhdGE6IFJlY29yZDxudW1iZXIsIG1ldHJhaWw+O1xyXG4gICAgdXBOZWVkQ29pbjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgbWV0cmFpbCB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgY3VyOiBudW1iZXI7XHJcbiAgICBtYXg6IG51bWJlcjtcclxufTtcclxuXHJcbmludGVyZmFjZSBCYXJyYWNrc1VubG9ja0RhdGEge1xyXG4gICAgdW5sb2NrSWQ6IG51bWJlcjtcclxuICAgIHN0YXRlOiBudW1iZXI7XHJcbiAgICBhbmlfc3RhdGU6IG51bWJlcjtcclxuICAgIGhlcm9JZDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSGVyb1NraWxsIHtcclxuICAgIGx2bDogbnVtYmVyO1xyXG4gICAgbnVtOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugc3BlY2lhbCB7XHJcbiAgICBtZXJ0cmFpbD86IFJlY29yZDxudW1iZXIsIG51bWJlcj4gfCBtZXRyYWlsO1xyXG4gICAgc3RhdGU6IG51bWJlclxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTWFwQ2VsbENmZ0RhdGEgZXh0ZW5kcyBTdG9yYWdlQmFzZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBFVkVOVF9EQVRBX0NIQU5HRTogc3RyaW5nID0gXCJtYXBjZWxsX2RhdGFfY2hhbmdlXCI7XHJcbiAgICBwcml2YXRlIHJvbGVfY3VyX3VubG9ja19hcmVhX0lEOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJvbGVfY3VyX3VubG9ja19hcmVhX3NvcnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcm9sZVNob3dBcmVhSURMaXN0OiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgcm9sZVVubG9ja0FyZWFJRExpc3Q6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBfd2FyZWhvdXNlSXNOZXdMaXN0OiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgcm9sZVNwYWNlTGlzdDogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHRVbmxvY2tEYXRhOiBSZWNvcmQ8bnVtYmVyLCBudW1iZXJbXT47XHJcbiAgICBwcml2YXRlIHJvbGVfaXRlbV9hcnJheTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBuZXh0RGF5VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoZXJvU2tpbGxMaXN0OiBSZWNvcmQ8bnVtYmVyLCBIZXJvU2tpbGw+O1xyXG4gICAgcHJpdmF0ZSBiYXJyYWNrc191bmxvY2tfaWRfbGlzdDogUmVjb3JkPG51bWJlciwgbnVtYmVyPjtcclxuICAgIHByaXZhdGUgZGVmZW5zZV9MaXN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgcHJpdmF0ZSBfZGVmZW5zZUxpc3Q6IFJlY29yZDxudW1iZXIsIERlZmVuc2VIZXJvSXRlbVZPPjtcclxuICAgIHByaXZhdGUgaGVyb1RvdGFsTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN1cGVySGVyb0RhdGE6IFN1cGVySGVyb1ZPW107XHJcbiAgICBwcml2YXRlIGluaXRPcGVuQmFycmVsRGF0YTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBTVE9SQUdFX0tFWTogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzX2ZpcnN0X2F1dG9fY29tcG9zZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJvbGVfY29tcG9zZV90b3RhbF90aW1lczogbnVtYmVyO1xyXG4gICAgcHVibGljIHJvbGVfY29tcG9zZV90aW1lczogbnVtYmVyO1xyXG4gICAgcHVibGljIHJvbGVfbWFwX2RhdGE6IFJlY29yZDxzdHJpbmcsIE1hcEl0ZW1EYXRhVk8+O1xyXG4gICAgcHVibGljIHJvbGVfbWFwX3RvdGFsX2RhdGE6IG51bWJlcltdO1xyXG4gICAgcHVibGljIHJvbGVfbWFwX3JlcG9ydF9kYXRhOiBudW1iZXJbXTtcclxuICAgIHB1YmxpYyBhcmVhVW5sb2NrQ2VsbElETGlzdDogbnVtYmVyW107XHJcbiAgICBwdWJsaWMgX2N1ck5ld1VubG9ja0NlbGxMaXN0OiBudW1iZXJbXTtcclxuICAgIHB1YmxpYyByb2xlX29wZW5CYXJyZWxfVGltZXM6IG51bWJlcjtcclxuICAgIHB1YmxpYyByb2xlQmFycmVsRGF0YTogUm9sZUJhcnJlbERhdGFWTyB8IG51bGw7XHJcbiAgICBwdWJsaWMgcm9sZUNvaW5EYXRhOiByb2xlQ29pbkRhdGFWTztcclxuICAgIHB1YmxpYyBoZXJvRGF0YTogUmVjb3JkPG51bWJlciwgcm9sZU1hcEl0ZW1WT1tdPjtcclxuICAgIHB1YmxpYyBidWlsZERhdGE6IFJlY29yZDxudW1iZXIsIEJ1aWxkRGF0YT47XHJcbiAgICBwdWJsaWMgaXRlbURhdGE6IFJlY29yZDxzdHJpbmcsIHJvbGVNYXBJdGVtVk9bXT47XHJcbiAgICBwdWJsaWMgcm9sZV9idWlsZF9sb2NrX251bTogbnVtYmVyO1xyXG4gICAgcHVibGljIGJhcnJhY2tzX3VubG9ja19kYXRhOiBoZXJvVW5sb29ja0RhdGFbXTtcclxuICAgIHB1YmxpYyB3YXRlckJhcnJlbExpc3Q6IHJvbGVCYXJyZWxJdGVtVk9bXTtcclxuICAgIHB1YmxpYyBfd2FyZWhvdXNlTGlzdDogbnVtYmVyW107XHJcbiAgICBwdWJsaWMgX25lZWRSZWZyZXNoQ2VsbExpc3Q6IG51bWJlcltdO1xyXG4gICAgcHVibGljIHJvbGVHdWlkZVZPOiBHdWlkZVZPIHwgbnVsbDtcclxuICAgIHB1YmxpYyBpc0d1aWRlOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzRmlyc3RHZXRDb2luOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzRmlyc3RCYXR0bGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgc3BlY2lhbExpc3Q6IFJlY29yZDxudW1iZXIsIHNwZWNpYWw+O1xyXG4gICAgcHVibGljIGRpYW1vbmRfYnV5X2JhcnJlbF90aW1lczogbnVtYmVyO1xyXG4gICAgcHVibGljIHdhdGNoX2FkX2J1eV9iYXJyZWxfdGltZXM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBidXlCYXJyZWxOdW1UaW1lczogbnVtYmVyO1xyXG4gICAgcHVibGljIGd1aWRlR2lmdDogR3VpZGVHaWZ0Vk8gfCBudWxsO1xyXG4gICAgcHVibGljIGxvY2tBcmVhOiBSZWNvcmQ8bnVtYmVyLCBudW1iZXI+O1xyXG4gICAgcHVibGljIGxhc3RfdGltZXN0YW1wOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXNfdXBncmFkZV9za2lsbDogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuU1RPUkFHRV9LRVkgPSBcIk1hcENlbGxDb25maWdEYXRhXCI7XHJcbiAgICAgICAgdGhpcy5pc19maXJzdF9hdXRvX2NvbXBvc2UgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGVfY29tcG9zZV90aW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5yb2xlX21hcF90b3RhbF9kYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xlX21hcF9yZXBvcnRfZGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfSUQgPSAxO1xyXG4gICAgICAgIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfc29ydCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xlU2hvd0FyZWFJRExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGVVbmxvY2tBcmVhSURMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5hcmVhVW5sb2NrQ2VsbElETGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2N1ck5ld1VubG9ja0NlbGxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5yb2xlX2l0ZW1fYXJyYXkgPSAwO1xyXG4gICAgICAgIHRoaXMucm9sZV9vcGVuQmFycmVsX1RpbWVzID0gMDtcclxuICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJvbGVDb2luRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZXJvRGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuYnVpbGREYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5pdGVtRGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMucm9sZV9idWlsZF9sb2NrX251bSA9IDA7XHJcbiAgICAgICAgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMud2F0ZXJCYXJyZWxMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fd2FyZWhvdXNlTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3dhcmVob3VzZUlzTmV3TGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX25lZWRSZWZyZXNoQ2VsbExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnJvbGVTcGFjZUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnRVbmxvY2tEYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5yb2xlR3VpZGVWTyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc0d1aWRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzRmlyc3RHZXRDb2luID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5leHREYXlUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmlzRmlyc3RCYXR0bGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3BlY2lhbExpc3QgPSB7fTtcclxuICAgICAgICB0aGlzLmhlcm9Ta2lsbExpc3QgPSB7fTtcclxuICAgICAgICB0aGlzLmRpYW1vbmRfYnV5X2JhcnJlbF90aW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy53YXRjaF9hZF9idXlfYmFycmVsX3RpbWVzID0gMDtcclxuICAgICAgICB0aGlzLmJ1eUJhcnJlbE51bVRpbWVzID0gMDtcclxuICAgICAgICB0aGlzLmd1aWRlR2lmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2NrQXJlYSA9IHt9O1xyXG4gICAgICAgIHRoaXMubGFzdF90aW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuYmFycmFja3NfdW5sb2NrX2lkX2xpc3QgPSB7fTtcclxuICAgICAgICB0aGlzLmRlZmVuc2VfTGlzdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2RlZmVuc2VMaXN0ID0ge307XHJcbiAgICAgICAgdGhpcy5oZXJvVG90YWxOdW0gPSAxO1xyXG4gICAgICAgIHRoaXMuaXNfdXBncmFkZV9za2lsbCA9IDA7XHJcbiAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0T3BlbkJhcnJlbERhdGEgPSAzNztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXV0b0NvbXBvc2VVc2VkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNfZmlyc3RfYXV0b19jb21wb3NlID0gMTtcclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmNfcmVhZF9kYXRhKGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3JlYWRfZGF0YS5jYWxsKHRoaXMsICh0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX2luaXQpIHtcclxuICAgICAgICAgICAgICAgIFRlbXBEYXRhLmlzU2hvd09mZmxpbmUgPSA2MDAgPCBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpIC0gZ20uZGF0YS5tYXBDZWxsX2RhdGEubGFzdF90aW1lc3RhbXA7XHJcbiAgICAgICAgICAgICAgICBpZiAoVGVtcERhdGEuaXNTaG93T2ZmbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLm9mZmxpbmVfdGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMykgLSBnbS5kYXRhLm1hcENlbGxfZGF0YS5sYXN0X3RpbWVzdGFtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tMb2NhbERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2FyZWhvdXNlTGlzdC5sZW5ndGggIT0gdGhpcy5fd2FyZWhvdXNlSXNOZXdMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcmVob3VzZUlzTmV3TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl93YXJlaG91c2VMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXJlaG91c2VJc05ld0xpc3QucHVzaCgxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKDIgPD0gdGhpcy5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFXS5idWlsZEx2bCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEVdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgMzk1ICE9IHRoaXMuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEVdLmNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEVdLmNlbGxJRCA9IDM5NTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoMCA9PSBPYmplY3Qua2V5cyh0aGlzLmxvY2tBcmVhKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRMb2NrQXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmFycmFja3NfdW5sb2NrX2lkX2xpc3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJhcnJhY2tzX3VubG9ja19kYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YVtpbmRleF0uc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuYmFycmFja3NfdW5sb2NrX2lkX2xpc3RbdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YVtpbmRleF0udW5sb2NrSWRdID0gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnJvbGVVbmxvY2tBcmVhSURMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVVbmxvY2tBcmVhSURMaXN0W2luZGV4XSA+PSB0aGlzLnJvbGVfY3VyX3VubG9ja19hcmVhX0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZWFJRHMgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEFyZWFJRExpc3QodGhpcy5yb2xlVW5sb2NrQXJlYUlETGlzdFtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJlYUlEcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZVVubG9ja0FyZWFJRExpc3RbaW5kZXhdID4gdGhpcy5yb2xlX2N1cl91bmxvY2tfYXJlYV9JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGFyZWFJRHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEwMDAwICE9IGFyZWFJRHNba2V5XS5jb21UaW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJbmRleFRvTGlzdChsaXN0VHlwZUVudW0uQVJFQV9MT0NLX0NFTExfVFlQRSwgYXJlYUlEc1trZXldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmVhSURzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChrZXkpID49IHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfc29ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJbmRleFRvTGlzdChsaXN0VHlwZUVudW0uQVJFQV9MT0NLX0NFTExfVFlQRSwgYXJlYUlEc1trZXldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVGVtcERhdGEuaW5pdEd1aWRlVGVtcERhdGEoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGguZmxvb3IodGltZS5nZXRUaW1lKCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkanVzdGVkVGltZXN0YW1wID0gdGltZXN0YW1wIC0gKHRpbWVzdGFtcCAtIDYwICogdGltZS5nZXRUaW1lem9uZU9mZnNldCgpKSAlIDg2NDAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhZGp1c3RlZFRpbWVzdGFtcCA+PSB0aGlzLm5leHREYXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0RGF5VGltZSA9IDg2NDAwICsgYWRqdXN0ZWRUaW1lc3RhbXA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZpcnN0QmF0dGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRUYXNrKHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmd1aWRlR2lmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVHaWZ0ID0gbmV3IEd1aWRlR2lmdFZPO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVHaWZ0Lmd1aWRlQmVnaW5UaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1aWRlR2lmdC5ndWlkZUlzR2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YSA9IG5ldyBSb2xlQmFycmVsRGF0YVZPO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5mcmVlQmFycmVsQ2QgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZV9idWlsZF9sb2NrX251bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVDb2luRGF0YSA9IG5ldyByb2xlQ29pbkRhdGFWTztcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUNvaW5EYXRhLmNvaW5OdW0gPSA4MDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUNvaW5EYXRhLmRpYW1vbmROdW0gPSAxMDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZVNob3dBcmVhSURMaXN0ID0gW3RoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfSURdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTmV3QXJlYUJ5SUQodGhpcy5yb2xlX2N1cl91bmxvY2tfYXJlYV9JRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVubG9ja05ld0FyZWFJRCh0aGlzLnJvbGVfY3VyX3VubG9ja19hcmVhX0lEKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJCYXJyZWxMaXN0ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVjMyA9IFtjYy52MygyMjEsIC0xMDAzKSwgY2MudjMoMjgxLCAtMTAyNSksIGNjLnYzKDM3NywgLTFlMyldO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHZlYzMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFycmVsSXRlID0gbmV3IHJvbGVCYXJyZWxJdGVtVk87XHJcbiAgICAgICAgICAgICAgICAgICAgYmFycmVsSXRlLml0ZW1JRCA9IDExMDA2O1xyXG4gICAgICAgICAgICAgICAgICAgIGJhcnJlbEl0ZS5pdGVtSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBiYXJyZWxJdGUuaXRlbVBvcyA9IHZlYzNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJCYXJyZWxMaXN0LnB1c2goYmFycmVsSXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmd1aWRlR2lmdCA9IG5ldyBHdWlkZUdpZnRWTztcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVHaWZ0Lmd1aWRlQmVnaW5UaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3VpZGVHaWZ0Lmd1aWRlSXNHZXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uY29uZmlnLmdldF9jb25maWdfZGF0YShcIkhlcm9Db25maWdEYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaGVyb0NmZy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGhlcm9DZmcuZGF0YVtrZXldIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCBkYXRhLnVubG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvVW5sb29jayA9IG5ldyBoZXJvVW5sb29ja0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9Vbmxvb2NrLmhlcm9JZCA9IGRhdGEuaGVyb2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvVW5sb29jay51bmxvY2tJZCA9IGRhdGEudW5sb2NrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvVW5sb29jay5zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9Vbmxvb2NrLmFuaV9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGEucHVzaChoZXJvVW5sb29jayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydFRhc2sodGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gMWUzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHREYXlUaW1lID0gdGltZXN0YW1wIC0gKHRpbWVzdGFtcCAtIDYwICogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKSAlIDg2NDAwICsgODY0MDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRmlyc3RCYXR0bGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFNwZWNpYWxEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9Ta2lsbExpc3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEd1aWRlRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0TG9ja0FyZWEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbFVubGNva0hlcm8oMjMwMDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tMb2NhbERhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3QXJyOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJ1aWxkS2V5IGluIHRoaXMuYnVpbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsSUQgPSB0aGlzLmJ1aWxkRGF0YVtidWlsZEtleV0uY2VsbElEXHJcbiAgICAgICAgICAgICAgICBpZiAoMzk1ICE9IGNlbGxJRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDMxMyAhPSBjZWxsSUQgJiZcclxuICAgICAgICAgICAgICAgICAgICBudWxsICE9IHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdICYmIHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1JRCAhPSB0aGlzLmJ1aWxkRGF0YVtidWlsZEtleV0uYnVpbGRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0Fyci5wdXNoKGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW2NlbGxJRF0uaXRlbUlEID0gdGhpcy5idWlsZERhdGFbYnVpbGRLZXldLmJ1aWxkSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW2NlbGxJRF0uaXRlbVR5cGUgPSBJdGVtVHlwZUVudW0uQlVJTERfVFlQRTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5oZXJvVUlEID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVs5OTldKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yb2xlX21hcF9kYXRhWzk5OV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaGVyb0tleSBpbiB0aGlzLmhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBoZXJvSW5kZXggPSB0aGlzLmhlcm9EYXRhW2hlcm9LZXldLmxlbmd0aCAtIDE7IDAgPD0gaGVyb0luZGV4OyBoZXJvSW5kZXgtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxJRCA9IHRoaXMuaGVyb0RhdGFbaGVyb0tleV1baGVyb0luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gdGhpcy5oZXJvRGF0YVtoZXJvS2V5XVtoZXJvSW5kZXhdLml0ZW1JRDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoOTk5ICE9IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXSAmJiB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5pdGVtSUQgIT0gaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG5ld0Fyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3QXJyW2luZGV4XSA9PSBjZWxsSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvRGF0YVtoZXJvS2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Fyci5wdXNoKGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW2NlbGxJRF0uaXRlbUlEID0gaXRlbUlEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1UeXBlID0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5oZXJvVUlEID0gdGhpcy5oZXJvVG90YWxOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvVG90YWxOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9EYXRhW2hlcm9LZXldLnNwbGljZShoZXJvSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtS2V5IGluIHRoaXMuaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW1JbmRleCA9IHRoaXMuaXRlbURhdGFbaXRlbUtleV0ubGVuZ3RoIC0gMTsgMCA8PSBpdGVtSW5kZXg7IGl0ZW1JbmRleC0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbElEID0gdGhpcy5pdGVtRGF0YVtpdGVtS2V5XVtpdGVtSW5kZXhdLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSUQgPSB0aGlzLml0ZW1EYXRhW2l0ZW1LZXldW2l0ZW1JbmRleF0uaXRlbUlEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoOTk5ICE9IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXSAmJiB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5pdGVtSUQgIT0gaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG5ld0Fyci5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0FycltpbmRleF0gPT0gY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbaXRlbUtleV0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdBcnIucHVzaChjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1JRCA9IGl0ZW1JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5pdGVtVHlwZSA9IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW2NlbGxJRF0uaGVyb1VJRCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtRGF0YVtpdGVtS2V5XS5zcGxpY2UoaXRlbUluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRlZmVuc2UgaW4gdGhpcy5fZGVmZW5zZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxJRCA9IHRoaXMuX2RlZmVuc2VMaXN0W2RlZmVuc2VdLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgIGlmIChudWxsICE9IHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdICYmIHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1JRCAhPSB0aGlzLl9kZWZlbnNlTGlzdFtkZWZlbnNlXS5oZXJvaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdBcnIucHVzaChjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kZWZlbnNlTGlzdFtkZWZlbnNlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaGVyb0RhdGEgPSB0aGlzLnN1cGVySGVyb0RhdGEubGVuZ3RoIC0gMTsgMCA8PSBoZXJvRGF0YTsgaGVyb0RhdGEtLSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbElEID0gdGhpcy5zdXBlckhlcm9EYXRhW2hlcm9EYXRhXS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXSAmJiB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5pdGVtSUQgIT0gdGhpcy5zdXBlckhlcm9EYXRhW2hlcm9EYXRhXS5oZXJvaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdBcnIucHVzaChjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YS5zcGxpY2UoaGVyb0RhdGEsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumcgOimgeagoeato+eahOagvOWtkFwiICsgbmV3QXJyKTtcclxuICAgICAgICAgICAgaWYgKDAgPCBuZXdBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdBcnIuc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlQ2VsbElEcyA9IFtuZXdBcnJbMF1dO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IG5ld0Fyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3QXJyW2luZGV4XSAhPT0gbmV3QXJyW2luZGV4IC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlQ2VsbElEcy5wdXNoKG5ld0FycltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmV3QXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgbmV3QXJyW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvcnRUYXNrKHRhc2tzOiBCYXJyYWNrc1VubG9ja0RhdGFbXSk6IHZvaWQge1xyXG4gICAgICAgIHRhc2tzLnNvcnQoKHQsIGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93QSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCB0Lmhlcm9JZC50b1N0cmluZygpKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICBjb25zdCByb3dCID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGUuaGVyb0lkLnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgIHJldHVybiB0LnN0YXRlID4gZS5zdGF0ZSB8fCAhKHQuc3RhdGUgPCBlLnN0YXRlIHx8IHJvd0Euc29ydCA+IHJvd0Iuc29ydCkgPyAtMSA6IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZWxVbmxjb2tIZXJvKGhlcm9JZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRCYXJyYWNrc0lEVG9MaXN0KGhlcm9JZCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhcnJhY2tzX3VubG9ja19kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChoZXJvSWQgPT09IHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGFbaV0udW5sb2NrSWQgJiYgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YVtpXS5zdGF0ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YVtpXS5zdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhcnJhY2tzX3VubG9ja19kYXRhW2ldLmFuaV9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmVlbFVubGNva0hlcm9JRChoZXJvSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoaGVyb0lkID09IHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGFbaV0uaGVyb0lkICYmIHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGFbaV0uc3RhdGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21wb3NpdGVVbmxvY2tIZXJvKGhlcm9JZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhcnJhY2tzX3VubG9ja19kYXRhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChoZXJvSWQgPT09IHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGFbaV0uaGVyb0lkICYmIHRoaXMuYmFycmFja3NfdW5sb2NrX2RhdGFbaV0uc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YVtpXS5zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhcnJhY2tzX3VubG9ja19kYXRhW2ldLmFuaV9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRMb2NrQXJlYSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NrQXJlYVtrZXldID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRDZWxsSXNXYWxsKGNlbGxJRDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGhlcm9DZmc7XHJcbiAgICAgICAgcmV0dXJuICghKCF0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXSB8fCB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5pdGVtVHlwZSAhPSBJdGVtVHlwZUVudW0uSEVST19UWVBFKSkgJiZcclxuICAgICAgICAgICAgISghKGhlcm9DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1JRCkpIHx8IDEwICE9IGhlcm9DZmcub2NjdXBhdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TWFwZGF0YUJ5Q2VsbElEKGNlbGxJRDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb2xlX21hcF9kYXRhW2NlbGxJRF0gJiYgdGhpcy5yb2xlX21hcF9kYXRhW2NlbGxJRF0uaGVyb1VJRCAmJiB0aGlzLnJvbGVfbWFwX2RhdGFbY2VsbElEXS5oZXJvVUlEID4gMFxyXG4gICAgICAgICAgICA/IHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLmhlcm9VSURcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bmxvY2tTcGVjaWFsQXJlYShhcmVhSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9ja0FyZWFbYXJlYUlEXSA9IDI7XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldElzVW5sb2NrKGFyZWFJRDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvbGVfbWFwX3RvdGFsX2RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFyZWFJRCA9PSB0aGlzLnJvbGVfbWFwX3RvdGFsX2RhdGFbaV0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U3BlY2lhbERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcGVjaWFsTGlzdCA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHNwZWNpYWxMaXN0Q29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsTGlzdCgpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzcGVjaWFsTGlzdENvbmZpZykge1xyXG4gICAgICAgICAgICBjb25zdCBhcmVhSUQgPSBwYXJzZUludChrZXkpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3BlY2lhbExpc3RbYXJlYUlEXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsTGlzdFthcmVhSURdID0ge30gYXMgc3BlY2lhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxMaXN0W2FyZWFJRF0uc3RhdGUgPSAxO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc3BlY2lhbExpc3RDb25maWdba2V5XS5wcm9wLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKDAgPCBzcGVjaWFsTGlzdENvbmZpZ1trZXldLnByb3BbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNwZWNpYWxMaXN0W2FyZWFJRF0ubWVydHJhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsTGlzdFthcmVhSURdLm1lcnRyYWlsID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbExpc3RbYXJlYUlEXS5tZXJ0cmFpbFtzcGVjaWFsTGlzdENvbmZpZ1trZXldLnByb3BbaW5kZXhdXSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5OZXdBcmVhQnlJRChhcmVhSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkSW5kZXhUb0xpc3QobGlzdFR5cGVFbnVtLlNIT1dfQVJFQV9UWVBFLCBhcmVhSUQpO1xyXG4gICAgICAgIGNvbnN0IGFyZWFDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEFyZWFJRExpc3QoYXJlYUlEKTtcclxuICAgICAgICBpZiAoYXJlYUNvbmZpZykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmVhQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJlYUNvbmZpZ1trZXldLmNvbVRpbWVzID09PSAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVhSUQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5kZXhUb0xpc3QobGlzdFR5cGVFbnVtLk5FV19VTkxPQ0tfQ0VMTF9UWVBFLCBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJbmRleFRvTGlzdChsaXN0VHlwZUVudW0uTUFQX1RPVEFMX1RZUEUsIGFyZWFDb25maWdba2V5XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcmVhSURJc1VuTG9jayhhcmVhSUQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnJvbGVVbmxvY2tBcmVhSURMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJlYUlEID09PSB0aGlzLnJvbGVVbmxvY2tBcmVhSURMaXN0W2luZGV4XSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5sb2NrTmV3QXJlYUlEKGFyZWFJRDogbnVtYmVyLCBpc1NwZWNpYWw6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkSW5kZXhUb0xpc3QobGlzdFR5cGVFbnVtLlNIT1dfQVJFQV9UWVBFLCBhcmVhSUQpO1xyXG4gICAgICAgIGNvbnN0IGFyZWFDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEFyZWFJRExpc3QoYXJlYUlEKTtcclxuICAgICAgICBpZiAoYXJlYUNvbmZpZykge1xyXG4gICAgICAgICAgICBsZXQgaXNDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEluZGV4VG9MaXN0KGxpc3RUeXBlRW51bS5ORVdfVU5MT0NLX0FSRUFfVFlQRSwgYXJlYUlEKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldE5leHRMb2NrQ2VsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0QXJlYUlEID0gdGhpcy5yb2xlX2N1cl91bmxvY2tfYXJlYV9JRCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRBcmVhSURJc1VuTG9jayhuZXh0QXJlYUlEKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfSUQgPSBuZXh0QXJlYUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfc29ydCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGVjayA9ICEodGhpcy5yb2xlX2NvbXBvc2VfdGltZXMgPSAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmVhQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoMTAwMDAgPT0gYXJlYUNvbmZpZ1trZXldLmNvbVRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEgPCBhcmVhSUQgJiYgYXJlYUlEICE9IGdtLmNvbnN0LkNBVkVTQVJFQUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5kZXhUb0xpc3QobGlzdFR5cGVFbnVtLk5FV19VTkxPQ0tfQ0VMTF9UWVBFLCBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXNTcGVjaWFsICYmIChhcmVhSUQgPT0gZ20uY29uc3QuSUNFQVJFQUlEIHx8IGFyZWFJRCA9PSBnbS5jb25zdC5GSVJFUkVBSUQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJbmRleFRvTGlzdChsaXN0VHlwZUVudW0uUkVQT1JUX0NFTExfVFlQRSwgYXJlYUNvbmZpZ1trZXldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxID09IGFyZWFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEluZGV4VG9MaXN0KGxpc3RUeXBlRW51bS5SRVBPUlRfQ0VMTF9UWVBFLCBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwID09IGFyZWFDb25maWdba2V5XS5pc09ic3RydWN0ICYmIGFyZWFJRCAhPSBnbS5jb25zdC5DQVZFU0FSRUFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtRGF0YVZPID0gbmV3IE1hcEl0ZW1EYXRhVk87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uY2VsbFN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWTy5pdGVtU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YVZPLml0ZW1JRCA9IGFyZWFDb25maWdba2V5XS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uY2VsbElEID0gYXJlYUNvbmZpZ1trZXldLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWTy5oZXJvVUlEID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWTy5pdGVtVHlwZSA9IGFyZWFDb25maWdba2V5XS5pdGVtVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW2FyZWFDb25maWdba2V5XS5jZWxsSURdID0gbWFwSXRlbURhdGFWTztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDwgYXJlYUNvbmZpZ1trZXldLml0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZWFDb25maWdba2V5XS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uQlVJTERfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVpbGQoYXJlYUNvbmZpZ1trZXldLml0ZW1JRCwgYXJlYUNvbmZpZ1trZXldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9sZUl0ZW0oYXJlYUNvbmZpZ1trZXldLml0ZW1JRCwgYXJlYUNvbmZpZ1trZXldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDMwMDAwIDwgYXJlYUNvbmZpZ1trZXldLml0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbYXJlYUNvbmZpZ1trZXldLmNlbGxJRF0uaGVyb1VJRCA9IHRoaXMuaGVyb1RvdGFsTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9Ub3RhbE51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJvbGVTcGFjZUNlbGxCeUlEKGFyZWFDb25maWdba2V5XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQnVpbGRJc0FjdGl2ZShhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPCBhcmVhSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoNTAwMDAgKyBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwidW5sb2NrX21hcF9jZWxsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuino+mUgeWcsOWbvuagvOWtkFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxfY291bnQ6IGFyZWFDb25maWdba2V5XS5jZWxsSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwi6Kej6ZSB5Zyw5Zu+5qC85a2QJWRcIiwgYXJlYUNvbmZpZ1trZXldLmNlbGxJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISghaXNDaGVjayAmJiAxICE9IGFyZWFJRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX2N1cl91bmxvY2tfYXJlYV9zb3J0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJbmRleFRvTGlzdChsaXN0VHlwZUVudW0uQVJFQV9MT0NLX0NFTExfVFlQRSwgYXJlYUNvbmZpZ1trZXldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2NrQ2F2ZUFsbEluaXRDZWxsKGFyZWFJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYXJlYUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QXJlYUlETGlzdChhcmVhSUQpO1xyXG4gICAgICAgIGlmIChhcmVhQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGFyZWFDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGlmICgxMDAwMCA9PSBhcmVhQ29uZmlnW2tleV0uY29tVGltZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEluZGV4VG9MaXN0KGxpc3RUeXBlRW51bS5SRVBPUlRfQ0VMTF9UWVBFLCBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBhcmVhQ29uZmlnW2tleV0uaXNPYnN0cnVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtRGF0YVZPID0gbmV3IE1hcEl0ZW1EYXRhVk87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uY2VsbFN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWTy5pdGVtU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YVZPLml0ZW1JRCA9IGFyZWFDb25maWdba2V5XS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhVk8uY2VsbElEID0gYXJlYUNvbmZpZ1trZXldLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWTy5oZXJvVUlEID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGFWTy5pdGVtVHlwZSA9IGFyZWFDb25maWdba2V5XS5pdGVtVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW2FyZWFDb25maWdba2V5XS5jZWxsSURdID0gbWFwSXRlbURhdGFWTztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCBhcmVhQ29uZmlnW2tleV0uaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJlYUNvbmZpZ1trZXldLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5CVUlMRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCdWlsZChhcmVhQ29uZmlnW2tleV0uaXRlbUlELCBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlSXRlbShhcmVhQ29uZmlnW2tleV0uaXRlbUlELCBhcmVhQ29uZmlnW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJvbGVTcGFjZUNlbGxCeUlEKGFyZWFDb25maWdba2V5XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDVlNCArIGFyZWFDb25maWdba2V5XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcInVubG9ja19tYXBfY2VsbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuino+mUgeWcsOWbvuagvOWtkFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbF9jb3VudDogYXJlYUNvbmZpZ1trZXldLmNlbGxJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIuino+mUgeWcsOWbvuagvOWtkCVkXCIsIGFyZWFDb25maWdba2V5XS5jZWxsSUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRSb2xlU3BhY2VDZWxsQnlJRChjZWxsSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkSW5kZXhUb0xpc3QobGlzdFR5cGVFbnVtLlNQQUNFX1RZUEUsIGNlbGxJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJvbGVTa2lsbERhdGEoc2tpbGxJRDogbnVtYmVyKTogSGVyb1NraWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvU2tpbGxMaXN0W3NraWxsSURdIHx8IHsgbHZsOiAwLCBudW06IDAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBncmFkZVJvbGVTa2lsbERhdGEoc2tpbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb1NraWxsTGlzdFtza2lsbElEXSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9Ta2lsbExpc3Rbc2tpbGxJRF0ubHZsICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1NraWxsTGlzdFtza2lsbElEXS5udW0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE15U291bE51bSgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHNvdWxEYXRhID0gdGhpcy5pdGVtRGF0YVtQcm9wVHlwZUVudW0uU09VTF9UWVBFXTtcclxuICAgICAgICBsZXQgdG90YWxTb3VsTnVtID0gMDtcclxuICAgICAgICBpZiAoc291bERhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNvdWxEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoc291bERhdGFbaW5kZXhdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsU291bE51bSArPSBpdGVtQ29uZmlnLm51bWJlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG90YWxTb3VsTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRSb2xlU2tpbGxJdGVtRGF0YShza2lsbElEOiBudW1iZXIsIHJlcXVpcmVkTnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGVyb1NraWxsTGlzdFtza2lsbElEXSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9Ta2lsbExpc3Rbc2tpbGxJRF0gPSB7XHJcbiAgICAgICAgICAgICAgICBsdmw6IDAsXHJcbiAgICAgICAgICAgICAgICBudW06IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5pdGVtRGF0YVtQcm9wVHlwZUVudW0uU09VTF9UWVBFXS5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JRCA9IHRoaXMuaXRlbURhdGFbUHJvcFR5cGVFbnVtLlNPVUxfVFlQRV1baW5kZXhdLml0ZW1JRDtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVt0aGlzLml0ZW1EYXRhW1Byb3BUeXBlRW51bS5TT1VMX1RZUEVdW2luZGV4XS5jZWxsSURdLml0ZW1JRCAhPSBpdGVtSUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbUHJvcFR5cGVFbnVtLlNPVUxfVFlQRV0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvdGFsQWRkZWQgPSAwO1xyXG4gICAgICAgIGNvbnN0IHNvdWxEYXRhID0gdGhpcy5pdGVtRGF0YVtQcm9wVHlwZUVudW0uU09VTF9UWVBFXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHNvdWxEYXRhLmxlbmd0aCAtIDE7IDAgPD0gaW5kZXg7IGluZGV4LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gc291bERhdGFbaW5kZXhdLml0ZW1JRDtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoaXRlbUlEKTtcclxuICAgICAgICAgICAgY29uc3QgaXRlbU51bSA9IGl0ZW1DZmcubnVtYmVyO1xyXG4gICAgICAgICAgICBpZiAoISh0b3RhbEFkZGVkICsgaXRlbU51bSA8PSByZXF1aXJlZE51bSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZWZyZXNoQ2VsbExpc3QucHVzaChzb3VsRGF0YVtpbmRleF0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IHJlcXVpcmVkTnVtIC0gdG90YWxBZGRlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1NraWxsTGlzdFtza2lsbElEXS5udW0gKz0gcmVtYWluaW5nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxDZWxsSXRlbUJ5Q2VsbElEKHNvdWxEYXRhW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX3Rhc2tfcHJvZ3Jlc3MoVGFza0NvbmRpdGlvblR5cGUuUE9TRUlET04sIHJlbWFpbmluZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGl0SXRlbU51bShpdGVtQ2ZnLm51bWJlciAtIHJlbWFpbmluZywgaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goc291bERhdGFbaW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsQ2VsbEl0ZW1CeUNlbGxJRChzb3VsRGF0YVtpbmRleF0uY2VsbElEKTtcclxuICAgICAgICAgICAgdG90YWxBZGRlZCArPSBpdGVtTnVtO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9Ta2lsbExpc3Rbc2tpbGxJRF0ubnVtICs9IGl0ZW1OdW07XHJcbiAgICAgICAgICAgIGdtLmRhdGEudGFza19kYXRhLnVwZGF0ZV90YXNrX3Byb2dyZXNzKFRhc2tDb25kaXRpb25UeXBlLlBPU0VJRE9OLCBpdGVtTnVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkSW5kZXhUb0xpc3QodHlwZTogbnVtYmVyLCBpZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFyZWFMaXN0ID0gdGhpcy5yb2xlU2hvd0FyZWFJRExpc3Q7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gbGlzdFR5cGVFbnVtLlNIT1dfQVJFQV9UWVBFKSB7XHJcbiAgICAgICAgICAgIGFyZWFMaXN0ID0gdGhpcy5yb2xlU2hvd0FyZWFJRExpc3Q7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGxpc3RUeXBlRW51bS5NQVBfVE9UQUxfVFlQRSkge1xyXG4gICAgICAgICAgICBhcmVhTGlzdCA9IHRoaXMucm9sZV9tYXBfdG90YWxfZGF0YTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gbGlzdFR5cGVFbnVtLk5FV19VTkxPQ0tfQ0VMTF9UWVBFKSB7XHJcbiAgICAgICAgICAgIGFyZWFMaXN0ID0gdGhpcy5fY3VyTmV3VW5sb2NrQ2VsbExpc3Q7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGxpc3RUeXBlRW51bS5ORVdfVU5MT0NLX0FSRUFfVFlQRSkge1xyXG4gICAgICAgICAgICBhcmVhTGlzdCA9IHRoaXMucm9sZVVubG9ja0FyZWFJRExpc3Q7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGxpc3RUeXBlRW51bS5BUkVBX0xPQ0tfQ0VMTF9UWVBFKSB7XHJcbiAgICAgICAgICAgIGFyZWFMaXN0ID0gdGhpcy5hcmVhVW5sb2NrQ2VsbElETGlzdDtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gbGlzdFR5cGVFbnVtLlJFUE9SVF9DRUxMX1RZUEUpIHtcclxuICAgICAgICAgICAgYXJlYUxpc3QgPSB0aGlzLnJvbGVfbWFwX3JlcG9ydF9kYXRhO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBsaXN0VHlwZUVudW0uU1BBQ0VfVFlQRSkge1xyXG4gICAgICAgICAgICBhcmVhTGlzdCA9IHRoaXMucm9sZVNwYWNlTGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcmVhTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKGlkID09IGFyZWFMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcmVhTGlzdC5wdXNoKGlkKTtcclxuICAgICAgICBpZiAodHlwZSA9PSBsaXN0VHlwZUVudW0uU1BBQ0VfVFlQRSkge1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9iYXJyZWxfbnVtXCIpO1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwic2hpcF9nb29kc19jaGFuZ2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P1xyXG4gICAgcHVibGljIGNsZWFyV2FyZUhvdXNlTGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl93YXJlaG91c2VMaXN0ID0gW107XHJcbiAgICAgICAgZ20udWkuZW1pdChcInNoaXBfZ29vZHNfY2hhbmdlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkV2FyZUhvdXNlSXRlbShpdGVtOiBudW1iZXIsIGlzTmV3OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fd2FyZWhvdXNlTGlzdC5sZW5ndGggPCAxMDApIHtcclxuICAgICAgICAgICAgdGhpcy5fd2FyZWhvdXNlTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLl93YXJlaG91c2VJc05ld0xpc3QucHVzaChpc05ldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRXYXJlSG91c2VMaXN0KGl0ZW1zOiBudW1iZXJbXSwgaXNOZXc6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWluKDEwMCwgaXRlbXMubGVuZ3RoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkV2FyZUhvdXNlSXRlbShpdGVtc1tpXSwgaXNOZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbS51aS5lbWl0KFwic2hpcF9nb29kc19jaGFuZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1dEFsbEl0ZW1Ub01hcENlbGwoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICB3aGlsZSAodGhpcy5yb2xlU3BhY2VMaXN0Lmxlbmd0aCA+IDAgJiYgdGhpcy5fd2FyZWhvdXNlTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlSUQgPSB0aGlzLmdldFJvbGVTcGNlTGlzdFNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl93YXJlaG91c2VMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl93YXJlaG91c2VJc05ld0xpc3Quc2hpZnQoKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzcGFjZUlEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpdGVtVHlwZSA9IGl0ZW0gPj0gMzAwMDAgPyBJdGVtVHlwZUVudW0uSEVST19UWVBFIDogSXRlbVR5cGVFbnVtLklURU1fVFlQRTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQoc3BhY2VJRCwgaXRlbVR5cGUsIGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGVJdGVtKGl0ZW0sIHNwYWNlSUQpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goc3BhY2VJRCk7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfaXRlbV9mbHkoXHJcbiAgICAgICAgICAgICAgICBpdGVtLFxyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNoaXAuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShzcGFjZUlELnRvU3RyaW5nKCkpLmdldENvbXBvbmVudChNYWluTWFwSXRlbSkuaXRlbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXNIYXZlU3BlY2VDZWxsSUQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm9sZVNwYWNlTGlzdC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSb2xlU3BjZUxpc3RTaGlmdCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICgwIDwgdGhpcy5yb2xlU3BhY2VMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5yb2xlU3BhY2VMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYWNlSUQgPSB0aGlzLnJvbGVTcGFjZUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghWzExOCwgMTM0LCAxNTIsIDE0OSwgMTY3LCAxODMsIDEzMCwgMTQ4LCAxMzUsIDE1MywgMTk2LCAyMDVdLmluY2x1ZGVzKHNwYWNlSUQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZVNwYWNlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9iYXJyZWxfbnVtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3BhY2VJRDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb2xlU3BhY2VMaXN0ID0gdGhpcy5yb2xlU3BhY2VMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9iYXJyZWxfbnVtXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvbGVTcGFjZUxpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgcm9sZVNwYWNlTGlzdCA9IHRoaXMucm9sZVNwYWNlTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9iYXJyZWxfbnVtXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm9sZVNwYWNlTGlzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0R3VpZGVEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm9sZUd1aWRlVk8gPSBuZXcgR3VpZGVWTygpO1xyXG4gICAgICAgIHRoaXMucm9sZUd1aWRlVk8uZ3VpZGVJRCA9IDE7XHJcbiAgICAgICAgdGhpcy5yb2xlR3VpZGVWTy5ydW5uaW5nSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMucm9sZUd1aWRlVk8uaXNGaW5pc2hBbGxHdWlkZSA9IDA7XHJcbiAgICAgICAgdGhpcy5yb2xlR3VpZGVWTy5zdGVwID0gMDtcclxuICAgICAgICB0aGlzLnJvbGVHdWlkZVZPLmlzRW5kID0gZmFsc2U7XHJcbiAgICAgICAgVGVtcERhdGEuaW5pdEd1aWRlVGVtcERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Um9sZUd1aWRlRGF0YShndWlkZUlEOiBudW1iZXIsIHJ1bm5pbmdJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZUd1aWRlVk8pIHtcclxuICAgICAgICAgICAgaWYgKGd1aWRlSUQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVWTy5ndWlkZUlEID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlVk8uaXNGaW5pc2hBbGxHdWlkZSA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocnVubmluZ0luZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZVZPLmlzRW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZVZPLmd1aWRlSUQgPSBndWlkZUlEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVWTy5ydW5uaW5nSW5kZXggPSBydW5uaW5nSW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVHdWlkZVZPLmlzRmluaXNoQWxsR3VpZGUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFRlbXBEYXRhLmluaXRHdWlkZVRlbXBEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Um9sZUd1aWRlRGF0YUVuZChndWlkZUlEOiBudW1iZXIsIHJ1bm5pbmdJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZUd1aWRlVk8pIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVWTy5ndWlkZUlEID0gZ3VpZGVJRDtcclxuICAgICAgICAgICAgdGhpcy5yb2xlR3VpZGVWTy5ydW5uaW5nSW5kZXggPSBydW5uaW5nSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUd1aWRlVk8uaXNFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZ3VpZGVJRCA9PSAxNSAmJiB0aGlzLnJvbGVHdWlkZVZPLmlzRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfc2hvd19zdGF0ZUljb25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRTdXBlclJlY3J1aXRJdGVtKGl0ZW06IG51bWJlciwgaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlTWFwSXRlbURhdGFCeUlEKGlkLCBJdGVtVHlwZUVudW0uSVRFTV9UWVBFLCBpdGVtKTtcclxuICAgICAgICB0aGlzLmFkZFJvbGVJdGVtKGl0ZW0sIGlkKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGlkKTtcclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3Rhckhlcm9OdW1CeUlEKGhlcm9JRDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBoZXJvSUQudG9TdHJpbmcoKSkgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvZXMgPSB0aGlzLmhlcm9EYXRhW2hlcm9Db25maWcub2NjdXBhdGlvbl07XHJcbiAgICAgICAgICAgIGlmIChoZXJvZXMgJiYgaGVyb2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaGVybyBvZiBoZXJvZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGVyby5pdGVtSUQgPT09IGhlcm9JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbFN0YXJIZXJvTnVtQnlJRChoZXJvSUQ6IG51bWJlciwgY291bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBkZWxldGVkQ291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgaGVyb0lELnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb2VzID0gdGhpcy5oZXJvRGF0YVtoZXJvQ29uZmlnLm9jY3VwYXRpb25dO1xyXG4gICAgICAgICAgICBpZiAoaGVyb2VzICYmIGhlcm9lcy5sZW5ndGggPj0gY291bnQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gaGVyb2VzLmxlbmd0aCAtIDE7IDAgPD0gaW5kZXg7IGluZGV4LS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRlZENvdW50ID09IGNvdW50KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9lc1tpbmRleF0uaXRlbUlEID09IGhlcm9JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsSUQgPSBoZXJvZXNbaW5kZXhdLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxDZWxsSXRlbUJ5Q2VsbElEKGhlcm9lc1tpbmRleF0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEl0ZW0oaXRlbUlEOiBudW1iZXIsIHF1YW50aXR5OiBudW1iZXIsIGNlbGxJRDogbnVtYmVyID0gLTEpOiB2b2lkIHtcclxuICAgICAgICBpZiAoMzAwMDAgPCBpdGVtSUQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAtMSA9PSBjZWxsSUQgPyB0aGlzLmdldFJvbGVTcGNlTGlzdFNoaWZ0KCkgOiBjZWxsSUQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTWFwSXRlbURhdGFCeUlEKGluZGV4LCBJdGVtVHlwZUVudW0uSEVST19UWVBFLCBpdGVtSUQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJvbGVJdGVtKGl0ZW1JRCwgaW5kZXgpO1xyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGluZGV4KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJJdGVtQ29uZmlnRGF0YVwiLCBpdGVtSUQudG9TdHJpbmcoKSkgYXMgSXRlbUNvbmZpZztcclxuICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uQ09JTl9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFkZEdhbWVDb2luKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIHF1YW50aXR5KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtQ29uZmlnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLkRJQU1PTkRTX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWRkR2FtZURpYW1vbmQoU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgcXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFIHx8IGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFIHx8IGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uU0hFTExfTU9ORVlfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBpdGVtQ29uZmlnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLldPT0RfVFlQRSA/IDE2MDA4IDogaXRlbUNvbmZpZy50eXBlID09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUgPyAxNzAwOCA6IDI1MDA4O1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BsaXRJdGVtTnVtKHF1YW50aXR5LCBpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFdhcmVIb3VzZUl0ZW0oaXRlbUlELCAxKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJzaGlwX2dvb2RzX2NoYW5nZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQmFycmVsSW5NYXAoYmFycmVsSUQ/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXRlbUlEOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKGJhcnJlbElEICYmIDAgPCBiYXJyZWxJRCkge1xyXG4gICAgICAgICAgICBpdGVtSUQgPSBiYXJyZWxJRDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm9sZV9vcGVuQmFycmVsX1RpbWVzID4gdGhpcy5pbml0T3BlbkJhcnJlbERhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkUG9vbCA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGFfYXJyYXkoXCJQb29sQ29uZmlnRGF0YVwiLCBcIjExMDFcIikgYXMgUG9vbENvbmZpZ1tdO1xyXG4gICAgICAgICAgICBjb25zdCByYW5kb21SZXdhcmRzOiBSb2xlSXRlbURhdGFWT1tdID0gW107XHJcbiAgICAgICAgICAgIGdtLmRhdGEuc2V0UmFuZG9tUmV3YXJkKHJld2FyZFBvb2wsIHJhbmRvbVJld2FyZHMsIDEpO1xyXG4gICAgICAgICAgICBpdGVtSUQgPSByYW5kb21SZXdhcmRzWzBdLml0ZW1JRDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtSUQgPSBSZXdhcmRJZEVudW0uQkFSUkVMO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBSb2xlU3BjZUxpc3QgPSB0aGlzLmdldFJvbGVTcGNlTGlzdFNoaWZ0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5yb2xlU3BhY2VMaXN0KTtcclxuICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRChSb2xlU3BjZUxpc3QsIEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUsIGl0ZW1JRCk7XHJcbiAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBSb2xlU3BjZUxpc3QpO1xyXG4gICAgICAgIGdtLnVpLmVtaXQoXCJjb21wb3NlX2FuaW1cIiwgUm9sZVNwY2VMaXN0KTtcclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbldhdGVyR2lybENhc2UocG9vbElEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBwb29sRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGFfYXJyYXkoXCJQb29sQ29uZmlnRGF0YVwiLCBwb29sSUQgKyBcIlwiKSBhcyBQb29sQ29uZmlnW107XHJcbiAgICAgICAgY29uc3QgcmV3YXJkczogUm9sZUl0ZW1EYXRhVk9bXSA9IFtdO1xyXG4gICAgICAgIGdtLmRhdGEuc2V0UmFuZG9tUmV3YXJkKHBvb2xEYXRhLCByZXdhcmRzLCAxKTtcclxuICAgICAgICB0aGlzLmRlbENlbGxJdGVtQnlDZWxsSUQoY2VsbElEKTtcclxuICAgICAgICB0aGlzLmFkZEl0ZW0ocmV3YXJkc1swXS5pdGVtSUQsIDEsIGNlbGxJRCk7XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgcmV0dXJuIHJld2FyZHNbMF0uaXRlbUlEO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuSGVyb0dpZnRDYXNlKHBvb2xJRDogbnVtYmVyLCBjZWxsSUQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgcG9vbERhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhX2FycmF5KFwiUG9vbENvbmZpZ0RhdGFcIiwgcG9vbElEICsgXCJcIikgYXMgUG9vbENvbmZpZ1tdO1xyXG4gICAgICAgIGNvbnN0IHJld2FyZHM6IFJvbGVJdGVtRGF0YVZPW10gPSBbXTtcclxuICAgICAgICBnbS5kYXRhLnNldFJhbmRvbVJld2FyZChwb29sRGF0YSwgcmV3YXJkcywgMSk7XHJcbiAgICAgICAgdGhpcy5kZWxDZWxsSXRlbUJ5Q2VsbElEKGNlbGxJRCk7XHJcbiAgICAgICAgdGhpcy5hZGRTdXBlckhlcm9EYXRhKHJld2FyZHNbMF0uaXRlbUlELCBjZWxsSUQpO1xyXG4gICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIHJldHVybiByZXdhcmRzWzBdLml0ZW1JRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkU3VwZXJIZXJvRGF0YShoZXJvSUQ6IG51bWJlciwgY2VsbElEOiBudW1iZXIsIGhwOiBudW1iZXIgPSAtMSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdXBlckhlcm9EYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdXBlckhlcm9EYXRhW2ldLmNlbGxJRCA9PSBjZWxsSUQgJiYgdGhpcy5zdXBlckhlcm9EYXRhW2ldLmhlcm9pZCA9PSBoZXJvSUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtpXS5ocCA9IE1hdGgubWF4KDAsIGhwKTtcclxuICAgICAgICAgICAgICAgIGlmICgwID09IGhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW2ldLmhlcm9TdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW2ldLmN1clJlbGl2ZVRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtpXS5uZXh0UmVsaXZlVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMykgKyBnbS5jb25zdC5TVVBFUkhFUk9SRUxJVkVUSU1FO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISgwICE9IHRoaXMuc3VwZXJIZXJvRGF0YVtpXS5jdXJSZWxpdmVUaW1lICYmIDAgIT0gdGhpcy5zdXBlckhlcm9EYXRhW2ldLm5leHRSZWxpdmVUaW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtpXS5jdXJSZWxpdmVUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGFbaV0ubmV4dFJlbGl2ZVRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpICsgZ20uY29uc3QuU1VQRVJIRVJPUkVDSVZFVElNRTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhlcm9DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9JRCk7XHJcbiAgICAgICAgaWYgKGhlcm9DZmcpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3VwZXJIZXJvVk8gPSBuZXcgU3VwZXJIZXJvVk87XHJcbiAgICAgICAgICAgIHN1cGVySGVyb1ZPLmhlcm9pZCA9IGhlcm9JRDtcclxuICAgICAgICAgICAgc3VwZXJIZXJvVk8uaHAgPSBoZXJvQ2ZnLmhwO1xyXG4gICAgICAgICAgICBzdXBlckhlcm9WTy5oZXJvU3RhdGUgPSAwO1xyXG4gICAgICAgICAgICBzdXBlckhlcm9WTy5jdXJSZWxpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgc3VwZXJIZXJvVk8ubmV4dFJlbGl2ZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICBzdXBlckhlcm9WTy5tYXhIcCA9IGhlcm9DZmcuaHA7XHJcbiAgICAgICAgICAgIHN1cGVySGVyb1ZPLmNlbGxJRCA9IGNlbGxJRDtcclxuICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhLnB1c2goc3VwZXJIZXJvVk8pO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRChjZWxsSUQsIEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUsIGhlcm9JRCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZUl0ZW0oaGVyb0lELCBjZWxsSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFN1cGVySGVyb0Z1bGxIcEJ5SUQoaGVyb0lEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc3VwZXJIZXJvRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJIZXJvRGF0YVtpbmRleF0uaGVyb2lkID09IGhlcm9JRCAmJiB0aGlzLnN1cGVySGVyb0RhdGFbaW5kZXhdLmNlbGxJRCA9PSBjZWxsSUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtpbmRleF0uY3VyUmVsaXZlVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGFbaW5kZXhdLm5leHRSZWxpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtpbmRleF0uaHAgPSB0aGlzLnN1cGVySGVyb0RhdGFbaW5kZXhdLm1heEhwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3VwZXJIZXJvUmVsaXZlQnlJRChoZXJvSUQ6IG51bWJlciwgY2VsbElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zdXBlckhlcm9EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XS5oZXJvaWQgPT0gaGVyb0lEICYmIHRoaXMuc3VwZXJIZXJvRGF0YVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XS5oZXJvU3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XS5ocCA9IHRoaXMuc3VwZXJIZXJvRGF0YVtpbmRleF0ubWF4SHA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGFbaW5kZXhdLmN1clJlbGl2ZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XS5uZXh0UmVsaXZlVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9zdXBlcl9oZXJvX2NvbG9yXCIsIGNlbGxJRCwgaGVyb0lEKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFN1cGVySGVyb0RhdGEoaGVyb0lEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogU3VwZXJIZXJvVk8ge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnN1cGVySGVyb0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1cGVySGVyb0RhdGFbaW5kZXhdLmhlcm9pZCA9PSBoZXJvSUQgJiYgdGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XS5jZWxsSUQgPT0gY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVN1cGVySGVyb0RhdGEoaGVyb0lEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc3VwZXJIZXJvRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJIZXJvRGF0YVtpbmRleF0uaGVyb2lkID09PSBoZXJvSUQgJiYgdGhpcy5zdXBlckhlcm9EYXRhW2luZGV4XS5jZWxsSUQgPT0gY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFsbFN1cGVySGVyb0RhdGEoKTogU3VwZXJIZXJvVk9bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXJIZXJvRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgYWRkUm9sZUl0ZW0oaXRlbUlEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyID0gLTEpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtVHlwZSA9IDNlNCA8IGl0ZW1JRCA/IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUgOiBJdGVtVHlwZUVudW0uSVRFTV9UWVBFO1xyXG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBuZXcgcm9sZU1hcEl0ZW1WTztcclxuICAgICAgICBuZXdJdGVtLmhlcm9VSUQgPSAwO1xyXG4gICAgICAgIG5ld0l0ZW0uaXRlbUlEID0gaXRlbUlEO1xyXG4gICAgICAgIG5ld0l0ZW0uY2VsbElEID0gY2VsbElEO1xyXG5cclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW1DZmcpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLml0ZW1EYXRhW2l0ZW1DZmcudHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbaXRlbUNmZy50eXBlXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld0l0ZW0uaXRlbVR5cGUgPSBpdGVtQ2ZnLnR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbaXRlbUNmZy50eXBlXS5wdXNoKG5ld0l0ZW0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChpdGVtSUQpXHJcbiAgICAgICAgICAgIGlmICghaGVyb2ZnKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oZXJvRGF0YVtoZXJvZmcub2NjdXBhdGlvbl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb0RhdGFbaGVyb2ZnLm9jY3VwYXRpb25dID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3SXRlbS5pdGVtVHlwZSA9IGhlcm9mZy5vY2N1cGF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9EYXRhW2hlcm9mZy5vY2N1cGF0aW9uXS5wdXNoKG5ld0l0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoMTEgPT0gaGVyb2ZnLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJidWlsZF9zaG93X3Rvd2VyQnVmZlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucm9sZVNwYWNlTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZVNwYWNlTGlzdFtpbmRleF0gPT0gY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVTcGFjZUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVubG9ja0Jvb2tJdGVtKGl0ZW1UeXBlLCBpdGVtSUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SGVyb0RhdGFCeUlEKGhlcm9JRDogbnVtYmVyLCBjZWxsSUQ6IG51bWJlcik6IHJvbGVNYXBJdGVtVk9bXSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9JRCk7XHJcbiAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9EYXRhW2hlcm9Db25maWcub2NjdXBhdGlvbl0gfHwgT2JqZWN0LmtleXModGhpcy5oZXJvRGF0YVtoZXJvQ29uZmlnLm9jY3VwYXRpb25dKS5sZW5ndGggPD0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5oZXJvRGF0YVtoZXJvQ29uZmlnLm9jY3VwYXRpb25dLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb0RhdGFbaGVyb0NvbmZpZy5vY2N1cGF0aW9uXVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlcm9EYXRhW2hlcm9Db25maWcub2NjdXBhdGlvbl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFN1cGVySGVyb0RhdGFCeUlEKGhlcm9JRDogbnVtYmVyLCBjZWxsSUQ6IG51bWJlcik6IFN1cGVySGVyb1ZPIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCB0aGlzLnN1cGVySGVyb0RhdGEubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJIZXJvRGF0YVthXS5jZWxsSUQgPT0gY2VsbElEICYmIHRoaXMuc3VwZXJIZXJvRGF0YVthXS5oZXJvaWQgPT09IGhlcm9JRCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXJIZXJvRGF0YVthXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsZXRlX2hlcm8oaGVyb1VJRDogbnVtYmVyLCBoZXJvSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9JRCk7XHJcbiAgICAgICAgaWYgKGhlcm9Db25maWcpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2NjdXBhdGlvbkRhdGEgPSB0aGlzLmhlcm9EYXRhW2hlcm9Db25maWcub2NjdXBhdGlvbl07XHJcbiAgICAgICAgICAgIGlmIChvY2N1cGF0aW9uRGF0YSAmJiBPYmplY3Qua2V5cyhvY2N1cGF0aW9uRGF0YSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvY2N1cGF0aW9uRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvY2N1cGF0aW9uRGF0YVtpXS5oZXJvVUlEID09PSBoZXJvVUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsQ2VsbEl0ZW1CeUNlbGxJRChvY2N1cGF0aW9uRGF0YVtpXS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIG9jY3VwYXRpb25EYXRhW2ldLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXNIZXJvVG93ZXJCdWZmKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9EYXRhWzExXSAmJiB0aGlzLmhlcm9EYXRhWzExXS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVsUm9sZUl0ZW0oaXRlbUlEOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQoY2VsbElELCAwLCAwKTtcclxuICAgICAgICBjb25zdCBpdGVtVHlwZSA9IDNlNCA8IGl0ZW1JRCA/IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUgOiBJdGVtVHlwZUVudW0uSVRFTV9UWVBFO1xyXG4gICAgICAgIGlmIChpdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKGl0ZW1JRCk7XHJcbiAgICAgICAgICAgIGlmICghaXRlbUNvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXRlbURhdGFbaXRlbUNvbmZpZy50eXBlXSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtRGF0YVtpdGVtQ29uZmlnLnR5cGVdLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbURhdGFbaXRlbUNvbmZpZy50eXBlXVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbaXRlbUNvbmZpZy50eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9sZVNwYWNlQ2VsbEJ5SUQoY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NmZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhlcm9EYXRhW2hlcm9DZmcub2NjdXBhdGlvbl0pIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmhlcm9EYXRhW2hlcm9DZmcub2NjdXBhdGlvbl0ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb0RhdGFbaGVyb0NmZy5vY2N1cGF0aW9uXVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9EYXRhW2hlcm9DZmcub2NjdXBhdGlvbl0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlU3BhY2VDZWxsQnlJRChjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvQ2ZnLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFICYmIHRoaXMucmVtb3ZlU3VwZXJIZXJvRGF0YShpdGVtSUQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9iYXJyZWxfbnVtXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNZXJ0cmFpbElEQ291bnQoaXRlbUlEOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKGl0ZW1JRCk7XHJcbiAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uQ09JTl9UWVBFKSByZXR1cm4gdGhpcy5yb2xlQ29pbkRhdGEuY29pbk51bTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uRElBTU9ORFNfVFlQRSkgcmV0dXJuIHRoaXMucm9sZUNvaW5EYXRhLmRpYW1vbmROdW07XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pdGVtRGF0YVtpdGVtQ29uZmlnLnR5cGVdKSByZXR1cm4gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbURhdGFbaXRlbUNvbmZpZy50eXBlXS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5pdGVtRGF0YVtpdGVtQ29uZmlnLnR5cGVdW2luZGV4XS5pdGVtSUQpLm51bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzcGxpdEl0ZW1OdW0oaXRlbUlEOiBudW1iZXIsIGl0ZW1Db3VudDogbnVtYmVyLCBzdGFydElEOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaSA9IDEwICogTWF0aC5mbG9vciguMSAqIGl0ZW1Db3VudCkgKyAxO1xyXG4gICAgICAgIGZvciAobGV0IG8gPSBpdGVtQ291bnQ7IGkgPD0gbzsgby0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKG8pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbUNvbmZpZylcclxuICAgICAgICAgICAgICAgIGZvciAoOyBpdGVtSUQgPj0gaXRlbUNvbmZpZy5udW1iZXI7KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgMSA9PSBpdGVtSUQgPyBpdGVtSUQgPSAwIDogaXRlbUlEIC09IGl0ZW1Db25maWcubnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV2FyZUhvdXNlSXRlbShvLCBzdGFydElEKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnbS51aS5lbWl0KFwic2hpcF9nb29kc19jaGFuZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uZWtleUdldEd1aWRlQWxsTWVydHJhaWwodDogbnVtYmVyLCBlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhQnVpbGQgPSBUZW1wRGF0YS5nZXRCdWlsZEd1aWRlTWVydGFyaWxEYXRhKCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5idWlsZERhdGFbdF0ubWV0cmFpbERhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRlbXBEYXRhQnVpbGQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZW1wRGF0YUJ1aWxkLm1ldHJhaWxMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRlbXBEYXRhQnVpbGQubWV0cmFpbExpc3RbaW5kZXhdLml0ZW1JRCkudHlwZSA9PSBwYXJzZUludChrZXkpICYmIFRlbXBEYXRhLmdldEJ1aWxkR3VpZGVNZXJ0YXJpbE51bUJ5SUQodGhpcy5idWlsZERhdGFbdF0uYnVpbGRJRCwgdGVtcERhdGFCdWlsZC5tZXRyYWlsTGlzdFtpbmRleF0uaXRlbUlEKSA+PSB0ZW1wRGF0YUJ1aWxkLm1ldHJhaWxMaXN0W2luZGV4XS5uZWVkTnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBidWlsZERhdGFJSSA9IHRoaXMuYnVpbGREYXRhW3RdLm1ldHJhaWxEYXRhW2VdO1xyXG4gICAgICAgIGlmIChidWlsZERhdGFJSSAmJiAhKGJ1aWxkRGF0YUlJLmN1ciA+PSBidWlsZERhdGFJSS5tYXgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnVzID0gYnVpbGREYXRhSUkubWF4IC0gYnVpbGREYXRhSUkuY3VyO1xyXG4gICAgICAgICAgICBVdGlscy5zb3J0X2J5X3Byb3BzKHRoaXMuaXRlbURhdGFbZV0sIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1JRDogXCJhc2NlbmRpbmdcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlID09IFByb3BUeXBlRW51bS5XT09EX1RZUEUgfHwgZSA9PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFIHx8IGUgPT0gUHJvcFR5cGVFbnVtLlNIRUxMX01PTkVZX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5pdGVtRGF0YVtlXS5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gdGhpcy5pdGVtRGF0YVtlXVtpbmRleF0uaXRlbUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxJRCA9IHRoaXMuaXRlbURhdGFbZV1baW5kZXhdLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwICsgaXRlbUNmZy5udW1iZXIgPT0gbWludXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UCA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SCA9IG5ld1AuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1AgJiYgbmV3SCAmJiBuZXdILml0ZW1Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19pdGVtX2ZseShpdGVtQ2ZnLmlkLCBuZXdILml0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pLCBnbS51aS5tYXBNYWluVUkuc2hpcC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdVID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUodGhpcy5idWlsZERhdGFbdF0uY2VsbElELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld00gPSBuZXdVLmdldENvbXBvbmVudChNYWluTWFwSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1UgJiYgbmV3TSAmJiBuZXdNLml0ZW1Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfaXRlbV9mbHkoaXRlbUNmZy5pZCwgbmV3SC5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSwgbmV3TS5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0T25la2V5QWRkTWVydHJhaWwodCwgaXRlbUNmZy5pZCwgY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVtcERhdGEuc2V0QnVpbGRHdWlkZU1lcnRhcmlsKHRoaXMuYnVpbGREYXRhW3RdLmJ1aWxkSUQsIGl0ZW1DZmcuaWQsIGl0ZW1DZmcudHlwZSwgY2VsbElELCBpdGVtQ2ZnLm51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGF0YVt0XS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCAtIHRoaXMuYnVpbGREYXRhW3RdLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0uY3VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJidWlsZF9tZXRhcmFpbF9jaGFuZ2VcIiwgdGhpcy5idWlsZERhdGFbdF0uYnVpbGRJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiZ3VpZGVfZGVsX2l0ZW1cIiwgY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5jaGVja0hhbmRBbmltRGVsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1EYXRhW2VdLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1JRCA9IHRoaXMuaXRlbURhdGFbZV1baW5kZXhdLml0ZW1JRDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsSUQgPSB0aGlzLml0ZW1EYXRhW2VdW2luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JRCA9PSBidWlsZERhdGFJSS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdEID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3RCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UCA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ggPSBuZXdQLmdldENvbXBvbmVudChNYWluTWFwSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3UCAmJiBuZXdIICYmIG5ld0guaXRlbU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfaXRlbV9mbHkobmV3RC5pZCwgbmV3SC5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaGlwLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VSA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuYnVpbGREYXRhW3RdLmNlbGxJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TSA9IG5ld1UuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1UgJiYgbmV3TSAmJiBuZXdNLml0ZW1Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2l0ZW1fZmx5KG5ld0QuaWQsIG5ld0guaXRlbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3TS5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydE9uZWtleUFkZE1lcnRyYWlsKHQsIG5ld0QuaWQsIGNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLnNldEJ1aWxkR3VpZGVNZXJ0YXJpbCh0aGlzLmJ1aWxkRGF0YVt0XS5idWlsZElELCBpdGVtSUQsIG5ld0QudHlwZSwgY2VsbElELCAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW3RdLm1ldHJhaWxEYXRhW25ld0QudHlwZV0ubWF4IC0gdGhpcy5idWlsZERhdGFbdF0ubWV0cmFpbERhdGFbbmV3RC50eXBlXS5jdXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCB0aGlzLmJ1aWxkRGF0YVt0XS5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJndWlkZV9kZWxfaXRlbVwiLCBjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmNoZWNrSGFuZEFuaW1EZWxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVwb3J0T25la2V5QWRkTWVydHJhaWwodDogbnVtYmVyLCBlOiBudW1iZXIsIGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGlmICgwID09IHRoaXMuYnVpbGREYXRhW3RdLmJ1aWxkTHZsICYmIHQgPT0gQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKSB7XHJcbiAgICAgICAgICAgIGkgPSAyMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoZSlcclxuICAgICAgICBpZiAoaXRlbUNmZykge1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgIGd1aWRlaWQ6IGkgKz0gYSxcclxuICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogY2MuanMuZm9ybWF0U3RyKFwiJWQu5LiA6ZSu5re75Yqg5p2Q5paZJXNcIiwgaSwgaXRlbUNmZy5uYW1lKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uZWtleUdldEFsbE1lcnRyYWlsKHQ6IG51bWJlciwgZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNlbGxJRCA9IDA7XHJcbiAgICAgICAgY29uc3QgbWV0cmFpbERhdGEgPSB0aGlzLmJ1aWxkRGF0YVt0XS5tZXRyYWlsRGF0YVtlXTtcclxuICAgICAgICBpZiAobWV0cmFpbERhdGEgJiYgIShtZXRyYWlsRGF0YS5jdXIgPj0gbWV0cmFpbERhdGEubWF4KSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaW51cyA9IG1ldHJhaWxEYXRhLm1heCAtIG1ldHJhaWxEYXRhLmN1cjtcclxuICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyh0aGlzLml0ZW1EYXRhW2VdLCB7XHJcbiAgICAgICAgICAgICAgICBpdGVtSUQ6IFwiZGVzY2VuZGluZ1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUgPT0gUHJvcFR5cGVFbnVtLldPT0RfVFlQRSB8fCBlID09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUgfHwgZSA9PSBQcm9wVHlwZUVudW0uU0hFTExfTU9ORVlfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5pdGVtRGF0YVtlXS5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gdGhpcy5pdGVtRGF0YVtlXVtpbmRleF0uaXRlbUlEO1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxJRCA9IHRoaXMuaXRlbURhdGFbZV1baW5kZXhdLmNlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShjb3VudCArIGl0ZW1DZmcubnVtYmVyIDw9IG1pbnVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SCA9IG1pbnVzIC0gY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVpbGRNZXRyYWlsKHQsIGl0ZW1DZmcudHlwZSwgbmV3SCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkTmFtZSA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFpbk1hcCA9IGNoaWxkTmFtZS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROYW1lICYmIG1haW5NYXAgJiYgbWFpbk1hcC5pdGVtTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQgPT0gQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfaXRlbV9mbHkoaXRlbUNmZy5pZCwgbWFpbk1hcC5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNoaXAuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RCA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuYnVpbGREYXRhW3RdLmNlbGxJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQID0gbmV3RC5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdEICYmIG5ld1AgJiYgbmV3UC5pdGVtTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2l0ZW1fZmx5KGl0ZW1DZmcuaWQsIG1haW5NYXAuaXRlbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQLml0ZW1Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbZV0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQoY2VsbElELCAwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlU3BhY2VDZWxsQnlJRChjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGl0SXRlbU51bShpdGVtQ2ZnLm51bWJlciAtIG5ld0gsIGl0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZE5hbWUgPSBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFpbk1hcCA9IGNoaWxkTmFtZS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROYW1lICYmIG1haW5NYXAgJiYgbWFpbk1hcC5pdGVtTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2l0ZW1fZmx5KGl0ZW1DZmcuaWQsIG1haW5NYXAuaXRlbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNoaXAuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RCA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuYnVpbGREYXRhW3RdLmNlbGxJRC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1AgPSBuZXdELmdldENvbXBvbmVudChNYWluTWFwSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3RCAmJiBuZXdQICYmIG5ld1AuaXRlbU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2l0ZW1fZmx5KGl0ZW1DZmcuaWQsIG1haW5NYXAuaXRlbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1AuaXRlbU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbURhdGFbZV0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRChjZWxsSUQsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IGl0ZW1DZmcubnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVpbGRNZXRyYWlsKHQsIGUsIGl0ZW1DZmcubnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJvbGVTcGFjZUNlbGxCeUlEKGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtRGF0YVtlXS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSUQgPSB0aGlzLml0ZW1EYXRhW2VdW2luZGV4XS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbElEID0gdGhpcy5pdGVtRGF0YVtlXVtpbmRleF0uY2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtSUQgPT0gbWV0cmFpbERhdGEuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVlZFJlZnJlc2hDZWxsTGlzdC5wdXNoKGl0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0oaXRlbUlELCBjZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1aWxkTWV0cmFpbCh0LCBlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JRCA+PSBtZXRyYWlsRGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxSb2xlSXRlbShpdGVtSUQsIGNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmID0gaXRlbUlEIC0gMTsgZiA+PSBtZXRyYWlsRGF0YS5pZDsgZi0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmID09IG1ldHJhaWxEYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCdWlsZE1ldHJhaWwodCwgZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV2FyZUhvdXNlTGlzdChhcnIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbmVrZXlHZXRBbGxTcGVjaWFsTWVydHJhaWwodDogbnVtYmVyLCBlOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzcGVjaWFmSUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFNwZWNpYWxCeUlEKHQpO1xyXG4gICAgICAgIGlmIChzcGVjaWFmSUQpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNwZWNpYWZJRC5wcm9wLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwZWNpYWZJRC5wcm9wW2luZGV4XSA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzcGVjaWFmSUQudmFsdWVbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoMCAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY2lhbCA9IHRoaXMuc3BlY2lhbExpc3RbdF07XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BlY2lhbCAmJiAhKHNwZWNpYWwubWVydHJhaWxbZV0gPj0gdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGl0ZW1DZmcudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3QyA9IHZhbHVlIC0gc3BlY2lhbC5tZXJ0cmFpbFtlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyh0aGlzLml0ZW1EYXRhW3R5cGVdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtSUQ6IFwiZGVzY2VuZGluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFIHx8IHR5cGUgPT0gUHJvcFR5cGVFbnVtLklST05fVFlQRSB8fCB0eXBlID09IFByb3BUeXBlRW51bS5TSEVMTF9NT05FWV9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLml0ZW1EYXRhW3R5cGVdLmxlbmd0aCAtIDE7IDAgPD0gaW5kZXg7IGluZGV4LS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSUQgPSB0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjb3VudCArIGl0ZW1Db25maWcubnVtYmVyIDw9IG5ld0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZWZyZXNoQ2VsbExpc3QucHVzaCh0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBudW0gPSBuZXdDIC0gY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbExpc3RbdF0ubWVydHJhaWxbZV0gKz0gY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsQ2VsbEl0ZW1CeUNlbGxJRCh0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGl0SXRlbU51bShpdGVtQ29uZmlnLm51bWJlciAtIG51bSwgaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZWZyZXNoQ2VsbExpc3QucHVzaCh0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsQ2VsbEl0ZW1CeUNlbGxJRCh0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IGl0ZW1Db25maWcubnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbExpc3RbdF0ubWVydHJhaWxbZV0gKz0gY291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtRGF0YVt0eXBlXS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtRGF0YVt0eXBlXVtpbmRleF0uaXRlbUlEID09IGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVlZFJlZnJlc2hDZWxsTGlzdC5wdXNoKHRoaXMuaXRlbURhdGFbdHlwZV1baW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0oZSwgdGhpcy5pdGVtRGF0YVt0eXBlXVtpbmRleF0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsTGlzdFt0XS5tZXJ0cmFpbFtlXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5pdGVtSUQgPj0gZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtSUQgPSB0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZWZyZXNoQ2VsbExpc3QucHVzaCh0aGlzLml0ZW1EYXRhW3R5cGVdW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbFJvbGVJdGVtKHRoaXMuaXRlbURhdGFbdHlwZV1baW5kZXhdLml0ZW1JRCwgdGhpcy5pdGVtRGF0YVt0eXBlXVtpbmRleF0uY2VsbElEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycjogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbyA9IGl0ZW1JRCAtIDE7IGUgPD0gbzsgby0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvID09IGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5zcGVjaWFsTGlzdFt0XS5tZXJ0cmFpbFtlXSArPSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdhcmVIb3VzZUxpc3QoYXJyLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25la2V5V2F0Y2hBZEdldFNvdWwodDogbnVtYmVyLCBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsQnlJRCh0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxMaXN0W3RdLm1lcnRyYWlsW2VdICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25la2V5R2V0QWxsU3BlY2lhbEhlcm9NZXJ0cmFpbCh0OiBudW1iZXIsIGU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IG5ld0EgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFNwZWNpYWxCeUlEKHQpO1xyXG4gICAgICAgIGlmIChuZXdBKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBuZXdBLnByb3AubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3QS5wcm9wW2luZGV4XSA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBuZXdBLnZhbHVlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKDAgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWNpYWwgPSB0aGlzLnNwZWNpYWxMaXN0W3RdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwZWNpYWwgJiYgIShzcGVjaWFsLm1lcnRyYWlsW2VdLmN1ciA+PSB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChlKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9jY3VwYXRpb24gPSBoZXJvQ29uZmlnLm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhID0gdGhpcy5oZXJvRGF0YVtvY2N1cGF0aW9uXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9EYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSBoZXJvRGF0YS5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvRGF0YVtpbmRleF0uaXRlbUlEID09IGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IHNwZWNpYWwubWVydHJhaWxbZV0pIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goaGVyb0RhdGFbaW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0oZSwgaGVyb0RhdGFbaW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbExpc3RbdF0ubWVydHJhaWxbZV0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZEJ1aWxkKHQ6IG51bWJlciwgZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYnVpbGRDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRCh0KTtcclxuICAgICAgICBpZiAoYnVpbGRDZmcgJiYgIXRoaXMuZ2V0QnVpbGREYXRhQnlUeXBlKGJ1aWxkQ2ZnLmJ1aWxkVHlwZSkpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZUJ1aWxkRGF0YSA9IG5ldyBSb2xlQnVpbGREYXRhVk87XHJcbiAgICAgICAgICAgIHJvbGVCdWlsZERhdGEuYnVpbGRTdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgIHJvbGVCdWlsZERhdGEuYnVpbGRJRCA9IGJ1aWxkQ2ZnLmJ1aWxkSUQ7XHJcbiAgICAgICAgICAgIHJvbGVCdWlsZERhdGEuYnVpbGRUeXBlID0gYnVpbGRDZmcuYnVpbGRUeXBlO1xyXG4gICAgICAgICAgICByb2xlQnVpbGREYXRhLmJ1aWxkTHZsID0gYnVpbGRDZmcuYnVpbGRMdjtcclxuICAgICAgICAgICAgcm9sZUJ1aWxkRGF0YS5jZWxsSUQgPSBlO1xyXG4gICAgICAgICAgICByb2xlQnVpbGREYXRhLmlzQ2FuTW92ZSA9IDAgPCBidWlsZENmZy5jZWxsSUQgPyAwIDogMTtcclxuICAgICAgICAgICAgcm9sZUJ1aWxkRGF0YS5wcm9kdWN0RGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJvbGVCdWlsZERhdGEubWV0cmFpbERhdGEgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbiA9IHJvbGVCdWlsZERhdGEudXBOZWVkQ29pbiA9IDA7IG4gPCBidWlsZENmZy5jb25zdW1lLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVpbGRDZmcuY29uc3VtZVtuXSA9PSBSZXdhcmRJZEVudW0uR09MRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvbGVCdWlsZERhdGEudXBOZWVkQ29pbiA9IGJ1aWxkQ2ZnLm51bVtuXTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKGJ1aWxkQ2ZnLmNvbnN1bWVbbl0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb2xlQnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVCdWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXSA9IHt9IGFzIG1ldHJhaWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZUJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmlkID0gYnVpbGRDZmcuY29uc3VtZVtuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZUJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCA9IGJ1aWxkQ2ZnLm51bVtuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZUJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW3JvbGVCdWlsZERhdGEuYnVpbGRUeXBlXSA9IHJvbGVCdWlsZERhdGE7XHJcbiAgICAgICAgICAgIGlmICg1OWUzID09IHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVpbGQoNjAwMDEsIGdtLmNvbnN0LnNoaXBJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCdWlsZERhdGFCeVR5cGUodDogbnVtYmVyKTogQnVpbGREYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZERhdGFbdF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZ3JhZGVCdWlsZCh0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBuZXdFID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodCk7XHJcbiAgICAgICAgaWYgKG5ld0UpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3QSA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKG5ld0UubmV4dEJ1aWxkSUQpO1xyXG4gICAgICAgICAgICBpZiAobmV3QSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdPID0gdGhpcy5idWlsZERhdGFbbmV3RS5idWlsZFR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld08pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcImJ1aWxkaW5nX3VwZ3JhZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuW7uuetkeWNh+e6p1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ19uYW1lOiBuZXdBLmJ1aWxkTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IG5ld0EuYnVpbGRMdixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwiJXMlZOe6p1wiLCBuZXdBLmJ1aWxkTmFtZSwgbmV3QS5idWlsZEx2KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS51cGRhdGVfcGxheWVyX3Njb3JlX2RhdGFfcmVxdWVzdChnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEudG90YWxfc3Rhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld04gPSBnbS5jb25zdC5SRVBPUlRfQlVJTERJTkdfVVBHUkFERV9NQVBbbmV3RS5idWlsZFR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgbmV3QS5idWlsZEx2ICYmIG5ld0EuYnVpbGRMdiA8IG5ld04ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1MgPSBuZXdOW25ld0EuYnVpbGRMdiAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KG5ld1MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gbmV3QS5idWlsZEx2ICYmIG5ld0UuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkxhZGRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIShnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlIHx8IG5ld0UuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uQkFSUkFDS1NfVFlQRSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG5ld0UuYnVpbGRUeXBlLCBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmIDMgPD0gdGhpcy5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKS5idWlsZEx2bCAmJiBuZXdFLmJ1aWxkVHlwZSAhPSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLmNoZWNrU2hvcnRjdXQoKHJlc3VsdDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIgPD0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQWRkRGVza3RvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0UuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW25ld08uY2VsbElEXS5pdGVtSUQgPSBuZXdBLmJ1aWxkSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXdPLmJ1aWxkSUQgPSBuZXdBLmJ1aWxkSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Ty5idWlsZEx2bCA9IG5ld0EuYnVpbGRMdjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IG5ld0EuY3VycmVuY3kgJiYgMiA8PSBuZXdBLnJhdGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3Ty5wcm9kdWN0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ty5wcm9kdWN0RGF0YSA9IG5ldyBSb2xlUHJvZHVjdERhdGFWTztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEucHJvZHVjdENkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEucHJvZHVjdE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPLnByb2R1Y3REYXRhLm1heE51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPLnByb2R1Y3REYXRhLmZ1bGxUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEucHJvZHVjdElEID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEuYmVnaW5UaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEuY3VyTnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPLnByb2R1Y3REYXRhLnByb2R1Y3RJRCA9IG5ld0EuY3VycmVuY3k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEucHJvZHVjdENkID0gbmV3QS5yYXRlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPLnByb2R1Y3REYXRhLnByb2R1Y3ROdW0gPSBuZXdBLnJhdGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEubWF4TnVtID0gbmV3QS5jYXBhY2l0eTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdFLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlBSSVZBVEVIT1VTSU5HX1RZUEUgJiYgMCA9PSBuZXdFLmJ1aWxkTHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ucHJvZHVjdERhdGEuY3VyTnVtID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ty5wcm9kdWN0RGF0YS5iZWdpblRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gbmV3Ty5wcm9kdWN0RGF0YS5mdWxsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ty5wcm9kdWN0RGF0YS5mdWxsVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMykgKyBNYXRoLnJvdW5kKChuZXdPLnByb2R1Y3REYXRhLm1heE51bSAtIG5ld08ucHJvZHVjdERhdGEuY3VyTnVtKSAvIG5ld08ucHJvZHVjdERhdGEucHJvZHVjdE51bSkgKiBuZXdPLnByb2R1Y3REYXRhLnByb2R1Y3RDZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Ty5tZXRyYWlsRGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gbmV3Ty51cE5lZWRDb2luID0gMDsgaW5kZXggPCBuZXdBLmNvbnN1bWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdBLmNvbnN1bWVbaW5kZXhdID09IFJld2FyZElkRW51bS5HT0xEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPLnVwTmVlZENvaW4gPSBuZXdBLm51bVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChuZXdBLmNvbnN1bWVbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdPLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ty5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdID0ge30gYXMgbWV0cmFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ty5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmlkID0gbmV3QS5jb25zdW1lW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0ubWF4ID0gbmV3QS5udW1baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld08ubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0d1aWRlIHx8IG5ld0EuYnVpbGRUeXBlICE9IEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRSB8fCB0aGlzLnJlc2V0QmFycmVsVGltZShuZXdPLnByb2R1Y3REYXRhKSwgMCA8IG5ld0EubG9ja0FyZWFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5yb2xlU2hvd0FyZWFJRExpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlU2hvd0FyZWFJRExpc3RbaW5kZXhdID09IG5ld0EubG9ja0FyZWFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk5ld0FyZWFCeUlEKG5ld0EubG9ja0FyZWFJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ20uY29uc3QubG9jYWxDbG91ZEFyZWFMaXN0W25ld0EubG9ja0FyZWFJRF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5sb2NrTmV3QXJlYUlEKG5ld0EubG9ja0FyZWFJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICg1MTAwMSA9PSBuZXdBLmJ1aWxkSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEVdLmNlbGxJRCA9IDM5NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd0FyZWFJRCA9IG5ld0Euc2hvd0FyZWFJRCBhcyBudW1iZXJbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaG93QXJlYUlELmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTmV3QXJlYUJ5SUQoc2hvd0FyZWFJRFtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzR3VpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmxvY2tNYWluVUkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dfdGFza19tYWluX2VudHJ5X2d1aWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bSg1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNldEJhcnJlbE5vZGVBY3RpdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnBsYXlHdWlkZUJhcnJlbEZseSg1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gMjM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5hdXRvQ29tcG9zZS5ub2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiY29pbl9jaGFuZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0EuYnVpbGRJRDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdFLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEUgJiYgMCA9PSBuZXdFLmJ1aWxkTHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGRDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRCh0aGlzLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEVdLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDZmcgJiYgMiA8PSBidWlsZENmZy5yYXRlLmxlbmd0aCAmJiAyIDw9IGJ1aWxkQ2ZnLnJhdGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb2xlUHJvZHVjdERhdGEgPSBuZXcgUm9sZVByb2R1Y3REYXRhVk87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlUHJvZHVjdERhdGEucHJvZHVjdElEID0gYnVpbGRDZmcuY3VycmVuY3k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlUHJvZHVjdERhdGEucHJvZHVjdENkID0gYnVpbGRDZmcucmF0ZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVQcm9kdWN0RGF0YS5wcm9kdWN0TnVtID0gYnVpbGRDZmcucmF0ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVQcm9kdWN0RGF0YS5tYXhOdW0gPSBidWlsZENmZy5jYXBhY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVQcm9kdWN0RGF0YS5iZWdpblRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZVByb2R1Y3REYXRhLmZ1bGxUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRCYXJyZWxUaW1lKHJvbGVQcm9kdWN0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSArPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVQcm9kdWN0RGF0YS5mdWxsVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdFLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlNUQUxMX1RZUEUgJiYgMCA9PSBuZXdFLmJ1aWxkTHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fMTVfVU5MT0NLX1NUT1JFKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdFLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IG5ld0UuYnVpbGRMdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0RGVmYW5zZURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS50b3RhbF9zdGFyID0gZ20uZGF0YS5sYWRkZXJfZGF0YS5sYWRkZXJfc3RhcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NjID0gZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLnRvdGFsX3N0YXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnVwZGF0ZV9wbGF5ZXJfZGF0YV9yZXF1ZXN0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIxLnVwZGF0ZSBiZWZvcmU6XCIgKyBuZXdDYyArIFwiIHVwZGF0ZSBhZnRlcjpcIiArIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS50b3RhbF9zdGFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkRFRkVOU0UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZGVpZDogbnVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZGVkZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCIlZC7ngrnlh7slc+WNh+e6p1wiLCBudW0sIG5ld0UuYnVpbGROYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZV9idWlsZF9sb2NrX251bSsrLCBnbS51aS5lbWl0KFwidW5Mb2NrTmV3QXJlYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdIaCA9IFRlbXBEYXRhLmdldEJ1aWxkR3VpZGVNZXJ0YXJpbERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0hoICYmIG5ld0hoLmJ1aWxkSUQgPT0gdCAmJiAwIDwgbmV3SGgubWV0cmFpbExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gbmV3SGgubWV0cmFpbExpc3QubGVuZ3RoIC0gMTsgMCA8PSBpbmRleDsgaW5kZXgtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0hoLm1ldHJhaWxMaXN0W2luZGV4XS5pdGVtTnVtID4gbmV3SGgubWV0cmFpbExpc3RbaW5kZXhdLm5lZWROdW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGl0SXRlbU51bShuZXdIaC5tZXRyYWlsTGlzdFtpbmRleF0uaXRlbU51bSAtIG5ld0hoLm1ldHJhaWxMaXN0W2luZGV4XS5uZWVkTnVtLCBuZXdIaC5tZXRyYWlsTGlzdFtpbmRleF0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbENlbGxJdGVtQnlDZWxsSUQobmV3SGgubWV0cmFpbExpc3RbaW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIG5ld0hoLm1ldHJhaWxMaXN0W2luZGV4XS5jZWxsSUQpLCBuZXdIaC5tZXRyYWlsTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3RS5idWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5CQVJSQUNLU19UWVBFICYmIDAgPD0gbmV3QS5yYXRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmV3QS5yYXRlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWVsVW5sY29rSGVybyhuZXdBLnJhdGVbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX2J1aWxkX3Rhc2tfcHJvZ3Jlc3MobmV3QS5idWlsZFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCdWlsZFByb2R1Y3QgPSBmdW5jdGlvbiAodDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVpbGREYXRhW3RdLnByb2R1Y3REYXRhICYmIHQgIT0gQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3REYXRhID0gdGhpcy5idWlsZERhdGFbdF0ucHJvZHVjdERhdGE7XHJcbiAgICAgICAgICAgIGxldCBjb2luOiBudW1iZXJcclxuICAgICAgICAgICAgaWYgKDAgPT0gcHJvZHVjdERhdGEuZnVsbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvaW4gPSBwcm9kdWN0RGF0YS5jdXJOdW07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvZHVjdERhdGEuZnVsbFRpbWUgPiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdERhdGEuYmVnaW5UaW1lICsgcHJvZHVjdERhdGEucHJvZHVjdENkID4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvaW4gPSBwcm9kdWN0RGF0YS5jdXJOdW07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvaW4gPSBNYXRoLmZsb29yKChNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpIC0gcHJvZHVjdERhdGEuYmVnaW5UaW1lKSAvIHByb2R1Y3REYXRhLnByb2R1Y3RDZCAqIHByb2R1Y3REYXRhLnByb2R1Y3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29pbiA9IHByb2R1Y3REYXRhLm1heE51bTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKDAgPCBjb2luKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLmJ1aWxkRGF0YVt0XS5wcm9kdWN0RGF0YS5wcm9kdWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaS50eXBlID09IFByb3BUeXBlRW51bS5DT0lOX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCBjb2luKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IGNvaW47IG8rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXYXJlSG91c2VJdGVtKHByb2R1Y3REYXRhLnByb2R1Y3RJRCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcInNoaXBfZ29vZHNfY2hhbmdlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGF0YVt0XS5wcm9kdWN0RGF0YS5jdXJOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW3RdLnByb2R1Y3REYXRhLmJlZ2luVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZERhdGFbdF0ucHJvZHVjdERhdGEuZnVsbFRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxZTMpICsgTWF0aC5yb3VuZCgocHJvZHVjdERhdGEubWF4TnVtIC0gcHJvZHVjdERhdGEuY3VyTnVtKSAvIHByb2R1Y3REYXRhLnByb2R1Y3ROdW0pICogcHJvZHVjdERhdGEucHJvZHVjdENkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlQnVpbGRDZWxsUG9zKHQ6IG51bWJlciwgZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVpbGREYXRhW3RdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW3RdLmNlbGxJRCA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkQnVpbGRNZXRyYWlsKHQ6IG51bWJlciwgZTogbnVtYmVyLCBhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBidWlsZERhdGEgPSB0aGlzLmJ1aWxkRGF0YVt0XTtcclxuICAgICAgICBpZiAoYnVpbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtlXS5jdXIgKz0gYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRXYXRlckJhcnJlbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLndhdGVyQmFycmVsTGlzdCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtjYy52MygyNTcsIC0xMDg3KSwgY2MudjMoMjk1LCAtMTE0NSksIGNjLnYzKDM3NywgLTEwODMpXTtcclxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHBvc2l0aW9ucy5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICBjb25zdCBhID0gbmV3IHJvbGVCYXJyZWxJdGVtVk8oKTtcclxuICAgICAgICAgICAgYS5pdGVtSUQgPSAxMTAwNjtcclxuICAgICAgICAgICAgYS5pdGVtSW5kZXggPSBlO1xyXG4gICAgICAgICAgICBhLml0ZW1Qb3MgPSBwb3NpdGlvbnNbZV07XHJcbiAgICAgICAgICAgIHRoaXMud2F0ZXJCYXJyZWxMaXN0LnB1c2goYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0QmFycmVsVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNHdWlkZSAmJiB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSA8IHRoaXMucm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSA+IHRoaXMucm9sZUJhcnJlbERhdGEuY3VyRnJlZUJhcnJlbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSArICh0aGlzLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSAtIHRoaXMucm9sZUJhcnJlbERhdGEuY3VyRnJlZUJhcnJlbFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSArIHRoaXMucm9sZUJhcnJlbERhdGEuZnJlZUJhcnJlbENkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldEJhcnJlbFRpbWUodDogeyBtYXhOdW06IG51bWJlcjsgcHJvZHVjdE51bTogbnVtYmVyOyBwcm9kdWN0Q2Q6IG51bWJlciB9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0gPSB0Lm1heE51bTtcclxuICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsTnVtID0gdC5wcm9kdWN0TnVtO1xyXG4gICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEuZnJlZUJhcnJlbENkID0gdC5wcm9kdWN0Q2Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEJhcnJlbE51bSh0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSArPSB0O1xyXG4gICAgICAgIGlmICh0aGlzLmlzR3VpZGUgfHwgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPj0gdGhpcy5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0pIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMWUzKSArIHRoaXMucm9sZUJhcnJlbERhdGEuZnJlZUJhcnJlbENkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaF9iYXJyZWxfbnVtXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkRnJlZUJhcnJlbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPj0gdGhpcy5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0pIHtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJCYXJyZWxOdW0gPSBNYXRoLm1pbih0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckJhcnJlbE51bSArIHRoaXMucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxOdW0sIHRoaXMucm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtID49IHRoaXMucm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZSA9IDA7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEubmV4dEZyZWVCYXJyZWxUaW1lID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgKyB0aGlzLnJvbGVCYXJyZWxEYXRhLmZyZWVCYXJyZWxDZDtcclxuICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVkdWNlQmFycmVsTnVtKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtLS07XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtIDwgdGhpcy5yb2xlQmFycmVsRGF0YS5tYXhCYXJyZWxOdW0gJiYgMCA9PSB0aGlzLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5uZXh0RnJlZUJhcnJlbFRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSArIHRoaXMucm9sZUJhcnJlbERhdGEuZnJlZUJhcnJlbENkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlQmFycmVsRGF0YS5jdXJGcmVlQmFycmVsVGltZSA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm9sZUJhcnJlbERhdGEuY3VyQmFycmVsTnVtID49IHRoaXMucm9sZUJhcnJlbERhdGEubWF4QmFycmVsTnVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLm5leHRGcmVlQmFycmVsVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVCYXJyZWxEYXRhLmN1ckZyZWVCYXJyZWxUaW1lID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TWFwSGF2ZVNwZWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVTcGFjZUxpc3QubGVuZ3RoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZU1hcEl0ZW1EYXRhQnlJRCh0OiBudW1iZXIsIGU6IG51bWJlciwgYTogbnVtYmVyLCBpOiBudW1iZXIgPSAwLCBvOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbdF0pIHtcclxuICAgICAgICAgICAgaWYgKDAgPT0gZSAmJiAwID09IGEgJiYgbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxEZWZlbnNlRGF0YUJ5SUQodGhpcy5yb2xlX21hcF9kYXRhW3RdLmhlcm9VSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQgPSBhO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbVR5cGUgPSBlO1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaGVyb1VJRCA9IGk7XHJcbiAgICAgICAgICAgIGlmIChvICYmIDAgPCBhICYmIGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbiA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoYSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobiAmJiAwIDwgbi5vY2N1cGF0aW9uICYmIDEwICE9IG4ub2NjdXBhdGlvbiAmJiAxMSAhPSBuLm9jY3VwYXRpb24gJiYgMTIgIT0gbi5vY2N1cGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW3RdLmhlcm9VSUQgPSB0aGlzLmhlcm9Ub3RhbE51bTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9Ub3RhbE51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuQ2FzZSh0OiBudW1iZXIsIGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVfb3BlbkJhcnJlbF9UaW1lcyA+IHRoaXMuaW5pdE9wZW5CYXJyZWxEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBhID0gMDtcclxuICAgICAgICAgICAgaWYgKGUgPT0gUmV3YXJkSWRFbnVtLkJBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRSYW5kb21JRCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YV9hcnJheShcIlBvb2xDb25maWdEYXRhXCIsIHJhbmRvbSArIFwiXCIpIGFzIFBvb2xDb25maWdbXTtcclxuICAgICAgICAgICAgICAgIGEgPSBnbS5jb25maWcuZ2V0X3JhbmRvbV9jYXNlKHJvdyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZSA9PSBSZXdhcmRJZEVudW0uU0lMVkVSX0JBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgYSA9IDMxMDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZSA9PSBSZXdhcmRJZEVudW0uR09MRF9CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgIGEgPSAzMDAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YV9hcnJheShcIlBvb2xDb25maWdEYXRhXCIsIGEgKyBcIlwiKSBhcyBQb29sQ29uZmlnW107XHJcbiAgICAgICAgICAgIGlmIChlID09IFJld2FyZElkRW51bS5HT0xEX0JBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdW5sb2NrID0gdGhpcy5nZXRfdW5sb2NrX2hlcm9fYXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSByb3dEYXRhLmxlbmd0aCAtIDE7IDAgPD0gbjsgbi0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVubG9jay5pbmRleE9mKHJvd0RhdGFbbl0ucHJvcCkgPD0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93RGF0YS5zcGxpY2UobiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGFycjogUm9sZUl0ZW1EYXRhVk9bXSA9IFtdO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnNldFJhbmRvbVJld2FyZChyb3dEYXRhLCBhcnIsIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtSUQgPSBhcnJbMF0uaXRlbUlEO1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtVHlwZSA9IGFyclswXS5pdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQodCwgaXRlbVR5cGUsIGl0ZW1JRCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJc1BsYXlJdGVtU291bmQoaXRlbUlEKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRSb2xlSXRlbShpdGVtSUQsIHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhc2tJRCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0Q2Fza0lEQnlTb3J0SWQodGhpcy5yb2xlX29wZW5CYXJyZWxfVGltZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRCh0LCBjYXNrSURbMF0sIGNhc2tJRFsxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJc1BsYXlJdGVtU291bmQoY2Fza0lEWzFdKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRSb2xlSXRlbShjYXNrSURbMV0sIHQpO1xyXG4gICAgICAgICAgICBpZiAoZSAhPSBSZXdhcmRJZEVudW0uQkFSUkVMKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLlvJXlr7zpmLbmrrXvvIzmiZPlvIDmobbnmoTlpZblirHotbDphY3nva5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDMwMTAxKTtcclxuICAgICAgICB0aGlzLnJvbGVfb3BlbkJhcnJlbF9UaW1lcyArPSAxO1xyXG4gICAgICAgIGdtLmRhdGEudGFza19kYXRhLnVwZGF0ZV90YXNrX3Byb2dyZXNzKFRhc2tDb25kaXRpb25UeXBlLkJSRUFLX0JBUlJFTCk7XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5TdG9uZUhlcm8odDogbnVtYmVyLCBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChlKTtcclxuICAgICAgICBpZiAoaXRlbUNmZykge1xyXG4gICAgICAgICAgICB0aGlzLmRlbENlbGxJdGVtQnlDZWxsSUQodCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZUl0ZW0oaXRlbUNmZy5uZXh0LCB0KTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQodCwgSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSwgaXRlbUNmZy5uZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJhbmRvbVN0b25lSGVybyh0OiBudW1iZXIsIGU6IG51bWJlciwgYTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZURhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhX2FycmF5KFwiUG9vbENvbmZpZ0RhdGFcIiwgZSArIFwiXCIpIGFzIFBvb2xDb25maWdbXTtcclxuICAgICAgICBjb25zdCBhcnI6IFJvbGVJdGVtRGF0YVZPW10gPSBbXTtcclxuICAgICAgICBnbS5kYXRhLnNldFJhbmRvbVJld2FyZChlRGF0YSwgYXJyLCBhKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBhcnIubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRXYXJlSG91c2VJdGVtKGFycltvXS5pdGVtSUQsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kZWxDZWxsSXRlbUJ5Q2VsbElEKHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lzUGxheUl0ZW1Tb3VuZCh0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoMzAwMDAgPD0gdCkge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgdCArIFwiXCIpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgIGlmIChyb3cgJiYgcm93LmdldF9tZXJnZV9hdWRpbykge1xyXG4gICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3Qocm93LmdldF9tZXJnZV9hdWRpby50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzE2MV9DT01QT1NFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHQpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcuc291bmRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGl0ZW1DZmcuc291bmRJRCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzE2MV9DT01QT1NFKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrQnVpbGRTdGF0ZSh0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1aWxkQ2ZnICYmIHRoaXMucm9sZV9tYXBfZGF0YVtidWlsZENmZy5jZWxsSURdID8gMiA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VDZWxsSUQodDogbnVtYmVyLCBlOiBudW1iZXIsIGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0ID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSB0aGlzLml0ZW1EYXRhW2l0ZW1Db25maWcudHlwZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IGl0ZW1EYXRhLmxlbmd0aDsgbysrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGFbb10uY2VsbElEID09IGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW29dLmNlbGxJRCA9IGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0ID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvRGF0YSA9IHRoaXMuaGVyb0RhdGFbaGVyb0NvbmZpZy5vY2N1cGF0aW9uXTtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgaGVyb0RhdGEubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9EYXRhW29dLmNlbGxJRCA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YVtvXS5jZWxsSUQgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRJdGVtQ2VsbElEQW5kSXRlbUlEKGl0ZW1UeXBlOiBudW1iZXIsIGNlbGxJRDogbnVtYmVyLCBuZXdDZWxsSUQ6IG51bWJlciwgaXRlbUlEOiBudW1iZXIsIG9wdGlvbmFsUGFyYW06IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkJVSUxEX1RZUEUpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGRDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICBpZiAoYnVpbGRDZmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGREYXRhW2J1aWxkQ2ZnLmJ1aWxkVHlwZV0uY2VsbElEID0gbmV3Q2VsbElEO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoMCAhPSBpdGVtSUQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29uZmlnSUQgPSA5OTkgPT0gY2VsbElEID8gb3B0aW9uYWxQYXJhbSA6IGNlbGxJRDtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IDMwMDAwIDwgaXRlbUlEID8gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSA6IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEU7XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2NvbmZpZ0lEXS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gdGhpcy5pdGVtRGF0YVtpdGVtQ29uZmlnLnR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpdGVtRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGFbaW5kZXhdLmNlbGxJRCA9PSBjZWxsSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQoaXRlbUlEKS50eXBlID09IGl0ZW1Db25maWcudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbURhdGFbaW5kZXhdLmNlbGxJRCA9IG5ld0NlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2luZGV4XS5pdGVtSUQgPSBpdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlSXRlbShpdGVtSUQsIG5ld0NlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbY29uZmlnSURdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSB0aGlzLml0ZW1EYXRhW2l0ZW1Db25maWcudHlwZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGl0ZW1EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJvbGVJdGVtKGl0ZW1JRCwgbmV3Q2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gSXRlbVR5cGVFbnVtLkJVSUxEX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbY29uZmlnSURdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSB0aGlzLml0ZW1EYXRhW2l0ZW1Db25maWcudHlwZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGl0ZW1EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YVtpbmRleF0uY2VsbElEID0gbmV3Q2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVtjb25maWdJRF0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvRGF0YSA9IHRoaXMuaGVyb0RhdGFbaGVyb0NvbmZpZy5vY2N1cGF0aW9uXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaGVyb0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9EYXRhW2luZGV4XS5jZWxsSUQgPT0gY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLnNwbGljZShpbmRleCwgMSksIHRoaXMuYWRkUm9sZUl0ZW0oaXRlbUlELCBuZXdDZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBJdGVtVHlwZUVudW0uSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2NvbmZpZ0lEXS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhID0gdGhpcy5oZXJvRGF0YVtoZXJvQ29uZmlnLm9jY3VwYXRpb25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBoZXJvRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0RhdGFbaW5kZXhdLmNlbGxJRCA9PSBjZWxsSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaXRlbUlEKS5vY2N1cGF0aW9uID09IGhlcm9Db25maWcub2NjdXBhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGFbaW5kZXhdLmNlbGxJRCA9IG5ld0NlbGxJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhW2luZGV4XS5pdGVtSUQgPSBpdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlSXRlbShpdGVtSUQsIG5ld0NlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IEl0ZW1UeXBlRW51bS5CVUlMRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2NvbmZpZ0lEXS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhID0gdGhpcy5oZXJvRGF0YVtoZXJvQ29uZmlnLm9jY3VwYXRpb25dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9EYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvRGF0YVtpbmRleF0uY2VsbElEID09IGNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YVtpbmRleF0uY2VsbElEID0gbmV3Q2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRCYXJyYWNrc0lEVG9MaXN0KHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmFycmFja3NfdW5sb2NrX2lkX2xpc3RbdF0gPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tIZXJvSURJc1VuTG9jayh0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAobGV0IGUgPSAwOyBlIDwgdGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YS5sZW5ndGg7IGUrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYXJyYWNrc191bmxvY2tfZGF0YVtlXS5oZXJvSWQgPT0gdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJhcnJhY2tzX3VubG9ja19kYXRhW2VdLnN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlU2luZ2xlU3VwZXJIZXJvQ2VsbElEKHQ6IG51bWJlciwgZTogbnVtYmVyLCBhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoMzAwMDAgPCB0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGkgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHQpO1xyXG4gICAgICAgICAgICBpZiAoaSAmJiBpLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHRoaXMuc3VwZXJIZXJvRGF0YS5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1cGVySGVyb0RhdGFbb10uaGVyb2lkID09IHQgJiYgdGhpcy5zdXBlckhlcm9EYXRhW29dLmNlbGxJRCA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtvXS5jZWxsSUQgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVsU2luZ2xlU3VwZXJIZXJvQ2VsbElEKHQ6IG51bWJlciwgZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKDMwMDAwIDwgdCkge1xyXG4gICAgICAgICAgICBjb25zdCBhID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRCh0KTtcclxuICAgICAgICAgICAgaWYgKGEgJiYgYS5oZXJvX3R5cGUgPT09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdXBlckhlcm9EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJIZXJvRGF0YVtpXS5oZXJvaWQgPT09IHQgJiYgdGhpcy5zdXBlckhlcm9EYXRhW2ldLmNlbGxJRCA9PT0gZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGEuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNlbGxEYXRhKHQ6IG51bWJlciwgZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKDAgIT0gdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCAmJiAxODYgIT0gZSkge1xyXG4gICAgICAgICAgICBpZiAoMzk1ICE9IGUgJiYgMzEzICE9IGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgwID09IHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5CVUlMRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZENmZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZERhdGFbYnVpbGRDZmcuYnVpbGRUeXBlXS5jZWxsSUQgPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQ2VsbElEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtVHlwZSwgdCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNpbmdsZVN1cGVySGVyb0NlbGxJRCh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlELCB0LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURlZmVuc2VIZXJvVUlEQ2VsbCh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaGVyb1VJRCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQoZSwgdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlLCB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlELCB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaGVyb1VJRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTWFwSXRlbURhdGFCeUlEKHQsIDAsIDAsIDAsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucm9sZVNwYWNlTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgPT0gdGhpcy5yb2xlU3BhY2VMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlU3BhY2VMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0VtaXRXYWxsRXZlbnQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCwgdCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlU3BhY2VDZWxsQnlJRCh0KTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xNjBfQ0hBTkdFUE9TKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtVHlwZSAhPSBJdGVtVHlwZUVudW0uQlVJTERfVFlQRSB8fCB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbVR5cGUgIT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbVR5cGUgIT0gSXRlbVR5cGVFbnVtLkJVSUxEX1RZUEUgfHwgdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlICE9IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSEVST19UWVBFICYmIHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbUlEKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoZXJvQ2ZnKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaGVyb0NmZy5uZXh0TmVlZEl0ZW0ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCBoZXJvQ2ZnLm5leHROZWVkSXRlbVtpbmRleF0gJiYgaGVyb0NmZy5uZXh0TmVlZEl0ZW1baW5kZXhdID09IHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0lEID0gdGhpcy5jaGVja0hlcm9JRElzVW5Mb2NrKGhlcm9DZmcubmV4dEx2W2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhcnJhY2tzX3VubG9ja19pZF9saXN0W2hlcm9DZmcubmV4dE5lZWRTb3J0W2luZGV4XV0gPD0gMCB8fCAhdGhpcy5iYXJyYWNrc191bmxvY2tfaWRfbGlzdFtoZXJvQ2ZnLm5leHROZWVkU29ydFtpbmRleF1dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIk7Dom5nIGPhuqVwIGRvYW5oIHRy4bqhaSB2w6Aga8OtY2ggaG/huqF0IGN14buZbiBnaeG6pXkgxJHhu4MgdOG7lW5nIGjhu6NwIGFuaCBow7luZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSXNQbGF5SXRlbVNvdW5kKGhlcm9JRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVyb0RhdGFbaGVyb0NmZy5vY2N1cGF0aW9uXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb0RhdGFbaGVyb0NmZy5vY2N1cGF0aW9uXVtpXS5jZWxsSUQgPT0gZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb0RhdGFbaGVyb0NmZy5vY2N1cGF0aW9uXS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlSXRlbShoZXJvQ2ZnLm5leHRMdltpbmRleF0sIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvSVMgPSB0aGlzLmdldEhlcm9Jc0RlZmFuc2VCeUNlbGxJRCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxEZWZlbnNlRGF0YUJ5SUQodGhpcy5yb2xlX21hcF9kYXRhW2VdLmhlcm9VSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbFJvbGVJdGVtKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRChlLCBJdGVtVHlwZUVudW0uSEVST19UWVBFLCBoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9JUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm9JdGVtVk8gPSBuZXcgRGVmZW5zZUhlcm9JdGVtVk87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0l0ZW1WTy5jZWxsSUQgPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm9JdGVtVk8uaGVyb1VJRCA9IHRoaXMucm9sZV9tYXBfZGF0YVtlXS5oZXJvVUlEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm9JdGVtVk8uaGVyb2lkID0gdGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGVmZW5zZURhdGFCeUlEKGRlZmVuc2VIZXJvSXRlbVZPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bmxvY2tCb29rSXRlbShJdGVtVHlwZUVudW0uSEVST19UWVBFLCBoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5NRVJHRV9IRVJPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX3Rhc2tfcHJvZ3Jlc3MoVGFza0NvbmRpdGlvblR5cGUuTUVSR0UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVBZGRDb21wc2VUaW1lcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gaGVyb0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvc2l0ZVVubG9ja0hlcm8oaGVyb0NmZy5uZXh0THZbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaG93SGVyb1VubG9ja0FuaShoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0VtaXRXYWxsRXZlbnQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCwgdCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgZ20udWkubWFwTWFpblVJLnBsYXlDb21wb3NlQW5pbShlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUgJiYgdGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoZXJvQ2ZnKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9DZmcubmV4dE5lZWRJdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDwgaGVyb0NmZy5uZXh0TmVlZEl0ZW1baW5kZXhdICYmIGhlcm9DZmcubmV4dE5lZWRJdGVtW2luZGV4XSA9PSB0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9JUyA9IHRoaXMuY2hlY2tIZXJvSURJc1VuTG9jayhoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iYXJyYWNrc191bmxvY2tfaWRfbGlzdFtoZXJvQ2ZnLm5leHROZWVkU29ydFtpbmRleF1dIDw9IDAgfHwgIXRoaXMuYmFycmFja3NfdW5sb2NrX2lkX2xpc3RbaGVyb0NmZy5uZXh0TmVlZFNvcnRbaW5kZXhdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJD4bqnbiBuw6JuZyBj4bqlcCBj4bqlcCBkb2FuaCB0cuG6oWkgdsOgIGvDrWNoIGhv4bqhdCBjdeG7mW4gZ2nhuqV5IMSR4buDIHThu5VuZyBo4bujcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJc1BsYXlJdGVtU291bmQoaGVyb0lTKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEhlcm9Jc0RlZmFuc2VCeUNlbGxJRCA9IHRoaXMuZ2V0SGVyb0lzRGVmYW5zZUJ5Q2VsbElEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxSb2xlSXRlbSh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlELCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0odGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbERlZmVuc2VEYXRhQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaGVyb1VJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRChlLCBJdGVtVHlwZUVudW0uSEVST19UWVBFLCBoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQodCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFJvbGVJdGVtKGhlcm9DZmcubmV4dEx2W2luZGV4XSwgZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEhlcm9Jc0RlZmFuc2VCeUNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvSXRlbVZPID0gbmV3IERlZmVuc2VIZXJvSXRlbVZPO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvSXRlbVZPLmNlbGxJRCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm9JdGVtVk8uaGVyb1VJRCA9IHRoaXMucm9sZV9tYXBfZGF0YVtlXS5oZXJvVUlEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvSXRlbVZPLmhlcm9pZCA9IHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREZWZlbnNlRGF0YUJ5SUQoZGVmZW5zZUhlcm9JdGVtVk8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUFkZENvbXBzZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PSBoZXJvSVMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvc2l0ZVVubG9ja0hlcm8oaGVyb0NmZy5uZXh0THZbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVubG9ja0Jvb2tJdGVtKEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUsIGhlcm9DZmcubmV4dEx2W2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5NRVJHRV9IRVJPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEudGFza19kYXRhLnVwZGF0ZV90YXNrX3Byb2dyZXNzKFRhc2tDb25kaXRpb25UeXBlLk1FUkdFKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0VtaXRXYWxsRXZlbnQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCwgdCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkucGxheUNvbXBvc2VBbmltKGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxID09IGhlcm9JUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9zaXRlVW5sb2NrSGVybyhoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaG93SGVyb1VubG9ja0FuaShoZXJvQ2ZnLm5leHRMdltpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSEVST19UWVBFICYmIEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUgPT0gdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGVyb0NmZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSGVyb0NmZ0J5SUQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtSUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUhlcm9DZmdCeUlEKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PSB0aGlzLnJvbGVfY29tcG9zZV90b3RhbF90aW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiQuG6oW4gY+G6p24gaG/DoG4gdGjDoG5oIHBo4bqnbiB2xakga2jDrSB2w6AgaMaw4bubbmcgZOG6q24gZMOibiBsw6BuZyFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ2ZnLmhlcm9pZCA9PSBIZXJvQ2ZnQnlJRC5oZXJvaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBoZXJvQ2ZnLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJEw6JuIGzDoG5nIGPhuqduIHThu5VuZyBo4bujcCB2xakga2jDrSEhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDExID09IGhlcm9DZmcub2NjdXBhdGlvbiB8fCAxMiA9PSBoZXJvQ2ZnLm9jY3VwYXRpb24gfHwgMSA9PSBoZXJvQ2ZnLmhlcm9fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBoZXJvQ2ZnLm5leHRMdlswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCLEkMOjIMSR4bqhdCDEkeG6v24gY+G6pXAgxJHhu5kgY2FvIG5o4bqldCEhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMyA9PSBoZXJvQ2ZnLmx2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwixJDDoyDEkeG6oXQgxJHhur9uIGPhuqVwIMSR4buZIGNhbyBuaOG6pXQhISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChIZXJvQ2ZnQnlJRC5vY2N1cGF0aW9uID09IGhlcm9DZmcub2NjdXBhdGlvbiAmJiAwIDwgaGVyb0NmZy5uZXh0TmVlZEl0ZW1bMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZXJvQ2ZnLm5leHROZWVkSXRlbS5sZW5ndGg7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9DZmcubmV4dE5lZWRJdGVtW3ldID09IEhlcm9DZmdCeUlELmhlcm9pZCAmJiB0aGlzLmNoZWNrSGVyb0lESXNVbkxvY2soSGVyb0NmZ0J5SUQubmV4dEx2W3ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChIZXJvQ2ZnQnlJRC5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgdGhpcy5zdXBlckhlcm9EYXRhLmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdXBlckhlcm9EYXRhW3JdLmhlcm9pZCA9PSBoZXJvQ2ZnLmhlcm9pZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5jZWxsSUQgPT0gdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgPT0gdGhpcy5zdXBlckhlcm9EYXRhW3JdLmhlcm9TdGF0ZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5oZXJvaWQgPT0gaGVyb0NmZy5oZXJvaWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGFbcl0uY2VsbElEID09IGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09IHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5oZXJvU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJTacOqdSBhbmggaMO5bmcga2jDtG5nIHRo4buDIHThu5VuZyBo4bujcCB0cm9uZyBxdcOhIHRyw6xuaCBo4buTaSBzaW5oXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMuc3VwZXJIZXJvRGF0YS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5oZXJvaWQgPT0gaGVyb0NmZy5oZXJvaWQgJiYgdGhpcy5zdXBlckhlcm9EYXRhW3JdLmNlbGxJRCA9PSBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW3JdLmhlcm9pZCA9IEhlcm9DZmdCeUlELm5leHRMdlt5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChIZXJvQ2ZnQnlJRC5uZXh0THZbeV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5ocCA9IGhlcm9DZmcuaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5tYXhIcCA9IGhlcm9DZmcuaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwZXJIZXJvRGF0YVtyXS5jdXJSZWxpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXBlckhlcm9EYXRhW3JdLm5leHRSZWxpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgdGhpcy5zdXBlckhlcm9EYXRhLmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdXBlckhlcm9EYXRhW3JdLmhlcm9pZCA9PSBoZXJvQ2ZnLmhlcm9pZCAmJiB0aGlzLnN1cGVySGVyb0RhdGFbcl0uY2VsbElEID09IHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGEuc3BsaWNlKHIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvSURJID0gdGhpcy5jaGVja0hlcm9JRElzVW5Mb2NrKEhlcm9DZmdCeUlELm5leHRMdlt5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0lzUGxheUl0ZW1Tb3VuZChoZXJvSURJKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvSVMgPSB0aGlzLmdldEhlcm9Jc0RlZmFuc2VCeUNlbGxJRCh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhlcm9JUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEhlcm9Jc0RlZmFuc2VCeUNlbGxJRCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmhlcm9EYXRhW2hlcm9DZmcub2NjdXBhdGlvbl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb0RhdGFbaGVyb0NmZy5vY2N1cGF0aW9uXVtpXS5jZWxsSUQgPT0gZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvRGF0YVtoZXJvQ2ZnLm9jY3VwYXRpb25dW2ldLml0ZW1JRCA9IEhlcm9DZmdCeUlELm5leHRMdlt5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbFJvbGVJdGVtKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsRGVmZW5zZURhdGFCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVtlXS5oZXJvVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1hcEl0ZW1EYXRhQnlJRChlLCBJdGVtVHlwZUVudW0uSEVST19UWVBFLCBIZXJvQ2ZnQnlJRC5uZXh0THZbeV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0lTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvSXRlbVZPID0gbmV3IERlZmVuc2VIZXJvSXRlbVZPO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0l0ZW1WTy5jZWxsSUQgPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0l0ZW1WTy5oZXJvVUlEID0gdGhpcy5yb2xlX21hcF9kYXRhW2VdLmhlcm9VSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvSXRlbVZPLmhlcm9pZCA9IHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGVmZW5zZURhdGFCeUlEKGRlZmVuc2VIZXJvSXRlbVZPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUFkZENvbXBzZVRpbWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gaGVyb0lESSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvc2l0ZVVubG9ja0hlcm8oSGVyb0NmZ0J5SUQubmV4dEx2W3ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dIZXJvVW5sb2NrQW5pKEhlcm9DZmdCeUlELm5leHRMdlt5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVubG9ja0Jvb2tJdGVtKEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUsIEhlcm9DZmdCeUlELm5leHRMdlt5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX3Rhc2tfcHJvZ3Jlc3MoVGFza0NvbmRpdGlvblR5cGUuTUVSR0VfSEVSTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX3Rhc2tfcHJvZ3Jlc3MoVGFza0NvbmRpdGlvblR5cGUuTUVSR0UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5wbGF5Q29tcG9zZUFuaW0oZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGhlcm9DZmcuaGVyb190eXBlICE9IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUgJiYgMTEgIT0gaGVyb0NmZy5vY2N1cGF0aW9uICYmIDEyICE9IGhlcm9DZmcub2NjdXBhdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LlNVUEVSSEVST09QLmtleSwgW0hlcm9DZmdCeUlELm5leHRMdlt5XSwgZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5TVVBFUkhFUk9PUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtVHlwZSA9PSBJdGVtVHlwZUVudW0uSVRFTV9UWVBFICYmIEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUgPT0gdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbUNmZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNmZ0lEID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbUNmZ0lEKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmdJRC50eXBlID09IFByb3BUeXBlRW51bS5XRUFQT05fVFlQRSAmJiBpdGVtQ2ZnLmlkID09IGl0ZW1DZmdJRC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiVsWpIGtow60gY+G6p24gcGjhuqNpIGvhur90IGjhu6NwIHbhu5tpIGTDom4gbMOgbmcgxJHhu4MgdHLhu58gdGjDoG5oIGFuaCBow7luZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gaXRlbUNmZy5uZXh0ICYmIGl0ZW1DZmcuaWQgPT0gaXRlbUNmZ0lELmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCLEkMOjIMSR4bqhdCDEkeG6v24gY+G6pXAgxJHhu5kgY2FvIG5o4bqldCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnSUQudHlwZSA9PSBpdGVtQ2ZnLnR5cGUgJiYgMCA8IGl0ZW1DZmcubmV4dCAmJiBpdGVtQ2ZnLmlkID09IGl0ZW1DZmdJRC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLml0ZW1EYXRhW2l0ZW1DZmcudHlwZV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbURhdGFbaXRlbUNmZy50eXBlXVtpXS5jZWxsSUQgPT0gZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtRGF0YVtpdGVtQ2ZnLnR5cGVdW2ldLml0ZW1JRCA9IGl0ZW1DZmdJRC5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0odGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQoZSwgSXRlbVR5cGVFbnVtLklURU1fVFlQRSwgaXRlbUNmZ0lELm5leHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZ0lELm5leHQgPT0gZ20uY29uc3QuSEVST0dJRlRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm1lcmdlX2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuWQiOaIkOebsuebklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLlkIjmiJDnm7Lnm5LotoXnuqfoi7Hpm4RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1faWQ6IGl0ZW1DZmdJRC5uZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODcxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA4NzIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1DZmdJRC5uZXh0ID09IGdtLmNvbnN0LkdJRlRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm1lcmdlX2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuWQiOaIkOebsuebklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLlkIjmiJDnm7Lnm5LmsLTnsr7ngbVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1faWQ6IGl0ZW1DZmdJRC5uZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODc1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA4NzYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1DZmdJRC5uZXh0ID09IGdtLmNvbnN0LlBBR09EQUdJRlRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm1lcmdlX2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuWQiOaIkOebsuebklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLlkIjmiJDnm7Lnm5Lngq7loZRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1faWQ6IGl0ZW1DZmdJRC5uZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODczKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA4NzQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQWRkQ29tcHNlVGltZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVubG9ja0Jvb2tJdGVtKEl0ZW1UeXBlRW51bS5JVEVNX1RZUEUsIGl0ZW1DZmdJRC5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5NRVJHRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxMiA8PSBpdGVtQ2ZnSUQudHlwZSAmJiBpdGVtQ2ZnSUQudHlwZSA8PSAxNCB8fCAxOSA9PSBpdGVtQ2ZnSUQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuc2hvd0dpZnRCYXIoaXRlbUNmZ0lELm5leHQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkucGxheUNvbXBvc2VBbmltKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gdGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbVR5cGUgPSB0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9VSUQgPSB0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaGVyb1VJRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkJVSUxEX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkJVSUxEX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZENmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYnVpbGRDZmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZENmZzEgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1aWxkQ2ZnMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUgfHwgYnVpbGRDZmcuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZENmZzEuYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUgfHwgYnVpbGRDZmcxLmJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idWlsZERhdGFbYnVpbGRDZmcuYnVpbGRUeXBlXS5idWlsZEx2bCA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVpbGREYXRhW2J1aWxkQ2ZnMS5idWlsZFR5cGVdLmJ1aWxkTHZsIDw9IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGF0YVtidWlsZENmZy5idWlsZFR5cGVdLmNlbGxJRCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZERhdGFbYnVpbGRDZmcxLmJ1aWxkVHlwZV0uY2VsbElEID0gdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFidWlsZENmZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1aWxkRGF0YVtidWlsZENmZy5idWlsZFR5cGVdLmJ1aWxkTHZsIDw9IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGF0YVtidWlsZENmZy5idWlsZFR5cGVdLmNlbGxJRCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDZWxsSUQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1UeXBlLCBlLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURlZmVuc2VIZXJvVUlEQ2VsbCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaGVyb1VJRCwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdXBlckhlcm9OZXdDZWxsSUQodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCwgdGhpcy5yb2xlX21hcF9kYXRhW3RdLmhlcm9VSUQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZWZlbnNlSGVyb1VJRENlbGwodGhpcy5yb2xlX21hcF9kYXRhW3RdLmhlcm9VSUQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZWZlbnNlSGVyb1VJRENlbGwodGhpcy5yb2xlX21hcF9kYXRhW2VdLmhlcm9VSUQsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtQ2VsbElEQW5kSXRlbUlEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtVHlwZSwgdCwgOTk5LCB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SXRlbUNlbGxJREFuZEl0ZW1JRCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbVR5cGUsIGUsIGUsIHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtQ2VsbElEQW5kSXRlbUlEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtVHlwZSwgOTk5LCB0LCB0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbUlELCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3VwZXJIZXJvQ2VsbElEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtVHlwZSwgdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCwgdCwgaXRlbVR5cGUsIGl0ZW1JRCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTWFwSXRlbURhdGFCeUlEKGUsIHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtVHlwZSwgdGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCwgdGhpcy5yb2xlX21hcF9kYXRhW3RdLmhlcm9VSUQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNYXBJdGVtRGF0YUJ5SUQodCwgaXRlbVR5cGUsIGl0ZW1JRCwgaGVyb1VJRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18xNjBfQ0hBTkdFUE9TKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9DZmcgJiYgMTAgPT0gaGVyb0NmZy5vY2N1cGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0VtaXRXYWxsRXZlbnQodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCwgdCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tFbWl0V2FsbEV2ZW50KHRoaXMucm9sZV9tYXBfZGF0YVtlXS5pdGVtSUQsIHQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0NmZyAmJiAxMCA9PSBoZXJvQ2ZnLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRW1pdFdhbGxFdmVudCh0aGlzLnJvbGVfbWFwX2RhdGFbZV0uaXRlbUlELCB0LCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0VtaXRXYWxsRXZlbnQodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCwgdCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2VdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnICYmIGJ1aWxkQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRDZmcubG9jayA9PSB0aGlzLnJvbGVfYnVpbGRfbG9ja19udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSB0aGlzLmJ1aWxkRGF0YVtidWlsZENmZy5idWlsZFR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXSAmJiBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIgPCBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFIHx8IGl0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFIHx8IGl0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uU0hFTExfTU9ORVlfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciA8IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnbS51aS5tYXBNYWluVUkucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dCdWlsZFVwZ3JhZGUoYnVpbGRDZmcuYnVpbGRJRCwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnLm51bWJlciA+PSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5tYXggLSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLnNldEJ1aWxkR3VpZGVNZXJ0YXJpbChidWlsZENmZy5idWlsZElELCBpdGVtQ2ZnLmlkLCBpdGVtQ2ZnLnR5cGUsIHQsIGl0ZW1DZmcubnVtYmVyLCBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5tYXggLSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCBidWlsZENmZy5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJndWlkZV9kZWxfaXRlbVwiLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZy5udW1iZXIgPD0gYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0ubWF4IC0gYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0uY3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciArPSBpdGVtQ2ZnLm51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRyYWlsRGF0YSA9IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCAtIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGxpdEl0ZW1OdW0obWV0cmFpbERhdGEsIGl0ZW1DZmcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIgPSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0oaXRlbUNmZy5pZCwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCBidWlsZENmZy5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnbS51aS5tYXBNYWluVUkucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuc2hvd0J1aWxkVXBncmFkZShidWlsZENmZy5idWlsZElELCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnLmlkID09IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLnNldEJ1aWxkR3VpZGVNZXJ0YXJpbChidWlsZENmZy5idWlsZElELCBpdGVtQ2ZnLmlkLCBpdGVtQ2ZnLnR5cGUsIHQsIDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIGJ1aWxkQ2ZnLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiZ3VpZGVfZGVsX2l0ZW1cIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZy5pZCA9PSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxSb2xlSXRlbShpdGVtQ2ZnLmlkLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCBidWlsZENmZy5idWlsZElEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1DZmcuaWQgPiBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0oaXRlbUNmZy5pZCwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVlZFJlZnJlc2hDZWxsTGlzdC5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IE51bTogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gaXRlbUNmZy5pZCAtIDE7IHkgPj0gYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0uaWQ7IHktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW0ucHVzaCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXYXJlSG91c2VMaXN0KE51bSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCBidWlsZENmZy5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJIw6N5IG7Dom5nIGPhuqVwIHTDsmEgbmjDoCBcIiArIGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0U29ydEJ1aWxkTmFtZSgpICsgXCJ0csaw4bubYyEhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbVR5cGUgPT0gSXRlbVR5cGVFbnVtLklURU1fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMucm9sZV9tYXBfZGF0YVt0XS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbUNmZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRV0uYnVpbGRJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWlsZENmZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWlsZENmZy5sb2NrICE9IHRoaXMucm9sZV9idWlsZF9sb2NrX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkjDo3kgbsOibmcgY+G6pXAgdMOyYSBuaMOgIFwiICsgZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTb3J0QnVpbGROYW1lKCkgKyBcInRyxrDhu5tjISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSB0aGlzLmJ1aWxkRGF0YVtidWlsZENmZy5idWlsZFR5cGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXSAmJiBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIgPCBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFIHx8IGl0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFIHx8IGl0ZW1DZmcudHlwZSA9PSBQcm9wVHlwZUVudW0uU0hFTExfTU9ORVlfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciA8IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzR3VpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcubnVtYmVyID49IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCAtIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnbS51aS5tYXBNYWluVUkucm9sZUd1aWRlQnVpbGRVcGdyYWRlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaG93QnVpbGRVcGdyYWRlKGJ1aWxkQ2ZnLmJ1aWxkSUQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVtcERhdGEuc2V0QnVpbGRHdWlkZU1lcnRhcmlsKGJ1aWxkQ2ZnLmJ1aWxkSUQsIGl0ZW1DZmcuaWQsIGl0ZW1DZmcudHlwZSwgdCwgaXRlbUNmZy5udW1iZXIsIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCAtIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIGJ1aWxkQ2ZnLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImd1aWRlX2RlbF9pdGVtXCIsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnLm51bWJlciA8PSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5tYXggLSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5jdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0uY3VyICs9IGl0ZW1DZmcubnVtYmVyLCB0aGlzLmRlbFJvbGVJdGVtKGl0ZW1DZmcuaWQsIHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIGJ1aWxkQ2ZnLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRyYWlsRGF0YSA9IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLm1heCAtIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGl0SXRlbU51bShtZXRyYWlsRGF0YSwgaXRlbUNmZy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0uY3VyID0gYnVpbGREYXRhLm1ldHJhaWxEYXRhW2l0ZW1DZmcudHlwZV0ubWF4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsUm9sZUl0ZW0oaXRlbUNmZy5pZCwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCBidWlsZENmZy5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnLmlkID09IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ20udWkubWFwTWFpblVJLnJvbGVHdWlkZUJ1aWxkVXBncmFkZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaG93QnVpbGRVcGdyYWRlKGJ1aWxkQ2ZnLmJ1aWxkSUQsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbXBEYXRhLnNldEJ1aWxkR3VpZGVNZXJ0YXJpbChidWlsZENmZy5idWlsZElELCBpdGVtQ2ZnLmlkLCBpdGVtQ2ZnLnR5cGUsIHQsIDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIGJ1aWxkQ2ZnLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiZ3VpZGVfZGVsX2l0ZW1cIiwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZy5pZCA9PSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxSb2xlSXRlbShpdGVtQ2ZnLmlkLCB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBnbS51aS5lbWl0KFwiYnVpbGRfbWV0YXJhaWxfY2hhbmdlXCIsIGJ1aWxkQ2ZnLmJ1aWxkSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZy5pZCA+IGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxSb2xlSXRlbShpdGVtQ2ZnLmlkLCB0KSwgdGhpcy5fbmVlZFJlZnJlc2hDZWxsTGlzdC5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IE51bTogbnVtYmVyW10gPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBpdGVtQ2ZnLmlkIC0gMTsgeSA+PSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5pZDsgeS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bS5wdXNoKHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PSBidWlsZERhdGEubWV0cmFpbERhdGFbaXRlbUNmZy50eXBlXS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJ1aWxkRGF0YS5tZXRyYWlsRGF0YVtpdGVtQ2ZnLnR5cGVdLmN1ciArPSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXYXJlSG91c2VMaXN0KE51bSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcImJ1aWxkX21ldGFyYWlsX2NoYW5nZVwiLCBidWlsZENmZy5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVN1cGVySGVyb0NlbGxJRChcclxuICAgICAgICB0OiBJdGVtVHlwZUVudW0sXHJcbiAgICAgICAgZTogbnVtYmVyLFxyXG4gICAgICAgIGE6IG51bWJlcixcclxuICAgICAgICBpOiBJdGVtVHlwZUVudW0sXHJcbiAgICAgICAgbzogbnVtYmVyLFxyXG4gICAgICAgIG46IG51bWJlclxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHQgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSAmJiBpICE9IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoZSk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnICYmIGhlcm9Db25maWcuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3VwZXJIZXJvTmV3Q2VsbElEKGUsIGEsIG4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodCAhPSBJdGVtVHlwZUVudW0uSEVST19UWVBFICYmIGkgPT0gSXRlbVR5cGVFbnVtLkhFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChvKTtcclxuICAgICAgICAgICAgaWYgKGhlcm9Db25maWcgJiYgaGVyb0NvbmZpZy5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdXBlckhlcm9OZXdDZWxsSUQobywgbiwgYSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0ID09IEl0ZW1UeXBlRW51bS5IRVJPX1RZUEUgJiYgaSA9PSBJdGVtVHlwZUVudW0uSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcxID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChlKTtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZzIgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKG8pO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZzEgJiYgaGVyb0NvbmZpZzIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnMS5oZXJvX3R5cGUgIT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSB8fCBoZXJvQ29uZmlnMi5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnMS5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSB8fCBoZXJvQ29uZmlnMi5oZXJvX3R5cGUgIT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0NvbmZpZzEuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUgJiYgaGVyb0NvbmZpZzIuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3VwZXJIZXJvTmV3Q2VsbElEKGUsIGEsIDk5OSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN1cGVySGVyb05ld0NlbGxJRChvLCBuLCBhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3VwZXJIZXJvTmV3Q2VsbElEKGUsIDk5OSwgbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN1cGVySGVyb05ld0NlbGxJRChvLCBuLCBhKVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdXBlckhlcm9OZXdDZWxsSUQoZSwgYSwgbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTdXBlckhlcm9OZXdDZWxsSUQodDogbnVtYmVyLCBlOiBudW1iZXIsIGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdXBlckhlcm9EYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1cGVySGVyb0RhdGFbaV0uY2VsbElEID09IGUgJiYgdGhpcy5zdXBlckhlcm9EYXRhW2ldLmhlcm9pZCA9PSB0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVySGVyb0RhdGFbaV0uY2VsbElEID0gYTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tFbWl0V2FsbEV2ZW50KHQ6IG51bWJlciwgZTogbnVtYmVyLCBhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoMzAwMDAgPCB0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHQpO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZyAmJiAxMCA9PSBoZXJvQ29uZmlnLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxkaXJlID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRDYWxsRGlyZUNlbGxJRChlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgY2FsbGRpcmUubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8PSBjYWxsZGlyZVtvXSAmJiB0aGlzLmdldENlbGxJc1dhbGwoY2FsbGRpcmVbb10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJ1cGRhdGVXYWxsXCIsIGNhbGxkaXJlW29dKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUgIT0gYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxkaXJlID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRDYWxsRGlyZUNlbGxJRChhKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IGNhbGxkaXJlLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDw9IGNhbGxkaXJlW29dICYmIHRoaXMuZ2V0Q2VsbElzV2FsbChjYWxsZGlyZVtvXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJ1cGRhdGVXYWxsXCIsIGNhbGxkaXJlW29dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QWRkR2FtZUNvaW4odDogbnVtYmVyLCBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodCA9PSBTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUNvaW5EYXRhLmNvaW5OdW0gKz0gZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQgPT0gU2V0SXRlbU51bUVudW0uUkVEVUNFX0lURU1fVFlQRSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVDb2luRGF0YS5jb2luTnVtIC09IGU7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUNvaW5EYXRhLmNvaW5OdW0gPSBNYXRoLm1heCgwLCB0aGlzLnJvbGVDb2luRGF0YS5jb2luTnVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLnVpLmVtaXQoXCJjb2luX2NoYW5nZVwiKTtcclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QWRkR2FtZURpYW1vbmQodDogbnVtYmVyLCBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodCA9PSBTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUNvaW5EYXRhLmRpYW1vbmROdW0gKz0gZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQgPT0gU2V0SXRlbU51bUVudW0uUkVEVUNFX0lURU1fVFlQRSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvbGVDb2luRGF0YS5kaWFtb25kTnVtIC09IGU7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUNvaW5EYXRhLmRpYW1vbmROdW0gPSBNYXRoLm1heCgwLCB0aGlzLnJvbGVDb2luRGF0YS5kaWFtb25kTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ20udWkuZW1pdChcImNvaW5fY2hhbmdlXCIpO1xyXG4gICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxDZWxsSXRlbUJ5Q2VsbElEKHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbdF0pIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxSb2xlSXRlbSh0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlELCB0KTtcclxuICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxDZWxsSXRlbSh0OiBudW1iZXIsIGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSXRlbUNvbmZpZ0RhdGFcIiwgdC50b1N0cmluZygpKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgIGlmIChyb3dEYXRhLnR5cGUgPT0gUHJvcFR5cGVFbnVtLkNPSU5fVFlQRSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEFkZEdhbWVDb2luKFNldEl0ZW1OdW1FbnVtLlJFRFVDRV9JVEVNX1RZUEUsIGUpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHJvd0RhdGEudHlwZSA9PSBQcm9wVHlwZUVudW0uRElBTU9ORFNfVFlQRSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLlJFRFVDRV9JVEVNX1RZUEUsIGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocm93RGF0YS50eXBlID09IFByb3BUeXBlRW51bS5XT09EX1RZUEUgfHxcclxuICAgICAgICAgICAgcm93RGF0YS50eXBlID09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUgfHxcclxuICAgICAgICAgICAgcm93RGF0YS50eXBlID09IFByb3BUeXBlRW51bS5TSEVMTF9NT05FWV9UWVBFIHx8XHJcbiAgICAgICAgICAgIHJvd0RhdGEudHlwZSA9PSBQcm9wVHlwZUVudW0uS0VZX1RZUEUgfHxcclxuICAgICAgICAgICAgcm93RGF0YS50eXBlID09IFByb3BUeXBlRW51bS5TSElQQU5DSE9STF9UWVBFIHx8XHJcbiAgICAgICAgICAgIHJvd0RhdGEudHlwZSA9PSBQcm9wVHlwZUVudW0uSE9STl9UWVBFIHx8XHJcbiAgICAgICAgICAgIHJvd0RhdGEudHlwZSA9PSBQcm9wVHlwZUVudW0uSkFSX1RZUEUgfHxcclxuICAgICAgICAgICAgcm93RGF0YS50eXBlID09IFByb3BUeXBlRW51bS5TT1VMX1RZUEUpIHtcclxuICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyh0aGlzLml0ZW1EYXRhW3Jvd0RhdGEudHlwZV0sIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1JRDogXCJkZXNjZW5kaW5nXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuaXRlbURhdGFbcm93RGF0YS50eXBlXS5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUlEID0gdGhpcy5pdGVtRGF0YVtyb3dEYXRhLnR5cGVdW2luZGV4XS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChpdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoY291bnQgKyBpdGVtQ29uZmlnLm51bWJlciA8PSBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZWZyZXNoQ2VsbExpc3QucHVzaCh0aGlzLml0ZW1EYXRhW3Jvd0RhdGEudHlwZV1baW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUlEID0gZSAtIGNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnbS51aS5tYXBNYWluVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UiA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuaXRlbURhdGFbcm93RGF0YS50eXBlXVtpbmRleF0uY2VsbElELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUodGhpcy5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TVEFMTF9UWVBFXS5jZWxsSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdSICYmIG5ld1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld04gPSBuZXdTLmdldENvbXBvbmVudChNYWluTWFwSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3TiAmJiBuZXdOLml0ZW1Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19pdGVtX2ZseShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUNvbmZpZy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ui5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ti5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxDZWxsSXRlbUJ5Q2VsbElEKHRoaXMuaXRlbURhdGFbcm93RGF0YS50eXBlXVtpbmRleF0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGl0SXRlbU51bShpdGVtQ29uZmlnLm51bWJlciAtIGl0ZW1JRCwgaXRlbUNvbmZpZy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmVlZFJlZnJlc2hDZWxsTGlzdC5wdXNoKHRoaXMuaXRlbURhdGFbcm93RGF0YS50eXBlXVtpbmRleF0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIGlmIChnbS51aS5tYXBNYWluVUkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdSID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUodGhpcy5pdGVtRGF0YVtyb3dEYXRhLnR5cGVdW2luZGV4XS5jZWxsSUQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UyA9IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKHRoaXMuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU1RBTExfVFlQRV0uY2VsbElELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdSICYmIG5ld1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TiA9IG5ld1MuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld04gJiYgbmV3Ti5pdGVtTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19pdGVtX2ZseShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1IuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Ti5pdGVtTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbENlbGxJdGVtQnlDZWxsSUQodGhpcy5pdGVtRGF0YVtyb3dEYXRhLnR5cGVdW2luZGV4XS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gaXRlbUNvbmZpZy5udW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAocm93RGF0YS50eXBlID09IFByb3BUeXBlRW51bS5XRUFQT05fVFlQRSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtRGF0YSA9IHRoaXMuaXRlbURhdGFbcm93RGF0YS50eXBlXTtcclxuICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyhpdGVtRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgaXRlbUlEOiBcImRlc2NlbmRpbmdcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkLCBwID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IGl0ZW1EYXRhLmxlbmd0aCAtIDE7IDAgPD0gbyAmJiAhKChkID0gaXRlbURhdGFbb10pLml0ZW1JRCA9PSB0ICYmICh0aGlzLl9uZWVkUmVmcmVzaENlbGxMaXN0LnB1c2goZC5jZWxsSUQpLCB0aGlzLmRlbENlbGxJdGVtQnlDZWxsSUQoZC5jZWxsSUQpLCArK3AgPj0gZSkpOyBvLS0pO1xyXG4gICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvaW5OdW0odDogbnVtYmVyLCBlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodCA9PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFIHx8IHQgPT0gUHJvcFR5cGVFbnVtLklST05fVFlQRSB8fCB0ID09IFByb3BUeXBlRW51bS5TSEVMTF9NT05FWV9UWVBFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhISh0aGlzLml0ZW1EYXRhW3RdICYmIDAgPCB0aGlzLml0ZW1EYXRhW3RdLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLml0ZW1EYXRhW3RdKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5pdGVtRGF0YVt0XS5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXRlbURhdGFbdF1bYV0uaXRlbUlEID49IGUpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVyb051bSh0OiBudW1iZXIsIGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhlcm9EYXRhW3RdKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5oZXJvRGF0YVt0XS5sZW5ndGg7IGErKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb0RhdGFbdF1bYV0uaXRlbUlEID09IGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jX3dyaXRlX2RhdGEoLi4uYXJnQXJyYXk6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sYXN0X3RpbWVzdGFtcCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDFlMyk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoTWFwQ2VsbENmZ0RhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3dyaXRlX2RhdGEuY2FsbCh0aGlzLCBhcmdBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5leHRMb2NrQ2VsbCgpOiBNYXBDZWxsIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QXJlYU5leHRPcGVuQ2VsbElEKHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfSUQsIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfc29ydCkgfHwgbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tCdWlsZElzQWN0aXZlKHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYnVpbGREYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICgwID09IHRoaXMuYnVpbGREYXRhW2tleV0uYnVpbGRMdmwgJiYgMSA9PSB0aGlzLmJ1aWxkRGF0YVtrZXldLmJ1aWxkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQodGhpcy5idWlsZERhdGFba2V5XS5idWlsZElEKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWlsZENmZyAmJiBidWlsZENmZy5hY3RpdmVDZWxsSUQgPT0gdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWlsZENmZy5idWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZERhdGFba2V5XS5idWlsZFN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIHRoaXMuYnVpbGREYXRhW2tleV0uY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNhdmVBZGRDb21wc2VUaW1lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJvbGVfY29tcG9zZV90aW1lcysrO1xyXG4gICAgICAgIHRoaXMucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzKys7XHJcbiAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY29tcG9zZV90aW1lX2NoYW5nZVwiLCB0aGlzLnJvbGVfY29tcG9zZV90b3RhbF90aW1lcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvY2tDZWxsID0gdGhpcy5nZXROZXh0TG9ja0NlbGwoKTtcclxuICAgICAgICBpZiAobG9ja0NlbGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9jb21wb3NlX3RpbWVzID49IGxvY2tDZWxsLmNvbVRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVfY29tcG9zZV90aW1lcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBDZWxsID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRNYXBDZWxsQ2ZnQnlJRChsb2NrQ2VsbC5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9jb21wb3NlX3RpbWVzID09IG1hcENlbGwuaXNPYnN0cnVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcEl0ZW1EYXRhID0gbmV3IE1hcEl0ZW1EYXRhVk87XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGEuY2VsbElEID0gbG9ja0NlbGwuY2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcEl0ZW1EYXRhLmNlbGxTdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwSXRlbURhdGEuaXRlbVN0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YS5pdGVtSUQgPSBtYXBDZWxsLml0ZW1JRDtcclxuICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YS5oZXJvVUlEID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBtYXBJdGVtRGF0YS5pdGVtVHlwZSA9IG1hcENlbGwuaXRlbVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX21hcF9kYXRhW21hcEl0ZW1EYXRhLmNlbGxJRF0gPSBtYXBJdGVtRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCB0aGlzLnJvbGVfbWFwX2RhdGFbbWFwSXRlbURhdGEuY2VsbElEXS5pdGVtSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcEl0ZW1EYXRhLml0ZW1UeXBlID09IEl0ZW1UeXBlRW51bS5CVUlMRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1aWxkKG1hcEl0ZW1EYXRhLml0ZW1JRCwgbWFwSXRlbURhdGEuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUm9sZUl0ZW0obWFwSXRlbURhdGEuaXRlbUlELCBtYXBJdGVtRGF0YS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb2xlU3BhY2VDZWxsQnlJRChtYXBJdGVtRGF0YS5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEluZGV4VG9MaXN0KGxpc3RUeXBlRW51bS5NQVBfVE9UQUxfVFlQRSwgbG9ja0NlbGwuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5kZXhUb0xpc3QobGlzdFR5cGVFbnVtLlJFUE9SVF9DRUxMX1RZUEUsIGxvY2tDZWxsLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQnVpbGRJc0FjdGl2ZShsb2NrQ2VsbC5jZWxsSUQpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fdW5sb2NrX3JlZnJlc2hcIiwgbG9ja0NlbGwuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfc29ydCArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0VtaXRXYWxsRXZlbnQobWFwQ2VsbC5pdGVtSUQsIGxvY2tDZWxsLmNlbGxJRCwgbG9ja0NlbGwuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnbS5jb25zdC5mdW5Qb3NMaXN0W2xvY2tDZWxsLmNlbGxJRF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuc2V0TG9ja1NlbmNlTW92ZU1hcChnbS5jb25zdC5mdW5Qb3NMaXN0W2xvY2tDZWxsLmNlbGxJRF0udG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDVlNCArIGxvY2tDZWxsLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcInVubG9ja19tYXBfY2VsbFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfZGVzYzogXCLop6PplIHlnLDlm77moLzlrZBcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsX2NvdW50OiBsb2NrQ2VsbC5jZWxsSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwi6Kej6ZSB5Zyw5Zu+5qC85a2QJWRcIiwgbG9ja0NlbGwuY2VsbElEKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiY29tcG9zdGltZUNoYW5nZVwiKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJidWlsZF9zaG93X3N0YXRlSWNvblwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB1bmxvY2tBcmVhID0gdGhpcy5yb2xlX2N1cl91bmxvY2tfYXJlYV9JRCArIDE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5yb2xlVW5sb2NrQXJlYUlETGlzdC5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVubG9ja0FyZWEgPT0gdGhpcy5yb2xlVW5sb2NrQXJlYUlETGlzdFtvXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfSUQgPSB1bmxvY2tBcmVhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZWFJRCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QXJlYUlETGlzdCh1bmxvY2tBcmVhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJlYUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucm9sZV9jdXJfdW5sb2NrX2FyZWFfc29ydCA9IDAsIGFyZWFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEwMDAwID09IGFyZWFJRFtrZXldLmNvbVRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX2N1cl91bmxvY2tfYXJlYV9zb3J0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlX2NvbXBvc2VfdGltZXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dOZXh0Q2VsbE5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbS51aS5lbWl0KFwic2hvd19oYW5kX2FuaW1cIiwgZmFsc2UpO1xyXG4gICAgICAgIGlmICgxID09IHRoaXMucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgZ3VpZGVpZDogNSxcclxuICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogXCI1LuesrDHmrKHlkIjmiJAx57qn6bG85Y+J5YW1XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5jaGVja0hhbmRBbmltRGVsYXkoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgyID09IHRoaXMucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgZ3VpZGVpZDogNixcclxuICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogXCI2LuesrDLmrKHlkIjmiJAx57qn6bG85Y+J5YW1XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5jaGVja0hhbmRBbmltRGVsYXkoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgzID09IHRoaXMucm9sZV9jb21wb3NlX3RvdGFsX3RpbWVzKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwib2hheW9vX2dhbWVfZ3VpZGVcIiwge1xyXG4gICAgICAgICAgICAgICAgZ3VpZGVpZDogNyxcclxuICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogXCI3LuesrDHmrKHlkIjmiJAy57qn6bG85Y+J5YW1XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldFJvbGVHdWlkZURhdGEoMTMsIDApO1xyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuY2hlY2tHdWlkZUlzU2hvdygpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKDQgPT0gdGhpcy5yb2xlX2NvbXBvc2VfdG90YWxfdGltZXMpIHtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9ndWlkZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBndWlkZWlkOiAxOSxcclxuICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogXCIxOS7nrKwx5qyh5ZCI5oiQNOe6p+acqOWktFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuY2hlY2tIYW5kQW5pbURlbGF5KCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoNSA9PSB0aGlzLnJvbGVfY29tcG9zZV90b3RhbF90aW1lcykge1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgIGd1aWRlaWQ6IDIwLFxyXG4gICAgICAgICAgICAgICAgZ3VpZGVkZXNjOiBcIjIwLuesrDHmrKHlkIjmiJAy57qn6ZOB55+/XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5jaGVja0hhbmRBbmltRGVsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1bmxvY2tCb29rSXRlbSh0OiBudW1iZXIsIGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiKS5kYXRhW2VdIGFzIEJvb2tDb25maWcpIHtcclxuICAgICAgICAgICAgaWYgKG51bGwgPT0gdGhpcy50VW5sb2NrRGF0YVt0XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50VW5sb2NrRGF0YVt0XSA9IHt9IGFzIG51bWJlcltdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudWxsID09IHRoaXMudFVubG9ja0RhdGFbdF1bZV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJCb29rQ29uZmlnRGF0YVwiLCBlLnRvU3RyaW5nKCkpIGFzIEJvb2tDb25maWc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRVbmxvY2tEYXRhW3RdW2VdID0gcm93LnJld2FyZCA8PSAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiYm9va1JlZFN0YXR1c1wiLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tCb29rSXRlbUlzVW5sb2NrKHQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMudFVubG9ja0RhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgdW5sb2NrID0gdGhpcy50VW5sb2NrRGF0YVtrZXldXHJcbiAgICAgICAgICAgIGlmIChudWxsICE9IHVubG9jayAmJiBudWxsICE9IHVubG9ja1t0XSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tCb29rSXRlbUhhdmVVbmxvY2tSZXdhcmQodDogbnVtYmVyIHwgbnVsbCA9IG51bGwpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnRVbmxvY2tEYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVubG9jayA9IHRoaXMudFVubG9ja0RhdGFba2V5XTtcclxuICAgICAgICAgICAgaWYgKG51bGwgIT0gdW5sb2NrKVxyXG4gICAgICAgICAgICAgICAgaWYgKG51bGwgIT0gdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudWxsICE9IHVubG9ja1t0XSkgcmV0dXJuIDAgPT0gdW5sb2NrW3RdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdW5sb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHVubG9ja1tpXSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJvb2tJdGVtR2FpblVubG9ja1Jld2FyZCh0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnRVbmxvY2tEYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVubG9jayA9IHRoaXMudFVubG9ja0RhdGFba2V5XVxyXG4gICAgICAgICAgICBpZiAobnVsbCAhPSB1bmxvY2sgJiYgbnVsbCAhPSB1bmxvY2tbdF0pIHtcclxuICAgICAgICAgICAgICAgIHVubG9ja1t0XSA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X3VubG9ja19oZXJvX2FycmF5KCk6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCB0ID0gdGhpcy50VW5sb2NrRGF0YVtJdGVtVHlwZUVudW0uSEVST19UWVBFXTtcclxuICAgICAgICBjb25zdCBlOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGlmICh0KSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgYSBpbiB0KSB7XHJcbiAgICAgICAgICAgICAgICBlLnB1c2gocGFyc2VJbnQoYSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlRGVmZW5zZUhlcm9VSURDZWxsKHQ6IG51bWJlciwgZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2RlZmVuc2VMaXN0KS5sZW5ndGggPCAwIHx8IHRoaXMuX2RlZmVuc2VMaXN0W3RdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmVuc2VMaXN0W3RdLmNlbGxJRCA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWxEZWZlbnNlRGF0YUJ5SUQodDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCEoT2JqZWN0LmtleXModGhpcy5fZGVmZW5zZUxpc3QpLmxlbmd0aCA8IDAgfHwgIXRoaXMuX2RlZmVuc2VMaXN0W3RdKSkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWZlbnNlID0gdGhpcy5fZGVmZW5zZUxpc3RbdF0uY2VsbElEO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZGVmZW5zZUxpc3RbdF07XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJ1cGRhdGVEZWZlbnNlSGVyb1wiLCBkZWZlbnNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEudXBkYXRlX3BsYXllcl9kYXRhX3JlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERlZmVuc2VEYXRhQnlJRCh0OiBEZWZlbnNlSGVyb0l0ZW1WTyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IHRoaXMuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpO1xyXG4gICAgICAgIGlmICghKCFidWlsZERhdGEgfHwgYnVpbGREYXRhLmJ1aWxkTHZsIDwgMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVmZW5zZUxpc3RbdC5oZXJvVUlEXSA9IHQ7XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJ1cGRhdGVEZWZlbnNlSGVyb1wiLCB0LmNlbGxJRCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEudXBkYXRlX3BsYXllcl9kYXRhX3JlcXVlc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RGVmYW5zZURhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgYnVpbGREYXRhID0gdGhpcy5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRSk7XHJcbiAgICAgICAgaWYgKGJ1aWxkRGF0YSAmJiAhKGJ1aWxkRGF0YS5idWlsZEx2bCA8IDEpKSB7XHJcbiAgICAgICAgICAgIFRlbXBEYXRhLmdldEluaXRBbGxIZXJvTGlzdCh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5kZWZlbnNlX0xpc3QgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9MaXN0ID0gVGVtcERhdGEuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGRDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEJ1aWxkQ2ZnQnlJRChidWlsZERhdGEuYnVpbGRJRCk7XHJcbiAgICAgICAgICAgIGlmIChidWlsZENmZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG8gPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgYnVpbGRDZmcuY2FwYWNpdHk7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvID09IGJ1aWxkQ2ZnLmNhcGFjaXR5KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9MaXN0Lmxlbmd0aCA+IHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBoZXJvTGlzdFtyXS5jZWxsSUQubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvID09IGJ1aWxkQ2ZnLmNhcGFjaXR5KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChoZXJvTGlzdFtyXS5oZXJvSUQpLmhlcm9fdHlwZSA9PSBIZXJvVHlwZUVudW0uU1VQRVJfSEVST19UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gdGhpcy5nZXREZWZlbnNlU3VwZXJOdW0oKSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSBjb3VudCAmJiBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvSXRlbSA9IG5ldyBEZWZlbnNlSGVyb0l0ZW1WTztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvSXRlbS5jZWxsSUQgPSBoZXJvTGlzdFtyXS5jZWxsSURbc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0l0ZW0uaGVyb2lkID0gaGVyb0xpc3Rbcl0uaGVyb0lEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm9JdGVtLmhlcm9VSUQgPSBoZXJvTGlzdFtyXS5oZXJvVUlEW3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmZW5zZUxpc3RbaGVyb0xpc3Rbcl0uaGVyb1VJRFtzXV0gPSBkZWZlbnNlSGVyb0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5fZGVmZW5zZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwidXBkYXRlRGVmZW5zZUhlcm9cIiwgdGhpcy5fZGVmZW5zZUxpc3RbaV0uY2VsbElELCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYW5zZUhlcm9EYXRhKCk6IFJlY29yZDxudW1iZXIsIERlZmVuc2VIZXJvSXRlbVZPPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmVuc2VMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREZWZlbnNlU3VwZXJOdW0oKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V0IGluIHRoaXMuX2RlZmVuc2VMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKHRoaXMuX2RlZmVuc2VMaXN0W2tldF0uaGVyb2lkKS5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhlcm9Jc0RlZmFuc2VCeUNlbGxJRCh0OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLnJvbGVfbWFwX2RhdGFbdF0gJiYgMCA9PSB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaGVyb1VJRCB8fCAhKDAgPCBPYmplY3Qua2V5cyh0aGlzLl9kZWZlbnNlTGlzdCkubGVuZ3RoICYmIHRoaXMucm9sZV9tYXBfZGF0YVt0XSAmJiB0aGlzLl9kZWZlbnNlTGlzdFt0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaGVyb1VJRF0pKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRIZXJvRGVmYW5zZURhdGFCeUhlcm9VSUQodDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2RlZmVuc2VMaXN0KS5sZW5ndGggPD0gMCA/IG51bGwgOiB0aGlzLl9kZWZlbnNlTGlzdFt0XVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdXRvT3BlbkNhc2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0IGluIHRoaXMucm9sZV9tYXBfZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb2xlX21hcF9kYXRhW3RdLml0ZW1JRCA9PSBSZXdhcmRJZEVudW0uQkFSUkVMIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlEID09IFJld2FyZElkRW51bS5TSUxWRVJfQkFSUkVMIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVfbWFwX2RhdGFbdF0uaXRlbUlEID09IFJld2FyZElkRW51bS5HT0xEX0JBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUodGhpcy5yb2xlX21hcF9kYXRhW3RdLmNlbGxJRC50b1N0cmluZygpKS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLml0ZW1Ob2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChQcm9wSXRlbSkub25PcGVuQmFycmVsKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF1dG9Db21wb3NlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcFR5cGVJRCA9IHBhcnNlSW50KGtleSk7XHJcbiAgICAgICAgICAgIGlmIChwcm9wVHlwZUlEID09IFByb3BUeXBlRW51bS5TVE9ORV9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1EYXRhW2tleV0ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbElEID0gdGhpcy5pdGVtRGF0YVtrZXldW2luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1JRCA9PSB0aGlzLml0ZW1EYXRhW2tleV1baW5kZXhdLml0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLml0ZW1Ob2RlLmNoaWxkcmVuQ291bnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSkuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKS5pdGVtTm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoUHJvcEl0ZW0pKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLml0ZW1Ob2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChQcm9wSXRlbSkub25DbGlja09wZW5IZXJvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcFR5cGVJRCA9PSBQcm9wVHlwZUVudW0uU1RBVFVFX1RZUEUgfHwgcHJvcFR5cGVJRCA9PSBQcm9wVHlwZUVudW0uU0hFTExfVFlQRSB8fCBwcm9wVHlwZUlEID09IFByb3BUeXBlRW51bS5GT1VOVEFJTl9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbURhdGFba2V5XS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbElEID0gdGhpcy5pdGVtRGF0YVtrZXldW2luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1DZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEl0ZW1DZmdCeUlEKHRoaXMuaXRlbURhdGFba2V5XVtpbmRleF0uaXRlbUlEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnICYmIGl0ZW1DZmcubmV4dCA8PSAwICYmIHRoaXMucm9sZV9tYXBfZGF0YVtjZWxsSURdLml0ZW1JRCA9PSB0aGlzLml0ZW1EYXRhW2tleV1baW5kZXhdLml0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcuaWQgPT0gZ20uY29uc3QuSEVST0dJRlRJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoY2VsbElELnRvU3RyaW5nKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSkuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwID09IGdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLml0ZW1Ob2RlLmNoaWxkcmVuQ291bnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKS5nZXRDb21wb25lbnQoTWFpbk1hcEl0ZW0pLml0ZW1Ob2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChQcm9wSXRlbSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSkuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKS5pdGVtTm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoUHJvcEl0ZW0pLm9uT3BlblN1cGVySGVyb0Nhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZy5pZCA9PSBnbS5jb25zdC5HSUZUSUQgfHwgaXRlbUNmZy5pZCA9PSBnbS5jb25zdC5QQUdPREFHSUZUSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdtLnVpLm1hcE1haW5VSS5tYXBDb250ZW50LmdldENoaWxkQnlOYW1lKGNlbGxJRC50b1N0cmluZygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoY2VsbElELnRvU3RyaW5nKCkpLmdldENvbXBvbmVudChNYWluTWFwSXRlbSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCA9PSBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSkuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKS5pdGVtTm9kZS5jaGlsZHJlbkNvdW50IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShjZWxsSUQudG9TdHJpbmcoKSkuZ2V0Q29tcG9uZW50KE1haW5NYXBJdGVtKS5pdGVtTm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoUHJvcEl0ZW0pKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoY2VsbElELnRvU3RyaW5nKCkpLmdldENvbXBvbmVudChNYWluTWFwSXRlbSkuaXRlbU5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFByb3BJdGVtKS5vbk9wZW5HaWZ0Q2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1EYXRhW2tleV0ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQodGhpcy5pdGVtRGF0YVtrZXldW2luZGV4XS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnICYmIDAgPCBpdGVtQ2ZnLm5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW50ZW1JbmRleCA9IDA7IGludGVtSW5kZXggPCB0aGlzLml0ZW1EYXRhW2tleV0ubGVuZ3RoOyBpbnRlbUluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1EYXRhW2tleV1baW50ZW1JbmRleF0uaXRlbUlEID09IGl0ZW1DZmcuaWQgJiYgdGhpcy5pdGVtRGF0YVtrZXldW2ludGVtSW5kZXhdLmNlbGxJRCAhPSB0aGlzLml0ZW1EYXRhW2tleV1baW5kZXhdLmNlbGxJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFhID0gdGhpcy5pdGVtRGF0YVtrZXldW2luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWkgPSB0aGlzLml0ZW1EYXRhW2tleV1baW50ZW1JbmRleF0uY2VsbElEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb2xlX21hcF9kYXRhW2FhXS5pdGVtSUQgPT0gaXRlbUNmZy5pZCAmJiB0aGlzLnJvbGVfbWFwX2RhdGFbaWldLml0ZW1JRCA9PSB0aGlzLml0ZW1EYXRhW2tleV1baW50ZW1JbmRleF0uaXRlbUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJjbG9zZV9uZXdfYW5pbVwiLCBpaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQ2VsbERhdGEoYWEsIGlpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBpaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgYWEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuaGVyb0RhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcFR5cGVJRCA9IHBhcnNlSW50KGtleSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGhlcm9JbmRleCA9IDA7IGhlcm9JbmRleCA8IHRoaXMuaGVyb0RhdGFbcHJvcFR5cGVJRF0ubGVuZ3RoOyBoZXJvSW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0NmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5oZXJvRGF0YVtwcm9wVHlwZUlEXVtoZXJvSW5kZXhdLml0ZW1JRCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVyb0NmZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGx2SW5kZXggPSAwOyBsdkluZGV4IDwgaGVyb0NmZy5uZXh0THYubGVuZ3RoOyBsdkluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPCBoZXJvQ2ZnLm5leHRMdltsdkluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9DZmcubmV4dE5lZWRJdGVtW2x2SW5kZXhdIDw9IDMwMDAwICYmIDAgPCB0aGlzLmJhcnJhY2tzX3VubG9ja19pZF9saXN0W2hlcm9DZmcubmV4dE5lZWRTb3J0W2x2SW5kZXhdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IHRoaXMuaXRlbURhdGFbUHJvcFR5cGVFbnVtLldFQVBPTl9UWVBFXS5sZW5ndGgpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbnRlbUluZGV4ID0gMDsgaW50ZW1JbmRleCA8IHRoaXMuaXRlbURhdGFbUHJvcFR5cGVFbnVtLldFQVBPTl9UWVBFXS5sZW5ndGg7IGludGVtSW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pdGVtRGF0YVtQcm9wVHlwZUVudW0uV0VBUE9OX1RZUEVdW2ludGVtSW5kZXhdLml0ZW1JRCA9PSBoZXJvQ2ZnLm5leHROZWVkSXRlbVtsdkluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWEgPSB0aGlzLmhlcm9EYXRhW3Byb3BUeXBlSURdW2hlcm9JbmRleF0uY2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWkgPSB0aGlzLml0ZW1EYXRhW1Byb3BUeXBlRW51bS5XRUFQT05fVFlQRV1baW50ZW1JbmRleF0uY2VsbElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9sZV9tYXBfZGF0YVthYV0uaXRlbUlEID09IGhlcm9DZmcuaGVyb2lkICYmIHRoaXMucm9sZV9tYXBfZGF0YVtpaV0uaXRlbUlEID09IHRoaXMuaXRlbURhdGFbUHJvcFR5cGVFbnVtLldFQVBPTl9UWVBFXVtpbnRlbUluZGV4XS5pdGVtSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiY2xvc2VfbmV3X2FuaW1cIiwgaWkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQ2VsbERhdGEoYWEsIGlpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGlpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIGFhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhlcm9DZmcubmV4dE5lZWRJdGVtW2x2SW5kZXhdID09IGhlcm9DZmcuaGVyb2lkICYmIDAgPCBoZXJvQ2ZnLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSB0aGlzLmhlcm9EYXRhW2hlcm9DZmcub2NjdXBhdGlvbl0ubGVuZ3RoKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VycGVySGVybyA9IHRoaXMuZ2V0U3VwZXJIZXJvRGF0YShoZXJvQ2ZnLmhlcm9pZCwgdGhpcy5oZXJvRGF0YVtwcm9wVHlwZUlEXVtoZXJvSW5kZXhdLmNlbGxJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9DZmcuaGVyb190eXBlID09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUgJiYgc3VycGVySGVybyAmJiAxID09IHN1cnBlckhlcm8uaGVyb1N0YXRlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCB0aGlzLmhlcm9EYXRhW3Byb3BUeXBlSURdLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlcm9EYXRhW3Byb3BUeXBlSURdW3NdLml0ZW1JRCA9PSBoZXJvQ2ZnLmhlcm9pZCAmJiB0aGlzLmhlcm9EYXRhW3Byb3BUeXBlSURdW3NdLmNlbGxJRCAhPSB0aGlzLmhlcm9EYXRhW3Byb3BUeXBlSURdW2hlcm9JbmRleF0uY2VsbElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhYSA9IHRoaXMuaGVyb0RhdGFbcHJvcFR5cGVJRF1baGVyb0luZGV4XS5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpaSA9IHRoaXMuaGVyb0RhdGFbcHJvcFR5cGVJRF1bc10uY2VsbElEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGVfbWFwX2RhdGFbYWFdLml0ZW1JRCA9PSBoZXJvQ2ZnLmhlcm9pZCAmJiB0aGlzLnJvbGVfbWFwX2RhdGFbaWldLml0ZW1JRCA9PSB0aGlzLmhlcm9EYXRhW3Byb3BUeXBlSURdW3NdLml0ZW1JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9DZmdJRCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5yb2xlX21hcF9kYXRhW2lpXS5pdGVtSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cGVySGVyb0RhdGEgPSB0aGlzLmdldFN1cGVySGVyb0RhdGEoaGVyb0NmZy5oZXJvaWQsIHRoaXMuaGVyb0RhdGFbcHJvcFR5cGVJRF1bc10uY2VsbElEKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9DZmdJRC5oZXJvX3R5cGUgPT0gSGVyb1R5cGVFbnVtLlNVUEVSX0hFUk9fVFlQRSAmJiBzdXBlckhlcm9EYXRhICYmIDEgPT0gc3VwZXJIZXJvRGF0YS5oZXJvU3RhdGUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJjbG9zZV9uZXdfYW5pbVwiLCBpaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDZWxsRGF0YShhYSwgaWkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgaWkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJpdGVtX2NoaWxkcmVuX3JlZnJlc2hcIiwgYWEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyByb2xlQ29pbkRhdGFWTyB7XHJcbiAgICBwdWJsaWMgY29pbk51bTogbnVtYmVyO1xyXG4gICAgcHVibGljIGRpYW1vbmROdW06IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvaW5OdW0gPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuZGlhbW9uZE51bSA9IDEwMDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJvbGVNYXBJdGVtVk8ge1xyXG4gICAgcHVibGljIGhlcm9VSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpdGVtSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjZWxsSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpdGVtVHlwZTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFwSXRlbURhdGFWTyB7XHJcbiAgICBwdWJsaWMgY2VsbElEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY2VsbFN0YXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXRlbVN0YXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXRlbVR5cGU6IEl0ZW1UeXBlRW51bTtcclxuICAgIHB1YmxpYyBpdGVtSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZXJvVUlEOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2xlQnVpbGREYXRhVk8gaW1wbGVtZW50cyBCdWlsZERhdGEge1xyXG4gICAgcHVibGljIGJ1aWxkU3RhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBidWlsZElEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYnVpbGRUeXBlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYnVpbGRMdmw6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjZWxsSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpc0Nhbk1vdmU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwcm9kdWN0RGF0YTogUm9sZVByb2R1Y3REYXRhVk87XHJcbiAgICBwdWJsaWMgdXBOZWVkQ29pbjogbnVtYmVyO1xyXG4gICAgcHVibGljIG1ldHJhaWxEYXRhOiBSZWNvcmQ8bnVtYmVyLCBtZXRyYWlsPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJvbGVHb0JhdHRsZUl0ZW1WTyB7XHJcbiAgICBwdWJsaWMgY2VsbElEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaHA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpdGVtSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpdGVtVHlwZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1heEhwOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2xlSXRlbURhdGFWTyB7XHJcbiAgICBwdWJsaWMgaXRlbUlEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXRlbVR5cGU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGVQcm9kdWN0RGF0YVZPIHtcclxuICAgIHB1YmxpYyBwcm9kdWN0Q2Q6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwcm9kdWN0TnVtOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWF4TnVtOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZnVsbFRpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwcm9kdWN0SUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBiZWdpblRpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjdXJOdW06IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGVCYXJyZWxEYXRhVk8ge1xyXG4gICAgcHVibGljIGN1ckJhcnJlbE51bTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1heEJhcnJlbE51bTogbnVtYmVyO1xyXG4gICAgcHVibGljIGZyZWVCYXJyZWxDZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG5leHRGcmVlQmFycmVsTnVtOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbmV4dEZyZWVCYXJyZWxUaW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY3VyRnJlZUJhcnJlbFRpbWU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJvbGVCYXJyZWxJdGVtVk8ge1xyXG4gICAgcHVibGljIGl0ZW1JRDogbnVtYmVyO1xyXG4gICAgcHVibGljIGl0ZW1JbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIGl0ZW1Qb3M6IGNjLlZlYzM7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBoZXJvVW5sb29ja0RhdGEge1xyXG4gICAgcHVibGljIGhlcm9JZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHVubG9ja0lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhbmlfc3RhdGU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEd1aWRlVk8ge1xyXG4gICAgcHVibGljIGd1aWRlSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBydW5uaW5nSW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpc0ZpbmlzaEFsbEd1aWRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RlcDogbnVtYmVyO1xyXG4gICAgcHVibGljIGlzRW5kOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR3VpZGVHaWZ0Vk8ge1xyXG4gICAgcHVibGljIGd1aWRlQmVnaW5UaW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ3VpZGVJc0dldDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cGVySGVyb1ZPIHtcclxuICAgIHB1YmxpYyBoZXJvaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBocDogbnVtYmVyO1xyXG4gICAgcHVibGljIGhlcm9TdGF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGN1clJlbGl2ZVRpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBuZXh0UmVsaXZlVGltZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1heEhwOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY2VsbElEOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZWZlbnNlSGVyb0l0ZW1WTyB7XHJcbiAgICBwdWJsaWMgY2VsbElEOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVyb2lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVyb1VJRDogbnVtYmVyO1xyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==