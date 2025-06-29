import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
class SpinePlayer extends cc.Component {
    @property(cc.EditBox)
    private bundle_name_edit: cc.EditBox = null;

    @property(cc.EditBox)
    private spine_url_edit: cc.EditBox = null;

    @property(cc.EditBox)
    private skin_edit: cc.EditBox = null;

    @property(cc.EditBox)
    private animation_edit: cc.EditBox = null;

    @property(cc.EditBox)
    private time_scale_edit: cc.EditBox = null;

    @property(cc.Toggle)
    private loop_tog: cc.Toggle = null;

    @property(cc.Label)
    private duration_lbl: cc.Label = null;

    @property(cc.Label)
    private current_time_lbl: cc.Label = null;

    @property(cc.Slider)
    private timeline_sld: cc.Slider = null;

    @property(cc.Node)
    private spine_node: cc.Node = null;

    @property(cc.Node)
    private flag_node: cc.Node = null;

    @property(cc.EditBox)
    private flag_edit: cc.EditBox = null;

    @property(cc.Button)
    private load_btn: cc.Button = null;

    @property(cc.Button)
    private play_btn: cc.Button = null;

    @property(cc.Button)
    private pause_btn: cc.Button = null;

    @property(cc.Button)
    private resume_btn: cc.Button = null;

    private _spine: sp.Skeleton | null = null;
    private _spine_track: sp.spine.TrackEntry | null = null;

    protected onEnable(): void {
        this.flag_node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.flag_node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
    }

    protected onDisable(): void {
        this.flag_node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.flag_node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
    }

    private on_touch_move_handler(event: cc.Event.EventTouch): void {
        this.flag_node.position = this.flag_node.position.add(cc.v3(event.getDelta()));
        this.flag_edit.string = `${Math.floor(this.flag_node.x)},${Math.floor(this.flag_node.y)}`;
    }

    private on_touch_end_handler(): void {
        this.flag_edit.string = `${Math.floor(this.flag_node.x)},${Math.floor(this.flag_node.y)}`;
    }

    private on_editor_button_click_handler(event: cc.Event.EventTouch): void {
        const target = event.target;
        if (target == this.load_btn.node) {
            gm.pool.put_children(this.spine_node);
            if (this.spine_node.childrenCount == 0) {
                gm.pool.async_get(
                    this.bundle_name_edit.string.trim() as BundleName,
                    this.spine_url_edit.string.trim(),
                    NodePoolItem,
                    (item: NodePoolItem) => {
                        if (this.spine_node.childrenCount == 0) {
                            this.spine_node.addChild(item.node);
                            this._spine = item.getComponent(sp.Skeleton);
                            this.do_play();
                        } else {
                            gm.pool.put_children(this.spine_node);
                        }
                    }
                );
            }
        } else if (target == this.play_btn.node) {
            this.do_play();
        } else if (target == this.pause_btn.node && this._spine_track) {
            this._spine_track.timeScale = 0;
        } else if (target == this.resume_btn.node && this._spine_track) {
            this._spine_track.timeScale = 1;
        }
    }

    private do_play(): void {
        if (!this._spine) return;
        cc.director.getScheduler().setTimeScale(gm.const.FIGHT_SPEED_X2);
        const animationName = this.animation_edit.string.trim();
        this._spine.setSkin(this.skin_edit.string.trim());
        this._spine.timeScale = parseInt(this.time_scale_edit.string.trim());
        this._spine_track = this._spine.setAnimation(0, animationName, this.loop_tog.isChecked);
        this.duration_lbl.string = `${this._spine_track.animation.duration.toFixed(2)}s`;
        this.timeline_sld.progress = 0;
        this.current_time_lbl.string = "0s";
    }

    private move_to_time(time: number): void {
        if (this._spine_track) {
            this._spine_track.timeScale = 0;
            this._spine_track.trackTime = time;
        }
    }

    private on_slide_change_handler(): void {
        if (this._spine_track) {
            const time = this.timeline_sld.progress * this._spine_track.animation.duration;
            this.move_to_time(time);
            this.current_time_lbl.string = `${time.toFixed(2)}s`;
        }
    }

    private stopAtFrame(frame: number): void {
        const currentTrackEntry = this._spine.getCurrent(0);
        let time: number = frame == -1 ? currentTrackEntry.animation.duration : (frame - 1) / 30;
        time = time < 0 ? 0 : time;
        if (time >= currentTrackEntry.animation.duration) {
            time = currentTrackEntry.animation.duration - 0.01;
        }
        currentTrackEntry.timeScale = 0;
        currentTrackEntry.trackTime = time;
    }
}
