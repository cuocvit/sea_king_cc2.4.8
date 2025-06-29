import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { BundleName, RewardIdEnum, SetItemNumEnum } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { MailInboxItemData } from '../../start-scene/scripts/MailTempData';
import { Utils } from '../../start-scene/scripts/Utils';

const { ccclass, property } = cc._decorator;

export interface MailDetailsArgs {
    data: MailInboxItemData
}

@ccclass
class MailDetails extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button | null = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button | null = null;

    @property(cc.Button)
    private receive_btn: cc.Button | null = null;

    @property(cc.Sprite)
    private icon_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private title_lbl: cc.Label | null = null;

    @property(cc.Label)
    private sender_lbl: cc.Label | null = null;

    @property(cc.Label)
    private content_lbl: cc.Label | null = null;

    @property(cc.Label)
    private time_lbl: cc.Label | null = null;

    @property(ListView)
    private reward_list: ListView | null = null;

    private _args: MailDetailsArgs;

    protected onEnable(): void {
        this._args = gm.ui.get_module_args(gm.const.MailDetails.key) as MailDetailsArgs;
        this.update_view();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        this.reward_list.reset();
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
    }

    private update_view(): void {
        const mailData = this._args.data;
        this.title_lbl.string = mailData.mail_title;
        this.content_lbl.string = mailData.mail_text;
        this.sender_lbl.string = "Người Gửi：" + mailData.mail_sender;
        Utils.async_set_sprite_frame(this.icon_spr, BundleName.MAIL, "res/icon_" + mailData.mail_type);

        if (!(1 != mailData.mail_type && 2 != mailData.mail_type)) {
            this.reward_list.setData(mailData.reward_array);
        }

        this.receive_btn.interactable = 0 == mailData.reward_status;
        Utils.set_sprite_state(this.receive_btn.node, 0 == mailData.reward_status ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            gm.ui.async_hide_module(gm.const.MailDetails);
        } else if (event.target == this.receive_btn.node) {
            const argsData = this._args.data;
            const serverData = gm.data.server_data;
            const requestData = {
                uid: serverData.uid,
                token: serverData.token,
                mail_id: argsData.mail_id,
                op_status: 0,
                reward_status: 1
            };
            serverData.op_player_email((response) => {
                if (0 == response.ResultCode) {
                    const rewardListNode = this.reward_list.node;
                    const rewardInfo = {
                        type: 1,
                        idList: [],
                        numList: []
                    };

                    for (let index = 0; index < argsData.reward_array.length; index++) {
                        const rewardArr = argsData.reward_array[index];
                        if (23001 <= rewardArr.reward_id && rewardArr.reward_id <= 23099) {
                            gm.data.mapCell_data.reelUnlcokHero(rewardArr.reward_id);

                        } else if (rewardArr.reward_id == RewardIdEnum.GOLD) {
                            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, rewardArr.reward_num);
                            gm.ui.show_coin_fly(RewardIdEnum.GOLD, rewardListNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);

                        } else if (rewardArr.reward_id == RewardIdEnum.DIAMOND) {
                            gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, rewardArr.reward_num);
                            gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, rewardListNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);

                        } else if (rewardArr.reward_id == RewardIdEnum.BARREL) {
                            gm.data.mapCell_data.addBarrelNum(rewardArr.reward_num);
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);

                        } else {
                            const rewardList = [];
                            for (let index = 0; index < rewardArr.reward_num; index++) {
                                rewardList.push(rewardArr.reward_id);
                            }

                            gm.data.mapCell_data.addWareHouseList(rewardList);
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);
                        }
                    }

                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                        idList: rewardInfo.idList,
                        numList: rewardInfo.numList
                    });

                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                    argsData.reward_status = 1;
                    gm.ui.async_hide_module(gm.const.MailDetails);
                }
            }, requestData)
        }
    }
}