"use strict";
cc._RF.push(module, 'ae160C8kndD1oyFI9614v89', 'TaskData');
// start-scene/scripts/TaskData.ts

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
exports.TaskData = exports.TaskItemData = exports.TaskConditionType = exports.TaskState = void 0;
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
var Utils_1 = require("./Utils");
// @
var TaskState;
(function (TaskState) {
    TaskState[TaskState["NONE"] = 0] = "NONE";
    TaskState[TaskState["ACCEPT"] = 1] = "ACCEPT";
    TaskState[TaskState["FINISH"] = 2] = "FINISH";
    TaskState[TaskState["HAS_RECEIVE"] = 3] = "HAS_RECEIVE";
})(TaskState = exports.TaskState || (exports.TaskState = {}));
// @
var TaskConditionType;
(function (TaskConditionType) {
    TaskConditionType[TaskConditionType["BREAK_BARREL"] = 1] = "BREAK_BARREL";
    TaskConditionType[TaskConditionType["MERGE_HERO"] = 2] = "MERGE_HERO";
    TaskConditionType[TaskConditionType["CASTLE_UPGRADE"] = 3] = "CASTLE_UPGRADE";
    TaskConditionType[TaskConditionType["HOUSE_UPGRADE"] = 4] = "HOUSE_UPGRADE";
    TaskConditionType[TaskConditionType["LIGHTHOUSE_UPGRADE"] = 5] = "LIGHTHOUSE_UPGRADE";
    TaskConditionType[TaskConditionType["BOAT_UPGRADE"] = 6] = "BOAT_UPGRADE";
    TaskConditionType[TaskConditionType["MINING_WELL_UPGRADE"] = 7] = "MINING_WELL_UPGRADE";
    TaskConditionType[TaskConditionType["SAWMILL_UPGRADE"] = 8] = "SAWMILL_UPGRADE";
    TaskConditionType[TaskConditionType["BARRACK_UPGRADE"] = 9] = "BARRACK_UPGRADE";
    TaskConditionType[TaskConditionType["DEFENSE_HERO_UPGRADE"] = 10] = "DEFENSE_HERO_UPGRADE";
    TaskConditionType[TaskConditionType["ATTACK_ISLAND"] = 11] = "ATTACK_ISLAND";
    TaskConditionType[TaskConditionType["DESTROY_BUILDING"] = 12] = "DESTROY_BUILDING";
    TaskConditionType[TaskConditionType["MERGE"] = 13] = "MERGE";
    TaskConditionType[TaskConditionType["UNLOCK_CAVERN"] = 14] = "UNLOCK_CAVERN";
    TaskConditionType[TaskConditionType["UNLOCK_GLACIER"] = 15] = "UNLOCK_GLACIER";
    TaskConditionType[TaskConditionType["UNLOCK_FLAME_MOUNTAIN"] = 16] = "UNLOCK_FLAME_MOUNTAIN";
    TaskConditionType[TaskConditionType["GET_STAR"] = 17] = "GET_STAR";
    TaskConditionType[TaskConditionType["BOOTH_UPGRADE"] = 18] = "BOOTH_UPGRADE";
    TaskConditionType[TaskConditionType["UNLOCK_TURTLE"] = 19] = "UNLOCK_TURTLE";
    TaskConditionType[TaskConditionType["FISHING_LODGE_UPGRADE"] = 20] = "FISHING_LODGE_UPGRADE";
    TaskConditionType[TaskConditionType["COOKHOUSE_UPGRADE"] = 21] = "COOKHOUSE_UPGRADE";
    TaskConditionType[TaskConditionType["WORKSHOP_UPGRADE"] = 22] = "WORKSHOP_UPGRADE";
    TaskConditionType[TaskConditionType["UNLOCK_ELF"] = 23] = "UNLOCK_ELF";
    TaskConditionType[TaskConditionType["POSEIDON"] = 24] = "POSEIDON";
    TaskConditionType[TaskConditionType["AUTOCOMPOSE"] = 25] = "AUTOCOMPOSE";
})(TaskConditionType = exports.TaskConditionType || (exports.TaskConditionType = {}));
// @
var TaskItemData = /** @class */ (function () {
    // @
    function TaskItemData() {
        this.type = 0;
        this.id = 0;
        this.lv = 0;
        this.task_end_timestamp = 0;
        this.state = TaskState.NONE;
        this.count = 0;
        this.is_new = true;
    }
    // @
    TaskItemData.prototype.get_config = function () {
        return GameManager_1.gm.config.get_row_data("TaskConfigData", "" + this.type, "" + this.lv, "" + this.id);
    };
    return TaskItemData;
}()); // end: TaskItemData class
exports.TaskItemData = TaskItemData;
// @
var TaskData = /** @class */ (function (_super) {
    __extends(TaskData, _super);
    // @
    function TaskData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "TaskData";
        _this.is_init = false;
        _this.task_data_array = [];
        _this.daily_task_count = 2;
        _this.main_task_count = 1;
        _this.main_task_complete_count = 0;
        return _this;
    }
    // @
    TaskData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (_this.is_init) {
                var completedCount = 0;
                var currentTime = Date.now();
                for (var _i = 0, _a = _this.task_data_array; _i < _a.length; _i++) {
                    var task = _a[_i];
                    Object.setPrototypeOf(task, TaskItemData.prototype);
                    if (task.task_end_timestamp > 0 && task.task_end_timestamp < currentTime) {
                        GameManager_1.gm.data.task_data.get_next_task(task);
                        completedCount++;
                    }
                }
                if (completedCount > 0)
                    _this.async_write_data();
                if (_this.main_task_complete_count == null) {
                    _this.main_task_complete_count = 0;
                }
            }
            else {
                for (var i = 0; i < _this.daily_task_count; i++) {
                    var newTask = new TaskItemData();
                    newTask.type = 1;
                    _this.task_data_array.push(_this.get_next_task(newTask));
                }
                var mainTask = new TaskItemData();
                mainTask.type = 2;
                _this.task_data_array.push(_this.get_next_task(mainTask));
                _this.main_task_complete_count = 0;
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    }; // end: async_read_data
    // @
    TaskData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(TaskData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    TaskData.prototype.get_next_task = function (task) {
        if (task.type === 1) {
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE);
            var buildLevel = (buildData && buildData.buildLvl > 0) ? buildData.buildLvl.toString() : "1";
            var taskConfigArray = [].concat(GameManager_1.gm.config.get_row_data_array("TaskConfigData", task.type.toString(), buildLevel));
            //
            for (var i = 0; i < this.daily_task_count; i++) {
                var existingTask = this.task_data_array[i];
                if (!existingTask)
                    continue;
                for (var n = taskConfigArray.length - 1; n >= 0; n--) {
                    var configTask = taskConfigArray[n];
                    if (existingTask.id === configTask.task_id) {
                        taskConfigArray.splice(n, 1);
                    }
                    // gốc (code gốc có thể đã sai)
                    /* const configTask = taskConfigArray[i];
                    if (existingTask.id === configTask.task_id) {
                        taskConfigArray.splice(i, 1);
                    } */
                }
            }
            //
            if (taskConfigArray.length > 0) {
                var randomTask = taskConfigArray[Utils_1.Utils.math_random(true, 0, taskConfigArray.length)];
                task.type = randomTask.type;
                task.id = randomTask.task_id;
                task.lv = randomTask.lv;
                task.task_end_timestamp = 1000 * randomTask.timeout + Date.now();
                task.state = TaskState.ACCEPT;
                task.count = 0;
            }
        }
        else if (task.type === 2) {
            var taskCfg = GameManager_1.gm.config.get_row_data("TaskConfigData", "2", "0", task.id.toString());
            var nextId = task.id === 0 ? 20001 : taskCfg.next_id;
            var nextTaskConfig = GameManager_1.gm.config.get_row_data("TaskConfigData", "2", "0", nextId.toString());
            if (nextTaskConfig) {
                task.id = nextId;
                task.task_end_timestamp = 0;
                task.state = TaskState.ACCEPT;
                task.count = 0;
                this.update_task_progress(nextTaskConfig.condition_type, 0);
            }
        }
        return task;
    }; // end: get_next_task
    // @
    TaskData.prototype.update_task_progress = function (conditionType, value) {
        if (value === void 0) { value = 1; }
        for (var _i = 0, _a = this.task_data_array; _i < _a.length; _i++) {
            var task = _a[_i];
            var config = task.get_config();
            if (config && config.condition_type === conditionType) {
                this.do_update_task_progress(task, conditionType, config.condition_value, value);
            }
        }
    };
    // @
    TaskData.prototype.update_build_task_progress = function (buildType) {
        var taskCondition = 0;
        switch (buildType) {
            case Constants_1.BuildTypeEnum.TOWER_TYPE:
                taskCondition = TaskConditionType.CASTLE_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE:
                taskCondition = TaskConditionType.HOUSE_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.WHARFTAX_TYPE:
                taskCondition = TaskConditionType.LIGHTHOUSE_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.MININGWELL_TYPE:
                taskCondition = TaskConditionType.MINING_WELL_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.LOGGINGFIELD_TYPE:
                taskCondition = TaskConditionType.SAWMILL_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.BARRACKS_TYPE:
                taskCondition = TaskConditionType.BARRACK_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.GARRISION_TYPE:
                taskCondition = TaskConditionType.DEFENSE_HERO_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.STALL_TYPE:
                taskCondition = TaskConditionType.BOOTH_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.FISHHOUSE_TYPE:
                taskCondition = TaskConditionType.FISHING_LODGE_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.FARMHOUSE_TYPE:
                taskCondition = TaskConditionType.COOKHOUSE_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.WORKHOUSE_TYPE:
                taskCondition = TaskConditionType.WORKSHOP_UPGRADE;
                break;
            case Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE:
                taskCondition = TaskConditionType.BOAT_UPGRADE;
                break;
        }
        this.update_task_progress(taskCondition);
    }; // end: update_build_task_progress
    // @
    TaskData.prototype.do_update_task_progress = function (task, conditionType, conditionValue, increment) {
        var _a;
        switch (conditionType) {
            case TaskConditionType.BREAK_BARREL:
            case TaskConditionType.MERGE_HERO:
            case TaskConditionType.ATTACK_ISLAND:
            case TaskConditionType.DESTROY_BUILDING:
            case TaskConditionType.MERGE:
            case TaskConditionType.GET_STAR:
            case TaskConditionType.UNLOCK_CAVERN:
            case TaskConditionType.UNLOCK_GLACIER:
            case TaskConditionType.UNLOCK_FLAME_MOUNTAIN:
            case TaskConditionType.UNLOCK_TURTLE:
            case TaskConditionType.UNLOCK_ELF:
            case TaskConditionType.POSEIDON:
            case TaskConditionType.AUTOCOMPOSE:
                task.count += increment;
                break;
            case TaskConditionType.CASTLE_UPGRADE:
            case TaskConditionType.HOUSE_UPGRADE:
            case TaskConditionType.LIGHTHOUSE_UPGRADE:
            case TaskConditionType.BOAT_UPGRADE:
            case TaskConditionType.MINING_WELL_UPGRADE:
            case TaskConditionType.SAWMILL_UPGRADE:
            case TaskConditionType.BARRACK_UPGRADE:
            case TaskConditionType.DEFENSE_HERO_UPGRADE:
            case TaskConditionType.BOOTH_UPGRADE:
            case TaskConditionType.FISHING_LODGE_UPGRADE:
            case TaskConditionType.COOKHOUSE_UPGRADE:
            case TaskConditionType.WORKSHOP_UPGRADE:
                if (!TaskData.task_building_map) {
                    TaskData.task_building_map = (_a = {},
                        _a[TaskConditionType.CASTLE_UPGRADE] = Constants_1.BuildTypeEnum.TOWER_TYPE,
                        _a[TaskConditionType.HOUSE_UPGRADE] = Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE,
                        _a[TaskConditionType.LIGHTHOUSE_UPGRADE] = Constants_1.BuildTypeEnum.WHARFTAX_TYPE,
                        _a[TaskConditionType.BOAT_UPGRADE] = Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE,
                        _a[TaskConditionType.MINING_WELL_UPGRADE] = Constants_1.BuildTypeEnum.MININGWELL_TYPE,
                        _a[TaskConditionType.SAWMILL_UPGRADE] = Constants_1.BuildTypeEnum.LOGGINGFIELD_TYPE,
                        _a[TaskConditionType.BARRACK_UPGRADE] = Constants_1.BuildTypeEnum.BARRACKS_TYPE,
                        _a[TaskConditionType.DEFENSE_HERO_UPGRADE] = Constants_1.BuildTypeEnum.GARRISION_TYPE,
                        _a[TaskConditionType.BOOTH_UPGRADE] = Constants_1.BuildTypeEnum.STALL_TYPE,
                        _a[TaskConditionType.FISHING_LODGE_UPGRADE] = Constants_1.BuildTypeEnum.FISHHOUSE_TYPE,
                        _a[TaskConditionType.COOKHOUSE_UPGRADE] = Constants_1.BuildTypeEnum.FARMHOUSE_TYPE,
                        _a[TaskConditionType.WORKSHOP_UPGRADE] = Constants_1.BuildTypeEnum.WORKHOUSE_TYPE,
                        _a);
                }
                var buildingType = TaskData.task_building_map[conditionType];
                if (buildingType) {
                    var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildingType);
                    if (buildData) {
                        task.count = buildData.buildLvl;
                    }
                    else {
                        console.error("Building data not found");
                    }
                }
                else {
                    console.error("Unknown mapping relationship");
                }
                break;
            default:
                console.error("Unknown task condition");
        }
        if (task.state === TaskState.ACCEPT) {
            if (task.count >= conditionValue) {
                task.state = TaskState.FINISH;
            }
            this.async_write_data();
        }
    }; // end: do_update_task_progress
    // @
    TaskData.prototype.receive_reward = function (task, entity, option) {
        if (option === void 0) { option = 0; }
        var config = task.get_config();
        if (task.count < config.condition_value || task.state !== TaskState.FINISH)
            return;
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_5_TASK_REWARD);
        var rewardData = {
            type: 1,
            idList: [],
            numList: []
        };
        //
        for (var _i = 0, _a = config.reward_array; _i < _a.length; _i++) {
            var reward = _a[_i];
            if (reward.reward_id >= 23001 && reward.reward_id <= 23099) {
                GameManager_1.gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
            }
            else if (reward.reward_id === Constants_1.RewardIdEnum.GOLD) {
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, entity.convertToWorldSpaceAR(cc.Vec3.ZERO));
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            }
            else if (reward.reward_id === Constants_1.RewardIdEnum.DIAMOND) {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, entity.convertToWorldSpaceAR(cc.Vec3.ZERO));
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            }
            else if (reward.reward_id === Constants_1.RewardIdEnum.BARREL) {
                GameManager_1.gm.data.mapCell_data.addBarrelNum(reward.reward_num);
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            }
            else {
                var itemList = [];
                for (var i = 0; i < reward.reward_num; i++) {
                    itemList.push(reward.reward_id);
                }
                GameManager_1.gm.data.mapCell_data.addWareHouseList(itemList);
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            }
        }
        //
        task.state = TaskState.HAS_RECEIVE;
        GameManager_1.gm.data.task_data.get_next_task(task);
        GameManager_1.gm.data.task_data.async_write_data();
        //
        if (rewardData.idList.length > 0) {
            if (option === 2) {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETDOUBLEOP.key, rewardData);
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETDOUBLEOP);
            }
            else if (option === 0) {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                    idList: rewardData.idList,
                    numList: rewardData.numList
                });
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            }
        }
    }; // end: receive_reward
    TaskData.EVENT_DATA_CHANGE = "task_data_change";
    TaskData.task_building_map = null;
    return TaskData;
}(StorageBase_1.StorageBase)); // end: TaskData class
exports.TaskData = TaskData;

cc._RF.pop();