import { Arrow } from './Arrow';
import { ParabolaPath } from '../../start-scene/scripts/ParabolaPath';

const { ccclass, property } = cc._decorator;

enum PathType {
    LEFT_PARABOL = 0,
    LINE = 1
}

@ccclass
class ParabolaDemo2 extends cc.Component {
    @property(Arrow)
    private arrow: Arrow | null = null;

    @property(cc.Node)
    private start_node: cc.Node | null = null;

    @property(cc.Node)
    private end_node: cc.Node | null = null;

    @property(cc.Node)
    private target_node: cc.Node | null = null;

    @property(cc.Graphics)
    private graph: cc.Graphics | null = null;

    private path: ParabolaPath | null = null;
    private path_array: { time: number; position: cc.Vec3; angle: number }[] = [];

    public start(): void { }

    protected onEnable(): void { }

    private draw(): void {
        this.graph.clear();
        for (let i = 0; i < this.path_array.length; i++) {
            const curPos = this.path_array[i];
            this.graph.circle(curPos.position.x, curPos.position.y, 10);
        }
        this.graph.fill();
        this.graph.stroke();
    }

    private generate_path(): void {
        this.path = new ParabolaPath(this.start_node?.position, this.end_node?.position, 16, -9.8);
        this.path.isClampStartEnd = true;
        this.path_array = [];
        this.target_node.position = this.start_node.position;

        const position = this.path.getPosition(this.path.time + 1).sub(this.target_node.position);
        this.target_node.angle = (180 * Math.atan2(position.y, position.x)) / Math.PI;

        this.path_array.push({
            time: this.path.time,
            position: this.target_node.position,
            angle: this.target_node.angle
        });

        while (this.path.time < this.path.totalTime) {
            this.generate_pos(1);
            this.path_array.push({
                time: this.path.time,
                position: this.target_node.position,
                angle: this.target_node.angle
            });
        }

        console.log(this.path_array);
        this.draw();
    }

    private generate_pos(num: number): void {
        this.path.time += num;
        this.target_node.position = new cc.Vec3(this.path.position.x, this.path.position.y);
        const delta = this.path.getPosition(this.path.time + num).sub(this.target_node.position);
        this.target_node.angle = (180 * Math.atan2(delta.y, delta.x)) / Math.PI;
    }
}

