import { BundleName, RewardIdEnum } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { ShopConfig } from '../../common/configs/shop';
import { ItemConfig } from '../../common/configs/item';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
class StoreItem extends ListViewItem {
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

    public _data: { id: number, index: number };

    public get data(): { id: number, index: number } {
        return this._data;
    }

    public set data(value: { id: number, index: number }) {
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


        if (rowData.item_id > 30000) {
            const itemData = gm.config.get_row_data("HeroConfigData", rowData.item_id.toString()) as HeroConfig;
            this.lvl_sprite.node.active = true;
            Utils.async_set_sprite_frame(this.lvl_sprite, BundleName.SPECIAL_BUILD, "res/" + itemData.lv);
            Utils.async_set_sprite_frame(this.icon_sprite, BundleName.COMMON, "res/handbook/" + itemData.icon);
        } else {
            const itemConfig = gm.config.get_row_data("ItemConfigData", rowData.item_id.toString()) as ItemConfig;
            Utils.async_set_sprite_frame(this.icon_sprite, BundleName.COMMON, "res/handbook/" + itemConfig.icon);
            this.lvl_sprite.node.active = false;
        }

        const storeCount = rowData.shop_type < 100 ? gm.data.store_data.getStoreCount(rowData.shop_id) : gm.data.store_data.getDailyStoreCount(rowData.shop_id);
        this.count_lbl.string = rowData.limit_num - storeCount + "/" + rowData.limit_num;

        if (storeCount >= rowData.limit_num) {
            this.btn_sold.active = true;
            this.btn_free.node.active = false;
            this.btn_add.node.active = false;
        } else {
            this.btn_sold.active = false;
            if (rowData.money_type > 0) {
                this.btn_free.node.active = false;
                this.btn_add.node.active = true;
                this.price_lbl.string = rowData.price.toString();
                const moneyConfig = gm.config.get_row_data("ItemConfigData", rowData.money_type.toString()) as ItemConfig;
                Utils.async_set_sprite_frame(this.cost_sprite, BundleName.COMMON, "res/handbook/" + moneyConfig.icon);
            } else {
                this.btn_free.node.active = true;
                this.btn_add.node.active = false;
            }
        }
    }

    protected onDisable(): void {
        this.unscheduleAllCallbacks();
    }

    private onClick(): void {
        if (gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            const rowData = gm.config.get_row_data("ShopConfigData", this._data.id.toString()) as ShopConfig;
            const storeCount = rowData.shop_type < 100 ? gm.data.store_data.getStoreCount(rowData.shop_id) : gm.data.store_data.getDailyStoreCount(rowData.shop_id);
            if (storeCount >= rowData.limit_num) {
                gm.ui.show_notice("Sản phẩm đã bán hết. Bạn có thể mua lại sau khi làm mới.");
            } else {
                let moneyType = "";
                let audioEffectId1 = 0;
                let audioEffectId2 = 0;

                if (rowData.money_type > 0) {
                    if (gm.data.mapCell_data.getMertrailIDCount(rowData.money_type) < rowData.price) {
                        gm.ui.show_notice("Vật liệu không đủ!!!");
                        return;
                    }
                    gm.data.mapCell_data.delCellItem(rowData.money_type, rowData.price);
                    switch (rowData.money_type) {
                        case RewardIdEnum.WOOD:
                            gm.audio.play_effect(gm.const.AUDIO_13_WOOD_BUY_ITEM);
                            moneyType = "木材";
                            audioEffectId1 = 10815;
                            audioEffectId2 = 10816;
                            break;
                        case RewardIdEnum.GOLD:
                            gm.audio.play_effect(gm.const.AUDIO_16_BUY_ITEM);
                            moneyType = "金币";
                            audioEffectId1 = 10813;
                            audioEffectId2 = 10814;
                            break;
                        case RewardIdEnum.IRON:
                            gm.audio.play_effect(gm.const.AUDIO_16_BUY_ITEM);
                            moneyType = "铁矿";
                            audioEffectId1 = 10817;
                            audioEffectId2 = 10818;
                            break;
                        case RewardIdEnum.DIAMOND:
                            gm.audio.play_effect(gm.const.AUDIO_14_DIAMOND_BUY_ITEM);
                            moneyType = "钻石";
                            audioEffectId1 = 10811;
                            audioEffectId2 = 10812;
                            break;
                        default:
                            gm.audio.play_effect(gm.const.AUDIO_16_BUY_ITEM);
                            break;
                    }
                }

                const itemConfig = gm.data.config_data.getItemCfgByID(rowData.item_id);
                if (itemConfig) {
                    gm.channel.report_event("store_buy_item", {
                        event_desc: "货摊购买道具",
                        money: moneyType,
                        item_index: this._data.index,
                        item_name: itemConfig.name,
                        desc: cc.js.formatStr("货摊购买道具%s", itemConfig.name)
                    });
                    if (audioEffectId1 > 0) {
                        ReportData.instance.report_once_point(audioEffectId1);
                    }
                    if (audioEffectId2 > 0) {
                        ReportData.instance.report_point(audioEffectId2);
                    }
                }

                gm.data.mapCell_data.addItem(rowData.item_id, rowData.item_num);
                gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                    idList: [rowData.item_id],
                    numList: [rowData.item_num]
                });
                gm.ui.async_show_module(gm.const.GETREWARDOP);
                if (rowData.shop_type < 100) {
                    gm.data.store_data.updateStore(rowData.shop_id, 1);
                } else {
                    gm.data.store_data.updateDailyStore(rowData.shop_id, 1);
                }
                this.update_view();
            }
        } else {
            gm.ui.show_auto_merge_message();
        }
    }
}