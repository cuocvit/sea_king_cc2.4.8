import { BANNER_AD_TYPE } from '../../start-scene/scripts/ChannelManager';
import { SettingsData } from '../../start-scene/scripts/SettingsData';
import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class Announcement extends GameModule {
  @property(cc.Button)
  private close_btn: cc.Button | null = null;

  @property(cc.Button)
  private anywhere_close_btn: cc.Button | null = null;

  protected onEnable(): void {
    gm.data.event_emitter.on(SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
    this.update_view();
    gm.channel.show_banner_ad(BANNER_AD_TYPE.ALL);
  }

  protected onDisable(): void {
    gm.data.event_emitter.off(SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
    gm.channel.hide_banner_ad(BANNER_AD_TYPE.ALL);
  }

  public update_view(): void { }

  private editor_on_button_click_handler(event: cc.Event): void {
    if (!(event.target != this.close_btn.node && event.target != this.anywhere_close_btn.node)) {
      gm.ui.async_hide_module(gm.const.Announcement);
    }
  }
}
