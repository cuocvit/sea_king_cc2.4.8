import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { SignData } from '../../start-scene/scripts/SignData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';
import { SignBuyItem } from './SignBuyItem';
import { TempData } from '../../start-scene/scripts/TempData';

const { ccclass, property } = cc._decorator;

@ccclass
class Sign extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private anywhere_close_btn: cc.Button = null;

    @property(ListView)
    private sign_list: ListView = null;

    @property(SignBuyItem)
    private sign_buy_item_array: SignBuyItem[] = [];

    protected onEnable(): void {
        TempData.mainFunShowSign = true;
        gm.data.event_emitter.on(SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
    }

    protected onDisable(): void {
        gm.data.event_emitter.off(SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.sign_list.reset();
        for (let i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].reset();
        }
        gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
        gm.ui.mapMainUI.show_sign_entry();
    }

    public update_view(): void {
        this.sign_list.setData(gm.data.sign_data.sign_data_array);
        for (let i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].data = gm.data.sign_data.sign_buy_data_array[i];
        }
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target !== this.close_btn.node && event.target !== this.anywhere_close_btn.node) return;
        gm.ui.async_hide_module(gm.const.Sign);
    }
}

export default Sign;