import RMBStoreItem from './RMBStoreItem';
import { gm } from '../../start-scene/scripts/GameManager';
import { BundleName } from '../../start-scene/scripts/Constants';

const { ccclass, property } = cc._decorator;

@ccclass
class StoreComponent extends cc.Component {
    @property(cc.Node)
    private barrelDiamList: cc.Node | null = null;

    @property(cc.Node)
    private diamList: cc.Node | null = null;

    @property(cc.Node)
    private barrelList: cc.Node | null = null;

    protected onEnable(): void {
        const storeList = gm.data.config_data.getStoreList();

        const addStoreItem = (index: number): void => {
            for (let itemIndex = 0; itemIndex < storeList[index].length; itemIndex++) {
                const item = storeList[index][itemIndex];
                gm.pool.async_get(BundleName.STORE, "prefabs/store_item", RMBStoreItem, (storeItem) => {
                    storeItem.data = item;
                    if (item.shop_type == 1) {
                        this.barrelDiamList?.addChild(storeItem.node);
                    } else if (item.shop_type == 3) {
                        this.barrelList?.addChild(storeItem.node);
                    } else if (item.shop_type == 2) {
                        this.diamList?.addChild(storeItem.node);
                    }
                });
            }
        };

        gm.pool.put_children(this.barrelDiamList);
        gm.pool.put_children(this.diamList);
        gm.pool.put_children(this.barrelList);

        for (const index in gm.data.config_data.getStoreList()) {
            addStoreItem(Number(index));
        }
    }

    private onClickClose(): void {
        gm.ui.async_hide_module(gm.const.RMBSTORE);
    }

    protected onDisable(): void {
        gm.pool.put_children(this.barrelDiamList);
        gm.pool.put_children(this.diamList);
        gm.pool.put_children(this.barrelList);
    }
}