import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { ListView } from '../../start-scene/scripts/ListView';

const { ccclass, property } = cc._decorator;

@ccclass
class FightLost extends GameModule {
  @property(cc.Label)
  private name_lbl: cc.Label = null;

  @property(cc.Label)
  private gold_lbl: cc.Label = null;

  @property(cc.ScrollView)
  private lost_sv: cc.ScrollView = null;

  @property(ListView)
  private prop_list: ListView = null;

  @property(ListView)
  private death_hero_list: ListView = null;

  @property(cc.Button)
  private ok_btn: cc.Button = null;

  protected onEnable(): void {
    this.update_view();
  }

  protected onDisable(): void {
    this.prop_list.reset();
    this.death_hero_list.reset();
    this.lost_sv.scrollToTop();
  }

  private update_view(): void {
    const fightResultData = gm.data.fight_temp_data.fight_result_data;
    this.name_lbl.string = fightResultData.attacker_name;
    this.gold_lbl.string = "-" + fightResultData.gold_num;
    this.prop_list.setData(fightResultData.prop_data_array);
    this.death_hero_list.setData(fightResultData.death_hero_data_array);
  }

  protected editor_on_button_click_handler(event: cc.Event): void {
    if (event.target == this.ok_btn.node) {
      gm.ui.async_hide_module(gm.const.FightLost);
    }
  }
}

export default FightLost;