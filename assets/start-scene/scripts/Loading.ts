// qg ??????
import { GameModule } from './GameModule';
import { BundleName } from './Constants';
import { NodePoolItem } from './NodePoolItem';
import { Utils } from './Utils';
import { gm } from './GameManager';
import { LoadingState } from "./Launch"

const { ccclass, property } = cc._decorator;

@ccclass
class Loading extends GameModule {
    @property(cc.Label)
    private prompt_lbl: cc.Label | null = null;

    @property(cc.ProgressBar)
    private bar_node: cc.ProgressBar | null = null;

    @property(cc.ProgressBar)
    private bar_node_2: cc.ProgressBar | null = null;

    @property(cc.Node)
    private start_node: cc.Node | null = null;

    @property(cc.Node)
    private start_full_node: cc.Node | null = null;

    @property(cc.Node)
    private caves_node: cc.Node | null = null;

    @property(cc.Node)
    private reward_node: cc.Node | null = null;

    @property(cc.Node)
    private boat_node: cc.Node | null = null;

    @property(cc.Animation)
    private boat_anim: cc.Animation | null = null;

    @property([cc.Node])
    private hero_node_array: cc.Node[] = [];

    @property(cc.Sprite)
    private people_spr: cc.Sprite | null = null;

    @property(cc.Sprite)
    private people_text_spr: cc.Sprite | null = null;

    private _low_speed: number = 20;
    private _low_speed_2: number = 100;
    private _total_len: number = 0;
    private _total_len_2: number = 0;
    private _high_speed: number = 500;
    private _count: number = 0;
    private _state: LoadingState;
    private _last_state: LoadingState;

    get state(): LoadingState {
        return this._state;
    }

    set state(value: LoadingState) {
        if (this._state != value) {
            this._last_state = this._state;
            this._state = value;
            if (this._state !== LoadingState.COMPLETE) {
                this.start_load();
            } else if (this._state === LoadingState.COMPLETE) {
                this.complete_load();
            }
        }
    }

    protected update(deltaTime: number): void {
        if (this._state == LoadingState.COMPLETE) {
            this._total_len += deltaTime * this._high_speed;
            this._total_len_2 += deltaTime * this._high_speed;
            this.bar_node!.progress = Math.floor(this._total_len) / 100;
            this.bar_node_2!.progress = this._total_len_2 % 100 / 100;
            if (this._total_len >= 100) {
                this.node.active = false;
            }
            if (cc.sys.platform == cc.sys.OPPO_GAME) {
                qg.setLoadingProgress({ progress: this._total_len });
            }
        } else {
            if (this._total_len < 90) {
                this._total_len += deltaTime * this._low_speed;
                this.bar_node!.progress = Math.floor(this._total_len) / 100;
            }
            this._total_len_2 += deltaTime * this._low_speed_2;
            this.bar_node_2!.progress = this._total_len_2 % 100 / 100;
        }
    }

    private start_load(): void {
        this.node.active = true;
        this.start_node!.active = this._state == LoadingState.START;
        this.start_full_node!.active = this._state == LoadingState.START_FULL;
        this.caves_node!.active = this._state == LoadingState.CAVES_FULL;
        this.reward_node!.active = this._state == LoadingState.REWARD_FULL;
        this.boat_node!.active = this._state == LoadingState.BOAT_IN || this._state == LoadingState.BOAT_OUT;

        if (this._state == LoadingState.BOAT_IN) {
            this.people_spr!.node.active = false;
            this.people_text_spr!.node.active = false;
        } else if (this._state == LoadingState.BOAT_OUT) {
            const t: number = this._count % 2 + 1;
            this.people_spr!.node.active = true;
            this.people_text_spr!.node.active = true;
            Utils.async_set_sprite_frame(this.people_spr!, BundleName.LOADING, `res/people_${t}`);
            Utils.async_set_sprite_frame(this.people_text_spr!, BundleName.LOADING, `res/people_text_${t}`);
            this._count++;
        }

        this._total_len = 0;
        this._total_len_2 = 0;

        if (this._state == LoadingState.BOAT_IN) {
            this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
                this.boat_anim!.play("loding_ship_innormal");
            });
            this.boat_anim!.play("loding_ship_inopen");
            const aliveHeroDataArray = gm.data.fight_temp_data.fight_result_data.alive_hero_data_array;
            for (let i = 0; i < this.hero_node_array.length; i++) {
                const heroData = aliveHeroDataArray[i];
                const heroNode = this.hero_node_array[i];
                this.load_hero_model(heroNode, heroData ? heroData.id : 0, i, aliveHeroDataArray.length);
            }
        } else if (this._state == LoadingState.BOAT_OUT) {
            this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
                this.boat_anim!.play("loding_ship_outnormal");
            });
            this.boat_anim!.play("loding_ship_outopen");
            const battleHeroArray = gm.data.fight_temp_data.battle_hero_array;
            for (let i = 0; i < this.hero_node_array.length; i++) {
                const heroData = battleHeroArray[i];
                const heroNode = this.hero_node_array[i];
                this.load_hero_model(heroNode, heroData ? heroData.itemID : 0, i, battleHeroArray.length);
            }
        }
    }

    private load_hero_model(heroNode: cc.Node, heroId: number, index: number, total: number): void {
        if (heroId > 0) {
            if (heroNode.childrenCount == 0) {
                if (index < total) {
                    heroNode.active = true;
                    gm.pool.async_get(BundleName.COMMON, `prefabs/model/${heroId}`, NodePoolItem, (item) => {
                        if (!item) return;
                        if (heroNode.childrenCount == 0) {
                            heroNode.addChild(item.node);
                            const skeleton = item.getComponent(sp.Skeleton);
                            if (skeleton) {
                                skeleton.setSkin("front");
                                skeleton.setAnimation(0, "stay", true);
                            }
                        } else {
                            gm.pool.put(item.node);
                        }
                    });
                }
            } else {
                heroNode.active = false;
                gm.pool.put_children(heroNode);
            }
        }
    }

    private complete_load(): void {
        if (this._last_state == LoadingState.BOAT_IN) {
            this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
                this.do_complete_load();
            });
            this.boat_anim!.play("loding_ship_inclose");
        } else if (this._last_state == LoadingState.BOAT_OUT) {
            this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
                this.do_complete_load();
            });
            this.boat_anim!.play("loding_ship_outclose");
        } else {
            this.do_complete_load();
        }
    }

    private do_complete_load(): void {
        for (let i = 0; i < this.hero_node_array.length; i++) {
            const heroNode = this.hero_node_array[i];
            heroNode.active = false;
            gm.pool.put_children(heroNode);
        }
        this.start_node!.active = false;
        this.start_full_node!.active = false;
        this.caves_node!.active = false;
        this.reward_node!.active = false;
        this.boat_node!.active = false;
        this.node.active = false;
    }

   protected onDisable(): void {
        this.start_node!.active = false;
        this.start_full_node!.active = false;
        this.caves_node!.active = false;
        this.reward_node!.active = false;
        this.boat_node!.active = false;
        if (cc.sys.platform == cc.sys.OPPO_GAME) {
            qg.loadingComplete({});
        }
    }
}

export { Loading };