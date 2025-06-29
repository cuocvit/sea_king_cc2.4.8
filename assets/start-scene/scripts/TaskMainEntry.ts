// *-*
import { TaskData, TaskState, TaskConditionType, TaskItemData } from './TaskData';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { Utils } from './Utils';
import { ReportData } from './NetUtils';
import { BundleName, BuildTypeEnum, SpecialEnum } from './Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class TaskMainEntry extends NodePoolItem {
    @property([cc.Sprite])
    private reward_spr_array: cc.Sprite[] = [];

    @property([cc.Label])
    private reward_lbl_array: cc.Label[] = [];

    @property(cc.Label)
    private progress_lbl: cc.Label | null = null;

    @property(cc.Node)
    private flag_new_node: cc.Node | null = null;

    @property(cc.Node)
    private flag_tow_node: cc.Node | null = null;

    @property(cc.Node)
    private flag_complete_node: cc.Node | null = null;

    @property(cc.Node)
    private not_complete_node: cc.Node | null = null;

    @property(cc.Button)
    private task_btn: cc.Button | null = null;

    private _data: TaskItemData;

    protected onEnable(): void {
        gm.data.event_emitter.on(TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.data = gm.data.task_data.task_data_array[gm.data.task_data.task_data_array.length - 1];
        this.show_weak_guide();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(TaskData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    public show_weak_guide(num: number = 20): void {
        this.scheduleOnce(() => {
            gm.data.show_weak_guide(this.node, cc.v3(200, 0), "", 0, () => {
                this.show_weak_guide();
            });
        }, num);
    }

    public get data(): TaskItemData {
        return this._data;
    }

    public set data(value: TaskItemData) {
        this._data = value;
        this.update_view();
    }

    private update_view(): void {
        const data = this._data;
        const dataConfig = data.get_config();
        if (this.flag_new_node.active = data.is_new, dataConfig) {
            this.flag_tow_node.active = 1 < dataConfig.times;
            if (data.state == TaskState.ACCEPT) {
                this.not_complete_node.active = true;
                this.progress_lbl.string = cc.js.formatStr(dataConfig.content, data.count + "/" + dataConfig.condition_value);
                this.flag_complete_node.active = false;
            }
            else if (data.state == TaskState.FINISH) {
                this.not_complete_node.active = false;
                this.flag_complete_node.active = true;
                this.show_weak_guide();

                for (let index = 0; index < this.reward_spr_array.length; index++) {
                    const rewardSpr = this.reward_spr_array[index];
                    const rewardLBL = this.reward_lbl_array[index];
                    const reward = dataConfig.reward_array[index];

                    if (index < dataConfig.reward_array.length) {
                        rewardSpr.node.active = true;
                        rewardLBL.node.active = true;
                        Utils.async_set_sprite_frame(rewardSpr, BundleName.TASK, "res/" + reward.reward_id);
                        if (reward.reward_id < 3e4) {
                            const itemCfg = gm.data.config_data.getItemCfgByID(reward.reward_id);
                            if (itemCfg) {
                                rewardLBL.string = itemCfg.name + " x" + reward.reward_num;
                            }

                        } else {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(reward.reward_id);
                            if (heroCfg) {
                                rewardLBL.string = heroCfg.name + " x" + reward.reward_num;
                            }
                        }
                    } else {
                        rewardSpr.node.active = false;
                        rewardLBL.node.active = false;
                    }
                }
            }
        }

    }

    private reset(): void {
        this.flag_complete_node.active = false;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.task_btn.node && this._data) {
            if (this._data.state == TaskState.ACCEPT) {
                this._data.is_new = false;
                gm.data.task_data.async_write_data();
                const dataConfig = this.data.get_config();
                if (dataConfig) {
                    switch (dataConfig.condition_type) {
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
                            if (TaskConditionType.FISHING_LODGE_UPGRADE == dataConfig.condition_type) {
                                const buildType = this.getBuildType(dataConfig.condition_type);
                                if (!gm.data.mapCell_data.getBuildDataByType(buildType)) {
                                    gm.ui.show_notice("Mở khóa vùng đất mới để nâng cấp Poseidon Altar!!!");
                                    return;
                                }
                            }
                            const buildType = this.getBuildType(dataConfig.condition_type);
                            const buildDataType = gm.data.mapCell_data.getBuildDataByType(buildType);
                            if (buildDataType) {
                                const buildTowerType = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE);
                                if (buildDataType.buildType != BuildTypeEnum.TOWER_TYPE && buildDataType.buildLvl >= buildTowerType.buildLvl) {
                                    gm.ui.show_notice("Cấp độ của tòa nhà không thể cao hơn cấp độ thành phố chính!");
                                    return;
                                }

                                if (!gm.data.config_data.getBuildCfgByID(buildDataType.buildID + 1)) {
                                    gm.ui.show_notice("Tòa nhà đã đạt cấp tối đa!!!");
                                    return;
                                }

                                this.onClickShowUpgrade(buildDataType.buildID, buildDataType.cellID);
                            }
                            break;

                        case TaskConditionType.POSEIDON:
                            const special = gm.data.mapCell_data.specialList[SpecialEnum.SPIRIT_TYPE];
                            if (1 == special.state) {
                                gm.ui.mapMainUI.showSpiritLock();
                            } else if (2 == special.state) {
                                gm.ui.async_show_module(gm.const.POSEIDON);
                            }
                            break;

                        case TaskConditionType.ATTACK_ISLAND:

                        case TaskConditionType.GET_STAR:
                            gm.ui.mapMainUI.lockSenceMoveMap(199, 1.5, this.onClickOpenFight, this);
                            break;

                        case TaskConditionType.BREAK_BARREL:
                            gm.ui.emit("show_hand_anim");
                            break;

                        case TaskConditionType.AUTOCOMPOSE:
                            gm.ui.emit("task_finish_20009");
                    }
                }

            } else {
                if (this._data.state == TaskState.FINISH) {
                    this._data.is_new = false;
                    if (20013 == this._data.id) {
                        gm.ui.async_show_module(gm.const.Sign);

                    } else if (20004 == this._data.id || 20010 == this._data.id) {
                        if (!gm.data.mapCell_data.guideGift.guideIsGet) {
                            gm.ui.async_show_module(gm.const.GUIDEGIFT);
                        }

                    } else if (20015 == this._data.id) {
                        gm.ui.show_panel(gm.const.SuperRecruit);

                    } else if (!(20003 != this._data.id && 20018 != this._data.id)) {
                        gm.channel.checkShortcut((count: number) => {
                            if (2 <= count) {
                                gm.ui.show_panel(gm.const.AddDesktop);
                            }
                        })
                    }

                    const dataConfig = this._data.get_config();
                    const formatStr = cc.js.formatStr(dataConfig.content, dataConfig.condition_value + "");

                    gm.channel.report_event("complete_main_task", {
                        event_desc: "完成主线任务",
                        task_id: this._data.id,
                        desc: formatStr
                    });

                    gm.channel.report_event("receive_task_reward", {
                        event_desc: "领取任务奖励",
                        desc: "领取主线任务奖励"
                    });

                    gm.data.task_data.main_task_count++;
                    gm.data.task_data.async_write_data();
                    gm.data.task_data.receive_reward(this._data, this.flag_complete_node);
                    ReportData.instance.report_once_point(10100 + this._data.id);

                    if (this.data && this._data.id < 20095) {
                        this.unscheduleAllCallbacks();
                        this.show_weak_guide(0);
                    }
                }
            }
            this.update_view();
        }

    }

    private getBuildType(conditionType: TaskConditionType): BuildTypeEnum | undefined {
        if (conditionType == TaskConditionType.CASTLE_UPGRADE) {
            return BuildTypeEnum.TOWER_TYPE;

        } else if (conditionType == TaskConditionType.HOUSE_UPGRADE) {
            return BuildTypeEnum.PRIVATEHOUSING_TYPE;

        } else if (conditionType == TaskConditionType.LIGHTHOUSE_UPGRADE) {
            return BuildTypeEnum.WHARFTAX_TYPE;

        } else if (conditionType == TaskConditionType.BOAT_UPGRADE) {
            return BuildTypeEnum.SEAGOINGBOAT_TYPE;

        } else if (conditionType == TaskConditionType.MINING_WELL_UPGRADE) {
            return BuildTypeEnum.MININGWELL_TYPE;

        } else if (conditionType == TaskConditionType.SAWMILL_UPGRADE) {
            return BuildTypeEnum.LOGGINGFIELD_TYPE;

        } else if (conditionType == TaskConditionType.BARRACK_UPGRADE) {
            return BuildTypeEnum.BARRACKS_TYPE;

        } else if (conditionType == TaskConditionType.DEFENSE_HERO_UPGRADE) {
            return BuildTypeEnum.GARRISION_TYPE;

        } else if (conditionType == TaskConditionType.BOOTH_UPGRADE) {
            return BuildTypeEnum.STALL_TYPE;

        } else if (conditionType == TaskConditionType.FISHING_LODGE_UPGRADE) {
            return BuildTypeEnum.FISHHOUSE_TYPE;

        } else if (conditionType == TaskConditionType.COOKHOUSE_UPGRADE) {
            return BuildTypeEnum.FARMHOUSE_TYPE;

        } else if (conditionType == TaskConditionType.WORKSHOP_UPGRADE) {
            return BuildTypeEnum.WORKHOUSE_TYPE;

        } else {
            return undefined;
        }
    }

    private onClickShowUpgrade(buildID: number, cellID: number): void {
        gm.ui.mapMainUI.showBuildUpgrade(buildID, cellID)
    }

    private onClickOpenFight(): void {
        gm.ui.set_module_args(gm.const.GOBATTLE.key, 1);
        gm.ui.async_show_module(gm.const.GOBATTLE);
    }
}

export { TaskMainEntry };