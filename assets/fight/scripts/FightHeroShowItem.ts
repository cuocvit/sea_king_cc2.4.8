// file này ko đc import ở đâu
import { ListViewItem } from '../../start-scene/scripts/ListViewItem';
import { HeroInBattleState } from '../../start-scene/scripts/FightConstants';
import { gm } from '../../start-scene/scripts/GameManager';
import { Utils } from '../../start-scene/scripts/Utils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { FightHeroItemData } from '../../start-scene/scripts/FightTempData';

const { ccclass, property } = cc._decorator;

@ccclass
class FightHeroShowItem extends ListViewItem {
    @property(cc.Sprite)
    private color_spr: cc.Sprite = null;

    @property(cc.Widget)
    private mask_widget: cc.Widget = null;

    @property(cc.Sprite)
    private hero_spr: cc.Sprite = null;

    @property(cc.Sprite)
    private lv_spr: cc.Sprite = null;

    @property(cc.ProgressBar)
    private hp_prg: cc.ProgressBar = null;

    @property(cc.Node)
    private in_battle_node: cc.Node = null;

    @property(cc.Button)
    private black_btn: cc.Button = null;

    public _data: FightHeroItemData;

    public get data(): FightHeroItemData {
        return this._data;
    }

    public set data(value: FightHeroItemData) {
        this._data = value;
        this.update_view();
    }

    public get in_battle_state(): HeroInBattleState {
        return this._data ? this._data.in_battle_state : HeroInBattleState.NOT_IN_BATTLE;
    }

    public set in_battle_state(value: HeroInBattleState) {
        if (!this._data) return;
        this._data.in_battle_state = value;
        this.in_battle_node.active = value == HeroInBattleState.WILL_IN_BATTLE;
        this.black_btn.node.active = value == HeroInBattleState.NOT_IN_BATTLE;
    }

    protected onEnable(): void {
        gm.data.event_emitter.on("fight_in_battle", this.on_fight_in_battle_handler, this);
    }

    protected onDisable(): void {
        gm.data.event_emitter.off("fight_in_battle", this.on_fight_in_battle_handler, this);
    }

    public update_view(): void {
        Utils.async_set_sprite_frame(this.color_spr, BundleName.COMMON, "res/color_" + this._data.lv);
        Utils.async_set_sprite_frame(this.hero_spr, BundleName.COMMON, "res/handbook/" + this._data.id);
        Utils.async_set_sprite_frame(this.lv_spr, BundleName.FIGHT, "res/lv_" + this._data.lv);
        this.hp_prg.progress = this._data.max_hp > 0 ? this._data.hp / this._data.max_hp : 0;
        this.in_battle_state = this._data.in_battle_state;

        const height = this._data.in_battle_state == HeroInBattleState.HAS_IN_BATTLE ? 80 : 128;
        if (height !== this.color_spr.node.height) {
            this.color_spr.node.height = height;
            this.mask_widget.updateAlignment();
        }
        Utils.set_sprite_state(this.node, this._data.hp <= 0 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL, true);
    }

    private on_fight_in_battle_handler(eventData: FightHeroItemData): void {
        if (eventData.in_battle_state !== HeroInBattleState.HAS_IN_BATTLE && this._data.in_battle_state !== HeroInBattleState.HAS_IN_BATTLE) {
            this._data.in_battle_state = eventData == this._data ? HeroInBattleState.WILL_IN_BATTLE : HeroInBattleState.NOT_IN_BATTLE;
            this.update_view();
        } else if (eventData == this._data) {
            this.update_view();
        }
    }

    public reset(): void {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
        this.lv_spr.spriteFrame = null;
        this.in_battle_node.active = false;
        this.black_btn.node.active = true;
    }

    protected editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.black_btn.node && this._data.in_battle_state == HeroInBattleState.NOT_IN_BATTLE) {
            gm.data.fight_temp_data.in_battle_hero_data = this._data;
            gm.data.event_emitter.emit("fight_in_battle", this._data);
        }
    }
}
