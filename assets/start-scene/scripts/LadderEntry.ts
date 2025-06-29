// +-+
import { NodePoolItem } from './NodePoolItem';
import { ServerData } from './ServerData';
import { gm } from './GameManager';
import { Utils } from './Utils';
import { BundleName, BuildTypeEnum } from './Constants';
import { LadderRewardConfig } from '../../common/configs/ladder_reward';

const { ccclass, property } = cc._decorator;

@ccclass
class LadderEntry extends NodePoolItem {
    @property(cc.Sprite)
    private lv_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private star_lbl: cc.Label | null = null;

    @property(cc.Label)
    private rank_lbl: cc.Label | null = null;

    @property(cc.Button)
    private entry_btn: cc.Button | null = null;

    protected onEnable(): void {
        gm.data.event_emitter.on("ladder_star_change", this.update_view, this);
        gm.data.event_emitter.on("ladder_achievement_upgrade", this.play_ladder_achievement_upgrade, this);
        gm.data.event_emitter.on("ladder_upgrade", this.on_ladder_upgrade, this);
        gm.data.event_emitter.on("ladder_demotion", this.on_ladder_demotion, this);
        gm.data.event_emitter.on(ServerData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off("ladder_star_change", this.update_view, this);
        gm.data.event_emitter.off("ladder_achievement_upgrade", this.play_ladder_achievement_upgrade, this);
        gm.data.event_emitter.off("ladder_upgrade", this.on_ladder_upgrade, this);
        gm.data.event_emitter.off("ladder_demotion", this.on_ladder_demotion, this);
        gm.data.event_emitter.off(ServerData.EVENT_DATA_CHANGE, this.update_view, this);
    }

    private on_ladder_upgrade(): void {
        cc.log("on_ladder_upgrade");
        gm.ui.set_module_args(gm.const.LADDERUPLVLANIMPVP.key, true);
        gm.ui.async_show_module(gm.const.LADDERUPLVLANIMPVP);
    }

    private on_ladder_demotion(): void {
        cc.log("on_ladder_demotion");
        gm.ui.set_module_args(gm.const.LADDERUPLVLANIMPVP.key, false);
        gm.ui.async_show_module(gm.const.LADDERUPLVLANIMPVP);
    }

    private play_ladder_achievement_upgrade(): void {
        gm.ui.async_show_module(gm.const.LADDERUPLVLANIM);
    }

    private update_view(): void {
        const ladderTempData = gm.data.ladder_temp_data;
        const rankLevel = ladderTempData.convert_rank_to_lv(ladderTempData.rank);
        const rowData = gm.config.get_row_data("LadderRewardConfigData", rankLevel.toString()) as LadderRewardConfig;

        if (rowData) {
            Utils.async_set_sprite_frame(this.lv_spr, BundleName.LADDER, "res/" + rowData.iconId);
        }

        this.star_lbl.string = ladderTempData.total_star.toString();
        this.rank_lbl.string = ladderTempData.rank > 0 ? "Xếp hạng:" + ladderTempData.rank : "Xếp hạng:200+";
    }

    private reset(): void {
        this.lv_spr.spriteFrame = null;
        this.star_lbl.string = "";
        this.rank_lbl.string = "";
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.entry_btn.node) {
            const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE)
            if (!buildData || buildData.buildLvl < 1) {
                gm.ui.show_notice("Điều kiện mở Liên Minh Hải Vương: Quân đồn trú đạt cấp 1");
            } else {
                gm.ui.show_panel(gm.const.Ladder);
            }
        }
    }
}

export { LadderEntry };