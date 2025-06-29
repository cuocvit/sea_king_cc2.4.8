// +-+
const { ccclass, property } = cc._decorator;

@ccclass
export default class HandAnim extends cc.Component {
    protected onEnable(): void {
        this.node.children[0].getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, (t, e) => {
            if ("hand_open" == e.name) {
                this.node.children[0].getComponent(cc.Animation).play("hand_normal");
            }
        }, this);
        this.node.children[0].getComponent(cc.Animation).play("hand_open")
    }

    protected onDisable(): void {
        this.node.children[0].getComponent(cc.Animation).stop();
        this.node.children[0].getComponent(cc.Animation).targetOff(this)
    }

    public onStop(): void {
        this.node.children[0].getComponent(cc.Animation).play("hand_normal");
        this.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            this.node.children[0].getComponent(cc.Animation).stop()
        }, 0);
    }
}
