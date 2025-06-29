// +-+
import { BuildTypeEnum } from './Constants';
import { gm } from './GameManager';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
class LockCloudArea extends NodePoolItem {
    @property(cc.Node)
    private barNode: cc.Node | null = null;

    @property(cc.Label)
    private buildTipsLbl: cc.Label | null = null;

    @property(cc.Node)
    private lockNode: cc.Node | null = null;

    @property(cc.Node)
    private rightNode: cc.Node | null = null;

    private curType: number = 0;
    private buildLvl: number = 0;

    public initType(type: number): void {
        this.curType = type;
    }

    protected onEnable(): void {
        gm.ui.on("unlock_cloud_refresh", this.playAnim, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.position = gm.const.localCloudAreaList[this.curType].pos;
        this.refreshPanel();
    }

    private playAnim(type: number): void {
        if (type == this.curType) {
            this.node.getComponent(cc.Animation).play();
        }
    }

    private playAnimEnd(): void {
        gm.pool.put(this.node);
    }

    public refreshPanel(): void {
        this.buildLvl = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE).buildLvl;
        this.barNode.width = Math.min(this.buildLvl / gm.const.localCloudAreaList[this.curType].lvl * 130, 130);
        this.lockNode.active = true;
        this.rightNode.active = false;

        if (this.buildLvl >= gm.const.localCloudAreaList[this.curType].lvl) {
            this.lockNode.active = false;
            this.rightNode.active = true;
        }

        this.buildTipsLbl.string = `Lâu đài cấp (${this.buildLvl}/${gm.const.localCloudAreaList[this.curType].lvl})`;
    }

    protected onDisable(): void {
        gm.ui.off("unlock_cloud_refresh", this.playAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
    }

    private onClickBuild(): void {
        gm.ui.set_module_args(gm.const.UNLOCKAREACLOUDOP.key, this.curType);
        gm.ui.async_show_module(gm.const.UNLOCKAREACLOUDOP);
    }
}

export default LockCloudArea;