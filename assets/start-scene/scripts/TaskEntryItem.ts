//
import { TaskData, TaskState, TaskItemData } from './TaskData';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { Utils } from './Utils';
import { BundleName } from './Constants';

const { ccclass, property } = cc._decorator;

@ccclass
export class TaskEntryItem extends NodePoolItem {
    @property(cc.Node)
    private reward_node: cc.Node | null = null;

    @property([cc.Sprite])
    private reward_spr_array: cc.Sprite[] = [];

    @property([cc.Label])
    private reward_lbl_array: cc.Label[] = [];

    @property(cc.Sprite)
    private avatar_spr: cc.Sprite | null = null;

    @property(cc.Node)
    private progress_node: cc.Node | null = null;

    @property(cc.Sprite)
    private progress_bar_spr: cc.Sprite | null = null;

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

    private _data: TaskItemData | null = null; // cần xem TaskData
    private _max_progress: number = 0.196;

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
                this.progress_bar_spr.fillRange = data.count / dataConfig.condition_value * this._max_progress;
                this.flag_complete_node.active = false;
                this.reward_node.active = false;
                this.node.width = 93;

            } else if (data.state == TaskState.FINISH) {
                this.not_complete_node.active = false;
                this.flag_complete_node.active = true;
                this.reward_node.active = true;

                for (let index = 0; index < this.reward_spr_array.length; index++) {
                    const rewardSpr = this.reward_spr_array[index];
                    const rewardLbl = this.reward_lbl_array[index];
                    const reward = dataConfig.reward_array[index];
                    if (index < dataConfig.reward_array.length) {
                        rewardSpr.node.active = true;
                        rewardLbl.node.active = true;
                        Utils.async_set_sprite_frame(rewardSpr, BundleName.TASK, "res/" + reward.reward_id);
                        if (reward.reward_id < 3e4) {
                            const itemCfg = gm.data.config_data.getItemCfgByID(reward.reward_id);
                            if (itemCfg) {
                                rewardLbl.string = itemCfg.name + " x" + reward.reward_num;
                            }
                        } else {
                            const heroCfg = gm.data.config_data.getHeroCfgByID(reward.reward_id);
                            if (heroCfg) {
                                rewardLbl.string = heroCfg.name + " x" + reward.reward_num;
                            }
                        }
                    } else {
                        rewardSpr.node.active = false;
                        rewardLbl.node.active = false;
                    }
                }
                this.scheduleOnce(() => {
                    this.node.width = 93 + this.reward_node.width - 61;
                });
            }

            Utils.async_set_sprite_frame(this.avatar_spr, BundleName.TASK, "res/" + dataConfig.icon_id);
        }
    }

    public reset(): void {
        this.flag_complete_node.active = false;
        this.reward_node.active = false;
    }

    public editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.task_btn.node && this._data) {
            if (!(this._data.state != TaskState.ACCEPT && this._data.state != TaskState.FINISH)) {
                this._data.is_new = false;
            }

            gm.data.task_data.async_write_data();
            this.update_view();
            const worldPoint = this.node.convertToWorldSpaceAR(cc.v3(94, 0));

            gm.ui.set_module_args(gm.const.Task.key, {
                data: this._data,
                world_point: worldPoint
            });

            gm.ui.async_show_module(gm.const.Task);
        }
    }
}