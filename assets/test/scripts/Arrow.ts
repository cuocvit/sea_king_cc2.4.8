const { ccclass, property } = cc._decorator;

export enum WEAPON_FLY_TYPE {
    LEFT_PARABOL = 0,
    LINE = 1
}

@ccclass
export class Arrow extends cc.Component {
    private _g: number = -10;
    private _shotSpeed: number = 400;
    private _speed: cc.Vec3 | null = null;
    private _gravity: cc.Vec3 | null = null;
    private _currAngle: cc.Vec3 | null = null;
    private _dTime: number = 0;
    private _flyType: number = -1;
    private _dir: number = 1;
    private _isMoving: boolean = false;
    private startPos: cc.Vec3 | null = null;
    private endPos: cc.Vec3 | null = null;

    private static vec3: cc.Vec3 = new cc.Vec3();

    protected onLoad(): void {
        this._speed = new cc.Vec3();
        this._gravity = new cc.Vec3();
        this._currAngle = new cc.Vec3();
    }

    private launchWeapon(flyType: WEAPON_FLY_TYPE, startPos: cc.Vec3, endPos: cc.Vec3): void {
        this.startPos = startPos;
        this.endPos = endPos;
        this._flyType = flyType;
        this._dTime = 0;
        this.node.setPosition(this.startPos);
        cc.Vec3.subtract(Arrow.vec3, this.startPos, this.endPos);
        const travelTime = Arrow.vec3.mag() / this._shotSpeed;
        this._dir = this._flyType === WEAPON_FLY_TYPE.LEFT_PARABOL ? -1 : 1;
        let gravityOffsetY = 0;
        let gravityOffsetX = 0;

        if (this._flyType === WEAPON_FLY_TYPE.LINE) {
            gravityOffsetY = .5 * this._g * travelTime;
        } else {
            gravityOffsetX = .5 * this._g * travelTime * this._dir;
        }

        this._speed = new cc.Vec3(
            (this.endPos.x - this.startPos.x) / travelTime - gravityOffsetX,
            (this.endPos.y - this.startPos.y) / travelTime - gravityOffsetY,
            (this.endPos.z - this.startPos.z) / travelTime);
        cc.Vec3.zero(this._gravity);
        this._isMoving = true;
    }

    public update(deltaTime: number): void {
        if (this._isMoving) {
            if (this._flyType === WEAPON_FLY_TYPE.LINE) {
                this._gravity.y = this._g * (this._dTime += deltaTime);
            } else {
                this._gravity.x = this._g * (this._dTime += deltaTime * this._dir);
            }

            const currentPosition = this.node.position;
            cc.Vec3.add(Arrow.vec3, this._speed, this._gravity);
            cc.Vec3.multiplyScalar(Arrow.vec3, Arrow.vec3, deltaTime);
            cc.Vec3.add(currentPosition, currentPosition, Arrow.vec3);

            if (this._flyType === WEAPON_FLY_TYPE.LINE) {
                this._currAngle.x = 180 * Math.atan((this._speed.y + this._gravity.y) / this._speed.z) / Math.PI;
            } else {
                this._currAngle.y = 180 * Math.atan((this._speed.x + this._gravity.x) / this._speed.z) / Math.PI;
            }

            this.node.eulerAngles = this._currAngle;
            this.node.setPosition(currentPosition);
            cc.Vec3.subtract(Arrow.vec3, this.endPos, currentPosition);

            if (Arrow.vec3.mag() <= 0.3) {
                this.arriveTarget();
            }
        }
    }

    private arriveTarget(): void {
        this._isMoving = false;
        console.warn("达到终点～～～～～～～～～～～");
    }
}