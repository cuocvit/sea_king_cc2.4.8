import { gm } from '../../start-scene/scripts/GameManager';
import { LadderRewardItem } from './LadderRewardItem';
import { TempData } from '../../start-scene/scripts/TempData';
import { LadderAchievementConfig } from '../../common/configs/ladder_achievement';

const { ccclass, property } = cc._decorator;

@ccclass
class LadderUpLvlAnim extends cc.Component {
    @property(cc.Label)
    private star_lbl: cc.Label = null;

    @property([LadderRewardItem])
    private rewardList: LadderRewardItem[] = [];

    protected onEnable(): void {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.getComponent(cc.Animation).play("ladder_up_open");
        this.refreshPanel();
    }

    private refreshPanel(): void {
        const ladderData = gm.data.ladder_data;
        const rewardArray = gm.data.ladder_temp_data.ladder_achievement_data_array[ladderData.achievement_id - 2].reward_array;
        const configData = gm.config.get_row_data("LadderAchievementConfigData", ladderData.achievement_id - 1 + "") as LadderAchievementConfig;
        this.star_lbl.string = configData.star + "";

        for (let index = 0; index < this.rewardList.length; index++) {
            const rewardItem = this.rewardList[index];
            if (index < rewardArray.length) {
                rewardItem.node.active = true;
                rewardItem.data = rewardArray[index];
                const Anim = rewardItem.getComponent(cc.Animation);
                if (Anim) {
                    Anim.play();
                }
            } else {
                rewardItem.node.active = !1;
            }
        }
    }

    private playAnimEnd(animation: cc.Animation, event?: cc.Animation): void {
        if (event.name == "ladder_up_close") {
            
            gm.ui.async_hide_module(gm.const.LADDERUPLVLANIM);
            if (TempData.is_need_open_barrkPanel) {
                TempData.is_need_open_barrkPanel = false;
                gm.ui.async_show_module(gm.const.BARRACKS_LIST);
            }
        }
    }

    private onClosePanel(): void {
        this.node.getComponent(cc.Animation).play("ladder_up_close");
    }

    protected onDisable(): void {
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
    }
}
