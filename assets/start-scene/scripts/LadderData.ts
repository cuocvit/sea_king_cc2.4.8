import { StorageBase } from './StorageBase';
import { BuildTypeEnum, RewardIdEnum, SetItemNumEnum } from './Constants';
import { TaskConditionType } from './TaskData';
import { TempData } from './TempData';
import { ReportData } from './NetUtils';
import { gm } from './GameManager';
import { LadderAchievementConfig } from '../../common/configs/ladder_achievement';

// @
export class LadderData extends StorageBase {
    public static readonly EVENT_DATA_CHANGE = "fight_data_change";
    //
    public STORAGE_KEY: string = "LadderData";
    public achievement_id: number = 0;
    public fail_count: number = 0;
    public fight_count: number = 0;
    //
    private _ladder_star: number = 0;
    private _total_star: number = 0;

    // @
    constructor() {
        super();
    }

    // @
    get ladder_star(): number {
        return this._ladder_star;
    }

    // @
    get total_star(): number {
        return this._total_star;
    }

    // @
    public add_ladder_achievement_star(tt: number): void {
        const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        if (!buildData || buildData.buildLvl < 1) {
            this._ladder_star += tt;
        }

        this._total_star += tt;
        gm.data.task_data.update_task_progress(TaskConditionType.GET_STAR, tt);
        const LadderAchievementConfig = gm.config.get_row_data("LadderAchievementConfigData", this.achievement_id + "") as LadderAchievementConfig;
        
        if (this._total_star >= LadderAchievementConfig.star) {
            const rewardArray = gm.data.ladder_temp_data.ladder_achievement_data_array[this.achievement_id - 1].reward_array;
            TempData.is_need_open_barrkPanel = !1;
            for (let index = 0; index < rewardArray.length; index++) {
                const reward = rewardArray[index];
                if (23001 <= reward.reward_id && reward.reward_id <= 23099) {
                    gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
                    cc.Canvas.instance.scheduleOnce(() => {
                        gm.ui.set_module_args(gm.const.GetReel.key, true);
                        gm.ui.async_show_module(gm.const.GetReel);
                    }, 0.1);
                    TempData.is_need_open_barrkPanel = true;

                } else if (reward.reward_id == RewardIdEnum.GOLD) {
                    gm.data.mapCell_data.setAddGameCoin(SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);

                } else if (reward.reward_id == RewardIdEnum.DIAMOND) {
                    gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                } else if (reward.reward_id == RewardIdEnum.BARREL) {
                    gm.data.mapCell_data.addBarrelNum(reward.reward_num);
                }
                else {
                    const arr: number[] = [];
                    for (let r = 0; r < reward.reward_num; r++)
                        arr.push(reward.reward_id);
                    gm.data.mapCell_data.addWareHouseList(arr)
                }
            }

            this.achievement_id++;
            ReportData.instance.report_once_point(10700 + this.achievement_id);
            gm.data.event_emitter.emit("ladder_achievement_upgrade");
        }
        this.async_write_data();
        gm.ui.show_coin_fly(RewardIdEnum.STAR, gm.ui.mapMainUI.ship.convertToNodeSpaceAR(cc.Vec3.ZERO));
    } // end: add_ladder_achievement_star

    // @
    public async_read_data<T>(callback: (data: T) => void): void {
        const self = this;
        super.async_read_data((data: T) => {
            if (self.is_init) {
                self.fight_count = self.fight_count === null ? 0 : self.fight_count;
            } else {
                self.achievement_id = 1;
                ReportData.instance.report_once_point(10700 + self.achievement_id);
                self._ladder_star = 0;
                self.fight_count = 0;
                self.is_init = true;
                self.async_write_data();
            }
            callback && callback(data);
        });
    }

    // @
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(LadderData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}
