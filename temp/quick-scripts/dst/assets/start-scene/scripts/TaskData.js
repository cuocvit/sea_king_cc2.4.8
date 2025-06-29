
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TaskData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRhc2tEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBMEU7QUFDMUUsNkNBQW1DO0FBQ25DLDZDQUE0QztBQUM1QyxpQ0FBZ0M7QUFFaEMsSUFBSTtBQUNKLElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQix5Q0FBUSxDQUFBO0lBQ1IsNkNBQVUsQ0FBQTtJQUNWLDZDQUFVLENBQUE7SUFDVix1REFBZSxDQUFBO0FBQ25CLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVELElBQUk7QUFDSixJQUFZLGlCQTBCWDtBQTFCRCxXQUFZLGlCQUFpQjtJQUN6Qix5RUFBZ0IsQ0FBQTtJQUNoQixxRUFBYyxDQUFBO0lBQ2QsNkVBQWtCLENBQUE7SUFDbEIsMkVBQWlCLENBQUE7SUFDakIscUZBQXNCLENBQUE7SUFDdEIseUVBQWdCLENBQUE7SUFDaEIsdUZBQXVCLENBQUE7SUFDdkIsK0VBQW1CLENBQUE7SUFDbkIsK0VBQW1CLENBQUE7SUFDbkIsMEZBQXlCLENBQUE7SUFDekIsNEVBQWtCLENBQUE7SUFDbEIsa0ZBQXFCLENBQUE7SUFDckIsNERBQVUsQ0FBQTtJQUNWLDRFQUFrQixDQUFBO0lBQ2xCLDhFQUFtQixDQUFBO0lBQ25CLDRGQUEwQixDQUFBO0lBQzFCLGtFQUFhLENBQUE7SUFDYiw0RUFBa0IsQ0FBQTtJQUNsQiw0RUFBa0IsQ0FBQTtJQUNsQiw0RkFBMEIsQ0FBQTtJQUMxQixvRkFBc0IsQ0FBQTtJQUN0QixrRkFBcUIsQ0FBQTtJQUNyQixzRUFBZSxDQUFBO0lBQ2Ysa0VBQWEsQ0FBQTtJQUNiLHdFQUFnQixDQUFBO0FBQ3BCLENBQUMsRUExQlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUEwQjVCO0FBRUQsSUFBSTtBQUNKO0lBUUksSUFBSTtJQUNK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RSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNqRDtTQUNKO0lBQ0wsQ0FBQyxFQUFDLHNCQUFzQjtJQTVSViwwQkFBaUIsR0FBVyxrQkFBa0IsQ0FBQztJQUMvQywwQkFBaUIsR0FBcUMsSUFBSSxDQUFDO0lBNFI3RSxlQUFDO0NBOVJELEFBOFJDLENBOVI2Qix5QkFBVyxHQThSeEMsQ0FBRSxzQkFBc0I7QUE5UlosNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvdGFzayc7XHJcbmltcG9ydCB7IEJ1aWxkVHlwZUVudW0sIFJld2FyZElkRW51bSwgU2V0SXRlbU51bUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFN0b3JhZ2VCYXNlIH0gZnJvbSAnLi9TdG9yYWdlQmFzZSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBlbnVtIFRhc2tTdGF0ZSB7XHJcbiAgICBOT05FID0gMCxcclxuICAgIEFDQ0VQVCA9IDEsXHJcbiAgICBGSU5JU0ggPSAyLFxyXG4gICAgSEFTX1JFQ0VJVkUgPSAzXHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gVGFza0NvbmRpdGlvblR5cGUge1xyXG4gICAgQlJFQUtfQkFSUkVMID0gMSxcclxuICAgIE1FUkdFX0hFUk8gPSAyLFxyXG4gICAgQ0FTVExFX1VQR1JBREUgPSAzLFxyXG4gICAgSE9VU0VfVVBHUkFERSA9IDQsXHJcbiAgICBMSUdIVEhPVVNFX1VQR1JBREUgPSA1LFxyXG4gICAgQk9BVF9VUEdSQURFID0gNixcclxuICAgIE1JTklOR19XRUxMX1VQR1JBREUgPSA3LFxyXG4gICAgU0FXTUlMTF9VUEdSQURFID0gOCxcclxuICAgIEJBUlJBQ0tfVVBHUkFERSA9IDksXHJcbiAgICBERUZFTlNFX0hFUk9fVVBHUkFERSA9IDEwLFxyXG4gICAgQVRUQUNLX0lTTEFORCA9IDExLFxyXG4gICAgREVTVFJPWV9CVUlMRElORyA9IDEyLFxyXG4gICAgTUVSR0UgPSAxMyxcclxuICAgIFVOTE9DS19DQVZFUk4gPSAxNCxcclxuICAgIFVOTE9DS19HTEFDSUVSID0gMTUsXHJcbiAgICBVTkxPQ0tfRkxBTUVfTU9VTlRBSU4gPSAxNixcclxuICAgIEdFVF9TVEFSID0gMTcsXHJcbiAgICBCT09USF9VUEdSQURFID0gMTgsXHJcbiAgICBVTkxPQ0tfVFVSVExFID0gMTksXHJcbiAgICBGSVNISU5HX0xPREdFX1VQR1JBREUgPSAyMCxcclxuICAgIENPT0tIT1VTRV9VUEdSQURFID0gMjEsXHJcbiAgICBXT1JLU0hPUF9VUEdSQURFID0gMjIsXHJcbiAgICBVTkxPQ0tfRUxGID0gMjMsXHJcbiAgICBQT1NFSURPTiA9IDI0LFxyXG4gICAgQVVUT0NPTVBPU0UgPSAyNVxyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBUYXNrSXRlbURhdGEge1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGx2OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGFza19lbmRfdGltZXN0YW1wOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGU6IFRhc2tTdGF0ZTtcclxuICAgIHB1YmxpYyBjb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIGlzX25ldzogYm9vbGVhbjtcclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pZCA9IDA7XHJcbiAgICAgICAgdGhpcy5sdiA9IDA7XHJcbiAgICAgICAgdGhpcy50YXNrX2VuZF90aW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBUYXNrU3RhdGUuTk9ORTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmlzX25ldyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9jb25maWcoKTogVGFza0NvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJUYXNrQ29uZmlnRGF0YVwiLCBgJHt0aGlzLnR5cGV9YCwgYCR7dGhpcy5sdn1gLCBgJHt0aGlzLmlkfWApIGFzIFRhc2tDb25maWc7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBUYXNrSXRlbURhdGEgY2xhc3NcclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIFRhc2tEYXRhIGV4dGVuZHMgU3RvcmFnZUJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9EQVRBX0NIQU5HRTogc3RyaW5nID0gXCJ0YXNrX2RhdGFfY2hhbmdlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRhc2tfYnVpbGRpbmdfbWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9IHwgbnVsbCA9IG51bGw7XHJcbiAgICAvL1xyXG4gICAgcHVibGljIHRhc2tfZGF0YV9hcnJheTogVGFza0l0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgZGFpbHlfdGFza19jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1haW5fdGFza19jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1haW5fdGFza19jb21wbGV0ZV9jb3VudDogbnVtYmVyO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5TVE9SQUdFX0tFWSA9IFwiVGFza0RhdGFcIjtcclxuICAgICAgICB0aGlzLmlzX2luaXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRhc2tfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGFpbHlfdGFza19jb3VudCA9IDI7XHJcbiAgICAgICAgdGhpcy5tYWluX3Rhc2tfY291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMubWFpbl90YXNrX2NvbXBsZXRlX2NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfcmVhZF9kYXRhKGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3JlYWRfZGF0YSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19pbml0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcGxldGVkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHRoaXMudGFza19kYXRhX2FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRhc2ssIFRhc2tJdGVtRGF0YS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnRhc2tfZW5kX3RpbWVzdGFtcCA+IDAgJiYgdGFzay50YXNrX2VuZF90aW1lc3RhbXAgPCBjdXJyZW50VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS5nZXRfbmV4dF90YXNrKHRhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWRDb3VudCA+IDApIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFpbl90YXNrX2NvbXBsZXRlX2NvdW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5fdGFza19jb21wbGV0ZV9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGFpbHlfdGFza19jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYXNrLnR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza19kYXRhX2FycmF5LnB1c2godGhpcy5nZXRfbmV4dF90YXNrKG5ld1Rhc2spKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1haW5UYXNrID0gbmV3IFRhc2tJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgbWFpblRhc2sudHlwZSA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tfZGF0YV9hcnJheS5wdXNoKHRoaXMuZ2V0X25leHRfdGFzayhtYWluVGFzaykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluX3Rhc2tfY29tcGxldGVfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IC8vIGVuZDogYXN5bmNfcmVhZF9kYXRhXHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoVGFza0RhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfbmV4dF90YXNrKHRhc2s6IFRhc2tJdGVtRGF0YSk6IFRhc2tJdGVtRGF0YSB7XHJcbiAgICAgICAgaWYgKHRhc2sudHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFKTtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGRMZXZlbDogc3RyaW5nID0gKGJ1aWxkRGF0YSAmJiBidWlsZERhdGEuYnVpbGRMdmwgPiAwKSA/IGJ1aWxkRGF0YS5idWlsZEx2bC50b1N0cmluZygpIDogXCIxXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tDb25maWdBcnJheSA9IFtdLmNvbmNhdChnbS5jb25maWcuZ2V0X3Jvd19kYXRhX2FycmF5KFwiVGFza0NvbmZpZ0RhdGFcIiwgdGFzay50eXBlLnRvU3RyaW5nKCksIGJ1aWxkTGV2ZWwpKSBhcyBUYXNrQ29uZmlnW107XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYWlseV90YXNrX2NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVGFzayA9IHRoaXMudGFza19kYXRhX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1Rhc2spIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IHRhc2tDb25maWdBcnJheS5sZW5ndGggLSAxOyBuID49IDA7IG4tLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ1Rhc2sgPSB0YXNrQ29uZmlnQXJyYXlbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVGFzay5pZCA9PT0gY29uZmlnVGFzay50YXNrX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tDb25maWdBcnJheS5zcGxpY2UobiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGfhu5FjIChjb2RlIGfhu5FjIGPDsyB0aOG7gyDEkcOjIHNhaSlcclxuICAgICAgICAgICAgICAgICAgICAvKiBjb25zdCBjb25maWdUYXNrID0gdGFza0NvbmZpZ0FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1Rhc2suaWQgPT09IGNvbmZpZ1Rhc2sudGFza19pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrQ29uZmlnQXJyYXkuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBpZiAodGFza0NvbmZpZ0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbVRhc2sgPSB0YXNrQ29uZmlnQXJyYXlbVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMCwgdGFza0NvbmZpZ0FycmF5Lmxlbmd0aCldO1xyXG4gICAgICAgICAgICAgICAgdGFzay50eXBlID0gcmFuZG9tVGFzay50eXBlO1xyXG4gICAgICAgICAgICAgICAgdGFzay5pZCA9IHJhbmRvbVRhc2sudGFza19pZDtcclxuICAgICAgICAgICAgICAgIHRhc2subHYgPSByYW5kb21UYXNrLmx2O1xyXG4gICAgICAgICAgICAgICAgdGFzay50YXNrX2VuZF90aW1lc3RhbXAgPSAxMDAwICogcmFuZG9tVGFzay50aW1lb3V0ICsgRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIHRhc2suc3RhdGUgPSBUYXNrU3RhdGUuQUNDRVBUO1xyXG4gICAgICAgICAgICAgICAgdGFzay5jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRhc2sudHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrQ2ZnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlRhc2tDb25maWdEYXRhXCIsIFwiMlwiLCBcIjBcIiwgdGFzay5pZC50b1N0cmluZygpKSBhcyBUYXNrQ29uZmlnXHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRJZCA9IHRhc2suaWQgPT09IDAgPyAyMDAwMSA6IHRhc2tDZmcubmV4dF9pZDtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFRhc2tDb25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiVGFza0NvbmZpZ0RhdGFcIiwgXCIyXCIsIFwiMFwiLCBuZXh0SWQudG9TdHJpbmcoKSkgYXMgVGFza0NvbmZpZ1xyXG4gICAgICAgICAgICBpZiAobmV4dFRhc2tDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHRhc2suaWQgPSBuZXh0SWQ7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnRhc2tfZW5kX3RpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnN0YXRlID0gVGFza1N0YXRlLkFDQ0VQVDtcclxuICAgICAgICAgICAgICAgIHRhc2suY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfdGFza19wcm9ncmVzcyhuZXh0VGFza0NvbmZpZy5jb25kaXRpb25fdHlwZSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9IC8vIGVuZDogZ2V0X25leHRfdGFza1xyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyB1cGRhdGVfdGFza19wcm9ncmVzcyhjb25kaXRpb25UeXBlOiBudW1iZXIsIHZhbHVlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHRoaXMudGFza19kYXRhX2FycmF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRhc2suZ2V0X2NvbmZpZygpO1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5jb25kaXRpb25fdHlwZSA9PT0gY29uZGl0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb191cGRhdGVfdGFza19wcm9ncmVzcyh0YXNrLCBjb25kaXRpb25UeXBlLCBjb25maWcuY29uZGl0aW9uX3ZhbHVlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHVwZGF0ZV9idWlsZF90YXNrX3Byb2dyZXNzKGJ1aWxkVHlwZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRhc2tDb25kaXRpb246IG51bWJlciA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChidWlsZFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEU6XHJcbiAgICAgICAgICAgICAgICB0YXNrQ29uZGl0aW9uID0gVGFza0NvbmRpdGlvblR5cGUuQ0FTVExFX1VQR1JBREU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWlsZFR5cGVFbnVtLlBSSVZBVEVIT1VTSU5HX1RZUEU6XHJcbiAgICAgICAgICAgICAgICB0YXNrQ29uZGl0aW9uID0gVGFza0NvbmRpdGlvblR5cGUuSE9VU0VfVVBHUkFERTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5MSUdIVEhPVVNFX1VQR1JBREU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWlsZFR5cGVFbnVtLk1JTklOR1dFTExfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5NSU5JTkdfV0VMTF9VUEdSQURFO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVpbGRUeXBlRW51bS5MT0dHSU5HRklFTERfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5TQVdNSUxMX1VQR1JBREU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWlsZFR5cGVFbnVtLkJBUlJBQ0tTX1RZUEU6XHJcbiAgICAgICAgICAgICAgICB0YXNrQ29uZGl0aW9uID0gVGFza0NvbmRpdGlvblR5cGUuQkFSUkFDS19VUEdSQURFO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5ERUZFTlNFX0hFUk9fVVBHUkFERTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1aWxkVHlwZUVudW0uU1RBTExfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5CT09USF9VUEdSQURFO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVpbGRUeXBlRW51bS5GSVNISE9VU0VfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5GSVNISU5HX0xPREdFX1VQR1JBREU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWlsZFR5cGVFbnVtLkZBUk1IT1VTRV9UWVBFOlxyXG4gICAgICAgICAgICAgICAgdGFza0NvbmRpdGlvbiA9IFRhc2tDb25kaXRpb25UeXBlLkNPT0tIT1VTRV9VUEdSQURFO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVpbGRUeXBlRW51bS5XT1JLSE9VU0VfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5XT1JLU0hPUF9VUEdSQURFO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRTpcclxuICAgICAgICAgICAgICAgIHRhc2tDb25kaXRpb24gPSBUYXNrQ29uZGl0aW9uVHlwZS5CT0FUX1VQR1JBREU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdGFza19wcm9ncmVzcyh0YXNrQ29uZGl0aW9uKTtcclxuICAgIH0gLy8gZW5kOiB1cGRhdGVfYnVpbGRfdGFza19wcm9ncmVzc1xyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZG9fdXBkYXRlX3Rhc2tfcHJvZ3Jlc3ModGFzazogVGFza0l0ZW1EYXRhLCBjb25kaXRpb25UeXBlOiBudW1iZXIsIGNvbmRpdGlvblZhbHVlOiBudW1iZXIsIGluY3JlbWVudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChjb25kaXRpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuQlJFQUtfQkFSUkVMOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLk1FUkdFX0hFUk86XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuQVRUQUNLX0lTTEFORDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5ERVNUUk9ZX0JVSUxESU5HOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLk1FUkdFOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLkdFVF9TVEFSOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLlVOTE9DS19DQVZFUk46XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuVU5MT0NLX0dMQUNJRVI6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuVU5MT0NLX0ZMQU1FX01PVU5UQUlOOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLlVOTE9DS19UVVJUTEU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuVU5MT0NLX0VMRjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5QT1NFSURPTjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5BVVRPQ09NUE9TRTpcclxuICAgICAgICAgICAgICAgIHRhc2suY291bnQgKz0gaW5jcmVtZW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuQ0FTVExFX1VQR1JBREU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuSE9VU0VfVVBHUkFERTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5MSUdIVEhPVVNFX1VQR1JBREU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuQk9BVF9VUEdSQURFOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLk1JTklOR19XRUxMX1VQR1JBREU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuU0FXTUlMTF9VUEdSQURFOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLkJBUlJBQ0tfVVBHUkFERTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5ERUZFTlNFX0hFUk9fVVBHUkFERTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5CT09USF9VUEdSQURFOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLkZJU0hJTkdfTE9ER0VfVVBHUkFERTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5DT09LSE9VU0VfVVBHUkFERTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5XT1JLU0hPUF9VUEdSQURFOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFUYXNrRGF0YS50YXNrX2J1aWxkaW5nX21hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFRhc2tEYXRhLnRhc2tfYnVpbGRpbmdfbWFwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbVGFza0NvbmRpdGlvblR5cGUuQ0FTVExFX1VQR1JBREVdOiBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtUYXNrQ29uZGl0aW9uVHlwZS5IT1VTRV9VUEdSQURFXTogQnVpbGRUeXBlRW51bS5QUklWQVRFSE9VU0lOR19UWVBFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbVGFza0NvbmRpdGlvblR5cGUuTElHSFRIT1VTRV9VUEdSQURFXTogQnVpbGRUeXBlRW51bS5XSEFSRlRBWF9UWVBFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbVGFza0NvbmRpdGlvblR5cGUuQk9BVF9VUEdSQURFXTogQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1Rhc2tDb25kaXRpb25UeXBlLk1JTklOR19XRUxMX1VQR1JBREVdOiBCdWlsZFR5cGVFbnVtLk1JTklOR1dFTExfVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1Rhc2tDb25kaXRpb25UeXBlLlNBV01JTExfVVBHUkFERV06IEJ1aWxkVHlwZUVudW0uTE9HR0lOR0ZJRUxEX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtUYXNrQ29uZGl0aW9uVHlwZS5CQVJSQUNLX1VQR1JBREVdOiBCdWlsZFR5cGVFbnVtLkJBUlJBQ0tTX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtUYXNrQ29uZGl0aW9uVHlwZS5ERUZFTlNFX0hFUk9fVVBHUkFERV06IEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtUYXNrQ29uZGl0aW9uVHlwZS5CT09USF9VUEdSQURFXTogQnVpbGRUeXBlRW51bS5TVEFMTF9UWVBFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbVGFza0NvbmRpdGlvblR5cGUuRklTSElOR19MT0RHRV9VUEdSQURFXTogQnVpbGRUeXBlRW51bS5GSVNISE9VU0VfVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1Rhc2tDb25kaXRpb25UeXBlLkNPT0tIT1VTRV9VUEdSQURFXTogQnVpbGRUeXBlRW51bS5GQVJNSE9VU0VfVFlQRSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1Rhc2tDb25kaXRpb25UeXBlLldPUktTSE9QX1VQR1JBREVdOiBCdWlsZFR5cGVFbnVtLldPUktIT1VTRV9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkaW5nVHlwZSA9IFRhc2tEYXRhLnRhc2tfYnVpbGRpbmdfbWFwW2NvbmRpdGlvblR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkaW5nVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShidWlsZGluZ1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWlsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5jb3VudCA9IGJ1aWxkRGF0YS5idWlsZEx2bDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQnVpbGRpbmcgZGF0YSBub3QgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBtYXBwaW5nIHJlbGF0aW9uc2hpcFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vd24gdGFzayBjb25kaXRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXNrLnN0YXRlID09PSBUYXNrU3RhdGUuQUNDRVBUKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXNrLmNvdW50ID49IGNvbmRpdGlvblZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnN0YXRlID0gVGFza1N0YXRlLkZJTklTSDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGVuZDogZG9fdXBkYXRlX3Rhc2tfcHJvZ3Jlc3NcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmVjZWl2ZV9yZXdhcmQodGFzazogVGFza0l0ZW1EYXRhLCBlbnRpdHk6IGNjLk5vZGUsIG9wdGlvbjogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRhc2suZ2V0X2NvbmZpZygpO1xyXG4gICAgICAgIGlmICh0YXNrLmNvdW50IDwgY29uZmlnLmNvbmRpdGlvbl92YWx1ZSB8fCB0YXNrLnN0YXRlICE9PSBUYXNrU3RhdGUuRklOSVNIKSByZXR1cm47XHJcbiAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoZ20uY29uc3QuQVVESU9fNV9UQVNLX1JFV0FSRCk7XHJcbiAgICAgICAgY29uc3QgcmV3YXJkRGF0YSA9IHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgaWRMaXN0OiBbXSxcclxuICAgICAgICAgICAgbnVtTGlzdDogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgZm9yIChjb25zdCByZXdhcmQgb2YgY29uZmlnLnJld2FyZF9hcnJheSkge1xyXG4gICAgICAgICAgICBpZiAocmV3YXJkLnJld2FyZF9pZCA+PSAyMzAwMSAmJiByZXdhcmQucmV3YXJkX2lkIDw9IDIzMDk5KSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5yZWVsVW5sY29rSGVybyhyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmQucmV3YXJkX2lkID09PSBSZXdhcmRJZEVudW0uR09MRCkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uQUREX0lURU1fVFlQRSwgcmV3YXJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uR09MRCwgZW50aXR5LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZERhdGEuaWRMaXN0LnB1c2gocmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhLm51bUxpc3QucHVzaChyZXdhcmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkLnJld2FyZF9pZCA9PT0gUmV3YXJkSWRFbnVtLkRJQU1PTkQpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIHJld2FyZC5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoUmV3YXJkSWRFbnVtLkRJQU1PTkQsIGVudGl0eS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhLmlkTGlzdC5wdXNoKHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkRGF0YS5udW1MaXN0LnB1c2gocmV3YXJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC5yZXdhcmRfaWQgPT09IFJld2FyZElkRW51bS5CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShyZXdhcmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhLmlkTGlzdC5wdXNoKHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkRGF0YS5udW1MaXN0LnB1c2gocmV3YXJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmV3YXJkLnJld2FyZF9udW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2gocmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRXYXJlSG91c2VMaXN0KGl0ZW1MaXN0KTtcclxuICAgICAgICAgICAgICAgIHJld2FyZERhdGEuaWRMaXN0LnB1c2gocmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmREYXRhLm51bUxpc3QucHVzaChyZXdhcmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICB0YXNrLnN0YXRlID0gVGFza1N0YXRlLkhBU19SRUNFSVZFO1xyXG4gICAgICAgIGdtLmRhdGEudGFza19kYXRhLmdldF9uZXh0X3Rhc2sodGFzayk7XHJcbiAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgaWYgKHJld2FyZERhdGEuaWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVERPVUJMRU9QLmtleSwgcmV3YXJkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRET1VCTEVPUCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRMaXN0OiByZXdhcmREYXRhLmlkTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiByZXdhcmREYXRhLm51bUxpc3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBlbmQ6IHJlY2VpdmVfcmV3YXJkXHJcbn0gIC8vIGVuZDogVGFza0RhdGEgY2xhc3NcclxuIl19