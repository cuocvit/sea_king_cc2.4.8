import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName, SetItemNumEnum } from '../../start-scene/scripts/Constants';
import { SignBuyItemData } from '../../start-scene/scripts/SignData';

const { ccclass, property } = cc._decorator;

@ccclass
export class SignBuyItem extends NodePoolItem {
    @property(cc.Sprite)
    private color_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private hero_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private money_lbl: cc.Label | null = null;

    @property(cc.Button)
    private receive_btn: cc.Button | null = null;

    private _data: SignBuyItemData;

    public get data(): SignBuyItemData {
        return this._data;
    }

    public set data(value: SignBuyItemData) {
        this._data = value;
        this.update_view();
    }

    private update_view(): void {
        const data = this._data;
        this.money_lbl.string = data.reward_data.money > 0 ? data.reward_data.money.toString() : "Miễn Phí";
        this.receive_btn.node.active = data.state > 0;
        this.receive_btn.interactable = data.state === 1;
        Utils.set_sprite_state(this.receive_btn.node, data.state === 2 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        Utils.async_set_sprite_frame(this.hero_spr, BundleName.COMMON, "res/heroCircleImg/" + data.reward_data.reward_id);
    }

    public reset(): void {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
    }

    public editor_on_button_click_handler(event: cc.Event): void {
        if (event.target === this.receive_btn.node) {
            const data = this._data;
            if (gm.data.mapCell_data.roleCoinData.diamondNum < data.reward_data.money) {
                gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
                gm.ui.show_panel(gm.const.GETCOINOP);
                return;
            }
            if (data.reward_data.money > 0) {
                ReportData.instance.report_once_point(10835);
            }
            data.state = 2;
            gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, data.reward_data.money);
            const rewardIds: number[] = [];
            for (let i = 0; i < data.reward_data.reward_num; i++) {
                rewardIds.push(data.reward_data.reward_id);
            }
            gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                idList: [data.reward_data.reward_id],
                numList: [data.reward_data.reward_num]
            });
            gm.ui.async_show_module(gm.const.GETREWARDOP);
            gm.data.mapCell_data.addWareHouseList(rewardIds);
            gm.data.mapCell_data.async_write_data();
            gm.data.sign_data.async_write_data();
        }
    }
}