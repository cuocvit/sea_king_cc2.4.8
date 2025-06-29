import { ListViewItem } from "../../start-scene/scripts/ListViewItem";
import { Utils } from "../../start-scene/scripts/Utils";
import { ReportData } from "../../start-scene/scripts/NetUtils";
import { gm } from "../../start-scene/scripts/GameManager";
import {
    RewardIdEnum,
    SetItemNumEnum,
    BundleName,
} from "../../start-scene/scripts/Constants";
import { SignItemData } from "../../start-scene/scripts/SignData";

const { ccclass, property } = cc._decorator;

@ccclass
class SignItem extends ListViewItem {
    @property(cc.Label)
    private day_lbl: cc.Label = null;

    @property([cc.Sprite])
    private reward_spr_array: cc.Sprite[] = [];

    @property([cc.Label])
    private reward_lbl_array: cc.Label[] = [];

    @property(cc.Button)
    private receive_btn: cc.Button = null;

    @property(cc.Button)
    private video_receive_btn: cc.Button = null;

    public _data: SignItemData;

    public get data(): SignItemData {
        return this._data;
    }

    public set data(value: SignItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        const data = this._data;
        this.day_lbl.string = cc.js.formatStr("Ngày thứ %d", data.day);
        for (let i = 0; i < data.reward_array.length; i++) {
            Utils.async_set_sprite_frame(
                this.reward_spr_array[i],
                BundleName.MAP,
                "res/" + data.reward_array[i].reward_id
            );
            this.reward_lbl_array[i].string =
                data.reward_array[i].reward_num.toString();
            console.log("res/" + data.reward_array[i].reward_id);
        }
        this.receive_btn.node.active = data.state == 0 || data.state == 1;
        Utils.set_sprite_state(
            this.receive_btn.node,
            data.state == 0 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL
        );
        this.receive_btn.interactable = data.state == 1;
        this.video_receive_btn.node.active = data.state == 2 || data.state == 3;
        Utils.set_sprite_state(
            this.video_receive_btn.node,
            data.state == 3 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL
        );
        this.video_receive_btn.interactable = data.state == 2;

        if (this.video_receive_btn.node.active) {
            gm.channel.report_event("ohayoo_game_button_show", {
                ad_type: "激励视频",
                rit_id: "946114114",
                ad_position: "签到_三倍奖励",
                ad_position_type: "签到",
            });
        }
    }

    public reset(): void {}

    private editor_on_button_click_handler(event: cc.Event): void {
        const target = event.target;
        if (target == this.receive_btn.node) {
            this.get_reward(1);
        } else if (target == this.video_receive_btn.node) {
            ReportData.instance.report_once_point(10527);
            ReportData.instance.report_point(10528);
            gm.channel.report_event("ohayoo_game_button_click", {
                ad_type: "激励视频",
                rit_id: "946114114",
                ad_position: "签到_三倍奖励",
                ad_position_type: "签到",
            });
            gm.channel.show_video_ad(
                () => {
                    ReportData.instance.report_once_point(10627);
                    ReportData.instance.report_point(10628);
                    this.get_reward(3);
                },
                this,
                {
                    ad_position: "签到_三倍奖励",
                    ad_position_type: "签到",
                }
            );
        }
    }

    private get_reward(multiplier: number): void {
        ReportData.instance.report_once_point(10833);
        const data = this._data;
        const rewardIds: number[] = [];
        const rewardNums: number[] = [];

        for (let i = 0; i < data.reward_array.length; i++) {
            const reward = data.reward_array[i];
            rewardIds.push(reward.reward_id);
            rewardNums.push(reward.reward_num * multiplier);

            if (reward.reward_id >= 23001 && reward.reward_id <= 23099) {
                gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
            } else if (reward.reward_id == RewardIdEnum.GOLD) {
                gm.data.mapCell_data.setAddGameCoin(
                    SetItemNumEnum.ADD_ITEM_TYPE,
                    reward.reward_num * multiplier
                );
                gm.ui.show_coin_fly(
                    RewardIdEnum.GOLD,
                    this.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
                );
            } else if (reward.reward_id == RewardIdEnum.DIAMOND) {
                gm.data.mapCell_data.setAddGameDiamond(
                    SetItemNumEnum.ADD_ITEM_TYPE,
                    reward.reward_num * multiplier
                );
                gm.ui.show_coin_fly(
                    RewardIdEnum.DIAMOND,
                    this.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
                );
            } else if (reward.reward_id == RewardIdEnum.BARREL) {
                gm.data.mapCell_data.addBarrelNum(
                    reward.reward_num * multiplier
                );
            } else {
                const itemIds: number[] = [];
                for (let j = 0; j < reward.reward_num * multiplier; j++) {
                    itemIds.push(reward.reward_id);
                }
                gm.data.mapCell_data.addWareHouseList(itemIds);
            }
        }

        gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
            idList: rewardIds,
            numList: rewardNums,
        });
        gm.ui.async_show_module(gm.const.GETREWARDOP);
        data.state = multiplier == 1 ? 2 : 3;
        gm.data.sign_data.sign_state = data.state;
        gm.data.sign_data.async_write_data();
    }
}
