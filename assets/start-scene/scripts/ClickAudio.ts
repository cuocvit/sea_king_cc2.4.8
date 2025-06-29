// +-+
import { gm } from './GameManager';
import { GameObject } from './GameObject';

const { ccclass, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/ClickAudio")
export class ClickAudio extends GameObject {
    protected onLoad(): void {
        this.node.on("click", this.on_button_click_handler, this);
    }

    private on_button_click_handler(): void {
        gm.audio.play_effect("click");
    }
}