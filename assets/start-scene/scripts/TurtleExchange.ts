//
import { GameModule } from './GameModule';
import { TurtleExchangeData } from './TurtleExchangeData';
import { gm } from './GameManager';
import { ListView } from './ListView';
import { RewardIdEnum } from './Constants';
import { Mudule } from "./UIManager"
const { ccclass, property } = cc._decorator;

@ccclass
export class TurtleExchange extends GameModule {
    @property(cc.Node)
    private mask_node: cc.Node | null = null;

    @property(cc.Node)
    private window_node: cc.Node | null = null;

    @property(cc.Button)
    private close_btn: cc.Button | null = null;

    @property(ListView)
    private exchange_list: ListView | null = null;

    @property(cc.Label)
    private refresh_count_lbl: cc.Label | null = null;

    @property(cc.Button)
    private refresh_btn: cc.Button | null = null;

    @property(cc.Label)
    private refresh_diamond_lbl: cc.Label | null = null;

    private _args: Mudule;

    protected onEnable(): void {
        this._args = gm.ui.get_module_args(gm.const.Task.key);
        gm.data.event_emitter.on(TurtleExchangeData.EVENT_DATA_CHANGE, this.update_view, this);
        this.mask_node?.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.update_view();
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(TurtleExchangeData.EVENT_DATA_CHANGE, this.update_view, this);
        this.mask_node?.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.exchange_list?.reset();
    }

    private update_view(): void {
        const turtleExchangeData = gm.data.turtle_exchange_data;
        this.refresh_count_lbl.string = cc.js.formatStr("Số lần：%d/%d", turtleExchangeData.left_refresh_count, gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT);
        this.refresh_diamond_lbl.string = gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND.toString();
        this.exchange_list.setData(turtleExchangeData.get_turtle_exchange_data_array());
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target === this.close_btn?.node) {
            gm.ui.async_hide_module(gm.const.TurtleExchange);
        } else if (event.target === this.refresh_btn?.node) {
            const mapCellData = gm.data.mapCell_data;
            if (mapCellData.roleCoinData.diamondNum < gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND) {
                gm.ui.show_notice("Không đủ kim cương");
            } else {
                mapCellData.delCellItem(RewardIdEnum.DIAMOND, gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND);
                const turtleExchangeData = gm.data.turtle_exchange_data;
                turtleExchangeData.left_refresh_count += gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT;
                turtleExchangeData.async_write_data();
            }
        }
    }

    private on_touch_end_handler(event: cc.Event): void {
        if (event.target === this.mask_node) {
            gm.ui.async_hide_module(gm.const.TurtleExchange);
        }
    }
}