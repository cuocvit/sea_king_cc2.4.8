import { GameModule } from '../../start-scene/scripts/GameModule';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import NodeBookFormula from './NodeBookFormula';
import NodeBookItem from './NodeBookItem';
import SceneBookLogic from './SceneBookLogic';

const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneBookView extends GameModule {
    @property(cc.Node)
    private node_tabs: cc.Node | null;

    @property(cc.Node)
    private panel_hero: cc.Node | null;

    @property(cc.Node)
    private panel_item: cc.Node | null;

    @property(cc.Node)
    private panel_decorate: cc.Node | null;

    @property(cc.Node)
    private panel_formula: cc.Node | null;

    @property(cc.Node)
    private list_super_heros: cc.Node | null;

    @property(cc.Node)
    private list_heros: cc.Node | null;

    @property(cc.Node)
    private list_defends: cc.Node | null;

    @property(cc.Node)
    private list_Walls: cc.Node | null;

    @property(cc.Node)
    private list_normals: cc.Node | null;

    @property(cc.Node)
    private list_specials: cc.Node | null;

    @property(cc.Node)
    private list_ress: cc.Node | null;

    @property(cc.Node)
    private list_decorates: cc.Node | null;

    @property([cc.Node])
    private list_lvs: cc.Node[];


    private tBookItems: NodeBookItem[];
    private tBookFormulas: NodeBookFormula[];
    private tTabPanels: { [key: string]: cc.Node | null } | null;
    private iFormulaListBeginCd: number;
    private pLogic: SceneBookLogic;

    constructor() {
        super();
        this.pLogic = new SceneBookLogic();
        this.node_tabs = null;
        this.panel_hero = null;
        this.panel_item = null;
        this.panel_decorate = null;
        this.panel_formula = null;
        this.list_super_heros = null;
        this.list_heros = null;
        this.list_defends = null;
        this.list_Walls = null;
        this.list_normals = null;
        this.list_specials = null;
        this.list_ress = null;
        this.list_decorates = null;
        this.list_lvs = [];
        this.tBookItems = [];
        this.tBookFormulas = [];
        this.tTabPanels = null;
        this.iFormulaListBeginCd = 0;
        this.sceneBindLogic(this, this.pLogic);
    }

    protected onLoad(): void { }

    protected onEnable(): void {
        this.tTabPanels = {
            btn_hero: this.panel_hero,
            btn_item: this.panel_item,
            btn_decorate: this.panel_decorate,
            btn_formula: this.panel_formula,
        };
    }

    public getLogic(): SceneBookLogic {
        return this.pLogic;
    }

    public showTabPanel(tab: string): void {
        if (this.tTabPanels == null) {
            this.tTabPanels = {
                btn_hero: this.panel_hero,
                btn_item: this.panel_item,
                btn_decorate: this.panel_decorate,
                btn_formula: this.panel_formula,
            };
        }
        for (const key in this.tTabPanels) {
            this.tTabPanels[key].active = key == tab;
        }
    }

    protected onDisable(): void { }

    public refreshSelectTabBtn(tab: string): void {
        const children = this.node_tabs.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.active = child.name.endsWith('_active') ? `${tab}_active` == child.name : tab !== child.name;
        }
    }

    public refreshRed(prefix: string, active: boolean): void {
        const children = this.node_tabs.children;
        let count = 0;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.name.startsWith(prefix)) {
                child.getChildByName('red').active = active;
                if (++count >= 2) break;
            }
        }
    }

    public initDefendList(items: number[]): void {
        this.addBookItemsToList(items, this.list_defends);
    }

    public initSuperHeroList(items: number[]): void {
        this.addBookItemsToList(items, this.list_super_heros);
    }

    public initHeroList(items: number[]): void {
        this.addBookItemsToList(items, this.list_heros);
    }

    public initWallList(items: number[]): void {
        this.addBookItemsToList(items, this.list_Walls);
    }

    public initNormalList(items: number[]): void {
        this.addBookItemsToList(items, this.list_normals);
    }

    public initSpecialList(items: number[]): void {
        this.addBookItemsToList(items, this.list_specials);
    }

    public initResList(items: number[]): void {
        this.addBookItemsToList(items, this.list_ress);
    }

    public initDecorateList(items: number[]): void {
        this.addBookItemsToList(items, this.list_decorates);
    }

    private addBookItemsToList(items: number[], list: cc.Node): void {
        const formattedList = this.formatList(items);
        for (let index = 0; index < formattedList.length; index++) {
            this.loadBookItem((item) => {
                item.node.zIndex = index;
                list.addChild(item.node);
                this.tBookItems.push(item);
                item.reset();
                item.init(formattedList[index], true);
            });
        }
    }

    public initFormulaList(formulas: Record<string, number[]>): void {
        this.iFormulaListBeginCd = 0;
        for (let i = 0; i < this.list_lvs.length; i++) {
            const levelNode = this.list_lvs[i];
            const formulaItems = formulas[i];
            if (formulaItems != null) {
                for (let j = 0; j < formulaItems.length; j++) {
                    const formula = formulaItems[j];
                    this.loadFormulaItem((item) => {
                        levelNode.addChild(item.node);
                        this.iFormulaListBeginCd += 0.1;
                        item.init(formula, this.iFormulaListBeginCd);
                    });
                }
            }
        }
    }

    private formatList(items: number[]): number[] {
        const length = items.length;
        if (length % 3 <= 0) {
            return items;
        }

        const formatted: number[] = [];
        for (let index = 0; index < items.length; index++) {
            formatted.push(items[index]);
        }

        const toAdd = 3 - length % 3;
        for (let index = 0; index < toAdd; index++) {
            formatted.push(0);
        }
        return formatted;
    }

    private loadBookItem(callback: (item: NodeBookItem) => void): void {
        gm.pool.async_get(BundleName.BOOK, 'prefabs/book_item', NodeBookItem, (item) => {
            item.reset();
            this.tBookItems.push(item);
            callback(item);
        });
    }

    private loadFormulaItem(callback: (item: NodeBookFormula) => void): void {
        gm.pool.async_get(BundleName.BOOK, 'prefabs/book_formula', NodeBookFormula, (item) => {
            item.reset();
            this.tBookFormulas.push(item);
            callback(item);
        });
    }

    public recyleBookItems(): void {
        for (let i = 0; i < this.tBookItems.length; i++) {
            this.tBookItems[i].reset();
            gm.pool.put(this.tBookItems[i].node);
        }
        this.tBookItems = [];
        for (let i = 0; i < this.tBookFormulas.length; i++) {
            this.tBookFormulas[i].reset();
            gm.pool.put(this.tBookFormulas[i].node);
        }
        this.tBookFormulas = [];
    }

    private editor_on_button_click_handler(event: cc.Event, data: cc.Event): void {
        const targetName = event.target.name;
        this.pLogic.onBtnClick(targetName, data === undefined ? null : data);
    }

    private sceneBindLogic(instance: SceneBookView, logic: SceneBookLogic): void { 
        const bindMethod = (methodName: string) => {
            const originalMethod = instance[methodName];
            if (null != originalMethod) {
                instance[methodName] = (t) => {
                    if (null != logic[methodName]) {
                        logic[methodName].apply(logic, [t]);
                    }
                    originalMethod.apply(instance, [t]);
                };
            }
        }
        logic.setView(instance);
        bindMethod("onLoad");
        bindMethod("onEnable");
        bindMethod("onDisable");
    }
}