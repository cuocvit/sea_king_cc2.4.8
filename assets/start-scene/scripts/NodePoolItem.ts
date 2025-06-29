// @
import { GameObject } from "./GameObject";
import { BundleName } from "./Constants";

const { ccclass, menu, disallowMultiple } = cc._decorator;

@ccclass
@menu('Adding custom components/NodePoolItem')
@disallowMultiple
export class NodePoolItem extends GameObject {
    public __can_reuse: boolean = true;
    public is_can_use: boolean = true;
    public load_url: string = "";
    public bundle_name: BundleName; // tvt bổ sung

    constructor() {
        super();
    }

    // @
    public destroy() {
        const t = super.destroy();
        if (this.__can_reuse) {
            this.unuse();
        } else if (this.node && this.node.isValid) {
            this.node.destroy();
        }
        return t;
    }

    // @
    public reuse() {
        this.node.position = cc.Vec3.ZERO;
        this.node.scale = 1;
        this.node.angle = 0;
        this.node.opacity = 255;
        this.node.zIndex = 0;
        this.is_can_use = true;
    }

    // @
    public unuse() {
        this.is_can_use = false;
    }
}
