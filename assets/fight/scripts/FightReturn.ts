import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
class FightReturn extends GameModule {
  @property(cc.Button)
  private close_btn: cc.Button = null;

  @property(cc.Button)
  private anywhere_close_btn: cc.Button = null;

  @property(cc.Button)
  private cancel_btn: cc.Button = null;

  @property(cc.Button)
  private ok_btn: cc.Button = null;

  private editor_on_button_click_handler(event: cc.Event): void {
    const target = event.target;
    if (target == this.close_btn.node || target == this.anywhere_close_btn.node || target == this.cancel_btn.node) {
      gm.ui.async_hide_module(gm.const.FightReturn);
    } else if (target == this.ok_btn.node) {
      gm.ui.async_hide_module(gm.const.FightReturn);
      gm.ui.fight.fight_return();
    }
  }
}
