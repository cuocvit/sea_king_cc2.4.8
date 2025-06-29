import { ChannelManager } from '../../start-scene/scripts/ChannelManager';
import { BundleName, BuildTypeEnum } from '../../start-scene/scripts/Constants';
import { FightConstants } from '../../start-scene/scripts/FightConstants';
import { RecordData } from '../../start-scene/scripts/RecordData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { LadderBuildding } from '../../common/configs/ladder_building';
import { LadderLVConfig } from '../../common/configs/ladder_lv';

const { ccclass, property } = cc._decorator;

@ccclass
class FightResult extends GameModule {
    @property(cc.Node)
    private mask_node: cc.Node = null;

    @property(cc.Label)
    private star_lbl: cc.Label = null;

    @property(cc.Label)
    private gold_lbl: cc.Label = null;

    @property(cc.Label)
    private bucket_lbl: cc.Label = null;

    @property(ListView)
    private prop_list: ListView = null;

    @property(ListView)
    private death_hero_list: ListView = null;

    @property(cc.Button)
    private home_btn: cc.Button = null;

    @property(cc.Button)
    private watch_ad_btn: cc.Button = null;

    @property(cc.Sprite)
    private cur_ladder_lv_spr: cc.Sprite = null;

    @property(cc.Label)
    private cur_star_lbl: cc.Label = null;

    @property(cc.Node)
    private hand_node: cc.Node = null;

    private CURTIMES: number = 2;

    protected onEnable(): void {
        if (gm.data.record_data.record_type == 0) {
            gm.channel.record_stop(false);
        }
        this.mask_node.color = FightConstants.SEA_AREA_COLOR_ARRAY[gm.data.fight_temp_data.play_type];
        this.update_view();
        if (!gm.data.mapCell_data.isGuide &&
            gm.channel.get_channel_name() == ChannelManager.TT_GAME &&
            gm.data.record_data.record_type == 0 &&
            gm.data.record_data.left_push_share_count > 0
        ) {
            gm.ui.show_panel(gm.const.RecordShare);
        }
    }

    protected onDisable(): void {
        this.prop_list.reset();
        this.death_hero_list.reset();
        if (gm.data.record_data.record_type == 0) {
            gm.data.record_data.record_state = 0;
            gm.data.record_data.record_timestamp = 0;
            gm.data.event_emitter.emit(RecordData.RECORD_STATE_CHANGE);
            gm.data.record_data.async_write_data();
        }
    }

    private update_view(): void {
        const fightResultData = gm.data.fight_temp_data.fight_result_data;
        this.gold_lbl.string = "X" + fightResultData.gold_num;
        this.bucket_lbl.string = "X" + fightResultData.bucket_num;
        this.prop_list.setData(fightResultData.prop_data_array);
        this.death_hero_list.setData(fightResultData.death_hero_data_array);

        const rank = gm.data.ladder_temp_data.convert_rank_to_lv(gm.data.ladder_temp_data.rank);
        const ladderData = gm.config.get_row_data("LadderLvConfigData", rank.toString()) as LadderLVConfig;
        Utils.async_set_sprite_frame(this.cur_ladder_lv_spr, BundleName.LADDER, "res/" + ladderData.icon_id);

        let starChange = 0;
        if (fightResultData.result == 1) {
            this.star_lbl.node.color = cc.Color.GREEN;
            starChange = fightResultData.star_num;
            this.star_lbl.string = "+ " + fightResultData.star_num;
        } else {
            this.star_lbl.node.color = cc.Color.RED;
            const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
            if (buildData && buildData.buildLvl >= 1) {
                this.star_lbl.string = "- " + ladderData.failed_star;
                starChange = -ladderData.failed_star;
            } else {
                this.star_lbl.string = "- 0";
                starChange = 0;
            }
        }
        this.cur_star_lbl.string = Math.max(0, gm.data.ladder_temp_data.total_star + starChange).toString();
        this.watch_ad_btn.node.active = !gm.data.mapCell_data.isGuide;
        this.hand_node.active = gm.data.mapCell_data.isGuide;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.home_btn.node) {
            gm.data.fight_temp_data.map_end_many_times = 1;
            gm.ui.async_hide_module(gm.const.FightResult);
            gm.ui.async_hide_module(gm.const.Fight);
            gm.ui.show_start();
            gm.channel.report_event("ohayoo_game_guide", {
                guideid: 17,
                guidedesc: cc.js.formatStr("17.点击结算界面的返航按钮")
            });
        } else if (event.target == this.watch_ad_btn.node) {
            gm.channel.show_video_ad(this.watch_ad_cb, this);
        }
    }

    private watch_ad_cb(): void {
        ReportData.instance.report_once_point(10829);
        ReportData.instance.report_point(10830);
        gm.ui.async_hide_module(gm.const.FightResult);
        gm.ui.async_hide_module(gm.const.Fight);
        gm.data.fight_temp_data.map_end_many_times = this.CURTIMES;
        gm.ui.show_start();
        gm.channel.report_event("ohayoo_game_guide", {
            guideid: 17,
            guidedesc: cc.js.formatStr("17.点击结算界面的返航按钮")
        });
    }
}