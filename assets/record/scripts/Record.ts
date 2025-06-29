import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { SetItemNumEnum, RewardIdEnum } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class Record extends GameModule {
    @property(cc.Label)
    private count_lbl: cc.Label = null;

    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private record_btn: cc.Button = null;

    @property(cc.Button)
    private share_record_btn: cc.Button = null;

    private _reward_data: { value: number };

    protected onEnable(): void {
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
        if (gm.data.record_data.share_record_count < gm.data.record_data.reward_array.length) {
            this._reward_data = gm.data.record_data.reward_array[gm.data.record_data.share_record_count];
        } else {
            this._reward_data = gm.data.record_data.reward_data;
        }

        if (5 <= gm.data.record_data.share_record_count) {
            this._reward_data.value = 0;
        }

        this.count_lbl.string = "+" + this._reward_data.value;
        this.record_btn.node.active = 0 == gm.data.record_data.record_state;
        this.share_record_btn.node.active = 2 == gm.data.record_data.record_state;
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
        if (1 == gm.data.record_data.record_type && 2 == gm.data.record_data.record_state) {
            gm.data.record_data.record_state = 0;
            gm.data.record_data.record_timestamp = 0;
            gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
            gm.data.record_data.async_write_data();
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node) {
            gm.ui.async_hide_module(gm.const.Record);

        } else if (event.target == this.record_btn.node) {
            gm.channel.record_start();
            gm.data.record_data.record_state = 1;
            gm.data.record_data.record_type = 1;
            gm.data.record_data.record_timestamp = Date.now();
            gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
            gm.ui.async_hide_module(gm.const.Record);

        } else if (event.target == this.share_record_btn.node) {
            gm.channel.viedo_share(true, (result: number) => {
                if (this._reward_data && 0 == result) {
                    gm.ui.async_hide_module(gm.const.Record);
                    gm.data.record_data.share_record_count++;
                    gm.data.record_data.record_state = 0;
                    gm.data.record_data.record_timestamp = 0;
                    gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
                    gm.data.record_data.async_write_data();
                    gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, this._reward_data.value);
                    gm.ui.show_coin_fly(RewardIdEnum.GOLD, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
            });
        }
    }
}
