import { gm } from '../../start-scene/scripts/GameManager';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { LadderLVConfig } from '../../common/configs/ladder_lv';

const { ccclass, property } = cc._decorator;

@ccclass
class LadderUpLvlAnimPVP extends cc.Component {
    @property(cc.Node)
    private succ_title: cc.Node | null = null;

    @property(cc.Node)
    private fail_title: cc.Node | null = null;

    @property(cc.Sprite)
    private lvl_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private lvl_name: cc.Label | null = null;

    @property(cc.Label)
    private star_lbl: cc.Label | null = null;

    protected onEnable(): void {
        this.refreshPanel();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private refreshPanel(): void {
        const isSuccess = gm.ui.get_module_args(gm.const.LADDERUPLVLANIMPVP.key) as boolean;
        this.succ_title.active = isSuccess;
        this.fail_title.active = !isSuccess;

        const ladderData = gm.data.ladder_temp_data;
        const rankLevel = gm.data.ladder_temp_data.convert_rank_to_lv(ladderData.rank);
        const ladderConfig = gm.config.get_row_data("LadderLvConfigData", rankLevel + "") as LadderLVConfig;

        Utils.async_set_sprite_frame(this.lvl_spr, BundleName.LADDER, "res/" + ladderConfig.icon_id);
        this.star_lbl.string = ladderData.total_star + "";
        this.lvl_name.string = ladderConfig.name + "";
    }

    private onClosePanel(): void {
        gm.ui.async_hide_module(gm.const.LADDERUPLVLANIMPVP);
    }
}