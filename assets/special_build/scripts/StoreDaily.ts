import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName, RewardIdEnum } from '../../start-scene/scripts/Constants';
import { ShopConfig } from '../../common/configs/shop';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
class StoreDaily extends ListViewItem {
    @property(cc.Button)
    private btn_add: cc.Button = null;

    @property(cc.Button)
    private btn_free: cc.Button = null;

    @property(cc.Node)
    private btn_sold: cc.Node = null;

    @property(cc.Label)
    private price_lbl: cc.Label = null;

    @property(cc.Label)
    private count_lbl: cc.Label = null;

    @property(cc.Sprite)
    private icon_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private cost_sprite: cc.Sprite = null;

    @property(cc.Sprite)
    private lvl_sprite: cc.Sprite = null;

    @property(cc.Label)
    private item_count_lbl: cc.Label = null;

    public _data: { id: number; index: number };
    public get data(): { id: number; index: number } {
        return this._data;
    }

    public set data(value: { id: number; index: number }) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        this.node.active = false;
        this.scheduleOnce(() => {
            this.node.active = true;
        }, 0.1 * this._data.index);

        const rowData = gm.config.get_row_data("ShopConfigData", this._data.id.toString()) as ShopConfig;
        this.item_count_lbl.string = "";
        if (rowData.item_num > 1) {
            this.item_count_lbl.string = "x" + rowData.item_num;
        }

        let itemData: HeroConfig;
        if (rowData.item_id > 30000) {
            itemData = gm.config.get_row_data("HeroConfigData", rowData.item_id.toString()) as HeroConfig;
            this.lvl_sprite.node.active = true;
            Utils.async_set_sprite_frame(this.lvl_sprite, BundleName.SPECIAL_BUILD, "res/" + itemData.lv);
            Utils.async_set_sprite_frame(this.icon_sprite, BundleName.COMMON, "res/handbook/" + itemData.icon);
        } else {
            itemData = gm.config.get_row_data("ItemConfigData", rowData.item_id.toString()) as HeroConfig;
            Utils.async_set_sprite_frame(this.icon_sprite, BundleName.COMMON, "res/handbook/" + itemData.icon);
            this.lvl_sprite.node.active = false;
        }

        let count: number = 0;
        if (rowData.shop_type < 100) {
            count = gm.data.store_data.getStoreCount(rowData.shop_id);
        } else if (rowData.shop_type < 200) {
            count = gm.data.store_data.getDailyStoreCount(rowData.shop_id);
        } else if (rowData.shop_type < 300) {
            count = gm.data.store_data.getVideoStoreCount(rowData.shop_id);
        } else if (rowData.shop_type < 400) {
            count = gm.data.store_data.getDimondStoreCount(rowData.shop_id);
        }

        this.count_lbl.string = rowData.limit_num - count + "/" + rowData.limit_num;
        if (count >= rowData.limit_num) {
            this.btn_sold.active = true;
            this.btn_free.node.active = false;
            this.btn_add.node.active = false;
            if (rowData.money_type > 0 && rowData.money_type === 1) {
                gm.channel.report_event("ohayoo_game_button_show", {
                    ad_type: "激励视频",
                    rit_id: "946114114",
                    ad_position: "商店_获得道具",
                    ad_position_type: "商店"
                });
            }
        } else {
            this.btn_sold.active = false;
            if (rowData.money_type > 0) {
                this.btn_free.node.active = false;
                this.btn_add.node.active = true;
                this.price_lbl.string = rowData.price.toString();
                this.cost_sprite.node.color = cc.Color.WHITE;
                this.cost_sprite.node.height = 50;
                this.cost_sprite.node.width = 50;
                this.price_lbl.node.getComponent(cc.LabelOutline).enabled = true;
                this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#FFDA58");
                this.price_lbl.node.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#7D2713");

                if (rowData.money_type === 1) {
                    this.price_lbl.string = "Miễn phí";
                    this.cost_sprite.node.color = cc.Color.BLACK.fromHEX("#253D45");
                    this.cost_sprite.node.width = 40;
                    this.cost_sprite.node.height = 30;
                    this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#1C3F00");
                    this.price_lbl.node.getComponent(cc.LabelOutline).enabled = false;
                    this.price_lbl.node.position =new  cc.Vec3(5,8,0);
                    this.price_lbl.fontSize = 27;
                    Utils.async_set_sprite_frame(this.cost_sprite, BundleName.COMMON, "res/handbook/video_" + rowData.money_type);
                } else {
                    Utils.async_set_sprite_frame(this.cost_sprite, BundleName.COMMON, "res/handbook/" + rowData.money_type);
                }
            } else {
                this.btn_free.node.active = true;
                this.btn_add.node.active = false;
            }
        }
    }

    protected onDisable(): void {
        this.unscheduleAllCallbacks();
    }

    private watchAdSucc(): void {
        if (this._data) {
            ReportData.instance.report_once_point(10625);
            ReportData.instance.report_point(10626);
            gm.audio.play_effect(gm.const.AUDIO_12_BUY_SUCCESS);

            const rowData = gm.config.get_row_data("ShopConfigData", this._data.id.toString()) as ShopConfig;
            for (let i = 0; i < gm.data.store_data.video_store_array.length; i++) {
                if (rowData.shop_id === gm.data.store_data.video_store_array[i].id) {
                    gm.data.mapCell_data.addItem(rowData.item_id, rowData.item_num);
                    gm.data.store_data.updateVideoStore(rowData.shop_id, 1, 0);
                    gm.data.store_data.async_write_data();
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                        idList: [rowData.item_id],
                        numList: [rowData.item_num]
                    });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                    break;
                }
            }
            this.update_view();
        }
    }

    private onClick(): void {
        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            const rowData = gm.config.get_row_data("ShopConfigData", this._data.id.toString()) as ShopConfig;
            let count: number = 0;

            if (rowData.shop_type < 100) {
                count = gm.data.store_data.getStoreCount(rowData.shop_id);
            } else if (rowData.shop_type < 200) {
                count = gm.data.store_data.getDailyStoreCount(rowData.shop_id);
            } else if (rowData.shop_type < 300) {
                count = gm.data.store_data.getVideoStoreCount(rowData.shop_id);
            } else if (rowData.shop_type < 400) {
                count = gm.data.store_data.getDimondStoreCount(rowData.shop_id);
            }

            if (count >= rowData.limit_num) {
                gm.ui.show_notice("Sản phẩm đã bán hết. Bạn có thể mua lại sau khi làm mới.");
            } else {
                if (rowData.money_type > 0) {
                    if (rowData.money_type === 1) {
                        ReportData.instance.report_once_point(10525);
                        ReportData.instance.report_point(10526);
                        gm.channel.report_event("ohayoo_game_button_click", {
                            ad_type: "激励视频",
                            rit_id: "946114114",
                            ad_position: "商店_获得道具",
                            ad_position_type: "商店"
                        });
                        gm.channel.show_video_ad(this.watchAdSucc, this, {
                            ad_position: "商店_获得道具",
                            ad_position_type: "商店"
                        });
                        return;
                    }
                    if (gm.data.mapCell_data.getMertrailIDCount(rowData.money_type) < rowData.price) {
                        gm.ui.show_notice("Vật liệu không đủ");
                        return;
                    }
                    gm.data.mapCell_data.delCellItem(rowData.money_type, rowData.price);
                    if (rowData.money_type === RewardIdEnum.WOOD) {
                        gm.audio.play_effect(gm.const.AUDIO_13_WOOD_BUY_ITEM);
                    } else if (rowData.money_type === RewardIdEnum.DIAMOND) {
                        gm.audio.play_effect(gm.const.AUDIO_14_DIAMOND_BUY_ITEM);
                    } else {
                        gm.audio.play_effect(gm.const.AUDIO_16_BUY_ITEM);
                    }
                } else {
                    gm.data.store_data.isFree = false;
                    gm.ui.emit("refresh_red_tips_stall");
                }
                gm.data.mapCell_data.addItem(rowData.item_id, rowData.item_num);
                gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                    idList: [rowData.item_id],
                    numList: [rowData.item_num]
                });
                gm.ui.async_show_module(gm.const.GETREWARDOP);
                if (rowData.shop_type < 100) {
                    gm.data.store_data.updateStore(rowData.shop_id, 1);
                } else if (rowData.shop_type < 200) {
                    gm.data.store_data.updateDailyStore(rowData.shop_id, 1);
                } else if (rowData.shop_type < 300 || rowData.shop_type < 400) {
                    gm.data.store_data.updateDiamondStore(rowData.shop_id, 1);
                }
                this.update_view();
            }
        } else {
            gm.ui.show_auto_merge_message();
        }
    }
}