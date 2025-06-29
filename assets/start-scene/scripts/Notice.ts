// +-+
import { gm } from './GameManager';
import { NoticeItem } from './NoticeItem';
import { GameModule } from './GameModule';

const { ccclass, property } = cc._decorator;

@ccclass
export class Notice extends GameModule {
  @property(cc.Prefab)
  private notice_item_prefab: cc.Prefab | null = null;

  @property(cc.Node)
  private window_node: cc.Node | null = null;

  protected onLoad(): void {
    gm.pool.init(gm.const.NoticeItem.bundle_name, gm.const.NoticeItem.load_url, NoticeItem);
  }

  private show_notice(data: string): void {
    gm.pool.async_get(gm.const.NoticeItem.bundle_name, gm.const.NoticeItem.load_url, NoticeItem, (item) => {
      if (!item) return;
      this.window_node.addChild(item.node);
      const notItem = item as NoticeItem;
      notItem.data = data;
    });
  }
}