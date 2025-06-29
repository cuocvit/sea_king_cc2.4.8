
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TaskMainEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRhc2tNYWluRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTix1Q0FBa0Y7QUFDbEYsNkNBQW1DO0FBQ25DLCtDQUE4QztBQUM5QyxpQ0FBZ0M7QUFDaEMsdUNBQXdDO0FBQ3hDLHlDQUFxRTtBQUUvRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QixpQ0FBWTtJQUF4QztRQUFBLHFFQW9SQztRQWxSVyxzQkFBZ0IsR0FBZ0IsRUFBRSxDQUFDO1FBR25DLHNCQUFnQixHQUFlLEVBQUUsQ0FBQztRQUdsQyxrQkFBWSxHQUFvQixJQUFJLENBQUM7UUFHckMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLG1CQUFhLEdBQW1CLElBQUksQ0FBQztRQUdyQyx3QkFBa0IsR0FBbUIsSUFBSSxDQUFDO1FBRzFDLHVCQUFpQixHQUFtQixJQUFJLENBQUM7UUFHekMsY0FBUSxHQUFxQixJQUFJLENBQUM7O0lBNlA5QyxDQUFDO0lBelBhLGdDQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxtQkFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVMsaUNBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLElBQUks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QixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFqUkQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7MkRBQ3FCO0lBRzNDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDOzJEQUNxQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUMwQjtJQUc3QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUMyQjtJQUc3QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUMyQjtJQUc3QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZEQUNnQztJQUdsRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUMrQjtJQUdqRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNzQjtJQXZCeEMsYUFBYTtRQURsQixPQUFPO09BQ0YsYUFBYSxDQW9SbEI7SUFBRCxvQkFBQztDQXBSRCxBQW9SQyxDQXBSMkIsMkJBQVksR0FvUnZDO0FBRVEsc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqLSpcclxuaW1wb3J0IHsgVGFza0RhdGEsIFRhc2tTdGF0ZSwgVGFza0NvbmRpdGlvblR5cGUsIFRhc2tJdGVtRGF0YSB9IGZyb20gJy4vVGFza0RhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgQnVpbGRUeXBlRW51bSwgU3BlY2lhbEVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgVGFza01haW5FbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZV0pXHJcbiAgICBwcml2YXRlIHJld2FyZF9zcHJfYXJyYXk6IGNjLlNwcml0ZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5MYWJlbF0pXHJcbiAgICBwcml2YXRlIHJld2FyZF9sYmxfYXJyYXk6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHByb2dyZXNzX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZmxhZ19uZXdfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBmbGFnX3Rvd19ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGZsYWdfY29tcGxldGVfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub3RfY29tcGxldGVfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHRhc2tfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOiBUYXNrSXRlbURhdGE7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihUYXNrRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZ20uZGF0YS50YXNrX2RhdGEudGFza19kYXRhX2FycmF5W2dtLmRhdGEudGFza19kYXRhLnRhc2tfZGF0YV9hcnJheS5sZW5ndGggLSAxXTtcclxuICAgICAgICB0aGlzLnNob3dfd2Vha19ndWlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9mZihUYXNrRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dfd2Vha19ndWlkZShudW06IG51bWJlciA9IDIwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbS5kYXRhLnNob3dfd2Vha19ndWlkZSh0aGlzLm5vZGUsIGNjLnYzKDIwMCwgMCksIFwiXCIsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd193ZWFrX2d1aWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IFRhc2tJdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBUYXNrSXRlbURhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvbmZpZyA9IGRhdGEuZ2V0X2NvbmZpZygpO1xyXG4gICAgICAgIGlmICh0aGlzLmZsYWdfbmV3X25vZGUuYWN0aXZlID0gZGF0YS5pc19uZXcsIGRhdGFDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5mbGFnX3Rvd19ub2RlLmFjdGl2ZSA9IDEgPCBkYXRhQ29uZmlnLnRpbWVzO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0ZSA9PSBUYXNrU3RhdGUuQUNDRVBUKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdF9jb21wbGV0ZV9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzX2xibC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoZGF0YUNvbmZpZy5jb250ZW50LCBkYXRhLmNvdW50ICsgXCIvXCIgKyBkYXRhQ29uZmlnLmNvbmRpdGlvbl92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdfY29tcGxldGVfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnN0YXRlID09IFRhc2tTdGF0ZS5GSU5JU0gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90X2NvbXBsZXRlX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdfY29tcGxldGVfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93X3dlYWtfZ3VpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5yZXdhcmRfc3ByX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZFNwciA9IHRoaXMucmV3YXJkX3Nwcl9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkTEJMID0gdGhpcy5yZXdhcmRfbGJsX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXdhcmQgPSBkYXRhQ29uZmlnLnJld2FyZF9hcnJheVtpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IGRhdGFDb25maWcucmV3YXJkX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRTcHIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRMQkwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHJld2FyZFNwciwgQnVuZGxlTmFtZS5UQVNLLCBcInJlcy9cIiArIHJld2FyZC5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV3YXJkLnJld2FyZF9pZCA8IDNlNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUNmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SXRlbUNmZ0J5SUQocmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUNmZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExCTC5zdHJpbmcgPSBpdGVtQ2ZnLm5hbWUgKyBcIiB4XCIgKyByZXdhcmQucmV3YXJkX251bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRIZXJvQ2ZnQnlJRChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTEJMLnN0cmluZyA9IGhlcm9DZmcubmFtZSArIFwiIHhcIiArIHJld2FyZC5yZXdhcmRfbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkU3ByLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExCTC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZsYWdfY29tcGxldGVfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMudGFza19idG4ubm9kZSAmJiB0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLnN0YXRlID09IFRhc2tTdGF0ZS5BQ0NFUFQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEuaXNfbmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhQ29uZmlnID0gdGhpcy5kYXRhLmdldF9jb25maWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhQ29uZmlnLmNvbmRpdGlvbl90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuQ0FTVExFX1VQR1JBREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuSE9VU0VfVVBHUkFERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5MSUdIVEhPVVNFX1VQR1JBREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuQk9BVF9VUEdSQURFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLk1JTklOR19XRUxMX1VQR1JBREU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuU0FXTUlMTF9VUEdSQURFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLkJBUlJBQ0tfVVBHUkFERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5ERUZFTlNFX0hFUk9fVVBHUkFERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5CT09USF9VUEdSQURFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLkZJU0hJTkdfTE9ER0VfVVBHUkFERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5DT09LSE9VU0VfVVBHUkFERTpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza0NvbmRpdGlvblR5cGUuV09SS1NIT1BfVVBHUkFERTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChUYXNrQ29uZGl0aW9uVHlwZS5GSVNISU5HX0xPREdFX1VQR1JBREUgPT0gZGF0YUNvbmZpZy5jb25kaXRpb25fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkVHlwZSA9IHRoaXMuZ2V0QnVpbGRUeXBlKGRhdGFDb25maWcuY29uZGl0aW9uX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKGJ1aWxkVHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJN4bufIGtow7NhIHbDuW5nIMSR4bqldCBt4bubaSDEkeG7gyBuw6JuZyBj4bqlcCBQb3NlaWRvbiBBbHRhciEhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkVHlwZSA9IHRoaXMuZ2V0QnVpbGRUeXBlKGRhdGFDb25maWcuY29uZGl0aW9uX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGREYXRhVHlwZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShidWlsZFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkRGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZFRvd2VyVHlwZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZERhdGFUeXBlLmJ1aWxkVHlwZSAhPSBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEUgJiYgYnVpbGREYXRhVHlwZS5idWlsZEx2bCA+PSBidWlsZFRvd2VyVHlwZS5idWlsZEx2bCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkPhuqVwIMSR4buZIGPhu6dhIHTDsmEgbmjDoCBraMO0bmcgdGjhu4MgY2FvIGjGoW4gY+G6pXAgxJHhu5kgdGjDoG5oIHBo4buRIGNow61uaCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ20uZGF0YS5jb25maWdfZGF0YS5nZXRCdWlsZENmZ0J5SUQoYnVpbGREYXRhVHlwZS5idWlsZElEICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJUw7JhIG5ow6AgxJHDoyDEkeG6oXQgY+G6pXAgdOG7kWkgxJFhISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tTaG93VXBncmFkZShidWlsZERhdGFUeXBlLmJ1aWxkSUQsIGJ1aWxkRGF0YVR5cGUuY2VsbElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5QT1NFSURPTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwZWNpYWwgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5zcGVjaWFsTGlzdFtTcGVjaWFsRW51bS5TUElSSVRfVFlQRV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMSA9PSBzcGVjaWFsLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dTcGlyaXRMb2NrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDIgPT0gc3BlY2lhbC5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LlBPU0VJRE9OKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5BVFRBQ0tfSVNMQU5EOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5HRVRfU1RBUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5sb2NrU2VuY2VNb3ZlTWFwKDE5OSwgMS41LCB0aGlzLm9uQ2xpY2tPcGVuRmlnaHQsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tDb25kaXRpb25UeXBlLkJSRUFLX0JBUlJFTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJzaG93X2hhbmRfYW5pbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrQ29uZGl0aW9uVHlwZS5BVVRPQ09NUE9TRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJ0YXNrX2ZpbmlzaF8yMDAwOVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEuc3RhdGUgPT0gVGFza1N0YXRlLkZJTklTSCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEuaXNfbmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDIwMDEzID09IHRoaXMuX2RhdGEuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuU2lnbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMjAwMDQgPT0gdGhpcy5fZGF0YS5pZCB8fCAyMDAxMCA9PSB0aGlzLl9kYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ3VpZGVHaWZ0Lmd1aWRlSXNHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdVSURFR0lGVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgyMDAxNSA9PSB0aGlzLl9kYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuU3VwZXJSZWNydWl0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghKDIwMDAzICE9IHRoaXMuX2RhdGEuaWQgJiYgMjAwMTggIT0gdGhpcy5fZGF0YS5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5jaGVja1Nob3J0Y3V0KChjb3VudDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMiA8PSBjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQWRkRGVza3RvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhQ29uZmlnID0gdGhpcy5fZGF0YS5nZXRfY29uZmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0U3RyID0gY2MuanMuZm9ybWF0U3RyKGRhdGFDb25maWcuY29udGVudCwgZGF0YUNvbmZpZy5jb25kaXRpb25fdmFsdWUgKyBcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJjb21wbGV0ZV9tYWluX3Rhc2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuWujOaIkOS4u+e6v+S7u+WKoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrX2lkOiB0aGlzLl9kYXRhLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBmb3JtYXRTdHJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJyZWNlaXZlX3Rhc2tfcmV3YXJkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRfZGVzYzogXCLpooblj5bku7vliqHlpZblirFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLpooblj5bkuLvnur/ku7vliqHlpZblirFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS5tYWluX3Rhc2tfY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEucmVjZWl2ZV9yZXdhcmQodGhpcy5fZGF0YSwgdGhpcy5mbGFnX2NvbXBsZXRlX25vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTAxMDAgKyB0aGlzLl9kYXRhLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLl9kYXRhLmlkIDwgMjAwOTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd193ZWFrX2d1aWRlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJ1aWxkVHlwZShjb25kaXRpb25UeXBlOiBUYXNrQ29uZGl0aW9uVHlwZSk6IEJ1aWxkVHlwZUVudW0gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmIChjb25kaXRpb25UeXBlID09IFRhc2tDb25kaXRpb25UeXBlLkNBU1RMRV9VUEdSQURFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWlsZFR5cGVFbnVtLlRPV0VSX1RZUEU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZGl0aW9uVHlwZSA9PSBUYXNrQ29uZGl0aW9uVHlwZS5IT1VTRV9VUEdSQURFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWlsZFR5cGVFbnVtLlBSSVZBVEVIT1VTSU5HX1RZUEU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZGl0aW9uVHlwZSA9PSBUYXNrQ29uZGl0aW9uVHlwZS5MSUdIVEhPVVNFX1VQR1JBREUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IFRhc2tDb25kaXRpb25UeXBlLkJPQVRfVVBHUkFERSkge1xyXG4gICAgICAgICAgICByZXR1cm4gQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IFRhc2tDb25kaXRpb25UeXBlLk1JTklOR19XRUxMX1VQR1JBREUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1aWxkVHlwZUVudW0uTUlOSU5HV0VMTF9UWVBFO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gVGFza0NvbmRpdGlvblR5cGUuU0FXTUlMTF9VUEdSQURFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWlsZFR5cGVFbnVtLkxPR0dJTkdGSUVMRF9UWVBFO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gVGFza0NvbmRpdGlvblR5cGUuQkFSUkFDS19VUEdSQURFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWlsZFR5cGVFbnVtLkJBUlJBQ0tTX1RZUEU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZGl0aW9uVHlwZSA9PSBUYXNrQ29uZGl0aW9uVHlwZS5ERUZFTlNFX0hFUk9fVVBHUkFERSkge1xyXG4gICAgICAgICAgICByZXR1cm4gQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IFRhc2tDb25kaXRpb25UeXBlLkJPT1RIX1VQR1JBREUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1aWxkVHlwZUVudW0uU1RBTExfVFlQRTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IFRhc2tDb25kaXRpb25UeXBlLkZJU0hJTkdfTE9ER0VfVVBHUkFERSkge1xyXG4gICAgICAgICAgICByZXR1cm4gQnVpbGRUeXBlRW51bS5GSVNISE9VU0VfVFlQRTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb25UeXBlID09IFRhc2tDb25kaXRpb25UeXBlLkNPT0tIT1VTRV9VUEdSQURFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWlsZFR5cGVFbnVtLkZBUk1IT1VTRV9UWVBFO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmRpdGlvblR5cGUgPT0gVGFza0NvbmRpdGlvblR5cGUuV09SS1NIT1BfVVBHUkFERSkge1xyXG4gICAgICAgICAgICByZXR1cm4gQnVpbGRUeXBlRW51bS5XT1JLSE9VU0VfVFlQRTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrU2hvd1VwZ3JhZGUoYnVpbGRJRDogbnVtYmVyLCBjZWxsSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaG93QnVpbGRVcGdyYWRlKGJ1aWxkSUQsIGNlbGxJRClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tPcGVuRmlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdPQkFUVExFLmtleSwgMSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR09CQVRUTEUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUYXNrTWFpbkVudHJ5IH07Il19