import { GameModule } from '../../start-scene/scripts/GameModule';
import { SetItemNumEnum, } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { TempData } from '../../start-scene/scripts/TempData';
import { BANNER_AD_TYPE } from "../../start-scene/scripts/ChannelManager";
import { Timer } from '../../start-scene/scripts/Timer';

const { ccclass, property } = cc._decorator;

@ccclass
class LuckyWheel extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Node)
    private rotate_node: cc.Node = null;

    @property(cc.Button)
    private video_draw_btn: cc.Button = null;

    @property(cc.Button)
    private free_draw_btn: cc.Button = null;

    @property(cc.Label)
    private free_left_sec_lbl: cc.Label = null;

    @property(cc.RichText)
    private left_count_lbl: cc.RichText = null;

    @property(cc.Node)
    private light_node: cc.Node = null;

    private _timer: Timer | null = null;

    protected onEnable(): void {
        TempData.mainFunShowLucky = true;
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
        this.update_view();
        this.rotate_node.rotation = 360 / gm.const.LUCKY_WHEEL_REWARD_ARRAY.length * gm.data.lucky_wheel_data.last_reward_index;
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
        gm.ui.mapMainUI.show_lucky_wheel_node_entry();
        this._timer && this._timer.stop();
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        const target = event.target;
        const luckyWheelData = gm.data.lucky_wheel_data;

        if (target == this.close_btn.node) {
            gm.ui.async_hide_module(gm.const.LuckyWheel);
        } else if (target == this.video_draw_btn.node) {
            if (luckyWheelData.left_lucky_wheel_video_count > 0) {
                ReportData.instance.report_once_point(10533);
                ReportData.instance.report_point(10534);
                gm.channel.show_video_ad(() => {
                    ReportData.instance.report_once_point(10633);
                    ReportData.instance.report_point(10634);
                    this.video_draw_btn.interactable = false;
                    this.close_btn.interactable = false;
                    Utils.set_sprite_state(this.video_draw_btn.node, cc.Sprite.State.GRAY);
                    Utils.set_sprite_state(this.close_btn.node, cc.Sprite.State.GRAY);
                    this.draw();
                }, this);
            } else {
                gm.ui.show_notice("Không đủ lượt, hãy quay lại vào ngày mai!!!");
            }
        } else if (target == this.free_draw_btn.node) {
            if (luckyWheelData.left_lucky_wheel_video_count > 0) {
                this.free_draw_btn.interactable = false;
                this.close_btn.interactable = false;
                Utils.set_sprite_state(this.free_draw_btn.node, cc.Sprite.State.GRAY);
                Utils.set_sprite_state(this.close_btn.node, cc.Sprite.State.GRAY);
                this.draw();
                luckyWheelData.free_timestamp = Date.now() + gm.const.FREE_DRAW_TIME_INTERVAL;
            } else {
                gm.ui.show_notice("Không đủ lượt, hãy quay lại vào ngày mai!!!");
            }
        }
    }

    public update_view(): void {
        const luckyWheelData = gm.data.lucky_wheel_data;
        this.left_count_lbl.string = cc.js.formatStr("<b>Lượt quay còn lại（<color=#56ff49>%d lần</color>）</b>", luckyWheelData.left_lucky_wheel_video_count);

        if (luckyWheelData.left_lucky_wheel_free_count > 0) {
            this.video_draw_btn.node.active = false;
        } else if (luckyWheelData.left_lucky_wheel_video_count > 0) {
            if (Date.now() > luckyWheelData.free_timestamp) {
                this.free_draw_btn.interactable = true;
                this.free_draw_btn.node.active = true;
                this.video_draw_btn.interactable = false;
                this.video_draw_btn.node.active = false;
                this.free_left_sec_lbl.string = "";
            } else {
                const remainingTime = Math.ceil((luckyWheelData.free_timestamp - Date.now()) / 1000);
                if (!this._timer) {
                    this._timer = new Timer();
                }
                this._timer.start((startTime: number, currentTime: number) => {
                    this.free_left_sec_lbl.string = cc.js.formatStr("%s后免费", Utils.format_time(currentTime - startTime));
                    if (currentTime <= startTime) {
                        this.update_view();
                    }
                }, 1000, remainingTime);
                this.video_draw_btn.interactable = true;
                this.video_draw_btn.node.active = true;
                Utils.set_sprite_state(this.video_draw_btn.node, cc.Sprite.State.NORMAL);
                this.free_draw_btn.interactable = false;
                this.free_draw_btn.node.active = false;
            }
        } else {
            this.video_draw_btn.interactable = false;
            this.video_draw_btn.node.active = true;
            this.free_draw_btn.interactable = false;
            this.free_draw_btn.node.active = false;
        }
        this.close_btn.interactable = true;
        Utils.set_sprite_state(this.close_btn.node, cc.Sprite.State.NORMAL);
    }

    private random_index(): number {
        let totalWeight = 0;
        for (let reward of gm.const.LUCKY_WHEEL_REWARD_ARRAY) {
            totalWeight += reward.weight;
        }
        const randomValue = Math.random() * totalWeight;
        let accumulatedWeight = 0;
        for (let i = 0; i < gm.const.LUCKY_WHEEL_REWARD_ARRAY.length; i++) {
            accumulatedWeight += gm.const.LUCKY_WHEEL_REWARD_ARRAY[i].weight;
            if (accumulatedWeight > randomValue) {
                return i;
            }
        }
        return 0;
    }

    private draw(): void {
        const luckyWheelData = gm.data.lucky_wheel_data;
        const rotationPerReward = 360 / gm.const.LUCKY_WHEEL_REWARD_ARRAY.length;
        const randomIndex = this.random_index();
        const totalRotation = 360 - luckyWheelData.last_reward_index * rotationPerReward + 1080 + randomIndex * rotationPerReward;

        this.light_node.active = false;
        this.light_node.opacity = 255;
        this.rotate_node.rotation = luckyWheelData.last_reward_index * rotationPerReward;

        this.rotate_node.runAction(cc.sequence(
            cc.rotateBy(3.8, totalRotation).easing(cc.easeCubicActionOut()),
            cc.callFunc(() => {
                this.light_node.active = true;
                this.light_node.runAction(cc.sequence(
                    cc.blink(1, 10),
                    cc.callFunc(() => {
                        this.light_node.opacity = 255;
                        const reward = gm.const.LUCKY_WHEEL_REWARD_ARRAY[randomIndex];
                        if (reward.type == 0) {
                            gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, reward.num);
                            gm.ui.show_coin_fly(reward.id, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                        } else if (reward.type == 1) {
                            gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, reward.num);
                            gm.ui.show_coin_fly(reward.id, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                        } else if (reward.type == 2) {
                            gm.data.mapCell_data.addBarrelNum(reward.num);
                            gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                                idList: [reward.id],
                                numList: [reward.num]
                            });
                            gm.ui.async_show_module(gm.const.GETREWARDOP);
                        } else if (reward.type == 3 || reward.type == 4) {
                            const itemList = [];
                            for (let i = 0; i < reward.num; i++) {
                                itemList.push(reward.id);
                            }
                            gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                                idList: [reward.id],
                                numList: [reward.num]
                            });
                            gm.ui.async_show_module(gm.const.GETREWARDOP);
                            gm.data.mapCell_data.addWareHouseList(itemList);
                        }
                        luckyWheelData.last_reward_index = randomIndex;
                        if (luckyWheelData.left_lucky_wheel_free_count > 0) {
                            luckyWheelData.left_lucky_wheel_free_count--;
                        } else if (luckyWheelData.left_lucky_wheel_video_count > 0) {
                            luckyWheelData.left_lucky_wheel_video_count--;
                        }
                        luckyWheelData.async_write_data();
                        this.update_view();
                    })
                ));
            }, this)
        ));
    }
}