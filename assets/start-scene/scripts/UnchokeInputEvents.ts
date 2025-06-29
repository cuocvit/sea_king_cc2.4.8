const { ccclass, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/UnchokeInputEvents")
class UnchokeInputEvents extends cc.Component {
    private _isSwallow: boolean;

    constructor() {
        super();
        this._isSwallow = false;
    }

    protected onEnable(): void {
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(this._isSwallow);
        }
    }
}

export default UnchokeInputEvents;