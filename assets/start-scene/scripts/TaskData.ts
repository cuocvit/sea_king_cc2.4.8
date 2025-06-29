import { TaskConfig } from '../../common/configs/task';
import { BuildTypeEnum, RewardIdEnum, SetItemNumEnum } from './Constants';
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';
import { Utils } from './Utils';

// @
export enum TaskState {
    NONE = 0,
    ACCEPT = 1,
    FINISH = 2,
    HAS_RECEIVE = 3
}

// @
export enum TaskConditionType {
    BREAK_BARREL = 1,
    MERGE_HERO = 2,
    CASTLE_UPGRADE = 3,
    HOUSE_UPGRADE = 4,
    LIGHTHOUSE_UPGRADE = 5,
    BOAT_UPGRADE = 6,
    MINING_WELL_UPGRADE = 7,
    SAWMILL_UPGRADE = 8,
    BARRACK_UPGRADE = 9,
    DEFENSE_HERO_UPGRADE = 10,
    ATTACK_ISLAND = 11,
    DESTROY_BUILDING = 12,
    MERGE = 13,
    UNLOCK_CAVERN = 14,
    UNLOCK_GLACIER = 15,
    UNLOCK_FLAME_MOUNTAIN = 16,
    GET_STAR = 17,
    BOOTH_UPGRADE = 18,
    UNLOCK_TURTLE = 19,
    FISHING_LODGE_UPGRADE = 20,
    COOKHOUSE_UPGRADE = 21,
    WORKSHOP_UPGRADE = 22,
    UNLOCK_ELF = 23,
    POSEIDON = 24,
    AUTOCOMPOSE = 25
}

// @
export class TaskItemData {
    public type: number;
    public id: number;
    public lv: number;
    public task_end_timestamp: number;
    public state: TaskState;
    public count: number;
    public is_new: boolean;
    // @
    constructor() {
        this.type = 0;
        this.id = 0;
        this.lv = 0;
        this.task_end_timestamp = 0;
        this.state = TaskState.NONE;
        this.count = 0;
        this.is_new = true;
    }

    // @
    public get_config(): TaskConfig {
        return gm.config.get_row_data("TaskConfigData", `${this.type}`, `${this.lv}`, `${this.id}`) as TaskConfig;
    }
} // end: TaskItemData class

// @
export class TaskData extends StorageBase {
    public static EVENT_DATA_CHANGE: string = "task_data_change";
    public static task_building_map: { [key: number]: number } | null = null;
    //
    public task_data_array: TaskItemData[];
    public daily_task_count: number;
    public main_task_count: number;
    public main_task_complete_count: number;

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "TaskData";
        this.is_init = false;
        this.task_data_array = [];
        this.daily_task_count = 2;
        this.main_task_count = 1;
        this.main_task_complete_count = 0;
    }

    // @
    public async_read_data(callback?: (data: any) => void): void {
        super.async_read_data((data) => {
            if (this.is_init) {
                let completedCount = 0;
                const currentTime = Date.now();
                for (const task of this.task_data_array) {
                    Object.setPrototypeOf(task, TaskItemData.prototype);
                    if (task.task_end_timestamp > 0 && task.task_end_timestamp < currentTime) {
                        gm.data.task_data.get_next_task(task);
                        completedCount++;
                    }
                }
                if (completedCount > 0) this.async_write_data();
                if (this.main_task_complete_count == null) {
                    this.main_task_complete_count = 0;
                }
            } else {
                for (let i = 0; i < this.daily_task_count; i++) {
                    const newTask = new TaskItemData();
                    newTask.type = 1;
                    this.task_data_array.push(this.get_next_task(newTask));
                }
                const mainTask = new TaskItemData();
                mainTask.type = 2;
                this.task_data_array.push(this.get_next_task(mainTask));
                this.main_task_complete_count = 0;
                this.is_init = true;
                this.async_write_data();
            }
            if (callback) callback(data);
        });
    } // end: async_read_data

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(TaskData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }

    // @
    public get_next_task(task: TaskItemData): TaskItemData {
        if (task.type === 1) {
            const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE);
            const buildLevel: string = (buildData && buildData.buildLvl > 0) ? buildData.buildLvl.toString() : "1";
            const taskConfigArray = [].concat(gm.config.get_row_data_array("TaskConfigData", task.type.toString(), buildLevel)) as TaskConfig[];
            //
            for (let i = 0; i < this.daily_task_count; i++) {
                const existingTask = this.task_data_array[i];
                if (!existingTask) continue;
                for (let n = taskConfigArray.length - 1; n >= 0; n--) {
                    const configTask = taskConfigArray[n];
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
                const randomTask = taskConfigArray[Utils.math_random(true, 0, taskConfigArray.length)];
                task.type = randomTask.type;
                task.id = randomTask.task_id;
                task.lv = randomTask.lv;
                task.task_end_timestamp = 1000 * randomTask.timeout + Date.now();
                task.state = TaskState.ACCEPT;
                task.count = 0;
            }
        } else if (task.type === 2) {
            const taskCfg = gm.config.get_row_data("TaskConfigData", "2", "0", task.id.toString()) as TaskConfig
            const nextId = task.id === 0 ? 20001 : taskCfg.next_id;
            const nextTaskConfig = gm.config.get_row_data("TaskConfigData", "2", "0", nextId.toString()) as TaskConfig
            if (nextTaskConfig) {
                task.id = nextId;
                task.task_end_timestamp = 0;
                task.state = TaskState.ACCEPT;
                task.count = 0;
                this.update_task_progress(nextTaskConfig.condition_type, 0);
            }
        }
        return task;
    } // end: get_next_task

    // @
    public update_task_progress(conditionType: number, value: number = 1): void {
        for (const task of this.task_data_array) {
            const config = task.get_config();
            if (config && config.condition_type === conditionType) {
                this.do_update_task_progress(task, conditionType, config.condition_value, value);
            }
        }
    }

    // @
    public update_build_task_progress(buildType: number): void {
        let taskCondition: number = 0;
        switch (buildType) {
            case BuildTypeEnum.TOWER_TYPE:
                taskCondition = TaskConditionType.CASTLE_UPGRADE;
                break;
            case BuildTypeEnum.PRIVATEHOUSING_TYPE:
                taskCondition = TaskConditionType.HOUSE_UPGRADE;
                break;
            case BuildTypeEnum.WHARFTAX_TYPE:
                taskCondition = TaskConditionType.LIGHTHOUSE_UPGRADE;
                break;
            case BuildTypeEnum.MININGWELL_TYPE:
                taskCondition = TaskConditionType.MINING_WELL_UPGRADE;
                break;
            case BuildTypeEnum.LOGGINGFIELD_TYPE:
                taskCondition = TaskConditionType.SAWMILL_UPGRADE;
                break;
            case BuildTypeEnum.BARRACKS_TYPE:
                taskCondition = TaskConditionType.BARRACK_UPGRADE;
                break;
            case BuildTypeEnum.GARRISION_TYPE:
                taskCondition = TaskConditionType.DEFENSE_HERO_UPGRADE;
                break;
            case BuildTypeEnum.STALL_TYPE:
                taskCondition = TaskConditionType.BOOTH_UPGRADE;
                break;
            case BuildTypeEnum.FISHHOUSE_TYPE:
                taskCondition = TaskConditionType.FISHING_LODGE_UPGRADE;
                break;
            case BuildTypeEnum.FARMHOUSE_TYPE:
                taskCondition = TaskConditionType.COOKHOUSE_UPGRADE;
                break;
            case BuildTypeEnum.WORKHOUSE_TYPE:
                taskCondition = TaskConditionType.WORKSHOP_UPGRADE;
                break;
            case BuildTypeEnum.SEAGOINGBOAT_TYPE:
                taskCondition = TaskConditionType.BOAT_UPGRADE;
                break;
        }
        this.update_task_progress(taskCondition);
    } // end: update_build_task_progress

    // @
    private do_update_task_progress(task: TaskItemData, conditionType: number, conditionValue: number, increment: number): void {
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
                    TaskData.task_building_map = {
                        [TaskConditionType.CASTLE_UPGRADE]: BuildTypeEnum.TOWER_TYPE,
                        [TaskConditionType.HOUSE_UPGRADE]: BuildTypeEnum.PRIVATEHOUSING_TYPE,
                        [TaskConditionType.LIGHTHOUSE_UPGRADE]: BuildTypeEnum.WHARFTAX_TYPE,
                        [TaskConditionType.BOAT_UPGRADE]: BuildTypeEnum.SEAGOINGBOAT_TYPE,
                        [TaskConditionType.MINING_WELL_UPGRADE]: BuildTypeEnum.MININGWELL_TYPE,
                        [TaskConditionType.SAWMILL_UPGRADE]: BuildTypeEnum.LOGGINGFIELD_TYPE,
                        [TaskConditionType.BARRACK_UPGRADE]: BuildTypeEnum.BARRACKS_TYPE,
                        [TaskConditionType.DEFENSE_HERO_UPGRADE]: BuildTypeEnum.GARRISION_TYPE,
                        [TaskConditionType.BOOTH_UPGRADE]: BuildTypeEnum.STALL_TYPE,
                        [TaskConditionType.FISHING_LODGE_UPGRADE]: BuildTypeEnum.FISHHOUSE_TYPE,
                        [TaskConditionType.COOKHOUSE_UPGRADE]: BuildTypeEnum.FARMHOUSE_TYPE,
                        [TaskConditionType.WORKSHOP_UPGRADE]: BuildTypeEnum.WORKHOUSE_TYPE
                    };
                }
                const buildingType = TaskData.task_building_map[conditionType];
                if (buildingType) {
                    const buildData = gm.data.mapCell_data.getBuildDataByType(buildingType);
                    if (buildData) {
                        task.count = buildData.buildLvl;
                    } else {
                        console.error("Building data not found");
                    }
                } else {
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
    } // end: do_update_task_progress

    // @
    public receive_reward(task: TaskItemData, entity: cc.Node, option: number = 0): void {
        const config = task.get_config();
        if (task.count < config.condition_value || task.state !== TaskState.FINISH) return;
        gm.audio.play_effect(gm.const.AUDIO_5_TASK_REWARD);
        const rewardData = {
            type: 1,
            idList: [],
            numList: []
        };
        //
        for (const reward of config.reward_array) {
            if (reward.reward_id >= 23001 && reward.reward_id <= 23099) {
                gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
            } else if (reward.reward_id === RewardIdEnum.GOLD) {
                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                gm.ui.show_coin_fly(RewardIdEnum.GOLD, entity.convertToWorldSpaceAR(cc.Vec3.ZERO));
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            } else if (reward.reward_id === RewardIdEnum.DIAMOND) {
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, entity.convertToWorldSpaceAR(cc.Vec3.ZERO));
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            } else if (reward.reward_id === RewardIdEnum.BARREL) {
                gm.data.mapCell_data.addBarrelNum(reward.reward_num);
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            } else {
                const itemList = [];
                for (let i = 0; i < reward.reward_num; i++) {
                    itemList.push(reward.reward_id);
                }
                gm.data.mapCell_data.addWareHouseList(itemList);
                rewardData.idList.push(reward.reward_id);
                rewardData.numList.push(reward.reward_num);
            }
        }
        //
        task.state = TaskState.HAS_RECEIVE;
        gm.data.task_data.get_next_task(task);
        gm.data.task_data.async_write_data();
        //
        if (rewardData.idList.length > 0) {
            if (option === 2) {
                gm.ui.set_module_args(gm.const.GETDOUBLEOP.key, rewardData);
                gm.ui.async_show_module(gm.const.GETDOUBLEOP);
            } else if (option === 0) {
                gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                    idList: rewardData.idList,
                    numList: rewardData.numList
                });
                gm.ui.async_show_module(gm.const.GETREWARDOP);
            }
        }
    } // end: receive_reward
}  // end: TaskData class
