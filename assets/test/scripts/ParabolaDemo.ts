const { ccclass, property } = cc._decorator;

@ccclass
class ParabolaDemo extends cc.Component {
    @property(cc.Node)
    private target_node: cc.Node = null;

    @property(cc.Node)
    private start_node: cc.Node = null;

    @property(cc.Node)
    private end_node: cc.Node = null;

    private time: number = 3;
    private g: number = -10;
    private dTime: number = 0;
    private last_position: cc.Vec3 = cc.Vec3.ZERO;
    private speed: cc.Vec3 = cc.Vec3.ZERO;
    private Gravity: cc.Vec3 = cc.Vec3.ZERO;

    public start(): void {
        this.target_node.position = this.start_node.position;
        this.last_position = this.start_node.position;
        this.speed = new cc.Vec3(
            (this.end_node.position.x - this.start_node.position.x) / this.time,
            (this.end_node.position.y - this.start_node.position.y) / this.time - 0.5 * this.g * this.time,
            (this.end_node.position.z - this.start_node.position.z) / this.time
        );
        this.Gravity = cc.Vec3.ZERO;
    }

    public update(deltaTime: number): void {
        if (this.dTime < this.time) {
            this.Gravity.y = this.g * (this.dTime += deltaTime);
            this.target_node.position = this.speed.multiplyScalar(deltaTime).add(this.target_node.position);
            this.target_node.position = this.Gravity.multiplyScalar(deltaTime).add(this.target_node.position);
            let deltaPosition = this.target_node.position.subtract(this.last_position);
            let angle = Math.atan2(deltaPosition.y, deltaPosition.x);
            this.target_node.angle = 180 * angle / Math.PI;
        }
    }
}
