// +-+
import { BuildTypeEnum, HeroTypeEnum } from './Constants';
import { gm } from './GameManager';
import { Utils } from './Utils';
import { TempData } from './TempData';
import { NodePoolItem } from './NodePoolItem';

const { ccclass, property } = cc._decorator;

@ccclass
class ShipMgr extends NodePoolItem {
    @property(cc.Node)
    private caseNode: cc.Node | null = null;

    @property(cc.Node)
    private normalBattle: cc.Node | null = null;

    @property(cc.Node)
    private rewardBattle: cc.Node | null = null;

    @property(cc.Button)
    private btnShip: cc.Button | null = null;

    protected onLoad(): void {
        gm.ui.on("ship_goods_change", this.refreshItem, this);
        gm.ui.on("ship_play_anim", this.shipPlayAnim, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimFinishCb, this);
    }

    protected onEnable(): void {
        this.btnShip.interactable = true;
        this.normalBattle.getComponent(cc.Button).interactable = true;
        this.rewardBattle.getComponent(cc.Button).interactable = true;
        this.refreshItem();
        if (!(this.node.getComponent(cc.Animation).getAnimationState("ship_out").isPlaying ||
            this.node.getComponent(cc.Animation).getAnimationState("ship_in").isPlaying)) {
            this.node.getComponent(cc.Animation).play("ship_normal");
        }
    }

    private playAnimFinishCb(animation: string, event: { name: string }): void {
        this.btnShip.interactable = true;
        this.normalBattle.getComponent(cc.Button).interactable = true;
        this.rewardBattle.getComponent(cc.Button).interactable = true;
        if ("ship_out" == event.name) {
            this.shipOutFight();
        } else if ("ship_in" == event.name) {
            this.shipInGetGoods();
        }
    }

    private shipOutFight(): void {
        const mapType = TempData.map_type;
        cc.log(mapType + "          mapType");
        if (1 == mapType) {
            gm.data.fight_temp_data.match_fight();
        } else if (2 == mapType) {
            if (gm.data.fight_temp_data.match_caves_map()) {
                gm.ui.show_fight();
            } else {
                gm.ui.show_notice("Đã đạt cấp độ cao nhất, hãy chờ cấp độ tiếp theo!");
            }
        } else if (3 == mapType) {
            gm.data.fight_temp_data.match_happy_map();
            gm.ui.show_fight();
        }
    }

    private shipInGetGoods(): void {
        const tempHeroArray = gm.data.fight_temp_data.battle_hero_array;
        const deathHeroDataArray = gm.data.fight_temp_data.fight_result_data.death_hero_data_array;
        const aliveHeroDataArray = gm.data.fight_temp_data.fight_result_data.alive_hero_data_array;

        deathHeroDataArray.length;
        if (!gm.data.mapCell_data.isGuide) {
            const towerData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE);
            if (towerData && 2 <= towerData.buildLvl && gm.data.fight_data.fight_count % 2 == 0) {
                gm.ui.show_panel(gm.const.SuperRecruit);
            }
        }

        if (2 < gm.data.fight_data.fight_count && gm.data.fight_data.fight_count % 3 == 1 && !gm.data.mapCell_data.guideGift.guideIsGet) {
            gm.ui.show_panel(gm.const.GUIDEGIFT);
        }

        if (gm.data.server_data.has_new_defense_log) {
            gm.ui.show_panel(gm.const.MailLogNotice);
            gm.data.server_data.has_new_defense_log = false;
            gm.data.server_data.mail_red_point = false;
        }

        for (let heroIndex = 0; heroIndex < tempHeroArray.length; heroIndex++) {
            gm.ui.emit("set_item_battle_hero_operty", tempHeroArray[heroIndex].cellID, true);
            if (0 < deathHeroDataArray.length) {
                for (let deadHeroIndex = deathHeroDataArray.length - 1; 0 <= deadHeroIndex; deadHeroIndex--) {
                    if (deathHeroDataArray[deadHeroIndex].id == tempHeroArray[heroIndex].itemID) {
                        const heroConfig = gm.data.config_data.getHeroCfgByID(deathHeroDataArray[deadHeroIndex].id);
                        if (heroConfig) {
                            if (heroConfig.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                                gm.data.mapCell_data.addSuperHeroData(tempHeroArray[heroIndex].itemID, tempHeroArray[heroIndex].cellID, 0);
                                gm.ui.emit("item_children_refresh", tempHeroArray[heroIndex].cellID);
                                deathHeroDataArray.splice(deadHeroIndex, 1);
                                gm.ui.set_module_args(gm.const.SUPERHEROOP.key, [tempHeroArray[heroIndex].itemID, tempHeroArray[heroIndex].cellID, false]);
                                gm.ui.async_show_module(gm.const.SUPERHEROOP)

                            } else {
                                gm.data.mapCell_data.delCellItemByCellID(tempHeroArray[heroIndex].cellID);
                                gm.ui.emit("item_children_refresh", tempHeroArray[heroIndex].cellID), deathHeroDataArray.splice(deadHeroIndex, 1);
                            }
                            break;
                        }
                    }
                }
            }
        }

        for (let aliveHeroIndex = 0; aliveHeroIndex < aliveHeroDataArray.length; aliveHeroIndex++) {
            const aliveHero = aliveHeroDataArray[aliveHeroIndex];
            if (aliveHero && aliveHero.hero_type == HeroTypeEnum.SUPER_HERO_TYPE) {
                for (let battleHeroIndex = 0; battleHeroIndex < tempHeroArray.length; battleHeroIndex++) {
                    const battleHero = tempHeroArray[battleHeroIndex];
                    if (aliveHero.id == battleHero.itemID) {
                        gm.data.mapCell_data.addSuperHeroData(battleHero.itemID, battleHero.cellID, aliveHero.hp);
                        gm.ui.emit("item_children_refresh", battleHero.cellID);
                        break;
                    }
                }
            }
        }

        gm.data.fight_temp_data.get_all_result_data();
        this.refreshItem();
        this.node.getComponent(cc.Animation).play("ship_normal");
    }

    public refreshItem(): void {
        this.caseNode.active = false;
        this.rewardBattle.active = false;
        this.normalBattle.active = false;

        if (gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE] && gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].buildLvl > 0) {
            this.caseNode.active = gm.data.mapCell_data._warehouseList.length > 0;
            if (!gm.data.mapCell_data.isGuide && gm.data.mapCell_data.isFirstBattle) {
                this.rewardBattle.active = true;
            } else {
                this.normalBattle.active = true;
            }

            if (this.caseNode?.active) {
                Utils.set_sprite_state(this.normalBattle, cc.Sprite.State.GRAY);
            } else {
                Utils.set_sprite_state(this.normalBattle, cc.Sprite.State.NORMAL);
            }
        }
    }

    public onClickShip(): void {
        if (gm.data.mapCell_data.isGuide && gm.data.mapCell_data.roleGuideVO.guideID != 13) {
            return;
        }
        if (this.caseNode?.active) {
            gm.ui.show_notice("Hãy dỡ hàng trên tàu trước khi chiến đấu!");
        } else if (gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE] && gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].buildLvl > 0) {
            if (gm.data.mapCell_data.isGuide) {
                gm.channel.report_event("ohayoo_game_guide", {
                    guideid: 10,
                    guidedesc: cc.js.formatStr("10.Nhấp vào nút Đột kích trên tàu")
                });
                gm.ui.mapMainUI.checkHandAnimDelay();
            }
            const t: number = !gm.data.mapCell_data.isGuide && gm.data.mapCell_data.isFirstBattle ? 3 : 1;
            gm.ui.set_module_args(gm.const.GOBATTLE.key, t);
            gm.ui.async_show_module(gm.const.GOBATTLE);
        }
    }

    public revenge(targetUid: string): void {
        if (this.caseNode?.active) {
            gm.ui.show_notice("Hãy dỡ hàng trên tàu trước khi chiến đấu!");
        } else if (gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE] && gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE].buildLvl > 0) {
            gm.data.mail_temp_data.target_uid = targetUid;
            gm.ui.set_module_args(gm.const.GOBATTLE.key, 1);
            gm.ui.async_show_module(gm.const.GOBATTLE);
        }
    }

    private shipPlayAnim(animType: number): void {
        if (animType == 1) {
            this.btnShip.interactable = false;
            this.normalBattle.getComponent(cc.Button).interactable = false;
            this.rewardBattle.getComponent(cc.Button).interactable = false;
            this.node.getComponent(cc.Animation).play("ship_out");
        } else if (animType == 2) {
            this.btnShip.interactable = false;
            this.normalBattle.getComponent(cc.Button).interactable = false;
            this.rewardBattle.getComponent(cc.Button).interactable = false;
            this.node.getComponent(cc.Animation).play("ship_in");
        }
    }

    protected onDestroy(): void {
        gm.ui.off("ship_goods_change", this.refreshItem, this);
        gm.ui.off("ship_play_anim", this.shipPlayAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimFinishCb, this);
    }
}

export default ShipMgr;
