"use strict";
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