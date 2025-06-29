import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { Timer } from '../../start-scene/scripts/Timer';
import { Utils } from '../../start-scene/scripts/Utils';
import { RecordData } from '../../start-scene/scripts/RecordData';
import { gm } from '../../start-scene/scripts/GameManager';
import { SetItemNumEnum } from '../../start-scene/scripts/Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class StoreList extends GameModule {
    @property(cc.Node)
    private show_panle: cc.Node = null;

    @property(ListView)
    private store_list: ListView = null;

    @property(ListView)
    private daily_list: ListView = null;

    @property(ListView)
    private video_list: ListView = null;

    @property(ListView)
    private diamond_list: ListView = null;

    @property(cc.Button)
    private btn_close: cc.Button = null;

    @property(cc.Button)
    private btn_refresh: cc.Button = null;

    @property(cc.Label)
    private ref_time_lbl: cc.Label = null;

    @property(cc.Button)
    private btn_close_bg: cc.Button = null;

    private _time: Timer | null = null;

    protected onLoad(): void { }

    protected onEnable(): void {
        if (gm.data.store_data.refresh_time <= Date.now() / 1000 || gm.data.store_data.daily_store_array.length > 4) {
            gm.data.store_data.refresh_store();
        }
        gm.data.event_emitter.on(RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this.on_record_state_change_handler();
        this.showStoreList();
        this.showStoreDailyList();
        this.showVideoDailyList();
        this.showDiamondDailyList();
    }

    protected onDisable(): void {
        this.store_list.reset();
        this.daily_list.reset();
        this.video_list.reset();
        this.diamond_list.reset();
        gm.data.event_emitter.off(RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this._time && this._time.stop();
    }

    private on_record_state_change_handler(): void {
        if (!this._time) {
            this._time = new Timer();
        }
        if (!this._time.is_running) {
            this._time.start(() => {
                const time: number = Math.floor(gm.data.store_data.refresh_time - Date.now() / 1000);
                this.ref_time_lbl.string = "Thời gian làm mới: " + Utils.time_format(time, "mm:ss");
                if (time <= 0) {
                    gm.data.store_data.refresh_store();
                    this.showStoreDailyList();
                    this.showStoreList();
                }
            }, 1000, 0);
        }
    }

    private showStoreList(): void {
        this.store_list.setData(gm.data.store_data.store_array);
    }

    private showStoreDailyList(): void {
        this.daily_list.setData(gm.data.store_data.daily_store_array);
    }

    private showVideoDailyList(): void {
        this.video_list.setData(gm.data.store_data.video_store_array);
    }

    private showDiamondDailyList(): void {
        this.diamond_list.setData(gm.data.store_data.diamond_store_array);
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target === this.btn_close.node || event.target === this.btn_close_bg.node) {
            gm.ui.async_hide_module(gm.const.Store);
        } else if (event.target === this.btn_refresh.node) {
            if (gm.data.mapCell_data.roleCoinData.diamondNum < 5) {
                gm.ui.show_notice("Không đủ kim cương");
            } else {
                gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.REDUCE_ITEM_TYPE, 5);
                gm.data.store_data.refresh_store();
                this.showStoreDailyList();
                this.showStoreList();
                this.showDiamondDailyList();
                this.showVideoDailyList();
            }
        }
    }
}