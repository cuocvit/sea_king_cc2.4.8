// +-+
import { gm } from './GameManager';
import { BuildTypeEnum, BundleName } from './Constants';
import { roleGoBattleItemVO } from './MapCellCfgData';
import { Utils } from './Utils';
import { TempData } from './TempData';
import { ListView } from './ListView';
import { GameModule } from './GameModule';

const { ccclass, property } = cc._decorator;

interface TypeHeroList {
    heroid: number;
    heroUID: number;
}

@ccclass
class DefenseOp extends GameModule {
    @property([cc.Node])
    private heroPosNode: cc.Node[] = [];

    @property(ListView)
    private hero_list: ListView | null = null;

    @property(cc.Node)
    private noHeroTips: cc.Node | null = null;

    @property(cc.Label)
    private lblLvl: cc.Label | null = null;

    private _curUnlockNum: number = 0;
    private _tempLockList: number[] = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8];
    private _clickHeroData: roleGoBattleItemVO | null = null;
    private _startPos = null;
    private _heroList: TypeHeroList[] = [];

    protected onEnable(): void {
        TempData.setDefenseType(2);
        this._clickHeroData = new roleGoBattleItemVO();
        gm.ui.on("refreshHeroBattle", this.refreshPanel, this);
        gm.ui.on("refreshBattleHero", this.update_view, this);

        const buildData = gm.data.mapCell_data.buildData[BuildTypeEnum.GARRISION_TYPE];
        const cfgByID = gm.data.config_data.getBuildCfgByID(buildData.buildID);

        if (cfgByID) {
            this.lblLvl.string = "Lv." + buildData.buildLvl;
            this._curUnlockNum = cfgByID.capacity;
            const color = cc.Color.BLACK.fromHEX("#FFF8E8");

            for (let i = 0; i < this.heroPosNode.length; i++) {
                this.heroPosNode[i].color = color;
                if (this._curUnlockNum < i + 1) {
                    this.heroPosNode[i].children[0].active = false;
                    this.heroPosNode[i].children[1].active = true;
                    const lockColor = cc.Color.BLACK.fromHEX("#BAAF93");
                    this.heroPosNode[i].children[1].children[0].color = lockColor;
                    this.heroPosNode[i].children[1].children[1].color = lockColor;
                    this.heroPosNode[i].children[1].children[1].getComponent(cc.Label).string = "level " + this._tempLockList[i];
                } else {
                    this.heroPosNode[i].children[0].active = true;
                    this.heroPosNode[i].children[1].active = false;
                }
                this.heroPosNode[i].on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this, i), this);
            }
            TempData.getInitAllHeroList(true);
            this.noHeroTips.active = TempData.localHeroList.length <= 0;
            this.refreshPanel();
            this.update_view();
        }
    }

    private update_view(): void {
        this.hero_list?.setData(TempData.localHeroList);
    }

    private touchEnd(index: number): void {
        if (this._curUnlockNum <= index || !(this._heroList.length > index)) return;
        const heroData = gm.data.mapCell_data.getHeroDefanseDataByHeroUID(this._heroList[index].heroUID);
        if (heroData) {
            const cellID = heroData.cellID;
            const heroid = heroData.heroid;
            const heroUID = heroData.heroUID;
            TempData.addHeroByID(heroid, cellID);
            gm.data.mapCell_data.delDefenseDataByID(heroUID);
            this.refreshPanel();
            this.update_view();
            gm.data.mapCell_data.async_write_data();
        }
    }

    private refreshPanel(): void {
        this._heroList = [];
        const heroData = gm.data.mapCell_data.getDefanseHeroData();
        let a = 0;

        for (const key in heroData) {
            const heroConfig = gm.data.config_data.getHeroCfgByID(heroData[key].heroid);
            if (heroConfig) {
                this.heroPosNode[a].children[0].children[1].active = true;
                Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[0].getComponent(cc.Sprite), BundleName.COMMON, "res/color_" + heroConfig.lv);
                Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[1].getComponent(cc.Sprite), BundleName.COMMON, "res/handbook/" + heroConfig.heroid);
                Utils.async_set_sprite_frame(this.heroPosNode[a].children[0].children[1].children[2].getComponent(cc.Sprite), BundleName.MAP, "res/hero/heroPhoto" + heroConfig.lv);
                this._heroList.push(heroData[key]);
                a++;
            }
        }
        for (let o = a; o < this._curUnlockNum; o++) {
            this.heroPosNode[o].children[0].children[1].active = false;
        }
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.DEFENSE);
    }

    protected onDisable(): void {
        this.hero_list?.reset();
        gm.ui.off("refreshHeroBattle", this.refreshPanel, this);
        gm.ui.off("refreshBattleHero", this.update_view, this);
    }
}

export default DefenseOp;