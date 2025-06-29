import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { RewardIdEnum, SetItemNumEnum, PropTypeEnum, BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { TempData } from '../../start-scene/scripts/TempData';
import { Utils } from '../../start-scene/scripts/Utils';
import { PoolConfig } from '../../common/configs/pool';
import { ItemConfig } from '../../common/configs/item';

const { ccclass, property } = cc._decorator;

@ccclass
export class SuperRecruit extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button | null = null;

    @property(cc.Button)
    private buy_box_red_btn: cc.Button | null = null;

    @property(cc.Button)
    private video_buy_box_red_btn: cc.Button | null = null;

    @property(cc.Button)
    private buy_box_yellow_btn: cc.Button | null = null;

    @property(cc.Button)
    private free_buy_box_yellow_btn: cc.Button | null = null;

    @property(cc.Button)
    private video_buy_box_yellow_btn: cc.Button | null = null;

    @property(cc.Button)
    private video_close_btn: cc.Button | null = null;

    @property(cc.Label)
    private buy_box_red_lbl: cc.Label | null = null;

    @property(cc.Label)
    private video_buy_box_red_lbl: cc.Label | null = null;

    @property(cc.Label)
    private buy_box_yellow_lbl: cc.Label | null = null;

    @property(cc.Animation)
    private get_anim: cc.Animation | null = null;

    @property(cc.Node)
    private model_node: cc.Node | null = null;

    private yellow_model_offset: cc.Vec3 = new cc.Vec3(10, 10);
    private red_model_offset: cc.Vec3 = new cc.Vec3(0, 0);

    protected onEnable(): void {
        TempData.mainFunShowSuperHero = true;
        this.update_view();
        if (this.free_buy_box_yellow_btn.node.active) {
            gm.data.show_weak_guide(this.free_buy_box_yellow_btn.node, new cc.Vec3(0, 0), "", 0);
        }
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
        gm.ui.mapMainUI.show_super_recruit_node_entry();
    }

    public update_view(): void {
        this.buy_box_red_lbl.string = gm.const.RED_SUPER_RECRUIT_DIAMOND + "";
        this.buy_box_yellow_lbl.string = gm.const.YELLOW_SUPER_RECRUIT_GOLD + "";
        this.free_buy_box_yellow_btn.node.active = 0 < gm.data.main_data.left_free_super_recruit_count;
        this.buy_box_yellow_btn.node.active = gm.data.main_data.left_free_super_recruit_count <= 0;
        this.video_buy_box_red_lbl.string = cc.js.formatStr("Mời miễn phí(%d/%d)", gm.data.main_data.super_recruit_count, gm.const.MAX_SUPER_RECRUIT_VIDEO_COUNT);
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        const target = event.target;
        if (target === this.close_btn.node || target === this.video_close_btn.node) {
            gm.ui.async_hide_module(gm.const.SuperRecruit);
        } else if (target === this.buy_box_red_btn.node) {
            this.buy_red_box(gm.const.RED_SUPER_RECRUIT_DIAMOND);
        } else if (target === this.video_buy_box_red_btn.node) {
            if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
                ReportData.instance.report_once_point(10535);
                ReportData.instance.report_point(10536);
                gm.channel.show_video_ad(() => {
                    ReportData.instance.report_once_point(10635);
                    ReportData.instance.report_point(10636);
                    gm.data.main_data.super_recruit_count++;
                    if (gm.data.main_data.super_recruit_count >= gm.const.MAX_SUPER_RECRUIT_VIDEO_COUNT) {
                        gm.data.main_data.super_recruit_count -= gm.const.MAX_SUPER_RECRUIT_VIDEO_COUNT;
                        gm.data.main_data.async_write_data();
                        this.buy_red_box(0);
                    }
                    this.update_view();
                }, this);
            } else {
                gm.ui.show_auto_merge_message();
            }
        } else if (target === this.buy_box_yellow_btn.node) {
            this.buy_yellow_box(gm.const.YELLOW_SUPER_RECRUIT_GOLD);
        } else if (target === this.free_buy_box_yellow_btn.node) {
            if (0 < gm.data.main_data.left_free_super_recruit_count) {
                gm.data.main_data.left_free_super_recruit_count--;
                gm.data.main_data.async_write_data();
                this.update_view();
                this.buy_yellow_box(0);
            }
        } else if (target === this.video_buy_box_yellow_btn.node) {
            if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
                ReportData.instance.report_once_point(10535);
                ReportData.instance.report_point(10536);
                gm.channel.show_video_ad(() => {
                    ReportData.instance.report_once_point(10635);
                    ReportData.instance.report_point(10636);
                    this.buy_yellow_box(0);
                }, this);
            } else {
                gm.ui.show_auto_merge_message();
            }
        }
    }

    private buy_yellow_box(amount: number): void {
        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (0 < amount) {
                if (gm.data.mapCell_data.roleCoinData.coinNum < amount) {
                    gm.ui.set_module_args(gm.const.GETCOINOP.key, false);
                    gm.ui.show_panel(gm.const.GETCOINOP);
                    return;
                }
                gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.REDUCE_ITEM_TYPE, amount);
            }
            const itemConfig = gm.config.get_row_data("ItemConfigData", "11009") as ItemConfig;
            const poolConfig = gm.config.get_row_data_array("PoolConfigData", itemConfig.price + "") as PoolConfig[];
            const randomCase = gm.config.get_random_case_data(poolConfig);
            let prop = randomCase.prop;
            let randomAmount = Utils.math_random(true, randomCase.section_a, randomCase.section_b + 1);
            if (gm.data.main_data.is_first_super_recruit) {
                prop = 21005;
                gm.data.main_data.is_first_super_recruit = false;
                randomAmount = 1;
                gm.data.main_data.async_write_data();
            }
            const shift = gm.data.mapCell_data.getRoleSpceListShift();
            gm.data.mapCell_data.addSuperRecruitItem(prop, shift);
            if (prop < 30000) {
                const itemData = gm.config.get_row_data("ItemConfigData", prop + "") as ItemConfig;
                if (prop === 21005 || prop === 21057) {
                    const waterGirlCase = gm.data.mapCell_data.openWaterGirlCase(itemData.price, shift);
                    gm.ui.emit("item_children_refresh", shift);
                    this.play_get_anim(waterGirlCase, this.yellow_model_offset, () => {
                        gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [waterGirlCase, shift, true]);
                        gm.ui.async_show_module(gm.const.SUPERHEROOP);
                    });
                } else if (prop === 20008) {
                    const heroGiftCase = gm.data.mapCell_data.openHeroGiftCase(itemData.price, shift);
                    gm.ui.emit("item_children_refresh", shift);
                    this.play_get_anim(heroGiftCase, this.yellow_model_offset, () => {
                        gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [heroGiftCase, shift, true]);
                        gm.ui.async_show_module(gm.const.SUPERHEROOP);
                    });
                } else if (prop === RewardIdEnum.GOLD) {
                    gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (prop === RewardIdEnum.DIAMOND) {
                    gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (prop === RewardIdEnum.BARREL) {
                    gm.data.mapCell_data.addBarrelNum(randomAmount);
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                } else if (itemData.type === PropTypeEnum.WOOD_TYPE || itemData.type === PropTypeEnum.IRON_TYPE || itemData.type === PropTypeEnum.SHELL_MONEY_TYPE) {
                    let itemType = 0;
                    if (itemData.type === PropTypeEnum.WOOD_TYPE) {
                        itemType = 16008;
                    } else if (itemData.type === PropTypeEnum.IRON_TYPE) {
                        itemType = 17008;
                    } else if (itemData.type === PropTypeEnum.SHELL_MONEY_TYPE) {
                        itemType = 25008;
                    }
                    gm.data.mapCell_data.splitItemNum(randomAmount, itemType, 1);
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                } else {
                    const items = [];
                    for (let i = 0; i < randomAmount; i++) {
                        items.push(prop);
                    }
                    gm.data.mapCell_data.addWareHouseList(items);
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                }
            } else {
                const items = [];
                for (let i = 0; i < randomAmount; i++) {
                    items.push(prop);
                }
                gm.data.mapCell_data.addWareHouseList(items);
                gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                gm.ui.async_show_module(gm.const.GETREWARDOP);
            }
        } else {
            gm.ui.show_auto_merge_message();
        }
    }

    private buy_red_box(amount: number): void {
        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (0 < amount) {
                if (gm.data.mapCell_data.roleCoinData.diamondNum < amount) {
                    gm.ui.set_module_args(gm.const.GETCOINOP.key, true);
                    gm.ui.show_panel(gm.const.GETCOINOP);
                    return;
                }
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, amount);
            }
            const itemConfig = gm.config.get_row_data("ItemConfigData", "11010") as ItemConfig;
            const poolConfig = gm.config.get_row_data_array("PoolConfigData", itemConfig.price + "") as PoolConfig[];
            const randomCase = gm.config.get_random_case_data(poolConfig);
            const prop = randomCase.prop;
            const randomAmount = Utils.math_random(true, randomCase.section_a, randomCase.section_b + 1);
            const shift = gm.data.mapCell_data.getRoleSpceListShift();
            gm.data.mapCell_data.addSuperRecruitItem(prop, shift);
            if (prop < 30000) {
                const itemData = gm.config.get_row_data("ItemConfigData", prop + "") as ItemConfig;
                if (prop === 21005 || prop === 21057) {
                    const waterGirlCase = gm.data.mapCell_data.openWaterGirlCase(itemData.price, shift);
                    this.play_get_anim(waterGirlCase, this.red_model_offset, () => {
                        gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [waterGirlCase, shift, true]);
                        gm.ui.async_show_module(gm.const.SUPERHEROOP);
                    });
                } else if (prop === 20008) {
                    const heroGiftCase = gm.data.mapCell_data.openHeroGiftCase(itemData.price, shift);
                    gm.ui.emit("item_children_refresh", shift);
                    this.play_get_anim(heroGiftCase, this.red_model_offset, () => {
                        gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [heroGiftCase, shift, true]);
                        gm.ui.async_show_module(gm.const.SUPERHEROOP);
                    });
                } else if (prop === RewardIdEnum.GOLD) {
                    gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (prop === RewardIdEnum.DIAMOND) {
                    gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                } else if (prop === RewardIdEnum.BARREL) {
                    gm.data.mapCell_data.addBarrelNum(randomAmount);
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                } else if (itemData.type === PropTypeEnum.WOOD_TYPE || itemData.type === PropTypeEnum.IRON_TYPE || itemData.type === PropTypeEnum.SHELL_MONEY_TYPE) {
                    let itemType = 0;
                    if (itemData.type === PropTypeEnum.WOOD_TYPE) {
                        itemType = 16008;
                    } else if (itemData.type === PropTypeEnum.IRON_TYPE) {
                        itemType = 17008;
                    } else if (itemData.type === PropTypeEnum.SHELL_MONEY_TYPE) {
                        itemType = 25008;
                    }
                    gm.data.mapCell_data.splitItemNum(randomAmount, itemType, 1);
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                } else {
                    const items = [];
                    for (let i = 0; i < randomAmount; i++) {
                        items.push(prop);
                    }
                    gm.data.mapCell_data.addWareHouseList(items);
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                }
            } else {
                const items = [];
                for (let i = 0; i < randomAmount; i++) {
                    items.push(prop);
                }
                gm.data.mapCell_data.addWareHouseList(items);
                gm.ui.set_module_args(gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                gm.ui.async_show_module(gm.const.GETREWARDOP);
            }
        } else {
            gm.ui.show_auto_merge_message();
        }
    }

    private play_get_anim(model: number, position: cc.Vec3, callback: () => void): void {
        const self = this;
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + model, NodePoolItem, (node) => {
            if (self.model_node.childrenCount === 0) {
                self.model_node.addChild(node.node);
                node.node.setPosition(position);
                const skeleton = node.getComponent(sp.Skeleton);
                if (skeleton) {
                    skeleton.setSkin("front");
                    skeleton.setAnimation(0, "stay", true);
                }
                self.get_anim.node.active = true;
                self.scheduleOnce(() => {
                    gm.pool.put_children(self.model_node);
                }, 2);
                self.get_anim.once(cc.Animation.EventType.FINISHED, () => {
                    self.get_anim.node.active = false;
                    gm.ui.async_hide_module(gm.const.SuperRecruit);
                    callback();
                }, self);
                self.get_anim.play();
            }
        });
    }
}