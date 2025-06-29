import { BookConfig } from '../../common/configs/books';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Utils } from '../../start-scene/scripts/Utils';
import NodeBookItem from './NodeBookItem';
import SceneBookLogic from './SceneBookLogic';

const { ccclass, property } = cc._decorator;

@ccclass
class NodeBookFormula extends NodePoolItem {
    @property(cc.Node)
    private node_lock: cc.Node = null;

    @property(cc.Node)
    private node_unlock: cc.Node = null;

    @property(cc.Sprite)
    private icon_1: cc.Sprite = null;

    @property(cc.Sprite)
    private icon_2: cc.Sprite = null;

    @property(cc.Node)
    private pos_3: cc.Node = null;

    @property(cc.Label)
    private lab_name: cc.Label = null;

    @property(cc.Node)
    private node_root: cc.Node = null;

    private tBookItems: NodeBookItem[];
    private iItemId: number;

    private constructor() {
        super();
        this.tBookItems = [];
        this.iItemId = 0;
    }

    public init(itemId: number, delay: number = 0): void {
        const isUnlocked: boolean = this.checkIsUnlock(itemId);
        this.node_lock.active = !isUnlocked;
        this.node_unlock.active = isUnlocked;
        this.iItemId = itemId;
        this.delayShow(delay);
        if (!isUnlocked) return;
        const itemData = gm.config.get_row_data("BookConfigData", itemId.toString()) as BookConfig;
        this.lab_name.string = itemData.name;
        Utils.async_set_sprite_frame(this.icon_1, BundleName.COMMON, "res/handbook/" + itemData.unlock_formula[0]);
        Utils.async_set_sprite_frame(this.icon_2, BundleName.COMMON, "res/handbook/" + itemData.unlock_formula[1]);
        this.loadBookItem((bookItem: NodeBookItem) => {
            this.pos_3.addChild(bookItem.node);
            bookItem.init(itemId);
            bookItem.node.scale = 0.6;
        });
    }

    private delayShow(delay: number): void {
        cc.Tween.stopAllByTarget(this.node_root);
        if (delay <= 0) {
            this.node_root.opacity = 255;
        } else {
            this.node_root.opacity = 0;
            cc.tween(this.node_root).delay(delay).to(0.42, { opacity: 255 }).start();
        }
    }

    private recyleNodes(): void {
        for (let i = 0; i < this.tBookItems.length; i++) {
            const bookItem = this.tBookItems[i];
            gm.pool.put(bookItem.node);
        }
        this.tBookItems = [];
    }

    private loadBookItem(callback: (bookItem: NodeBookItem) => void): void {
        gm.pool.async_get(BundleName.BOOK, "prefabs/book_item", NodeBookItem, (bookItem) => {
            bookItem.reset();
            this.tBookItems.push(bookItem);
            callback(bookItem);
        });
    }

    private checkIsUnlock(itemId: number): boolean {
        return gm.data.mapCell_data.checkBookItemIsUnlock(itemId);
    }

    protected editor_on_button_click_handler(event: cc.Event, customData = null): void {
        const itemData = gm.config.get_row_data("BookConfigData", this.iItemId.toString()) as BookConfig;
        const logic = gm.ui.get_module(gm.const.BOOK).getLogic();

        if (itemData.sub_type == SceneBookLogic.SUB_TYPE_HERO) {
            const levelList = logic.getLvList(this.iItemId);
            gm.ui.set_module_args(gm.const.BOOK_HERO_DETAIL.key, levelList);
            gm.ui.show_panel(gm.const.BOOK_HERO_DETAIL);
        } else if (itemData.sub_type == SceneBookLogic.SUB_TYPE_HERO_WALL) {
            gm.ui.set_module_args(gm.const.BOOK_HERO_DETAIL.key, [this.iItemId]);
            gm.ui.show_panel(gm.const.BOOK_HERO_DETAIL);
        } else {
            const levelList = logic.getLvList(this.iItemId);
            gm.ui.set_module_args(gm.const.BOOK_ITEM_DETAIL.key, levelList);
            gm.ui.show_panel(gm.const.BOOK_ITEM_DETAIL);
        }
    }

    public reset(): void {
        cc.Tween.stopAllByTarget(this.node_root);
        this.node_root.opacity = 255;
        this.recyleNodes();
    }

}

export default NodeBookFormula;