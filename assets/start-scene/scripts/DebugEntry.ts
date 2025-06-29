// *-*
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
class DebugEntry extends NodePoolItem {
    private _touch_start_position: cc.Vec3;
    private _touch_start_timestamp: number;

    constructor() {
        super();
        this._touch_start_position = cc.Vec3.ZERO;
        this._touch_start_timestamp = 0;
    }

    protected onLoad(): void {
        gm.data.catch_error_log();
    }

    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start_handler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    }

    protected onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start_handler, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    }

    private on_touch_move_handler(event: cc.Touch | cc.Event.EventMouse): void {
        this.node.y += event.getDelta().y;
        this.node.x += event.getDelta().x;
    }

    private on_touch_start_handler(): void {
        this._touch_start_position = this.node.position;
        this._touch_start_timestamp = Date.now();
    }

    private on_touch_end_handler(): void {
        if (Date.now() - this._touch_start_timestamp < 200) {
            gm.ui.show_panel(gm.const.Debug);
        }
    }
}

export default DebugEntry;