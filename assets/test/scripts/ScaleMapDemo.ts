const { ccclass, property } = cc._decorator;

@ccclass
class ScaleMapDemo extends cc.Component {
    @property(cc.Node)
    private mapContent: cc.Node | null = null;

    private startPos1: cc.Vec2 | null = null;
    private startPos2: cc.Vec2 | null = null;
    private pointsDis: number = 0;

    protected onEnable2(): void {
        console.count("onEnable");
        cc.macro.ENABLE_MULTI_TOUCH = true;
        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            const touches = event.getTouches();
            if (touches.length == 2) {
                this.startPos1 = this.node.convertToNodeSpaceAR(touches[0].getLocation());
                this.startPos2 = this.node.convertToNodeSpaceAR(touches[1].getLocation());
                this.pointsDis = this.startPos1.sub(this.startPos2).mag();
            }
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            const touches = event.getTouches();
            if (touches.length != 2) {
                this.mapContent.x += event.getDelta().x;
                this.mapContent.y += event.getDelta().y;
            } else {
                const pos1 = this.node.convertToNodeSpaceAR(touches[0].getLocation());
                const pos2 = this.node.convertToNodeSpaceAR(touches[1].getLocation());
                const currentDis = pos1.sub(pos2).mag();
                cc.warn(JSON.stringify(pos1));
                cc.warn(JSON.stringify(pos2));
                let scale = this.mapContent.scale;

                if (currentDis > this.pointsDis) {
                    this.pointsDis = currentDis;
                    scale += 0.05;
                } else if (currentDis < this.pointsDis) {
                    this.pointsDis = currentDis;
                    scale -= 0.05;
                } else {
                    console.warn("Scale unchanged");
                }

                scale = Math.min(Math.max(scale, 1), 2);
                console.log(`old_scale: ${this.mapContent.scale} new_scale: ${scale}`);
                if (this.mapContent.scale !== scale) {
                    this.mapContent.scale = scale;
                    this.mapContent.getContentSize();
                }
            }
        });
    }

    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
    }

    private on_touch_start(event: cc.Event.EventTouch): void {
        const touches = event.getTouches();
        if (touches.length == 2) {
            this.startPos1 = this.mapContent.convertToNodeSpaceAR(touches[0].getLocation());
            this.startPos2 = this.mapContent.convertToNodeSpaceAR(touches[1].getLocation());
            this.pointsDis = this.startPos1.sub(this.startPos2).mag();
        }
    }

    private on_touch_move(event: cc.Event.EventTouch): void {
        const touches = event.getTouches();
        if (touches.length != 2) {
            this.mapContent.x += event.getDelta().x;
            this.mapContent.y += event.getDelta().y;
        } else {
            const pos1 = this.mapContent.convertToNodeSpaceAR(touches[0].getLocation());
            const pos2 = this.mapContent.convertToNodeSpaceAR(touches[1].getLocation());
            const currentDis = pos1.sub(pos2).mag();
            cc.warn(JSON.stringify(pos1));
            cc.warn(JSON.stringify(pos2));
            let scale = this.mapContent.scale;

            if (currentDis > this.pointsDis) {
                scale += 0.05;
            } else if (currentDis < this.pointsDis) {
                scale -= 0.05;
            } else {
                console.warn("Scale unchanged");
            }

            scale = Math.min(Math.max(scale, 1), 2);
            console.log(`old_scale: ${this.mapContent.scale} new_scale: ${scale}`);
            if (this.mapContent.scale != scale) {
                this.mapContent.scale = scale;
                this.mapContent.getContentSize();
            }
        }
    }

    protected onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
    }
}

export { ScaleMapDemo };