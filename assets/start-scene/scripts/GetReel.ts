// +-+
import { GameModule } from './GameModule';
import { BuildTypeEnum } from './Constants';
import { gm } from './GameManager';
import MainMapItem from './MainMapItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class GetReel extends GameModule {
    @property(cc.Animation)
    private reel_anim: cc.Animation | null = null;

    @property(cc.Node)
    private reel_node: cc.Node | null = null;

    private isShowBarrackList: boolean = true;

    protected onEnable(): void {
        this.isShowBarrackList = !!gm.ui.get_module_args(gm.const.GetReel.key);
        this.reel_anim.on(cc.Animation.EventType.FINISHED, this.on_anim_finished, this);
        this.reel_anim.play();
    }

    protected onDisable(): void { }

    private on_anim_finished(): void {
        const self = this;
        this.reel_anim?.off(cc.Animation.EventType.FINISHED, this.on_anim_finished, this);
        const reelInstance = cc.instantiate(this.reel_node);
        reelInstance.active = true;
        reelInstance.scale = 1;
        reelInstance.angle = 0;
        let isHidden: boolean = !(reelInstance.opacity = 255);
        const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.BARRACKS_TYPE);

        if (buildData) {
            const mapChild = gm.ui.mapMainUI.mapContent.getChildByName(buildData.cellID.toString());
            if (mapChild) {
                const mapBuildNode = mapChild.getComponent(MainMapItem)?.mapBuildNode;
                if (mapBuildNode) {
                    let worldPosition = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    worldPosition = gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(worldPosition);
                    reelInstance.position = cc.v3(worldPosition);
                    gm.ui.mapMainUI.mapContent.addChild(reelInstance, 10000);
                    isHidden = true;
                    let buildWorldPosition = mapBuildNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    buildWorldPosition = gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(buildWorldPosition);
                    cc.tween(reelInstance)
                        .bezierTo(1, worldPosition, cc.v2(worldPosition.x, worldPosition.y + 100), cc.v2(buildWorldPosition))
                        .call(() => {
                            reelInstance?.destroy();
                            gm.ui.async_hide_module(gm.const.GetReel);
                            self.isShowBarrackList;
                        })
                        .start();
                }
            }
        }
        if (!isHidden) {
            gm.ui.async_hide_module(gm.const.GetReel);
        }
    }
}