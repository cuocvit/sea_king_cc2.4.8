import { TaskData, TaskItemData, TaskState } from '../../start-scene/scripts/TaskData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { Timer } from '../../start-scene/scripts/Timer';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { BundleName } from '../../start-scene/scripts/Constants';

export interface TaskArgs {
    world_point: cc.Vec3;
    data: TaskItemData;
}
const { ccclass, property } = cc._decorator;

@ccclass
class Task extends GameModule {
    @property(cc.Node)
    private mask_node: cc.Node = null;

    @property(cc.Node)
    private window_node: cc.Node = null;

    @property(cc.Node)
    private receive_node: cc.Node = null;

    @property(cc.Node)
    private reward_bg_node: cc.Node = null;

    @property(cc.Node)
    private flag_tow_node: cc.Node = null;

    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private receive_btn: cc.Button = null;

    @property(cc.Label)
    private title_lbl: cc.Label = null;

    @property(cc.Label)
    private content_lbl: cc.Label = null;

    @property(cc.Label)
    private count_lbl: cc.Label = null;

    @property(cc.ProgressBar)
    private count_prg: cc.ProgressBar = null;

    @property(cc.Label)
    private left_sec_lbl: cc.Label = null;

    @property([cc.Sprite])
    private reward_spr_array: cc.Sprite[] = [];

    @property([cc.Label])
    private reward_lbl_array: cc.Label[] = [];

    private _args: TaskArgs = null;
    private _timer: Timer | null = null;

    protected onEnable(): void {
        this._args = gm.ui.get_module_args(gm.const.Task.key) as TaskArgs;
        this.window_node.position = this.node.convertToNodeSpaceAR(this._args.world_point);
        gm.data.event_emitter.on(TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.mask_node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.mask_node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this._timer && this._timer.is_running && this._timer.stop();
    }

    private update_view(): void {
        const data = this._args.data;
        const dataConfig = data.get_config();

        if (dataConfig) {
            this.title_lbl.string = dataConfig.name;
            if (1 == data.type) {
                this.content_lbl.string = dataConfig.content;
            } else if (2 == data.type) {
                this.content_lbl.string = cc.js.formatStr(dataConfig.content, data.count + "/" + dataConfig.condition_value);
            }
            this.count_lbl.string = data.count + "/" + dataConfig.condition_value;
            this.count_prg.progress = data.count / dataConfig.condition_value;

            for (let index = 0; index < this.reward_spr_array.length; index++) {
                const rewardSpr = this.reward_spr_array[index];
                const rewardLbl = this.reward_lbl_array[index];
                if (index < dataConfig.reward_array.length) {
                    rewardSpr.node.active = true;
                    rewardLbl.node.active = true;
                    Utils.async_set_sprite_frame(rewardSpr, BundleName.TASK, "res/" + dataConfig.reward_array[index].reward_id);
                    rewardLbl.string = "x" + dataConfig.reward_array[index].reward_num;
                } else {
                    rewardSpr.node.active = false;
                    rewardLbl.node.active = false;
                }
            }
            this.flag_tow_node.active = 1 < dataConfig.times;
        }

        if (data.state == TaskState.ACCEPT) {
            this.receive_node.active = false;
            this.reward_bg_node.color = gm.const.TASK_NOT_COMPLETE_COLOR;
            if (0 < data.task_end_timestamp) {
                const remainingTimeInSeconds = Math.ceil((data.task_end_timestamp - Date.now()) / 1e3);
                if (0 < remainingTimeInSeconds) {
                    this.left_sec_lbl.node.active = true;
                    if (!this._timer) {
                        this._timer = new Timer;
                    }

                    this._timer.start((t, e) => {
                        const remainingTimeInSeconds = Math.ceil((data.task_end_timestamp - Date.now()) / 1e3);
                        this.left_sec_lbl.string = Utils.format_time(remainingTimeInSeconds);

                        if (e <= t) {
                            gm.data.task_data.get_next_task(data);
                            gm.data.task_data.async_write_data();
                            this.update_view();
                        }
                    }, 1e3, remainingTimeInSeconds);

                } else {
                    gm.data.task_data.get_next_task(data);
                    gm.data.task_data.async_write_data();
                    this.update_view();
                }

            } else {
                this.left_sec_lbl.node.active = false;
            }

        } else if (data.state == TaskState.FINISH) {
            this.receive_node.active = true;
            this.reward_bg_node.color = gm.const.TASK_COMPLETE_COLOR;
            this.left_sec_lbl.node.active = false;
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node) {
            gm.ui.async_hide_module(gm.const.Task);
        } else if (event.target == this.receive_btn.node) {
            gm.data.task_data.receive_reward(this._args.data, this.reward_bg_node, 2);
            gm.channel.report_event("receive_task_reward", {
                event_desc: "领取任务奖励",
                desc: "领取日常任务奖励"
            });

            ReportData.instance.report_once_point(10801);
            ReportData.instance.report_point(10802);
            gm.ui.async_hide_module(gm.const.Task)
        }
    }

    private on_touch_end_handler(event: cc.Event): void {
        if (event.target == this.mask_node) {
            gm.ui.async_hide_module(gm.const.Task);
        }
    }
}

export { Task };