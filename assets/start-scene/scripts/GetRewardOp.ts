// +-+
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName } from './Constants';
import { DoubleOp } from './GetDoubleRewardOp';

const { ccclass, property } = cc._decorator;

@ccclass
class GetRewardOp extends cc.Component {
    @property([cc.Node])
    private photoList: cc.Node[] = [];

    private idList: number[] = [];
    private numList: number[] = [];

    protected onEnable(): void {
        const moduleArgs = gm.ui.get_module_args(gm.const.GETREWARDOP.key) as DoubleOp;
        this.idList = moduleArgs.idList;
        this.numList = moduleArgs.numList;
        this.node.opacity = 255;

        for (let i = 0; i < this.photoList.length; i++) {
            this.photoList[i].active = false;
            if (this.idList.length > i) {
                this.photoList[i].active = true;
                let config;
                if (this.idList[i] > 30000) {
                    config = gm.data.config_data.getHeroCfgByID(this.idList[i]);
                    if (config) {
                        Utils.async_set_sprite_frame(this.photoList[i].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + config.lv);
                        Utils.async_set_sprite_frame(this.photoList[i].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + config.icon);
                    }
                } else {
                    config = gm.data.config_data.getItemCfgByID(this.idList[i]);
                    if (config) {
                        Utils.async_set_sprite_frame(this.photoList[i].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + (config.lv === 0 ? 1 : config.lv));
                        if ([11002, 11003, 11006].includes(config.id)) {
                            Utils.async_set_sprite_frame(this.photoList[i].children[1].getComponent(cc.Sprite), BundleName.MAP, "res/rewardIcon/" + config.icon);
                        } else {
                            Utils.async_set_sprite_frame(this.photoList[i].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + config.icon);
                        }
                    }
                }
                this.photoList[i].children[2].getComponent(cc.Label).string = "x" + this.numList[i];
            }
        }

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(() => {
            this.node.stopAllActions();
            gm.ui.async_hide_module(gm.const.GETREWARDOP);
        })));
    }

    private onClosePanel(): void {
        this.node.stopAllActions();
        gm.ui.async_hide_module(gm.const.GETREWARDOP);
    }
}

export default GetRewardOp;