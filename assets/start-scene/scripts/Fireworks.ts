//
import { gm } from "./GameManager";
const { ccclass, property } = cc._decorator;

@ccclass
class Fireworks extends cc.Component {
    protected onEnable(): void {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, () => {
            gm.ui.async_hide_module(gm.const.FIREWORKS);
        }, this);
        this.node.getComponent(cc.Animation).play();
    }
}

export default Fireworks;