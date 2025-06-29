"use strict";
cc._RF.push(module, '27652mNfFdHE5crfMAxm31A', 'TaskMainEntry');
// start-scene/scripts/TaskMainEntry.ts

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
exports.TaskMainEntry = void 0;
// *-*
var TaskData_1 = require("./TaskData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskMainEntry = /** @class */ (function (_super) {
    __extends(TaskMainEntry, _super);
    function TaskMainEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward_spr_array = [];
        _this.reward_lbl_array = [];
        _this.progress_lbl = null;
        _this.flag_new_node = null;
        _this.flag_tow_node = null;
        _this.flag_complete_node = null;
        _this.not_complete_node = null;
        _this.task_btn = null;
        return _this;
    }
    TaskMainEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(TaskData_1.TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.data = GameManager_1.gm.data.task_data.task_data_array[GameManager_1.gm.data.task_data.task_data_array.length - 1];
        this.show_weak_guide();
    };
    TaskMainEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(TaskData_1.TaskData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    TaskMainEntry.prototype.show_weak_guide = function (num) {
        var _this = this;
        if (num === void 0) { num = 20; }
        this.scheduleOnce(function () {
            GameManager_1.gm.data.show_weak_guide(_this.node, cc.v3(200, 0), "", 0, function () {
                _this.show_weak_guide();
            });
        }, num);
    };
    Object.defineProperty(TaskMainEntry.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    TaskMainEntry.prototype.update_view = function () {
        var data = this._data;
        var dataConfig = data.get_config();
        if (this.flag_new_node.active = data.is_new, dataConfig) {
            this.flag_tow_node.active = 1 < dataConfig.times;
            if (data.state == TaskData_1.TaskState.ACCEPT) {
                this.not_complete_node.active = true;
                this.progress_lbl.string = cc.js.formatStr(dataConfig.content, data.count + "/" + dataConfig.condition_value);
                this.flag_complete_node.active = false;
            }
            else if (data.state == TaskData_1.TaskState.FINISH) {
                this.not_complete_node.active = false;
                this.flag_complete_node.active = true;
                this.show_weak_guide();
                for (var index = 0; index < this.reward_spr_array.length; index++) {
                    var rewardSpr = this.reward_spr_array[index];
                    var rewardLBL = this.reward_lbl_array[index];
                    var reward = dataConfig.reward_array[index];
                    if (index < dataConfig.reward_array.length) {
                        rewardSpr.node.active = true;
                        rewardLBL.node.active = true;
                        Utils_1.Utils.async_set_sprite_frame(rewardSpr, Constants_1.BundleName.TASK, "res/" + reward.reward_id);
                        if (reward.reward_id < 3e4) {
                            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(reward.reward_id);
                            if (itemCfg) {
                                rewardLBL.string = itemCfg.name + " x" + reward.reward_num;
                            }
                        }
                        else {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(reward.reward_id);
                            if (heroCfg) {
                                rewardLBL.string = heroCfg.name + " x" + reward.reward_num;
                            }
                        }
                    }
                    else {
                        rewardSpr.node.active = false;
                        rewardLBL.node.active = false;
                    }
                }
            }
        }
    };
    TaskMainEntry.prototype.reset = function () {
        this.flag_complete_node.active = false;
    };
    TaskMainEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.task_btn.node && this._data) {
            if (this._data.state == TaskData_1.TaskState.ACCEPT) {
                this._data.is_new = false;
                GameManager_1.gm.data.task_data.async_write_data();
                var dataConfig = this.data.get_config();
                if (dataConfig) {
                    switch (dataConfig.condition_type) {
                        case TaskData_1.TaskConditionType.CASTLE_UPGRADE:
                        case TaskData_1.TaskConditionType.HOUSE_UPGRADE:
                        case TaskData_1.TaskConditionType.LIGHTHOUSE_UPGRADE:
                        case TaskData_1.TaskConditionType.BOAT_UPGRADE:
                        case TaskData_1.TaskConditionType.MINING_WELL_UPGRADE:
                        case TaskData_1.TaskConditionType.SAWMILL_UPGRADE:
                        case TaskData_1.TaskConditionType.BARRACK_UPGRADE:
                        case TaskData_1.TaskConditionType.DEFENSE_HERO_UPGRADE:
                        case TaskData_1.TaskConditionType.BOOTH_UPGRADE:
                        case TaskData_1.TaskConditionType.FISHING_LODGE_UPGRADE:
                        case TaskData_1.TaskConditionType.COOKHOUSE_UPGRADE:
                        case TaskData_1.TaskConditionType.WORKSHOP_UPGRADE:
                            if (TaskData_1.TaskConditionType.FISHING_LODGE_UPGRADE == dataConfig.condition_type) {
                                var buildType_1 = this.getBuildType(dataConfig.condition_type);
                                if (!GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType_1)) {
                                    GameManager_1.gm.ui.show_notice("Mở khóa vùng đất mới để nâng cấp Poseidon Altar!!!");
                                    return;
                                }
                            }
                            var buildType = this.getBuildType(dataConfig.condition_type);
                            var buildDataType = GameManager_1.gm.data.mapCell_data.getBuildDataByType(buildType);
                            if (buildDataType) {
                                var buildTowerType = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE);
                                if (buildDataType.buildType != Constants_1.BuildTypeEnum.TOWER_TYPE && buildDataType.buildLvl >= buildTowerType.buildLvl) {
                                    GameManager_1.gm.ui.show_notice("Cấp độ của tòa nhà không thể cao hơn cấp độ thành phố chính!");
                                    return;
                                }
                                if (!GameManager_1.gm.data.config_data.getBuildCfgByID(buildDataType.buildID + 1)) {
                                    GameManager_1.gm.ui.show_notice("Tòa nhà đã đạt cấp tối đa!!!");
                                    return;
                                }
                                this.onClickShowUpgrade(buildDataType.buildID, buildDataType.cellID);
                            }
                            break;
                        case TaskData_1.TaskConditionType.POSEIDON:
                            var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.SPIRIT_TYPE];
                            if (1 == special.state) {
                                GameManager_1.gm.ui.mapMainUI.showSpiritLock();
                            }
                            else if (2 == special.state) {
                                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.POSEIDON);
                            }
                            break;
                        case TaskData_1.TaskConditionType.ATTACK_ISLAND:
                        case TaskData_1.TaskConditionType.GET_STAR:
                            GameManager_1.gm.ui.mapMainUI.lockSenceMoveMap(199, 1.5, this.onClickOpenFight, this);
                            break;
                        case TaskData_1.TaskConditionType.BREAK_BARREL:
                            GameManager_1.gm.ui.emit("show_hand_anim");
                            break;
                        case TaskData_1.TaskConditionType.AUTOCOMPOSE:
                            GameManager_1.gm.ui.emit("task_finish_20009");
                    }
                }
            }
            else {
                if (this._data.state == TaskData_1.TaskState.FINISH) {
                    this._data.is_new = false;
                    if (20013 == this._data.id) {
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Sign);
                    }
                    else if (20004 == this._data.id || 20010 == this._data.id) {
                        if (!GameManager_1.gm.data.mapCell_data.guideGift.guideIsGet) {
                            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GUIDEGIFT);
                        }
                    }
                    else if (20015 == this._data.id) {
                        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.SuperRecruit);
                    }
                    else if (!(20003 != this._data.id && 20018 != this._data.id)) {
                        GameManager_1.gm.channel.checkShortcut(function (count) {
                            if (2 <= count) {
                                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.AddDesktop);
                            }
                        });
                    }
                    var dataConfig = this._data.get_config();
                    var formatStr = cc.js.formatStr(dataConfig.content, dataConfig.condition_value + "");
                    GameManager_1.gm.channel.report_event("complete_main_task", {
                        event_desc: "完成主线任务",
                        task_id: this._data.id,
                        desc: formatStr
                    });
                    GameManager_1.gm.channel.report_event("receive_task_reward", {
                        event_desc: "领取任务奖励",
                        desc: "领取主线任务奖励"
                    });
                    GameManager_1.gm.data.task_data.main_task_count++;
                    GameManager_1.gm.data.task_data.async_write_data();
                    GameManager_1.gm.data.task_data.receive_reward(this._data, this.flag_complete_node);
                    NetUtils_1.ReportData.instance.report_once_point(10100 + this._data.id);
                    if (this.data && this._data.id < 20095) {
                        this.unscheduleAllCallbacks();
                        this.show_weak_guide(0);
                    }
                }
            }
            this.update_view();
        }
    };
    TaskMainEntry.prototype.getBuildType = function (conditionType) {
        if (conditionType == TaskData_1.TaskConditionType.CASTLE_UPGRADE) {
            return Constants_1.BuildTypeEnum.TOWER_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.HOUSE_UPGRADE) {
            return Constants_1.BuildTypeEnum.PRIVATEHOUSING_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.LIGHTHOUSE_UPGRADE) {
            return Constants_1.BuildTypeEnum.WHARFTAX_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.BOAT_UPGRADE) {
            return Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.MINING_WELL_UPGRADE) {
            return Constants_1.BuildTypeEnum.MININGWELL_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.SAWMILL_UPGRADE) {
            return Constants_1.BuildTypeEnum.LOGGINGFIELD_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.BARRACK_UPGRADE) {
            return Constants_1.BuildTypeEnum.BARRACKS_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.DEFENSE_HERO_UPGRADE) {
            return Constants_1.BuildTypeEnum.GARRISION_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.BOOTH_UPGRADE) {
            return Constants_1.BuildTypeEnum.STALL_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.FISHING_LODGE_UPGRADE) {
            return Constants_1.BuildTypeEnum.FISHHOUSE_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.COOKHOUSE_UPGRADE) {
            return Constants_1.BuildTypeEnum.FARMHOUSE_TYPE;
        }
        else if (conditionType == TaskData_1.TaskConditionType.WORKSHOP_UPGRADE) {
            return Constants_1.BuildTypeEnum.WORKHOUSE_TYPE;
        }
        else {
            return undefined;
        }
    };
    TaskMainEntry.prototype.onClickShowUpgrade = function (buildID, cellID) {
        GameManager_1.gm.ui.mapMainUI.showBuildUpgrade(buildID, cellID);
    };
    TaskMainEntry.prototype.onClickOpenFight = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, 1);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE);
    };
    __decorate([
        property([cc.Sprite])
    ], TaskMainEntry.prototype, "reward_spr_array", void 0);
    __decorate([
        property([cc.Label])
    ], TaskMainEntry.prototype, "reward_lbl_array", void 0);
    __decorate([
        property(cc.Label)
    ], TaskMainEntry.prototype, "progress_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], TaskMainEntry.prototype, "flag_new_node", void 0);
    __decorate([
        property(cc.Node)
    ], TaskMainEntry.prototype, "flag_tow_node", void 0);
    __decorate([
        property(cc.Node)
    ], TaskMainEntry.prototype, "flag_complete_node", void 0);
    __decorate([
        property(cc.Node)
    ], TaskMainEntry.prototype, "not_complete_node", void 0);
    __decorate([
        property(cc.Button)
    ], TaskMainEntry.prototype, "task_btn", void 0);
    TaskMainEntry = __decorate([
        ccclass
    ], TaskMainEntry);
    return TaskMainEntry;
}(NodePoolItem_1.NodePoolItem));
exports.TaskMainEntry = TaskMainEntry;

cc._RF.pop();