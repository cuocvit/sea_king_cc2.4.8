// *-*
import { BundleName, RewardIdEnum, PropTypeEnum } from './Constants';
import { gm } from './GameManager';
import { ListViewItem } from './ListViewItem';
import { Utils } from './Utils';
import { ReportData } from './NetUtils';
import { ItemConfig } from '../../common/configs/item';
import { TurtleExchangeItemData } from './TurtleExchangeData';

const { ccclass, property } = cc._decorator;

@ccclass
export class TurtleExchangeItem extends ListViewItem {
    @property(cc.SpriteFrame)
    private exchange_light_sf: cc.SpriteFrame | null = null;

    @property(cc.SpriteFrame)
    private exchange_dark_sf: cc.SpriteFrame | null = null;

    @property(cc.Node)
    private bg_node: cc.Node | null = null;

    @property(cc.Button)
    private exchange_btn: cc.Button | null = null;

    @property(cc.Sprite)
    private exchange_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private prop_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private prop_lbl: cc.Label | null = null;

    @property(cc.Sprite)
    private exchange_prop_spr: cc.Sprite | null = null;

    @property(cc.Label)
    private exchange_prop_lbl: cc.Label | null = null;

    public _data: TurtleExchangeItemData;

    public get data(): TurtleExchangeItemData {
        return this._data;
    }

    public set data(value: TurtleExchangeItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        const data = this._data;
        this.bg_node.color = 0 < data.state ? gm.const.TURTLE_EXCHANGE_COLOR_LIGHT : gm.const.TURTLE_EXCHANGE_COLOR_DART;
        this.exchange_btn.interactable = 0 < data.state;
        this.exchange_spr.spriteFrame = 0 < data.state ? this.exchange_light_sf : this.exchange_dark_sf;
        Utils.async_set_sprite_frame(this.prop_spr, BundleName.MAP, "res/" + t.prop_id);
        Utils.async_set_sprite_frame(this.exchange_prop_spr, BundleName.MAP, "res/" + t.exchange_prop_id);
        this.prop_lbl.string = data.prop_num + "";
        this.exchange_prop_lbl.string = data.exchange_prop_num + "";
    }

    public reset(): void {
        this.prop_spr.spriteFrame = null;
    }

    public editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.exchange_btn.node) {
            const mapCellData = gm.data.mapCell_data;
            const data = this._data;
            const turtleExchangeData = gm.data.turtle_exchange_data;
            if (turtleExchangeData.left_refresh_count <= 0) {
                gm.ui.show_notice("Không đủ thời gian đổi thưởng, vui lòng mua thêm");
            } else {
                if (mapCellData.getIsHaveSpeceCellID()) {
                    if (0 < data.exchange_prop_id && 0 < data.exchange_prop_num) {
                        if (data.exchange_prop_id == RewardIdEnum.GOLD_BARREL || data.exchange_prop_id == RewardIdEnum.SILVER_BARREL) {
                            if (1 == data.exchange_prop_num) {
                                const itemConfig = gm.config.get_row_data("ItemConfigData", data.prop_id.toString()) as ItemConfig;
                                if (itemConfig.type == PropTypeEnum.COIN_TYPE) {
                                    if (data.exchange_prop_id == RewardIdEnum.GOLD_BARREL) {
                                        ReportData.instance.report_once_point(10615);
                                        ReportData.instance.report_point(10616);
                                    } else if (data.exchange_prop_id == RewardIdEnum.SILVER_BARREL) {
                                        ReportData.instance.report_once_point(10611);
                                        ReportData.instance.report_point(10612);
                                    }

                                } else if (itemConfig.type == PropTypeEnum.DIAMONDS_TYPE) {
                                    if (data.exchange_prop_id == RewardIdEnum.GOLD_BARREL) {
                                        ReportData.instance.report_once_point(10617);
                                        ReportData.instance.report_point(10618);
                                    } else if (data.exchange_prop_id == RewardIdEnum.SILVER_BARREL) {
                                        ReportData.instance.report_once_point(10613);
                                        ReportData.instance.report_point(10614);
                                    }
                                }
                                mapCellData.delCellItem(data.prop_id, data.prop_num);
                                mapCellData.addBarrelInMap(data.exchange_prop_id);
                                turtleExchangeData.left_refresh_count--;
                                turtleExchangeData.async_write_data();
                            }
                        } else {
                            cc.error("超出需求的奖励");
                        }
                    } else {
                        gm.ui.show_auto_merge_message();
                    }
                }
            }
        }
    }
}
