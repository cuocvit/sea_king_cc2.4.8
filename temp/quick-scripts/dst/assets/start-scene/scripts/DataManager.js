
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/DataManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bddf7mCpLdO8bXKGgVpG0VG', 'DataManager');
// start-scene/scripts/DataManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = exports.FightState = void 0;
// import { saveAs } from 'file-saver';
// import { FileSaver } from './FileSaver';
var FileSaver_1 = require("./FileSaver");
//
var EventEmitter_1 = require("./EventEmitter");
var ServerData_1 = require("./ServerData");
var MainData_1 = require("./MainData");
var ConfigData_1 = require("./ConfigData");
var RecordData_1 = require("./RecordData");
var FightData_1 = require("./FightData");
var FightTempData_1 = require("./FightTempData");
var LadderData_1 = require("./LadderData");
var LadderTempData_1 = require("./LadderTempData");
var TurtleExchangeData_1 = require("./TurtleExchangeData");
var SuperHeroTimer_1 = require("./SuperHeroTimer");
var Constants_1 = require("./Constants");
var SignData_1 = require("./SignData");
var MailTempData_1 = require("./MailTempData");
var Utils_1 = require("./Utils");
var LuckyWheelData_1 = require("./LuckyWheelData");
var WeakGuide_1 = require("./WeakGuide");
var HeroStarData_1 = require("./HeroStarData");
var GameManager_1 = require("./GameManager");
var MapCellCfgData_1 = require("./MapCellCfgData");
var TaskData_1 = require("./TaskData");
var StartData_1 = require("./StartData");
var StoreData_1 = require("./StoreData");
var SettingsData_1 = require("./SettingsData");
var NetUtils_1 = require("./NetUtils");
;
var FightState;
(function (FightState) {
    FightState[FightState["NONE"] = 0] = "NONE";
    FightState[FightState["RUN"] = 1] = "RUN";
    FightState[FightState["PAUSE"] = 2] = "PAUSE";
    FightState[FightState["SUCCESS"] = 3] = "SUCCESS";
    FightState[FightState["FAIL"] = 4] = "FAIL";
})(FightState = exports.FightState || (exports.FightState = {}));
;
// !!!
//
var DataManager = /** @class */ (function () {
    // @
    function DataManager() {
        this.is_init = false;
        this.event_emitter = new EventEmitter_1.EventEmitter();
        this.total_num = 0;
        this.current_num = 0;
        this.last_error_content = "";
        this.error_content = "";
    }
    Object.defineProperty(DataManager, "instance", {
        // @
        get: function () {
            if (!this._instance) {
                this._instance = new DataManager();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    // @
    DataManager.prototype.priority_init = function (callback) {
        this.server_data = ServerData_1.ServerData.get_instance();
        this.main_data = MainData_1.MainData.get_instance();
        this.main_data.async_read_data(function () {
            callback();
        });
    };
    // @
    DataManager.prototype.init = function (callback) {
        var _this = this;
        this.config_data = new ConfigData_1.ConfigData();
        this.config_data.initAllCfg();
        this.init_callback = callback;
        this.record_data = RecordData_1.RecordData.get_instance();
        this.total_num++;
        this.start_data = StartData_1.StartData.get_instance();
        this.total_num++;
        this.fight_data = FightData_1.FightData.get_instance();
        this.fight_temp_data = FightTempData_1.FightTempData.get_instance();
        this.total_num++;
        this.mapCell_data = MapCellCfgData_1.MapCellCfgData.get_instance();
        this.total_num++;
        this.store_data = StoreData_1.StoreData.get_instance();
        this.total_num++;
        this.task_data = TaskData_1.TaskData.get_instance();
        this.total_num++;
        this.turtle_exchange_data = TurtleExchangeData_1.TurtleExchangeData.get_instance();
        this.total_num++;
        this.ladder_data = LadderData_1.LadderData.get_instance();
        this.ladder_temp_data = LadderTempData_1.LadderTempData.get_instance();
        this.total_num++;
        this.sign_data = SignData_1.SignData.get_instance();
        this.total_num++;
        this.settings_data = SettingsData_1.SettingsData.get_instance();
        this.total_num++;
        this.mail_temp_data = MailTempData_1.MailTempData.get_instance();
        this.lucky_wheel_data = LuckyWheelData_1.LuckyWheelData.get_instance();
        this.total_num++;
        this.hero_star_data = HeroStarData_1.HeroStarData.get_instance();
        this.total_num++;
        //
        this.record_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.start_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.fight_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.mapCell_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.store_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.ladder_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.task_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.turtle_exchange_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.sign_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.settings_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.lucky_wheel_data.async_read_data(function () {
            _this.check_read_all_data_complete();
        });
        this.hero_star_data.async_read_data(function (t) {
            _this.check_read_all_data_complete();
        });
        //
        new SuperHeroTimer_1.SuperHeroTimer().init();
    }; // end: init
    // @
    DataManager.prototype.clear_store_data = function () {
        console.log("MainData---------", MainData_1.MainData.get_instance().STORAGE_KEY);
        console.log("StartData--------", StartData_1.StartData.get_instance().STORAGE_KEY);
        MainData_1.MainData.get_instance().async_delete_data();
        StartData_1.StartData.get_instance().async_delete_data();
        RecordData_1.RecordData.get_instance().async_delete_data();
        StoreData_1.StoreData.get_instance().async_delete_data();
        LadderData_1.LadderData.get_instance().async_delete_data();
        TaskData_1.TaskData.get_instance().async_delete_data();
        TurtleExchangeData_1.TurtleExchangeData.get_instance().async_delete_data();
        MapCellCfgData_1.MapCellCfgData.get_instance().async_delete_data();
        FightData_1.FightData.get_instance().async_delete_data();
        SignData_1.SignData.get_instance().async_delete_data();
        SettingsData_1.SettingsData.get_instance().async_delete_data();
        LuckyWheelData_1.LuckyWheelData.get_instance().async_delete_data();
        HeroStarData_1.HeroStarData.get_instance().async_delete_data();
        NetUtils_1.ReportData.instance.clear_data();
        NetUtils_1.NetUtils.remove_uuid();
        GameManager_1.gm.ui.show_notice(GameManager_1.gm.const.TEXT_1);
    };
    // @ (used for debugging)
    DataManager.prototype.export_data = function () {
        var data = {
            error_log: this.export_error_log(),
            store_data: this.export_store_data(),
            fight_data: this.export_fight_data()
        };
        if (cc.sys.isBrowser) {
            var jsonData = JSON.stringify(data);
            var blob = new Blob([jsonData], { type: 'text/plain;charset=utf-8' });
            FileSaver_1.saveAs(blob, 'debugging-data.txt');
        }
        else {
            var jsonStoreData = JSON.stringify(data.store_data);
            for (var i = 0; i < jsonStoreData.length; i += 1000) {
                console.log(jsonStoreData.substr(i, Math.min(1000, jsonStoreData.length - i)));
            }
            console.error('Non-browser platforms cannot export data');
        }
    };
    // @
    DataManager.prototype.catch_error_log = function (isEnabled) {
        if (isEnabled === void 0) { isEnabled = false; }
        if (window.onerror)
            return;
        if (!isEnabled) {
            window.onerror = function () { };
            return;
        }
        var self = this;
        window.onerror = function (message, source, lineno, colno, error) {
            var errorMessage = message + ">>" + source + ":" + lineno;
            if (arguments.length > 3) {
                errorMessage += " " + colno + " stack:";
                errorMessage += error.stack.substr(0, Math.max(Math.min(10240 - errorMessage.length, error.stack.length), 0));
            }
            if (self.error_content === errorMessage)
                return true;
            self.last_error_content = self.error_content;
            self.error_content = errorMessage;
            return false;
        }.bind(self);
    };
    // @
    DataManager.prototype.export_error_log = function () {
        return {
            error_content: this.error_content,
            last_error_content: this.last_error_content
        };
    };
    // @
    DataManager.prototype.export_store_data = function () {
        var data = {};
        data[this.main_data.PREFIX + this.main_data.STORAGE_KEY] = this.main_data;
        data[this.start_data.PREFIX + this.start_data.STORAGE_KEY] = this.start_data;
        data[this.record_data.PREFIX + this.record_data.STORAGE_KEY] = this.record_data;
        data[this.store_data.PREFIX + this.store_data.STORAGE_KEY] = this.store_data;
        data[this.ladder_data.PREFIX + this.ladder_data.STORAGE_KEY] = this.ladder_data;
        data[this.task_data.PREFIX + this.task_data.STORAGE_KEY] = this.task_data;
        data[this.turtle_exchange_data.PREFIX + this.turtle_exchange_data.STORAGE_KEY] = this.turtle_exchange_data;
        data[this.mapCell_data.PREFIX + this.mapCell_data.STORAGE_KEY] = this.mapCell_data;
        data[this.fight_data.PREFIX + this.fight_data.STORAGE_KEY] = this.fight_data;
        data[this.settings_data.PREFIX + this.settings_data.STORAGE_KEY] = this.settings_data;
        data[NetUtils_1.NetUtils.PREFIX + NetUtils_1.NetUtils.STORAGE_KEY] = GameManager_1.gm.channel.get_device_id();
        data.P2_UID = GameManager_1.gm.data.server_data.uid;
        data.P2_ReportData = cc.sys.localStorage.getItem("P2_ReportData");
        return data;
    };
    // @, type !!!
    DataManager.prototype.export_fight_data = function () {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        return {
            play_type: fightTempData.play_type,
            map_id: fightTempData.map_id,
            map_data_id: fightTempData.map_data_id,
            boat_id: fightTempData.boat_id,
            name: fightTempData.name
        };
    };
    // @
    DataManager.prototype.check_read_all_data_complete = function () {
        this.current_num++;
        if (this.current_num >= this.total_num) {
            this.check_reset_data();
            this.is_init = true;
            if (this.init_callback)
                this.init_callback();
        }
    };
    // @
    DataManager.prototype.check_reset_data = function () {
        var currentDate = new Date();
        var currentTime = Math.floor(currentDate.getTime() / 1000);
        currentTime = currentTime - (currentTime - 60 * currentDate.getTimezoneOffset()) % 86400;
        if (currentTime < this.sign_data.next_day_time)
            return;
        //
        var daysPassed = Math.ceil((currentTime - this.sign_data.next_day_time) / 86400) + 1;
        this.sign_data.sign_day += daysPassed;
        this.sign_data.next_day_time = 86400 + currentTime;
        this.sign_data.sign_state = 0;
        //
        if (this.sign_data.sign_day > 0) {
            for (var i = 0; i < SignData_1.SignData.SIGN_LOOP_DAY; i++) {
                var signDataItem = this.sign_data.sign_data_array[i];
                signDataItem.array_index = i;
                signDataItem.day = (this.sign_data.sign_day + i + 1) % SignData_1.SignData.MAX_DAY_COUNT;
                signDataItem.state = i === 0 ? 1 : 0;
                var configData = GameManager_1.gm.config.get_row_data("SignConfigData", signDataItem.day.toString());
                if (configData)
                    signDataItem.reward_array = configData.reward_array;
            }
            //
            for (var i = 0; i < SignData_1.SignData.MAX_BUY_COUNT; i++) {
                var signBuyDataItem = this.sign_data.sign_buy_data_array[i];
                signBuyDataItem.array_index = i;
                signBuyDataItem.state = 1;
                var configData = GameManager_1.gm.config.get_row_data("SignConfigData", (this.sign_data.sign_day + 1).toString());
                if (configData)
                    signBuyDataItem.reward_data = configData.other_reward_array[i];
            }
        }
        //
        this.sign_data.async_write_data();
        this.lucky_wheel_data.left_lucky_wheel_free_count = GameManager_1.gm.const.MAX_LUCKY_WHEEL_FREE_COUNT;
        this.lucky_wheel_data.left_lucky_wheel_video_count = GameManager_1.gm.const.MAX_LUCKY_WHEEL_VIDEO_COUNT;
        this.lucky_wheel_data.last_reward_index = 0;
        this.lucky_wheel_data.free_timestamp = Date.now() + GameManager_1.gm.const.FREE_DRAW_TIME_INTERVAL;
        this.lucky_wheel_data.async_write_data();
        this.record_data.share_record_count = 0;
        this.record_data.left_push_share_count = GameManager_1.gm.const.MAX_PUSH_SHARE_COUNT;
        this.record_data.async_write_data();
        this.main_data.left_share_count = GameManager_1.gm.const.MAX_VIDEO_FAIL_SHARE_COUNT;
        this.main_data.is_today_no_ad = false;
        this.main_data.left_free_super_recruit_count = GameManager_1.gm.const.MAX_FREE_SUPER_RECRUIT_COUNT;
        this.main_data.async_write_data();
    };
    // @ (not use)
    // public reset_daily_data(): void {}
    // @ (not use)
    /* public print_debug_info(): void {
        StorageManager.instance.print_debug_info();
    } */
    // @, type !!!
    DataManager.prototype.show_weak_guide = function (target, position, content, disappearTime, callback) {
        if (callback === void 0) { callback = null; }
        if (target.getChildByName("weak_guide"))
            return;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/weak_guide", WeakGuide_1.WeakGuide, function (instance) {
            if (target.getChildByName("weak_guide"))
                return;
            instance.node.position = position;
            instance.data = {
                tip_content: content,
                tip_offset: cc.v3(-50, 23),
                dir: WeakGuide_1.Direction.RIGHT,
                disappear_time: disappearTime,
                target: target,
                callback: callback
            };
            target.addChild(instance.node);
        });
    };
    // @, type !!!! items: { prop: number; weight: number }[]
    DataManager.prototype.setRandomReward = function (items, rewards, count) {
        if (count === void 0) { count = 1; }
        var totalWeight = 0;
        var cumulativeWeights = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            totalWeight += item.weight;
            cumulativeWeights.push([item.prop, totalWeight]);
        }
        while (rewards.length < count) {
            var randomWeight = Math.floor(Math.random() * totalWeight);
            for (var _a = 0, cumulativeWeights_1 = cumulativeWeights; _a < cumulativeWeights_1.length; _a++) {
                var _b = cumulativeWeights_1[_a], prop = _b[0], weight = _b[1];
                if (randomWeight <= weight) {
                    var rewardItem = new MapCellCfgData_1.RoleItemDataVO();
                    rewardItem.itemType = prop < 30000 ? 1 : 3;
                    rewardItem.itemID = prop;
                    rewards.push(rewardItem);
                    break;
                }
            }
        }
    };
    // @, type!!!
    DataManager.prototype.update_player_data_request = function (callback) {
        var garrisonData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (!garrisonData || garrisonData.buildLvl < 1)
            return;
        var mapCellData = GameManager_1.gm.data.mapCell_data;
        var mapReportData = mapCellData.role_map_report_data;
        //
        var mapReportItems = [];
        var mapReportMap = {};
        var heroDataArray = [];
        var seagoingBoatData = mapCellData.getBuildDataByType(Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE);
        var boatId = seagoingBoatData ? seagoingBoatData.buildID : 60001;
        var itemDataMap = {};
        var emptyCells = [];
        var specialCells = [224, 233, 234, 210, 211, 212, 222, 223, 189];
        var normalCells = [208, 209, 200, 201, 187, 188];
        // for1
        for (var i = 0; i < mapReportData.length; i++) {
            var cellId = mapReportData[i];
            if (specialCells.indexOf(cellId) > -1)
                continue;
            var cellData = mapCellData.role_map_data[cellId];
            var mapReport_Item = {
                cell_id: cellId,
                skill_lv: 0,
                star_lv: 0,
                item_type: 0,
                item_id: 0,
                unique_id: 0
            };
            //
            if (cellData) {
                if (cellData.cellState === 2) {
                    if (cellData.itemType === 3 && cellData.itemID > 0) {
                        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", cellData.itemID.toString());
                        if (heroConfig.occupation > 0) {
                            var heroStarData = GameManager_1.gm.data.hero_star_data.getHeroStarData(heroConfig.arms);
                            mapReport_Item.star_lv = heroStarData ? heroStarData.star : 0;
                            if (heroConfig.occupation === 10) {
                                mapReport_Item.item_type = cellData.itemType,
                                    mapReport_Item.item_id = cellData.itemID,
                                    mapReport_Item.skill_lv = GameManager_1.gm.data.mapCell_data.getRoleSkillData(heroConfig.skill_id).lvl,
                                    mapReport_Item.unique_id = cellData.heroUID;
                            }
                            else if (heroConfig.occupation === 12) {
                                mapReport_Item.item_type = cellData.itemType,
                                    mapReport_Item.item_id = cellData.itemID,
                                    mapReport_Item.skill_lv = heroConfig.lv,
                                    mapReport_Item.unique_id = cellData.heroUID;
                            }
                            else if (GameManager_1.gm.data.mapCell_data.getHeroDefanseDataByHeroUID(cellData.heroUID)) {
                                var skill_lv = heroConfig.hero_type === 1 ? heroConfig.lv : GameManager_1.gm.data.mapCell_data.getRoleSkillData(heroConfig.skill_id).lvl;
                                var heroDefenseData = {
                                    unique_id: cellData.heroUID,
                                    hero_id: cellData.itemID,
                                    skill_lv: skill_lv,
                                    star_lv: mapReport_Item.star_lv
                                }; //  as { unique_id: string; hero_id: string; skill_lv: number; star_lv: number }
                                heroDataArray.push(heroDefenseData);
                                //
                                mapReport_Item.item_type = cellData.itemType;
                                mapReport_Item.item_id = cellData.itemID;
                                mapReport_Item.skill_lv = skill_lv;
                                mapReport_Item.unique_id = cellData.heroUID;
                            }
                        }
                    }
                    else if (cellData.itemType === 2 && cellData.itemID > 0) {
                        var buildConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(cellData.itemID);
                        if ((cellData.itemID < 57000 || cellData.itemID >= 58000) && buildConfig && buildConfig.buildLv > 0) {
                            mapReport_Item.item_type = cellData.itemType;
                            mapReport_Item.item_id = cellData.itemID;
                        }
                        else {
                            mapReport_Item.item_type = 0;
                            mapReport_Item.item_id = 0;
                            emptyCells.push(cellId);
                        }
                    }
                    else { // phần này AI luôn sai
                        if (cellData.itemType === 1) {
                            if ((cellData.itemID >= 12001 && cellData.itemID <= 18011) || (cellData.itemID >= 25001 && cellData.itemID <= 25008)) {
                                var lowLevelProp = this.high_to_low_level_prop(cellData.itemID, 1);
                                if (lowLevelProp.item_id > 0 && lowLevelProp.item_num > 0) {
                                    var itemData = itemDataMap[lowLevelProp.item_id] || { item_id: lowLevelProp.item_id, item_num: 0 };
                                    itemData.item_num += lowLevelProp.item_num;
                                    itemDataMap[lowLevelProp.item_id] = itemData;
                                }
                            }
                            else {
                                mapReport_Item.item_type = 0;
                                mapReport_Item.item_id = 0;
                            }
                        }
                        emptyCells.push(cellId);
                    }
                }
            }
            else {
                var mapCellConfig = GameManager_1.gm.data.config_data.getMapCellCfgByID(cellId);
                mapReport_Item.item_type = mapCellConfig.itemType;
                mapReport_Item.item_id = mapCellConfig.itemID;
            }
            mapReportItems.push(mapReport_Item);
            mapReportMap[mapReport_Item.cell_id] = mapReport_Item;
        } // end: for1
        // @ for2
        for (var i = 0; i < normalCells.length; i++) {
            var cellId = normalCells[i];
            var mapReport_Item = mapReportMap[cellId];
            if (mapReport_Item && emptyCells.length > 0) {
                var randomIndex = Utils_1.Utils.math_random(true, 0, emptyCells.length);
                var emptyCellId = emptyCells.splice(randomIndex, 1)[0];
                var emptyCellReportItem = mapReportMap[emptyCellId];
                if (emptyCellReportItem) {
                    emptyCellReportItem.item_type = mapReport_Item.item_type;
                    emptyCellReportItem.item_id = mapReport_Item.item_id;
                }
                delete mapReportMap[emptyCellId];
            }
        } // end: for2
        // @
        var ladderLevel = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(GameManager_1.gm.data.ladder_temp_data.rank);
        var ladderLv = GameManager_1.gm.config.get_row_data("LadderLvConfigData", ladderLevel.toString());
        var propRatio = ladderLv.prop_ratio;
        // @ for3
        for (var itemId in itemDataMap) {
            var itemData = itemDataMap[itemId];
            var propMap = GameManager_1.gm.const.MAP_REPORT_PROP_MAP[itemData.item_id];
            if (propMap) {
                itemData.item_num = Math.min(propMap.max_num, Math.ceil(itemData.item_num * propRatio));
            }
            else {
                itemData.item_num = 1;
                // 出现了未设置最大上限值的道具,道具数量强制改为1
                console.error("There is an item without a maximum limit, the item quantity is forcibly changed to 1");
            }
            console.log("Before conversion:", JSON.stringify(itemData));
            var highLevelProps = this.low_level_to_high_prop(itemData.item_id, itemData.item_num);
            console.log("After conversion:", JSON.stringify(highLevelProps));
            for (var i = 0; i < highLevelProps.length; i++) {
                var highLevelProp = highLevelProps[i];
                for (var j = 0; j < highLevelProp.item_num; j++) {
                    if (emptyCells.length > 0) {
                        var randomIndex = Utils_1.Utils.math_random(true, 0, emptyCells.length);
                        var emptyCellId = emptyCells.splice(randomIndex, 1)[0];
                        var emptyCellReportItem = mapReportMap[emptyCellId];
                        if (emptyCellReportItem) {
                            emptyCellReportItem.item_type = 1;
                            emptyCellReportItem.item_id = highLevelProp.item_id;
                        }
                    }
                }
            }
        } // end: for3
        // @
        var playerData = {
            uid: GameManager_1.gm.data.server_data.uid,
            nickname: GameManager_1.gm.data.server_data.nickname,
            star: GameManager_1.gm.data.ladder_temp_data.total_star,
            hero_data_array: heroDataArray,
            map_data_array: mapReportItems,
            boat_id: boatId
        };
        // @
        var requestParams = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token
        };
        // @
        var requestData = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            op_type: "defensive_data",
            star: GameManager_1.gm.data.ladder_temp_data.total_star,
            data: JSON.stringify(playerData)
        };
        // @
        this.server_data.update_player_data_request(function (result) {
            if (result.ResultCode === 0) {
                console.log("Player data updated successfully"); // 更新玩家数据成功
                if (callback)
                    callback();
            }
        }, requestParams, requestData);
    }; // end: update_player_data_request
    // @, type!!!
    DataManager.prototype.low_level_to_high_prop = function (itemId, itemNum) {
        var result = [];
        var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", itemId.toString());
        //
        if (itemConfig) {
            if (itemConfig.lv > 0) {
                var remainingNum = itemNum;
                for (var level = 4; level >= 1; level--) {
                    var highLevelItemId = itemId + level - 1;
                    var highLevelItemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", highLevelItemId.toString());
                    if (highLevelItemConfig) {
                        var maxNum = Math.max(1, highLevelItemConfig.number);
                        var count = Math.floor(remainingNum / maxNum);
                        remainingNum %= maxNum;
                        if (count > 0) {
                            result.push({ item_id: highLevelItemId, item_num: count });
                        }
                    }
                }
            }
            else {
                result.push({ item_id: itemId, item_num: itemNum });
            }
        }
        return result;
    }; // end: low_level_to_high_prop
    // @
    DataManager.prototype.high_to_low_level_prop = function (itemId, itemNum) {
        var result = { item_id: 0, item_num: 0 };
        var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", itemId.toString());
        //
        if (itemConfig) {
            if (itemConfig.lv > 0) {
                var maxNum = Math.max(1, itemConfig.lv);
                result.item_id = itemConfig.id - maxNum + 1;
                result.item_num = Math.max(1, itemConfig.number) * itemNum;
            }
            else {
                result.item_id = itemId;
                result.item_num = itemNum;
            }
        }
        return result;
    }; // end: high_to_low_level_prop
    // @, type !!!!
    DataManager.prototype.update_player_fight_data = function (change_star, target_uid, target_nickname, target_star, target_change_star, op_result, op_reward, op_loss_reward, op_battle, target_op_battle) {
        var params = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token
        };
        //
        var data = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            nickname: GameManager_1.gm.data.server_data.nickname,
            star: GameManager_1.gm.data.ladder_temp_data.total_star,
            change_star: change_star,
            target_uid: target_uid,
            target_nickname: target_nickname,
            target_star: target_star,
            target_change_star: target_change_star,
            op_type: "2",
            op_result: op_result,
            op_reward: JSON.stringify(op_reward),
            op_loss_reward: JSON.stringify(op_loss_reward),
            op_battle: JSON.stringify(op_battle),
            target_op_battle: JSON.stringify(target_op_battle)
        };
        //
        this.server_data.update_player_fight_data(function (response) {
            if (response.ResultCode === 0) {
                console.log("Report combat data successfully");
            }
        }, params, data);
    }; // end: update_player_fight_data
    // @ (not use)
    /* public get_player_data_request(): void {
      const requestData = {
        uid: gm.data.server_data.uid,
        token: gm.data.server_data.token,
        op_type: "defensive_data"
      };
      //
      this.server_data.get_player_data_request((response) => {
        if (response.ResultCode === 0 && response.data) {
          try {
            const data = JSON.parse(response.data.defensive_data);
            console.log(data);
            console.log("Get data successfully"); // 获取数据成功
          } catch (error) {
            console.error(error);
          }
        }
      }, requestData);
    } */
    // @, type!!!
    DataManager.prototype.get_player_score_data_request = function (callback) {
        var requestData = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            op_type: "score"
        };
        //
        this.server_data.get_player_data_request(function (response) {
            if (response.ResultCode === 0 && response.data) {
                try {
                    var data = JSON.parse(response.data);
                    GameManager_1.gm.data.ladder_temp_data.total_star = data.scores;
                    GameManager_1.gm.data.ladder_temp_data.rank = data.rank || 0;
                    GameManager_1.gm.data.ladder_temp_data.arch_rank = data.arch_rank || 0;
                    GameManager_1.gm.data.ladder_temp_data.castle_level = data.castle_level || 0;
                    GameManager_1.gm.data.event_emitter.emit(ServerData_1.ServerData.EVENT_DATA_CHANGE);
                    // gm.data.event_emitter <=> this.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
                    console.log("Get data successfully"); // 获取数据成功
                    if (callback)
                        callback();
                }
                catch (error) {
                    console.error(error);
                }
            }
        }, requestData);
    }; // end: get_player_score_data_request
    // @, type!!!
    DataManager.prototype.update_player_score_data_request = function (star, callback) {
        var garrisonData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (!garrisonData || garrisonData.buildLvl < 1)
            return;
        //
        var totalBuildLevel = 0;
        var towerLevel = 0;
        var barracksLevel = 0;
        var garrisonLevel = 0;
        var seagoingBoatLevel = 0;
        var wharfTaxLevel = 0;
        var privateHousingLevel = 0;
        //
        var buildData = GameManager_1.gm.data.mapCell_data.buildData;
        for (var buildType in buildData) {
            var build = buildData[buildType];
            if (!build)
                continue;
            totalBuildLevel += build.buildLvl;
            if (buildType == Constants_1.BuildTypeEnum.TOWER_TYPE.toString()) {
                towerLevel = build.buildLvl;
            }
            else if (buildType == Constants_1.BuildTypeEnum.BARRACKS_TYPE.toString()) {
                barracksLevel = build.buildLvl;
            }
            else if (buildType == Constants_1.BuildTypeEnum.GARRISION_TYPE.toString()) {
                garrisonLevel = build.buildLvl;
            }
            else if (buildType == Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE.toString()) {
                seagoingBoatLevel = build.buildLvl;
            }
            else if (buildType == Constants_1.BuildTypeEnum.WHARFTAX_TYPE.toString()) {
                wharfTaxLevel = build.buildLvl;
            }
            else if (buildType == Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE.toString()) {
                privateHousingLevel = build.buildLvl;
            }
        }
        //
        var requestParams = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token
        };
        //
        var requestData = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            op_type: "score",
            star: star,
            data: JSON.stringify({
                level: 0,
                scores: star
            }),
            arch_data: JSON.stringify({
                castle: towerLevel,
                camp: barracksLevel,
                defense: garrisonLevel,
                boat: seagoingBoatLevel,
                tower: wharfTaxLevel,
                house: privateHousingLevel
            }),
            arch_score: totalBuildLevel
        };
        //
        this.server_data.update_player_data_request(function (response) {
            if (response.ResultCode === 0) {
                console.log("Player star data updated successfully"); // 更新玩家星星数据成功
                if (callback)
                    callback();
            }
        }, requestParams, requestData);
    }; // end: update_player_score_data_request
    // @, type!!!
    DataManager.prototype.match_player = function (targetUid) {
        if (targetUid === void 0) { targetUid = ""; }
        var params = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            star: GameManager_1.gm.data.ladder_temp_data.total_star,
            target_uid: targetUid
        };
        //
        GameManager_1.gm.data.server_data.match_players(function (response) {
            var fightTempData = GameManager_1.gm.data.fight_temp_data;
            if (response.ResultCode === 0) {
                console.log("Player matched successfully"); // 匹配玩家成功
                fightTempData.goal_uid = response.data.goal_uid;
                console.log("target_uid:" + fightTempData.goal_uid);
                //
                try {
                    fightTempData.defensive_data = JSON.parse(response.data.player_data.defensive_data);
                    if (!fightTempData.defensive_data.hasOwnProperty("uid") || !fightTempData.defensive_data.hasOwnProperty("map_data_array")) {
                        fightTempData.defensive_data = {
                            uid: "",
                            nickname: "",
                            star: 0,
                            boat_id: 0,
                            map_data_array: [],
                            hero_data_array: []
                        };
                        cc.error("Matching player data exception"); // 匹配玩家数据异常
                        fightTempData.goal_uid = "";
                        fightTempData.match_map_by_ladder_lv();
                    }
                }
                catch (error) {
                    cc.error("Match player data parsing failed"); // 匹配玩家数据解析失败
                    fightTempData.defensive_data = {
                        uid: "",
                        nickname: "",
                        star: 0,
                        boat_id: 0,
                        map_data_array: [],
                        hero_data_array: []
                    };
                    fightTempData.goal_uid = "";
                    fightTempData.match_map_by_ladder_lv();
                }
                //
                fightTempData.play_type = 0;
                GameManager_1.gm.ui.show_fight();
                GameManager_1.gm.channel.report_event("fight", {
                    event_desc: "Raid",
                    desc: "start" // 开始
                });
                NetUtils_1.ReportData.instance.report_once_point(10821);
                NetUtils_1.ReportData.instance.report_point(10822);
            }
            else if (response.ResultCode === -2) {
                // 该玩家今日被攻击次数已经达到上限，不能复仇
                GameManager_1.gm.ui.show_notice("Bạn đã đạt giới hạn tấn công người này và không thể trả đũa!!!");
            }
            else {
                console.log("Player match failed, matching NPC map"); // 匹配玩家失败,匹配NPC地图
                fightTempData.goal_uid = "";
                fightTempData.match_map_by_ladder_lv();
                GameManager_1.gm.ui.show_fight();
                GameManager_1.gm.channel.report_event("fight", {
                    event_desc: "Raid",
                    desc: "start" // 开始
                });
                NetUtils_1.ReportData.instance.report_once_point(10821);
                NetUtils_1.ReportData.instance.report_point(10822);
            }
        }, params);
    }; // end: match_player
    // @ (not use)
    /* public get_player_fight_replay_data(replayId: string, callback?: () => void): void {
      const params: PlayerFightReplayDataParams = {
        uid: gm.data.server_data.uid,
        token: gm.data.server_data.token,
        replay_id: replayId
      };
      //
      this.server_data.get_player_fight_replay_data((response: any) => {
        if (response.ResultCode === 0) {
          console.log("Obtaining battle replay data successfully"); // 获取战斗回放数据成功
          if (callback) callback();
        }
      }, params);
    } // end: get_player_fight_replay_data */
    // @
    DataManager.prototype.get_player_notice = function (callback) {
        var _this = this;
        var params = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token
        };
        //
        this.server_data.get_player_notice(function (response) {
            if (response.ResultCode === 0) {
                console.log("Get notification data successfully"); // 获取通知数据成功
                if (response.data) {
                    for (var key in response.data) {
                        _this.server_data.server_notice_data[key] = response.data[key];
                        if (_this.main_data.server_notice_data) {
                            if (_this.server_data.server_notice_data[key] > _this.main_data.server_notice_data[key]) {
                                _this.main_data.server_notice_data[key] = _this.server_data.server_notice_data[key];
                                _this.event_emitter.emit(key + "_change");
                            }
                        }
                    }
                    _this.main_data.async_write_data();
                }
                if (callback)
                    callback();
            }
        }, params);
    }; // end: get_player_notice
    // @, type!!!
    DataManager.prototype.get_player_fight_log_data = function (opType, callback) {
        var _this = this;
        var params = {
            uid: this.server_data.uid,
            token: this.server_data.token,
            op_type: opType
        };
        //
        this.server_data.get_player_fight_data(function (response) {
            if (!response.data || response.ResultCode !== 0)
                return;
            try {
                _this.server_data.mail_log_data_array = response.data;
                if (opType === "1") {
                    GameManager_1.gm.data.mail_temp_data.mail_defense_log_data_array = [];
                }
                else {
                    GameManager_1.gm.data.mail_temp_data.mail_attack_log_data_array = [];
                }
                //
                for (var i = _this.server_data.mail_log_data_array.length - 1; i >= 0; i--) {
                    var logData = _this.server_data.mail_log_data_array[i];
                    var mailLogItem = new MailTempData_1.MailLogItemData();
                    mailLogItem.replay_id = logData.replay_id;
                    mailLogItem.uid = logData.uid;
                    mailLogItem.star = logData.star;
                    mailLogItem.target_star = logData.target_star;
                    mailLogItem.change_star = logData.change_star;
                    mailLogItem.target_change_star = logData.target_change_star;
                    mailLogItem.op_type = opType;
                    mailLogItem.target_uid = logData.target_uid;
                    mailLogItem.target_nickname = logData.target_nickname;
                    mailLogItem.op_result = logData.op_result;
                    mailLogItem.op_reward = logData.op_reward;
                    mailLogItem.op_loss_reward = logData.op_loss_reward;
                    mailLogItem.is_deduct_loss_reward = logData.is_deduct_loss_reward;
                    mailLogItem.op_battle = logData.op_battle;
                    mailLogItem.target_op_battle = logData.target_op_battle;
                    //
                    if (opType === "1") {
                        GameManager_1.gm.data.mail_temp_data.mail_defense_log_data_array.push(mailLogItem);
                    }
                    else {
                        GameManager_1.gm.data.mail_temp_data.mail_attack_log_data_array.push(mailLogItem);
                    }
                }
                if (callback)
                    callback();
            }
            catch (error) {
                console.error(error);
            }
        }, params);
    }; // end: get_player_fight_log_data
    // @, type!!!
    DataManager.prototype.get_player_email_data = function (callback) {
        var _this = this;
        var params = {
            uid: this.server_data.uid,
            token: this.server_data.token
        };
        //
        this.server_data.get_player_email_data(function (response) {
            if (!response.data || response.ResultCode !== 0)
                return;
            try {
                _this.server_data.mail_inbox_data_array = response.data;
                GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array = [];
                for (var i = _this.server_data.mail_inbox_data_array.length - 1; i >= 0; i--) {
                    var inboxData = _this.server_data.mail_inbox_data_array[i];
                    var mailInboxItem = new MailTempData_1.MailInboxItemData();
                    mailInboxItem.mail_id = inboxData.mail_id;
                    mailInboxItem.mail_type = inboxData.mail_type;
                    mailInboxItem.mail_sender = inboxData.mail_sender;
                    mailInboxItem.mail_title = inboxData.mail_title;
                    mailInboxItem.mail_text = inboxData.mail_text;
                    mailInboxItem.reward = inboxData.reward;
                    mailInboxItem.op_status = inboxData.op_status;
                    mailInboxItem.reward_status = inboxData.reward_status;
                    mailInboxItem.send_time = inboxData.send_time;
                    mailInboxItem.reward_array = [];
                    //
                    if (mailInboxItem.mail_type === 1) {
                        var rank = mailInboxItem.reward.rank;
                        var level = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(rank);
                        var configData = GameManager_1.gm.config.get_row_data("LadderRewardConfigData", level.toString());
                        if (configData) {
                            mailInboxItem.reward_array = configData.reward_array;
                        }
                    }
                    else if (mailInboxItem.mail_type === 2) {
                        var level = GameManager_1.gm.data.ladder_temp_data.convert_building_rank_to_lv(mailInboxItem.reward.rank);
                        var configData = GameManager_1.gm.config.get_row_data("LadderBuildingConfigData", level.toString());
                        if (configData) {
                            mailInboxItem.reward_array = configData.reward_array;
                        }
                    }
                    GameManager_1.gm.data.mail_temp_data.mail_inbox_data_array.push(mailInboxItem);
                }
                if (callback)
                    callback();
            }
            catch (error) {
                console.error(error);
            }
        }, params);
    }; // end: get_player_email_data
    // @
    DataManager.prototype.get_rob_record = function (targetUid, callback) {
        var params = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            target_uid: targetUid
        };
        //
        this.server_data.get_rob_record(function (response) {
            if (response.ResultCode === 0) {
                if (callback && response.data && response.data.left_nums > 0)
                    callback();
            }
            else if (response.ResultCode === -1) {
                // 该玩家今日被攻击次数已经达到上限，不能复仇
                GameManager_1.gm.ui.show_notice("Đã đạt giới hạn tấn công người này và không thể trả đũa.");
            }
        }, params);
    }; // end: get_rob_record
    // @
    DataManager._instance = null;
    return DataManager;
}());
exports.DataManager = DataManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXERhdGFNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MseUNBQXFDO0FBQ3JDLEVBQUU7QUFDRiwrQ0FBOEM7QUFDOUMsMkNBQTBDO0FBQzFDLHVDQUFzQztBQUN0QywyQ0FBMEM7QUFDMUMsMkNBQTBDO0FBQzFDLHlDQUF3QztBQUN4QyxpREFBZ0Q7QUFDaEQsMkNBQTBDO0FBQzFDLG1EQUFrRDtBQUNsRCwyREFBMEQ7QUFDMUQsbURBQWtEO0FBQ2xELHlDQUF3RDtBQUN4RCx1Q0FBc0M7QUFDdEMsK0NBQWtGO0FBQ2xGLGlDQUFnQztBQUNoQyxtREFBa0Q7QUFDbEQseUNBQW1EO0FBQ25ELCtDQUE4QztBQUM5Qyw2Q0FBbUM7QUFDbkMsbURBQTZFO0FBQzdFLHVDQUFzQztBQUN0Qyx5Q0FBd0M7QUFDeEMseUNBQXdDO0FBQ3hDLCtDQUE4QztBQUM5Qyx1Q0FBa0Q7QUFtQ2pELENBQUM7QUFFRixJQUFZLFVBTVg7QUFORCxXQUFZLFVBQVU7SUFDcEIsMkNBQVEsQ0FBQTtJQUNSLHlDQUFPLENBQUE7SUFDUCw2Q0FBUyxDQUFBO0lBQ1QsaURBQVcsQ0FBQTtJQUNYLDJDQUFRLENBQUE7QUFDVixDQUFDLEVBTlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFNckI7QUFBQSxDQUFDO0FBMEJGLE1BQU07QUFFTixFQUFFO0FBQ0Y7SUFpQ0UsSUFBSTtJQUNKO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFD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S0FBSyxFQUFFLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO1lBQ2hDLFVBQVUsRUFBRSxTQUFTO1NBQ3RCLENBQUM7UUFDRixFQUFFO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBQyxRQUFhO1lBQzVDLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztvQkFBRSxRQUFRLEVBQUUsQ0FBQzthQUMxRTtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JDLHdCQUF3QjtnQkFDeEIsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7YUFDL0U7UUFDSCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDYixDQUFDLEVBQUMsc0JBQXNCO0lBejdCeEIsSUFBSTtJQUNXLHFCQUFTLEdBQXVCLElBQUksQ0FBQztJQWkrQnRELGtCQUFDO0NBbitCRCxBQW0rQkMsSUFBQTtBQW4rQlksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcclxuLy8gaW1wb3J0IHsgRmlsZVNhdmVyIH0gZnJvbSAnLi9GaWxlU2F2ZXInO1xyXG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICcuL0ZpbGVTYXZlcic7XHJcbi8vXHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4vRXZlbnRFbWl0dGVyJztcclxuaW1wb3J0IHsgU2VydmVyRGF0YSB9IGZyb20gJy4vU2VydmVyRGF0YSc7XHJcbmltcG9ydCB7IE1haW5EYXRhIH0gZnJvbSAnLi9NYWluRGF0YSc7XHJcbmltcG9ydCB7IENvbmZpZ0RhdGEgfSBmcm9tICcuL0NvbmZpZ0RhdGEnO1xyXG5pbXBvcnQgeyBSZWNvcmREYXRhIH0gZnJvbSAnLi9SZWNvcmREYXRhJztcclxuaW1wb3J0IHsgRmlnaHREYXRhIH0gZnJvbSAnLi9GaWdodERhdGEnO1xyXG5pbXBvcnQgeyBGaWdodFRlbXBEYXRhIH0gZnJvbSAnLi9GaWdodFRlbXBEYXRhJztcclxuaW1wb3J0IHsgTGFkZGVyRGF0YSB9IGZyb20gJy4vTGFkZGVyRGF0YSc7XHJcbmltcG9ydCB7IExhZGRlclRlbXBEYXRhIH0gZnJvbSAnLi9MYWRkZXJUZW1wRGF0YSc7XHJcbmltcG9ydCB7IFR1cnRsZUV4Y2hhbmdlRGF0YSB9IGZyb20gJy4vVHVydGxlRXhjaGFuZ2VEYXRhJztcclxuaW1wb3J0IHsgU3VwZXJIZXJvVGltZXIgfSBmcm9tICcuL1N1cGVySGVyb1RpbWVyJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgQnVpbGRUeXBlRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgU2lnbkRhdGEgfSBmcm9tICcuL1NpZ25EYXRhJztcclxuaW1wb3J0IHsgTWFpbFRlbXBEYXRhLCBNYWlsTG9nSXRlbURhdGEsIE1haWxJbmJveEl0ZW1EYXRhIH0gZnJvbSAnLi9NYWlsVGVtcERhdGEnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBMdWNreVdoZWVsRGF0YSB9IGZyb20gJy4vTHVja3lXaGVlbERhdGEnO1xyXG5pbXBvcnQgeyBXZWFrR3VpZGUsIERpcmVjdGlvbiB9IGZyb20gJy4vV2Vha0d1aWRlJztcclxuaW1wb3J0IHsgSGVyb1N0YXJEYXRhIH0gZnJvbSAnLi9IZXJvU3RhckRhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBCdWlsZERhdGEsIE1hcENlbGxDZmdEYXRhLCBSb2xlSXRlbURhdGFWTyB9IGZyb20gJy4vTWFwQ2VsbENmZ0RhdGEnO1xyXG5pbXBvcnQgeyBUYXNrRGF0YSB9IGZyb20gJy4vVGFza0RhdGEnO1xyXG5pbXBvcnQgeyBTdGFydERhdGEgfSBmcm9tICcuL1N0YXJ0RGF0YSc7XHJcbmltcG9ydCB7IFN0b3JlRGF0YSB9IGZyb20gJy4vU3RvcmVEYXRhJztcclxuaW1wb3J0IHsgU2V0dGluZ3NEYXRhIH0gZnJvbSAnLi9TZXR0aW5nc0RhdGEnO1xyXG5pbXBvcnQgeyBOZXRVdGlscywgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBTaWduQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3Mvc2lnbic7XHJcbmltcG9ydCB7IEhlcm9Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9oZXJvJztcclxuaW1wb3J0IHsgTGFkZGVyTFZDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfbHYnO1xyXG5pbXBvcnQgeyBJdGVtQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbSc7XHJcbmltcG9ydCB7IExhZGRlclJld2FyZENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9yZXdhcmQnO1xyXG5pbXBvcnQgeyBMYWRkZXJCdWlsZGRpbmcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfYnVpbGRpbmcnO1xyXG5pbXBvcnQgeyBTdG9yYWdlQmFzZSB9IGZyb20gJy4vU3RvcmFnZUJhc2UnO1xyXG5pbXBvcnQgeyBQb29sQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvcG9vbCc7XHJcbi8vIGltcG9ydCB7IFN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSAnLi9TdG9yYWdlTWFuYWdlcic7XHJcblxyXG4vLyBAXHJcbmludGVyZmFjZSBmaWdodFRlbXBEYXRhIHtcclxuICBwbGF5X3R5cGU6IG51bWJlcjtcclxuICBtYXBfaWQ6IG51bWJlcjtcclxuICBtYXBfZGF0YV9pZDogbnVtYmVyO1xyXG4gIGJvYXRfaWQ6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBtYXBSZXBvcnRJdGVtIHtcclxuICBjZWxsX2lkOiBudW1iZXI7XHJcbiAgc2tpbGxfbHY6IG51bWJlcjtcclxuICBzdGFyX2x2OiBudW1iZXI7XHJcbiAgaXRlbV90eXBlOiBudW1iZXI7XHJcbiAgaXRlbV9pZDogbnVtYmVyO1xyXG4gIHVuaXF1ZV9pZDogbnVtYmVyO1xyXG4gIGhlcm9faWQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBoZXJvRGVmZW5zZSB7XHJcbiAgdW5pcXVlX2lkOiBudW1iZXI7XHJcbiAgaGVyb19pZDogbnVtYmVyO1xyXG4gIHNraWxsX2x2OiBudW1iZXI7XHJcbiAgc3Rhcl9sdjogbnVtYmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGVudW0gRmlnaHRTdGF0ZSB7XHJcbiAgTk9ORSA9IDAsXHJcbiAgUlVOID0gMSxcclxuICBQQVVTRSA9IDIsXHJcbiAgU1VDQ0VTUyA9IDMsXHJcbiAgRkFJTCA9IDRcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSByZXF1ZXN0IHtcclxuICB1aWQ6IHN0cmluZztcclxuICB0b2tlbjogc3RyaW5nO1xyXG4gIG9wX3R5cGU/OiBzdHJpbmc7XHJcbiAgc3Rhcj86IG51bWJlcjtcclxuICBkYXRhPzogc3RyaW5nO1xyXG4gIGFyY2hfZGF0YT86IHN0cmluZztcclxuICBhcmNoX3Njb3JlPzogbnVtYmVyO1xyXG4gIHRhcmdldF91aWQ/OiBzdHJpbmc7XHJcbiAgbmlja25hbWU/OiBzdHJpbmc7XHJcbiAgY2hhbmdlX3N0YXI/LFxyXG4gIHRhcmdldF9uaWNrbmFtZT8sXHJcbiAgdGFyZ2V0X3N0YXI/LFxyXG4gIHRhcmdldF9jaGFuZ2Vfc3Rhcj8sXHJcbiAgb3BfcmVzdWx0PyxcclxuICBvcF9yZXdhcmQ/OiBzdHJpbmcsXHJcbiAgb3BfbG9zc19yZXdhcmQ/OiBzdHJpbmcsXHJcbiAgb3BfYmF0dGxlPzogc3RyaW5nLFxyXG4gIHRhcmdldF9vcF9iYXR0bGU/OiBzdHJpbmc7XHJcbiAgcmVwbGF5X2lkPzogbnVtYmVyXHJcbiAgaXNfZGVkdWN0X2xvc3NfcmV3YXJkPzogbnVtYmVyO1xyXG59XHJcbi8vICEhIVxyXG5cclxuLy9cclxuZXhwb3J0IGNsYXNzIERhdGFNYW5hZ2VyIHtcclxuICAvLyBAXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBEYXRhTWFuYWdlciB8IG51bGwgPSBudWxsO1xyXG4gIC8vIEAgcHJpdmF0ZVxyXG4gIHByaXZhdGUgaW5pdF9jYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICBwcml2YXRlIHRvdGFsX251bTogbnVtYmVyO1xyXG4gIHByaXZhdGUgY3VycmVudF9udW06IG51bWJlcjtcclxuICBwcml2YXRlIGxhc3RfZXJyb3JfY29udGVudDogc3RyaW5nO1xyXG4gIHByaXZhdGUgZXJyb3JfY29udGVudDogc3RyaW5nO1xyXG5cclxuICAvLyBAIHB1YmxpY1xyXG4gIHB1YmxpYyBpc19pbml0OiBib29sZWFuOyAvLyAobm90IHVzZSlcclxuICBwdWJsaWMgZXZlbnRfZW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG4gIHB1YmxpYyBzZXJ2ZXJfZGF0YTogU2VydmVyRGF0YTtcclxuICBwdWJsaWMgbWFpbl9kYXRhOiBNYWluRGF0YTtcclxuICBwdWJsaWMgY29uZmlnX2RhdGE6IENvbmZpZ0RhdGE7XHJcbiAgcHVibGljIHJlY29yZF9kYXRhOiBSZWNvcmREYXRhO1xyXG4gIHB1YmxpYyBzdGFydF9kYXRhOiBTdGFydERhdGE7XHJcbiAgcHVibGljIGZpZ2h0X2RhdGE6IEZpZ2h0RGF0YTtcclxuICBwdWJsaWMgZmlnaHRfdGVtcF9kYXRhOiBGaWdodFRlbXBEYXRhO1xyXG4gIHB1YmxpYyBtYXBDZWxsX2RhdGE6IE1hcENlbGxDZmdEYXRhO1xyXG4gIHB1YmxpYyBzdG9yZV9kYXRhOiBTdG9yZURhdGE7XHJcbiAgcHVibGljIHRhc2tfZGF0YTogVGFza0RhdGE7XHJcbiAgcHVibGljIHR1cnRsZV9leGNoYW5nZV9kYXRhOiBUdXJ0bGVFeGNoYW5nZURhdGE7XHJcbiAgcHVibGljIGxhZGRlcl9kYXRhOiBMYWRkZXJEYXRhO1xyXG4gIHB1YmxpYyBsYWRkZXJfdGVtcF9kYXRhOiBMYWRkZXJUZW1wRGF0YTtcclxuICBwdWJsaWMgc2lnbl9kYXRhOiBTaWduRGF0YTtcclxuICBwdWJsaWMgc2V0dGluZ3NfZGF0YTogU2V0dGluZ3NEYXRhO1xyXG4gIHB1YmxpYyBtYWlsX3RlbXBfZGF0YTogTWFpbFRlbXBEYXRhO1xyXG4gIHB1YmxpYyBsdWNreV93aGVlbF9kYXRhOiBMdWNreVdoZWVsRGF0YTtcclxuICBwdWJsaWMgaGVyb19zdGFyX2RhdGE6IEhlcm9TdGFyRGF0YTtcclxuICBwdWJsaWMgZGVzaWduX3Jlc29sdXRpb246IGNjLlZlYzI7XHJcblxyXG4gIC8vIEBcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaXNfaW5pdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudF9lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy50b3RhbF9udW0gPSAwO1xyXG4gICAgdGhpcy5jdXJyZW50X251bSA9IDA7XHJcbiAgICB0aGlzLmxhc3RfZXJyb3JfY29udGVudCA9IFwiXCI7XHJcbiAgICB0aGlzLmVycm9yX2NvbnRlbnQgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IERhdGFNYW5hZ2VyIHtcclxuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgRGF0YU1hbmFnZXIoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8vIEBcclxuICBwdWJsaWMgcHJpb3JpdHlfaW5pdChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXJ2ZXJfZGF0YSA9IFNlcnZlckRhdGEuZ2V0X2luc3RhbmNlKCkgYXMgU2VydmVyRGF0YTtcclxuICAgIHRoaXMubWFpbl9kYXRhID0gTWFpbkRhdGEuZ2V0X2luc3RhbmNlKCkgYXMgTWFpbkRhdGE7XHJcbiAgICB0aGlzLm1haW5fZGF0YS5hc3luY19yZWFkX2RhdGEoKCkgPT4ge1xyXG4gICAgICBjYWxsYmFjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHVibGljIGluaXQoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMuY29uZmlnX2RhdGEgPSBuZXcgQ29uZmlnRGF0YSgpO1xyXG4gICAgdGhpcy5jb25maWdfZGF0YS5pbml0QWxsQ2ZnKCk7XHJcbiAgICB0aGlzLmluaXRfY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIHRoaXMucmVjb3JkX2RhdGEgPSBSZWNvcmREYXRhLmdldF9pbnN0YW5jZSgpO1xyXG4gICAgdGhpcy50b3RhbF9udW0rKztcclxuICAgIHRoaXMuc3RhcnRfZGF0YSA9IFN0YXJ0RGF0YS5nZXRfaW5zdGFuY2U8U3RhcnREYXRhPigpO1xyXG4gICAgdGhpcy50b3RhbF9udW0rKztcclxuICAgIHRoaXMuZmlnaHRfZGF0YSA9IEZpZ2h0RGF0YS5nZXRfaW5zdGFuY2UoKTtcclxuICAgIHRoaXMuZmlnaHRfdGVtcF9kYXRhID0gRmlnaHRUZW1wRGF0YS5nZXRfaW5zdGFuY2UoKTtcclxuICAgIHRoaXMudG90YWxfbnVtKys7XHJcbiAgICB0aGlzLm1hcENlbGxfZGF0YSA9IE1hcENlbGxDZmdEYXRhLmdldF9pbnN0YW5jZSgpO1xyXG4gICAgdGhpcy50b3RhbF9udW0rKztcclxuICAgIHRoaXMuc3RvcmVfZGF0YSA9IFN0b3JlRGF0YS5nZXRfaW5zdGFuY2UoKTtcclxuICAgIHRoaXMudG90YWxfbnVtKys7XHJcbiAgICB0aGlzLnRhc2tfZGF0YSA9IFRhc2tEYXRhLmdldF9pbnN0YW5jZSgpO1xyXG4gICAgdGhpcy50b3RhbF9udW0rKztcclxuICAgIHRoaXMudHVydGxlX2V4Y2hhbmdlX2RhdGEgPSBUdXJ0bGVFeGNoYW5nZURhdGEuZ2V0X2luc3RhbmNlKCk7XHJcbiAgICB0aGlzLnRvdGFsX251bSsrO1xyXG4gICAgdGhpcy5sYWRkZXJfZGF0YSA9IExhZGRlckRhdGEuZ2V0X2luc3RhbmNlKCk7XHJcbiAgICB0aGlzLmxhZGRlcl90ZW1wX2RhdGEgPSBMYWRkZXJUZW1wRGF0YS5nZXRfaW5zdGFuY2UoKTtcclxuICAgIHRoaXMudG90YWxfbnVtKys7XHJcbiAgICB0aGlzLnNpZ25fZGF0YSA9IFNpZ25EYXRhLmdldF9pbnN0YW5jZSgpO1xyXG4gICAgdGhpcy50b3RhbF9udW0rKztcclxuICAgIHRoaXMuc2V0dGluZ3NfZGF0YSA9IFNldHRpbmdzRGF0YS5nZXRfaW5zdGFuY2UoKTtcclxuICAgIHRoaXMudG90YWxfbnVtKys7XHJcbiAgICB0aGlzLm1haWxfdGVtcF9kYXRhID0gTWFpbFRlbXBEYXRhLmdldF9pbnN0YW5jZSgpO1xyXG4gICAgdGhpcy5sdWNreV93aGVlbF9kYXRhID0gTHVja3lXaGVlbERhdGEuZ2V0X2luc3RhbmNlKCk7XHJcbiAgICB0aGlzLnRvdGFsX251bSsrO1xyXG4gICAgdGhpcy5oZXJvX3N0YXJfZGF0YSA9IEhlcm9TdGFyRGF0YS5nZXRfaW5zdGFuY2UoKTtcclxuICAgIHRoaXMudG90YWxfbnVtKys7XHJcbiAgICAvL1xyXG4gICAgdGhpcy5yZWNvcmRfZGF0YS5hc3luY19yZWFkX2RhdGEoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrX3JlYWRfYWxsX2RhdGFfY29tcGxldGUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdGFydF9kYXRhLmFzeW5jX3JlYWRfZGF0YSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tfcmVhZF9hbGxfZGF0YV9jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZpZ2h0X2RhdGEuYXN5bmNfcmVhZF9kYXRhKCgpID0+IHtcclxuICAgICAgdGhpcy5jaGVja19yZWFkX2FsbF9kYXRhX2NvbXBsZXRlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubWFwQ2VsbF9kYXRhLmFzeW5jX3JlYWRfZGF0YSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tfcmVhZF9hbGxfZGF0YV9jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0b3JlX2RhdGEuYXN5bmNfcmVhZF9kYXRhKCgpID0+IHtcclxuICAgICAgdGhpcy5jaGVja19yZWFkX2FsbF9kYXRhX2NvbXBsZXRlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubGFkZGVyX2RhdGEuYXN5bmNfcmVhZF9kYXRhKCgpID0+IHtcclxuICAgICAgdGhpcy5jaGVja19yZWFkX2FsbF9kYXRhX2NvbXBsZXRlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudGFza19kYXRhLmFzeW5jX3JlYWRfZGF0YSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tfcmVhZF9hbGxfZGF0YV9jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnR1cnRsZV9leGNoYW5nZV9kYXRhLmFzeW5jX3JlYWRfZGF0YSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tfcmVhZF9hbGxfZGF0YV9jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNpZ25fZGF0YS5hc3luY19yZWFkX2RhdGEoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrX3JlYWRfYWxsX2RhdGFfY29tcGxldGUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXR0aW5nc19kYXRhLmFzeW5jX3JlYWRfZGF0YSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tfcmVhZF9hbGxfZGF0YV9jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmx1Y2t5X3doZWVsX2RhdGEuYXN5bmNfcmVhZF9kYXRhKCgpID0+IHtcclxuICAgICAgdGhpcy5jaGVja19yZWFkX2FsbF9kYXRhX2NvbXBsZXRlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaGVyb19zdGFyX2RhdGEuYXN5bmNfcmVhZF9kYXRhKCh0KSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tfcmVhZF9hbGxfZGF0YV9jb21wbGV0ZSgpO1xyXG4gICAgfSk7XHJcbiAgICAvL1xyXG4gICAgbmV3IFN1cGVySGVyb1RpbWVyKCkuaW5pdCgpO1xyXG4gIH0gLy8gZW5kOiBpbml0XHJcblxyXG4gIC8vIEBcclxuICBwdWJsaWMgY2xlYXJfc3RvcmVfZGF0YSgpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKFwiTWFpbkRhdGEtLS0tLS0tLS1cIiwgTWFpbkRhdGEuZ2V0X2luc3RhbmNlPE1haW5EYXRhPigpLlNUT1JBR0VfS0VZKTtcclxuICAgIGNvbnNvbGUubG9nKFwiU3RhcnREYXRhLS0tLS0tLS1cIiwgU3RhcnREYXRhLmdldF9pbnN0YW5jZTxTdGFydERhdGE+KCkuU1RPUkFHRV9LRVkpO1xyXG4gICAgTWFpbkRhdGEuZ2V0X2luc3RhbmNlPE1haW5EYXRhPigpLmFzeW5jX2RlbGV0ZV9kYXRhKCk7XHJcbiAgICBTdGFydERhdGEuZ2V0X2luc3RhbmNlPFN0YXJ0RGF0YT4oKS5hc3luY19kZWxldGVfZGF0YSgpO1xyXG4gICAgUmVjb3JkRGF0YS5nZXRfaW5zdGFuY2U8UmVjb3JkRGF0YT4oKS5hc3luY19kZWxldGVfZGF0YSgpO1xyXG4gICAgU3RvcmVEYXRhLmdldF9pbnN0YW5jZTxTdG9yZURhdGE+KCkuYXN5bmNfZGVsZXRlX2RhdGEoKTtcclxuICAgIExhZGRlckRhdGEuZ2V0X2luc3RhbmNlPExhZGRlckRhdGE+KCkuYXN5bmNfZGVsZXRlX2RhdGEoKTtcclxuICAgIFRhc2tEYXRhLmdldF9pbnN0YW5jZTxUYXNrRGF0YT4oKS5hc3luY19kZWxldGVfZGF0YSgpO1xyXG4gICAgVHVydGxlRXhjaGFuZ2VEYXRhLmdldF9pbnN0YW5jZTxUdXJ0bGVFeGNoYW5nZURhdGE+KCkuYXN5bmNfZGVsZXRlX2RhdGEoKTtcclxuICAgIE1hcENlbGxDZmdEYXRhLmdldF9pbnN0YW5jZTxNYXBDZWxsQ2ZnRGF0YT4oKS5hc3luY19kZWxldGVfZGF0YSgpO1xyXG4gICAgRmlnaHREYXRhLmdldF9pbnN0YW5jZTxGaWdodERhdGE+KCkuYXN5bmNfZGVsZXRlX2RhdGEoKTtcclxuICAgIFNpZ25EYXRhLmdldF9pbnN0YW5jZTxTaWduRGF0YT4oKS5hc3luY19kZWxldGVfZGF0YSgpO1xyXG4gICAgU2V0dGluZ3NEYXRhLmdldF9pbnN0YW5jZTxTZXR0aW5nc0RhdGE+KCkuYXN5bmNfZGVsZXRlX2RhdGEoKTtcclxuICAgIEx1Y2t5V2hlZWxEYXRhLmdldF9pbnN0YW5jZTxMdWNreVdoZWVsRGF0YT4oKS5hc3luY19kZWxldGVfZGF0YSgpO1xyXG4gICAgSGVyb1N0YXJEYXRhLmdldF9pbnN0YW5jZTxIZXJvU3RhckRhdGE+KCkuYXN5bmNfZGVsZXRlX2RhdGEoKTtcclxuICAgIFJlcG9ydERhdGEuaW5zdGFuY2UuY2xlYXJfZGF0YSgpO1xyXG4gICAgTmV0VXRpbHMucmVtb3ZlX3V1aWQoKTtcclxuICAgIGdtLnVpLnNob3dfbm90aWNlKGdtLmNvbnN0LlRFWFRfMSk7XHJcbiAgfVxyXG5cclxuICAvLyBAICh1c2VkIGZvciBkZWJ1Z2dpbmcpXHJcbiAgcHVibGljIGV4cG9ydF9kYXRhKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgZXJyb3JfbG9nOiB0aGlzLmV4cG9ydF9lcnJvcl9sb2coKSxcclxuICAgICAgc3RvcmVfZGF0YTogdGhpcy5leHBvcnRfc3RvcmVfZGF0YSgpLFxyXG4gICAgICBmaWdodF9kYXRhOiB0aGlzLmV4cG9ydF9maWdodF9kYXRhKClcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgY29uc3QganNvbkRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtqc29uRGF0YV0sIHsgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcgfSk7XHJcbiAgICAgIHNhdmVBcyhibG9iLCAnZGVidWdnaW5nLWRhdGEudHh0Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBqc29uU3RvcmVEYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YS5zdG9yZV9kYXRhKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBqc29uU3RvcmVEYXRhLmxlbmd0aDsgaSArPSAxMDAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coanNvblN0b3JlRGF0YS5zdWJzdHIoaSwgTWF0aC5taW4oMTAwMCwganNvblN0b3JlRGF0YS5sZW5ndGggLSBpKSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vbi1icm93c2VyIHBsYXRmb3JtcyBjYW5ub3QgZXhwb3J0IGRhdGEnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEBcclxuICBwdWJsaWMgY2F0Y2hfZXJyb3JfbG9nKGlzRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICBpZiAod2luZG93Lm9uZXJyb3IpIHJldHVybjtcclxuICAgIGlmICghaXNFbmFibGVkKSB7XHJcbiAgICAgIHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2U6IHN0cmluZywgc291cmNlOiBzdHJpbmcsIGxpbmVubzogbnVtYmVyLCBjb2xubzogbnVtYmVyLCBlcnJvcjogRXJyb3IpIHtcclxuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IG1lc3NhZ2UgKyBcIj4+XCIgKyBzb3VyY2UgKyBcIjpcIiArIGxpbmVubztcclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9IFwiIFwiICsgY29sbm8gKyBcIiBzdGFjazpcIjtcclxuICAgICAgICBlcnJvck1lc3NhZ2UgKz0gZXJyb3Iuc3RhY2suc3Vic3RyKDAsIE1hdGgubWF4KE1hdGgubWluKDEwMjQwIC0gZXJyb3JNZXNzYWdlLmxlbmd0aCwgZXJyb3Iuc3RhY2subGVuZ3RoKSwgMCkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzZWxmLmVycm9yX2NvbnRlbnQgPT09IGVycm9yTWVzc2FnZSkgcmV0dXJuIHRydWU7XHJcbiAgICAgIHNlbGYubGFzdF9lcnJvcl9jb250ZW50ID0gc2VsZi5lcnJvcl9jb250ZW50O1xyXG4gICAgICBzZWxmLmVycm9yX2NvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0uYmluZChzZWxmKTtcclxuICB9XHJcblxyXG4gIC8vIEBcclxuICBwcml2YXRlIGV4cG9ydF9lcnJvcl9sb2coKTogeyBlcnJvcl9jb250ZW50OiBzdHJpbmc7IGxhc3RfZXJyb3JfY29udGVudDogc3RyaW5nIH0ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXJyb3JfY29udGVudDogdGhpcy5lcnJvcl9jb250ZW50LFxyXG4gICAgICBsYXN0X2Vycm9yX2NvbnRlbnQ6IHRoaXMubGFzdF9lcnJvcl9jb250ZW50XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBleHBvcnRfc3RvcmVfZGF0YSgpOiB7IFtrZXk6IHN0cmluZ106IFN0b3JhZ2VCYXNlIHwgc3RyaW5nIH0ge1xyXG4gICAgY29uc3QgZGF0YTogeyBba2V5OiBzdHJpbmddOiBTdG9yYWdlQmFzZSB8IHN0cmluZyB9ID0ge307XHJcbiAgICBkYXRhW3RoaXMubWFpbl9kYXRhLlBSRUZJWCArIHRoaXMubWFpbl9kYXRhLlNUT1JBR0VfS0VZXSA9IHRoaXMubWFpbl9kYXRhO1xyXG4gICAgZGF0YVt0aGlzLnN0YXJ0X2RhdGEuUFJFRklYICsgdGhpcy5zdGFydF9kYXRhLlNUT1JBR0VfS0VZXSA9IHRoaXMuc3RhcnRfZGF0YTtcclxuICAgIGRhdGFbdGhpcy5yZWNvcmRfZGF0YS5QUkVGSVggKyB0aGlzLnJlY29yZF9kYXRhLlNUT1JBR0VfS0VZXSA9IHRoaXMucmVjb3JkX2RhdGE7XHJcbiAgICBkYXRhW3RoaXMuc3RvcmVfZGF0YS5QUkVGSVggKyB0aGlzLnN0b3JlX2RhdGEuU1RPUkFHRV9LRVldID0gdGhpcy5zdG9yZV9kYXRhO1xyXG4gICAgZGF0YVt0aGlzLmxhZGRlcl9kYXRhLlBSRUZJWCArIHRoaXMubGFkZGVyX2RhdGEuU1RPUkFHRV9LRVldID0gdGhpcy5sYWRkZXJfZGF0YTtcclxuICAgIGRhdGFbdGhpcy50YXNrX2RhdGEuUFJFRklYICsgdGhpcy50YXNrX2RhdGEuU1RPUkFHRV9LRVldID0gdGhpcy50YXNrX2RhdGE7XHJcbiAgICBkYXRhW3RoaXMudHVydGxlX2V4Y2hhbmdlX2RhdGEuUFJFRklYICsgdGhpcy50dXJ0bGVfZXhjaGFuZ2VfZGF0YS5TVE9SQUdFX0tFWV0gPSB0aGlzLnR1cnRsZV9leGNoYW5nZV9kYXRhO1xyXG4gICAgZGF0YVt0aGlzLm1hcENlbGxfZGF0YS5QUkVGSVggKyB0aGlzLm1hcENlbGxfZGF0YS5TVE9SQUdFX0tFWV0gPSB0aGlzLm1hcENlbGxfZGF0YTtcclxuICAgIGRhdGFbdGhpcy5maWdodF9kYXRhLlBSRUZJWCArIHRoaXMuZmlnaHRfZGF0YS5TVE9SQUdFX0tFWV0gPSB0aGlzLmZpZ2h0X2RhdGE7XHJcbiAgICBkYXRhW3RoaXMuc2V0dGluZ3NfZGF0YS5QUkVGSVggKyB0aGlzLnNldHRpbmdzX2RhdGEuU1RPUkFHRV9LRVldID0gdGhpcy5zZXR0aW5nc19kYXRhO1xyXG4gICAgZGF0YVtOZXRVdGlscy5QUkVGSVggKyBOZXRVdGlscy5TVE9SQUdFX0tFWV0gPSBnbS5jaGFubmVsLmdldF9kZXZpY2VfaWQoKTtcclxuICAgIGRhdGEuUDJfVUlEID0gZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQ7XHJcbiAgICBkYXRhLlAyX1JlcG9ydERhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJQMl9SZXBvcnREYXRhXCIpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICAvLyBALCB0eXBlICEhIVxyXG4gIHByaXZhdGUgZXhwb3J0X2ZpZ2h0X2RhdGEoKTogZmlnaHRUZW1wRGF0YSB7XHJcbiAgICBjb25zdCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwbGF5X3R5cGU6IGZpZ2h0VGVtcERhdGEucGxheV90eXBlLFxyXG4gICAgICBtYXBfaWQ6IGZpZ2h0VGVtcERhdGEubWFwX2lkLFxyXG4gICAgICBtYXBfZGF0YV9pZDogZmlnaHRUZW1wRGF0YS5tYXBfZGF0YV9pZCxcclxuICAgICAgYm9hdF9pZDogZmlnaHRUZW1wRGF0YS5ib2F0X2lkLFxyXG4gICAgICBuYW1lOiBmaWdodFRlbXBEYXRhLm5hbWVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBAXHJcbiAgcHJpdmF0ZSBjaGVja19yZWFkX2FsbF9kYXRhX2NvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50X251bSsrO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudF9udW0gPj0gdGhpcy50b3RhbF9udW0pIHtcclxuICAgICAgdGhpcy5jaGVja19yZXNldF9kYXRhKCk7XHJcbiAgICAgIHRoaXMuaXNfaW5pdCA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLmluaXRfY2FsbGJhY2spIHRoaXMuaW5pdF9jYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQFxyXG4gIHByaXZhdGUgY2hlY2tfcmVzZXRfZGF0YSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBjdXJyZW50VGltZSA9IE1hdGguZmxvb3IoY3VycmVudERhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XHJcbiAgICBjdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lIC0gKGN1cnJlbnRUaW1lIC0gNjAgKiBjdXJyZW50RGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKSAlIDg2NDAwO1xyXG4gICAgaWYgKGN1cnJlbnRUaW1lIDwgdGhpcy5zaWduX2RhdGEubmV4dF9kYXlfdGltZSkgcmV0dXJuO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IGRheXNQYXNzZWQgPSBNYXRoLmNlaWwoKGN1cnJlbnRUaW1lIC0gdGhpcy5zaWduX2RhdGEubmV4dF9kYXlfdGltZSkgLyA4NjQwMCkgKyAxO1xyXG4gICAgdGhpcy5zaWduX2RhdGEuc2lnbl9kYXkgKz0gZGF5c1Bhc3NlZDtcclxuICAgIHRoaXMuc2lnbl9kYXRhLm5leHRfZGF5X3RpbWUgPSA4NjQwMCArIGN1cnJlbnRUaW1lO1xyXG4gICAgdGhpcy5zaWduX2RhdGEuc2lnbl9zdGF0ZSA9IDA7XHJcbiAgICAvL1xyXG4gICAgaWYgKHRoaXMuc2lnbl9kYXRhLnNpZ25fZGF5ID4gMCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFNpZ25EYXRhLlNJR05fTE9PUF9EQVk7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNpZ25EYXRhSXRlbSA9IHRoaXMuc2lnbl9kYXRhLnNpZ25fZGF0YV9hcnJheVtpXTtcclxuICAgICAgICBzaWduRGF0YUl0ZW0uYXJyYXlfaW5kZXggPSBpO1xyXG4gICAgICAgIHNpZ25EYXRhSXRlbS5kYXkgPSAodGhpcy5zaWduX2RhdGEuc2lnbl9kYXkgKyBpICsgMSkgJSBTaWduRGF0YS5NQVhfREFZX0NPVU5UO1xyXG4gICAgICAgIHNpZ25EYXRhSXRlbS5zdGF0ZSA9IGkgPT09IDAgPyAxIDogMDtcclxuICAgICAgICBjb25zdCBjb25maWdEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlNpZ25Db25maWdEYXRhXCIsIHNpZ25EYXRhSXRlbS5kYXkudG9TdHJpbmcoKSkgYXMgU2lnbkNvbmZpZztcclxuICAgICAgICBpZiAoY29uZmlnRGF0YSkgc2lnbkRhdGFJdGVtLnJld2FyZF9hcnJheSA9IGNvbmZpZ0RhdGEucmV3YXJkX2FycmF5O1xyXG4gICAgICB9XHJcbiAgICAgIC8vXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU2lnbkRhdGEuTUFYX0JVWV9DT1VOVDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgc2lnbkJ1eURhdGFJdGVtID0gdGhpcy5zaWduX2RhdGEuc2lnbl9idXlfZGF0YV9hcnJheVtpXTtcclxuICAgICAgICBzaWduQnV5RGF0YUl0ZW0uYXJyYXlfaW5kZXggPSBpO1xyXG4gICAgICAgIHNpZ25CdXlEYXRhSXRlbS5zdGF0ZSA9IDE7XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJTaWduQ29uZmlnRGF0YVwiLCAodGhpcy5zaWduX2RhdGEuc2lnbl9kYXkgKyAxKS50b1N0cmluZygpKSBhcyBTaWduQ29uZmlnO1xyXG4gICAgICAgIGlmIChjb25maWdEYXRhKSBzaWduQnV5RGF0YUl0ZW0ucmV3YXJkX2RhdGEgPSBjb25maWdEYXRhLm90aGVyX3Jld2FyZF9hcnJheVtpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9cclxuICAgIHRoaXMuc2lnbl9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIHRoaXMubHVja3lfd2hlZWxfZGF0YS5sZWZ0X2x1Y2t5X3doZWVsX2ZyZWVfY291bnQgPSBnbS5jb25zdC5NQVhfTFVDS1lfV0hFRUxfRlJFRV9DT1VOVDtcclxuICAgIHRoaXMubHVja3lfd2hlZWxfZGF0YS5sZWZ0X2x1Y2t5X3doZWVsX3ZpZGVvX2NvdW50ID0gZ20uY29uc3QuTUFYX0xVQ0tZX1dIRUVMX1ZJREVPX0NPVU5UO1xyXG4gICAgdGhpcy5sdWNreV93aGVlbF9kYXRhLmxhc3RfcmV3YXJkX2luZGV4ID0gMDtcclxuICAgIHRoaXMubHVja3lfd2hlZWxfZGF0YS5mcmVlX3RpbWVzdGFtcCA9IERhdGUubm93KCkgKyBnbS5jb25zdC5GUkVFX0RSQVdfVElNRV9JTlRFUlZBTDtcclxuICAgIHRoaXMubHVja3lfd2hlZWxfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB0aGlzLnJlY29yZF9kYXRhLnNoYXJlX3JlY29yZF9jb3VudCA9IDA7XHJcbiAgICB0aGlzLnJlY29yZF9kYXRhLmxlZnRfcHVzaF9zaGFyZV9jb3VudCA9IGdtLmNvbnN0Lk1BWF9QVVNIX1NIQVJFX0NPVU5UO1xyXG4gICAgdGhpcy5yZWNvcmRfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICB0aGlzLm1haW5fZGF0YS5sZWZ0X3NoYXJlX2NvdW50ID0gZ20uY29uc3QuTUFYX1ZJREVPX0ZBSUxfU0hBUkVfQ09VTlQ7XHJcbiAgICB0aGlzLm1haW5fZGF0YS5pc190b2RheV9ub19hZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYWluX2RhdGEubGVmdF9mcmVlX3N1cGVyX3JlY3J1aXRfY291bnQgPSBnbS5jb25zdC5NQVhfRlJFRV9TVVBFUl9SRUNSVUlUX0NPVU5UO1xyXG4gICAgdGhpcy5tYWluX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQCAobm90IHVzZSlcclxuICAvLyBwdWJsaWMgcmVzZXRfZGFpbHlfZGF0YSgpOiB2b2lkIHt9XHJcblxyXG4gIC8vIEAgKG5vdCB1c2UpXHJcbiAgLyogcHVibGljIHByaW50X2RlYnVnX2luZm8oKTogdm9pZCB7XHJcbiAgICAgIFN0b3JhZ2VNYW5hZ2VyLmluc3RhbmNlLnByaW50X2RlYnVnX2luZm8oKTtcclxuICB9ICovXHJcblxyXG4gIC8vIEAsIHR5cGUgISEhXHJcbiAgcHVibGljIHNob3dfd2Vha19ndWlkZSh0YXJnZXQ6IGNjLk5vZGUsIHBvc2l0aW9uOiBjYy5WZWMzLCBjb250ZW50OiBzdHJpbmcsIGRpc2FwcGVhclRpbWU6IG51bWJlciwgY2FsbGJhY2s6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsKTogdm9pZCB7XHJcbiAgICBpZiAodGFyZ2V0LmdldENoaWxkQnlOYW1lKFwid2Vha19ndWlkZVwiKSkgcmV0dXJuO1xyXG4gICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy93ZWFrX2d1aWRlXCIsIFdlYWtHdWlkZSwgKGluc3RhbmNlKSA9PiB7XHJcbiAgICAgIGlmICh0YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWFrX2d1aWRlXCIpKSByZXR1cm47XHJcbiAgICAgIGluc3RhbmNlLm5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgaW5zdGFuY2UuZGF0YSA9IHtcclxuICAgICAgICB0aXBfY29udGVudDogY29udGVudCxcclxuICAgICAgICB0aXBfb2Zmc2V0OiBjYy52MygtNTAsIDIzKSxcclxuICAgICAgICBkaXI6IERpcmVjdGlvbi5SSUdIVCxcclxuICAgICAgICBkaXNhcHBlYXJfdGltZTogZGlzYXBwZWFyVGltZSxcclxuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcclxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcclxuICAgICAgfTtcclxuICAgICAgdGFyZ2V0LmFkZENoaWxkKGluc3RhbmNlLm5vZGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBALCB0eXBlICEhISEgaXRlbXM6IHsgcHJvcDogbnVtYmVyOyB3ZWlnaHQ6IG51bWJlciB9W11cclxuICBwdWJsaWMgc2V0UmFuZG9tUmV3YXJkKGl0ZW1zOiBQb29sQ29uZmlnW10sIHJld2FyZHM6IFJvbGVJdGVtRGF0YVZPW10sIGNvdW50OiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICBsZXQgdG90YWxXZWlnaHQ6IG51bWJlciA9IDA7XHJcbiAgICBjb25zdCBjdW11bGF0aXZlV2VpZ2h0czogW251bWJlciwgbnVtYmVyXVtdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgdG90YWxXZWlnaHQgKz0gaXRlbS53ZWlnaHQ7XHJcbiAgICAgIGN1bXVsYXRpdmVXZWlnaHRzLnB1c2goW2l0ZW0ucHJvcCwgdG90YWxXZWlnaHRdKTtcclxuICAgIH1cclxuICAgIHdoaWxlIChyZXdhcmRzLmxlbmd0aCA8IGNvdW50KSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVdlaWdodCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRvdGFsV2VpZ2h0KTtcclxuICAgICAgZm9yIChsZXQgW3Byb3AsIHdlaWdodF0gb2YgY3VtdWxhdGl2ZVdlaWdodHMpIHtcclxuICAgICAgICBpZiAocmFuZG9tV2VpZ2h0IDw9IHdlaWdodCkge1xyXG4gICAgICAgICAgY29uc3QgcmV3YXJkSXRlbSA9IG5ldyBSb2xlSXRlbURhdGFWTygpO1xyXG4gICAgICAgICAgcmV3YXJkSXRlbS5pdGVtVHlwZSA9IHByb3AgPCAzMDAwMCA/IDEgOiAzO1xyXG4gICAgICAgICAgcmV3YXJkSXRlbS5pdGVtSUQgPSBwcm9wO1xyXG4gICAgICAgICAgcmV3YXJkcy5wdXNoKHJld2FyZEl0ZW0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBALCB0eXBlISEhXHJcbiAgcHVibGljIHVwZGF0ZV9wbGF5ZXJfZGF0YV9yZXF1ZXN0KGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgY29uc3QgZ2Fycmlzb25EYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpO1xyXG4gICAgaWYgKCFnYXJyaXNvbkRhdGEgfHwgZ2Fycmlzb25EYXRhLmJ1aWxkTHZsIDwgMSkgcmV0dXJuO1xyXG4gICAgY29uc3QgbWFwQ2VsbERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YTtcclxuICAgIGNvbnN0IG1hcFJlcG9ydERhdGEgPSBtYXBDZWxsRGF0YS5yb2xlX21hcF9yZXBvcnRfZGF0YTtcclxuICAgIC8vXHJcbiAgICBjb25zdCBtYXBSZXBvcnRJdGVtczogbWFwUmVwb3J0SXRlbVtdID0gW107XHJcbiAgICBjb25zdCBtYXBSZXBvcnRNYXA6IFJlY29yZDxudW1iZXIsIG1hcFJlcG9ydEl0ZW0+ID0ge307XHJcbiAgICBjb25zdCBoZXJvRGF0YUFycmF5OiBoZXJvRGVmZW5zZVtdID0gW107XHJcbiAgICBjb25zdCBzZWFnb2luZ0JvYXREYXRhID0gbWFwQ2VsbERhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uU0VBR09JTkdCT0FUX1RZUEUpO1xyXG4gICAgY29uc3QgYm9hdElkID0gc2VhZ29pbmdCb2F0RGF0YSA/IHNlYWdvaW5nQm9hdERhdGEuYnVpbGRJRCA6IDYwMDAxO1xyXG4gICAgY29uc3QgaXRlbURhdGFNYXA6IFJlY29yZDxudW1iZXIsIHsgaXRlbV9pZDogbnVtYmVyLCBpdGVtX251bTogbnVtYmVyIH0+ID0ge307XHJcbiAgICBjb25zdCBlbXB0eUNlbGxzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgY29uc3Qgc3BlY2lhbENlbGxzOiBudW1iZXJbXSA9IFsyMjQsIDIzMywgMjM0LCAyMTAsIDIxMSwgMjEyLCAyMjIsIDIyMywgMTg5XTtcclxuICAgIGNvbnN0IG5vcm1hbENlbGxzOiBudW1iZXJbXSA9IFsyMDgsIDIwOSwgMjAwLCAyMDEsIDE4NywgMTg4XTtcclxuXHJcbiAgICAvLyBmb3IxXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcFJlcG9ydERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgY2VsbElkID0gbWFwUmVwb3J0RGF0YVtpXTtcclxuICAgICAgaWYgKHNwZWNpYWxDZWxscy5pbmRleE9mKGNlbGxJZCkgPiAtMSkgY29udGludWU7XHJcbiAgICAgIGNvbnN0IGNlbGxEYXRhID0gbWFwQ2VsbERhdGEucm9sZV9tYXBfZGF0YVtjZWxsSWRdO1xyXG4gICAgICBjb25zdCBtYXBSZXBvcnRfSXRlbTogbWFwUmVwb3J0SXRlbSA9IHtcclxuICAgICAgICBjZWxsX2lkOiBjZWxsSWQsXHJcbiAgICAgICAgc2tpbGxfbHY6IDAsXHJcbiAgICAgICAgc3Rhcl9sdjogMCxcclxuICAgICAgICBpdGVtX3R5cGU6IDAsXHJcbiAgICAgICAgaXRlbV9pZDogMCxcclxuICAgICAgICB1bmlxdWVfaWQ6IDBcclxuICAgICAgfTtcclxuICAgICAgLy9cclxuICAgICAgaWYgKGNlbGxEYXRhKSB7XHJcbiAgICAgICAgaWYgKGNlbGxEYXRhLmNlbGxTdGF0ZSA9PT0gMikge1xyXG4gICAgICAgICAgaWYgKGNlbGxEYXRhLml0ZW1UeXBlID09PSAzICYmIGNlbGxEYXRhLml0ZW1JRCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBjZWxsRGF0YS5pdGVtSUQudG9TdHJpbmcoKSkgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICAgICAgaWYgKGhlcm9Db25maWcub2NjdXBhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgICBjb25zdCBoZXJvU3RhckRhdGEgPSBnbS5kYXRhLmhlcm9fc3Rhcl9kYXRhLmdldEhlcm9TdGFyRGF0YShoZXJvQ29uZmlnLmFybXMpO1xyXG4gICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLnN0YXJfbHYgPSBoZXJvU3RhckRhdGEgPyBoZXJvU3RhckRhdGEuc3RhciA6IDA7XHJcbiAgICAgICAgICAgICAgaWYgKGhlcm9Db25maWcub2NjdXBhdGlvbiA9PT0gMTApIHtcclxuICAgICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLml0ZW1fdHlwZSA9IGNlbGxEYXRhLml0ZW1UeXBlLFxyXG4gICAgICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS5pdGVtX2lkID0gY2VsbERhdGEuaXRlbUlELFxyXG4gICAgICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS5za2lsbF9sdiA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFJvbGVTa2lsbERhdGEoaGVyb0NvbmZpZy5za2lsbF9pZCkubHZsLFxyXG4gICAgICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS51bmlxdWVfaWQgPSBjZWxsRGF0YS5oZXJvVUlEO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVyb0NvbmZpZy5vY2N1cGF0aW9uID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgbWFwUmVwb3J0X0l0ZW0uaXRlbV90eXBlID0gY2VsbERhdGEuaXRlbVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLml0ZW1faWQgPSBjZWxsRGF0YS5pdGVtSUQsXHJcbiAgICAgICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLnNraWxsX2x2ID0gaGVyb0NvbmZpZy5sdixcclxuICAgICAgICAgICAgICAgICAgbWFwUmVwb3J0X0l0ZW0udW5pcXVlX2lkID0gY2VsbERhdGEuaGVyb1VJRDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEhlcm9EZWZhbnNlRGF0YUJ5SGVyb1VJRChjZWxsRGF0YS5oZXJvVUlEKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tpbGxfbHYgPSBoZXJvQ29uZmlnLmhlcm9fdHlwZSA9PT0gMSA/IGhlcm9Db25maWcubHYgOiBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRSb2xlU2tpbGxEYXRhKGhlcm9Db25maWcuc2tpbGxfaWQpLmx2bDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EZWZlbnNlRGF0YTogaGVyb0RlZmVuc2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgIHVuaXF1ZV9pZDogY2VsbERhdGEuaGVyb1VJRCxcclxuICAgICAgICAgICAgICAgICAgaGVyb19pZDogY2VsbERhdGEuaXRlbUlELFxyXG4gICAgICAgICAgICAgICAgICBza2lsbF9sdjogc2tpbGxfbHYsXHJcbiAgICAgICAgICAgICAgICAgIHN0YXJfbHY6IG1hcFJlcG9ydF9JdGVtLnN0YXJfbHZcclxuICAgICAgICAgICAgICAgIH07IC8vICBhcyB7IHVuaXF1ZV9pZDogc3RyaW5nOyBoZXJvX2lkOiBzdHJpbmc7IHNraWxsX2x2OiBudW1iZXI7IHN0YXJfbHY6IG51bWJlciB9XHJcbiAgICAgICAgICAgICAgICBoZXJvRGF0YUFycmF5LnB1c2goaGVyb0RlZmVuc2VEYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS5pdGVtX3R5cGUgPSBjZWxsRGF0YS5pdGVtVHlwZTtcclxuICAgICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLml0ZW1faWQgPSBjZWxsRGF0YS5pdGVtSUQ7XHJcbiAgICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS5za2lsbF9sdiA9IHNraWxsX2x2O1xyXG4gICAgICAgICAgICAgICAgbWFwUmVwb3J0X0l0ZW0udW5pcXVlX2lkID0gY2VsbERhdGEuaGVyb1VJRDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbERhdGEuaXRlbVR5cGUgPT09IDIgJiYgY2VsbERhdGEuaXRlbUlEID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBidWlsZENvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKGNlbGxEYXRhLml0ZW1JRCk7XHJcbiAgICAgICAgICAgIGlmICgoY2VsbERhdGEuaXRlbUlEIDwgNTcwMDAgfHwgY2VsbERhdGEuaXRlbUlEID49IDU4MDAwKSAmJiBidWlsZENvbmZpZyAmJiBidWlsZENvbmZpZy5idWlsZEx2ID4gMCkge1xyXG4gICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLml0ZW1fdHlwZSA9IGNlbGxEYXRhLml0ZW1UeXBlO1xyXG4gICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLml0ZW1faWQgPSBjZWxsRGF0YS5pdGVtSUQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbWFwUmVwb3J0X0l0ZW0uaXRlbV90eXBlID0gMDtcclxuICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS5pdGVtX2lkID0gMDtcclxuICAgICAgICAgICAgICBlbXB0eUNlbGxzLnB1c2goY2VsbElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHsgLy8gcGjhuqduIG7DoHkgQUkgbHXDtG4gc2FpXHJcbiAgICAgICAgICAgIGlmIChjZWxsRGF0YS5pdGVtVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIGlmICgoY2VsbERhdGEuaXRlbUlEID49IDEyMDAxICYmIGNlbGxEYXRhLml0ZW1JRCA8PSAxODAxMSkgfHwgKGNlbGxEYXRhLml0ZW1JRCA+PSAyNTAwMSAmJiBjZWxsRGF0YS5pdGVtSUQgPD0gMjUwMDgpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dMZXZlbFByb3AgPSB0aGlzLmhpZ2hfdG9fbG93X2xldmVsX3Byb3AoY2VsbERhdGEuaXRlbUlELCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3dMZXZlbFByb3AuaXRlbV9pZCA+IDAgJiYgbG93TGV2ZWxQcm9wLml0ZW1fbnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtRGF0YSA9IGl0ZW1EYXRhTWFwW2xvd0xldmVsUHJvcC5pdGVtX2lkXSB8fCB7IGl0ZW1faWQ6IGxvd0xldmVsUHJvcC5pdGVtX2lkLCBpdGVtX251bTogMCB9XHJcbiAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhLml0ZW1fbnVtICs9IGxvd0xldmVsUHJvcC5pdGVtX251bTtcclxuICAgICAgICAgICAgICAgICAgaXRlbURhdGFNYXBbbG93TGV2ZWxQcm9wLml0ZW1faWRdID0gaXRlbURhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcFJlcG9ydF9JdGVtLml0ZW1fdHlwZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBtYXBSZXBvcnRfSXRlbS5pdGVtX2lkID0gMDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW1wdHlDZWxscy5wdXNoKGNlbGxJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1hcENlbGxDb25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldE1hcENlbGxDZmdCeUlEKGNlbGxJZCk7XHJcbiAgICAgICAgbWFwUmVwb3J0X0l0ZW0uaXRlbV90eXBlID0gbWFwQ2VsbENvbmZpZy5pdGVtVHlwZTtcclxuICAgICAgICBtYXBSZXBvcnRfSXRlbS5pdGVtX2lkID0gbWFwQ2VsbENvbmZpZy5pdGVtSUQ7XHJcbiAgICAgIH1cclxuICAgICAgbWFwUmVwb3J0SXRlbXMucHVzaChtYXBSZXBvcnRfSXRlbSk7XHJcbiAgICAgIG1hcFJlcG9ydE1hcFttYXBSZXBvcnRfSXRlbS5jZWxsX2lkXSA9IG1hcFJlcG9ydF9JdGVtO1xyXG4gICAgfSAvLyBlbmQ6IGZvcjFcclxuXHJcbiAgICAvLyBAIGZvcjJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9ybWFsQ2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgY2VsbElkID0gbm9ybWFsQ2VsbHNbaV07XHJcbiAgICAgIGNvbnN0IG1hcFJlcG9ydF9JdGVtID0gbWFwUmVwb3J0TWFwW2NlbGxJZF07XHJcbiAgICAgIGlmIChtYXBSZXBvcnRfSXRlbSAmJiBlbXB0eUNlbGxzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDAsIGVtcHR5Q2VsbHMubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBlbXB0eUNlbGxJZCA9IGVtcHR5Q2VsbHMuc3BsaWNlKHJhbmRvbUluZGV4LCAxKVswXTtcclxuICAgICAgICBjb25zdCBlbXB0eUNlbGxSZXBvcnRJdGVtID0gbWFwUmVwb3J0TWFwW2VtcHR5Q2VsbElkXTtcclxuICAgICAgICBpZiAoZW1wdHlDZWxsUmVwb3J0SXRlbSkge1xyXG4gICAgICAgICAgZW1wdHlDZWxsUmVwb3J0SXRlbS5pdGVtX3R5cGUgPSBtYXBSZXBvcnRfSXRlbS5pdGVtX3R5cGU7XHJcbiAgICAgICAgICBlbXB0eUNlbGxSZXBvcnRJdGVtLml0ZW1faWQgPSBtYXBSZXBvcnRfSXRlbS5pdGVtX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgbWFwUmVwb3J0TWFwW2VtcHR5Q2VsbElkXTtcclxuICAgICAgfVxyXG4gICAgfSAvLyBlbmQ6IGZvcjJcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdCBsYWRkZXJMZXZlbCA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5jb252ZXJ0X3JhbmtfdG9fbHYoZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLnJhbmspO1xyXG4gICAgY29uc3QgbGFkZGVyTHYgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiTGFkZGVyTHZDb25maWdEYXRhXCIsIGxhZGRlckxldmVsLnRvU3RyaW5nKCkpIGFzIExhZGRlckxWQ29uZmlnXHJcbiAgICBjb25zdCBwcm9wUmF0aW8gPSBsYWRkZXJMdi5wcm9wX3JhdGlvO1xyXG5cclxuICAgIC8vIEAgZm9yM1xyXG4gICAgZm9yIChjb25zdCBpdGVtSWQgaW4gaXRlbURhdGFNYXApIHtcclxuICAgICAgY29uc3QgaXRlbURhdGEgPSBpdGVtRGF0YU1hcFtpdGVtSWRdO1xyXG4gICAgICBjb25zdCBwcm9wTWFwID0gZ20uY29uc3QuTUFQX1JFUE9SVF9QUk9QX01BUFtpdGVtRGF0YS5pdGVtX2lkXTtcclxuICAgICAgaWYgKHByb3BNYXApIHtcclxuICAgICAgICBpdGVtRGF0YS5pdGVtX251bSA9IE1hdGgubWluKHByb3BNYXAubWF4X251bSwgTWF0aC5jZWlsKGl0ZW1EYXRhLml0ZW1fbnVtICogcHJvcFJhdGlvKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbURhdGEuaXRlbV9udW0gPSAxO1xyXG4gICAgICAgIC8vIOWHuueOsOS6huacquiuvue9ruacgOWkp+S4iumZkOWAvOeahOmBk+WFtyzpgZPlhbfmlbDph4/lvLrliLbmlLnkuLoxXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZXJlIGlzIGFuIGl0ZW0gd2l0aG91dCBhIG1heGltdW0gbGltaXQsIHRoZSBpdGVtIHF1YW50aXR5IGlzIGZvcmNpYmx5IGNoYW5nZWQgdG8gMVwiKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIkJlZm9yZSBjb252ZXJzaW9uOlwiLCBKU09OLnN0cmluZ2lmeShpdGVtRGF0YSkpO1xyXG4gICAgICBjb25zdCBoaWdoTGV2ZWxQcm9wcyA9IHRoaXMubG93X2xldmVsX3RvX2hpZ2hfcHJvcChpdGVtRGF0YS5pdGVtX2lkLCBpdGVtRGF0YS5pdGVtX251bSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQWZ0ZXIgY29udmVyc2lvbjpcIiwgSlNPTi5zdHJpbmdpZnkoaGlnaExldmVsUHJvcHMpKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaWdoTGV2ZWxQcm9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGhpZ2hMZXZlbFByb3AgPSBoaWdoTGV2ZWxQcm9wc1tpXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhpZ2hMZXZlbFByb3AuaXRlbV9udW07IGorKykge1xyXG4gICAgICAgICAgaWYgKGVtcHR5Q2VsbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDAsIGVtcHR5Q2VsbHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgZW1wdHlDZWxsSWQgPSBlbXB0eUNlbGxzLnNwbGljZShyYW5kb21JbmRleCwgMSlbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGVtcHR5Q2VsbFJlcG9ydEl0ZW0gPSBtYXBSZXBvcnRNYXBbZW1wdHlDZWxsSWRdO1xyXG4gICAgICAgICAgICBpZiAoZW1wdHlDZWxsUmVwb3J0SXRlbSkge1xyXG4gICAgICAgICAgICAgIGVtcHR5Q2VsbFJlcG9ydEl0ZW0uaXRlbV90eXBlID0gMTtcclxuICAgICAgICAgICAgICBlbXB0eUNlbGxSZXBvcnRJdGVtLml0ZW1faWQgPSBoaWdoTGV2ZWxQcm9wLml0ZW1faWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gLy8gZW5kOiBmb3IzXHJcblxyXG4gICAgLy8gQFxyXG4gICAgY29uc3QgcGxheWVyRGF0YSA9IHtcclxuICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgbmlja25hbWU6IGdtLmRhdGEuc2VydmVyX2RhdGEubmlja25hbWUsXHJcbiAgICAgIHN0YXI6IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS50b3RhbF9zdGFyLFxyXG4gICAgICBoZXJvX2RhdGFfYXJyYXk6IGhlcm9EYXRhQXJyYXksXHJcbiAgICAgIG1hcF9kYXRhX2FycmF5OiBtYXBSZXBvcnRJdGVtcyxcclxuICAgICAgYm9hdF9pZDogYm9hdElkXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XHJcbiAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuXHJcbiAgICB9O1xyXG4gICAgLy8gQFxyXG4gICAgY29uc3QgcmVxdWVzdERhdGE6IHJlcXVlc3QgPSB7XHJcbiAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuLFxyXG4gICAgICBvcF90eXBlOiBcImRlZmVuc2l2ZV9kYXRhXCIsXHJcbiAgICAgIHN0YXI6IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS50b3RhbF9zdGFyLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwbGF5ZXJEYXRhKVxyXG4gICAgfTtcclxuICAgIC8vIEBcclxuICAgIHRoaXMuc2VydmVyX2RhdGEudXBkYXRlX3BsYXllcl9kYXRhX3JlcXVlc3QoKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0LlJlc3VsdENvZGUgPT09IDApIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBkYXRhIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIpOyAvLyDmm7TmlrDnjqnlrrbmlbDmja7miJDlip9cclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHJlcXVlc3RQYXJhbXMsIHJlcXVlc3REYXRhKTtcclxuICB9IC8vIGVuZDogdXBkYXRlX3BsYXllcl9kYXRhX3JlcXVlc3RcclxuXHJcbiAgLy8gQCwgdHlwZSEhIVxyXG4gIHB1YmxpYyBsb3dfbGV2ZWxfdG9faGlnaF9wcm9wKGl0ZW1JZDogbnVtYmVyLCBpdGVtTnVtOiBudW1iZXIpOiB7IGl0ZW1faWQ6IG51bWJlciwgaXRlbV9udW06IG51bWJlciB9W10ge1xyXG4gICAgY29uc3QgcmVzdWx0OiB7IGl0ZW1faWQ6IG51bWJlciwgaXRlbV9udW06IG51bWJlciB9W10gPSBbXTtcclxuICAgIGNvbnN0IGl0ZW1Db25maWc6IEl0ZW1Db25maWcgfCB1bmRlZmluZWQgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSXRlbUNvbmZpZ0RhdGFcIiwgaXRlbUlkLnRvU3RyaW5nKCkpIGFzIEl0ZW1Db25maWc7XHJcbiAgICAvL1xyXG4gICAgaWYgKGl0ZW1Db25maWcpIHtcclxuICAgICAgaWYgKGl0ZW1Db25maWcubHYgPiAwKSB7XHJcbiAgICAgICAgbGV0IHJlbWFpbmluZ051bSA9IGl0ZW1OdW07XHJcbiAgICAgICAgZm9yIChsZXQgbGV2ZWwgPSA0OyBsZXZlbCA+PSAxOyBsZXZlbC0tKSB7XHJcbiAgICAgICAgICBjb25zdCBoaWdoTGV2ZWxJdGVtSWQgPSBpdGVtSWQgKyBsZXZlbCAtIDE7XHJcbiAgICAgICAgICBjb25zdCBoaWdoTGV2ZWxJdGVtQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIGhpZ2hMZXZlbEl0ZW1JZC50b1N0cmluZygpKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgaWYgKGhpZ2hMZXZlbEl0ZW1Db25maWcpIHtcclxuICAgICAgICAgICAgY29uc3QgbWF4TnVtID0gTWF0aC5tYXgoMSwgaGlnaExldmVsSXRlbUNvbmZpZy5udW1iZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IE1hdGguZmxvb3IocmVtYWluaW5nTnVtIC8gbWF4TnVtKTtcclxuICAgICAgICAgICAgcmVtYWluaW5nTnVtICU9IG1heE51bTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgaXRlbV9pZDogaGlnaExldmVsSXRlbUlkLCBpdGVtX251bTogY291bnQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goeyBpdGVtX2lkOiBpdGVtSWQsIGl0ZW1fbnVtOiBpdGVtTnVtIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0gLy8gZW5kOiBsb3dfbGV2ZWxfdG9faGlnaF9wcm9wXHJcblxyXG4gIC8vIEBcclxuICBwdWJsaWMgaGlnaF90b19sb3dfbGV2ZWxfcHJvcChpdGVtSWQ6IG51bWJlciwgaXRlbU51bTogbnVtYmVyKTogeyBpdGVtX2lkOiBudW1iZXIsIGl0ZW1fbnVtOiBudW1iZXIgfSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IGl0ZW1faWQ6IDAsIGl0ZW1fbnVtOiAwIH07XHJcbiAgICBjb25zdCBpdGVtQ29uZmlnOiBJdGVtQ29uZmlnIHwgdW5kZWZpbmVkID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIGl0ZW1JZC50b1N0cmluZygpKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgLy9cclxuICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgIGlmIChpdGVtQ29uZmlnLmx2ID4gMCkge1xyXG4gICAgICAgIGNvbnN0IG1heE51bSA9IE1hdGgubWF4KDEsIGl0ZW1Db25maWcubHYpO1xyXG4gICAgICAgIHJlc3VsdC5pdGVtX2lkID0gaXRlbUNvbmZpZy5pZCAtIG1heE51bSArIDE7XHJcbiAgICAgICAgcmVzdWx0Lml0ZW1fbnVtID0gTWF0aC5tYXgoMSwgaXRlbUNvbmZpZy5udW1iZXIpICogaXRlbU51bTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuaXRlbV9pZCA9IGl0ZW1JZDtcclxuICAgICAgICByZXN1bHQuaXRlbV9udW0gPSBpdGVtTnVtO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0gLy8gZW5kOiBoaWdoX3RvX2xvd19sZXZlbF9wcm9wXHJcblxyXG4gIC8vIEAsIHR5cGUgISEhIVxyXG4gIHB1YmxpYyB1cGRhdGVfcGxheWVyX2ZpZ2h0X2RhdGEoXHJcbiAgICBjaGFuZ2Vfc3RhcjogbnVtYmVyLFxyXG4gICAgdGFyZ2V0X3VpZDogc3RyaW5nLFxyXG4gICAgdGFyZ2V0X25pY2tuYW1lOiBzdHJpbmcsXHJcbiAgICB0YXJnZXRfc3RhcjogbnVtYmVyLFxyXG4gICAgdGFyZ2V0X2NoYW5nZV9zdGFyOiBudW1iZXIsXHJcbiAgICBvcF9yZXN1bHQ6IG51bWJlcixcclxuICAgIG9wX3Jld2FyZDogeyBpZDogbnVtYmVyLCBudW06IG51bWJlciB9W10sXHJcbiAgICBvcF9sb3NzX3Jld2FyZDogeyBpZDogbnVtYmVyLCBudW06IG51bWJlciB9W10sXHJcbiAgICBvcF9iYXR0bGU6IHsgdW5pcXVlX2lkOiBudW1iZXIsIGlkOiBudW1iZXIsIGhwOiBudW1iZXIgfVtdLFxyXG4gICAgdGFyZ2V0X29wX2JhdHRsZTogeyB1bmlxdWVfaWQ6IG51bWJlciwgaWQ6IG51bWJlciwgaHA6IG51bWJlciB9W11cclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhcmFtczogcmVxdWVzdCA9IHtcclxuICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW5cclxuICAgIH07XHJcbiAgICAvL1xyXG4gICAgY29uc3QgZGF0YTogcmVxdWVzdCA9IHtcclxuICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW4sXHJcbiAgICAgIG5pY2tuYW1lOiBnbS5kYXRhLnNlcnZlcl9kYXRhLm5pY2tuYW1lLFxyXG4gICAgICBzdGFyOiBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEudG90YWxfc3RhcixcclxuICAgICAgY2hhbmdlX3N0YXIsXHJcbiAgICAgIHRhcmdldF91aWQsXHJcbiAgICAgIHRhcmdldF9uaWNrbmFtZSxcclxuICAgICAgdGFyZ2V0X3N0YXIsXHJcbiAgICAgIHRhcmdldF9jaGFuZ2Vfc3RhcixcclxuICAgICAgb3BfdHlwZTogXCIyXCIsXHJcbiAgICAgIG9wX3Jlc3VsdCxcclxuICAgICAgb3BfcmV3YXJkOiBKU09OLnN0cmluZ2lmeShvcF9yZXdhcmQpLFxyXG4gICAgICBvcF9sb3NzX3Jld2FyZDogSlNPTi5zdHJpbmdpZnkob3BfbG9zc19yZXdhcmQpLFxyXG4gICAgICBvcF9iYXR0bGU6IEpTT04uc3RyaW5naWZ5KG9wX2JhdHRsZSksXHJcbiAgICAgIHRhcmdldF9vcF9iYXR0bGU6IEpTT04uc3RyaW5naWZ5KHRhcmdldF9vcF9iYXR0bGUpXHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIHRoaXMuc2VydmVyX2RhdGEudXBkYXRlX3BsYXllcl9maWdodF9kYXRhKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UuUmVzdWx0Q29kZSA9PT0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVwb3J0IGNvbWJhdCBkYXRhIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgfVxyXG4gICAgfSwgcGFyYW1zLCBkYXRhKTtcclxuICB9IC8vIGVuZDogdXBkYXRlX3BsYXllcl9maWdodF9kYXRhXHJcblxyXG4gIC8vIEAgKG5vdCB1c2UpXHJcbiAgLyogcHVibGljIGdldF9wbGF5ZXJfZGF0YV9yZXF1ZXN0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XHJcbiAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuLFxyXG4gICAgICBvcF90eXBlOiBcImRlZmVuc2l2ZV9kYXRhXCJcclxuICAgIH07XHJcbiAgICAvL1xyXG4gICAgdGhpcy5zZXJ2ZXJfZGF0YS5nZXRfcGxheWVyX2RhdGFfcmVxdWVzdCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLlJlc3VsdENvZGUgPT09IDAgJiYgcmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5kYXRhLmRlZmVuc2l2ZV9kYXRhKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgZGF0YSBzdWNjZXNzZnVsbHlcIik7IC8vIOiOt+WPluaVsOaNruaIkOWKn1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHJlcXVlc3REYXRhKTtcclxuICB9ICovXHJcblxyXG4gIC8vIEAsIHR5cGUhISFcclxuICBwdWJsaWMgZ2V0X3BsYXllcl9zY29yZV9kYXRhX3JlcXVlc3QoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBjb25zdCByZXF1ZXN0RGF0YTogcmVxdWVzdCA9IHtcclxuICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW4sXHJcbiAgICAgIG9wX3R5cGU6IFwic2NvcmVcIlxyXG4gICAgfTtcclxuICAgIC8vXHJcbiAgICB0aGlzLnNlcnZlcl9kYXRhLmdldF9wbGF5ZXJfZGF0YV9yZXF1ZXN0KChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UuUmVzdWx0Q29kZSA9PT0gMCAmJiByZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLnRvdGFsX3N0YXIgPSBkYXRhLnNjb3JlcztcclxuICAgICAgICAgIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5yYW5rID0gZGF0YS5yYW5rIHx8IDA7XHJcbiAgICAgICAgICBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEuYXJjaF9yYW5rID0gZGF0YS5hcmNoX3JhbmsgfHwgMDtcclxuICAgICAgICAgIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5jYXN0bGVfbGV2ZWwgPSBkYXRhLmNhc3RsZV9sZXZlbCB8fCAwO1xyXG4gICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoU2VydmVyRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSk7XHJcbiAgICAgICAgICAvLyBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIgPD0+IHRoaXMuZXZlbnRfZW1pdHRlci5lbWl0KFNlcnZlckRhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJHZXQgZGF0YSBzdWNjZXNzZnVsbHlcIik7IC8vIOiOt+WPluaVsOaNruaIkOWKn1xyXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHJlcXVlc3REYXRhKTtcclxuICB9IC8vIGVuZDogZ2V0X3BsYXllcl9zY29yZV9kYXRhX3JlcXVlc3RcclxuXHJcbiAgLy8gQCwgdHlwZSEhIVxyXG4gIHB1YmxpYyB1cGRhdGVfcGxheWVyX3Njb3JlX2RhdGFfcmVxdWVzdChzdGFyOiBudW1iZXIsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgY29uc3QgZ2Fycmlzb25EYXRhOiBCdWlsZERhdGEgfCB1bmRlZmluZWQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRSk7XHJcbiAgICBpZiAoIWdhcnJpc29uRGF0YSB8fCBnYXJyaXNvbkRhdGEuYnVpbGRMdmwgPCAxKSByZXR1cm47XHJcbiAgICAvL1xyXG4gICAgbGV0IHRvdGFsQnVpbGRMZXZlbCA9IDA7XHJcbiAgICBsZXQgdG93ZXJMZXZlbCA9IDA7XHJcbiAgICBsZXQgYmFycmFja3NMZXZlbCA9IDA7XHJcbiAgICBsZXQgZ2Fycmlzb25MZXZlbCA9IDA7XHJcbiAgICBsZXQgc2VhZ29pbmdCb2F0TGV2ZWwgPSAwO1xyXG4gICAgbGV0IHdoYXJmVGF4TGV2ZWwgPSAwO1xyXG4gICAgbGV0IHByaXZhdGVIb3VzaW5nTGV2ZWwgPSAwO1xyXG4gICAgLy9cclxuICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YTtcclxuICAgIGZvciAoY29uc3QgYnVpbGRUeXBlIGluIGJ1aWxkRGF0YSkge1xyXG4gICAgICBjb25zdCBidWlsZCA9IGJ1aWxkRGF0YVtidWlsZFR5cGVdO1xyXG4gICAgICBpZiAoIWJ1aWxkKSBjb250aW51ZTtcclxuICAgICAgdG90YWxCdWlsZExldmVsICs9IGJ1aWxkLmJ1aWxkTHZsO1xyXG4gICAgICBpZiAoYnVpbGRUeXBlID09IEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgdG93ZXJMZXZlbCA9IGJ1aWxkLmJ1aWxkTHZsO1xyXG4gICAgICB9IGVsc2UgaWYgKGJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLkJBUlJBQ0tTX1RZUEUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgIGJhcnJhY2tzTGV2ZWwgPSBidWlsZC5idWlsZEx2bDtcclxuICAgICAgfSBlbHNlIGlmIChidWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgZ2Fycmlzb25MZXZlbCA9IGJ1aWxkLmJ1aWxkTHZsO1xyXG4gICAgICB9IGVsc2UgaWYgKGJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICBzZWFnb2luZ0JvYXRMZXZlbCA9IGJ1aWxkLmJ1aWxkTHZsO1xyXG4gICAgICB9IGVsc2UgaWYgKGJ1aWxkVHlwZSA9PSBCdWlsZFR5cGVFbnVtLldIQVJGVEFYX1RZUEUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgIHdoYXJmVGF4TGV2ZWwgPSBidWlsZC5idWlsZEx2bDtcclxuICAgICAgfSBlbHNlIGlmIChidWlsZFR5cGUgPT0gQnVpbGRUeXBlRW51bS5QUklWQVRFSE9VU0lOR19UWVBFLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICBwcml2YXRlSG91c2luZ0xldmVsID0gYnVpbGQuYnVpbGRMdmw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vXHJcbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0ge1xyXG4gICAgICB1aWQ6IGdtLmRhdGEuc2VydmVyX2RhdGEudWlkLFxyXG4gICAgICB0b2tlbjogZ20uZGF0YS5zZXJ2ZXJfZGF0YS50b2tlblxyXG4gICAgfTtcclxuICAgIC8vXHJcbiAgICBjb25zdCByZXF1ZXN0RGF0YTogcmVxdWVzdCA9IHtcclxuICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW4sXHJcbiAgICAgIG9wX3R5cGU6IFwic2NvcmVcIixcclxuICAgICAgc3Rhcjogc3RhcixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgIHNjb3Jlczogc3RhclxyXG4gICAgICB9KSxcclxuICAgICAgYXJjaF9kYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgY2FzdGxlOiB0b3dlckxldmVsLFxyXG4gICAgICAgIGNhbXA6IGJhcnJhY2tzTGV2ZWwsXHJcbiAgICAgICAgZGVmZW5zZTogZ2Fycmlzb25MZXZlbCxcclxuICAgICAgICBib2F0OiBzZWFnb2luZ0JvYXRMZXZlbCxcclxuICAgICAgICB0b3dlcjogd2hhcmZUYXhMZXZlbCxcclxuICAgICAgICBob3VzZTogcHJpdmF0ZUhvdXNpbmdMZXZlbFxyXG4gICAgICB9KSxcclxuICAgICAgYXJjaF9zY29yZTogdG90YWxCdWlsZExldmVsXHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIHRoaXMuc2VydmVyX2RhdGEudXBkYXRlX3BsYXllcl9kYXRhX3JlcXVlc3QoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5SZXN1bHRDb2RlID09PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgc3RhciBkYXRhIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIpOyAvLyDmm7TmlrDnjqnlrrbmmJ/mmJ/mlbDmja7miJDlip9cclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHJlcXVlc3RQYXJhbXMsIHJlcXVlc3REYXRhKTtcclxuICB9IC8vIGVuZDogdXBkYXRlX3BsYXllcl9zY29yZV9kYXRhX3JlcXVlc3RcclxuXHJcbiAgLy8gQCwgdHlwZSEhIVxyXG4gIHB1YmxpYyBtYXRjaF9wbGF5ZXIodGFyZ2V0VWlkOiBzdHJpbmcgPSBcIlwiKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbXM6IHJlcXVlc3QgPSB7XHJcbiAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuLFxyXG4gICAgICBzdGFyOiBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEudG90YWxfc3RhcixcclxuICAgICAgdGFyZ2V0X3VpZDogdGFyZ2V0VWlkXHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIGdtLmRhdGEuc2VydmVyX2RhdGEubWF0Y2hfcGxheWVycygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgIGlmIChyZXNwb25zZS5SZXN1bHRDb2RlID09PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgbWF0Y2hlZCBzdWNjZXNzZnVsbHlcIik7IC8vIOWMuemFjeeOqeWutuaIkOWKn1xyXG4gICAgICAgIGZpZ2h0VGVtcERhdGEuZ29hbF91aWQgPSByZXNwb25zZS5kYXRhLmdvYWxfdWlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFyZ2V0X3VpZDpcIiArIGZpZ2h0VGVtcERhdGEuZ29hbF91aWQpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGZpZ2h0VGVtcERhdGEuZGVmZW5zaXZlX2RhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmRhdGEucGxheWVyX2RhdGEuZGVmZW5zaXZlX2RhdGEpO1xyXG4gICAgICAgICAgaWYgKCFmaWdodFRlbXBEYXRhLmRlZmVuc2l2ZV9kYXRhLmhhc093blByb3BlcnR5KFwidWlkXCIpIHx8ICFmaWdodFRlbXBEYXRhLmRlZmVuc2l2ZV9kYXRhLmhhc093blByb3BlcnR5KFwibWFwX2RhdGFfYXJyYXlcIikpIHtcclxuICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5kZWZlbnNpdmVfZGF0YSA9IHtcclxuICAgICAgICAgICAgICB1aWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgbmlja25hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgc3RhcjogMCxcclxuICAgICAgICAgICAgICBib2F0X2lkOiAwLFxyXG4gICAgICAgICAgICAgIG1hcF9kYXRhX2FycmF5OiBbXSxcclxuICAgICAgICAgICAgICBoZXJvX2RhdGFfYXJyYXk6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiTWF0Y2hpbmcgcGxheWVyIGRhdGEgZXhjZXB0aW9uXCIpOyAvLyDljLnphY3njqnlrrbmlbDmja7lvILluLhcclxuICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5nb2FsX3VpZCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEubWF0Y2hfbWFwX2J5X2xhZGRlcl9sdigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjYy5lcnJvcihcIk1hdGNoIHBsYXllciBkYXRhIHBhcnNpbmcgZmFpbGVkXCIpOyAvLyDljLnphY3njqnlrrbmlbDmja7op6PmnpDlpLHotKVcclxuICAgICAgICAgIGZpZ2h0VGVtcERhdGEuZGVmZW5zaXZlX2RhdGEgPSB7XHJcbiAgICAgICAgICAgIHVpZDogXCJcIixcclxuICAgICAgICAgICAgbmlja25hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIHN0YXI6IDAsXHJcbiAgICAgICAgICAgIGJvYXRfaWQ6IDAsXHJcbiAgICAgICAgICAgIG1hcF9kYXRhX2FycmF5OiBbXSxcclxuICAgICAgICAgICAgaGVyb19kYXRhX2FycmF5OiBbXVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGZpZ2h0VGVtcERhdGEuZ29hbF91aWQgPSBcIlwiO1xyXG4gICAgICAgICAgZmlnaHRUZW1wRGF0YS5tYXRjaF9tYXBfYnlfbGFkZGVyX2x2KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5wbGF5X3R5cGUgPSAwO1xyXG4gICAgICAgIGdtLnVpLnNob3dfZmlnaHQoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcImZpZ2h0XCIsIHtcclxuICAgICAgICAgIGV2ZW50X2Rlc2M6IFwiUmFpZFwiLCAvLyDnqoHooq1cclxuICAgICAgICAgIGRlc2M6IFwic3RhcnRcIiAvLyDlvIDlp4tcclxuICAgICAgICB9KTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODIxKTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDgyMik7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuUmVzdWx0Q29kZSA9PT0gLTIpIHtcclxuICAgICAgICAvLyDor6Xnjqnlrrbku4rml6XooqvmlLvlh7vmrKHmlbDlt7Lnu4/ovr7liLDkuIrpmZDvvIzkuI3og73lpI3ku4dcclxuICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkLhuqFuIMSRw6MgxJHhuqF0IGdp4bubaSBo4bqhbiB04bqlbiBjw7RuZyBuZ8aw4budaSBuw6B5IHbDoCBraMO0bmcgdGjhu4MgdHLhuqMgxJHFqWEhISFcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgbWF0Y2ggZmFpbGVkLCBtYXRjaGluZyBOUEMgbWFwXCIpOyAvLyDljLnphY3njqnlrrblpLHotKUs5Yy56YWNTlBD5Zyw5Zu+XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5nb2FsX3VpZCA9IFwiXCI7XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5tYXRjaF9tYXBfYnlfbGFkZGVyX2x2KCk7XHJcbiAgICAgICAgZ20udWkuc2hvd19maWdodCgpO1xyXG4gICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwiZmlnaHRcIiwge1xyXG4gICAgICAgICAgZXZlbnRfZGVzYzogXCJSYWlkXCIsIC8vIOeqgeiirVxyXG4gICAgICAgICAgZGVzYzogXCJzdGFydFwiIC8vIOW8gOWni1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA4MjEpO1xyXG4gICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwODIyKTtcclxuICAgICAgfVxyXG4gICAgfSwgcGFyYW1zKTtcclxuICB9IC8vIGVuZDogbWF0Y2hfcGxheWVyXHJcblxyXG4gIC8vIEAgKG5vdCB1c2UpXHJcbiAgLyogcHVibGljIGdldF9wbGF5ZXJfZmlnaHRfcmVwbGF5X2RhdGEocmVwbGF5SWQ6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbXM6IFBsYXllckZpZ2h0UmVwbGF5RGF0YVBhcmFtcyA9IHtcclxuICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW4sXHJcbiAgICAgIHJlcGxheV9pZDogcmVwbGF5SWRcclxuICAgIH07XHJcbiAgICAvL1xyXG4gICAgdGhpcy5zZXJ2ZXJfZGF0YS5nZXRfcGxheWVyX2ZpZ2h0X3JlcGxheV9kYXRhKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5SZXN1bHRDb2RlID09PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPYnRhaW5pbmcgYmF0dGxlIHJlcGxheSBkYXRhIHN1Y2Nlc3NmdWxseVwiKTsgLy8g6I635Y+W5oiY5paX5Zue5pS+5pWw5o2u5oiQ5YqfXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9LCBwYXJhbXMpO1xyXG4gIH0gLy8gZW5kOiBnZXRfcGxheWVyX2ZpZ2h0X3JlcGxheV9kYXRhICovXHJcblxyXG4gIC8vIEBcclxuICBwdWJsaWMgZ2V0X3BsYXllcl9ub3RpY2UoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbXM6IHJlcXVlc3QgPSB7XHJcbiAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuXHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIHRoaXMuc2VydmVyX2RhdGEuZ2V0X3BsYXllcl9ub3RpY2UoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLlJlc3VsdENvZGUgPT09IDApIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBub3RpZmljYXRpb24gZGF0YSBzdWNjZXNzZnVsbHlcIik7IC8vIOiOt+WPlumAmuefpeaVsOaNruaIkOWKn1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyX2RhdGEuc2VydmVyX25vdGljZV9kYXRhW2tleV0gPSByZXNwb25zZS5kYXRhW2tleV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1haW5fZGF0YS5zZXJ2ZXJfbm90aWNlX2RhdGEpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zZXJ2ZXJfZGF0YS5zZXJ2ZXJfbm90aWNlX2RhdGFba2V5XSA+IHRoaXMubWFpbl9kYXRhLnNlcnZlcl9ub3RpY2VfZGF0YVtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5fZGF0YS5zZXJ2ZXJfbm90aWNlX2RhdGFba2V5XSA9IHRoaXMuc2VydmVyX2RhdGEuc2VydmVyX25vdGljZV9kYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50X2VtaXR0ZXIuZW1pdChrZXkgKyBcIl9jaGFuZ2VcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLm1haW5fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSwgcGFyYW1zKTtcclxuICB9IC8vIGVuZDogZ2V0X3BsYXllcl9ub3RpY2VcclxuXHJcbiAgLy8gQCwgdHlwZSEhIVxyXG4gIHB1YmxpYyBnZXRfcGxheWVyX2ZpZ2h0X2xvZ19kYXRhKG9wVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgY29uc3QgcGFyYW1zOiByZXF1ZXN0ID0ge1xyXG4gICAgICB1aWQ6IHRoaXMuc2VydmVyX2RhdGEudWlkLFxyXG4gICAgICB0b2tlbjogdGhpcy5zZXJ2ZXJfZGF0YS50b2tlbixcclxuICAgICAgb3BfdHlwZTogb3BUeXBlXHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIHRoaXMuc2VydmVyX2RhdGEuZ2V0X3BsYXllcl9maWdodF9kYXRhKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgIGlmICghcmVzcG9uc2UuZGF0YSB8fCByZXNwb25zZS5SZXN1bHRDb2RlICE9PSAwKSByZXR1cm47XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJfZGF0YS5tYWlsX2xvZ19kYXRhX2FycmF5ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICBpZiAob3BUeXBlID09PSBcIjFcIikge1xyXG4gICAgICAgICAgZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2RlZmVuc2VfbG9nX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2F0dGFja19sb2dfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlcnZlcl9kYXRhLm1haWxfbG9nX2RhdGFfYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgIGNvbnN0IGxvZ0RhdGEgPSB0aGlzLnNlcnZlcl9kYXRhLm1haWxfbG9nX2RhdGFfYXJyYXlbaV07XHJcbiAgICAgICAgICBjb25zdCBtYWlsTG9nSXRlbSA9IG5ldyBNYWlsTG9nSXRlbURhdGEoKTtcclxuICAgICAgICAgIG1haWxMb2dJdGVtLnJlcGxheV9pZCA9IGxvZ0RhdGEucmVwbGF5X2lkO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0udWlkID0gbG9nRGF0YS51aWQ7XHJcbiAgICAgICAgICBtYWlsTG9nSXRlbS5zdGFyID0gbG9nRGF0YS5zdGFyO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0udGFyZ2V0X3N0YXIgPSBsb2dEYXRhLnRhcmdldF9zdGFyO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0uY2hhbmdlX3N0YXIgPSBsb2dEYXRhLmNoYW5nZV9zdGFyO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0udGFyZ2V0X2NoYW5nZV9zdGFyID0gbG9nRGF0YS50YXJnZXRfY2hhbmdlX3N0YXI7XHJcbiAgICAgICAgICBtYWlsTG9nSXRlbS5vcF90eXBlID0gb3BUeXBlO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0udGFyZ2V0X3VpZCA9IGxvZ0RhdGEudGFyZ2V0X3VpZDtcclxuICAgICAgICAgIG1haWxMb2dJdGVtLnRhcmdldF9uaWNrbmFtZSA9IGxvZ0RhdGEudGFyZ2V0X25pY2tuYW1lO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0ub3BfcmVzdWx0ID0gbG9nRGF0YS5vcF9yZXN1bHQ7XHJcbiAgICAgICAgICBtYWlsTG9nSXRlbS5vcF9yZXdhcmQgPSBsb2dEYXRhLm9wX3Jld2FyZDtcclxuICAgICAgICAgIG1haWxMb2dJdGVtLm9wX2xvc3NfcmV3YXJkID0gbG9nRGF0YS5vcF9sb3NzX3Jld2FyZDtcclxuICAgICAgICAgIG1haWxMb2dJdGVtLmlzX2RlZHVjdF9sb3NzX3Jld2FyZCA9IGxvZ0RhdGEuaXNfZGVkdWN0X2xvc3NfcmV3YXJkO1xyXG4gICAgICAgICAgbWFpbExvZ0l0ZW0ub3BfYmF0dGxlID0gbG9nRGF0YS5vcF9iYXR0bGU7XHJcbiAgICAgICAgICBtYWlsTG9nSXRlbS50YXJnZXRfb3BfYmF0dGxlID0gbG9nRGF0YS50YXJnZXRfb3BfYmF0dGxlO1xyXG4gICAgICAgICAgLy9cclxuICAgICAgICAgIGlmIChvcFR5cGUgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFpbF90ZW1wX2RhdGEubWFpbF9kZWZlbnNlX2xvZ19kYXRhX2FycmF5LnB1c2gobWFpbExvZ0l0ZW0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2F0dGFja19sb2dfZGF0YV9hcnJheS5wdXNoKG1haWxMb2dJdGVtKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LCBwYXJhbXMpO1xyXG4gIH0gLy8gZW5kOiBnZXRfcGxheWVyX2ZpZ2h0X2xvZ19kYXRhXHJcblxyXG4gIC8vIEAsIHR5cGUhISFcclxuICBwdWJsaWMgZ2V0X3BsYXllcl9lbWFpbF9kYXRhKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbXM6IHJlcXVlc3QgPSB7XHJcbiAgICAgIHVpZDogdGhpcy5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiB0aGlzLnNlcnZlcl9kYXRhLnRva2VuXHJcbiAgICB9O1xyXG4gICAgLy9cclxuICAgIHRoaXMuc2VydmVyX2RhdGEuZ2V0X3BsYXllcl9lbWFpbF9kYXRhKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgIGlmICghcmVzcG9uc2UuZGF0YSB8fCByZXNwb25zZS5SZXN1bHRDb2RlICE9PSAwKSByZXR1cm47XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJfZGF0YS5tYWlsX2luYm94X2RhdGFfYXJyYXkgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIGdtLmRhdGEubWFpbF90ZW1wX2RhdGEubWFpbF9pbmJveF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VydmVyX2RhdGEubWFpbF9pbmJveF9kYXRhX2FycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBjb25zdCBpbmJveERhdGEgPSB0aGlzLnNlcnZlcl9kYXRhLm1haWxfaW5ib3hfZGF0YV9hcnJheVtpXTtcclxuICAgICAgICAgIGNvbnN0IG1haWxJbmJveEl0ZW0gPSBuZXcgTWFpbEluYm94SXRlbURhdGEoKTtcclxuICAgICAgICAgIG1haWxJbmJveEl0ZW0ubWFpbF9pZCA9IGluYm94RGF0YS5tYWlsX2lkO1xyXG4gICAgICAgICAgbWFpbEluYm94SXRlbS5tYWlsX3R5cGUgPSBpbmJveERhdGEubWFpbF90eXBlO1xyXG4gICAgICAgICAgbWFpbEluYm94SXRlbS5tYWlsX3NlbmRlciA9IGluYm94RGF0YS5tYWlsX3NlbmRlcjtcclxuICAgICAgICAgIG1haWxJbmJveEl0ZW0ubWFpbF90aXRsZSA9IGluYm94RGF0YS5tYWlsX3RpdGxlO1xyXG4gICAgICAgICAgbWFpbEluYm94SXRlbS5tYWlsX3RleHQgPSBpbmJveERhdGEubWFpbF90ZXh0O1xyXG4gICAgICAgICAgbWFpbEluYm94SXRlbS5yZXdhcmQgPSBpbmJveERhdGEucmV3YXJkO1xyXG4gICAgICAgICAgbWFpbEluYm94SXRlbS5vcF9zdGF0dXMgPSBpbmJveERhdGEub3Bfc3RhdHVzO1xyXG4gICAgICAgICAgbWFpbEluYm94SXRlbS5yZXdhcmRfc3RhdHVzID0gaW5ib3hEYXRhLnJld2FyZF9zdGF0dXM7XHJcbiAgICAgICAgICBtYWlsSW5ib3hJdGVtLnNlbmRfdGltZSA9IGluYm94RGF0YS5zZW5kX3RpbWU7XHJcbiAgICAgICAgICBtYWlsSW5ib3hJdGVtLnJld2FyZF9hcnJheSA9IFtdO1xyXG4gICAgICAgICAgLy9cclxuICAgICAgICAgIGlmIChtYWlsSW5ib3hJdGVtLm1haWxfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCByYW5rID0gbWFpbEluYm94SXRlbS5yZXdhcmQucmFuaztcclxuICAgICAgICAgICAgY29uc3QgbGV2ZWwgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEuY29udmVydF9yYW5rX3RvX2x2KHJhbmspO1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkxhZGRlclJld2FyZENvbmZpZ0RhdGFcIiwgbGV2ZWwudG9TdHJpbmcoKSkgYXMgTGFkZGVyUmV3YXJkQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnRGF0YSkge1xyXG4gICAgICAgICAgICAgIG1haWxJbmJveEl0ZW0ucmV3YXJkX2FycmF5ID0gY29uZmlnRGF0YS5yZXdhcmRfYXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAobWFpbEluYm94SXRlbS5tYWlsX3R5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgY29uc3QgbGV2ZWwgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEuY29udmVydF9idWlsZGluZ19yYW5rX3RvX2x2KG1haWxJbmJveEl0ZW0ucmV3YXJkLnJhbmspO1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkxhZGRlckJ1aWxkaW5nQ29uZmlnRGF0YVwiLCBsZXZlbC50b1N0cmluZygpKSBhcyBMYWRkZXJCdWlsZGRpbmc7XHJcbiAgICAgICAgICAgIGlmIChjb25maWdEYXRhKSB7XHJcbiAgICAgICAgICAgICAgbWFpbEluYm94SXRlbS5yZXdhcmRfYXJyYXkgPSBjb25maWdEYXRhLnJld2FyZF9hcnJheTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2luYm94X2RhdGFfYXJyYXkucHVzaChtYWlsSW5ib3hJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9LCBwYXJhbXMpO1xyXG4gIH0gLy8gZW5kOiBnZXRfcGxheWVyX2VtYWlsX2RhdGFcclxuXHJcbiAgLy8gQFxyXG4gIHB1YmxpYyBnZXRfcm9iX3JlY29yZCh0YXJnZXRVaWQ6IHN0cmluZywgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbXM6IHJlcXVlc3QgPSB7XHJcbiAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuLFxyXG4gICAgICB0YXJnZXRfdWlkOiB0YXJnZXRVaWRcclxuICAgIH07XHJcbiAgICAvL1xyXG4gICAgdGhpcy5zZXJ2ZXJfZGF0YS5nZXRfcm9iX3JlY29yZCgocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UuUmVzdWx0Q29kZSA9PT0gMCkge1xyXG4gICAgICAgIGlmIChjYWxsYmFjayAmJiByZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEubGVmdF9udW1zID4gMCkgY2FsbGJhY2soKTtcclxuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5SZXN1bHRDb2RlID09PSAtMSkge1xyXG4gICAgICAgIC8vIOivpeeOqeWutuS7iuaXpeiiq+aUu+WHu+asoeaVsOW3sue7j+i+vuWIsOS4iumZkO+8jOS4jeiDveWkjeS7h1xyXG4gICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwixJDDoyDEkeG6oXQgZ2nhu5tpIGjhuqFuIHThuqVuIGPDtG5nIG5nxrDhu51pIG7DoHkgdsOgIGtow7RuZyB0aOG7gyB0cuG6oyDEkcWpYS5cIik7XHJcbiAgICAgIH1cclxuICAgIH0sIHBhcmFtcyk7XHJcbiAgfSAvLyBlbmQ6IGdldF9yb2JfcmVjb3JkXHJcblxyXG4gIC8vIEAgKG5vdCB1c2UpXHJcbiAgLyogcHVibGljIHRlc3Rfc2NvcmUoc2NvcmU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpO1xyXG4gICAgaWYgKCFidWlsZERhdGEgfHwgYnVpbGREYXRhLmJ1aWxkTHZsIDwgMSkgcmV0dXJuO1xyXG4gICAgZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLnRvdGFsX3N0YXIgPSBzY29yZTtcclxuICAgIGNvbnN0IHByZXZpb3VzU2NvcmUgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEudG90YWxfc3RhcjtcclxuICAgIGdtLmRhdGEudXBkYXRlX3BsYXllcl9kYXRhX3JlcXVlc3QoKCkgPT4ge1xyXG4gICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIjEudXBkYXRlIGJlZm9yZTpcIiArIHByZXZpb3VzU2NvcmUgKyBcIiB1cGRhdGUgYWZ0ZXI6XCIgKyBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEudG90YWxfc3Rhcik7XHJcbiAgICAgICAgZ20uZGF0YS51cGRhdGVfcGxheWVyX3Njb3JlX2RhdGFfcmVxdWVzdChwcmV2aW91c1Njb3JlLCAoKSA9PiB7XHJcbiAgICAgICAgICBnbS5kYXRhLmdldF9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIyLnVwZGF0ZSBiZWZvcmU6XCIgKyBwcmV2aW91c1Njb3JlICsgXCIgdXBkYXRlIGFmdGVyOlwiICsgZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLnRvdGFsX3N0YXIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSAvLyBlbmQ6IHRlc3Rfc2NvcmUgKi9cclxuXHJcbiAgLy8gQCAobm90IHVzZSlcclxuICAvKiBwdWJsaWMgdGVzdF9sb3NzX3Jld2FyZCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIG9wX2JhdHRsZTogW10gYXMgaW50ZXJEYXRhT3BCYXR0bGVbXSxcclxuICAgICAgb3BfbG9zc19yZXdhcmQ6IFtdIGFzIGludGVyT3BMb3NzUmV3YXJkW11cclxuICAgIH07XHJcbiAgICAvL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm9wX2JhdHRsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBiYXR0bGUgPSBkYXRhLm9wX2JhdHRsZVtpXTtcclxuICAgICAgaWYgKGJhdHRsZS5ocCA8PSAwKSB7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuZGVsZXRlX2hlcm8oYmF0dGxlLnVuaXF1ZV9pZCwgYmF0dGxlLmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5vcF9sb3NzX3Jld2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBsb3NzUmV3YXJkID0gZGF0YS5vcF9sb3NzX3Jld2FyZFtpXTtcclxuICAgICAgaWYgKGxvc3NSZXdhcmQuaWQgPiAwICYmIGxvc3NSZXdhcmQubnVtID4gMCkge1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbENlbGxJdGVtKGxvc3NSZXdhcmQuaWQsIGxvc3NSZXdhcmQubnVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gLy8gZW5kOiB0ZXN0X2xvc3NfcmV3YXJkICovXHJcbn1cclxuIl19