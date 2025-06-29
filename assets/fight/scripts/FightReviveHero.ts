import { GameModule } from '../../start-scene/scripts/GameModule';
import { gm } from '../../start-scene/scripts/GameManager';
import { ReportData } from '../../start-scene/scripts/NetUtils';

const { ccclass, property } = cc._decorator;

@ccclass
class FightReviveHero extends GameModule {
  @property(cc.Button)
  private revive_btn: cc.Button | null = null;

  @property(cc.Button)
  private close_btn: cc.Button | null = null;

  private _args: { callback?: (result: number) => void } | null = null;

  protected onEnable(): void {
    this._args = gm.ui.get_module_args(gm.const.FightReviveHero.key) as {};
  }

  private editor_on_button_click_handler(event: cc.Event): void {
    const e = this;
    if (event.target == this.close_btn.node) {
      gm.ui.async_hide_module(gm.const.FightReviveHero);
      this._args?.callback?.(1);
    } else if (event.target == this.revive_btn.node) {
      gm.channel.show_video_ad(() => {
        gm.ui.async_hide_module(gm.const.FightReviveHero);
        ReportData.instance.report_once_point(10827);
        ReportData.instance.report_point(10828);
        e._args?.callback?.(0);
      }, this);
    }
  }
}