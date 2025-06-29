const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/HitTest")
export class HitTest extends cc.Component {
    @property([cc.Vec2])
    private polygon: cc.Vec2[] = [cc.Vec2.ZERO, cc.Vec2.ZERO, cc.Vec2.ZERO, cc.Vec2.ZERO];

    private _old_function: (point?: cc.Vec2, event?: any) => boolean;

    protected onEnable(): void {
        this._old_function = this.node._hitTest;
        this.node._hitTest = this._hit_test.bind(this);
    }

    protected onDisable(): void {
        this.node._hitTest = this._old_function;
    }

    private _hit_test(point: cc.Vec2, event: any): boolean {
        if (point != null && event != null) {
            const owner = event.owner;
            const component = owner.getComponent(HitTest);
            const isInside = this.point_in_polygon(owner.convertToNodeSpaceAR(point), component.polygon);
            event.swallowTouches = isInside;
            return isInside;
        }
        return false;
    }

    private point_in_polygon(point: cc.Vec2, polygon: cc.Vec2[]): boolean {
        let isInside = false;
        const pointX = point.x;
        const pointY = point.y;
        const polygonLength = polygon.length;

        for (let i = 0, j = polygonLength - 1; i < polygonLength; j = i++) {
            const xi = polygon[i].x;
            const yi = polygon[i].y;
            const xj = polygon[j].x;
            const yj = polygon[j].y;

            const intersect = (yi > pointY) !== (yj > pointY) && (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
            if (intersect) isInside = !isInside;
        }
        return isInside;
    }
}