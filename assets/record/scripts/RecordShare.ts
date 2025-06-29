import { RecordData } from '../../start-scene/scripts/RecordData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName, SetItemNumEnum, RewardIdEnum } from '../../start-scene/scripts/Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class RecordShare extends GameModule {
    @property(cc.Sprite)
    private bg_spr: cc.Sprite = null;

    @property(cc.Label)
    private count_lbl: cc.Label = null;

    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private share_record_btn: cc.Button = null;

    private _reward_data: { value: number } = null;

    protected onEnable(): void {
        this._reward_data = gm.data.record_data.push_share_reward_data;
        this.count_lbl.string = "+" + this._reward_data.value;
        this.share_record_btn.node.active = gm.data.record_data.left_push_share_count > 0;
        Utils.async_set_sprite_frame(this.bg_spr, BundleName.RECORD, "res/" + Utils.math_random(true, 1, 5));
    }

    protected onDisable(): void {
        gm.data.record_data.record_state = 0;
        gm.data.record_data.record_timestamp = 0;
        gm.data.event_emitter.emit(RecordData.RECORD_STATE_CHANGE);
        gm.data.record_data.async_write_data();
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node) {
            gm.ui.async_hide_module(gm.const.RecordShare);
        } else if (event.target == this.share_record_btn.node) {
            if (0 < gm.data.record_data.left_push_share_count) {
                gm.channel.viedo_share(true, (result: number) => {
                    if (this._reward_data && 0 == result) {
                        gm.ui.async_hide_module(gm.const.RecordShare);
                        gm.data.record_data.left_push_share_count--
                        gm.data.record_data.share_record_count++;
                        gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, this._reward_data.value);
                        gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    }
                });
            } else {
                gm.ui.show_notice("Số lần chia sẻ đã hết, hãy quay lại vào ngày mai!!");
            }
        }
    }
}