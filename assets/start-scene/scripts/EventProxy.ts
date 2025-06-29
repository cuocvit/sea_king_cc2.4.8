import { GameObject } from "./GameObject";
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/EventProxy")
export class EventProxy extends GameObject {
    @property([cc.Component.EventHandler])
    private event_array: cc.Component.EventHandler[] = [];

    private on_event_proxy_handler(...args: any[]) {
        cc.Component.EventHandler.emitEvents.apply(this, [this.event_array, ...args]);
    }
}