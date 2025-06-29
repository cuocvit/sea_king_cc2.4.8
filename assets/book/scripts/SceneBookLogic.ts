import { BookConfig } from '../../common/configs/books';
import { gm } from '../../start-scene/scripts/GameManager';
import SceneBookView from './SceneBookView';

const { ccclass, property } = cc._decorator;

@ccclass
class SceneBookLogic extends cc.Component {
    private pView: SceneBookView | null;
    private tSubTypeLists: Record<number, number[]> | null;
    private tLvLists: Record<number, number[]> | null;
    private sCurTab: string | null = null;
    private tDelayCds: Record<number, number> | null;

    public static readonly SUB_TYPE_HERO: number = 1;
    public static readonly SUB_TYPE_HERO_WALL: number = 2;
    public static readonly SUB_TYPE_MATERIAL_NORMAL: number = 3;
    public static readonly SUB_TYPE_MATERIAL_SPECIAL: number = 4;
    public static readonly SUB_TYPE_MATERIAL_RARE: number = 5;
    public static readonly SUB_TYPE_DECORATE: number = 6;
    public static readonly SUB_TYPE_SUPER_HERO: number = 7;
    public static readonly SUB_TYPE_DEFEND: number = 8;

    public constructor() {
        super();
        this.pView = null;
        this.tSubTypeLists = null;
        this.tLvLists = null;
        this.sCurTab = null;
        this.tDelayCds = null;
    }

    public setView(view: SceneBookView): void {
        this.pView = view;
    }

    protected onLoad(): void { }

    private doEvent(): void { }

    protected onEnable(): void {
        this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO);
        this.showTabHero();
        this.refreshRed();
    }

    private getMaxLvListBySubType(subType: number): number[] {
        const list = this.getListBySubType(subType);
        const maxLvList: number[] = [];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            const lvList = this.getLvList(item);
            let maxItem = item;
            for (let j = 0; j < lvList.length; j++) {
                const lvItem = lvList[j];
                if (this.checkIsUnlock(lvItem)) {
                    maxItem = lvItem;
                }
            }
            maxLvList.push(maxItem);
        }
        return maxLvList;
    }

    private getLvListBySubType(...subTypes: number[]): number[] {
        const lvList: number[] = [];
        for (let i = 0; i < subTypes.length; i++) {
            const subType = subTypes[i];
            const list = this.getListBySubType(subType);
            for (let j = 0; j < list.length; j++) {
                const item = list[j];
                const levels = this.getLvList(item);
                lvList.push(...levels);
            }
        }
        return lvList;
    }

    private getListBySubType(subType: number): number[] {
        if (this.tSubTypeLists == null) {
            this.tSubTypeLists = {};
            this.tLvLists = {};
            const configData = gm.config.get_config_data("BookConfigData");
            for (const key in configData.data) {
                const item = configData.data[key] as BookConfig;
                if (this.tSubTypeLists[item.sub_type] == null) {
                    this.tSubTypeLists[item.sub_type] = [];

                }
                if (this.getLv(item.id) == 1) {
                    this.tSubTypeLists[item.sub_type].push(item.id);
                }
                const lvKey = Math.floor(item.id / 10);
                if (this.tLvLists[lvKey] == null) {
                    this.tLvLists[lvKey] = [];
                }
                this.tLvLists[lvKey].push(item.id);
            }
        }
        return this.tSubTypeLists[subType] || [];
    }

    private checkListHaveRed(list: number[], hasRed: boolean = false): boolean {
        if (hasRed) return true;
        for (let i = 0; i < list.length; i++) {
            if (gm.data.mapCell_data.checkBookItemHaveUnlockReward(list[i])) {
                return true;
            }
        }
        return false;
    }

    public refreshRed(): void {
        const heroList = this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO);
        const heroWallList = this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO_WALL);
        const heroWallLvList = this.getLvList(heroWallList[0]);
        let hasRed = this.checkListHaveRed(heroList, false);
        hasRed = this.checkListHaveRed(heroWallLvList, hasRed);
        this.pView.refreshRed("btn_hero", hasRed);

        const materialList = this.getLvListBySubType(SceneBookLogic.SUB_TYPE_MATERIAL_NORMAL, SceneBookLogic.SUB_TYPE_MATERIAL_SPECIAL, SceneBookLogic.SUB_TYPE_MATERIAL_RARE);
        hasRed = this.checkListHaveRed(materialList, false);
        this.pView.refreshRed("btn_item", hasRed);

        const decorateList = this.getLvListBySubType(SceneBookLogic.SUB_TYPE_DECORATE);
        hasRed = this.checkListHaveRed(decorateList, false);
        this.pView.refreshRed("btn_decorate", hasRed);
    }

    private showTabHero(): void {
        this.sCurTab = "btn_hero";
        this.pView.showTabPanel("btn_hero");
        this.pView.refreshSelectTabBtn("btn_hero");
        this.pView.recyleBookItems();

        const superHeroList = this.getListBySubType(SceneBookLogic.SUB_TYPE_SUPER_HERO);
        const heroList = this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO);
        const defendList = this.getListBySubType(SceneBookLogic.SUB_TYPE_DEFEND);
        const heroWallList = this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO_WALL);
        const heroWallLvList = this.getLvList(heroWallList[0]);

        this.resetDelayCds(heroList, heroWallLvList);
        this.pView.initSuperHeroList(superHeroList);
        this.pView.initHeroList(heroList);
        this.pView.initDefendList(defendList);
        this.pView.initWallList(heroWallLvList);
    }

    private showTabItem(): void {
        this.pView.recyleBookItems();
        this.sCurTab = "btn_item";
        this.pView.showTabPanel("btn_item");
        this.pView.refreshSelectTabBtn("btn_item");

        const normalList = this.getMaxLvListBySubType(SceneBookLogic.SUB_TYPE_MATERIAL_NORMAL);
        const specialList = this.getMaxLvListBySubType(SceneBookLogic.SUB_TYPE_MATERIAL_SPECIAL);
        const rareList = this.getMaxLvListBySubType(SceneBookLogic.SUB_TYPE_MATERIAL_RARE);

        this.resetDelayCds(normalList, specialList, rareList);
        this.pView.initNormalList(normalList);
        this.pView.initSpecialList(specialList);
        this.pView.initResList(rareList);
    }

    private showTabDecorate(): void {
        this.pView.recyleBookItems();
        this.sCurTab = "btn_decorate";
        this.pView.showTabPanel("btn_decorate");
        this.pView.refreshSelectTabBtn("btn_decorate");

        const decorateList = this.getMaxLvListBySubType(SceneBookLogic.SUB_TYPE_DECORATE);
        this.resetDelayCds(decorateList);
        this.pView.initDecorateList(decorateList);
    }

    private showTabFormula(): void {
        this.pView.recyleBookItems();
        this.sCurTab = "btn_formula";
        this.pView.showTabPanel("btn_formula");
        this.pView.refreshSelectTabBtn("btn_formula");
        this.resetDelayCds();

        const heroList = this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO);
        const heroWallList = this.getListBySubType(SceneBookLogic.SUB_TYPE_HERO_WALL);
        const heroWallLvList = this.getLvList(heroWallList[0]);
        const formulaGroups: Record<string, number[]> = {};

        for (let i = 0; i < heroList.length; i++) {
            const item = heroList[i];
            const rowData = gm.config.get_row_data("BookConfigData", item.toString()) as BookConfig;
            if (rowData.unlock_formula.length > 0) {
                if (!formulaGroups[rowData.formula_group]) {
                    formulaGroups[rowData.formula_group] = [];
                }
                formulaGroups[rowData.formula_group].push(item);
            }
        }

        for (let i = 0; i < heroWallLvList.length; i++) {
            const item = heroWallLvList[i];
            const rowData = gm.config.get_row_data("BookConfigData", item.toString()) as BookConfig;
            if (rowData.unlock_formula.length > 0) {
                if (!formulaGroups[rowData.formula_group]) {
                    formulaGroups[rowData.formula_group] = [];
                }
                formulaGroups[rowData.formula_group].push(item);
            }
        }

        this.pView.initFormulaList(formulaGroups);
    }

    private resetDelayCds(...lists: number[][]): void {
        if (lists.length == 0) {
            this.tDelayCds = null;
        } else {
            this.tDelayCds = {};
            let delay = 0;
            for (let i = 0; i < lists.length; i++) {
                const list = lists[i];
                for (let j = 0; j < list.length; j++) {
                    this.tDelayCds[list[j]] = delay += 0.1;
                }
            }
        }
    }

    public getDelayCd(id: number): number {
        return this.tDelayCds && this.tDelayCds[id] !== null ? this.tDelayCds[id] : 0;
    }

    public refreshCurTab(): void {
        if (this.sCurTab != null) {
            this.onBtnClick(this.sCurTab);
        }
    }

    private getLv(id: number): number {
        return id - 10 * Math.floor(id / 10);
    }

    public getLvList(id: number): number[] {
        const lvKey = Math.floor(id / 10);
        return this.tLvLists ? this.tLvLists[lvKey] || [] : [];
    }

    public checkIsUnlock(id: number): boolean {
        return gm.data.mapCell_data.checkBookItemIsUnlock(id);
    }

    protected onDisable(): void {
        gm.ui.emit("bookRedStatus");
    }

    public onBtnClick(buttonId: string, event: cc.Event = null): void {
        switch (buttonId) {
            case "btn_close":
            case "bg":
                gm.ui.async_hide_module(gm.const.BOOK);
                break;
            case "btn_hero":
                this.showTabHero();
                break;
            case "btn_item":
                this.showTabItem();
                break;
            case "btn_decorate":
                this.showTabDecorate();
                break;
            case "btn_formula":
                this.showTabFormula();
                break;
        }
    }
}

export default SceneBookLogic;