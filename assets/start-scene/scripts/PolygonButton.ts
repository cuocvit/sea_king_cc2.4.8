const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("添加自定义组件/PolygonButton")
export class PolygonButton extends cc.Button {
    @property(cc.PolygonCollider)
    private polygon: cc.PolygonCollider | null = null;

    private time: number;
    private _transitionFinished: boolean;
    private _fromScale: cc.Vec2;
    private _toScale: cc.Vec2;
    private _pressed: boolean;
    private _originalScale: cc.Vec2

    protected onLoad(): void {
        if (this.polygon && this.polygon.points.length > 0) {
            this.node._hitTest = this._hitTest.bind(this);
        }
    }

    private _onTouchMove(event: cc.Event.EventTouch): void {
        if (this.interactable && this.enabledInHierarchy && this._pressed) {
            const touch = (event).touch;
            const isHit = this.node._hitTest(touch.getLocation(), this.node._touchListener);
            const target = this._getTarget();
            const originalScale = this._originalScale;

            if (this.transition === cc.Button.Transition.SCALE && originalScale) {
                if (isHit) {
                    this._fromScale.x = originalScale.x;
                    this._fromScale.y = originalScale.y;
                    this._toScale.x = originalScale.x * this.zoomScale;
                    this._toScale.y = originalScale.y * this.zoomScale;
                    this._transitionFinished = false;
                } else {
                    this.time = 0;
                    this._transitionFinished = true;
                    target.setScale(originalScale.x, originalScale.y);
                }
            } else {
                this._applyTransition(isHit ? 'pressed' : 'normal');
            }

            event.stopPropagation();
        }
    }

    private _hitTest(location: cc.Vec2, listener: { owner: cc.Node, swallowTouches: boolean }): boolean {
        if (null != location && null != listener) {
            const owner = listener.owner;
            const Polygon = owner.getComponent(PolygonButton);
            const ischeck = Polygon.pointInPolygon(owner.convertToNodeSpaceAR(location), Polygon.polygon.points);
            return listener.swallowTouches = ischeck;
        }
    }

    private pointInPolygon(point: cc.Vec2, polygonPoints: cc.Vec2[]): boolean {
        let isInside = false;
        const x = point.x, y = point.y;
        const n = polygonPoints.length;

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = polygonPoints[i].x, yi = polygonPoints[i].y;
            const xj = polygonPoints[j].x, yj = polygonPoints[j].y;

            const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) isInside = !isInside;
        }

        return isInside;
    }

    private _applyTransition(param: string): void { }
    private _getTarget(): cc.Node {
        return;
    };
}
