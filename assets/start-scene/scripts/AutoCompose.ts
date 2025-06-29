//
import { gm } from './GameManager';
import { GameModule } from './GameModule';
import { Utils } from './Utils';
import { ReportData } from './NetUtils';
import { TaskConditionType } from './TaskData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class AutoCompose extends GameModule {
    @property(cc.Sprite)
    private mask: cc.Sprite | null = null;

    @property(cc.Label)
    private lblTime: cc.Label | null = null;

    @property(cc.Node)
    private newerIcon: cc.Node | null = null;

    @property(cc.Node)
    private handAni: cc.Node | null = null;

    @property(cc.Animation)
    private autoAnim: cc.Animation | null = null;

    private _timeContainer: number = 0;
    private _maxTime: number = 600;
    public _stopTime: number = 0;
    private timer: number = 0;

    // @ (LIFE-CYCLE CALLBACKS)
    protected onEnable(): void {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        this.newerIcon.active = gm.data.mapCell_data.is_first_auto_compose === 0;
        this.showReciveTime();
        gm.ui.on("task_finish_20009", this.showHandAnimAtAutoCom, this);
        gm.data.event_emitter.on("auto_merge_message", this.on_auto_merge_message, this);
    }

    // @ (LIFE-CYCLE CALLBACKS)
    protected onDisable(): void {
        gm.data.event_emitter.off("auto_merge_message", this.on_auto_merge_message, this);
        gm.ui.off("task_finish_20009", this.showHandAnimAtAutoCom, this);
    }

    // @
    private showHandAnimAtAutoCom(): void {
        this.handAni.active = true;
    }

    // @
    private on_auto_merge_message(): void {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        if (gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.newerIcon.active = false;
            gm.data.mapCell_data.setAutoComposeUsed();
            this._stopTime = this._maxTime;
        } else {
            this._stopTime = this._maxTime;
            gm.channel.report_event("video_auto_merge", {
                event_desc: "Watch video automatically", // 看视频自动合成
                desc: "Watch video automatically" // 看视频自动合成
            });
            ReportData.instance.report_once_point(10881);
            ReportData.instance.report_point(10882);
        }
        this.playAutoCompose();
    }

    // @
    private playAutoCompose(): void {
        gm.data.task_data.update_task_progress(TaskConditionType.AUTOCOMPOSE);
        if (!gm.data.mapCell_data.autoCompose()) {
            gm.data.mapCell_data.autoOpenCase();
        }
    }

    // @
    private onClick(): void {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        if (gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.newerIcon.active = false;
            gm.data.mapCell_data.setAutoComposeUsed();
            this._stopTime = this._maxTime;
            this.playAutoCompose();
        } else if (this._stopTime <= 0) {
            gm.channel.show_video_ad(this.watchAdCb, this);
        }
    }

    // @
    private watchAdCb(): void {
        if (this._stopTime > 0) return;
        this._stopTime = this._maxTime;
        gm.channel.report_event("video_auto_merge", {
            event_desc: "Watch video automatically", // 看视频自动合成
            desc: "Watch video automatically" // 看视频自动合成
        });
        ReportData.instance.report_once_point(10881);
        ReportData.instance.report_point(10882);
        this.playAutoCompose();
    }

    // @ (LIFE-CYCLE CALLBACKS)
    protected update(deltaTime: number): void {
        if (gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.timer += deltaTime;
            if (this.timer > 15 && !this.autoAnim.node.active) {
                this.autoAnim.node.active = true;
                this.autoAnim.play();
            }
        }
        if (this._stopTime > 0) {
            this._timeContainer += deltaTime;
            if (this._timeContainer >= 1) {
                --this._timeContainer;
                this._stopTime--;
                this.playAutoCompose();
                this.showReciveTime();
            }
        }
    }

    // @
    private showReciveTime(): void {
        this.lblTime.string = Utils.format_time_miunte(this._stopTime);
        this.mask.fillRange = this._stopTime / this._maxTime;
        if (this._stopTime === 0) {
            this.lblTime.string = "Tự động tổng hợp"; // 自动合成
            this.mask.fillRange = 0;
        }
    }
}
