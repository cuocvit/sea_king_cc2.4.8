class ParabolaPath {
    private m_start: cc.Vec3;
    private m_end: cc.Vec3;
    private m_height: number;
    private m_gravity: number;
    private m_upTime: number;
    private m_downTime: number;
    private m_totalTime: number;
    private m_velocityStart: cc.Vec3;
    private m_position: cc.Vec3;
    private m_time: number;
    public isClampStartEnd: boolean = false;

    constructor(startPoint: cc.Vec3, endPoint: cc.Vec3, height: number, gravity: number = -9.8) {
        this.init(startPoint, endPoint, height, gravity);
    }

    private init(startPoint: cc.Vec3, endPoint: cc.Vec3, height: number = 10, gravity: number = -9.8): void {
        let peakY: number = Math.max(startPoint.y, endPoint.y) + height;
        const startHeight: number = peakY - startPoint.y;
        const endHeight: number = peakY - endPoint.y;
        const gravityFactor: number = 2 / -gravity;
        const upTime: number = Math.sqrt(gravityFactor * startHeight);
        const downTime: number = Math.sqrt(gravityFactor * endHeight);
        const horizontalVelocityX: number = (endPoint.x - startPoint.x) / (peakY = upTime + downTime);
        const horizontalVelocityZ: number = (endPoint.z - startPoint.z) / peakY;
        const verticalVelocity: number = -gravity * upTime;

        this.m_start = startPoint;
        this.m_end = endPoint;
        this.m_height = height;
        this.m_gravity = gravity;
        this.m_upTime = upTime;
        this.m_downTime = downTime;
        this.m_totalTime = peakY;
        this.m_velocityStart = new cc.Vec3(horizontalVelocityX, verticalVelocity, horizontalVelocityZ);
        this.m_position = this.m_start;
        this.m_time = 0;
    }

    public get start(): cc.Vec3 {
        return this.m_start;
    }

    public get end(): cc.Vec3 {
        return this.m_end;
    }

    public get height(): number {
        return this.m_height;
    }

    public get gravity(): number {
        return this.m_gravity;
    }

    public get upTime(): number {
        return this.m_upTime;
    }

    public get downTime(): number {
        return this.m_downTime;
    }

    public get totalTime(): number {
        return this.m_totalTime;
    }

    public get top(): cc.Vec3 {
        return this.getPosition(this.m_upTime);
    }

    public get velocityStart(): cc.Vec3 {
        return this.m_velocityStart;
    }

    public get position(): cc.Vec3 {
        return this.m_position;
    }

    public get velocity(): cc.Vec3 {
        return this.getVelocity(this.m_time);
    }

    public get time(): number {
        return this.m_time;
    }

    public set time(num: number) {
        if (this.isClampStartEnd) {
            num = cc.misc.clampf(num, 0, this.m_totalTime);
        }
        this.m_time = num;
        this.m_position = this.getPosition(num);
    }

    public getPosition(time: number): cc.Vec3 {
        if (time === 0) return this.m_start;
        if (time === this.m_totalTime) return this.m_end;
        const displacementY: number = 0.5 * this.m_gravity * time * time;
        return this.m_start.add(this.m_velocityStart.clone().multiplyScalar(time)).add(new cc.Vec3(0, displacementY, 0));
    }

    private getVelocity(time: number): cc.Vec3 {
        return time === 0 ? this.m_velocityStart : this.m_velocityStart.add(new cc.Vec3(0, this.m_velocityStart.y + this.m_gravity * time, 0));
    }
}

export { ParabolaPath };