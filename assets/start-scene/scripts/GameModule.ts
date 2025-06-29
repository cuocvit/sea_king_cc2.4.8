// +-+
import { GameObject } from "./GameObject";

const { ccclass/* , property */ } = cc._decorator;

@ccclass
export  class GameModule extends GameObject {
    private is_play_effect: boolean = false;
}
