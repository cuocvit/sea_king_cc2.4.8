// _hitTest???
import { ListView } from './ListView';
import { GameModule } from './GameModule';
import { gm } from "./GameManager";
import { BuildTypeEnum, BundleName } from './Constants';
import { roleGoBattleItemVO } from './MapCellCfgData';
import { Utils } from './Utils';
import { TempData } from './TempData';
import { GoBattleBuyItem } from "./GoBattleBuyItem";

const { ccclass, property } = cc._decorator;

@ccclass
class GoBattleOp extends GameModule {
    @property([cc.Node])
    private heroPosNode: cc.Node[] = [];

    @property(cc.Node)
    private heroParendNode: cc.Node | null = null;

    @property(cc.Node)
    private clickMoveNode: cc.Node | null = null;

    @property(cc.Node)
    private bgUINormal: cc.Node | null = null;

    @property(cc.Node)
    private bgUIDongku: cc.Node | null = null;

    @property(cc.Node)
    private bgUIMiHuan: cc.Node | null = null;

    @property([cc.SpriteFrame])
    private kuangSprFrameList: cc.SpriteFrame[] = [];

    @property(cc.Node)
    private handAnim: cc.Node | null = null;

    @property(ListView)
    private hero_list: ListView | null = null;

    @property(cc.Button)
    private battleBtn: cc.Button | null = null;

    @property(cc.Node)
    private noHeroTips: cc.Node | null = null;

    @property(cc.Label)
    private lblLvl: cc.Label | null = null;

    @property(cc.Node)
    private adheroNode: cc.Node | null = null;

    private _curUnlockNum: number = 0;
    private _tempLockList: number[] = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    private _tempHeroList: { [key: number]: number } = {
        34003: 0,
        35003: 0,
        37003: 33,
        38003: 35,
        39003: 220
    };
    private _curType: number = 1;
    private _clickHeroData = null;
    private _startPos = null;

    protected onLoad(): void {
        let num: number = 0;
        for (let t in this._tempHeroList) {
            this.adheroNode?.children[num].getComponent(GoBattleBuyItem).initdata(parseInt(t), this._tempHeroList[t]);
            num++;
        }
    }

    protected onEnable(): void {
        this.adheroNode.active = false;
        const dataByType = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.TOWER_TYPE);
        if (dataByType && dataByType.buildLvl >= 2) {
            this.adheroNode.active = true;
        }
        if (this.adheroNode?.active) {
            this.hero_list.node.height = 344;
            this.hero_list.node.y = -715;
            this.hero_list.scrollView.node.height = 220;
            this.hero_list.scrollView.node.children[0].height = 220;
        } else {
            this.hero_list.node.height = 380;
            this.hero_list.scrollView.node.children[0].height = 380;
            this.hero_list.scrollView.node.height = 380;
            this.hero_list.node.y = -637;
        }
        this.hero_list.scrollView.node.children[0].y = 0.5 * this.hero_list.scrollView.node.height;
        TempData.setDefenseType(1);
        this._curType = gm.ui.get_module_args(gm.const.GOBATTLE.key) as number;
        if (gm.data.mapCell_data.isGuide) gm.data.mapCell_data.isGuide;
        this.initPanelUI();
        this._clickHeroData = new roleGoBattleItemVO;
        gm.ui.on("item_move_end", this.on_move_item_hide, this);
        gm.ui.on("refreshHeroBattle", this.refreshPanel, this);
        gm.ui.on("refreshBattleHero", this.update_view, this);
        gm.data.fight_temp_data.open_battle_panel_state = 1;
        gm.data.fight_temp_data.battle_hero_array = [];
        const buildData = gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE];
        let cfById = gm.data.config_data.getBuildCfgByID(buildData.buildID);
        if (cfById) {
            this.lblLvl.string = this._curType !== 1 ? "" : "Lv." + buildData.buildLvl;
            this._curUnlockNum = cfById.capacity;
            console.log("this._curType: ", this._curType);
            for (let i = 0; i < this.heroPosNode.length; i++) {
                let color = cc.Color.BLACK.fromHEX("#FFF8E8");
                if (this._curType === 2) {
                    color = cc.Color.BLACK.fromHEX("#916d87");
                } else if (this._curType === 3) {
                    color = cc.Color.BLACK.fromHEX("#E6D6FD");
                }
                this.heroPosNode[i].color = color;
                this.heroPosNode[i].children[0].children[0].getComponent(cc.Sprite).spriteFrame = this.kuangSprFrameList[this._curType - 1];
                if (this._curUnlockNum < i + 1) {
                    this.heroPosNode[i].children[0].active = false;
                    this.heroPosNode[i].children[1].active = true;
                    color = this._curType === 2 ? cc.Color.BLACK.fromHEX("#613a55") : this._curType === 3 ? cc.Color.BLACK.fromHEX("#8d5cd1") : cc.Color.BLACK.fromHEX("#BAAF93");
                    this.heroPosNode[i].children[1].children[0].color = color;
                    this.heroPosNode[i].children[1].children[1].color = color;
                    this.heroPosNode[i].children[1].children[1].getComponent(cc.Label).string = "level " + this._tempLockList[i];
                } else {
                    this.heroPosNode[i].children[0].active = true;
                    this.heroPosNode[i].children[1].active = false;
                }
                this.heroPosNode[i].on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this, i), this);
            }
            this.clickMoveNode.active = false;
            TempData.getInitAllHeroList();
            this.noHeroTips.active = TempData.localHeroList.length <= 0;
            this.battleBtn.interactable = TempData.localHeroList.length > 0;
            this.refreshPanel();
            this.update_view();
        }
    }

    private update_view(): void {
        this.hero_list?.setData(TempData.localHeroList);
    }

    private initPanelUI(): void {
        this.bgUINormal.active = true;
        this.bgUIMiHuan.active = false;
        this.bgUIDongku.active = false;
        if (this._curType === 1) {
            // Do nothing
        } else if (this._curType === 2) {
            this.bgUINormal.active = false;
            this.bgUIDongku.active = true;
        } else if (this._curType === 3) {
            this.bgUINormal.active = false;
            this.bgUIMiHuan.active = true;
        }
    }

    private on_move_item_hide(newT: cc.Vec2, eventNum: number): void {
        if (this.heroParendNode._hitTest(newT) && gm.data.fight_temp_data.get_battle_hero_is_space()) { // ???
            const item = new roleGoBattleItemVO;
            item.cellID = eventNum;
            const heroConfig = gm.data.config_data.getHeroCfgByID(gm.data.mapCell_data.role_map_data[item.cellID].itemID);
            if (heroConfig) {
                item.itemID = heroConfig.heroid;
                item.itemType = heroConfig.occupation;
                gm.data.fight_temp_data.battle_hero_array.push(item);
            }
            this.refreshPanel();
        }
    }

    private touchStart(number: number, event: any): void {
        this.clickMoveNode.active = true;
        this.clickMoveNode.position = this.clickMoveNode.parent.convertToNodeSpaceAR(event.getLocation());
        this._clickHeroData.itemID = gm.data.fight_temp_data.battle_hero_array[number].itemID;
        this._clickHeroData.cellID = gm.data.fight_temp_data.battle_hero_array[number].cellID;
        this._clickHeroData.itemType = gm.data.fight_temp_data.battle_hero_array[number].itemType;
        this._clickHeroData.hp = gm.data.fight_temp_data.battle_hero_array[number].hp;
        this._clickHeroData.maxHp = gm.data.fight_temp_data.battle_hero_array[number].maxHp;
        gm.data.fight_temp_data.battle_hero_array.splice(number, 1);
        this.refreshPanel();
    }

    private touchMove(event: any): void {
        this.clickMoveNode.position = this.clickMoveNode?.parent.convertToNodeSpaceAR(event.getLocation());
    }

    private touchEnd(number: number): void {
        if (gm.data.fight_temp_data.battle_hero_array.length > number && gm.data.fight_temp_data.battle_hero_array[number]) {
            const cellID = gm.data.fight_temp_data.battle_hero_array[number].cellID;
            const itemID = gm.data.fight_temp_data.battle_hero_array[number].itemID;
            TempData.addHeroByID(itemID, cellID);
            gm.data.fight_temp_data.battle_hero_array.splice(number, 1);
            this.refreshPanel();
            this.update_view();
        }
    }

    private touchCanel(num: number, event: cc.Touch): void {
        if (this.heroParendNode._hitTest(event.getLocation())) { // ???
            for (let a = 0; a < this._curUnlockNum; a++) {
                if (this.heroPosNode[a]._hitTest(event.getLocation())) {
                    gm.data.fight_temp_data.battle_hero_array.splice(a, 0, this._clickHeroData);
                    this._clickHeroData = null;
                    this.refreshPanel();
                    break;
                }
            }
            if (this._clickHeroData) {
                gm.data.fight_temp_data.battle_hero_array.push(this._clickHeroData);
                this._clickHeroData = null;
                this.refreshPanel();
            }
        }
        if (this._clickHeroData) {
            gm.data.fight_temp_data.battle_hero_array.splice(num, 1);
            this.refreshPanel();
        }
    }

    private refreshPanel(): void {
        const buildData = gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE];
        let buildConfig = gm.data.config_data.getBuildCfgByID(buildData.buildID);
        if (buildConfig) {
            this._curUnlockNum = buildConfig.capacity;
            const heroArr = gm.data.fight_temp_data.battle_hero_array;
            if (gm.data.mapCell_data.isGuide && gm.data.mapCell_data.roleGuideVO.guideID == 13) {
                this.handAnim.active = true;
                this.handAnim.position = heroArr.length == 2 ? this.battleBtn?.node.position : cc.v3(-238, -556);
            } else {
                this.handAnim.active = false;
            }
            for (let i = 0; i < this._curUnlockNum; i++) {
                this.heroPosNode[i].children[0].children[1].active = true;
                if (heroArr.length > i && heroArr[i]) {
                    const heroConfig = gm.data.config_data.getHeroCfgByID(heroArr[i].itemID);
                    if (heroConfig) {
                        this.heroPosNode[i].children[0].children[1].active = true;
                        Utils.async_set_sprite_frame(this.heroPosNode[i].children[0].children[1].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + heroConfig.lv);
                        Utils.async_set_sprite_frame(this.heroPosNode[i].children[0].children[1].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + heroConfig.heroid);
                        Utils.async_set_sprite_frame(this.heroPosNode[i].children[0].children[1].children[2].getComponent(cc.Sprite), BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
                    }
                } else {
                    this.heroPosNode[i].children[0].children[1].active = false;
                }
            }
        }
    }

    private onClickHeroPhoto(t: any, key: string): void {
        if (this.node.getNumberOfRunningActions() > 0) return;
        const index = parseInt(key);
        if (this._curUnlockNum > index) {
            gm.data.fight_temp_data.battle_hero_array.splice(index, 1);
            this.refreshPanel();
        }
    }

    private onClickClose(): void {
        gm.data.fight_temp_data.battle_hero_array = [];
        gm.data.fight_temp_data.open_battle_panel_state = 0;
        gm.data.mail_temp_data.target_uid = "";
        gm.ui.async_hide_module(gm.const.GOBATTLE);
    }

    private onClickFight(): void {
        if (gm.data.fight_temp_data.battle_hero_array.length != 0) {
            if (gm.data.mapCell_data.isGuide && gm.data.fight_temp_data.battle_hero_array.length < 2) {
                gm.ui.show_notice("Hãy đưa 2 anh hùng vào đội hình!!!");
            } else {
                if (gm.data.mapCell_data.isGuide) {
                    gm.data.mapCell_data.buildData[BuildTypeEnum.TOWER_TYPE].buildState = 2;
                    gm.data.mapCell_data.async_write_data();
                    gm.data.mapCell_data.role_build_lock_num = 1;
                    gm.ui.emit("build_show_stateIcon", true);
                    gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 13,
                        guidedesc: cc.js.formatStr("13.Nhấn vào nút tấn công trên giao diện!!!")
                    })
                }
                for (let t = 0; t < gm.data.fight_temp_data.battle_hero_array.length; t++) {
                    gm.ui.emit("set_item_battle_hero_operty", gm.data.fight_temp_data.battle_hero_array[t].cellID, false);
                }
                gm.data.fight_temp_data.open_battle_panel_state = 0;
                gm.ui.async_hide_module(gm.const.GOBATTLE);
                TempData.map_type = this._curType;
                gm.ui.emit("ship_play_anim", 1);
            }
        } else {
            gm.ui.show_notice("Hãy đưa anh hùng vào đội hình!!!");
        }
    }

    protected onDisable(): void {
        for (let t = 0; t < this.heroPosNode.length; t++) {
            this.heroPosNode[t].targetOff(this);
        }
        gm.ui.off("item_move_end", this.on_move_item_hide, this);
        gm.ui.off("refreshHeroBattle", this.refreshPanel, this);
        gm.ui.off("refreshBattleHero", this.update_view, this);
    }
}

export default GoBattleOp;