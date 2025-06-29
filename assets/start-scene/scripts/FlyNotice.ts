// +-+
import { GameModule } from './GameModule';
import { gm } from './GameManager';
import { FlyNoticeItem } from './FlyNoticeItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class FlyNotice extends GameModule {
    @property(cc.Prefab)
    private fly_notice_item_prefab: cc.Prefab | null = null;

    protected onLoad(): void {
        gm.pool.init(gm.const.FlyNoticeItem.bundle_name, gm.const.FlyNoticeItem.load_url, FlyNoticeItem);
    }

    private show_fly_notice(message: string, duration: number, position: cc.Vec3): void {
        gm.pool.async_get(gm.const.FlyNoticeItem.bundle_name, gm.const.FlyNoticeItem.load_url, FlyNoticeItem, (item) => {
            if (!item) return;
            this.node.addChild(item.node);
            item.node.position = this.node.convertToNodeSpaceAR(position);
            const flyNoticeItem = item as FlyNoticeItem;
            flyNoticeItem.set_data(message, duration);
        });
    }
}