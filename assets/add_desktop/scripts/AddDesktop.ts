import { gm } from '../../start-scene/scripts/GameManager';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { BundleName } from '../../start-scene/scripts/Constants';
import { HeroConfig } from '../../common/configs/hero';

const { ccclass, property } = cc._decorator;

@ccclass
class AddDesktop extends GameModule {
    @property(cc.Button)
    private close_btn: cc.Button = null;

    @property(cc.Button)
    private add_desktop_btn: cc.Button = null;

    @property(cc.Node)
    private left_node: cc.Node = null;

    @property(cc.Node)
    private right_node: cc.Node = null;

    @property(cc.Label)
    private left_lbl: cc.Label = null;

    @property(cc.Label)
    private right_lbl: cc.Label = null;

    protected onEnable(): void {
        const self = this;
        if (this.left_node.childrenCount === 0) {
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, NodePoolItem, (item) => {
                if (self.left_node.childrenCount === 0) {
                    self.left_node.addChild(item.node);
                } else {
                    gm.pool.put(item.node);
                }
            });
        }
        const leftHeroData = gm.config.get_row_data("HeroConfigData", gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID + "") as HeroConfig;
        if (leftHeroData) this.left_lbl.string = leftHeroData.name;

        if (this.right_node.childrenCount === 0) {
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID, NodePoolItem, (item) => {
                if (self.right_node.childrenCount === 0) {
                    self.right_node.addChild(item.node);
                } else {
                    gm.pool.put(item.node);
                }
            });
        }
        const rightHeroData = gm.config.get_row_data("HeroConfigData", gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID + "") as HeroConfig;
        if (rightHeroData) this.right_lbl.string = rightHeroData.name;

    }

    protected onDisable(): void {
        gm.pool.put_children(this.left_node);
        gm.pool.put_children(this.right_node);
    }

    protected editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.close_btn.node) {
            gm.ui.async_hide_module(gm.const.AddDesktop);
        } else if (event.target == this.add_desktop_btn.node) {
            gm.channel.addShortcut(() => {
                if (gm.data.main_data.is_receive_shortcut_reward) {
                    gm.ui.show_notice("Đã nhận được phần thưởng thêm vào máy tính để bàn!");
                    gm.ui.async_hide_module(gm.const.AddDesktop);
                } else {
                    gm.data.main_data.is_receive_shortcut_reward = true;
                    gm.data.main_data.async_write_data();
                    gm.data.mapCell_data.addWareHouseList([gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID]);
                    gm.data.mapCell_data.async_write_data();
                    gm.ui.set_module_args(gm.const.GETREWARDOP.key, {
                        idList: [gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID],
                        numList: [1, 1]
                    });
                    gm.ui.async_show_module(gm.const.GETREWARDOP);
                    gm.ui.async_hide_module(gm.const.AddDesktop);
                    ReportData.instance.report_once_point(10639);
                }
            });
        }
    }
}