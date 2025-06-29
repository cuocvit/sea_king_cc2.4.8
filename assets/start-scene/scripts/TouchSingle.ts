// *-*
const { ccclass, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/TouchSingle")
export class TouchSingle extends cc.Component {
    private _touchID: number | null;

    constructor() {
        super();
        this._touchID = null;
    }

    private _touchStart(event: cc.Event.EventTouch): void {
        if (this._touchID != null) {
            event.stopPropagation();
        } else {
            this._touchID = event.getID();
        }
    }

    private _touchMove(event: cc.Event.EventTouch): void {
        if (this._touchID != event.getID()) {
            event.stopPropagation();
        }
    }

    private _touchEnd(event: cc.Event.EventTouch): void {
        if (this._touchID != event.getID()) {
            event.stopPropagation();
        } else if (!event.simulate) {
            this._touchID = null;
        }
    }

    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStart, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this, true);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEnd, this, true);
    }

   protected onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this._touchStart, this, true);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this, true);
        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEnd, this, true);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEnd, this, true);
    }
}