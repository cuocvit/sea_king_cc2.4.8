const { ccclass, property } = cc._decorator;

@ccclass
class TreeItem extends cc.Component {
    @property(cc.Label)
    private lblTxt: cc.Label | null = null;

    private _mapIndex: number[][] = Array.from({ length: 21 }, () => []);

    public initData(t: any, e: number): void {
        this.lblTxt.string = `${e}`;
        cc.loader.loadRes(`texture/Res/item${e + 1}`, cc.SpriteFrame, (err: Error | null, spriteFrame: cc.SpriteFrame | null) => {
            if (!err) {
                this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
    }

    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            this.node.y += event.getDelta().y;
            this.node.x += event.getDelta().x;
        }, this);
    }

    protected onDisable(): void {
        this.node.targetOff(this);
    }

    private onClickDel(): void {
        if (this.node) {
            this.node.removeFromParent();
            this.node.destroy();
        }
    }
}

export default TreeItem;