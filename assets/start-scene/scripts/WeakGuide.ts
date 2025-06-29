// @
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';
import { TempData } from './TempData';

const { ccclass, property } = cc._decorator;

// @
export enum Direction {
    LEFT = -1,
    RIGHT = 1
}

// @
interface Data {
    tip_content: string;
    tip_offset: cc.Vec3;
    dir: number;
    disappear_time: number;
    target?: cc.Node;
    callback?: () => void;
}

//
@ccclass
export class WeakGuide extends NodePoolItem {
    //
    @property(cc.Animation)
    private finger_anim: cc.Animation | null = null; // (public mode not used)

    @property(cc.Node)
    private tip_node: cc.Node | null = null;

    @property(cc.RichText)
    private tip_txt: cc.RichText | null = null;

    // @
    private _data: Data | null = null;

    // @
    public get data(): Data | null {
        return this._data;
    }

    // @
    public set data(value: Data) {
        this._data = value;
        this.update_view();
    }

    // @ !!!
    private update_view(): void {
        TempData.task_have_hand = true;
        if (this._data && this._data.tip_content !== "") {
            this.tip_node.active = true;
            this.tip_node.position = this._data.tip_offset;
            this.tip_txt.string = this._data.tip_content;
            this.tip_node.scaleX = this._data.dir;
            this.tip_txt.node.scaleX = this._data.dir;
        } else {
            this.tip_node.active = false;
        }
        //
        if (this._data && this._data.disappear_time > 0) {
            this.scheduleOnce(() => {
                gm.pool.put(this.node);
            }, this._data.disappear_time);
        }
        //
        if (this._data && this._data.target) {
            const button = this._data.target.getComponent(cc.Button);
            const toggle = this._data.target.getComponent(cc.Toggle);
            if (button) {
                this._data.target.on("click", this.on_click_or_touch_start_handler, this);
            } else if (toggle) {
                this._data.target.on("toggle", this.on_click_or_touch_start_handler, this);
            } else {
                this._data.target.on(cc.Node.EventType.TOUCH_START, this.on_click_or_touch_start_handler, this);
            }
        }
    } // end: update_view

    // @
    public unuse(): void {
        super.unuse();
        if (this._data && this._data.target) {
            this._data.target.off("click", this.on_click_or_touch_start_handler, this);
            this._data.target.off("toggle", this.on_click_or_touch_start_handler, this);
            this._data.target.off(cc.Node.EventType.TOUCH_START, this.on_click_or_touch_start_handler, this);
            this._data = null;
        }
        this.unscheduleAllCallbacks(); // (cc.Component method)
    }

    // @
    private on_click_or_touch_start_handler(): void {
        TempData.task_have_hand = false;
        if (this._data && this._data.callback) {
            this._data.callback();
        }
        gm.pool.put(this.node);
    }
}
