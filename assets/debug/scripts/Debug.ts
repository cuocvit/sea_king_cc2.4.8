import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class Debug extends GameModule {
  @property(cc.Button)
  private close_btn: cc.Button | null = null;

  @property(cc.Button)
  private export_btn: cc.Button | null = null;

  @property(cc.Button)
  private clear_store_btn: cc.Button | null = null;

  public editor_on_button_click_handler(event: cc.Event): void {
    if (event.target == this.close_btn.node) {
      gm.ui.async_hide_module(gm.const.Debug);
    } else if (event.target == this.export_btn.node) {
      gm.data.export_data();
    } else if (event.target == this.clear_store_btn.node) {
      gm.data.clear_store_data();
    }
  }
}
