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
import { BuyItemData } from "./data";

const { ccclass, property } = cc._decorator;

@ccclass
export class Item extends ListViewItem {
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

    @property(cc.Sprite)
    private item: cc.Sprite = null;

    @property(cc.Label)
    private lbl_price: cc.Label = null;

    public _data: BuyItemData;

    public get data(): BuyItemData {
        return this._data;
    }

    public set data(value: BuyItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        const data = this._data;
        this.day_lbl.string = cc.js.formatStr("Khuyến Mãi");

        for (let i = 0; i < data.reward_array.length; i++) {
            console.log(data.reward_array);
            Utils.async_set_sprite_frame(
                this.reward_spr_array[i],
                BundleName.MAP,
                "res/" + data.reward_array[i].reward_id
            );
            this.reward_lbl_array[i].string =
                data.reward_array[i].reward_num.toString();
        }

        if (
            data.reward_itemId == 11002 &&
            data.reward_array[1].reward_id == 11002
        ) {
            Utils.async_set_sprite_frame(
                this.item,
                BundleName.MAP,
                "res/rewardIcon/" + data.reward_itemId
            );
            this.lbl_price.string = data.reward_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
            this.item.node.scale = 0.7;
        } else {
            Utils.async_set_sprite_frame(this.item, BundleName.Buy, "" + 2);
            this.item.node.scale = 1;
            this.lbl_price.string = data.reward_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        }
        this.receive_btn.interactable = true;
    }

    public reset(): void {}

    private vnpay() {
        const data = this.data;
        console.log(
            this.encryptNumber(12345) + " so tien : " + data.reward_price
        );
        window.open(
            "http://localhost:8080/SeverTuanAnh/vnpay_index/" +
                this.encryptNumber(data.reward_price),
            "_blank"
        );
        localStorage.setItem("reward_price", JSON.stringify(data));
    }

    private encryptNumber(number: number): string {
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let numStr = number.toString();
        let encrypted = "";
        const key: string = "KEY";
        let keyLength = key.length;

        for (let i = 0; i < numStr.length; i++) {
            let digit = parseInt(numStr[i]);
            let keyChar = key[i % keyLength]; // Lặp key nếu quá ngắn
            let keyShift = ALPHABET.indexOf(keyChar.toUpperCase()); // Chuyển đổi ký tự key thành số

            if (keyShift === -1) {
                throw new Error(`Key chứa ký tự không hợp lệ: ${keyChar}`);
            }

            let shiftedValue = (digit + keyShift) % 26;
            encrypted += ALPHABET[shiftedValue];
        }

        return encrypted;
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        const target = event.target;
        if (target == this.receive_btn.node) {
            // this.get_reward(1);
            this.vnpay();
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

    public get_reward(multiplier: number): void {
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
