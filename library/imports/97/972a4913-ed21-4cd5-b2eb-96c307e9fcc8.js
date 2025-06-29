"use strict";
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